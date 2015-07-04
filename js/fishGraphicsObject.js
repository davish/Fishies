let PIXI = require('pixi.js');
let GraphicsObject = require('./graphicsObject');

class FishGraphicsObject extends GraphicsObject {
  constructor(aFish) {
    super(aFish, null);
    let shape = new PIXI.Container();
    let body = new PIXI.Graphics();
    let length = this.data.chromosome.length;
    let width = this.data.chromosome.weight/this.data.chromosome.length;
    let tailLength = this.data.chromosome.tail;
    let tailWidth = width * 2; //arbitrary - should this change?
    body.lineStyle(2, 0x0000ff);
    body.beginFill(0xff0000);
    body.moveTo(Math.SQRT2/2 * (-width), Math.SQRT2/2 * length);
    body.lineTo(-tailWidth, length + tailLength);
    body.lineTo(0, length);
    body.lineTo(tailWidth, length + tailLength);
    body.lineTo(Math.SQRT2/2 * (width), Math.SQRT2/2 * length);
    body.drawEllipse(0, 0, width, length);
    shape.addChild(body);
    this.shape = shape;
  }
}

module.exports = FishGraphicsObject;
