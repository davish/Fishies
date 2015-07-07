let $ = require('jquery');
let PIXI = require('pixi.js');
let FishGraphicsObject = require('./fishGraphicsObject');
let FoodGraphicsObject = require('./foodGraphicsObject');
let CONFIG = require('./config');

class Graphics {
  constructor(aState){
    this.stage = new PIXI.Container();
    this.stage.addChild(new PIXI.Graphics().beginFill(0xA4FFFF).drawRect(0, 0, 800, 600))
    this.state = aState;
    this.entities = [];
    this.food = [];
    this.draw = false;
    this.renderer = new PIXI.autoDetectRenderer(CONFIG.x, CONFIG.y);//temporary
    $('#canvas').append(this.renderer.view);
  }

  stop() {
    this.draw = false;
  }

  start() {
    this.draw = true;
    this.render();
  }

  initialize() {
    for (let f of this.state.food) {
      let newFood = new FoodGraphicsObject(f);
      newFood.sprite.position = new PIXI.Point(f.position.x, f.position.y);
      this.food.push(newFood);
      this.stage.addChild(newFood.sprite);
    }
    for(let f of this.state.fish) {
      this.entities.push(new FishGraphicsObject(f));
    }
    for(let {sprite} of this.entities){
      this.stage.addChild(sprite);
    }
  }

  render() {
    if(this.draw) {
      this.update();
      this.renderer.render(this.stage);
      requestAnimationFrame(() => {
        this.render();
      });
    }
  }

  update() {
    for(let {data, sprite} of this.entities) {
      sprite.alpha = data.life;
      sprite.position = new PIXI.Point(data.position.x, data.position.y);
      sprite.rotation = data.velocity.t;
    }
  }
}

module.exports = Graphics;
