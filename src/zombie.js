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
    this.instance=Math.floor(Math.random()*3)
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
      this.skin[this.instance].drawImage(this.xPosition-20, this.yPosition)
    } else {
    }
  }
  update() {
    if (this.xPosition > windowWidth * 0.2) {
      this.xPosition -= this.speed;
    }
    // this.skin[0].update();
  }
  static count = 0;
}
