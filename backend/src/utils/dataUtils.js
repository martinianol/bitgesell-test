const fs = require("fs").promises;
const path = require("path");

const DATA_PATH = path.join(__dirname, "../../../data/items.json");
const ENCODING = "utf-8";

async function readData() {
  const raw = await fs.readFile(DATA_PATH, ENCODING);
  return JSON.parse(raw);
}

async function writeData(data) {
  const dataStringified = JSON.stringify(data, null, 2);
  await fs.writeFile(DATA_PATH, dataStringified, ENCODING);
}

module.exports = {
  readData,
  writeData,
};
