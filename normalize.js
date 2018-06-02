'use strict'

function compare(a, b) {
  return a < b ? -1 : a > b ? 1 : 0
}

function normalize(doc) {
  const keys = Object.keys(doc).sort(compare)
  const output = {}
  for (const k of keys) { output[k] = doc[k] }
  return output
}

module.exports = {
  normalize,
  compare,
}
