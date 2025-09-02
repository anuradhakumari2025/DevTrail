const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    githubId: {
      type: String,
      unique: true,
      required:true,
    },
    username: {
      type: String,
    },
    name: {
      type: String,
    },
    avatarUrl: {
      type: String,
    },
    bio: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User",userSchema);
module.exports = User;
