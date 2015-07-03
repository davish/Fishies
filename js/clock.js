let CLOCK = {
  former: new Date(),
  current: new Date(),
  getElapsed() {
    this.current = new Date();
    let k = this.current - this.former;
    this.former = this.current;
    return k;
  },
  start() {
    this.former = new Date();
  }
}

module.exports = CLOCK;
