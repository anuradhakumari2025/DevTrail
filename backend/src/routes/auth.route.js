const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.model");
const { authUser } = require("../midllewares/auth.middleware");
const { getUserProfile } = require("../controllers/auth.controller");
const GitHubStrategy = require("passport-github2").Strategy;

// passport config
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // find or create user
        let user = await User.findOne({ githubId: profile.id });
        if (!user) {
          user = await User.create({
            githubId: profile.id,
            username: profile.username,
            name: profile.displayName || profile.username,
            avatarUrl: profile.photos[0]?.value,
            bio: profile._json.bio,
            email: profile.emails ? profile.emails[0].value : null,
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// routes
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    const { id } = req.user;
    // create jwt
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
    });
    // redirect to frontend with token
    res.redirect(`http://localhost:5173/dashboard`);
  }
);

router.get("/me", authUser, getUserProfile);

module.exports = router;
