var sceneManager;
var gif_loadImg;

function setup() {
  createCanvas(windowWidth, windowHeight);
  var sceneList = [PlayScene, MenuScene, CreditScene];
  sceneManager = new SceneManager(sceneList);
  sceneManager.enterScene("play");
  //image(gif_loadImg, 50, 0, 40, 20, 50, 50, 50, 50);
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
function preload() {
  gif_loadImg = [
    loadImage("zm.png"),
    loadImage("zm1.png"),
    loadImage("die2.png"),
    loadImage("die1.png"),
  ];
}
