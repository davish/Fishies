let Fish = require('fish');
let Chromosome = require('chromosome');

class State() {
  constructor() {
    this.fish = [];
    this.food = [];

    //temporary
    fish.push(new Fish(new Chromosome()))
  }

  addFish(aFish) {
    fish.push(aFish);
  }

  addFood(aFood) {
    food.push(aFood);
  }
}

module.exports = State;
