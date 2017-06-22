
// Globals
const REVIEWSTATE = {
  INACTIVE:   0,
  ONESTAR:    1,
  TWOSTARS:   2,
  THREESTARS: 3,
  FOURSTARS:  4,
  FIVESTARS:  5
}

// const REVIEWCOLOR = {
//   INACTIVE:   'gray',
//   ONESTAR:    'red',
//   TWOSTARS:   'orange',
//   THREESTARS: 'yellow',
//   FOURSTARS:  'lightgreen',
//   FIVESTARS:  'green'
// }

const  svgns = "http://www.w3.org/2000/svg";
const  xlinkns = "http://www.w3.org/1999/xlink";

const  iconInactive = document.createElementNS(svgns, "use");
iconInactive.setAttributeNS(xlinkns, "href", "#review-inactive");

const  iconOneStar = document.createElementNS(svgns, "use");
iconOneStar.setAttributeNS(xlinkns, "href", "#review-onestar");

const  iconTwoStars = document.createElementNS(svgns, "use");
iconTwoStars.setAttributeNS(xlinkns, "href", "#review-twostars");

const  iconThreeStars = document.createElementNS(svgns, "use");
iconThreeStars.setAttributeNS(xlinkns, "href", "#review-threestars");

const  iconFourStars = document.createElementNS(svgns, "use");
iconFourStars.setAttributeNS(xlinkns, "href", "#review-fourstars");

const  iconFiveStars = document.createElementNS(svgns, "use");
iconFiveStars.setAttributeNS(xlinkns, "href", "#review-fivestars");

const symbolsArray = [iconInactive, iconOneStar, iconTwoStars, iconThreeStars, iconFourStars, iconFiveStars];

