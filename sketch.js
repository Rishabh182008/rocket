var rocket;//bg;
//var mars;
var meteor,MeteorsGroup;
var score;

var PLAY=1;
var END=0;
var gameState=PLAY;


function preload(){
    rocketImage=loadImage("sprites/roket.png");
    meteorImage=loadImage("sprites/meteor.png");
    //marsImage=loadImage("sprites/mars.png");
   // bgImage=loadImage("sprites/nightSky.gif");
    gameOverImg = loadImage("Sprites/gameOver.jpg");
    restartImg = loadImage("Sprites/restart.png");
    dieSound = loadSound("assets/die.mp3")
    checkPointSound = loadSound("assets/checkPoint.mp3")
    
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  //bg=createSprite(0,0,windowWidth-100,windowHeight-300);
  //bg.addImage(bgImage);
 // bg.velocityX=-3;
 // bg.scale=0.5;
 
  rocket=createSprite(100,200,10,10);
  rocket.addImage("moving",rocketImage);
  rocket.scale=0.3;

  gameOver = createSprite(width/2,height/2-50);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.1;
  gameOver.visible=false;

  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  restart.scale=0.1;
  restart.visible=false;

  //mars=createSprite(600,450,10,10);
  //mars.addImage("standing",marsImage);
  //mars.scale=0.5;
  
   score=0;
  // bg.x=bg.width/2;

   MeteorsGroup = createGroup();

  textSize(18);
  textFont("Georgia");
  textStyle(BOLD);
}

function draw() {

 background(0);
strokeWeight(4);
stroke("white");
fill("red");


rocket.velocityX=0;
rocket.velocityY=0;

if(gameState===PLAY){
  //bg.velocityX=-3;

  //if(bg.x<0){

   // bg.x=bg.width/2;
 // }

  if(keyDown("W")||touches.length>0){
    rocket.velocityX=0;
    rocket.velocityY=-5;
    touches=[]
     }
    
   if(keyDown("S")||touches.length>0){
    rocket.velocityX=0;
    rocket.velocityY=5;
    touches=[]
     } 
     
  score = score + Math.round(getFrameRate()/60);
  spawnMeteor();

}

if(MeteorsGroup.isTouching(rocket)){
dieSound.play();
gameState=END;

}
else if(gameState===END){

  gameOver.visible = true;
  restart.visible = true;
  bg.velocityX=0;

MeteorsGroup.setVelocityXEach(0);
MeteorsGroup.setLifetimeEach(-1);

if(mousePressedOver(restart)) {
  reset();
}
}
 if (score>0 && score%100 === 0){
      checkPointSound.play();
    }
 
  drawSprites();
  
  text("Score: "+ score,1000,50);
}
function reset(){
gameState=PLAY;
score=0;
gameOver.visible = false;
restart.visible = false;
MeteorsGroup.destroyEach();


}

function spawnMeteor() {
  if (World.frameCount % 100 === 0) {
    var meteor = createSprite(1200,400,40,10);
    meteor.y = Math.round(random(100,620));
    meteor.addImage("moving",meteorImage);
    meteor.scale = 0.03;
    meteor.velocityX = -(8+score/100);
    meteor.lifetime = 700;
     
    MeteorsGroup.add(meteor);
  }
}
