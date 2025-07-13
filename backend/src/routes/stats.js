const express = require("express");
const router = express.Router();
const { readData, getDataLastModifiedTime } = require("../utils/dataUtils");
const { mean } = require("../utils/stats");

// SET cachedStats and lastModified to null - if null should compute stats
// NOTE: This solution reduced time by 90%. Computing stats reuqire 6.997ms - Cached results where vailable in .711ms
 
let cachedStats = null;
let lastModified = null;

// GET /api/stats
router.get("/", async (req, res, next) => {
  try {
    const dataModifiedTime = await getDataLastModifiedTime();

    if (!cachedStats || dataModifiedTime !== lastModified) {
      console.log("I'm computing stats...");
      const items = await readData();
      cachedStats = getStats(items);
      lastModified = dataModifiedTime;
    }

    res.json(cachedStats);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

const getStats = (items) => ({
  total: items.length,
  averagePrice: mean(items, "price"),
});
