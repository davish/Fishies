let Fish = require('./fish');
let Chromosome = require('./chromosome');

class State {
  constructor() {
    this.fish = [];
    this.food = [];

    //temporary
    this.fish.push(new Fish(new Chromosome(1, 2, 3, 4)));
  }

  addFish(aFish) {
    fish.push(aFish);
  }

  addFood(aFood) {
    food.push(aFood);
  }

  tick() {

  }

  toString() {

  }
}

module.exports = State;
