var JOGAR = 1;
var FIM = 0;
var estadoDeJogo = JOGAR;
var trex,trex_Correndo,trex_colidindo;
var chão,chãoimg , chãoInvisivel;
var nuvem, grupoNuvem , nuvemImg;
var obstaculo, obstaculo1,obstaculo2,obstaculo3,obstaculo4,obstaculo5,
obstaculo6, grupoObstaculo;

var pontos;

var gameOver, gameOverImg, restart, restartImg;

var checkpoint, morrer, pular;

function preload(){
trex_Correndo = loadAnimation("trex1.png" , "trex3.png" , "trex4.png");
trex_colidindo= loadAnimation ("trex_collided.png");
chãoimg = loadImage("ground2.png");
nuvemImg = loadImage("cloud.png");
obstaculo1 = loadImage("obstacle1.png");
obstaculo2 = loadImage("obstacle2.png");
obstaculo3 = loadImage("obstacle3.png");
obstaculo4 = loadImage("obstacle4.png");
obstaculo5 = loadImage("obstacle5.png");
obstaculo6 = loadImage("obstacle6.png");

gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png");

chackpoint = loadSound("checkpoint.mp3");
morrer = loadSound("die.mp3");
pular = loadSound("jump.mp3");
}

function setup(){
  createCanvas(600,200);
  trex= createSprite(50,160,20,50);
 trex.addAnimation("correndo", trex_Correndo);
 trex.addAnimation("colidindo",trex_colidindo);
 trex.scale = 0.5;
 chão = createSprite(200,180,400,20);
 chão.addImage("chão",chãoimg);
 chão.x = chão.width/2;
chãoInvisivel = createSprite(200,190,400,10);
chãoInvisivel.visible = false;

pontos = 0;

grupoNuvem = new Group();
grupoObstaculo = new Group();

gameOver = createSprite(300,100);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5;
gameOver.visible = false;

restart = createSprite(300,140);
restart.addImage(restartImg);
restart.scale = 0.5;
restart.visible = false;

}

function draw(){
  background("white");
  
  text("pontuação: " + pontos, 500, 50);

  if(estadoDeJogo === JOGAR){
    pontos = pontos+Math.round(getFrameRate()/60);
if(pontos > 0 && pontos % 100 === 0){
  chackpoint.play();

}

    chão.velocityX = -(5 + 3 * pontos/100);
    if (chão.x<0){
      chão.x = chão.width/2;
    }
      if (keyDown("space")&& trex.y >= 160){
        trex.velocityY = -10;
        pular.play();
      }
      trex.velocityY = trex.velocityY +0.5;
      criarNuvem();
      criarObstaculo();
      if(grupoObstaculo.isTouching(trex)){
       estadoDeJogo = FIM;
       morrer.play();
      }

    
  }
  else if(estadoDeJogo === FIM){
 chão.velocityX = 0;
trex.velocityY= 0;

 grupoNuvem.setVelocityXEach(0);
 grupoObstaculo.setVelocityXEach(0);
 trex.changeAnimation("colidindo",trex_colidindo);

 grupoNuvem.setLifetimeEach(-1);
 grupoObstaculo.setLifetimeEach(-1);

 gameOver.visible = true;
 restart.visible = true;

  }
 
 
  trex.collide(chãoInvisivel);

  if(mousePressedOver(restart) && restart.visible === true){
reset();

  }

  drawSprites();
}

function criarNuvem(){
  if(frameCount % 60 ===0){
  nuvem = createSprite(600,100,40,10);
  nuvem.addImage(nuvemImg);
  nuvem.y = Math.round(random(10,100));
  nuvem.scale = 0.6;
  nuvem.velocityX= -5;
nuvem.lifetime = 130;
  nuvem.depth = trex.depth;
  trex.depth = trex.depth +1;

  grupoNuvem.add(nuvem);

  }
  
}

function criarObstaculo(){
if(frameCount % 60 ===0){
obstaculo = createSprite(620,165,10,40);
obstaculo.velocityX = -(5 + 3 * pontos/100);

var rand = Math.round(random(1,6));
switch(rand){
case 1 : obstaculo.addImage(obstaculo1);
break;
case 2 : obstaculo.addImage(obstaculo2);
break;
case 3 : obstaculo.addImage(obstaculo3);
break;
case 4 : obstaculo.addImage(obstaculo4);
break;
case 5 : obstaculo.addImage(obstaculo5);
break;
case 6 : obstaculo.addImage(obstaculo6);
break;

default: break;
}

obstaculo.scale= 0.5;
obstaculo.lifetime = 130;

grupoObstaculo.add(obstaculo);

}

}

function reset(){
  estadoDeJogo = JOGAR;
  gameOver.visible= false;
  restart.visible = false;

  grupoNuvem.destroyEach();
  grupoObstaculo.destroyEach();

  trex.changeAnimation("correndo", trex_Correndo);
  pontos = 0;
}