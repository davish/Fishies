let State = require('./state');
let Graphics = require('./graphics');

function init() {
  let currentState = new State();
  console.log(currentState);
}

function reset() {
  return false;
}
