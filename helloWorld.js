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
var mateWords = function(M, P) {
	var pivot = Math.floor(Math.random() * M.chromosome.length);
	var X1 = M.chromosome.slice(0, pivot);
	var Y1 = P.chromosome.slice(pivot);
	
	var Y2 = P.chromosome.slice(0, pivot);
	var X2 = M.chromosome.slice(pivot);
	
	var nemo = new Word(X1.concat(Y1));
	var marlinjr = new Word(Y2.concat(X2));
	return [nemo, marlinjr];
}

var mutateWord = function(W) {
	for (var i=0; i< W.chromosome.length; i++) {
		if (Math.random() * 100 < 10) // 10% mutation rate
			W.chromosome[i] = Word.possible.charAt(Math.floor(Math.random() * Word.possible.length));
	}
}

var runSimulation = function(population, roundNum) {
	for (var i=0; i < population.length; i++) {
		if (calcFitness(population[i]) < 1)
			console.log(population[i].toString() + "| fitness: " + calcFitness(population[i]) + " | round: " + roundNum);
	}
	//console.log("\n GENERATION OVER \n")
}

var d = new Darwin(calcFitness, mateWords, mutateWord, generate, runSimulation, 100, 6, true);
for (var i=0; i < 150; i++)
	d.step(i);