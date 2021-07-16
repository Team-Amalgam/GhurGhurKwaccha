class Zombie {
  constructor(xPosition, yPosition, word, speed, skin) {
    this.id = Zombie.count;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.word = word;
    this.correctlyTypedString = "";
    this.isAlive = true;
    this.isVisible = false;
    this.speed = speed;
    this.isTargeted = false;
    this.deathSound=deathSounds[Math.floor(Math.random()*deathSounds.length)];
    // this.instance=Math.floor(Math.random()*3);
    this.instance=0;
    //Zombies [0, 1 ,2] [0=Walking 1=Dying 2=Attacking]
    this.skin = [new AnimatedSprite(skin[0]),
                new AnimatedSprite(skin[1]),
                new AnimatedSprite(skin[2])]; //AnimatedSprite Array
    this.toogle = false;
    this.i = 0;
    Zombie.count++;
  }
  draw() {
    if (this.isAlive) {
      rectMode(CENTER);
      fill(color(this.isTargeted ? "orange" : "yellow"));
      rect(this.xPosition + 5, this.yPosition - 5, 18 * this.word.length, 30);
      fill(color("black"));
      text(
        this.word.substring(this.correctlyTypedString.length),
        this.xPosition + 5,
        this.yPosition - 10 + 10
      );
      this.skin[this.instance].drawImageLoop(this.xPosition-20, this.yPosition)
    } else {
      this.skin[1].drawImageOnce(this.xPosition-20, this.yPosition)
    }
  }
  update() {
    if (this.xPosition > windowWidth * 0.2) {
      this.xPosition -= this.speed;
    } else {
      this.instance=2;
    }
    // this.skin[0].update();
  }
  static count = 0;
}
