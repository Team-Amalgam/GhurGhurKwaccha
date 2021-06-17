var sceneManager;

function setup() {
  createCanvas(windowWidth, windowHeight);
  var sceneList = [PlayScene, MenuScene, CreditScene];
  sceneManager = new SceneManager(sceneList);
  sceneManager.enterScene("play");
}

function draw() {
  sceneManager.loop();
}

function keyPressed() {
  sceneManager.keyPressed(key);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
