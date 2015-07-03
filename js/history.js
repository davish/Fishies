class History {
  constructor() {
    this.history = [];
  }

  add(aState) {
    this.history.push(aState);
  }

  get state(i) {
    return this.history[i];
  }
}

module.exports = History;
