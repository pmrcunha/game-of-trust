
// Globals
const REVIEWSTATE = {
  INACTIVE:   0,
  ONESTAR:    1,
  TWOSTARS:   2,
  THREESTARS: 3,
  FOURSTARS:  4,
  FIVESTARS:  5
}

const RULES = {
  TPSINGLE: 0,
  TPMULTI:  1,
  CONWAY:   2,
  functions: {
    0: trustpilotSingleRules,
    1: trustpilotMultiRules,
    2: conwaysRules
  }
}

const  svgns = "http://www.w3.org/2000/svg";
const  xlinkns = "http://www.w3.org/1999/xlink";

const symbolsArray = [
  (use) => {use.setAttributeNS(xlinkns, "href", "#review-inactive");},
  (use) => {use.setAttributeNS(xlinkns, "href", "#review-onestar");},
  (use) => {use.setAttributeNS(xlinkns, "href", "#review-twostars");},
  (use) => {use.setAttributeNS(xlinkns, "href", "#review-threestars");},
  (use) => {use.setAttributeNS(xlinkns, "href", "#review-fourstars");},
  (use) => {use.setAttributeNS(xlinkns, "href", "#review-fivestars");}
];

let currentPlayer,
    board = [],
    boardDivs = [];

const singleStarsLeftElm = document.getElementById('single-stars-left');
const singleStarsUsedElm = document.getElementById('single-stars-used');

const p1StarsLeftElm = document.getElementById('p1-stars-left');
const p1StarsUsedElm = document.getElementById('p1-stars-used');

const p2StarsLeftElm = document.getElementById('p2-stars-left');
const p2StarsUsedElm = document.getElementById('p2-stars-used');

const availableStars = 25;
const availableStarsMultiplayer = 12;
let placedStars = 0;

// Initialize and set board dimensions
init(30, 30);

function createBoardArray(boardWidth, boardHeight) {
  let board = [];
  for (var i = 0; i < boardHeight; i++) {
    let row = [];
    for (var j = 0; j < boardWidth; j++) {
      row.push(0);
    }
    board.push(row);
  }
  return board;
}

function init(boardWidth, boardHeight) {
  // Create the board array
  board = createBoardArray(boardWidth, boardHeight);

  // Get the container element
  let boardElm = document.getElementById('board');

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
        emptySVG.setAttribute('xmlns', svgns);
        emptySVG.setAttribute('xmlns:xlink', xlinkns);
        emptySVG.setAttribute('width', '18px');
        emptySVG.setAttribute('height', '18px');
        emptySVG.setAttribute('viewBox', '0 0 48 48');
        // Append inactive icon to every cell
        let svguse = document.createElementNS(svgns, "use");
        svguse.setAttributeNS(xlinkns, "href", "#review-inactive");
        emptySVG.appendChild(svguse);

        cellElm.appendChild(emptySVG);
        //
        rowElm.append(cellElm);
        rowDivs.push(cellElm);
        cellElm.addEventListener('mousedown', handleCellClick);
      })
      boardDivs.push(rowDivs);
    }
  )
  currentPlayer = 1;
}

function getRules() {
  const dropdownRules = document.getElementById('dropdown-rules');

  switch (currentPage) {
    case PAGES.SINGLEPLAYER:
      return RULES.TPSINGLE;
    case PAGES.MULTIPLAYER:
      return RULES.TPMULTI;
    case PAGES.SANDBOX:
      return Number(dropdownRules.value);
    default:
      return RULES.TPSINGLE;
  }
}

function playerReady() {
  console.log('player ready');
  placedStars = 0;
  if (currentPlayer === 1) {
    currentPlayer = 2;
    enablePlayer2();
  } else if (currentPlayer === 2) {
    currentPlayer = 0;
    enableStart();
  } else {
    currentPlayer = 1;
    enablePlayer1();
  }
}

