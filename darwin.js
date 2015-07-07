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
Darwin.prototype.step = function(roundNum) {
	this.simulate(this.population, roundNum);
	var parents = this.tournament(this.population);
	var nextGen = [];
	while (nextGen.length < this.popSize) {
		// create two new organisms from two random parents.
		var nemo = this.mate(parents[Math.floor(Math.random() * parents.length)], parents[Math.floor(Math.random() * parents.length)]);
		if (typeof nemo.indexOf === "undefined")
			this.mutate(nemo);
		else {
			for (var j=0; j < nemo.length; j++)
				this.mutate(nemo[j]);
		}
		nextGen = nextGen.concat(nemo); // will push all elements, if by chance it is an array because of multiple children.
	}
	nextGen = nextGen.slice(0, this.popSize);
	this.population = nextGen;
}

// For the "Hello World" example, truncation finds a solution in ~120 generations.
Darwin.prototype.truncate = function(pop) {
	pop = [].concat(pop);
	var f = this.fitness;
	pop.sort(function(a, b) {
		return f(a) - f(b);
	});
	var parents = [];
	for (var i=0; i < this.survivalRate; i++) {
	//	if (pop[i])
			parents.push(pop[i]);
	}
	return parents;
}
// For "Hello World", only approaches a distance of 2 from the solution in many generations with much larger populations.
// When there's an actual goal in mind
Darwin.prototype.tournament = function(pop) {
	pop = [].concat(pop);
	var f = this.fitness;
	var parents = [];
	while (pop.length > 1) {
		var i = Math.floor(Math.random() * pop.length);
		var o1 = pop[i];
		pop.splice(i, 1);
		var j = Math.floor(Math.random() * pop.length);
		var o2 = pop[j];
		pop.splice(j, 1);
		f(o1) < f(o2) ? parents.push(o1) : parents.push(o2);
	}
	parents = parents.slice(0, this.survivalRate);
	return parents;
}

module.exports.Darwin = Darwin;