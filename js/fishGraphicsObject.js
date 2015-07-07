let PIXI = require('pixi.js');
let GraphicsObject = require('./graphicsObject');

class FishGraphicsObject extends GraphicsObject {
  constructor(aFish) {
    super(aFish, null);
    let body = new PIXI.Graphics();
    let chromosome = this.data.chromosome;
    let length = Math.sqrt(chromosome.weight * chromosome.lwRatio);
    let width = chromosome.weight/length;
    let tailLength = chromosome.tail;
    let tailWidth = width * 1.5; //arbitrary - should this change?
    let bodyColor = Math.floor(chromosome.bodyR) * 256 * 256 + Math.floor(chromosome.bodyG) * 256 + Math.floor(chromosome.bodyB);
    let eyeColor = Math.floor(chromosome.eyeR) * 256 * 256 + Math.floor(chromosome.eyeG) * 256 + Math.floor(chromosome.eyeB);
    body.lineStyle(2, eyeColor);
    body.beginFill(bodyColor);
    body.moveTo(Math.SQRT2/2 * (-width), Math.SQRT2/2 * length);
    body.lineTo(-tailWidth, length + tailLength);
    body.lineTo(0, length);
    body.lineTo(tailWidth, length + tailLength);
    body.lineTo(Math.SQRT2/2 * (width), Math.SQRT2/2 * length);
    body.drawEllipse(0, 0, width, length);
    body.beginFill(eyeColor).lineWidth = 0;
    body.drawCircle(0, -length / 2, 2);
    body.boundsPadding = 1;
    let texture = body.generateTexture();
    //let texture = PIXI.Texture.fromImage("./fishimage.png");
    this.sprite = new PIXI.Sprite(texture);
  }
}

module.exports = FishGraphicsObject;
