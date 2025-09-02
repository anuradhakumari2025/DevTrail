const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.route");
const passport = require("passport");
const session = require("express-session");
const app = express();
const journalRoutes = require("./routes/journal.route")
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "keyboardcat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/journals",journalRoutes)

app.get("/api/test", (req, res) => {
  res.send("Backend working");
});

module.exports = app;
