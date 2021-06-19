class MenuScene {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.sceneName = "menu";
  }
  draw() {
    clear();
    background(220);
    text("Menu Scene", width / 2, 100);
    rect(200, 100, 100, 100);
    rect(200, 250, 100, 100);
    rect(200, 400, 100, 100);
    //console.log(" Draw : Menu ")
  }
  keyPressed(key) {
    if (String(key) === "s") {
      this.sceneManager.enterScene("credit");
    }
  }
  onSceneEnter() {
    console.log(" SceneEnter : Menu ");
  }
  onSceneExit() {
    console.log(" SceneExit : Menu ");
  }
  update() {
    //console.log(" Update : Menu ")
  }
}
