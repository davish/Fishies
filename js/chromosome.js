class Chromosome {
  constructor(g){
	this.genes = g;
	this.fitness = 0; // obvi they haven't proven themselves yet.
  }

  get chromosome() {
    return this.genes;
  }
  
  get weight(){
	  return this.genes[0];
  }
  get lwRatio() {
	  return this.genes[1];
  }
  get tail() {
	  return this.genes[2];
  }
  get bodyR() {
	  return this.genes[3];
  }
  get bodyG() {
	  return this.genes[4];
  }
  get bodyB() {
	  return this.genes[5];
  }
  get eyeR() {
	  return this.genes[6];
  }
  get eyeG() {
	  return this.genes[7];
  }
  get eyeB() {
	  return this.genes[8];
  }
  get vision() {
	  return this.genes[9];
  }
  get alpha() {
	  return this.genes[10];
  }
  get beta() {
	  return this.genes[11];
  }
  get gamma() {
	  return this.genes[12];
  }
}

module.exports = Chromosome;
