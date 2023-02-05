const GameControllerService = {
  wordKey: 'GAME_WORD',
  attemptsKey: 'GAME_ATTEMPTS',
  errorsKey: 'GAME_ERROS',
  statusKey: 'GAME_STATUS',
  metaDataKey: 'GAME_META_DATA',
  gameStatus: {
    GAME_STARTED: 'GAME_STARTED',
    GAME_FINISHED: 'GAME_FINISHED',
  },
  init() {
    this.subscribeListeners();
  },
  setStatus(status) {
    sessionStorage.setItem(this.statusKey, this.gameStatus[status]);
  },
  getStatus() {
    return sessionStorage.getItem(this.statusKey);
  },
  getWord() {
    return sessionStorage.getItem(this.wordKey);
  },
  setWord(word) {
    sessionStorage.setItem(this.wordKey, word);
  },
  getMetaDataByIndex(index) {
    const metaDataKey = `${ this.metaDataKey }_${ index }`;
    return JSON.parse(sessionStorage.getItem(metaDataKey));
  },
  updateMetaData(index, updatedMetaData) {
    const metaData = this.getMetaDataByIndex(index);

    sessionStorage.setItem(
      `${ this.metaDataKey }_${ metaData.index }`,
      JSON.stringify({ ...metaData, ...updatedMetaData })
    );
  },
  setMetaData(word) {
    [...word]
      .map((caracter, index) => ({
        index,
        value: caracter,
        success: false,
        error: false,
      }))
      .forEach((metaData) =>
        sessionStorage.setItem(
          `${ this.metaDataKey }_${ metaData.index }`,
          JSON.stringify(metaData)
        )
      );
  },
  /**
   *
   * @returns { {success: boolean, value: string, index: number}}
   */
  getAttempts() {
    return JSON.parse(sessionStorage.getItem(this.attemptsKey) || '[]');
  },
  emitUpdateAttempts() {
    const event = new Event('GAME_UPDATE_ATTEMPTS');
    document.dispatchEvent(event);
  },
  /**
   *
   * @param {{success: boolean, value: string}} attempt
   */
  setAttempt(attempt) {
    const attempts = this.getAttempts();
    attempts.push(attempt);
    sessionStorage.setItem(this.attemptsKey, JSON.stringify(attempts));
    this.emitUpdateAttempts();
  },
  setErro(caracter) {
    const attempts = this.getErrors();
    attempts.push(caracter);
    sessionStorage.setItem(this.errorsKey, JSON.stringify(attempts));
  },
  getErrors() {
    return JSON.parse(sessionStorage.getItem(this.errorsKey) || '[]');
  },
  hasTried(caracter) {
    const attempts = this.getAttempts();

    return attempts.find(
      (attempt) => attempt.value.toUpperCase() === caracter.toUpperCase()
    );
  },
  hasErrosOutOfRange() {
    const MAX_WRONG_ATTEMPTS = 4;
    return this.getErrors().length >= MAX_WRONG_ATTEMPTS;
  },
  finishGameByErrors() {
    [...this.getWord()].forEach((caracter, index) =>
      this.updateMetaData(index, { error: true })
    );
  },
  hasFinishedGameBySuccess() {
    [...this.getWord()]
      .map((caracter, index) => this.getMetaDataByIndex(index))
      .every((metaData) => metaData.success);
  },
  getAppearences(caracter) {
    const regex = new RegExp(`${ caracter }`, 'g');
    return [...this.getWord().matchAll(regex)];
  },
  updateSucessAttempt(appearences) {
    appearences.forEach((appearence) => {
      this.updateMetaData(appearence.index, { success: true });
      this.setAttempt(this.generateAttempt(appearence[0], true));
    });
  },
  /**
   *
   * @param {string} value
   * @param {boolean} success
   * @returns {{success: boolean, value: string}}
   */
  generateAttempt(value, success) {
    return {
      value,
      success,
    };
  },
  subscribeListeners() {
    this.listenerGameStart();
    this.listenerGameRestart();
  },
  listenerGameStart() {
    const handle = ((e) => {
      const { word } = e.detail;
      this.setWord(word);
      this.setMetaData(word);
      this.setStatus(this.gameStatus.GAME_STARTED);
    }).bind(this);

    document.addEventListener('GAME_START', handle);
  },
  listenerGameRestart() {
    const handle = (() => {
      sessionStorage.clear();
    }).bind(this);

    document.addEventListener('GAME_RESTART', handle);
  },
  emitUpdateMetaData() {
    const event = new Event('GAME_UPDATE');
    document.dispatchEvent(event);
  },
  emitFinishedGameBySuccess() {
    this.setStatus(this.gameStatus.GAME_FINISHED);
    const event = new Event('GAME_FINISHED_BY_SUCCESS');
    document.dispatchEvent(event);
  },
  emitFinishedGameByError() {
    this.finishGameByErrors();
    this.setStatus(this.gameStatus.GAME_FINISHED);
    const event = new Event('GAME_FINISHED_BY_ERROR');
    document.dispatchEvent(event);
  },
  isValidAttempt(caracter) {
    return (
      !!caracter &&
      !this.hasTried(caracter) &&
      !this.hasErrosOutOfRange() &&
      this.getStatus() !== this.gameStatus.GAME_FINISHED
    );
  },
  checkAttempt(caracter) {
    const appearences = this.getAppearences(caracter);

    if (!appearences.length) {
      this.setErro(caracter);
      this.setAttempt(this.generateAttempt(caracter, false));

      if (this.hasErrosOutOfRange()) {
        this.emitFinishedGameByError();
        return;
      }
      return;
    }

    this.updateSucessAttempt(appearences);

    if (this.hasFinishedGameBySuccess()) {
      this.emitFinishedGameBySuccess();
      return;
    }

    this.emitUpdateMetaData();
  },
  test(caracter) {
    if (!this.isValidAttempt(caracter)) {
      return;
    }

    this.checkAttempt(caracter);
  },
};

GameControllerService.init();

try {
  module.exports = GameControllerService;
} catch (error) {}
