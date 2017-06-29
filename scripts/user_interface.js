//UI

const PAGES = {
  HOME: 0,
  SINGLEPLAYER: 1,
  MULTIPLAYER: 2,
  SANDBOX: 3
}

// DOM Elements
const home = document.getElementById('home');
const singlePlayer = document.getElementById('single-player');
const multiplayer = document.getElementById('multiplayer');
const sandbox = document.getElementById('sandbox');

const header = document.getElementById('header');
const content = document.getElementById('content');
const currentPageElm = document.getElementById('current-page');

const panelSingle = document.getElementById('panel-single');
const panelMultiplayer = document.getElementById('panel-multiplayer');
const panelSandbox = document.getElementById('panel-sandbox');
const panelResults = document.getElementById('panel-results');

const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const continueButton = document.getElementById('continue-button');
const startOverButton = document.getElementById('start-over-button');
const resetButton = document.getElementById('reset-button');
const readyButtonPlayer1 = document.getElementById('player1-ready');
const readyButtonPlayer2 = document.getElementById('player2-ready');




class UserInterface {
  constructor() {
    this.currentPage = PAGES.HOME;
  }

  gotoHome() {
    this.currentPage = PAGES.HOME;
    UserInterface.gotoPage(PAGES.HOME);
  }

  gotoSinglePlayer() {
    game.resetGame();
    this.enableStart();
    this.currentPage = PAGES.SINGLEPLAYER;
    currentPageElm.innerText = 'Single Player';
    UserInterface.gotoPage(PAGES.SINGLEPLAYER);
  }

  gotoMultiplayer() {
    game.resetGame();
    this.enablePlayer1();
    this.currentPage = PAGES.MULTIPLAYER;
    currentPageElm.innerText = 'Multiplayer';
    UserInterface.gotoPage(PAGES.MULTIPLAYER);
  }

  gotoSandbox() {
    game.resetGame();
    this.enableStart();
    this.currentPage = PAGES.SANDBOX;
    currentPageElm.innerText = 'Sandbox';
    UserInterface.gotoPage(PAGES.SANDBOX);
  }

  showStartButton() {
    UserInterface.hide([stopButton, continueButton, startOverButton]);
    UserInterface.reveal([startButton]);
    UserInterface.enable([resetButton]);
  }

  showStopButton() {
    UserInterface.hide([startButton, continueButton, startOverButton]);
    UserInterface.reveal([stopButton]);
    UserInterface.disable([resetButton]);
  }

  showContinueButtons() {
    UserInterface.hide([stopButton]);
    UserInterface.reveal([continueButton, startOverButton]);
    UserInterface.enable([resetButton]);
  }

  enablePlayer1() {
    UserInterface.disable([startButton, readyButtonPlayer2]);
    UserInterface.enable([readyButtonPlayer1]);
  }

  enablePlayer2() {
    UserInterface.disable([startButton, readyButtonPlayer1]);
    UserInterface.enable([readyButtonPlayer2]);
  }

  enableStart() {
    UserInterface.disable([readyButtonPlayer1, readyButtonPlayer2]);
    UserInterface.enable([startButton]);
  }

  showResults() {
    UserInterface.hide([panelSingle, panelMultiplayer]);
    UserInterface.reveal([panelResults]);
  }

  showPanel() {
    UserInterface.hide([panelResults, panelSingle, panelMultiplayer, panelSandbox]);
    switch (this.currentPage) {
      case PAGES.SINGLEPLAYER:
        UserInterface.reveal([panelSingle]);
        break;
      case PAGES.MULTIPLAYER:
        UserInterface.reveal([panelMultiplayer]);
        break;
      case PAGES.SANDBOX:
        UserInterface.reveal([panelSandbox]);
        break;
    }
  }

  static gotoPage(page) {
    switch (page) {
      case PAGES.HOME:
        this.hide([header, content]);
        this.reveal([home]);
        break;
      case PAGES.SINGLEPLAYER:
        this.hide([home, panelMultiplayer, panelSandbox]);
        this.reveal([header, content, panelSingle]);
        break;
      case PAGES.MULTIPLAYER:
        this.hide([home, panelSingle, panelSandbox]);
        this.reveal([header, content, panelMultiplayer]);
        break;
      case PAGES.SANDBOX:
        this.hide([home, panelMultiplayer, panelSingle]);
        this.reveal([header, content, panelSandbox]);
        break;
    }
  }

  static reveal(elements) {
    elements.forEach((el) => {
      el.style.display = '';
    })
  }

  static hide(elements) {
    elements.forEach((el) => {
      el.style.display = 'none';
    })
  }

  static disable(elements) {
    elements.forEach((el) => {
      el.setAttribute('disabled', '');
    })
  }

  static enable(elements) {
    elements.forEach((el) => {
      el.removeAttribute('disabled');
    })
  }
}
