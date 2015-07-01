let $ = require('jquery');
let PIXI = require('pixi.js');
let FishGraphicsObject = require('./fishGraphicsObject');

class Graphics {
  constructor(aState){
    this.renderer = new PIXI.autoDetectRenderer(1200, 900);
    $('#canvas').append(this.renderer.view);
    this.stage = new PIXI.Container();
    this.state = aState;
    this.entities = [];
    this.draw = false;
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
      this.stage.addChild(shape);
    }
  }

  render() {
    if(this.draw) {
      console.log('render');
      this.renderer.render(this.stage);
      requestAnimationFrame(() => {
        this.render();
      });
    }
  }
}

module.exports = Graphics;
