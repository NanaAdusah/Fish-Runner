//Fish variable
var fish,fishImg;

//default gamestate
var gameState = "instructions";

//Octopus variable
var octopus,octopusImg,enemyGroup;

//Worm variable
var worm,wormImg,foodGroup;

//Score variable
var score;


function preload(){
  
  //Loading in the fish image
  fishImg = loadImage("Fish.png");
  
  //Loading in the octopus image
  octopusImg = loadImage("octopus.png");
  
  //Loading in the worm image
  wormImg = loadImage("worm.png");
}

function setup(){
  
  //Creating the canvas
  createCanvas(600,600);

  //Creating the enemy and food group
  enemyGroup = new Group();
  foodGroup = new Group();
  
  //Creating the Fish
  fish = createSprite(50,300,20,20);
  fish.addImage(fishImg);
  fish.scale = 0.4;
  
  //Default score value
  score = 0;
  
}

function draw(){
  
  //Making the background
  background(17, 200, 237);
  

  //Condition for if the gamestate = instructions
  if(gameState === "instructions"){
    
    //Display instructions at the top of the screen
    stroke("green");
    textSize(20);
    fill("green");
    text("Avoid Octopus, Eat Worms",220,50);
    text("Press space To Start", 250, 70);
    text("You win when you reach 30 score", 200, 90);
  }

  //Condition to start the game
  if(keyDown("space") && gameState === "instructions"){
    
    //Gamestate = play
    gameState = "play";
    
  }
  
  //Condition for if the gamestate is equal to play
  if(gameState === "play"){
    //Displaying score
    stroke("white");
    textSize(20);
    fill("white");
    text("Score:"+ score, 200,50);
    
    //Making the fish move up
     if(keyDown("up_arrow")){
    fish.y = fish.y - 3;
  }
  
    //Making the fish move down
  if(keyDown("down_arrow")){
    fish.y = fish.y + 3;
  }
    
    //Increasing the score
    if(foodGroup.isTouching(fish)){
      score = score + 1;
      foodGroup.destroyEach();
    }
    
    //Win Condition
    if(score === 30){
      
    //Display "YOU WIN!" at the center of the screen
    stroke("Yellow");
    textSize(50);
    fill("Yellow");
    text("YOU WIN!", 300,300);
    }
    
    //Declaring spawnMobs function
    spawnMobs();
    
    //Lose condition
    if(enemyGroup.isTouching(fish)){
      
      //Game state changes to end
      gameState = "end";
    }

    
  }
  
  //Condition for if the gamestate = end
  if(gameState === "end"){
    
    //Destroy the fish
    fish.destroy();
    
    //Destroy the worm
    foodGroup.destroyEach();
    
    //Destroy the octopus
    enemyGroup.destroyEach();
    
    //Show "You Lose" at the center of the screen
    stroke("black");
    textSize(50);
    fill("black");
    text("You lose", 300,300);
    
    
  } 
  
  //To show the sprites
  drawSprites();
  
}


//Spawning the Worm and octopus function
function spawnMobs(){
  
  //Condition to spawn octopus
  if(frameCount % 180 === 0){
    
    //Creating the octopus
    octopus = createSprite(550,-50);
    
    //Scaling the octopus
    octopus.scale = 0.4;
    
    //Making the octopus' y position random
    octopus.y = Math.round(random(120,400));
    
    //Adding the octopus image
    octopus.addImage(octopusImg);
    
    //Making the octopus go left
    octopus.velocityX = -4;
    
    //Setting a lifetime for the octopus
    octopus.lifetime = 150;
    
    //adding the octopus to the enemy group
    enemyGroup.add(octopus);
    
    //Condition to spawn worm
    if(frameCount % 240 === 0){
    
    //Spawning the worm
    worm = createSprite(550,-50);
      
    //Scaling the worm
    worm.scale = 0.2;
      
    //Making the worms y position random
    worm.y = Math.round(random(120,400));
    
    //Adding the worm image
    worm.addImage(wormImg);
      
    //Making the worm move left
    worm.velocityX = -4;
      
    //Setting the worm lifetime
    worm.lifetime = 150;
      
    //Adding the worm to the food group
    foodGroup.add(worm);
 
  
}
  
  
}
  
}