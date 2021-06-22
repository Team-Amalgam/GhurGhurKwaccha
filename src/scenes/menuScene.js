class MenuScene {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.sceneName = "menu";
    this.playModeButton = new Button(windowWidth / 2, 300, "Play Mode");
    this.tutorModeButton = new Button(windowWidth / 2, 200, "Tutor Mode");
    this.exitButton = new Button(windowWidth / 2, 400, "Exit");
  }
  draw() {
    clear();
    background(44, 142, 153);
    this.playModeButton.draw();
    this.tutorModeButton.draw();
    this.exitButton.draw();
  }
  keyPressed(key) {
    if (String(key) === "s") {
      this.sceneManager.enterScene("credit");
    }
  }
  onSceneEnter() {
    console.log(" SceneEnter : Menu ");
    this.playModeButton.callOnMousePress(() =>
      this.sceneManager.enterScene("play")
    );
    this.tutorModeButton.callOnMousePress(() =>
      this.sceneManager.enterScene("tutor")
    );
    this.exitButton.callOnMousePress(() => window.close());
  }
  onSceneExit() {
    console.log(" SceneExit : Menu ");
  }
  update() {
    //console.log(" Update : Menu ")
  }
  mouseClicked() {
    this.playModeButton.mouseClicked();
    this.tutorModeButton.mouseClicked();
    this.exitButton.mouseClicked();
  }
}
