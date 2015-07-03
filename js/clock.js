let CLOCK = {
  former: new Date(),
  current: new Date(),
  getElapsed() {
    this.current = new Date();
    let k = current - former;
    this.former = this.current;
    return k;
  },
  start() {
    former = new Date();
  }
}

module.exports = CLOCK;
