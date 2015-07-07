class Algorithms {
  static randomWithinPercent(percent) {
    let gaussian = this.randomGaussian() * percent / 100;
    if (gaussian >= 0) {
      return 1 + gaussian;
    } else {
      return 1 / (1 - gaussian);
    }
  }

  static randomGaussian() {
    if (!this.nextNextGaussian && this.nextNextGaussian != 0) {
      this.nextNextGaussian = 0;
      this.haveNextNextGaussian = false;
    }
    if (this.haveNextNextGaussian) {
      this.haveNextNextGaussian = false;
      return this.nextNextGaussian;
    } else {
      let v1, v2, s;
      do {
        v1 = 2 * Math.random() - 1;
        v2 = 2 * Math.random() - 1;
        s = v1*v1 + v2*v2;
      } while (s >= 1 || s == 0);
      let multiplier = Math.sqrt(-2 * Math.log(s)/s);
      this.nextNextGaussian = v2 * multiplier;
      this.haveNextNextGaussian = true;
      return v1 * multiplier;
    }
  }
}
module.exports = Algorithms;