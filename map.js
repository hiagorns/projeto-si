class MAP{
  
  constructor(){
    this.tileSize = 10; 
    this.width = int(width/this.tileSize);
    this.height = int(height/this.tileSize);
    this.array = []
    this.noiseScale = 0.19;
    this.nodes = [];
    this.matrix = [];
    this.frontier = [];
    
  }
  
  grid(){
    for(let i = 0; i < this.width; i++){
      this.array[i] = [];
      for(let j = 0; j < this.height; j++){
        this.array[i][j] = [];
        this.array[i][j][0] = noise(i*this.noiseScale,j*this.noiseScale);
        this.array[i][j][1] = "unvisited";
      }
    }
  }
  
  setPlayer(){
    let i = int(random(0,this.width + 1));
    let j = int(random(0,this.height) + 1);
    let flag = true;
    let weight;
    
    while(flag){
      weight = this.array[i][j][0];
      if(weight < 0.1){
        i = int(random(0,this.width));
        j = int(random(0,this.height));
      }else{
        flag = false;
      }
    }
    this.array[i][j][1] = "player";

    return [i,j];
  }
  
  setFood(){
    let i = int(random(0,this.width + 1));
    let j = int(random(0,this.height) + 1);
    let flag = true;
    
    while(flag){
      if(this.array[i][j][0] < 0.1 && this.array[i][j][1] == "player"){
        i = int(random(0,this.width));
        j = int(random(0,this.height));
      }else{
        flag = false;
      }
    }
    this.array[i][j][1] = "food";

    return [i,j];
  }
  
  node(){
    
    for(let i = 0; i < this.width; i++){
      for(let j = 0; j < this.height; j++){
        
        append(this.nodes,[i,j]);
        }
    
      }
    //print(this.nodes)
    }
  
  adjMatrix(){
    let node1 = [];
    let node2 = [];
    let distx = 99;
    let disty = 99;
    let k;
    let l;
    
    for(let i = 0; i < this.width * this.height; i++){
      this.matrix[i] = []
      for(let j = 0; j < this.width * this.height; j++){
        
        node1 = this.nodes[i];
        node2 = this.nodes[j];
        
        k = this.nodes[j][0];
        l = this.nodes[j][1];
        
        distx = abs(node1[0] - node2[0]);
        disty = abs(node1[1] - node2[1]);
      
      //First Case, the node is compare with itself
      // Set weight to 99, it cant get into a looop
       if(i == j){
         this.matrix[i][j] = 99;
        //Second case, the node is compared with a neighbour
       }else if((distx + disty) == 1){
         if(this.array[k][l][0] < 0.1){
            this.matrix[i][j] = 99;
            }else if(this.array[k][l][0] < 0.3){
            this.matrix[i][j] = 1;
            }else if(this.array[k][l][0] < 0.4){
            this.matrix[i][j] = 5;
            }else{
              this.matrix[i][j] = 10;
            }
         
         
       }else{
          this.matrix[i][j] = 100;
        }
        
      }
    }
    // print(this.matrix);
  }
  
  
  show(){
    for(let i = 0; i < this.width; i++){
      for(let j = 0; j < this.height; j++){
        if(this.array[i][j][1] == "player"){
          fill("yellow");
          noStroke();
          rect(i*this.tileSize, j*this.tileSize, this.tileSize, this.tileSize);
        }else if(this.array[i][j][1] == "food"){
          fill("pink");
          noStroke();
          rect(i*this.tileSize, j*this.tileSize, this.tileSize, this.tileSize);
        }else if(this.array[i][j][1] == "frontier"){
          fill("orange");
          noStroke();
          rect(i*this.tileSize, j*this.tileSize, this.tileSize, this.tileSize);
        }else if(this.array[i][j][1] == "visited"){
          fill("purple");
          noStroke();
          rect(i*this.tileSize, j*this.tileSize, this.tileSize, this.tileSize);
        }else if(this.array[i][j][0] < 0.1 && this.array[i][j][1] == "unvisited"){
          fill("gray");
          noStroke();
          rect(i*this.tileSize, j*this.tileSize, this.tileSize, this.tileSize);
        }else if(this.array[i][j][0] < 0.30 && this.array[i][j][1] == "unvisited"){
          fill("green");
          noStroke();
          rect(i*this.tileSize, j*this.tileSize, this.tileSize, this.tileSize);
        }else if(this.array[i][j][0] < 0.40 && this.array[i][j][1] == "unvisited"){
          fill("brown");
          noStroke();
          rect(i*this.tileSize, j*this.tileSize, this.tileSize, this.tileSize);
        }else if (this.array[i][j][0] > 0.4 && this.array[i][j][1] == "unvisited"){
          fill("blue");
          noStroke();
          rect(i*this.tileSize, j*this.tileSize, this.tileSize, this.tileSize);
        }

      }
    }
  }

  visited(x, y){
    if(this.array[x][y][1] != "player"){
      this.array[x][y][1] = "visited";
    }
  }
}


//rect(i*this.tileSize, j*this.tileSize, this.tileSize, this.tileSize);