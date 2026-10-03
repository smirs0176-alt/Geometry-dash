class Player {
  constructor() {
    this.size = 36;
    this.x = 120;
    this.y = 0;
    this.vy = 0;
    this.rotation = 0;
    this.isGrounded = false;
    this.reset();
  }

  reset() {
    this.y = CONFIG.CANVAS_HEIGHT - CONFIG.GROUND_HEIGHT - this.size;
    this.vy = 0;
    this.rotation = 0;
    this.isGrounded = true;
  }

  jump() {
    if (this.isGrounded) {
      this.vy = CONFIG.JUMP_FORCE;
      this.isGrounded = false;
    }
  }

  update() {
    this.vy += CONFIG.GRAVITY;
    this.y += this.vy;

    const groundY = CONFIG.CANVAS_HEIGHT - CONFIG.GROUND_HEIGHT - this.size;

    if (this.y >= groundY) {
      this.y = groundY;
      this.vy = 0;
      this.isGrounded = true;
      // Округление угла при приземлении
      this.rotation = Math.round(this.rotation / 90) * 90;
    } else {
      // Вращение в воздухе
      this.rotation += 8;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x + this.size / 2, this.y + this.size / 2);
    ctx.rotate((this.rotation * Math.PI) / 180);

    // Внешний квадрат
    ctx.fillStyle = '#ffe600';
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.strokeRect(-this.size / 2, -this.size / 2, this.size, this.size);

    // Внутренний глаз
    ctx.fillStyle = '#00f0ff';
    ctx.fillRect(-this.size / 6, -this.size / 6, this.size / 3, this.size / 3);

    ctx.restore();
  }
}

window.Player = Player;