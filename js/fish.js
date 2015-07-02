class Fish {
	constructor(aChromosome, aPosition = {x: 0, y:0}, aVelocity = {r: 0, t:0}) {
		this.chromosome = aChromosome;
		this.velocity = aVelocity;
		this.velocity = {r: 8, t: Math.random()*Math.PI*2};//temporary 
		this.position = aPosition;
	}

	tick() {

	}
}

module.exports = Fish;
