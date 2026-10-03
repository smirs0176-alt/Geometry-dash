class Environment {
  constructor() {
    this.bgOffset = 0;
  }

  update() {
    this.bgOffset = (this.bgOffset + CONFIG.SPEED * 0.2) % 40;
  }

  draw(ctx) {
    // Сетка фона
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;

    for (let x = -this.bgOffset; x < CONFIG.CANVAS_WIDTH; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, CONFIG.CANVAS_HEIGHT - CONFIG.GROUND_HEIGHT);
      ctx.stroke();
    }

    // Земля
    ctx.fillStyle = '#001122';
    ctx.fillRect(
      0,
      CONFIG.CANVAS_HEIGHT - CONFIG.GROUND_HEIGHT,
      CONFIG.CANVAS_WIDTH,
      CONFIG.GROUND_HEIGHT
    );

    // Неоновая линия
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#00f0ff';
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, CONFIG.CANVAS_HEIGHT - CONFIG.GROUND_HEIGHT);
    ctx.lineTo(CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT - CONFIG.GROUND_HEIGHT);
    ctx.stroke();
    ctx.shadowBlur = 0;
  }
}

window.Environment = Environment;