// Simulation variables.
var population;
var target;
var obstacles = [];
var numCycles = 0;
var generations = 1;
// A function to setup the canvas.
function setup() {
  createCanvas(WIDTH, HEIGHT);
  target = new Target();
  for (var i = 0; i < NUM_OBSTACLES; i++) {
    obstacles[i] = new Obstacle(OBSTACLE_X_POS[i], OBSTACLE_Y_POS[i], OBSTACLE_WIDTH[i], OBSTACLE_HEIGHT[i]);
  }
  population = new Population(target, obstacles);
}
// A function to draw the sprites.
function draw() {
  background(BACKGROUND_COLOR);
  fill(GREEN);
  textSize(TEXT_SIZE);
  text("#Generations: " + generations, GENERATION_TEXT_X_POS, GENERATION_TEXT_Y_POS);
  text("#Cycles left: " + (LIFE_SPAN-numCycles), CYCLE_TEXT_X_POS, CYCLE_TEXT_Y_POS);
  target.show();
  for (var i = 0; i < NUM_OBSTACLES; i++) {
    obstacles[i].show();
  }
  population.simulate();
  numCycles++;
  if (numCycles == LIFE_SPAN) {
    population.evolve();
    numCycles = 0;
    generations++;
  }
}
