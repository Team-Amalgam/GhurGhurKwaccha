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
    this.xPosition = this.player.xPosition;
    this.yPosition = this.player.yPosition;
    var xOffset = this.enemy.xPosition - this.player.xPosition;
    var yOffset = this.enemy.yPosition - this.player.yPosition;

    this.predictedDistance = xOffset - this.enemy.speed * bulletHitTime;
    if (this.predictedDistance < 0.2 * windowWidth)
      this.predictedDistance = 0.18 * windowWidth;
    this.speedX = this.predictedDistance / bulletHitTime;
    this.speedY =
      (yOffset - (this.g * bulletHitTime * bulletHitTime) / 2) / bulletHitTime;
    setTimeout(() => {
      this.skinIndex = 1;
      this.speedX = 50;
      this.speedY = 50;
      this.g = 0;
    }, bulletHitTime * 1000 + 10);
    setTimeout(() => (this.exploded = true), bulletHitTime * 1000 + 250);
  }
  updateBomb() {
    this.speedY += this.g * deltaTimeInSeconds;
    this.xPosition += this.speedX * deltaTimeInSeconds;
    this.yPosition += this.speedY * deltaTimeInSeconds;
  }
}
