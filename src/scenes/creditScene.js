class CreditScene {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.sceneName = "credit";
    this.backButton = new Button("Back", windowWidth / 10, windowHeight * 0.1);
  }
  draw() {
    clear();
    // background(220);
    background(grass);
    textSize(30);
    this.backButton.draw();
    textSize(55);
    text("Credit", 0.6 * windowWidth, 150);
    image(credit_image, 200, 100);
  }

  onSceneEnter() {
    console.log(" SceneEnter : Credit ");
    this.backButton.callOnMousePress(() =>
      this.sceneManager.enterScene("menu")
    );
  }
  onSceneExit() {
    console.log(" SceneExit : Credit ");
  }
  update() {}
  mouseClicked() {
    this.backButton.mouseClicked();
  }
}
