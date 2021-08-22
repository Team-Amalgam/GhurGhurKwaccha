class Bomb {
  constructor(player, enemy) {
    this.player = player;
    this.enemy = enemy;
    this.exploded = false;

    this.g = 700 / bulletHitTime;

    this.skinIndex = 0;
    this.generatePath();

    this.skin = bomb_img;
  }
  drawBomb() {
    image(this.skin[this.skinIndex], this.xPosition, this.yPosition);
  }
  generatePath() {
    var bombOffset = windowWidth / 16;
    this.xPosition = this.player.xPosition + bombOffset;
    this.yPosition = this.player.yPosition;
    var xOffset = this.enemy.xPosition - this.xPosition;
    var yOffset = this.enemy.yPosition - this.yPosition;

    this.bulletTime =
      Math.max(0.3, this.enemy.xPosition / windowWidth) * bulletHitTime;

    this.predictedDistance = xOffset - this.enemy.speed * this.bulletTime;
    if (this.predictedDistance < 0.27 * windowWidth)
      this.predictedDistance = 0.23 * windowWidth - bombOffset;
    this.speedX = this.predictedDistance / this.bulletTime;
    this.speedY =
      (yOffset - (this.g * this.bulletTime * this.bulletTime) / 2) /
      this.bulletTime;
    setTimeout(() => {
      this.skinIndex = 1;
      this.speedX = 50;
      this.speedY = 50;
      this.g = 0;
    }, this.bulletTime * 1000 + 10);
    setTimeout(() => (this.exploded = true), this.bulletTime * 1000 + 250);
  }
  updateBomb() {
    this.speedY += this.g * deltaTimeInSeconds;
    this.xPosition += this.speedX * deltaTimeInSeconds;
    this.yPosition += this.speedY * deltaTimeInSeconds;
  }
}
