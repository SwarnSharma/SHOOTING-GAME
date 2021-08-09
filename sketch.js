var bg,bgImg;
var a=0;
var score=0;
var gameState=1;
var PLAY=1;
var OVER=2
var bullet;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg, zombieGroup;
var heart,heart1Img,heart2Img,heart3Img;
var loseSound, explosionSound;

function preload(){
  bgImg = loadImage("assets/bg.jpeg");
  shooter1Img = loadImage("assets/shooter_1.png");
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.png");
  heart1Img = loadImage("assets/heart_3.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_1.png");
  loseSound = loadSound("assets/lose.mp3");
  explosionSound = loadSound("assets/explosion.mp3");

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
 bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
 bg.addImage(bgImg)
 bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)
   
   heart=createSprite(windowWidth-150,25,10,10);
   heart.addImage(heart1Img);
   heart.scale=.3;

   zombieGroup = new Group();
   bulletGroup = new Group();
}

function draw() {
  background(0); 



if(gameState==PLAY){
//moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  player.addImage(shooter_shooting);
  explosionSound.play();
  bullet = createSprite(player.x+40, player.y, 30, 6);
  bullet.velocityX=3;
  bulletGroup.add(bullet);
  
  bullet.lifetime=150;
}



//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg);
}
//destroy zombie when bullet touches it
if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){     
      
   if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy()
        bulletGroup.destroyEach()
       
        } 
  
  }
}

createEnemy();

if(a==1){
  heart.addImage(heart2Img);
}
if(a==2){
  heart.addImage(heart3Img);
}
if(a==3){
  player.destroy();
  heart.destroy();
  zombieGroup.destroyEach();
  gameState=OVER;
}

// if(zombieGroup.collide(player)){
//    //zombieGroup.destroyEach();
//    a=a+1;
//    player.addImage(shooter1Img);
//    loseSound.play();
// }

if(zombieGroup.isTouching(player)){
  a=a+1;
  loseSound.play();
  for(var i=0;i<zombieGroup.length;i++){     
       
   if(zombieGroup[i].isTouching(player)){
        zombieGroup[i].destroy()
        } 
  }
 }


}


drawSprites();
if(gameState==OVER){
  textSize(100);
  fill("red");
  text("Game Over", windowWidth/3, windowHeight/1.7);
}

}


function createEnemy(){
  if(frameCount%50==0){
    zombie=createSprite(random(500,1100),random(100,500),40,40)
    zombie.addImage(zombieImg);
    zombie.scale=0.2;
    zombie.velocityX=-2;
    zombie.debug=true;
    zombie.setCollider("rectangle",0,0,300,800)
    zombie.lifetime=280;
    zombieGroup.add(zombie);
    }



}

// function createZombie(){
//   zombie=createSprite(1000,10,10);
//   zombie.addImage(zombieImg);
//   zombie.scale=0.15;
//   var select_obstcles=Math.round(random(1,2));             
//   if(select_obstcles==1){
//     zombie.y=300;
//   }else if (select_obstcles==2){
//     zombie.y=600;
//   }
//   zombie.debug=false;
//   }










