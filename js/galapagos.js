let Darwin = require('../darwin').Darwin;
let Chromosome = require('./chromosome');
let Algorithms = require('./algorithms');
let State = require('./state');
let Graphics = require('./graphics');
var calcFitness = function(F) {
	return F.fitness;
}

var VARIANCE = 25;
var MUTATION_RATE = 10;

var gaussianMutateChromosome = function(F) {
	// var sizeConstants = [250, 2, 8];
	for (let i=0; i<F.chromosome.length; i++) {
		if (i < 3) {
			F.chromosome[i] = F.chromosome[i] * Algorithms.randomWithinPercent(VARIANCE);
		}
		else if (i < 9) {
			F.chromosome[i] = Math.min(F.chromosome[i] * Algorithms.randomWithinPercent(VARIANCE), 255);
		}
	}
}

var randomMutateChromosome = function(F) {
	var defaults = [250, 2, 8];
	for (let i=0; i<F.chromsome.length; i++) {
		if (Math.random() * 100 < MUTATION_RATE) {
			if (i < 3) {
				F.chromosome[i] = defaults[i] * randomWithinPercent(VARIANCE);
			}
			else if (i < 9) {
				F.chromosome[i] = 256 * Math.random();
			}
		}
	}
}

var generateChromosome = function() {
	var c = [
				250*Algorithms.randomWithinPercent(25), 
				2*Algorithms.randomWithinPercent(25), 
				8*Algorithms.randomWithinPercent(25), 
				256 * Math.random(), 
				256 * Math.random(), 
				256 * Math.random(), 
				256 * Math.random(), 
				256 * Math.random(), 
				256 * Math.random()
			];
	return new Chromosome(c);
}

var runSimulation = function(population, roundNum) {
	let S = new State(population);
	var G = new Graphics(S);
    G.initialize();
    G.start();
    S.start();
}

var start = function() {
	let galapagos = new Darwin(Chromosome, calcFitness, gaussianMutateChromosome, generateChromosome, runSimulation, POPSIZE, PARENTS, UNIFORM, TRUNCATION);
}
