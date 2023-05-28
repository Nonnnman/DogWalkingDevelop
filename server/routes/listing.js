const express = require("express");
const { getListings } = require("../controllers/listingController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

// get
router.get("/", getListings);

module.exports = router;
