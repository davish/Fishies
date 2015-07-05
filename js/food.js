class Food {
  constructor(aAmount, aPosition = {x: 0, y: 0}) {
    this.amount = aAmount;
    this.position = aPosition;
  }
}

module.exports = Food;
