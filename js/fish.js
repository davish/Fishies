class Fish {
	constructor(aChromosome, aPosition = {x: 0, y:0}, aVelocity = {r: 0, t:0}) {
		this.chromosome = aChromosome;
		this.velocity = aVelocity;
		this.position = aPosition;
		//this.graphics = aGraphics; encapsulate fish by graphics
	}

	tick() {

	}
}

module.exports = Fish;
