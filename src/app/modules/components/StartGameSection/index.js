const StartGameSection = {
  init() {
    if (!window.location.href.includes('game') && this.verifyGameStarted()) {
      window.location.href = '/game/';
      return;
    }

    if (window.location.href.includes('game') && this.verifyGameStarted()) {
      return;
    }

    this.subscribeListeners();
  },
  verifyGameStarted() {
    return (
      GameControllerService.getStatus() ===
        GameControllerService.gameStatus.GAME_STARTED &&
      !window.location.href.includes('game')
    );
  },
  subscribeListeners() {
    this.listenerFormSubmit();
  },
  listenerFormSubmit() {
    const form = document.getElementById('startgamesection_form');
    const handle = ((e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);

      if (!data.word) {
        return;
      }

      this.emitStartGame(data);
    }).bind(this);

    form.addEventListener('submit', handle);
  },
  emitStartGame(detail) {
    const event = new CustomEvent('GAME_START', { detail });
    document.dispatchEvent(event);
    window.location.href = '/game/';
  },
};

StartGameSection.init();

try {
  module.exports = StartGameSection;
} catch (error) {}
