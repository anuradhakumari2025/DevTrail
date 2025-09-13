const Journal = require("../models/journal.model");
const Tag = require("../models/tag.model");
const User = require("../models/user.model");

const validVisibilities = ["public", "private"]; // Assuming this is defined somewhere

module.exports.createJournal = async (req, res) => {
  try {
    const { title, content, date, category, visibility, tags } = req.body;
    const userId = req.body._id; // Assuming you have user id in req.user after auth middleware
    console.log(userId);
    if (!title || !content || !date || !category || !visibility || !tags) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validVisibilities.includes(visibility)) {
      return res.status(400).json({ message: "Invalid visibility option" });
    }

    if (tags.length === 0) {
      return res.status(400).json({ message: "At least one tag is required" });
    }

    // Fetch tags from DB to validate existence and relationships
    const tagDocs = await Tag.find({ _id: { $in: tags } });
    if (tagDocs.length !== tags.length) {
      return res.status(400).json({ message: "One or more tags are invalid" });
    }

    // Map tags by id for quick lookup
    const tagMap = {};
    tagDocs.forEach((tag) => {
      tagMap[tag._id.toString()] = tag;
    });

    // Validate parent-child tag inclusion: if a tag has a parent, that parent must be included in tags
    for (const tagId of tags) {
      const tag = tagMap[tagId.toString()];
      if (tag.parent && !tags.includes(tag.parent.toString())) {
        return res.status(400).json({
          message: `Child tag ${tag.name} requires its ${tag.category} parent tag to be included`,
        });
      }
    }

    const newJournal = await Journal.create({
      user: userId,
      title,
      content,
      date,
      category,
      visibility,
      tags,
    });

    const user = await User.findById(userId);
    const allEntries = await Journal.find({ user: userId });

    const entryDate = new Date(date);
    const hour = entryDate.getHours();

    /* Early Bird (before 8am, 5 days) */
    const earlyDays = await Journal.aggregate([
      { $match: { user: user._id } },
      {
        $project: {
          day: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          hour: { $hour: "$date" },
        },
      },
      { $match: { hour: { $lt: 8 } } },
      { $group: { _id: "$day" } },
    ]);
    if (earlyDays.length >= 5) user.badges.earlyBird += 1;

    /** 🌙 Night Owl (after 10pm, 6 nights) */
    const nightDays = await Journal.aggregate([
      { $match: { user: user._id } },
      {
        $project: {
          day: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          hour: { $hour: "$date" },
        },
      },
      { $match: { hour: { $gte: 22 } } },
      { $group: { _id: "$day" } },
    ]);
    if (nightDays.length >= 6) user.badges.nightOwl += 1;

    /** 🎯 Goal Setter (weekly & monthly) */
    const goalTagId = "68bb49add667ec927d09681b"; // replace with actual child tag _id
    const goalEntries = allEntries.filter((j) =>
      j.tags.map(String).includes(goalTagId)
    );

  // Weekly streak (7 consecutive days)
    const goalDays = [
      ...new Set(goalEntries.map((j) => moment(j.date).format("YYYY-MM-DD"))),
    ].sort();
    let streak = 1,
      maxStreak = 1;
    for (let i = 1; i < goalDays.length; i++) {
      if (moment(goalDays[i]).diff(moment(goalDays[i - 1]), "days") === 1) {
        streak++;
        maxStreak = Math.max(maxStreak, streak);
      } else streak = 1;
    }
    if (maxStreak >= 7) user.badges.goalSetter += 1;

    /** ✍ Reflective Thinker (5 entries >500 words) */
    const reflectiveCount = allEntries.filter(
      (j) => j.content.split(" ").length > 500
    ).length;
    if (reflectiveCount >= 5) user.badges.reflectiveThinker += 1;

    /** 🏆 Achievement Hunter & Pro */
    const achCount = allEntries.filter(
      (j) => j.category === "Achievement"
    ).length;
    if (achCount >= 25) user.badges.achievementPro += 1;

    await user.save();

    const populatedJournal = await Journal.findById(newJournal._id).populate(
      "tags"
    );

    return res.status(201).json({
      message: "Journal created successfully",
      journal: populatedJournal,
      badges: user.badges,
    });
  } catch (error) {
    console.log("Error in createJournal:", error);
    return res.status(400).json({ message: "Server error", error });
  }
};

module.exports.deleteJournal = async (req, res) => {
  try {
    const { id } = req.params;
    await Journal.findByIdAndDelete(id);
    return res.status(200).json({ message: "Journal deleted successfully" });
  } catch (error) {
    console.log("Error in deleteJournal:", error);
    return res.status(400).json({ message: "Server error", error });
  }
};

module.exports.getJournals = async (req, res) => {
  try {
    const { category, parentTag, childTag, search } = req.query;
    let filter = {};
    if (category && category !== "All") {
      filter.category = category;
    }

    // Add tag filters only if specified
    if (parentTag && childTag && childTag !== "All") {
      filter.tags = { $all: [parentTag, childTag] }; // Both tags selected
    } else if (parentTag && parentTag !== "All") {
      filter.tags = parentTag; // Only parent tag selected
    }

    // Add title search only if provided
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }
    const journals = await Journal.find(filter)
      .populate("tags")
      .sort({ createdAt: -1 });
    return res.status(200).json({ journals });
  } catch (error) {
    console.log("Error in getJournals:", error);
    return res.status(400).json({ message: "Server error", error });
  }
};

module.exports.updateJounal = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Journal.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("tags");
    return res.status(200).json({ journal: updated });
  } catch (error) {
    console.log("Error in updateJournal:", error);
    return res.status(400).json({ message: "Server error", error });
  }
};

//to get public entries
module.exports.getPublicEntries = async (req, res) => {
  try {
    const { category, parentTag, childTag, search } = req.query;
    let filter = { visibility: "public" };
    if (category && category !== "All") {
      filter.category = category;
    }

    // Add tag filters only if specified
    if (parentTag && childTag && childTag !== "All") {
      filter.tags = { $all: [parentTag, childTag] }; // Both tags selected
    } else if (parentTag && parentTag !== "All") {
      filter.tags = parentTag; // Only parent tag selected
    }

    // Add title search only if provided
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }
    const journals = await Journal.find(filter)
      .populate("tags")
      .sort({ createdAt: -1 });
    return res.status(200).json({ journals });
  } catch (error) {
    console.log("Error in getting Journals:", error);
    return res.status(400).json({ message: "Server error", error });
  }
};
