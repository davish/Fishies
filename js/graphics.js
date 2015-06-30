class Graphics {
  constructor(aState){
    this.stage = new createjs.Stage('canvas');
    let background = new createjs.Shape();
  	background.graphics.beginFill("PaleTurquoise").drawRect(0, 0, 640, 480);
  	stage.addChild(background);
    this.state = aState;
  }
}

module.exports = Graphics;
