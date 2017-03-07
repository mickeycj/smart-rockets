// A Target class containing the location of this rocket population's destination.
function Target() {
  // Constructs a new Target object which stores the location and the size.
  this.position = createVector(TARGET_X_POS, TARGET_Y_POS);
  this.radius = TARGET_RADIUS;
  this.criticalRadius = CRITICAL_RADIUS;
  this.color = GREEN;
  // A function to show this Target object on the screen.
  this.show = function() {
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.radius, this.radius);
  }
}
