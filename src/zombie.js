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
    this.skin = skin;
    this.toogle = false;
    this.i = 0;
    Zombie.count++;
  }
  draw() {
    fill(color(this.isTargeted ? "orange" : "yellow"));
    rect(this.xPosition - 2, this.yPosition - 10, 9 * this.word.length, 20);
    fill(color("black"));
    text(this.word, this.xPosition, this.yPosition);
    text(this.correctlyTypedString, this.xPosition, this.yPosition - 10);
    this.drawImage();
  }
  update() {
    if (this.xPosition > windowWidth * 0.2) {
      this.xPosition -= this.speed;
    }
  }
  drawImage() {
    if (this.isAlive) {
      if (!this.toogle) {
        image(this.skin[0], this.xPosition, this.yPosition);
        this.i++;
        if (this.i % 20 == 0) {
          this.toogle = true;
          this.i = 0;
        }
      } else {
        image(this.skin[1], this.xPosition, this.yPosition);
        this.i++;
        if (this.i % 20 == 0) {
          this.i = 0;
          this.toogle = false;
        }
      }
    } else {
      console.log("Here");
      // image(this.skin[2], this.xPosition, this.yPosition);
      // image(this.skin[3], this.xPosition, this.yPosition);
    }
  }
  static count = 0;
}
