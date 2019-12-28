//constant variable
const Bodies=Matter.Bodies;
const World=Matter.World;
const Engine=Matter.Engine;
const Constraint=Matter.Constraint;

//in game variables
var engine,world,ball,ground,launcher,stand,ballimg,background,basket,ball1,ball2,ball3,
ball4,ball5,ball6,ball7,ball8,ball9;
var balls=[],index=0;
var basket1,basket2,basket3,celebration,basket4,basket5;
var score=0;
var gameState="attached";
var Ball1X = 150;
var maxChances = 10;

//loading images and sound
function preload(){
sound1=loadSound("bounce.mp3");
celebration=loadSound("nice shot.mp3");
ballimg=loadImage("basketball.png");
backgroundimg=loadImage("background.png");
stand=loadImage("stand1.png");
}

//declaring class variables, creating engine and canvas
function setup() {
  createCanvas(displayWidth,displayHeight);
  engine=Engine.create();
  world=engine.world;
   ball=new Ball(displayWidth-200,displayHeight-400);
   ground=new Ground(0,displayHeight-250);
   launcher=new Launcher(ball.body,{x:displayWidth-200,y:displayHeight-400});
   basket=new Basket(displayWidth-1050,displayHeight-600,20,280);
   basket1=new Basket(displayWidth-865,displayHeight-550,20,30);
   basket2=new Basket(displayWidth-880,displayHeight-500,10,35);
   basket3=new Basket(displayWidth-997,displayHeight-520 ,10,30);
   basket4=new Basket(displayWidth-873,displayHeight-515 ,10,25);
   basket5=new Basket(displayWidth-1074,displayHeight-350,20,100);
  sprites();
}

//function for ball sprites
function sprites(){
  for (var i=0; i < maxChances-1; i++){
    balls[i] = createSprite(displayWidth-(Ball1X+(i*80)),displayHeight-196,50,50);
    balls[i].addImage("ball"+i,ballimg);  
  }
}

// conditions, sprites and display setup
function draw() {
  background(backgroundimg);
  stroke("white");
  strokeWeight(3);
  textSize(30);
  textStyle(BOLD);

  //gameState formation and score system
  if ((ball.body.position.x>displayWidth-954 && ball.body.position.x<displayWidth-886) 
  && (ball.body.position.y>displayHeight-510 && ball.body.position.y<displayHeight-444) ){
    score=score+5;
    gameState="win";
    
  }

 //score display
  text("Score : "+score,displayWidth-400,displayHeight-700);

  //gameState formation1
  if(ball.body.position.y>=displayHeight-315){
    gameState="onground";
  }

  //gameState formation2
  if(ball.body.position.x>displayWidth || ball.body.position.y<displayHeight-950 || ball.body.position.x<displayWidth-1300){
    gameState="outofscreen";
  }

  //reset condition
  if (gameState=="onground" || gameState=="outofscreen"){
    textSize(40);
    textAlign(CENTER);
    text("Press space key for more chances",displayWidth-700,displayHeight-400);
  }

  // game over condition
  if (index>(maxChances-2)){
    textSize(40);
    text("Game Over",displayWidth-700,displayHeight-400);
    text("Your total score is: "+score,displayWidth-700,displayHeight-360);
  }
  
  //sound conditions
  if (round(ball.body.position.y)==displayHeight-315 || round(ball.body.position.y)==displayHeight-316){
    sound1.play();
  }else{
    sound1.pause();
  }
  if (ball.body.speed<4){
    sound1.pause();
  }

  // play celebration sound
  if (gameState=="win" && round(ball.body.position.y)>displayHeight-458){
    celebration.play();
    gameState="onground";
  }
  else{
    celebration.pause();
  }
  
  //display system
  Engine.update(engine);  
  ball.display();
  ground.display();
  basket.display();
  launcher.display();
  basket1.display();
  basket2.display();
  basket3.display();
  basket4.display();
  basket5.display();
  drawSprites();
}

// extra functions
function mouseDragged(){
  if(index>(maxChances-2)){
    return false;
  }
  if (gameState=="attached" && touches.length>0){
  Matter.Body.setPosition(ball.body,{x:mouseX,y:mouseY});
  touches=[];
  }
}

function mouseReleased(){
  if (index>(maxChances-2)){
    return false;
  }
  launcher.fly();
  gameState="launched";
} 

// space bar reset to launch next ball
function keyPressed(){
  if((keyCode === 32 && gameState=="onground" && touches.length>0) || gameState=="outofscreen"){
    gameState="attached";
    launcher.attach(ball.body);  
      Matter.Body.setPosition(ball.body, {x:displayWidth-200,y:displayHeight-400}); 
      balls[index].destroy();
    index++;
    touches=[];
  }
}
    



