
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

function gotoHome() {
  currentPage = PAGES.HOME;

  hide([header, content]);
  reveal([home]);
}

function gotoSinglePlayer() {
  currentPage = PAGES.SINGLEPLAYER;
  currentPageElm.innerText = 'Single Player';

  hide([home, panelMultiplayer, panelSandbox]);
  reveal([header, content, panelSingle]);

}

function gotoMultiplayer() {
  currentPage = PAGES.MULTIPLAYER;
  currentPageElm.innerText = 'Multiplayer';

  hide([home, panelSingle, panelSandbox]);
  reveal([header, content, panelMultiplayer]);

}

function gotoSandbox() {
  currentPage = PAGES.SANDBOX;
  currentPageElm.innerText = 'Sandbox';

  hide([home, panelMultiplayer, panelSingle]);
  reveal([header, content, panelSandbox]);

}
