const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    githubId: {
      type: String,
      unique: true,
      required: true,
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
    badges: {
      earlyBird: { type: Number, default: 0 }, // First entry before 8 AM on 5 days
      nightOwl: { type: Number, default: 0 }, // Entries after 10 PM for 7 nights
      goalSetter: { type: Number, default: 0 }, // Created goal in settings
      reflectiveThinker: { type: Number, default: 0 }, // Wrote 3 entries >500 words
      achievementPro: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
