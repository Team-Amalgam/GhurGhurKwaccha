class MenuScene {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.sceneName = "menu";
    this.tutorModeButton = new Button("Tutor Mode", windowWidth / 2, 200);
    this.playModeButton = new Button("Play Mode", windowWidth / 2, 300);
    this.helpModeButton = new Button("Help", windowWidth / 2, 400);
    this.creditModeButton = new Button("Credit", windowWidth / 2, 500);
    this.buttons = [
      new Button("Tutor Mode", windowWidth / 2, 200),
      new Button("Play Mode", windowWidth / 2, 300),
      new Button("Help", windowWidth / 2, 400),
      new Button("Credit", windowWidth / 2, 500),
    ];
    this.buttonSceneName = ["tutor", "play", "help", "credit"];
    this.animated = [
      new AnimatedSprite(gif_zomb[0][0]),
      new AnimatedSprite(gif_zomb[1][0]),
      new AnimatedSprite(gif_player[0]),
      new AnimatedSprite(gif_zomb[0][1]),
      new AnimatedSprite(gif_zomb[2][1]),
    ];
    this.bombs = [];
    //setInterval(this.generateBombs, Math.random() * 5000);
    this.generateBombs();
    this.xPosition = [0, 0, windowWidth * 0.35, 100, 900];
    this.yPosition = [400, 500, 150, 100, 200];
    this.animateFunction = [0, 0, 0, 1, 1];
  }

  draw() {
    clear();
    background(grass);
    this.animated.map((animate, index) => {
      if (this.animateFunction[index] === 0) {
        animate.drawImageLoop(this.xPosition[index], this.yPosition[index]);
      } else if (this.animateFunction[index] === 1) {
        animate.drawImageOnce(this.xPosition[index], this.yPosition[index]);
      }
    });
    this.buttons.map((button) => button.draw());
    this.bombs.map((bomb) => bomb.drawBomb());
  }
  generateBombs() {
    const player = {
      xPosition: 0,
      yPosition: Math.random() * windowHeight,
    };
    const enemy = {
      xPosition: (Math.random() + 0.8) * 0.5 * windowWidth,
      yPosition: Math.random() * windowHeight,
      speed: 0,
    };
    this.bombs.push(new Bomb(player, enemy));
    setTimeout(() => this.generateBombs(), Math.random() * 3000);
  }
  keyPressed(key) {
    if (String(key) === "s") {
      this.sceneManager.enterScene("credit");
    }
  }
  onSceneEnter() {
    console.log(" SceneEnter : Menu ");
    this.buttons.map((button, index) => {
      button.callOnMousePress(() =>
        this.sceneManager.enterScene(this.buttonSceneName[index])
      );
    });
  }
  onSceneExit() {
    console.log(" SceneExit : Menu ");
  }
  update() {
    this.xPosition[0] = (this.xPosition[0] + 2) % windowWidth;
    this.xPosition[1] = windowWidth - this.xPosition[0];
    this.buttons.map((button) => {
      if (button.isHover) {
        this.yPosition[2] = button.ypos - 50;
      }
    });
    this.bombs.map((bomb) => bomb.updateBomb());
    this.bombs = this.bombs.filter((bomb) => !bomb.exploded);
  }
  mouseClicked() {
    this.buttons.map((button) => button.mouseClicked());
  }
}
