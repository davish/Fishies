class Chromosome {
  constructor(weight, lwRatio, tail, bodyR, bodyG, bodyB, eyeR, eyeG, eyeB, vision){
    this.weight = weight;
    this.lwRatio = lwRatio;
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
