class Button {
  constructor(buttonText, xpos, ypos, width = 200, height = 50) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.height = height;
    this.width = width;
    this.buttonText = buttonText;
    this.isHover = false;
    this.mousePressFunction = null;
  }
  callOnMousePress(mousePressFunction) {
    this.mousePressFunction = mousePressFunction;
  }

  draw() {
    this.isHover = this.hover();
    if (this.isHover) {
      fill(129, 182, 34, 128);
    } else {
      this.isHover = false;
      fill(6, 26, 64, 200);
    }
    rectMode(CENTER);
    rect(this.xpos, this.ypos, this.width, this.height, 60);
    //textSize(25);
    fill(255);
    textAlign(CENTER);
    text(this.buttonText, this.xpos, this.ypos + 10);
  }

  hover() {
    if (
      mouseX > this.xpos - this.width / 2 &&
      mouseX < this.xpos + this.width / 2 &&
      mouseY > this.ypos - this.height / 2 &&
      mouseY < this.ypos + this.height / 2
    ) {
      return true;
    }
    return false;
  }
  mouseClicked() {
    if (this.isHover) {
      this.mousePressFunction();
    }
  }
}
