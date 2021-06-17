var sceneManager;

function setup() {
  createCanvas(windowWidth, windowHeight);
  var sceneList = [MenuScene, CreditScene];
  sceneManager = new SceneManager(sceneList);
}

function draw() {
  sceneManager.loop();
}

function keyPressed() {
  sceneManager.keyPressed(key);
}
