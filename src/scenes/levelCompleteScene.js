class LevelCompleteScene {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.sceneName = "levelComplete";
    this.button = new Button("Continue", width / 2, height / 2 - 50);
    this.button.callOnMousePress(() => this.sceneManager.enterScene("tutor"));
  }
  draw() {
    clear();
    // background(220);
    background(grass);
    keyboardAnalytics.displayAnalytics(width / 2, height / 2);
    this.button.draw();
  }
  mouseClicked() {
    this.button.mouseClicked();
  }
  onSceneEnter() {
    keyboardAnalytics.calculate();
    console.log(" SceneEnter : Game Over ");
  }
  onSceneExit() {
    console.log(" SceneExit : Game Over ");
  }
  update() {}
}
