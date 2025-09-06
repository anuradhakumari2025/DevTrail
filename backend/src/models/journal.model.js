const mongoose = require("mongoose");

const jounrnalSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        required: true,
      },
    ],
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Personal",
        "Learning",
        "Project",
        "Bug",
        "Issue",
        "Improvement",
        "Task",
        "Achievement",
      ],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "private",
    },
  },
  { timestamps: true }
);

const Journal = mongoose.model("Journal", jounrnalSchema);
module.exports = Journal;
