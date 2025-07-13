const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const router = express.Router();
const DATA_PATH = path.join(__dirname, "../../../data/items.json");
const ENCODING = "utf-8";

async function readData() {
  const raw = await fs.readFile(DATA_PATH, ENCODING);
  return JSON.parse(raw);
}

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
