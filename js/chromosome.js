class Chromosome {
  constructor(weight, length, tail, bodyR, bodyG, bodyB, eyeR, eyeG, eyeB, vision){
    this.weight = weight;
    this.length = length;
    this.tail = tail;
    this.bodyR = bodyR;
    this.bodyG = bodyG;
    this.bodyB = bodyB;
    this.eyeR = eyeR;
    this.eyeG = eyeG;
    this.eyeB = eyeB;
    this.vision = vision; //radians
  }

  combine(chromoB) {

  }
}

module.exports = Chromosome;
