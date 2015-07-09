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
	this.pS = this.fish.length;
  }

  addFish(aFish) {
    this.fish.push(aFish);
  }

  removeFish(aFish) {
    let i = this.fish.indexOf(aFish);
	aFish.chromosome.fitness = 0;
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
	if (this.food.length < 1 || this.fish.length < (this.pS/3))
		window.Galapagos.step();
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

  stop(c) {
    this.process = false;
	for (let i = 0; i < this.fish.length; i++) {
		this.fish[i].chromosome.fitness = -this.fish[i].energy; // lower is better for the sort
	}
	// WARNING: JANK SOLUTION AHEAD.
	// Basically, after one generation, chromosomes weren't retaining their fitness values for a reason that is not yet clear.
	// Because of this, I'm not trusting the mutability of JavaScript Arrays and Objects, and I'm re-inserting all the chromosomes into the array.
	// BY: Davis Haupt, 1436479686. 
	window.Galapagos.population = [];
	for (let i=0; i < this.fish.length; i++) {
		window.Galapagos.population.push(this.fish[i].chromosome);
	}
	// END JANK SOLUTION. CARRY ON.
	window.Galapagos.nextGeneration(c);
  }

  toString() {

  }
}

module.exports = State;
