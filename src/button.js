class Button {
  constructor(buttonText, xpos, ypos, width = 200, height = 50) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.height = height;
    this.extendedHeight = 1.2 * height;
    this.extendedWidth = 1.2 * width;
    this.width = width;
    this.buttonText = buttonText;
    this.isHover = false;
    this.mousePressFunction = null;
  }
  callOnMousePress(mousePressFunction) {
    this.mousePressFunction = mousePressFunction;
  }

  draw() {
    if(!this.isHover && this.hover()){
      hover_sound[0].play();
      setTimeout (()=>hover_sound[0].stop(),200);  
    }
    this.isHover = this.hover();
    if (this.isHover) {
      fill(129, 182, 34);
      rectMode(CENTER);
      rect(this.xpos, this.ypos, this.extendedWidth, this.extendedHeight, 60);
    } 
    else {
      this.isHover = false;
      fill(89, 152, 26);
      rectMode(CENTER);
      rect(this.xpos, this.ypos, this.width, this.height, 60);
    }
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
