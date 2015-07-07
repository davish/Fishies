let CONFIG = require('./config');
let stateDimensions = CONFIG.dimensions;

class Fish {
	constructor(aChromosome, aPosition = {x: 0, y:0}, aVelocity = {r: 0, t:0}) {
		this.chromosome = aChromosome;
		this.velocity = aVelocity;
		this.velocity = {r: 8, t: Math.random()*Math.PI*2};//temporary
		this.position = aPosition;
		this.alive = true;
		this.life = 1; //used when fish die
		this.energy = 100;
	}

	tick(time) {
		if(this.position.x > stateDimensions.x && this.velocity.t < Math.PI) {
			this.position.x = stateDimensions.x;
			this.velocity.t = Math.PI*2 - this.velocity.t;
		} else if(this.position.x < 0 && this.velocity.t >= Math.PI) {
			this.position.x = 0;
			this.velocity.t = Math.PI*2 - this.velocity.t;
		}
		if(this.position.y < 0 && (this.velocity.t < Math.PI/2 || this.velocity.t > Math.PI*3/2)) {
			this.velocity.t = Math.PI - this.velocity.t;
			if(this.velocity.t < 0) {
				this.velocity.t += Math.PI*2;
			}
		} else if(this.position.y > stateDimensions.y && (this.velocity.t >= Math.PI/2 && this.velocity.t <= Math.PI*3/2)) {
			this.velocity.t = Math.PI - this.velocity.t;
			if(this.velocity.t < 0) {
				this.velocity.t += Math.PI*2;
			}
		}

		if (this.alive) {
			this.position = {x: this.position.x + time/1000*this.velocity.r*Math.sin(this.velocity.t), y: this.position.y - time/1000*this.velocity.r*Math.cos(this.velocity.t)};
			this.energy -= time/50000 * this.chromosome.tail*this.chromosome.tail;
			if (this.energy < 0) {
				this.kill();
			}
		} else {
			this.life -= time/1000;
		}
	}

	kill() {
		this.alive = false;
	}

	static mate(momma, pappa) {
		let split = Math.floor(Math.random() * momma.length);

		let X = momma.chromosome.slice(0, split);
		let Y = pappa.chromosome.slice(split);

		return new Fish(X.concat(Y));
	}
}

module.exports = Fish;
