class PlayScene {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.sceneName = "play";
    this.zombieToFire;
    this.batchSize = 15;
    this.threshold = 5;
  }

  draw() {
    clear();
    background(220);
    this.zombieManager.draw();
  }
  generateWords() {
    let index = Math.trunc(Math.random() * quotes.length);
    let quote = quotes[index];
    //let quote = "helllo i am happyhdskad";
    let words = quote.split(" ");
    if (words.length > this.batchSize) {
      words = words.slice(0, this.batchSize);
    }
    this.zombieManager.generateZombies(words, 1.2);
  }
  keyPressed(key) {
    this.zombieManager.keyPressed(key);
  }
  onSceneEnter() {
    console.log(" SceneEnter : Play ");
    this.zombieManager = new ZombieManager();
  }
  onSceneExit() {
    console.log(" SceneExit : Play ");
  }
  update() {
    this.zombieManager.update();
    if (this.zombieManager.zombies.length < this.threshold) {
      this.generateWords();
    }
  }
}
