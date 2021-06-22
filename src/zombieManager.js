class ZombieManager {
  constructor(tutorMode = false) {
    this.zombies = [];
    this.zombieToShoot = {};
    this.typedString = "";
    this.keyboard = new Keyboard("US", currentLanguage);
    this.zombieLane = 5;
    if (tutorMode) {
      setTimeout(() => this.keyboard.open(), 500);
      this.zombieLane = 3;
    }
  }

  draw() {
    if (currentLanguage == "nepali") {
      textFont(nepaliFont, 30);
    }
    text(this.typedString, windowWidth / 2, windowHeight / 10);
    this.zombies.forEach((zombie) => zombie.draw());
    textFont("Georgia", 22);
  }
  generateZombies(words, speed) {
    words.map((word, index) =>
      this.zombies.push(
        new Zombie(
          windowWidth + index * 150,
          Math.trunc(Math.random() * this.zombieLane) * (windowHeight / 5) + 20,
          word,
          speed,
          gif_loadImg
        )
      )
    );
    this.keyboard.glow_dim(this.zombies[0].word, this.typedString);
  }

  keyPressed(key) {
    key = String(key);
    switch (key) {
      case "Backspace":
        this.typedString = this.typedString.slice(0, -1);
        break;
      case " ":
        if (
          this.zombieToShoot &&
          this.typedString === this.zombieToShoot.word
        ) {
          this.typedString = "";
          this.zombies = this.zombies.filter(
            (zombie) => zombie.id != this.zombieToShoot.id
          );
          this.zombieToShoot = {};
          //this.keyboard.glow_dim(this.zombies[0].word[0], "");
        }
        break;
      default:
        // Typeable keys
        if (key.length === 1) {
          this.typedString += key;
        }
        break;
    }
    this.setZombieToShoot();
    this.keyboard.glow_dim(
      this.zombieToShoot.word || this.zombies[0].word,
      this.typedString
    );
  }

  setZombieToShoot() {
    if (this.typedString.length > 0) {
      let matchingZombie = this.zombies.find((zombie) =>
        zombie.word.startsWith(this.typedString)
      );
      if (matchingZombie) {
        if (matchingZombie.id !== this.zombieToShoot.id) {
          this.zombieToShoot.isTargeted = false;
          this.zombieToShoot.correctlyTypedString = "";
          this.zombieToShoot = matchingZombie;
          this.zombieToShoot.isTargeted = true;
        }
      }
      if (
        this.zombieToShoot.word &&
        this.zombieToShoot.word.startsWith(this.typedString)
      ) {
        this.zombieToShoot.correctlyTypedString = this.typedString;
      }
    } else {
      if (this.zombieToShoot.correctlyTypedString) {
        this.zombieToShoot.correctlyTypedString = "";
      }
    }
  }

  update() {
    this.zombies.forEach((zombie) => zombie.update());
  }
}
