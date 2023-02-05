const GameForm = {
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
    this.listenerSubmit();
  },
  listenerSubmit() {
    const form = document.getElementById('game-word-input-form');
    const handle = ((e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const { caracter } = Object.fromEntries(formData);
      GameControllerService.test(caracter);
      e.target.reset();
    }).bind(this);
    form.addEventListener('submit', handle);
  },
};

GameForm.init();

try {
  module.exports = GameForm;
} catch (error) {}
