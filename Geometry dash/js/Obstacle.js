class Obstacle {
  constructor(type) {
    this.type = type; // 'spike' или 'block'
    this.size = 36;
    this.x = CONFIG.CANVAS_WIDTH + 50;
    this.y = CONFIG.CANVAS_HEIGHT - CONFIG.GROUND_HEIGHT - this.size;
  }

  update() {
    this.x -= CONFIG.SPEED;
  }

  draw(ctx) {
    if (this.type === 'spike') {
      ctx.fillStyle = '#ff0055';
      ctx.beginPath();
      ctx.moveTo(this.x, this.y + this.size);
      ctx.lineTo(this.x + this.size / 2, this.y);
      ctx.lineTo(this.x + this.size, this.y + this.size);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    } else {
      ctx.fillStyle = '#00f0ff';
      ctx.fillRect(this.x, this.y, this.size, this.size);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.strokeRect(this.x, this.y, this.size, this.size);
    }
  }

  checkCollision(player) {
    const padding = 6;
    return (
      player.x + padding < this.x + this.size &&
      player.x + player.size - padding > this.x &&
      player.y + padding < this.y + this.size &&
      player.y + player.size - padding > this.y
    );
  }
}

window.Obstacle = Obstacle;