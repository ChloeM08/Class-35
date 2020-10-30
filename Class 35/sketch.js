var movingball;
var position, database;
function setup(){
    database = firebase.database();
    createCanvas(500,500);
    movingball = createSprite(250,250,10,10);
    movingball.shapeColor = "red";
    var movingballpos = database.ref('ball/position')
    movingballpos.on("value", readPosition, showError)
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-4,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(4,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-4);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+4);
    }
    drawSprites();
}

function writePosition(x,y){
   database.ref('ball/position').set({
     'x': position.x + x,
     'y': position.y + y
   })
}
function readPosition(data){
   position = data.val();
   movingball.x = position.x
   movingball.y = position.y
}
function showError(){
    console.log("error while reading position")
}