class Player {
  constructor(xPosition, yPosition, skin) {
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.healthPositionX = xPosition + windowWidth / 22;
    this.healthPositionY = this.yPosition - windowHeight / 35;
    this.isAlive = true;
    this.isVisible = false;
    this.deathSound =
      deathSounds[Math.floor(Math.random() * deathSounds.length)];
    // this.instance=Math.floor(Math.random()*3);
    this.instance = 0;
    //Player [0, 1, 2, 3] [Blinking, Dying, Idle, Throwing]
    this.skin = [
      new AnimatedSprite(skin[0]),
      new AnimatedSprite(skin[1]),
      new AnimatedSprite(skin[2]),
      new AnimatedSprite(skin[3]),
    ]; //AnimatedSprite Array
    this.health = 100;
  }
  bulletHit(hitPoints) {
    if (this.health > 0) {
      this.health -= hitPoints * deltaTimeInSeconds;
    } else {
      this.instance = 1;
    }
  }
  draw() {
    image(platform, this.xPosition, this.yPosition);
    image(log, this.xPosition+windowWidth*0.15, this.yPosition-windowHeight*0.33);
    if (this.isAlive) {
      rectMode(CORNER);
      rect(this.healthPositionX - 1, this.healthPositionY - 1, 102, 7);
      fill(color("red"));
      rect(this.healthPositionX, this.healthPositionY, this.health, 5);
      rectMode(CENTER);
      this.skin[this.instance].drawRandomImageOnce(
        this.xPosition + windowWidth * 0.02,
        this.yPosition,
        this
      );
    }
  }

  update() {
    // this.skin[0].update();
  }
}
