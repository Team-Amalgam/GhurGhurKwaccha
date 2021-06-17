class ZombieManager {
  constructor() {
    this.zombies = [];
    this.zombieToShoot = {};
    this.typedString = "";
  }

  draw() {
    text(this.typedString, windowWidth / 2, windowHeight / 10);
    this.zombies.forEach((zombie) => zombie.draw());
  }

  generateZombies(mode, language, level) {
    if (mode == "play" && language == "english") {
      let index = Math.trunc(Math.random() * quotes.length);
      let quote = quotes[index];
      let words = quote.split(" ");
      this.zombies = words.map(
        (word, index) =>
          new Zombie(
            windowWidth + index * 100,
            Math.trunc(Math.random() * 5) * (windowHeight / 5) + 20,
            // 100 + (index % 5) * 100,
            // 100 + Math.trunc(index / 5) * 50,
            word,
            level * 2 + 1
          )
      );
    }
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
  }

  setZombieToShoot() {
    if (this.typedString.length > 0) {
      let matchingZombie = this.zombies.find((zombie) =>
        zombie.word.startsWith(this.typedString)
      );
      if (matchingZombie) {
        if (matchingZombie.id !== this.zombieToShoot.id) {
          this.zombieToShoot.isTargeted = false;
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
