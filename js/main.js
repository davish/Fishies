let $ = require('jquery');
let State = require('./state');
let Graphics = require('./graphics');

let Simulation = {
  init() {
    this.state = new State();
    this.graphics = new Graphics(this.state);
    this.graphics.initialize();
    this.graphics.start();
    this.state.start();
  }
};

$(document).ready(() => {
  Simulation.init();
});

window.stopSimulation = () => {
  Simulation.state.stop();
  Simulation.graphics.stop();
};
