var sceneManager;
var gif_loadImg;
var nepaliFont;
var currentLanguage = "english";
var keyboard;
var languageFlag;
var slider;

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
  slider= createSlider(0,1,0);
  slider.position(windowWidth-50,50);
  slider.style('width','30px'); 
}

function draw() {
  sceneManager.loop();
  if (sceneManager.currentScene.sceneName==='menu'){
    if (slider.value()){
      currentLanguage = "nepali";
      keyboard.changeLanguage("nepali");
      image(languageFlag[0],windowWidth-45,20,30,30);
    }
    else{
        currentLanguage ="english";
        keyboard.changeLanguage("english");
        image(languageFlag[1],windowWidth-45,30,30,20);
     }

  }

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
  languageFlag =[
  loadImage('assets/Flag-Nepal.png'),
  loadImage('assets/America-Flag.png'),
  ];
  nepaliFont = loadFont("css/font.otf");
}
function mouseClicked() {
  sceneManager.mouseClicked();
}
