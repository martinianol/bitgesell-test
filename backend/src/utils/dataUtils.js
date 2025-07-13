const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(__dirname, "../../../data/items.json");
const ENCODING = "utf-8";

async function readData() {
  const raw = await fs.promises.readFile(DATA_PATH, ENCODING);
  return JSON.parse(raw);
}

async function writeData(data) {
  const dataStringified = JSON.stringify(data, null, 2);
  await fs.promises.writeFile(DATA_PATH, dataStringified, ENCODING);
}

async function getDataLastModifiedTime() {
  // use stat method to get metadata about file - clean and simple
  // very fast and lightweight - rarely a bottleneck
  const lastModifiedTime = (await fs.promises.stat(DATA_PATH)).mtimeMs;
  return lastModifiedTime;
}

module.exports = {
  readData,
  writeData,
  getDataLastModifiedTime,
};
