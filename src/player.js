class Player {
  constructor(xPosition, yPosition, skin) {
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.isAlive = true;
    this.isVisible = false;
    this.deathSound=deathSounds[Math.floor(Math.random()*deathSounds.length)];
    // this.instance=Math.floor(Math.random()*3);
    this.instance=0;
    //Player [0, 1, 2, 3] [Blinking, Dying, Idle, Throwing]
    this.skin = [new AnimatedSprite(skin[0]),
                new AnimatedSprite(skin[1]),
                new AnimatedSprite(skin[2]),
                new AnimatedSprite(skin[3])]; //AnimatedSprite Array
    this.toogle = false;
    this.i = 0;
  }
  draw() {
    image(platform, this.xPosition, this.yPosition);
    if (this.isAlive) {
      this.skin[this.instance].drawRandomImageOnce(this.xPosition+windowWidth*0.02, this.yPosition, this);
    }
  }
  update() {
    // this.skin[0].update();
  }
  static count = 0;
}
