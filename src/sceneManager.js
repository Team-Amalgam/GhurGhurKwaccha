class SceneManager {
  constructor(sceneList) {
    this.scenes = sceneList.map((scene) => new scene(this));
  }
  enterScene(newSceneName) {
    if (this.currentScene && this.currentScene.onSceneExit) {
      this.currentScene.onSceneExit();
    }
    if (currentLanguage == "nepali") {
      textFont(nepaliFont, 30);
    } else {
      textFont("Georgia", 22);
    }
    var existingScene = this.getScene(newSceneName);
    if (existingScene) {
      this.currentScene = existingScene;
      this.currentScene.onSceneEnter();
    } else {
      console.log("invalid scene name");
    }
  }
  getScene(sceneName) {
    console.log(sceneName);
    return this.scenes.find((scene) => scene.sceneName === sceneName);
  }
  keyPressed(key) {
    this.currentScene.keyPressed(key);
  }
  loop() {
    this.currentScene.update();
    this.currentScene.draw();
  }
}
