/*
 * 
 * @author Davis Haupt
 * Copyright (c) Under the MIT License
 
 * Genetic algorithm originally for the Fishies project with Kevin Wang and Finn Voichick.
 * Goal is to make this as general as possible so as to be usable for other projects.
 */

 /**
	fitness(organism) is a function that takes an organism and calculates its fitness.
	mate(mom, dad) takes two organisms and returns a child that contains part of each organism's chromosomes.
	mutate(organism) takes an organism and randomly edits its genome.
	generateOrganism() generates a random starting organism and returns it to be added to the population.
	simulate(population[, i]) takes an array of the population and runs the simulation for one generation. 
		optionally takes an int with the gen number for the purposes of the simulation.
	popSize is an int that represents the size of the population that is simulated.
	survivalRate is an int (smaller than popSize) that represents how many organisms of the previous generation moves on to the next generation.
	tournament is a boolean value of whether the successors(population) function determines the successors based on tournament or roulette wheel.
 */
function Darwin(fitness, mate, mutate, generateOrganism, simulate, popSize, survivalRate, tournament) {
	// create the first generation
	this.fitness = fitness;
	this.mate = mate;
	this.mutate = mutate;
	this.simulate = simulate;
	this.popSize = popSize;
	this.survivalRate = survivalRate < popSize ? survivalRate : popSize;
	
	this.population = [];

	// gotta generate the first generation
	for (var i=0; i < popSize; i++) {
		this.population.push(generateOrganism());
	}
}
Darwin.prototype.step = function() {
	this.simulate(this.population);
	var parents = this.successors(this.population);
	var nextGen = [].concat(parents);
	for (var i=0; i < (popSize - survivalRate); i++) {
		// create a new organism from two random parents.
		var nemo = this.mate(parents[Math.floor(Math.random() * parents.length)], parents[Math.floor(Math.random() * parents.length)]);
		this.mutate(nemo);
		nextGen.push(nemo);
	}
	this.population = nextGen;
}
Darwin.prototype.successors = function(pop) {
	pop = [].concat(pop);
	pop.sort(function(a, b) {
		return this.fitness(a) - this.fitness(b);
	});
	var parents = this.population.slice(0, survivalRate);
}

module.exports.Darwin = Darwin;