function handleCellClick(event) {
  let cell = event.currentTarget;
  let cellPos = {
    x: cell.getAttribute('data-row'),
    y: cell.getAttribute('data-cell')
  }

  switch (getRules()) {

    case RULES.TPSINGLE:
      console.log('tpsingle');
      if (
        placedStars > availableStars ||
        board[cellPos.x][cellPos.y] === REVIEWSTATE.FIVESTARS
      ) {
        placedStars -= board[cellPos.x][cellPos.y];
        board[cellPos.x][cellPos.y] = REVIEWSTATE.INACTIVE;
      } else {
        placedStars++;
        board[cellPos.x][cellPos.y]++;
      }

      singleStarsLeftElm.innerText = availableStars - placedStars;
      singleStarsUsedElm.innerText = placedStars;
      break;

    case RULES.TPMULTI:
      console.log('tpmulti');

      if (currentPlayer === 1) {
        if (board[cellPos.x][cellPos.y] === REVIEWSTATE.FIVESTARS) {
          --placedStars;
          board[cellPos.x][cellPos.y] = REVIEWSTATE.INACTIVE;
        } else if (board[cellPos.x][cellPos.y] === REVIEWSTATE.INACTIVE && placedStars < availableStarsMultiplayer) {
          ++placedStars;
          board[cellPos.x][cellPos.y] = REVIEWSTATE.FIVESTARS;
        }

        p1StarsLeftElm.innerText = availableStarsMultiplayer - placedStars;
        p1StarsUsedElm.innerText = placedStars;
      } else if (currentPlayer === 2) {
        if (board[cellPos.x][cellPos.y] === REVIEWSTATE.ONESTAR) {
          --placedStars;
          board[cellPos.x][cellPos.y] = REVIEWSTATE.INACTIVE;
        } else if (board[cellPos.x][cellPos.y] === REVIEWSTATE.INACTIVE && placedStars < availableStarsMultiplayer) {
          ++placedStars;
          board[cellPos.x][cellPos.y] = REVIEWSTATE.ONESTAR;
        }

        p2StarsLeftElm.innerText = availableStarsMultiplayer - placedStars;
        p2StarsUsedElm.innerText = placedStars;
      } else {
        console.warn('currentPlayer incorrectly set or both have played');
      }
     break;

    case RULES.CONWAY:
      console.log('conway');
      if (board[cellPos.x][cellPos.y] === REVIEWSTATE.FIVESTARS) {
        board[cellPos.x][cellPos.y] = REVIEWSTATE.INACTIVE;
      } else {
        board[cellPos.x][cellPos.y] = REVIEWSTATE.FIVESTARS;
      }
      break;
  }



  let iconUseSVG = cell.firstChild.firstChild;
  symbolsArray[board[cellPos.x][cellPos.y]](iconUseSVG);
}

function updateBoardDivs(board) {

  board.forEach((row, i) => {
    row.forEach((cell, j) => {
      let iconUseSVG = boardDivs[i][j].firstChild.firstChild;

      switch (cell) {
        case REVIEWSTATE.INACTIVE:
          symbolsArray[REVIEWSTATE.INACTIVE](iconUseSVG);
          break;
        case REVIEWSTATE.ONESTAR:
          symbolsArray[REVIEWSTATE.ONESTAR](iconUseSVG);
          break;
        case REVIEWSTATE.TWOSTARS:
          symbolsArray[REVIEWSTATE.TWOSTARS](iconUseSVG);
          break;
        case REVIEWSTATE.THREESTARS:
          symbolsArray[REVIEWSTATE.THREESTARS](iconUseSVG);
          break;
        case REVIEWSTATE.FOURSTARS:
          symbolsArray[REVIEWSTATE.FOURSTARS](iconUseSVG);
          break;
        case REVIEWSTATE.FIVESTARS:
          symbolsArray[REVIEWSTATE.FIVESTARS](iconUseSVG);
          break;
      }
    })
  })
}

let counter = 0;
let intervalID;
let isGameStopped;
const counterElm = document.getElementById('turn-counter');
let turns;

const inputTurns = document.getElementById('nr-turns');
const inputTurnsMulti = document.getElementById('nr-turns-multi');



function startGame() {
  // Get number of turns
  switch (currentPage) {
    case PAGES.SINGLEPLAYER:
      turns = Number(inputTurns.value);
      break;
    case PAGES.MULTIPLAYER:
      turns = Number(inputTurnsMulti.value);
      break;
    default:
      turns = null;
  }
  //
  runGame(turns, RULES.functions[getRules()]);
}

function runGame(turns, rules) {
  rules = rules || trustpilotSingleRules;
  turns = turns || null; //Allow for a continuous game
  if (turns) {
    turns += counter //increment turns if we are continuing a game
  }

  isGameStopped = false;
  let nextBoard;

  intervalID = window.setInterval(() => {

    if (turns && counter >= turns || isGameStopped) {
      window.clearInterval(intervalID);
      getResults();
      showContinueButtons();
    }
    else {
      counter++;
      board = nextGeneration(board, rules);
      // Update the board
      updateBoardDivs(board);
      counterElm.innerText = counter;
    }
  }, 500);

  showStopButton();
}

