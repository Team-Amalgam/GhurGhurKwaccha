class TutorScene {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.sceneName = "tutor";
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
    console.log(" SceneEnter : Tutor ");
    this.zombieManager = new ZombieManager(true);
    this.zombieManager.generateZombies("play", "english", 0.1);
  }
  onSceneExit() {
    console.log(" SceneExit : Tutor ");
    this.zombieManager.keyboard.close();
  }
  update() {
    this.zombieManager.update();
  }
}
