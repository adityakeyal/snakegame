function Snake(){

    this.locations = [];
    this.xspeed = 1;
    this.yspeed = 0;

    this.size = 3;
    this.score=0;

    this.reward = new Reward();

    this.crashed = false;

    this.snakeSpeed = 6;
    this.currentCounter = 1;

    this.pendingDirChange = false;

  this.setup = function(){

      this.reward.create();
  }

    this.update = function(){

      
      if((this.currentCounter%this.snakeSpeed) != 0){
        this.currentCounter++;
        return;
      }
      this.currentCounter = 1;

      
        if(this.crashed){
          return;
        }

        let current = new Position();
        if(this.locations.length > 0 ){
          let lastLocation = this.locations[this.locations.length-1];
          current.x = lastLocation.x;
          current.y = lastLocation.y;
        }

        current.x = current.x+this.xspeed*size;
        current.y = current.y+this.yspeed*size;

        //if reward == new location.. then generate a new one
        //and increase the eat score
        if(this.reward.consumed(current)){
            this.score++;
            document.getElementById("score").innerText=this.score
            this.reward.create();
            this.size++;
            if(this.score%10==0 && this.score>0){
              // Need to control speed here
              this.snakeSpeed--

            }

        }

        if(this.locations.length == this.size){
          this.locations.shift();
        }

        if(!this.crash(current)){
          this.locations.push(current);
        }
        
        this.pendingDirChange = false;

        
    }

    this.crash = function(current){
      
        for(let i=0;i<this.locations.length;i++){
            if(current.x ==this.locations[i].x && current.y == this.locations[i].y){
                //this is a crash////
                this.crashed = true;
                return;

            }
        }
        if((current.x <0 || current.x>width  ) || (current.y <0 || current.y>height  )){
          this.crashed=true;
          return;
        }

    }

    this.show = function(){
        
      if(this.crashed){
        fill(205, 50, 50); //
        background(205, 50, 50)
		
        //add text game over
        let font,fontsize = 30;
        // textFont(font);
        textSize(fontsize);
        textAlign(CENTER, CENTER);
        stroke(255, 255, 10)
		fill(255, 255, 10);
        text('Game Over', width/2, height/4);
		textSize(20);
        
		text('Score ' + this.score, width/2, height/2);
		
          
      }else{
        for(let i=0;i<this.locations.length;i++){
          this.locations[i].paint();
        }
        this.reward.paint();
  
      }
            
    }

    this.dir = function(x,y){

      if(this.pendingDirChange){
        return;
      }

    if((x==1 && this.xspeed== -1) ||(x==-1 && this.xspeed== 1) || (y==1 && this.yspeed== -1)  || (y==-1 && this.yspeed==1)){
      return;
    }

      this.xspeed=x;
      this.yspeed=y;

      this.pendingDirChange = true;
    }



}

let size = 5;

function Position(){
    this.x  = 0;
    this.y = 0;


    this.clone = function(p ){
      let p2 = new Position();
      p2.x = p.x;
      p2.y = p.y;
    }

    this.paint = function(){
        noStroke();
        fill(255);
        rect(this.x,this.y,size,size);
    }


}


function Reward(){

  this.x;
  this.y;

  this.create = function(locations){

    let isInvalid;

    do{
      isInvalid = false;
      this.x = Math.round(random(0,width))
      this.y = Math.round(random(0,height))
      this.x = this.x - this.x%5
      this.y = this.y - this.y%5
      if(locations!=undefined){
        for(let i=0;i<locations.length;i++){
          if(locations[i].x == this.x && locations[i].y == this.y){
            isInvalid = true
          } 
        }
    }
    }while(isInvalid)

    this.paint();
      
  }

  this.paint=function(){
    noStroke(0)
    fill('#C40000');
    ellipse(this.x+size/2,this.y+size/2,size,size);

    // fill('#ffffff');
    // stroke('#ffffff')
    // point(this.x+size/2,this.y+size/2);

  }

  this.consumed = function(location){

    if(this.x == location.x && this.y == location.y ){
        return true;
    }
    return false;


  }

  



}