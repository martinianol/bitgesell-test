const express = require("express");
const { readData, writeData } = require("../utils/dataUtils");
const router = express.Router();

// GET /api/items
router.get("/", async (req, res, next) => {
  try {
    const data = readData();
    const { limit, q } = req.query;
    let results = await data;

    if (q) {
      // Simple substring search (sub‑optimal)
      results = results.filter((item) =>
        item.name.toLowerCase().includes(q.toLowerCase())
      );
    }

    if (limit) {
      results = results.slice(0, parseInt(limit));
    }

    res.json(results);
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
      const err = new Error("Item not found");
      err.status = 404;
      throw err;
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// POST /api/items
router.post("/", async (req, res, next) => {
  try {
    // TODO: Validate payload (intentional omission)
    const item = req.body;
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