const REVIEWSYMBOL = {
  INACTIVE:   '<svg width="18px" height="18px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1"><stop stop-color="#D8D9D9" offset="0%"></stop><stop stop-color="#C0C0C0" offset="100%"></stop></linearGradient></defs><g id="Page-1-Copy" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Desktop" transform="translate(-678.000000, -533.000000)"><g id="Stars/components/Single-Star" transform="translate(678.000000, 533.000000)"><g id="Single-Star"><g id="Stars/bg/gray" fill="url(#linearGradient-1)"><rect x="0" y="0" width="48" height="48" rx="5"></rect></g><g id="Stars/icons/star" transform="translate(4.000000, 4.000000)"><g><circle id="bounds" cx="20" cy="20" r="20"></circle><polygon id="star" fill="#FFFFFF" points="19.8402662 1 15.3534437 14.6903652 2 14.6903652 12.8571026 22.760444 9.24860522 36 19.8402662 27.6601257 30.7045119 36 27.0514719 22.760444 37.8402662 14.6903652 24.5084135 14.6903652"></polygon></g></g></g></g></g></g></svg>',

  ONESTAR:    '<svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1"><stop stop-color="#E51E25" offset="0%"></stop><stop stop-color="#B51F24" offset="100%"></stop></linearGradient></defs><g id="Page-1-Copy" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Desktop" transform="translate(-678.000000, -477.000000)"><g id="Stars/components/Single-Star" transform="translate(678.000000, 477.000000)"><g id="Single-Star"><g id="Stars/bg/1-red" fill="url(#linearGradient-1)"><rect x="0" y="0" width="48" height="48" rx="5"></rect></g><g id="Stars/icons/star" transform="translate(4.000000, 4.000000)"><g><circle id="bounds" cx="20" cy="20" r="20"></circle><polygon id="star" fill="#FFFFFF" points="19.8402662 1 15.3534437 14.6903652 2 14.6903652 12.8571026 22.760444 9.24860522 36 19.8402662 27.6601257 30.7045119 36 27.0514719 22.760444 37.8402662 14.6903652 24.5084135 14.6903652"></polygon></g></g></g></g></g></g></svg>',

  TWOSTARS:   '<svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1"><stop stop-color="#F47324" offset="0%"></stop><stop stop-color="#E75E25" offset="100%"></stop></linearGradient></defs><g id="Page-1-Copy" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Desktop" transform="translate(-678.000000, -421.000000)"><g id="Stars/components/Single-Star" transform="translate(678.000000, 421.000000)"><g id="Single-Star"><g id="Stars/bg/2-orange" fill="url(#linearGradient-1)"><rect x="0" y="0" width="48" height="48" rx="5"></rect></g><g id="Stars/icons/star" transform="translate(4.000000, 4.000000)"><g><circle id="bounds" cx="20" cy="20" r="20"></circle><polygon id="star" fill="#FFFFFF" points="19.8402662 1 15.3534437 14.6903652 2 14.6903652 12.8571026 22.760444 9.24860522 36 19.8402662 27.6601257 30.7045119 36 27.0514719 22.760444 37.8402662 14.6903652 24.5084135 14.6903652"></polygon></g></g></g></g></g></g></svg>',

  THREESTARS: '<svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1"><stop stop-color="#FCD116" offset="0%"></stop><stop stop-color="#E4B821" offset="100%"></stop></linearGradient></defs><g id="Page-1-Copy" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Desktop" transform="translate(-678.000000, -365.000000)"><g id="Stars/components/Single-Star" transform="translate(678.000000, 365.000000)"><g id="Single-Star"><g id="Stars/bg/3-yellow" fill="url(#linearGradient-1)"><rect x="0" y="0" width="48" height="48" rx="5"></rect></g><g id="Stars/icons/star" transform="translate(4.000000, 4.000000)"><g><circle id="bounds" cx="20" cy="20" r="20"></circle><polygon id="star" fill="#FFFFFF" points="19.8402662 1 15.3534437 14.6903652 2 14.6903652 12.8571026 22.760444 9.24860522 36 19.8402662 27.6601257 30.7045119 36 27.0514719 22.760444 37.8402662 14.6903652 24.5084135 14.6903652"></polygon></g></g></g></g></g></g></svg>',

  FOURSTARS:  '<svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1"><stop stop-color="#73B343" offset="0%"></stop><stop stop-color="#57843B" offset="100%"></stop></linearGradient></defs><g id="Page-1-Copy" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Desktop" transform="translate(-678.000000, -309.000000)"><g id="Stars/components/Single-Star" transform="translate(678.000000, 309.000000)"><g id="Single-Star"><g id="Stars/bg/4-green" fill="url(#linearGradient-1)"><rect x="0" y="0" width="48" height="48" rx="5"></rect></g><g id="Stars/icons/star" transform="translate(4.000000, 4.000000)"><g><circle id="bounds" cx="20" cy="20" r="20"></circle><polygon id="star" fill="#FFFFFF" points="19.8402662 1 15.3534437 14.6903652 2 14.6903652 12.8571026 22.760444 9.24860522 36 19.8402662 27.6601257 30.7045119 36 27.0514719 22.760444 37.8402662 14.6903652 24.5084135 14.6903652"></polygon></g></g></g></g></g></g></svg>',

  FIVESTARS:  '<svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1"><stop stop-color="#22B24C" offset="0%"></stop><stop stop-color="#0C8140" offset="100%"></stop></linearGradient></defs><g id="Page-1-Copy" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Desktop" transform="translate(-678.000000, -253.000000)"><g id="Stars/components/Single-Star" transform="translate(678.000000, 253.000000)"><g id="Single-Star"><g id="Stars/bg/5-green" fill="url(#linearGradient-1)"><rect x="0" y="0" width="48" height="48" rx="5"></rect></g><g id="Stars/icons/star" transform="translate(4.000000, 4.000000)"><g><circle id="bounds" cx="20" cy="20" r="20"></circle><polygon id="star" fill="#FFFFFF" points="19.8402662 1 15.3534437 14.6903652 2 14.6903652 12.8571026 22.760444 9.24860522 36 19.8402662 27.6601257 30.7045119 36 27.0514719 22.760444 37.8402662 14.6903652 24.5084135 14.6903652"></polygon></g></g></g></g></g></g></svg>'
}

