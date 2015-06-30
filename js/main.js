let State = require('./state');
let Graphics = require('./graphics');

let Simulation = {
  init() {
    this.currentState = new State();
    console.log(this.currentState);
  }
};

$(document).ready(() => {
  Simulation.init();
})
