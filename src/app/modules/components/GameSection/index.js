const GameSection = {
  init() {
    if (window.location.href.includes('game') && !this.verifyGameStarted()) {
      window.location.href = '/';
      return;
    }

    if (window.location.href.includes('game') && this.verifyGameStarted()) {
      this.renderInputs();
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
  renderInputs() {
    document.getElementById('game-inputs').innerHTML = '';
    const word = GameControllerService.getWord();
    const words = [...word];
    const handle = ((caracter, index) => {
      this.renderInput(caracter, index);
    }).bind(this);

    words.forEach(handle);
  },
  renderInput(caracter, index) {
    const metaDataIndex = GameControllerService.getMetaDataByIndex(index);
    const input = document.createElement('input');
    input.setAttribute('maxlength', '1');
    input.setAttribute(
      'value',
      metaDataIndex.success || metaDataIndex.error ? caracter : ''
    );
    input.setAttribute(
      'class',
      `input-game-word ${
        metaDataIndex.error
          ? 'input--error'
          : metaDataIndex.success
          ? 'input--success'
          : 'input--empty'
      } `
    );
    input.setAttribute('data-index', index);
    input.setAttribute('disabled', true);

    document.getElementById('game-inputs').appendChild(input);
  },
  subscribeListeners() {
    this.listenerGameUpdate();
    this.listenerLoseGame();
    this.listenerWinGame();
    this.listenerGameFinished();
  },
  listenerGameUpdate() {
    const handle = (() => {
      this.renderInputs();
    }).bind(this);

    document.addEventListener('GAME_UPDATE', handle);
  },

  listenerWinGame() {
    const handle = (() => {
      // this.renderInputs();
    }).bind(this);

    document.addEventListener('GAME_FINISHED_BY_SUCCESS', handle);
  },
  listenerLoseGame() {
    const handle = (() => {
      this.renderInputs();
    }).bind(this);

    document.addEventListener('GAME_FINISHED_BY_ERROR', handle);
  },
  listenerGameFinished() {
    const handle = (() => {
      const inputAttempt = document.getElementById('game-word-input');
      const btnAttempt = document.getElementById('game-word-btn');

      inputAttempt.setAttribute('disabled', true);
      btnAttempt.setAttribute('disabled', true);
    }).bind(this);

    document.addEventListener('GAME_FINISHED_BY_ERROR', handle);
    document.addEventListener('GAME_FINISHED_BY_SUCCESS', handle);
  },
};

GameSection.init();

try {
  module.exports = GameSection;
} catch (error) {}
