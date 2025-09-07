const express = require("express");
const { authUser } = require("../midllewares/auth.middleware");
const { createJournal, getJournals, deleteJournal, updateJounal, getPublicEntries } = require("../controllers/journal.controller");
const router = express.Router();

router.post("/create",createJournal)
router.get("/get",getJournals)
router.get("/public",getPublicEntries)
router.put("/update/:id",updateJounal)
router.delete("/delete/:id",deleteJournal)

module.exports = router;