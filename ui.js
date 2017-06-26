
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

const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const continueButton = document.getElementById('continue-button');
const startOverButton = document.getElementById('start-over-button');
const readyButtonPlayer1 = document.getElementById('player1-ready');
const readyButtonPlayer2 = document.getElementById('player2-ready');

const PAGES = {
  HOME: 0,
  SINGLEPLAYER: 1,
  MULTIPLAYER: 2,
  SANDBOX: 3
}
let currentPage;

function reveal(elements) {
  elements.forEach((el) => {
    el.style.display = '';
  })
}

function hide(elements) {
  elements.forEach((el) => {
    el.style.display = 'none';
  })
}

function disable(elements) {
  elements.forEach((el) => {
    el.setAttribute('disabled', '');
  })
}

function enable(elements) {
  elements.forEach((el) => {
    el.removeAttribute('disabled');
  })
}

function gotoPage(page) {
  switch (page) {
    case PAGES.HOME:
      hide([header, content]);
      reveal([home]);
      break;
    case PAGES.SINGLEPLAYER:
      hide([home, panelMultiplayer, panelSandbox]);
      reveal([header, content, panelSingle]);
      break;
    case PAGES.MULTIPLAYER:
      hide([home, panelSingle, panelSandbox]);
      reveal([header, content, panelMultiplayer]);
      break;
    case PAGES.SANDBOX:
      hide([home, panelMultiplayer, panelSingle]);
      reveal([header, content, panelSandbox]);
      break;
  }
}

function gotoHome() {
  currentPage = PAGES.HOME;
  gotoPage(PAGES.HOME);
}

function gotoSinglePlayer() {
  resetGame();
  enableStart();
  currentPage = PAGES.SINGLEPLAYER;
  currentPageElm.innerText = 'Single Player';
  gotoPage(PAGES.SINGLEPLAYER);
}

function gotoMultiplayer() {
  resetGame();
  enablePlayer1();
  currentPage = PAGES.MULTIPLAYER;
  currentPageElm.innerText = 'Multiplayer';
  gotoPage(PAGES.MULTIPLAYER);
}

function gotoSandbox() {
  resetGame();
  enableStart();
  currentPage = PAGES.SANDBOX;
  currentPageElm.innerText = 'Sandbox';
  gotoPage(PAGES.SANDBOX);
}

function showStartButton() {
  hide([stopButton, continueButton, startOverButton]);
  reveal([startButton]);
}

function showStopButton() {
  hide([startButton, continueButton, startOverButton]);
  reveal([stopButton]);
}

function showContinueButtons() {
  hide([stopButton]);
  reveal([continueButton, startOverButton]);
}

function enablePlayer1() {
  disable([startButton, readyButtonPlayer2]);
  enable([readyButtonPlayer1]);
}

function enablePlayer2() {
  disable([startButton, readyButtonPlayer1]);
  enable([readyButtonPlayer2]);
}

function enableStart() {
  disable([readyButtonPlayer1, readyButtonPlayer2]);
  enable([startButton]);
}
