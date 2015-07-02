let $ = require('jquery');
let State = require('./state');
let Graphics = require('./graphics');

let Simulation = {
  init() {
    this.state = new State();
    this.graphics = new Graphics(this.state);
    console.log(this.state);
    this.graphics.initialize();
    this.graphics.start();
  }
};

$(document).ready(() => {
  Simulation.init();
});

window.stopSimulation = () => {
  Simulation.graphics.stop();
};
