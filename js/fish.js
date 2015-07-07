let CONFIG = require('./config');
let stateDimensions = CONFIG.dimensions;

const radii = {
	predator: 30,
	prey: 30,
	food: 42
};

class Fish {
	constructor(aChromosome, aPosition = {x: 0, y:0}, aVelocity = {r: 0, t:0}, aState) {
		this.chromosome = aChromosome;
		this.velocity = aVelocity;
		this.velocity = {r: 8, t: Math.random()*Math.PI*2};//temporary
		this.position = aPosition;
		this.alive = true;
		this.life = 1; //used when fish die
		this.energy = 100;
		this.state = aState;
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
			this.eat();
			this.energy -= time/50000 * this.chromosome.tail*this.chromosome.tail;
			if (this.energy < 0) {
				this.kill();
			}
		} else {
			this.life -= time/1000;
		}
	}

	movement() {
		let enemies = [];

	}

	bigFish() {
		let result = [];
		for (let f of this.state.fish) {
			if (Fish.distance(this.position, f.position) < radii.predator && this.weight * 3/2 < f.weight) {
				result.push(f);
			}
		}
		return result;
	}

	smallFish() {
		let result = [];
		for (let f of this.state.fish) {
			if (Fish.distance(this.position, f.position) < radii.prey && this.weight * 2/3 > f.weight) {
				result.push(f);
			}
		}
		return result;
	}

	food() {
		let result = [];
		for (let f of this.state.food) {
			if (Fish.distance(this.position, f.position) < radii.food) {
				result.push(f);
			}
		}
		return result;
	}

	kill() {
		this.alive = false;
	}

	eat() {
		for (let f of this.food()) {
			console.log("Food: " + f + " Fish: " + this);
			if (Fish.distance(this.position, f.position) < 5) {
				let i = this.state.food.indexOf(f);
				this.state.food.splice(i, 1);
				this.energy += f.amount;
			}
		}
	}

	static mate(momma, pappa) {
		let split = Math.floor(Math.random() * momma.length);

		let X = momma.chromosome.slice(0, split);
		let Y = pappa.chromosome.slice(split);

		return new Fish(X.concat(Y));
	}

	static distance(pointA, pointB) {
		let dX = pointA.x - pointB.x;
		let dY = pointA.y - pointB.y;
		return Math.sqrt(dX*dX + dY*dY);
	}
}

module.exports = Fish;
