class AnimatedSprite {
  constructor(gifs){
    this.leng=gifs.length;
    this.counter=Math.floor(Math.random()*this.leng); //global counter
    this.deathCounter=0; //global counter
    this.randomCounter=0; //global counter
    this.gifs= gifs; //The animated sprite image list
    this.speed=0.5
    }
  update(){
  }
  drawImageLoop(xPosition=0, yPosition=0){
    image(this.gifs[Math.floor(this.counter%this.leng)], xPosition, yPosition);
    this.counter+=this.speed
  }
  drawImageOnce(xPosition=0, yPosition=0){
    image(this.gifs[Math.floor(this.deathCounter)], xPosition, yPosition);
    if(this.deathCounter<this.leng-1){
      this.deathCounter+=this.speed
    }
  }
  drawRandomImageOnce(xPosition=0, yPosition=0, player){
    image(this.gifs[Math.floor(this.randomCounter)], xPosition, yPosition);
    if(this.randomCounter<this.leng-1){
      this.randomCounter+=this.speed
    } else {
      this.randomCounter=0;
      player.instance=Math.floor(Math.random()*4);
    }
  }
}
