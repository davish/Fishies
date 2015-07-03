let Fish = require('./fish');
let Chromosome = require('./chromosome');
let CLOCK = require('./clock');

class State {
  constructor() {
    this.fish = [];
    this.food = [];
    this.process = false;

    //temporary
    let variance = 8;
    for(let i = 0; i < 8; i++) {
      this.fish.push(new Fish(new Chromosome(1000*Algorithms.randomWithinPercent(variance), 50*Algorithms.randomWithinPercent(variance), 25*Algorithms.randomWithinPercent(variance), Math.PI * Algorithms.randomWithinPercent(variance)), {x: 600*Algorithms.randomWithinPercent(25), y: 450*Algorithms.randomWithinPercent(25)}));
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
      f.tick(time);
    }
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
    let nextNextGaussian;
    let haveNextNextGaussian = false;
    let randomGaussian = () => {
    	if (haveNextNextGaussian) {
    		haveNextNextGaussian = false;
    		return nextNextGaussian;
    	} else {
    		let v1, v2, s;
    		do {
    			v1 = 2 * Math.random() - 1;
    			v2 = 2 * Math.random() - 1;
    			s = v1*v1 + v2*v2;
    		} while (s >= 1 || s == 0);
    		let multiplier = Math.sqrt(-2 * Math.log(s)/s);
    		nextNextGaussian = v2 * multiplier;
    		haveNextNextGaussian = true;
    		return v1 * multiplier;
    	}
    }
  	let gaussian = randomGaussian() * percent / 100;
  	if (gaussian >= 0) {
  		return 1 + gaussian;
  	} else {
  		return 1 / (1 + Math.abs(gaussian));
  	}
  }
}

module.exports = State;
