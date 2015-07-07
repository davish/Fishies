let Food = require('./food');
let Fish = require('./fish');
let Chromosome = require('./chromosome');
let CLOCK = require('./clock');
let Algorithms = require('./algorithms');
class State {
  // population is an array containing Chromosomes.
  // the chromosomes are objects containing the characteristics of a specific fish.
  // they are the objects that are maniuplated by the genetic algorithm.
  constructor(population) {

    this.fish = [];
    this.food = [];
    this.process = false;
    //temporary
    let variance = 25;
    for (let i = 0; i < 10; i++) {
      this.food.push(new Food(10 * Algorithms.randomWithinPercent(25), {x: 800 * Math.random(), y: 600 * Math.random()}));
    }
	// how to generate a fish:
	// 250*Algorithms.randomWithinPercent(variance), 2*Algorithms.randomWithinPercent(variance), 8*Algorithms.randomWithinPercent(variance), 256 * Math.random(), 256 * Math.random(), 256 * Math.random(), 256 * Math.random(), 256 * Math.random(), 256 * Math.random(), Math.PI / 2 * Algorithms.randomWithinPercent(50))
	for (let i = 0; i < population.length; i++) {
		this.fish.push(new Fish(population[i]));
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
	for (let i = 0; i < this.fish.length; i++) {
		this.fish[i].chromosome.fitness = this.fish[i].energy;
	}
  }

  toString() {

  }
}

module.exports = State;
