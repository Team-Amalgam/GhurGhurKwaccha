class HelpScene {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.sceneName = "help";
    this.typedString = "Start Typing";
    this.translatedString = "कृपया टाईप गर्नुहोस";
    this.backButton = new Button("Back", windowWidth / 10, windowHeight * 0.1);
  }
  draw() {
    clear();
    // background(220);
    background(grass);
    textSize(40);
    text("Help", width / 2, 100);
    textSize(20);
    fill(6, 26, 64, 200);
    rect(0.25 * windowWidth, 200, 500, 150, 15); // textbox 1
    rect(0.75 * windowWidth, 200, 500, 150, 15); // textbox 2
    fill(255);
    text(this.typedString, 0.25 * windowWidth, 200, 500, 140); //text 1
    text(this.translatedString, 0.75 * windowWidth, 200, 500, 140); //text 2
    if (keyIsDown(BACKSPACE)) {
      console.log("back");
    }
    this.backButton.draw();
    image(help_text, 0.25 * windowWidth, 300);
  }

  onSceneEnter() {
    console.log(" SceneEnter : Help ");
    this.backButton.callOnMousePress(() =>
      this.sceneManager.enterScene("menu")
    );
  }
  onSceneExit() {
    console.log(" SceneExit : Help ");
  }
  update() {}
  keyPressed() {
    key = String(key);
    if (this.typedString === "Start Typing") this.typedString = "";
    if (key === "Backspace" && key !== "") {
      this.typedString = this.typedString.slice(0, -1);
    } else {
      if (key.length === 1) {
        this.typedString += key;
      }
    }
    this.translatedString = translateToUnicode(this.typedString);
  }
  mouseClicked() {
    this.backButton.mouseClicked();
  }
}
