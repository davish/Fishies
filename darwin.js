/*
 * 
 * @author Davis Haupt
 * Copyright (c) Under the MIT License
 
 * Genetic algorithm originally for the Fishies project with Kevin Wang and Finn Voichick.
 * Goal is to make this as general as possible so as to be usable for other projects.
 */

 /**
	fitness is a function that takes an organism and calculates its fitness.
	mate takes two organisms and returns a child that contains part of each organism's chromosomes.
	mutate takes an organism and randomly edits its genome.
	generateOrganism generates a random starting organism and returns it to be added to the population.
	
 */
function Darwin(fitness, mate, mutate, generateOrganism, step, popSize, depth) {
	// create the first generation
	this.fitness = fitness;
	this.mate = mate;
	this.mutate = mutate;
	this.popSize = popSize;
	
	this.population = [];

	// gotta generate the first generation
	for (var i=0; i < popSize; i++) {
		this.population.push(generateOrganism());
	}
}

