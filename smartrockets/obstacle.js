// An Obstacle class containing the location of an obstacle for this rocket population.
function Obstacle(x, y, width, height) {
  // Constructs a new Obstacle object which stores the location and the size.
  this.position = createVector(x, y);
  this.width = width;
  this.height = height;
  this.color = RED;
  // A function to show this Obstacle object on the screen.
  this.show = function() {
    fill(this.color);
    rect(this.position.x, this.position.y, this.width, this.height);
  }
}
