let $ = require('jquery');
let PIXI = require('pixi.js');
let FishGraphicsObject = require('./fishGraphicsObject');

class Graphics {
  constructor(aState){
    this.stage = new PIXI.Container();
    this.state = aState;
    this.entities = [];
    this.draw = false;
    this.renderer = new PIXI.autoDetectRenderer(this.state.dimensions.x, this.state.dimensions.y);
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
    for(let f of this.state.fish) {
      this.entities.push(new FishGraphicsObject(f));
    }
    for(let {shape} of this.entities){
      console.log(shape);
      this.stage.addChild(shape);
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
    for(let {data, shape} of this.entities) {
      shape.position = new PIXI.Point(data.position.x, data.position.y);
      shape.rotation = data.velocity.t;
    }
  }
}

module.exports = Graphics;
