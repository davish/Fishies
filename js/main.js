let $ = require('jquery');
let State = require('./state');
let Graphics = require('./graphics');
let gen = require('./galapagos').generateChromosome;
let env = require('./galapagos').Environment;
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
  // Simulation.init();
  $('form#controls').submit(function(e) {
	  var popSize = parseInt($("input[name=population]").val());
	  var truncation = parseInt($("input[name=selection]:checked").val()) == 1;
	  var successors = parseInt($("input[name=tournamentPop]").val());
	  var uniform = $("input[name=crossoverMethod]:checked").val() === "uniform";

  	  var mutationRate = parseInt($("input[name=dynamicMutation]").val());

	  
	  var crossOverRate = parseInt($("input[name=crossoverRate]").val()); // not implemented
	  
	  var Galapagos = env(popSize, successors, uniform, truncation);
  });
});

window.stopSimulation = () => {
  Simulation.state.stop();
  Simulation.graphics.stop();
};
