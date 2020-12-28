
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime=0;
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400)
  

  
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)
  
    FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score=0;

 

}


function draw() {
  background("white")
  
  if(ground.x>0){
    ground.x=ground.width/2;
  }
  
      if(keyDown("space")) {
      monkey.velocityY = -10;
        
    }

  monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(ground)
  spawnFood();
  spawnObstacles();
 
  
    stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("survivalTime:"+survivalTime, 200,50)
  
  
  
    if(obstaclesGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
    
    
    }
  
  stroke("white");
  textSize(20);
  fill("white");
  text("score:"+score,500,50);
  
  drawSprites();
}

function spawnFood(){
  
  if(frameCount % 80===0){
    banana=createSprite(800,340,10,40)
    banana.y=random(120,240)
    banana.velocityX=-5
    banana.addImage(bananaImage)
    banana.scale=0.10
    banana.lifetime=300
    monkey.depth=banana.depth+1
    FoodGroup.add(banana)
  }
}


function spawnObstacles(){
  
  if(frameCount % 300 === 0){
    obstacle=createSprite(800,320,10,40)
    obstacle.x=random(120,200)
    obstacle.velocityX=-5
    obstacle.addImage(obstacleImage)
    obstacle.lifetime=300
    obstacle.scale=0.15
    obstaclesGroup.add(obstacle)
    
  }
}


