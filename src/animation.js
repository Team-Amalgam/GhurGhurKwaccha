class AnimatedSprite {
  constructor(gifs){
    this.leng=gifs.length;
    this.counter=Math.floor(Math.random()*this.leng); //global counter
    this.gifs= gifs; //The animated sprite image list
    this.speed=0.5
    }
  update(){
  }
  drawImage(xPosition=0, yPosition=0){
    image(this.gifs[Math.floor(this.counter%this.leng)], xPosition, yPosition);
    this.counter+=this.speed
  }
}
