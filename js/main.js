let $ = require('jquery');
let State = require('./state');
let Graphics = require('./graphics');
let gen = require('./galapagos').generateChromosome;
let Simulation = {
  init() {

	var pop = [];
	for (let i=0; i<25; i++) {
		pop.push(gen());
	}
    this.state = new State(pop);
    this.graphics = new Graphics(this.state);
    this.graphics.initialize();
    this.graphics.start();
    this.state.start();
  }
};

$(document).ready(() => {
  Simulation.init();
  $('form#controls').submit(function(e) {
	  var popSize = parseInt($("input[name=population]").val());
	  var succession = parseInt($("input[name=selection]:checked").val());
	  var successors = parseInt($("input[name=tournamentPop]").val());
	  var crossOverRate = parseInt($("input[name=crossoverRate]").val());
	  var uniform = $("input[name=crossoverMethod]:checked").val() === "uniform";
  });
});

window.stopSimulation = () => {
  Simulation.state.stop();
  Simulation.graphics.stop();
};
