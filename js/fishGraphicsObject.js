let PIXI = require('pixi.js');
let GraphicsObject = require('./graphicsObject');

class FishGraphicsObject extends GraphicsObject {
  constructor(aFish) {
    super(aFish, null);
    this.sprite = new PIXI.Sprite(FishGraphicsObject.normalTexture(aFish));
    this.sprite.interactive = true;
    this.sprite.mouseover = function(data) {
      this.texture = FishGraphicsObject.deadTexture(aFish);
    }
    this.sprite.mouseout = function(data) {
      if (aFish.alive) {
        this.texture = FishGraphicsObject.normalTexture(aFish);
      }
    }
    this.sprite.click = function(data) {
      aFish.kill();
    }
  }

  static normalTexture(fish) {
    let body = new PIXI.Graphics();
    let chromosome = fish.chromosome;
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
    return body.generateTexture();
  }

  static deadTexture(fish) {
    let body = new PIXI.Graphics();
    let chromosome = fish.chromosome;
    let length = Math.sqrt(chromosome.weight * chromosome.lwRatio);
    let width = chromosome.weight/length;
    let tailLength = chromosome.tail;
    let tailWidth = width * 1.5; //arbitrary - should this change?
    let bodyColor = Math.floor(chromosome.bodyR / 2) * 256 * 256 + Math.floor(chromosome.bodyG / 2) * 256 + Math.floor(chromosome.bodyB / 2);
    let eyeColor = Math.floor(chromosome.eyeR / 2) * 256 * 256 + Math.floor(chromosome.eyeG / 2) * 256 + Math.floor(chromosome.eyeB / 2);
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
    return body.generateTexture();
  }
}

module.exports = FishGraphicsObject;
