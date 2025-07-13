const express = require("express");
const router = express.Router();
const { readData } = require("../utils/dataUtils");
const { mean } = require("../utils/stats");

// GET /api/stats
router.get("/", async (req, res, next) => {
  try {
    const items = await readData();

    const stats = {
      total: items.length,
      averagePrice: mean(items, "price"),
    };

    res.json(stats);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
