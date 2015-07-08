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
    for (let i = 0; i < population.length * 5; i++) {
      this.food.push(new Food(5 * Algorithms.randomWithinPercent(25), {x: 800 * Math.random(), y: 600 * Math.random()}));
    }
	  for (let i = 0; i < population.length; i++) {
		  this.fish.push(new Fish(population[i], {x: 800 * Math.random(), y: 600 * Math.random()}, {r: 20, t: 2*Math.PI * Math.random()}, this));
	  }
  }

  addFish(aFish) {
    this.fish.push(aFish);
  }

  removeFish(aFish) {
    let i = this.fish.indexOf(aFish);
    if (i >= 0) {
      this.fish.splice(i, 1);
    }
  }

  addFood(aFood) {
    this.food.push(aFood);
  }

  removeFood(aFood) {
    let i = this.food.indexOf(aFood);
    if (i >= 0) {
      this.food.splice(i, 1);
    }
  }

  tick(time) {
    for(let f of this.fish){
      if (f.life > 0) {
        f.tick(time);
      } else {
        this.removeFish(f);
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
		this.fish[i].chromosome.fitness = -this.fish[i].energy; // lower is better for the sort
	}
  }

  toString() {

  }
}

module.exports = State;
