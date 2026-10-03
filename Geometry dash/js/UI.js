class UI {
  constructor() {
    this.scoreText = document.getElementById('scoreText');
    this.bestText = document.getElementById('bestText');
    this.finalScore = document.getElementById('finalScore');
    this.startMenu = document.getElementById('startMenu');
    this.gameOverMenu = document.getElementById('gameOverMenu');
    this.startBtn = document.getElementById('startBtn');
    this.restartBtn = document.getElementById('restartBtn');
  }

  updateScore(score) {
    this.scoreText.innerText = `Счет: ${Math.floor(score / 10)}m`;
  }

  updateBest(highScore) {
    this.bestText.innerText = `Рекорд: ${Math.floor(highScore / 10)}m`;
  }

  showGameOver(score) {
    this.finalScore.innerText = `Ваш результат: ${Math.floor(score / 10)}m`;
    this.gameOverMenu.classList.remove('hidden');
  }

  hideMenus() {
    this.startMenu.classList.add('hidden');
    this.gameOverMenu.classList.add('hidden');
  }

  isStartMenuVisible() {
    return !this.startMenu.classList.contains('hidden');
  }
}

window.UI = UI;