class GameOverTutorScene {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.sceneName = "gameOverTutor";
    this.button = new Button("Continue", width / 2, height / 2 - 50);
    this.button.callOnMousePress(() => this.sceneManager.enterScene("tutor"));
  }
  draw() {
    clear();
    // background(220);
    background(grass);
    fill(color("black"));
    text("Try Again!!", width / 2, height / 2);
    this.button.draw();
  }
  mouseClicked() {
    this.button.mouseClicked();
  }
  onSceneEnter() {
    console.log(" SceneEnter : Game Over ");
  }
  onSceneExit() {
    console.log(" SceneExit : Game Over ");
  }
  update() {}
}
