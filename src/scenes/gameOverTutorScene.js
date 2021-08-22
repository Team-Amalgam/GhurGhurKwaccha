class GameOverTutorScene {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.sceneName = "gameOverTutor";
    this.button = new Button("Continue", width / 2, height / 2 + windowHeight/10.8);
    this.button.callOnMousePress(() => this.sceneManager.enterScene("tutor"));
  }
  draw() {
    clear();
    // background(220);
    background(grass);
    // fill(color("black"));

    // text("Try Again!!", width / 2, height / 2.2);
    keyboardAnalytics.displayAnalytics(width / 2, height / 2.2);
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
