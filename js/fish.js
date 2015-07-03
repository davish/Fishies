class Fish {
	constructor(aChromosome, aPosition = {x: 0, y:0}, aVelocity = {r: 0, t:0}) {
		this.chromosome = aChromosome;
		this.velocity = aVelocity;
		this.velocity = {r: 8, t: Math.random()*Math.PI*2};//temporary
		this.position = aPosition;
		this.alive = true;
	}

	tick(time) {
		this.position = {x: time/1000*this.velocity.r*Math.sin(this.velocity.t), y: time/1000*this.velocity.r*Math.cos(this.velocity.t)};
	}
}

module.exports = Fish;
