class SceneManager {
  constructor(sceneList) {
    this.scenes = sceneList.map((scene) => new scene(this));
    this.currentScene = this.scenes[0];
  }
  loop() {
    this.currentScene.update();
    this.currentScene.draw();
  }
  keyPressed(key) {
    this.currentScene.keyPressed(key);
  }
  switchScene(newSceneName) {
    if (this.currentScene && this.currentScene.exitScene) {
      this.currentScene.exitScene();
    }
    var existingScene = this.getScene(newSceneName);
    if (existingScene) {
      this.currentScene = existingScene;
    } else {
      console.log("invalid scene name");
    }
  }
  getScene(sceneName) {
    console.log(sceneName);
    return this.scenes.find((scene) => scene.sceneName === sceneName);
  }
}
