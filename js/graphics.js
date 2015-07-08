let $ = require('jquery');
let PIXI = require('pixi.js');
let FishGraphicsObject = require('./fishGraphicsObject');
let FoodGraphicsObject = require('./foodGraphicsObject');
let Algorithms = require('./algorithms');
let Food = require('./food.js')
let CONFIG = require('./config');

class Graphics {
  constructor(aState){
    this.state = aState;
    this.stage = new PIXI.Container();
    this.background = new PIXI.Container();
    this.background.addChild(new PIXI.Graphics().beginFill(0xA4FFFF).drawRect(0, 0, 800, 600));
    this.background.interactive = true;
    this.background.state = aState; // a quick hack. there has to be a better way
    this.stage.addChild(this.background);
    this.entities = [];
    this.food = [];
    this.draw = false;
    this.renderer = new PIXI.autoDetectRenderer(CONFIG.dimensions.x, CONFIG.dimensions.y);//temporary
    this.background.food = this.food; // a quick hack. there has to be a better way
	$('#canvas').html('');
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
      newFood.sprite.position = f.position;
      this.food.push(newFood);
      this.stage.addChild(newFood.sprite);
    }
    let allFish = this.state.fish
    for(let f of allFish) {
      let fishGraphics = new FishGraphicsObject(f);
      this.entities.push(fishGraphics);
      this.stage.addChild(fishGraphics.sprite);
    }

    this.background.mousedown = function(data) {
      let newFood = new Food(5 * Algorithms.randomWithinPercent(25), {x: data.data.global.x, y: data.data.global.y});
      this.state.addFood(newFood);
      let newFoodGraphics = new FoodGraphicsObject(newFood);
      newFoodGraphics.sprite.position = newFood.position;
      this.addChild(newFoodGraphics.sprite);
      this.food.push(newFoodGraphics);
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
    let indicesToRemove = [];
    for(let f of this.entities) {
      let data = f.data;
      let sprite = f.sprite;
      if (this.state.fish.indexOf(data) >= 0) {
        sprite.alpha = data.life;
        sprite.position = new PIXI.Point(data.position.x, data.position.y);
        sprite.rotation = data.velocity.t;
      } else {
        sprite.alpha = 0;
        indicesToRemove.push(this.entities.indexOf(f));
      }
    }
    for (let i of indicesToRemove) {
      this.entities.splice(i, 1);
    }
    indicesToRemove = [];
    for (let f of this.food) {
      if (this.state.food.indexOf(f.data) == -1) {
        f.sprite.alpha = 0;
        this.food.splice(this.food.indexOf(f), 1);
      }
    }
  }
}

module.exports = Graphics;
