// A DNA class containing all the instructions of a rocket.
function DNA(genes) {
  // Constructs a new DNA object which stores the instructions of a rocket.
  if (genes) {
    this.genes = genes;
  } else {
    this.genes = [];
    for (var i = 0; i < LIFE_SPAN; i++) {
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].setMag(MAX_FORCE);
    }
  }
  // A function to produce a DNA with a new combination of instructions.
  this.crossover = function(partner) {
    var newGenes = [];
    for (var i = 0; i < this.genes.length; i++) {
      newGenes[i] = (random(1) < 0.5) ? this.genes[i] : partner.genes[i];
    }
    return new DNA(newGenes);
  }
  // A function to randomly mutate instructions stored in this DNA.
  this.mutate = function(mutationRate) {
    for (var i = 0; i < this.genes.length; i++) {
      if (random(1) < mutationRate) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(MAX_FORCE);
      }
    }
  }
}
