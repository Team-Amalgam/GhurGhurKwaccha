class GameOverPlayScene {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.sceneName = "gameOverPlay";
    this.button = new Button("Continue", width / 2, height / 2 - 50);
    this.button.callOnMousePress(() => this.sceneManager.enterScene("menu"));
  }
  draw() {
    clear();
    // background(220);
    background(grass);
    fill(color("black"));
    text("Try More", width / 2, height / 2);
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
