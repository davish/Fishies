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

  get state() {
    return this.history[this.history.length - 1];
  }
}

module.exports = History;
