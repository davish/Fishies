let PIXI = require('pixi.js');
let GraphicsObject = require('./graphicsObject');

class FoodGraphicsObject extends GraphicsObject {
  constructor(food) {
    super(food, null);
    let graphics = new PIXI.Graphics();
    graphics.lineStyle(2, 0xB8860B);
    graphics.beginFill(0xDAA520);
    graphics.drawCircle(0, 0, food.amount);
    graphics.boundsPadding = 1;
    let texture = graphics.generateTexture();
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
  }
}

module.exports = FoodGraphicsObject;
