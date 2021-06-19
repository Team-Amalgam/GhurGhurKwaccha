class CreditScene {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.sceneName = "credit";
  }
  draw() {
    clear();
    background(220);
    text("Credit Scene", width / 2, 100);
    rect(200, 250, 100, 100);
    rect(200, 400, 100, 100);
    //console.log(" Draw : Menu ")
  }
  keyPressed(key) {
    if (String(key) === "s") {
      this.sceneManager.enterScene("menu");
    }
  }
  onSceneEnter() {
    console.log(" SceneEnter : Credit ");
  }
  onSceneExit() {
    console.log(" SceneExit : Credit ");
  }
  update() {}
}
