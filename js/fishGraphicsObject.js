let PIXI = require('pixi.js');
let GraphicsObject = require('./graphicsObject');

class FishGraphicsObject extends GraphicsObject {
  constructor(aFish) {
    super(aFish, null);
    let shape = new PIXI.Container();
    let body = new PIXI.Graphics();
    body.lineStyle(6, 0x2f5e8e, 1);
    body.drawEllipse(this.data.position.x, this.data.position.y, this.data.chromosome.weight/this.data.chromosome.length, this.data.chromosome.length);
    // let left = new PIXI.Graphics();
    // left.drawEllipse(this.data.position.x - this.data.chromosome.tail*Math.SQRT2/2, this.data.position.y - this.data.chromosome.length*Math.SQRT2/2, this.data.chromosome.tail, this.data.chromosome.tail*3);
    // let right = left.clone();
    // right.x = this.data.position.x + this.data.chromosome.tail*Math.SQRT2/2;
    // right.y = this.data.position.y - this.data.chromosome.length*Math.SQRT2/2;
    shape.addChild(body);
    // shape.addChild(left);
    // shape.addChild(right);
    this.shape = shape;
  }
}

module.exports = FishGraphicsObject;
