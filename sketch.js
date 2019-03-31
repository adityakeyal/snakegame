let s = new Snake();
let fr = 10;
function setup() {
  createCanvas(200, 200);
  fill(51);
  frameRate(fr);
  s.setup();
}
function draw() {
  background(51);

  s.show();
  s.update();
}

function keyPressed(){
    if(keyCode === UP_ARROW){
      s.dir(0,-1);
    }else
    if(keyCode === DOWN_ARROW){
      s.dir(0,1);
    }else
    if(keyCode === LEFT_ARROW){
      s.dir(-1,0);
    }else
    if(keyCode === RIGHT_ARROW){
      s.dir(1,0);
    }


   

}
