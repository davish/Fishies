var stage, allFish;
var stageHeight = 600, stageWidth = 800;
var variance = 25, numberOfFish = 50;
function init() {
	stage = new createjs.Stage("demoCanvas");
	var background = new createjs.Shape();
	background.graphics.beginFill("PaleTurquoise").drawRect(0, 0, stageWidth, stageHeight);
	stage.addChild(background);
	allFish = [];
	for (var i = 0; i < numberOfFish; i++) {
		var chromosome = [50*randomWithinPercent(variance), 20*randomWithinPercent(variance), 5*randomWithinPercent(variance), 30*randomWithinPercent(variance), 2*randomWithinPercent(variance), 360*Math.random(), 100*Math.random(), 100*Math.random(), 360*Math.random(), 100*Math.random(), 100*Math.random()];
		var newFish = new Fish(chromosome);
		newFish.shape.x = stageWidth / 2;
		newFish.shape.y = stageHeight / 2;
		stage.addChild(newFish.shape);
		newFish.shape.on("click", (function(aFish){
			return function(event) {
				aFish.kill();
			}
		})(newFish));
		allFish[i] = newFish;
	}
	createjs.Ticker.on("tick", tick);
	createjs.Ticker.setFPS(60);
}
function tick(event) {
	stage.update(event);
	for (var i = 0; i < allFish.length; i++) {
		if (allFish[i] != null) {
			var eachFish = allFish[i];
			if (eachFish.dead) {
				if (eachFish.shape.alpha > 0) {
					eachFish.shape.alpha -= 0.02;
				} else {
					eachFish.visible = false;
					allFish[i] = null;
				}
			} else {
				if (eachFish.shape.x <= 0 || eachFish.shape.x >= stageWidth || eachFish.shape.y <= 0 || eachFish.shape.y >= stageHeight || Math.random() < 1/30) {
					eachFish.direct();
				}
				eachFish.move(event.delta / 1000 * 100);
			}
		}
	}
}
var nextNextGaussian;
var haveNextNextGaussian = false;
function randomGaussian() {
	if (haveNextNextGaussian) {
		haveNextNextGaussian = false;
		return nextNextGaussian;
	} else {
		var v1, v2, s;
		do {
			v1 = 2 * Math.random() - 1;
			v2 = 2 * Math.random() - 1;
			s = v1*v1 + v2*v2;
		} while (s >= 1 || s == 0);
		var multiplier = Math.sqrt(-2 * Math.log(s)/s);
		nextNextGaussian = v2 * multiplier;
		haveNextnextGaussian = true;
		return v1 * multiplier;
	}
}
function randomWithinPercent(percent) {
	var gaussian = randomGaussian() * percent / 100;
	if (gaussian >= 0) {
		return 1 + gaussian;
	} else {
		return 1 / (1 + Math.abs(gaussian));
	}
}
