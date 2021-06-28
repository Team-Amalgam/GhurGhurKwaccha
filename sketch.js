var sceneManager;
var gif_loadImg;
var nepaliFont;
var currentLanguage = "nepali";
var keyboard;
function setup() {
  createCanvas(windowWidth, windowHeight);
  var sceneList = [
    PlayScene,
    MenuScene,
    CreditScene,
    TutorScene,
    GameOverScene,
  ];
  keyboard = new Keyboard("US", currentLanguage);
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
    loadImage("assets/Zombies/Z01/Walking/Walking_000.png"),
    loadImage("assets/Zombies/Z01/Walking/Walking_001.png"),
    loadImage("assets/Zombies/Z01/Dying/Dying_000.png"),
    loadImage("assets/Zombies/Z01/Dying/Dying_001.png"),
  ];
  nepaliFont = loadFont("css/font.otf");
}
function mouseClicked() {
  sceneManager.mouseClicked();
}
