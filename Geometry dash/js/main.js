const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = new window.Player();
const environment = new window.Environment();
const ui = new window.UI();

let obstacles = [];
let spawnTimer = 0;
let isPlaying = false;
let score = 0;
let highScore = Number(localStorage.getItem('gd_highscore')) || 0;
let animationFrameId;

ui.updateBest(highScore);

function createObstacle() {
  const type = Math.random() > 0.35 ? 'spike' : 'block';
  obstacles.push(new window.Obstacle(type));
}

function startGame() {
  ui.hideMenus();
  score = 0;
  obstacles = [];
  spawnTimer = 0;
  player.reset();
  isPlaying = true;
  ui.updateBest(highScore);

  cancelAnimationFrame(animationFrameId);
  gameLoop();
}

function gameOver() {
  isPlaying = false;
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('gd_highscore', String(highScore));
  }
  ui.updateBest(highScore);
  ui.showGameOver(score);
}

function gameLoop() {
  if (!isPlaying) return;

  ctx.clearRect(0, 0, window.CONFIG.CANVAS_WIDTH, window.CONFIG.CANVAS_HEIGHT);

  // Отрисовка окружения
  environment.update();
  environment.draw(ctx);

  // Обновление и отрисовка игрока
  player.update();
  player.draw(ctx);

  // Спавн и логика препятствий
  spawnTimer++;
  if (spawnTimer > 70 + Math.random() * 50) {
    createObstacle();
    spawnTimer = 0;
  }

  for (let i = obstacles.length - 1; i >= 0; i--) {
    const obs = obstacles[i];
    obs.update();
    obs.draw(ctx);

    if (obs.checkCollision(player)) {
      gameOver();
    }

    if (obs.x + obs.size < 0) {
      obstacles.splice(i, 1);
    }
  }

  // Счет
  score++;
  ui.updateScore(score);

  animationFrameId = requestAnimationFrame(gameLoop);
}

// События
ui.startBtn.addEventListener('click', startGame);
ui.restartBtn.addEventListener('click', startGame);

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'ArrowUp') {
    if (isPlaying) {
      player.jump();
    } else if (ui.isStartMenuVisible()) {
      startGame();
    }
  }
});

canvas.addEventListener('mousedown', () => {
  if (isPlaying) {
    player.jump();
  }
});