let board = [], boardDivs = [];

// Initialize and set board dimensions
init(50, 50);

function init(boardWidth, boardHeight) {
  // Create the board array
  for (var i = 0; i < boardHeight; i++) {
    let row = [];
    for (var j = 0; j < boardWidth; j++) {
      row.push(0);
    }
    board.push(row);
  }
  // board = new Array(boardHeight);
  // let boardRow = new Array(boardWidth);
  // boardRow.fill(0);
  // board.fill(boardRow); //Fills all rows with the same object, not a copy!

  // Create the container element
  let boardElm = document.createElement('div');
  document.body.append(boardElm);

  // Create the review cells from the array
  // and add them to an elements array, so that they are easier to access
  board.forEach(
    (row, i) => {
      let rowDivs = [];
      let rowElm = document.createElement('div');
      rowElm.setAttribute('class', 'row');
      boardElm.append(rowElm);
      // create cells
      row.forEach((cell, j) => {
        let cellElm = document.createElement('div');
        cellElm.setAttribute('class', 'cell');
        cellElm.setAttribute('data-row', i);
        cellElm.setAttribute('data-cell', j);
        // Append empty SVG
        let emptySVG = document.createElementNS(svgns, "svg");
        cellElm.appendChild(emptySVG);
        //
        rowElm.append(cellElm);
        rowDivs.push(cellElm);
        cellElm.addEventListener('mousedown', handleCellClick);
      })
      boardDivs.push(rowDivs);
    }
  )
  updateBoardDivs(board);
}

function handleCellClick(event) {
  let cell = event.currentTarget;
  let cellPos = {
    x: cell.getAttribute('data-row'),
    y: cell.getAttribute('data-cell')
  }

  console.log(cellPos.x, cellPos.y );

  if (board[cellPos.x][cellPos.y] === REVIEWSTATE.FIVESTARS) {
    board[cellPos.x][cellPos.y] = REVIEWSTATE.INACTIVE;
  } else {
    board[cellPos.x][cellPos.y] += 1;
  }

  let iconSVG = cell.firstChild;
  iconSVG.removeChild(iconSVG.firstChild);
  iconSVG.appendChild(symbolsArray[board[cellPos.x][cellPos.y]]);
}

function updateBoardDivs(board) {
  board.forEach((row, i) => {
    row.forEach((cell, j) => {
      console.log(boardDivs[i][j]);
      let iconSVG = boardDivs[i][j].firstChild;
      if (iconSVG.hasChildNodes()) {
        iconSVG.removeChild(iconSVG.firstChild);
      }
  
      switch (cell) {
        case REVIEWSTATE.INACTIVE:
          // boardDivs[i][j].style.backgroundColor = REVIEWCOLOR.INACTIVE;
          // boardDivs[i][j].innerHTML = REVIEWSYMBOL.INACTIVE;
          iconSVG.appendChild(symbolsArray[REVIEWSTATE.INACTIVE]);
          break;
        case REVIEWSTATE.ONESTAR:
          // boardDivs[i][j].style.backgroundColor = REVIEWCOLOR.ONESTAR;
          // boardDivs[i][j].innerHTML = REVIEWSYMBOL.ONESTAR;
          iconSVG.appendChild(symbolsArray[REVIEWSTATE.ONESTAR]);
          break;
        case REVIEWSTATE.TWOSTARS:
          // boardDivs[i][j].style.backgroundColor = REVIEWCOLOR.TWOSTARS;
          // boardDivs[i][j].innerHTML = REVIEWSYMBOL.TWOSTARS;
          iconSVG.appendChild(symbolsArray[REVIEWSTATE.TWOSTARS]);
          break;
        case REVIEWSTATE.THREESTARS:
          // boardDivs[i][j].style.backgroundColor = REVIEWCOLOR.THREESTARS;
          // boardDivs[i][j].innerHTML = REVIEWSYMBOL.THREESTARS;
          iconSVG.appendChild(symbolsArray[REVIEWSTATE.THREESTARS]);
          break;
        case REVIEWSTATE.FOURSTARS:
          // boardDivs[i][j].style.backgroundColor = REVIEWCOLOR.FOURSTARS;
          // boardDivs[i][j].innerHTML = REVIEWSYMBOL.FOURSTARS;
          iconSVG.appendChild(symbolsArray[REVIEWSTATE.FOURSTARS]);
          break;
        case REVIEWSTATE.FIVESTARS:
          // boardDivs[i][j].style.backgroundColor = REVIEWCOLOR.FIVESTARS;
          // boardDivs[i][j].innerHTML = REVIEWSYMBOL.FIVESTARS;
          iconSVG.appendChild(symbolsArray[REVIEWSTATE.FIVESTARS]);
          break;
      }
    })
  })
}

