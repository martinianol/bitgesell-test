const express = require("express");
const router = express.Router();

// Serve robots.txt
router.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send("User-agent: *\nDisallow:");
});

// Chrome DevTools discovery fallback
router.get("/.well-known/appspecific/com.chrome.devtools.json", (req, res) => {
  res.json({});
});

module.exports = router;