let frontier = [];

function setup() {
  createCanvas(400, 400);
  map = new MAP();
  noiseDetail(2, 0.1);
  map.grid();
  map.setPlayer();
  map.setFood();
  // map.node();
  // map.adjMatrix();
}

function draw() {
  
  map.show();
}