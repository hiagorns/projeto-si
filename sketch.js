let frontier = [];
let playerX;
let playerY;
let foodX;
let foodY;

let search = 0; //Variável de escolha do tipo de busca
let buttonPressedFlag = false; //flag que sinaliza se uma busca já foi escolhida

let greedyBFSStructure = null;

function setup() {
  createCanvas(400, 400);
  map = new MAP();
  
  noiseDetail(2, 0.1);
  
  map.grid();
  
  [playerX,playerY] = map.setPlayer();
  [foodX, foodY] = map.setFood();

  let greedySearch = createButton('Busca Gulosa'); //criação do botão para escolha da busca gulosa
  greedySearch.mousePressed(buttonPressed);
  let BFSButton = createButton('BFS'); //criação do botão para escolha da busca BFS
  BFSButton.mousePressed(buttonPressed);
  
  map.node();
  map.adjMatrix();
}

function draw() {
  if(search === 3) {
    greedyBFS();
  }
  map.show();
}

function greedyBFS(){
  // console.log(search);
  if (greedyBFSStructure === null) {
    map.visited(playerX, playerY);  
    greedyBFSStructure = {
      current: {x: playerX, y: playerY, cost: 0},
      queue: [{x: playerX, y: playerY, cost: 0}],
      path: []
    }

  } else {
    if(greedyBFSStructure.queue.length > 0){
      greedyBFSStructure.queue.sort((a, b) => a.cost - b.cost);
      greedyBFSStructure.current = greedyBFSStructure.queue.pop();
      greedyBFSStructure.path.push({...greedyBFSStructure.current});
      
      let current = greedyBFSStructure.current;
      console.log(current);

      let xLeft = current.x - 1;
      let xRight = current.x + 1;
      let yUp = current.x - 1;
      let yDown = current.x + 1;

      if(xLeft > 0){
        console.log(xLeft);
        if (map.matrix[xLeft][current.y][0] == "unvisited"){
          console.log(map.matrix[xLeft][current.y][0]);
        }
      }
    }
  }

}

function buttonPressed() {
  if(!buttonPressedFlag){
    if (this.elt.innerText == 'Busca Gulosa'){
      search = 3;
    }
    buttonPressedFlag = true;
  }
}