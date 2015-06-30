
/*
 * 
 * length, width, tailLength, tailWidth, eye, bodyH, bodyS, bodyL, eyeH, eyeS, eyeL
 * 
 */
function Fish(c) {
	this.chromosome = c;
	
	this.length = c[0];
	this.width = c[1];
	this.tailLength = c[2];
	this.tailWidth = c[3];
	this.eye = c[4];
	this.color = "hsl(" + c[5] % 360 + ", " + c[6] + "%, " + c[7] + "%)";
	this.eyeColor = "hsl(" + c[8] % 360 + ", " + c[9] + "%, " + c[10] + "%)";
	this.graphics = new createjs.Graphics();
	this.graphics.beginStroke(this.eyeColor).beginFill(this.color).moveTo(-this.length/4 *(1+Math.sqrt(2)), -this.width*Math.sqrt(2)/4);
	this.graphics.lineTo(-0.75*this.length - this.tailLength, -this.tailWidth/2).lineTo(-0.75*this.length, 0).lineTo(-0.75*this.length - this.tailLength, this.tailWidth/2).lineTo(-this.length/4 *(1+Math.sqrt(2)), this.width*Math.sqrt(2)/4).closePath;
	this.graphics.beginFill(this.color).drawEllipse(-0.75 * this.length, -0.5 * this.width, this.length, this.width);
	this.graphics.beginFill(this.eyeColor).drawCircle(0, 0, this.eye);
	this.shape = new createjs.Shape(this.graphics);
	this.dead = false;
	this.direct = function() {
		var min = 0, max = 360;
		if (this.shape.x <= 0) {
			min = 270;
			max = 90;
		} else if (this.shape.x >= 640) {
			min = 90;
			max = 270;
		}
		if (this.shape.y <= 0) {
			max = Math.min(180, max);
		} else if (this.shape.y >= 480) {
			min = Math.max(180, min);
		}
		if (max < min) {
			max += 360;
		}
		this.shape.rotation = (Math.random() * (max - min) + min) % 360;
		//console.log(this.shape.rotation);
	}
	this.move = function(pixels) {
		this.shape.x += pixels*Math.cos(this.shape.rotation * Math.PI / 180);
		this.shape.y += pixels*Math.sin(this.shape.rotation * Math.PI / 180);
	}
	this.kill = function() {
		this.dead = true;
	}
}

function mate(momma, pappa) {
	var split = Math.floor(Math.random() * X.length);
	
	var X = momma.chromosome.slice(0, split);
	var Y = pappa.chromosome.slice(split);
	
	return new Fish(X.concat(Y));
}