function startGame(turns) {
  let counter = 0;
  let nextBoard;

  let intervalID = window.setInterval(() => {
    if (counter > turns) {
      window.clearInterval(intervalID);
      getResults();
    }
    else {
      console.log('turn:', counter);
      board = nextGeneration(board);
      // Update the board
      updateBoardDivs(board);
      counter++;
    }
  }, 500);
}

function nextGeneration(board) {
  let nextBoard = board.map((row, i) => {
    return row.map((cellState, j) => {
      return getNewState(cellState, i, j);
    })
  });

  //
  return nextBoard;
}

function getNewState(currentState, cellRow, cellCol) {
  let newCellState;
  let neighborCounter = {
    inactive:   0,
    onestar:    0,
    twostars:   0,
    threestars: 0,
    fourstars:  0,
    fivestars:  0
  }
  // Count the neighbors in each state
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let neighborValue;
      if (typeof (board[cellRow + i]) === 'undefined' ||
          typeof (board[cellRow + i][cellCol + j]) === 'undefined') {
        // Cells outside the board are inactive (no wrapping)
        neighborValue = REVIEWSTATE.INACTIVE;
      }
      else if (i === 0 && j === 0) {
        neighborValue = -1; // skip the cell itself
      }
      else {
        neighborValue = board[cellRow + i][cellCol + j];
      }
      switch (neighborValue) {
        case -1:
        break;
        case REVIEWSTATE.INACTIVE:
        neighborCounter.inactive++;
        break;
        case REVIEWSTATE.ONESTAR:
        neighborCounter.onestar++;
        break;
        case REVIEWSTATE.TWOSTARS:
        neighborCounter.twostars++;
        break;
        case REVIEWSTATE.THREESTARS:
        neighborCounter.threestars++;
        break;
        case REVIEWSTATE.FOURSTARS:
        neighborCounter.fourstars++;
        break;
        case REVIEWSTATE.FIVESTARS:
        neighborCounter.fivestars++;
        break;
      }
    }
  }
  // Calculate the new state according to the rules of the game

  if (currentState === REVIEWSTATE.INACTIVE) {

    if (neighborCounter.inactive === 5) {
      console.log('inactive cell with 3 neighbors');
      Object.keys(neighborCounter).forEach((c) => {
        console.log('keys', c);
      })
      newCellState = REVIEWSTATE.FIVESTARS;
    } else {
      console.log('inactive cell with more or less than 3 neighbors');
      newCellState = REVIEWSTATE.INACTIVE;
    }

  } else {

    if (neighborCounter.inactive > 6) {
      console.log('review cell with less than 2 neighbors');
      newCellState = REVIEWSTATE.INACTIVE;
    }
    else if (neighborCounter.inactive === 5 || neighborCounter.inactive === 6) {
      console.log('review cell with 2 or 3 neighbors');
      newCellState = currentState;
    }
    else if (neighborCounter.inactive < 5) {
      console.log('review cell with more than 3 neighbors');
      newCellState = --currentState;
    }
    else {
      console.warn('this should not happen');
    }
  }
  return newCellState;
}

function getResults() {
  console.log('results!');
}
