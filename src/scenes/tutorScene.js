class TutorScene {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.sceneName = "tutor";
    this.zombieToFire;
    this.isLevelSelected = false;
    this.level = 0;
    this.batchSize = 10;
    this.threshHold = 5;
    this.lastZombieIndex = 0;
    this.totalExerciseWordLength = 0;
    this.levelSelectionButtons = [];
    var buttons = ["Home Key", "Top Key", "Bottom Key", "Number"];
    buttons.map((text, index) => {
      Object.keys(tutorData[index]).map((a) => {
        var button = new Button(
          `${int(a) + 1}`,
          250 + a * 70,
          120 + index * 120,
          50,
          50
        );
        button.callOnMousePress(() => this.startLevel(`${index} ${a}`));
        this.levelSelectionButtons.push(button);
      });
    });
  }

  draw() {
    clear();
    background(220);
    if (this.isLevelSelected) {
      textAlign(LEFT);
      text(
        `Words Type: ${this.zombieManager.zombiesKillCount}/${this.totalExerciseWordLength}`,
        50,
        70
      );
      textAlign(CENTER);
      this.zombieManager.draw();
    } else {
      fill(color("black"));
      textFont("Georgia", 32);
      textAlign(LEFT);
      text("Home Key", 230, 70);
      text("Top Key", 230, 190);
      text("Bottom Key", 230, 310);
      text("Numeric Key", 230, 430);
      this.levelSelectionButtons.map((button) => button.draw());
    }
  }
  generateWords() {
    let levels = this.level.split(" ");
    let words = tutorData[int(levels[0])][int(levels[1])];
    this.totalExerciseWordLength = words.split(" ").length;
    words = words.split(" ").filter((word) => word != "");
    words = words.slice(
      this.lastZombieIndex,
      this.lastZombieIndex + this.batchSize
    );
    this.lastZombieIndex += words.length;
    this.zombieManager.generateZombies(words, 2);
  }
  keyPressed(key) {
    if (String(key) === " ") {
      if (this.zombieManager.zombies.length === 1) {
        this.sceneManager.enterScene("gameOver");
        return;
      }
    }
    this.zombieManager.keyPressed(key);
  }
  onSceneEnter() {
    console.log(" SceneEnter : Tutor ");
    this.isLevelSelected = false;
  }
  onSceneExit() {
    this.lastZombieIndex = 0;
    this.totalExerciseWordLength = 0;
    console.log(" SceneExit : Tutor ");
    keyboard.close();
  }
  startLevel(level) {
    this.zombieManager = new ZombieManager(true);
    this.level = level;
    this.generateWords();
    this.isLevelSelected = true;
  }
  update() {
    if (this.isLevelSelected) {
      this.zombieManager.update();
      if (this.zombieManager.zombies.length < this.threshHold) {
        this.generateWords();
      }
    }
  }
  mouseClicked() {
    if (!this.isLevelSelected) {
      this.levelSelectionButtons.map((button) => button.mouseClicked());
    }
  }
}
