const Journal = require("../models/journal.model");
const Tag = require("../models/tag.model");

const parentChildMap = {
  Frontend: [
    "React",
    "Vue",
    "Angular",
    "HTML5",
    "CSS",
    "JavaScript",
    "Tailwind",
    "GSAP",
    "Svelte",
    "Bootstrap",
    "Material-UI",
    "Next.js",
    "jQuery",
    "Chakra UI",
  ],
  Backend: [
    "Node.js",
    "Express",
    "Django",
    "SpringBoot",
    "FastAPI",
    "Flask",
    "Ruby on Rails",
    "Laravel",
    "ASP.NET Core",
    "Hapi.js",
  ],
  Database: [
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "SQLite",
    "Firebase",
    "Cassandra",
    "Elasticsearch",
    "Oracle",
  ],
  DevOps: [
    "Docker",
    "Kubernetes",
    "AWS",
    "CI/CD",
    "Git",
    "Ansible",
    "Terraform",
    "Jenkins",
    "Azure DevOps",
    "GCP",
    "GitHub Actions",
  ],
  AI: [
    "LangChain",
    "OpenAI",
    "Hugging Face",
    "Transformers",
    "ONNX",
    "Vision AI",
  ],
  ML: [
    "Data Preprocessing",
    "Model Training",
    "Model Evaluation",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "Pandas",
    "XGBoost",
    "Keras",
    "Feature Engineering",
    "Model Deployment",
    "Hyperparameter Tuning",
    "Data Visualization",
  ],
  Personal: [
    "Diary",
    "Travel",
    "Goals",
    "Learning",
    "Productivity",
    "Health",
    "Mindfulness",
    "Projects",
    "Books",
    "Networking",
    "Self-Review",
  ],
};

const validVisibilities = ["public", "private", "friends"];

module.exports.createJournal = async (req, res) => {
  try {
    const { title, content, date, category, visibility, tags } = req.body;

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
      title,
      content,
      date,
      category,
      visibility,
      tags,
    });

    const populatedJournal = await Journal.findById(newJournal._id).populate("tags");
    return res
      .status(201)
      .json({ message: "Journal created successfully", journal: populatedJournal });
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
    const journals = await Journal.find().sort({ createdAt: -1 }).populate("tags");
    return res.status(200).json({ journals });
  } catch (error) {
    console.log("Error in getJournals:", error);
    return res.status(400).json({ message: "Server error", error });
  }
};

module.exports.updateJounal = async (req, res) => {
try {
  const {id} = req.params;
  const updated = await Journal.findByIdAndUpdate(id, req.body, { new: true }).populate("tags");
  return res.status(200).json({ journal: updated });
} catch (error) {
  console.log("Error in updateJournal:", error);
  return res.status(400).json({ message: "Server error", error });
}
}
