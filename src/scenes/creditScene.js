class CreditScene {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.sceneName = "credit";
  }
  draw() {
    clear();
    // background(220);
    background(grass);    
    text("Credit Scene", width / 2, 100);
    rect(200, 250, 100, 100);
    rect(200, 400, 100, 100);
  }

  onSceneEnter() {
    console.log(" SceneEnter : Credit ");
  }
  onSceneExit() {
    console.log(" SceneExit : Credit ");
  }
  update() {}
}
