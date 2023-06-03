const express = require("express");
const {
  getSegment,
  getSegments,
  getUserSegments,
  createSegment,
  deleteSegment,
  updateSegment,
} = require("../controllers/segmentController");

const router = express.Router();

//GET all segments
router.get("/all", getSegments);

//GET user segments
router.get("/fromUser/:user", getUserSegments);

//GET a single segment
router.get("/:id", getSegment);

//POST a segment
router.post("/", createSegment);

//POST a segment
router.patch("/:id", updateSegment);

//DELETE a segment
router.delete("/:id", deleteSegment);

module.exports = router;
