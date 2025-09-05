const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Tag", default: null }, // null if top-level
  category: { type: String, required: true }, // e.g. "Frontend", "Backend", etc.
});

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
