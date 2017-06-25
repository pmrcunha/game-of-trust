
// Globals
const REVIEWSTATE = {
  INACTIVE:   0,
  ONESTAR:    1,
  TWOSTARS:   2,
  THREESTARS: 3,
  FOURSTARS:  4,
  FIVESTARS:  5
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

let board = [], boardDivs = [];

// Initialize and set board dimensions
init(30, 30);

function init(boardWidth, boardHeight) {
  // Create the board array
  for (var i = 0; i < boardHeight; i++) {
    let row = [];
    for (var j = 0; j < boardWidth; j++) {
      row.push(0);
    }
    board.push(row);
  }

  // Create the container element
  // let boardElm = document.createElement('div');
  // document.body.append(boardElm);

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
  // updateBoardDivs(board);
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

function startGame(turns) {
  let counterElm = document.getElementById('turn-counter');

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
      counterElm.innerText = counter;
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
