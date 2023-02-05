const Attempts = {
  init() {
    if (window.location.href.includes('game') && !this.verifyGameStarted()) {
      window.location.href = '/';
      return;
    }

    if (window.location.href.includes('game') && this.verifyGameStarted()) {
      this.listenerUpdateAttempts();
      this.renderAttempts();
    }
  },
  subscribeListeners() {
    this.listenerUpdateAttempts();
  },
  listenerUpdateAttempts() {
    const handle = (() => {
      this.renderAttempts();
    }).bind(this);

    document.addEventListener('GAME_UPDATE_ATTEMPTS', handle);
  },
  renderAttempts() {
    document.getElementById('attempts').innerHTML = '';
    const attempts = GameControllerService.getAttempts();

    const handle = ((caracter, index) => {
      this.renderAttempt(caracter, index);
    }).bind(this);

    attempts.forEach(handle);
  },
  /**
   *
   * @param {{success: boolean, value: string}} attempt
   */
  renderAttempt(attempt) {
    const text = document.createElement('h1');
    text.innerText = attempt.value;
    text.setAttribute('class', attempt.success ? 'success' : 'error');
    document.getElementById('attempts').appendChild(text);
  },
  verifyGameStarted() {
    return (
      GameControllerService.getStatus() ===
        GameControllerService.gameStatus.GAME_STARTED &&
      window.location.href.includes('game')
    );
  },
};

Attempts.init();

try {
  module.exports = Attempts;
} catch (error) {}
