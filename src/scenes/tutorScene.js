class TutorScene {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.sceneName = "tutor";
    this.zombieToFire;
    this.isLevelSelected = false;
    this.level = 0;
    this.batchSize = 5;
    this.threshHold = 2;
    this.lastZombieIndex = 0;
    this.totalExerciseWordLength = 0;
    this.levelSelectionButtons = [];
    var buttons = [
      "Exercise 1",
      "Exercise 2",
      "Exercise 3",
      "Exercise 4",
      "Exercise 5",
      "Exercise 6",
      "Exercise 7",
      "Exercise 8",
      "Exercise 9",
      "Exercise 10",
      "Exercise 11",
      "Exercise 12",
      "Exercise 13",
      "Exercise 14",
      "Exercise 15",
      "Exercise 16",
      "Exercise 17",
      "Exercise 18",
    ];
    buttons.map((text, index) => {
      var button = new Button(
        400 + (index % 2) * 350,
        50 + Math.trunc(index / 2) * 75,
        text
      );
      button.callOnMousePress(() => this.startLevel(index));
      this.levelSelectionButtons.push(button);
    });
  }

  draw() {
    clear();
    background(220);
    if (this.isLevelSelected) {
      this.zombieManager.draw();
    } else {
      this.levelSelectionButtons.map((button) => button.draw());
    }
  }
  generateWords() {
    let words = tutorData[this.level];
    this.totalExerciseWordLength = words.length;
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
    console.log(" SceneExit : Tutor ");
    this.zombieManager.keyboard.close();
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
    this.levelSelectionButtons.map((button) => button.mouseClicked());
  }
}
