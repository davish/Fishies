var Darwin = require("./darwin.js").Darwin;

// TODO: change these functions to generator functions that return functions, so as to make the calcFitness and mutateWord functions be more generic
// match with diff strings and diff mutation rates

var Word = function(c) {
	this.chromosome = c;
	//this.possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ";
}
Word.possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ";

Word.prototype.toString = function() {
	return this.chromosome.join('');
}

var generate = function() {
	var c = [];
	for (var i=0; i<11; i++)
		c.push(Word.possible.charAt(Math.floor(Math.random() * Word.possible.length)));
	return new Word(c);
}

var calcFitness = function(W) {
	var target = "Hello World";
	var distance = 0;
	for (var i = 0; i < target.length; i++) {
		if (W.chromosome[i] != target.charAt(i))
			distance++;
	}
	return distance;
}

var mutateWord = function(W) {
	for (var i=0; i< W.chromosome.length; i++) {
		if (Math.random() * 100 < 10) // 10% mutation rate
			W.chromosome[i] = Word.possible.charAt(Math.floor(Math.random() * Word.possible.length));
	}
}

var runSimulation = function(population, roundNum) {
//	console.log("Round: " + roundNum);
//	console.log(population.length);
//	console.log(population.length);

	for (var i=0; i < population.length; i++) {
		if (calcFitness(population[i]) < 1) {
			console.log(population[i].toString() + " | fitness: " + calcFitness(population[i]) + " | round: " + roundNum);
			break;
		}
	}
	//console.log("\n GENERATION OVER \n")
}

var GENERATIONS = 50;
var POPSIZE = 100;
var PARENTS = 6;

var d = new Darwin(Word, calcFitness, mutateWord, generate, runSimulation, POPSIZE, PARENTS, false, true);
/*var pop = [
			new Word('Hello World'.split('')), 
			new Word('Hello Wdrld'.split('')), 
			new Word('Hellp Wdrdd'.split('')),
			generate(),
			generate(),
			generate(),
			generate(),
			generate(),
			generate(),
			generate()
		];
console.log(d.tournament(pop))
	*/	
for (var i=0; i < GENERATIONS; i++)
	d.step(i);