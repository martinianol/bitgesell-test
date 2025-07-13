// Utility intentionally unused by routes (candidate should refactor)
// I'm passing an array of objects and a key where to extract the info from
function mean(arr, key) {
  // EDGE CASES SHOULD RETURN 0 if no array or empty array is passed
  if (!Array.isArray(arr) || arr.length === 0) {
    return 0;
  }

  // Filter only validItems that value corresponds to a number
  const validItems = arr.filter((item) => typeof item[key] === "number");

  if (validItems.length === 0) {
    return 0;
  }

  const sum = validItems.reduce((acc, item) => acc + item[key], 0);
  return sum / validItems.length;
}

module.exports = { mean };
