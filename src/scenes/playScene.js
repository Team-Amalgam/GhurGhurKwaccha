class PlayScene {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.sceneName = "play";
    this.zombieToFire;
  }

  draw() {
    clear();
    background(220);
    //text("Play Scene", width / 2, 100);
    this.zombieManager.draw();
    //console.log(" Draw : Menu ")
  }
  keyPressed(key) {
    this.zombieManager.keyPressed(key);
  }
  onSceneEnter() {
    console.log(" SceneExit : Play ");
    this.zombieManager = new ZombieManager();
    this.zombieManager.generateZombies("play", "english", 0.1);
  }
  onSceneExit() {
    console.log(" SceneExit : Play ");
  }
  update() {
    //console.log(" Update : Menu ")
    this.zombieManager.update();
  }
}
