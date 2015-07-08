let CONFIG = require('./config');
let stateDimensions = CONFIG.dimensions;

const radii = {
	predator: 200,
	prey: 200,
	food: 300
};

class Fish {
	constructor(aChromosome, aPosition = {x: 0, y:0}, aVelocity = {r: 0, t:0}, aState) {
		this.chromosome = aChromosome;
		this.velocity = aVelocity;
		this.velocity.r = this.chromosome.tail / this.chromosome.weight * 500;
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

		this.movement();

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
		let vector = {
			x: 0,
			y: 0
		};

		for (let predator of this.bigFish()){
			let theta = Fish.angle(this.position, predator.position);
			vector.x -= Math.sin(theta)*250/Fish.distance(this.position, predator.position)*this.chromosome.beta;
			vector.y += Math.cos(theta)*250/Fish.distance(this.position, predator.position)*this.chromosome.beta;
		}

		for(let prey of this.smallFish()){
			let theta = Fish.angle(this.position, prey.position);
			vector.x += Math.sin(theta)*prey.weight/Fish.distance(this.position, prey.position)*this.chromosome.alpha;
			vector.y -= Math.cos(theta)*prey.weight/Fish.distance(this.position, prey.position)*this.chromosome.alpha;
		}

		for(let food of this.food()){
			let theta = Fish.angle(this.position, food.position);
			vector.x += Math.sin(theta)*250/Fish.distance(this.position, food.position)*this.chromosome.gamma;
			vector.y -= Math.cos(theta)*250/Fish.distance(this.position, food.position)*this.chromosome.gamma;
		}

		let theta = Math.atan2(vector.x, vector.y);
		if(theta < 0) {
			theta += Math.PI*2;
		}
		this.velocity.t = theta;
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
			if (Fish.distance(this.position, f.position) < 5) {
				this.state.removeFood(f);
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

	static angle(pointA, pointB){
		let dX = pointB.x - pointA.x;
		let dY = pointA.y - pointB.y;
		let theta = Math.atan2(dX,dY);//due to shifted polar coordinate system
		if(theta < 0) {
			theta += Math.PI*2;
		}
		return theta;
	}
}

module.exports = Fish;
