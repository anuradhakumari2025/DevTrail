const express = require("express");
const { createTag, getTags } = require("../controllers/tag.controller");
const router = express.Router();

router.post("/create",createTag)
router.get("/get",getTags)

module.exports = router