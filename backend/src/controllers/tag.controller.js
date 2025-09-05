const Tag = require("../models/tag.model");

module.exports.createTag = async (req, res) => {
  try {
    const { name, parent, category } = req.body;
    if (!name) {
      return res.json({ message: "Tag name is required" });
    }

    if (!category) {
      return res.json({ message: "Tag category is required" });
    }

    // Validate parent if given
    if (parent) {
      const parentTag = await Tag.findById(parent);
      if (!parentTag) {
        return res.status(400).json({ message: "Parent tag not found" });
      }
      if (parentTag.category !== category) {
        return res
          .status(400)
          .json({ message: "Parent tag category does not match" });
      }
    }

    // Check for duplicate tag name under same parent (optional but recommended)
    const existingTag = await Tag.findOne({ name, parent: parent || null });
    if (existingTag) {
      return res
        .status(400)
        .json({ message: "Tag with this name and parent already exists" });
    }

    const newTag = await Tag.create({ name, parent: parent || null,category });
    return res.status(201).json({ message: "Tag created", tag: newTag });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Server error" });
  }
};

module.exports.getTags = async (req,res)=>{
  try {
    const tags = await Tag.find().sort({ name: 1 }).lean().populate('parent')
    return res.status(200).json({message:"Tags retrieved",tags})
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Server error" })
  }
}
