var sceneManager;
var gif_loadImg;
var nepaliFont;
var currentLanguage = "english";

function setup() {
  createCanvas(windowWidth, windowHeight);
  var sceneList = [
    PlayScene,
    MenuScene,
    CreditScene,
    TutorScene,
    GameOverScene,
  ];
  sceneManager = new SceneManager(sceneList);
  sceneManager.enterScene("menu");
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
  nepaliFont = loadFont("css/font.otf");
}
function mouseClicked() {
  sceneManager.mouseClicked();
}
