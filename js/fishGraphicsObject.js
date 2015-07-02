let PIXI = require('pixi.js');
let GraphicsObject = require('./graphicsObject');

class FishGraphicsObject extends GraphicsObject {
  constructor(aFish) {
    super(aFish, null);
    let shape = new PIXI.Container();
    let body = new PIXI.Graphics();
    body.lineStyle(2, 0x2f5e8e, 1);
    body.beginFill(0x2f5e8e, 0.5);
    body.drawEllipse(0, 0, this.data.chromosome.weight/this.data.chromosome.length, this.data.chromosome.length);
    body.moveTo(0, this.data.chromosome.length-5);
    body.lineTo(-this.data.chromosome.tail*Math.SQRT2*3/4, this.data.chromosome.length + this.data.chromosome.tail*Math.SQRT2);
    body.lineTo(0, this.data.chromosome.length + this.data.chromosome.tail*Math.SQRT2/3);
    body.lineTo(this.data.chromosome.tail*Math.SQRT2*3/4, this.data.chromosome.length + this.data.chromosome.tail*Math.SQRT2);
    body.lineTo(0, this.data.chromosome.length-5);
    shape.addChild(body);
    this.shape = shape;
  }
}

module.exports = FishGraphicsObject;
