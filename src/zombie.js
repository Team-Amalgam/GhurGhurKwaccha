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
    this.deathSound =
      deathSounds[Math.floor(Math.random() * deathSounds.length)];
    // this.instance=Math.floor(Math.random()*3);
    this.instance = 0;
    //Zombies [0, 1 ,2] [0=Walking 1=Dying 2=Attacking]
    this.skin = [
      new AnimatedSprite(skin[0]),
      new AnimatedSprite(skin[1]),
      new AnimatedSprite(skin[2]),
    ]; //AnimatedSprite Array
    this.hitPoints = 1;
    Zombie.count++;
    this.isDying = false; //marnu agadi last saans ferirya xa
    this.showWordBox = true;
  }
  attack() {
    this.instance = 2;
    sceneManager.currentScene.zombieManager.player.bulletHit(this.hitPoints);
  }
  chetVayo(bulletTime) {
    this.isDying = true;
    setTimeout(() => {
      this.isAlive = false;
      this.deathSound.play();
      setTimeout(() => this.deathSound.stop(), 3000);
    }, bulletTime * 1000);
  }
  draw() {
    if (this.isAlive) {
      if (this.showWordBox) {
        rectMode(CENTER);
        fill(color(this.isTargeted ? "orange" : "yellow"));
        rect(this.xPosition + 5, this.yPosition - 5, 18 * this.word.length, 30);
        fill(color("black"));
        var displayText = this.word.substring(this.correctlyTypedString.length);
        if (currentLanguage == "nepali") {
          displayText = translateToUnicode(displayText);
        }
        text(displayText, this.xPosition + 5, this.yPosition - 10 + 10);
      }
      this.skin[this.instance].drawImageLoop(
        this.xPosition - 20,
        this.yPosition
      );
    } else {
      this.skin[1].drawImageOnce(this.xPosition - 20, this.yPosition);
    }
  }
  update() {
    if (this.xPosition > windowWidth * 0.27) {
      this.xPosition -= this.speed * deltaTimeInSeconds;
    } else {
      this.attack();
    }
    // this.skin[0].update();
  }

  static count = 0;
}
