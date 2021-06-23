var balloon, balloonImage1, balloonImage2;
var database;
var position;

function preload(){
  bg =loadImage("cityImage.png");
  balloonImage1=loadAnimation("hotairballoon1.png");
  balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
  "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
  "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
 }

function setup(){

  database = firebase.database();

  createCanvas(1500,700);

  balloon = createSprite(250,450,10,10);
  balloon.scale = 0.5;
  balloon.addAnimation("hotAirBalloon", balloonImage1);

  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value", readPosition, showError);

  textSize(20);
}


function draw(){
    background(bg);
    if(keyDown(LEFT_ARROW)){
        updatePosition(-10,0);
        balloon.addAnimation("hotAirBalloon",balloonImage2);
    }
    else if(keyDown(RIGHT_ARROW)){
        updatePosition(+10,0);
        balloon.addAnimation("hotAirBalloon",balloonImage2);
    }
    else if(keyDown(UP_ARROW)){
      updatePosition(0,-10);
      balloon.addAnimation("hotAirBalloon",balloonImage2);
    }
    else if(keyDown(DOWN_ARROW)){
        updatePosition(0,+10);
        balloon.addAnimation("hotAirBalloon",balloonImage2);
    }
    drawSprites();
}

function updatePosition(x,y){
    var updatePosition = database.ref("balloon/position");
    updatePosition.set({
        x: position.x + x, 
        y: position.y + y
    });
}

function readPosition(data){
    position = data.val();
    balloon.x = position.x;
    balloon.y = position.y;
}

function showError(){
    console.log("error in reading from the database");
}