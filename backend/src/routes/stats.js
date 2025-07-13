const express = require("express");
const router = express.Router();
const { readData } = require("../utils/dataUtils");

// GET /api/stats
router.get("/", async (req, res, next) => {
  try {
    const items = await readData();

    const stats = {
      total: items.length,
      averagePrice:
        items.reduce((acc, cur) => acc + cur.price, 0) / items.length,
    };

    res.json(stats);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
