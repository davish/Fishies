let Food = require('./food');
let Fish = require('./fish');
let Chromosome = require('./chromosome');
let CLOCK = require('./clock');

class State {
  constructor() {
    this.fish = [];
    this.food = [];
    this.process = false;
    //temporary
    let variance = 25;
    for (let i = 0; i < 10; i++) {
      this.food.push(new Food(10 * Algorithms.randomWithinPercent(25), {x: 800 * Math.random(), y: 600 * Math.random()}));
    }
    for(let i = 0; i < 8; i++) {
      this.fish.push(new Fish(new Chromosome(250*Algorithms.randomWithinPercent(variance), 2*Algorithms.randomWithinPercent(variance), 8*Algorithms.randomWithinPercent(variance), 256 * Math.random(), 256 * Math.random(), 256 * Math.random(), 256 * Math.random(), 256 * Math.random(), 256 * Math.random(), Math.PI / 2 * Algorithms.randomWithinPercent(50)), {x: 400*Algorithms.randomWithinPercent(25), y: 300*Algorithms.randomWithinPercent(25)}));
    }
  }

  addFish(aFish) {
    fish.push(aFish);
  }

  addFood(aFood) {
    food.push(aFood);
  }

  tick(time) {
    for(let f of this.fish){
      if (f.life > 0) {
        f.tick(time);
      } else {
        this.fish.splice(this.fish.indexOf(f), 1);
      }
    }
    console.log(this.fish);
  }

  simulate() {
    if(this.process) {
      this.tick(CLOCK.getElapsed());
      requestAnimationFrame(() => {
        this.simulate();
      });
    }
  }

  start() {
    this.process = true;
    CLOCK.start();
    this.simulate();
  }

  stop() {
    this.process = false;
  }

  toString() {

  }
}

//temporary
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

module.exports = State;
