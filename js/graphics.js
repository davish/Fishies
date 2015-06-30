let PIXI = require('pixi.js');
let $ = require('jquery');

class Graphics {
  constructor(aState){
    this.renderer = PIXI.WebGLRenderer(800, 600);
    $('#canvas').append(this.renderer.view);
    this.stage = new PIXI.Container();
    this.state = aState;
    this.obj = [];
  }

  render() {
    this.renderer.render(this.stage);
  }
}

module.exports = Graphics;
