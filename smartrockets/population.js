// A Population class containing all the individual Rocket, Target, and Obstacle objects.
function Population(target, obstacles) {
  // Constructs a new Population object which stores the Rocket, Target, and Obstacle objects.
  this.rockets = [];
  for (var i = 0; i < POP_SIZE; i++) {
    this.rockets[i] = new Rocket();
  }
  this.target = target;
  this.obstacles = obstacles;
  // A function to evolve a new generation of Rocket objects, based on the process of natural selection.
  this.evolve = function() {
    var maxFitness = 0;
    for (var i = 0; i < this.rockets.length; i++) {
      this.rockets[i].calculateFitness();
      if (this.rockets[i].fitness > maxFitness) {
        maxFitness = this.rockets[i].fitness;
      }
    }
    for (var i = 0; i < this.rockets.length; i++) {
      this.rockets[i].fitness /= maxFitness;
    }
    var matingPool = [];
    for (var i = 0; i < this.rockets.length; i++) {
      var n = this.rockets[i].fitness * 100;
      for (var j = 0; j < n; j++) {
        matingPool.push(this.rockets[i]);
      }
    }
    var newRockets = [];
    for (var i = 0; i < this.rockets.length; i++) {
      var parentA = random(matingPool);
      var parentB = random(matingPool);
      var child = parentA.dna.crossover(parentB.dna);
      child.mutate(MUTATION_RATE);
      newRockets[i] = new Rocket(child);
    }
    this.rockets = newRockets;
  }
  // A function to simulate this Population object.
  this.simulate = function() {
    for (var i = 0; i < this.rockets.length; i++) {
      this.rockets[i].update(this.target, this.obstacles);
      this.rockets[i].show();
    }
  }
}
