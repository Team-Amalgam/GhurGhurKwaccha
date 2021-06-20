var sceneManager;
var gif_loadImg;

function setup() {
  createCanvas(windowWidth, windowHeight);
  var sceneList = [PlayScene, MenuScene, CreditScene, TutorScene];
  sceneManager = new SceneManager(sceneList);
  sceneManager.enterScene("tutor");
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
    loadImage("assets/zm.png"),
    loadImage("assets/zm1.png"),
    loadImage("assets/die2.png"),
    loadImage("assets/die1.png"),
  ];
}
