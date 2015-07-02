let PIXI = require('pixi.js');
let GraphicsObject = require('./graphicsObject');

class FishGraphicsObject extends GraphicsObject {
  constructor(aFish) {
    super(aFish, null);
    let shape = new PIXI.Container();
    let body = new PIXI.Graphics();
    body.lineStyle(6, 0x2f5e8e, 1);
    body.drawEllipse(this.data.position.x, this.data.position.y, this.data.chromosome.weight/this.data.chromosome.length, this.data.chromosome.length);
    let left = new PIXI.Graphics();
    left.drawEllipse(this.data.position.x - this.data.chromosome.tail*Math.SQRT2/2, this.data.position.y + this.data.chromosome.length + this.data.chromosome.tail*Math.SQRT2/2, this.data.chromosome.tail, this.data.chromosome.tail*3);
    left.rotation = Math.PI/2;
    left.lineStyle(6, 0x8800f0, 1);
    let right = left.clone();
    right.x = this.data.position.x + this.data.chromosome.tail*Math.SQRT2/2;
    right.y = this.data.position.y + this.data.chromosome.length + this.data.chromosome.tail*Math.SQRT2/2;
    shape.addChild(body);
    shape.addChild(left);
    shape.addChild(right);
    this.shape = shape;
    console.log(shape);
    //container children are relative to parent
  }
}

module.exports = FishGraphicsObject;