function stopGame() {
  turns = turns || null;
  if (turns) {
    inputTurns.value = turns - counter;
    inputTurnsMulti.value = turns - counter;
  }

  isGameStopped = true;
  showContinueButtons();
}

function resetGame() {
  counter = 0;
  isGameStopped = false;
  board = createBoardArray(30, 30);
  currentPlayer = 0;
  playerReady();
  // Reset UI
  updateBoardDivs(board);
  counterElm.innerText = counter;
  inputTurns.value = 50;
  inputTurnsMulti.value = 50;
  showStartButton();
}

function nextGeneration(board, rules) {
  let nextBoard = board.map((row, i) => {
    return row.map((cellState, j) => {
      return getNewState(cellState, i, j, rules);
    })
  });

  //
  return nextBoard;
}

function getNewState(currentState, cellRow, cellCol, rules) {
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
  return rules(currentState, neighborCounter);
}

function conwaysRules(currentState, neighborCounter) {
  let newCellState;
  if (currentState === REVIEWSTATE.INACTIVE) {

    if (neighborCounter.inactive === 5) {
      // console.log('inactive cell with 3 neighbors');
      newCellState = REVIEWSTATE.FIVESTARS;
    } else {
      // console.log('inactive cell with more or less than 3 neighbors');
      newCellState = REVIEWSTATE.INACTIVE;
    }

  } else {

    if (neighborCounter.inactive > 6) {
      // console.log('review cell with less than 2 neighbors');
      newCellState = REVIEWSTATE.INACTIVE;
    }
    else if (neighborCounter.inactive === 5 || neighborCounter.inactive === 6) {
      // console.log('review cell with 2 or 3 neighbors');
      newCellState = REVIEWSTATE.FIVESTARS;
    }
    else if (neighborCounter.inactive < 5) {
      // console.log('review cell with more than 3 neighbors');
      newCellState = REVIEWSTATE.INACTIVE;
    }
    else {
      console.warn('this should not happen');
    }
  }
  return newCellState;
}

function trustpilotMultiRules(currentState, neighborCounter) {
  let newCellState;
  if (currentState === REVIEWSTATE.INACTIVE) {

    if (neighborCounter.inactive === 5) {
      // console.log('inactive cell with 3 neighbors');

      if (neighborCounter.onestar >= 2) {
        newCellState = REVIEWSTATE.ONESTAR;
      } else {
        newCellState = REVIEWSTATE.FIVESTARS;
      }

    } else {
      // console.log('inactive cell with more or less than 3 neighbors');
      newCellState = REVIEWSTATE.INACTIVE;
    }

  } else {

    if (neighborCounter.inactive > 6) {
      // console.log('review cell with less than 2 neighbors');
      newCellState = REVIEWSTATE.INACTIVE;
    }
    else if (neighborCounter.inactive === 5 || neighborCounter.inactive === 6) {
      // console.log('review cell with 2 or 3 neighbors');
      newCellState = currentState;
    }
    else if (neighborCounter.inactive < 5) {
      // console.log('review cell with more than 3 neighbors');
      newCellState = REVIEWSTATE.INACTIVE;
    }
    else {
      console.warn('this should not happen');
    }
  }
  return newCellState;
}

function trustpilotSingleRules(currentState, neighborCounter) {
  let newCellState;
  if (currentState === REVIEWSTATE.INACTIVE) {

    if (neighborCounter.inactive === 5) {
      // console.log('inactive cell with 3 neighbors');

      let counters = [];
      Object.keys(neighborCounter).forEach((key, index) => {
        if (key === 'inactive') {
          return;
        } else {
          counters.push(neighborCounter[key]);
        }
      });

      let maxCounter = Math.max.apply(null, counters); //get the highest count
      let maxReview = counters.indexOf(maxCounter) + 1; //get the state with the highest count, adjusted since we dont push inactive cells
      if (maxReview === REVIEWSTATE.FIVESTARS) {
        newCellState = maxReview;
      } else {
        newCellState = maxReview + 1; // the new cell is born one level above the highest neighbor
      }

    } else {
      // console.log('inactive cell with more or less than 3 neighbors');
      newCellState = REVIEWSTATE.INACTIVE;
    }

  } else {

    if (neighborCounter.inactive > 6) {
      // console.log('review cell with less than 2 neighbors');
      newCellState = REVIEWSTATE.INACTIVE;
    }
    else if (neighborCounter.inactive === 5 || neighborCounter.inactive === 6) {
      // console.log('review cell with 2 or 3 neighbors');
      newCellState = currentState;
    }
    else if (neighborCounter.inactive < 5) {
      // console.log('review cell with more than 3 neighbors');
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
