Promise.all([
  1, // => Promise.resolve(1)
  2, // => Promise.resolve(2)
  3  // => Promise.resolve(3)
])
  .then(console.log) // [1, 2, 3]
  .catch(console.log);