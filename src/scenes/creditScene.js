class CreditScene {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.sceneName = "credit";
  }
  setup() {
    console.log(" Setup : Credit ");
  }
  update() {}
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
      this.sceneManager.switchScene("menu");
    }
  }
}
