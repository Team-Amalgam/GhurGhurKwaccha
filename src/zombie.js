class Zombie {
  constructor(xPosition, yPosition, word, speed) {
    this.id = Zombie.count;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.word = word;
    this.correctlyTypedString = "";
    this.isAlive = true;
    this.isVisible = false;
    this.speed = speed;
    this.isTargeted = false;
    Zombie.count++;
  }
  draw() {
    fill(color(this.isTargeted ? "orange" : "yellow"));
    rect(this.xPosition - 2, this.yPosition - 10, 9 * this.word.length, 20);
    fill(color("black"));
    text(this.word, this.xPosition, this.yPosition);
    text(this.correctlyTypedString, this.xPosition, this.yPosition - 10);
  }
  update() {
    if (this.xPosition > windowWidth * 0.2) {
      this.xPosition -= this.speed;
    }
  }
  static count = 0;
}
