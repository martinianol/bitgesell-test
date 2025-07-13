const express = require("express");
const { readData, writeData } = require("../utils/dataUtils");
const router = express.Router();

// GET /api/items
router.get("/", async (req, res, next) => {
  try {
    const data = await readData();
    const { q = "", limit = 10, offset = 0 } = req.query;
    let results = data;

    if (q) {
      // Simple substring search (sub‑optimal)
      results = results.filter((item) =>
        item.name.toLowerCase().includes(q.toLowerCase())
      );
    }

    const total = results.length;
    const paginated = results.slice(
      parseInt(offset),
      parseInt(offset) + parseInt(limit)
    );

    res.json({ items: paginated, total });
  } catch (err) {
    next(err);
  }
});

// GET /api/items/:id
router.get("/:id", async (req, res, next) => {
  try {
    const data = await readData();
    const item = data.find((i) => i.id === parseInt(req.params.id));
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// POST /api/items
router.post("/", async (req, res, next) => {
  try {
    const item = req.body;
    validateItemInfo(item);

    const data = await readData();
    item.id = Date.now();
    const newData = [...data, item];
    await writeData(newData);

    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

const validateItemInfo = (item) => {
  // Simple Validation - could be more profound.
  if (!item.name || !item.category || !item.price) {
    const err = new Error("Missing item information", 400);
    err.status = 400;
    throw err;
  }
};
