const express = require("express");
const { authUser } = require("../midllewares/auth.middleware");
const { createJournal, getJournals } = require("../controllers/journal.controller");
const router = express.Router();

router.post("/create",createJournal)
router.get("/get",getJournals)

module.exports = router;