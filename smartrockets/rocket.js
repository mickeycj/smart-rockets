// A Rocket class containing movement vectors and its status within the simulation.
function Rocket(dna) {
  // Constructs a new Rocket object which stores the position, velocity, acceleration, and its status.
  if (dna) {
    this.dna = dna
  } else {
    this.dna = new DNA();
  }
  this.position = createVector(ROCKET_X_POS, ROCKET_Y_POS);
  this.velocity = createVector();
  this.acceleration = createVector();
  this.recordDistance = WIDTH*HEIGHT;
  this.cyclesLeft = LIFE_SPAN-1;
  this.finished = false;
  this.crashed = false;
  this.fitness = 0;
  this.color = BLUE;
  // A function to calculate the fitness of this rocket based on its record distance and finished time.
  this.calculateFitness = function() {
    this.fitness = map(this.recordDistance, 0, WIDTH, WIDTH, 0) + (this.cyclesLeft * this.cyclesLeft);
    if (this.finished) {
      this.fitness *= 10;
    }
    if (this.crashed) {
      this.fitness /= 10;
    }
  }
  // A function to apply the vector instruction to the current vectors.
  this.applyForce = function(force) {
    this.acceleration.add(force);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.velocity.limit(MAX_VELOCITY);
  }
  // A function to check whether this Rocket object has reached its target.
  this.checkTarget = function(target) {
    var distance = dist(this.position.x, this.position.y, target.position.x, target.position.y);
    if (distance < this.recordDistance) {
      this.recordDistance = distance;
    }
    if (this.recordDistance < target.criticalRadius) {
      this.position = target.position.copy();
      this.finished = true;
      this.color = GREEN;
    } else if (!this.finished) {
      this.cyclesLeft--;
    }
  }
  // A function to check whether this Rocket object has hit an obstacle or a wall.
  this.checkCrash = function(obstacles) {
    var crashed = false;
    for (var i = 0; i < obstacles.length; i++) {
      crashed = crashed
                || this.position.x > obstacles[i].position.x && this.position.x < obstacles[i].position.x+obstacles[i].width
                && this.position.y > obstacles[i].position.y && this.position.y < obstacles[i].position.y+obstacles[i].height;
    }
    crashed = crashed || this.position.x > WIDTH || this.position.x < 0 || this.position.y > HEIGHT || this.position.y < 0;
    if (!this.crashed && crashed) {
      this.cyclesLeft = 0;
      this.crashed = true;
      this.color = RED;
    }
  }
  // A function to update the position of this Rocket object on the screen.
  this.update = function(target, obstacles) {
    if (!this.finished && !this.crashed) {
      this.applyForce(this.dna.genes[numCycles]);
      this.checkTarget(target);
      this.checkCrash(obstacles);
    }
  }
  // A function to show this Rocket object on the screen.
  this.show = function() {
    push();
    noStroke();
    fill(this.color, TRANSPARENCY);
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());
    rectMode(CENTER);
    rect(ORIGINS, ORIGINS, ROCKET_HEIGHT, ROCKET_WIDTH);
    pop();
  }
}
