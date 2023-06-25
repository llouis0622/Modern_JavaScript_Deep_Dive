function* genFunc() {
  yield 1;
}

new genFunc(); // TypeError: genFunc is not a constructor