class ZombieManager {
  constructor(tutorMode = false) {
    this.zombies = [];
    this.player = new Player(windowWidth / 20, windowHeight / 3, gif_player);
    this.deadZombies = [];
    this.zombieToShoot = {};
    this.typedString = "";
    this.zombieLane = 5;
    this.zombiesKillCount = 0;
    if (tutorMode) {
      setTimeout(() => keyboard.open(), 500);
      this.zombieLane = 3;
    }
    this.bombs = []; //calculate total number of typeable key strokes
  }

  draw() {
    textFont("Georgia", 22);
    //Draw Text Buffer
    rectMode(CENTER);
    fill(24, 78, 119, 200);
    if (currentLanguage == "nepali") {
      rect(
        this.player.xPosition + windowWidth * 0.05,
        this.player.yPosition - windowHeight * 0.06,
        16 * this.typedString.length,
        30
      );
      fill(color("white"));
      text(
        translateToUnicode(this.typedString),
        this.player.xPosition + windowWidth * 0.05,
        this.player.yPosition - windowHeight * 0.05
      );
    } else {
      rect(
        this.player.xPosition + windowWidth * 0.05,
        this.player.yPosition - windowHeight * 0.06,
        16 * this.typedString.length,
        30
      );
      fill(color("white"));
      text(
        this.typedString,
        this.player.xPosition + windowWidth * 0.05,
        this.player.yPosition - windowHeight * 0.05
      );
    }
    if (this.zombieToShoot.word) {
      rectMode(CENTER);
      fill(24, 78, 119, 200);
      rect(
        this.player.xPosition + windowWidth * 0.05,
        this.player.yPosition - windowHeight * 0.1,
        16 * this.zombieToShoot.word.length,
        30
      );
      fill(color("white"));
      text(
        this.zombieToShoot.word,
        this.player.xPosition + windowWidth * 0.05,
        this.player.yPosition - windowHeight * 0.09
      );
    }

    this.player.draw();
    // this.bombs.drawBomb();
    this.deadZombies.forEach((zombie) => zombie.draw());
    for (var i = this.zombies.length - 1; i >= 0; i--) {
      this.zombies[i].draw();
    }
    // this.zombies.forEach((zombie) => zombie.draw());
    if (typeof this.zombieToShoot.draw === "function") {
      this.zombieToShoot.draw();
    }
    this.bombs.forEach((bomb) => bomb.drawBomb());
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
          gif_zomb[Math.floor(Math.random() * 3)]
        )
      )
    );

    keyboard.glow_dim(this.zombies[0].word, this.typedString);
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
          keyboardAnalytics.setCorrectlyTypedWords(this.zombieToShoot.word);
          // keyboardAnalytics.correctlyTypedWords.push(this.zombieToShoot.word);
          this.typedString = "";
          var newBomb = new Bomb(this.player, this.zombieToShoot);
          this.bombs.push(newBomb);
          this.zombieToShoot.showWordBox = false;
          this.zombieToShoot.chetVayo(newBomb.bulletTime);
          this.deadZombies.push(this.zombieToShoot);
          this.player.instance = 3;
          if (this.deadZombies.length > 4) {
            this.deadZombies.shift();
          }
          // this.zombies = this.zombies.filter(
          //   (zombie) => zombie.id != this.zombieToShoot.id
          // );
          this.zombiesKillCount += 1;
          this.zombieToShoot = {};
          setTimeout(
            () =>
              (this.zombies = this.zombies.filter((zombie) => zombie.isAlive)),
            newBomb.bulletTime * 1000
          );

          //shooting

          //keyboard.glow_dim(this.zombies[0].word[0], "");
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
    keyboard.glow_dim(
      this.zombieToShoot.word || this.zombies[0].word,
      this.typedString
    );
  }

  setZombieToShoot() {
    if (keyboardAnalytics.startTime === null) {
      keyboardAnalytics.setStartTime();
    }
    if (this.typedString.length > 0) {
      let matchingZombie = this.zombies.find(
        (zombie) => zombie.word.startsWith(this.typedString) && !zombie.isDying
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
      this.zombieToShoot = this.zombies.find(
        (zombie) => zombie.isDying === false
      );
    }
  }

  update() {
    this.zombies.forEach((zombie) => zombie.update());
    // this.deadZombies.forEach((zombie) => zombie.update());
    this.bombs = this.bombs.filter((bomb) => bomb.exploded === false);
    this.bombs.forEach((bomb) => bomb.updateBomb());
    this.player.update();
  }
}
