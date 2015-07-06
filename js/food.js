class Food {
  constructor(amount, position = {x: 0, y: 0}) {
    this.amount = amount;
    this.position = position;
  }
}

module.exports = Food;
