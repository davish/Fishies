var Darwin = require("./darwin.js");

var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ";
var Word = function(c) {
	this.chromosome = c;
}


Word.prototype.toString = function() {
	return this.chromosome.join('');
}

var generate = function() {
	var c = [];
	for (var i=0; i<11; i++)
		c.push(possible.charAt(Math.floor(Math.random() * possible.length)));
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
	var pivot = Math.floor(Math.random() * M.length);
	var X = M.slice(0, pivot);
	var Y = P.slice(pivot);
	
	var nemo = new Word(X.concat(Y));
	return nemo;
}

console.log(generate().toString());