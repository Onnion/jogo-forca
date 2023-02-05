const RestartBtn = {
  init() {
    if (window.location.href.includes('game') && !this.verifyGameStarted()) {
      window.location.href = '/';
      return;
    }

    if (window.location.href.includes('game') && this.verifyGameStarted()) {
      this.subscribeListeners();
    }
  },
  verifyGameStarted() {
    return (
      GameControllerService.getStatus() ===
        GameControllerService.gameStatus.GAME_STARTED &&
      window.location.href.includes('game')
    );
  },
  subscribeListeners() {
    this.listenerClick();
    this.listenerGameFinished();
  },
  emitRestart() {
    const event = new Event('GAME_RESTART');
    document.dispatchEvent(event);
    window.location.href = '/';
  },
  listenerClick() {
    const btn = document.getElementById('restartbtn__button');
    const handle = (() => {
      const restartbtn = document.getElementById('restartbtn');
      restartbtn.classList.add('hidden');
      this.emitRestart();
    }).bind(this);

    btn.addEventListener('click', handle);
  },
  listenerGameFinished() {
    const handle = (() => {
      const restartbtn = document.getElementById('restartbtn');
      restartbtn.classList.remove('hidden');
    }).bind(this);

    document.addEventListener('GAME_FINISHED_BY_ERROR', handle);
    document.addEventListener('GAME_FINISHED_BY_SUCCESS', handle);
  },
};

RestartBtn.init();

try {
  module.exports = RestartBtn;
} catch (error) {}
