
// Globals
const REVIEWSTATE = {
  INACTIVE:   0,
  ONESTAR:    1,
  TWOSTARS:   2,
  THREESTARS: 3,
  FOURSTARS:  4,
  FIVESTARS:  5
}

const REVIEWCOLOR = {
  INACTIVE:   'gray',
  ONESTAR:    'red',
  TWOSTARS:   'orange',
  THREESTARS: 'yellow',
  FOURSTARS:  'lightgreen',
  FIVESTARS:  'green'
}

let board = [], boardDivs = [];

// Initialize and set board dimensions
init(10, 10);

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
  let cell = event.target;
  let cellPos = {
    x: cell.getAttribute('data-row'),
    y: cell.getAttribute('data-cell')
  }
  let cellColor = cell.style.backgroundColor;
  console.log(cellPos.x, cellPos.y );

  switch (cellColor) {
    case REVIEWCOLOR.INACTIVE:
      cell.style.backgroundColor = REVIEWCOLOR.ONESTAR;
      board[cellPos.x][cellPos.y] = REVIEWSTATE.ONESTAR;
      break;
    case REVIEWCOLOR.ONESTAR:
      cell.style.backgroundColor = REVIEWCOLOR.TWOSTARS;
      board[cellPos.x][cellPos.y] = REVIEWSTATE.TWOSTARS;
      break;
    case REVIEWCOLOR.TWOSTARS:
      cell.style.backgroundColor = REVIEWCOLOR.THREESTARS;
      board[cellPos.x][cellPos.y] = REVIEWSTATE.THREESTARS;
      break;
    case REVIEWCOLOR.THREESTARS:
      cell.style.backgroundColor = REVIEWCOLOR.FOURSTARS;
      board[cellPos.x][cellPos.y] = REVIEWSTATE.FOURSTARS;
      break;
    case REVIEWCOLOR.FOURSTARS:
      cell.style.backgroundColor = REVIEWCOLOR.FIVESTARS;
      board[cellPos.x][cellPos.y] = REVIEWSTATE.FIVESTARS;
      break;
    default:
      cell.style.backgroundColor = REVIEWCOLOR.INACTIVE;
      board[cellPos.x][cellPos.y] = REVIEWSTATE.INACTIVE;
  }
}

function updateBoardDivs(board) {
  board.forEach((row, i) => {
    row.forEach((cell, j) => {
      switch (cell) {
        case REVIEWSTATE.INACTIVE:
          boardDivs[i][j].style.backgroundColor = 'gray';
          break;
        case REVIEWSTATE.ONESTAR:
          boardDivs[i][j].style.backgroundColor = 'red';
          break;
        case REVIEWSTATE.TWOSTARS:
          boardDivs[i][j].style.backgroundColor = 'orange';
          break;
        case REVIEWSTATE.THREESTARS:
          boardDivs[i][j].style.backgroundColor = 'yellow';
          break;
        case REVIEWSTATE.FOURSTARS:
          boardDivs[i][j].style.backgroundColor = 'lightgreen';
          break;
        case REVIEWSTATE.FIVESTARS:
          boardDivs[i][j].style.backgroundColor = 'green';
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
      nextBoard = nextGeneration(board);
      // Update the board
      updateBoardDivs(nextBoard);
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
  console.log(neighborCounter);
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
  console.log(neighborCounter);
  // Less than 2 neighbors = becomes inactive
  if (neighborCounter.inactive > 6) {
    newCellState = REVIEWSTATE.INACTIVE;
  }

  // Has exactly 2 or 3 neighbors = stays the same
  else if (5 <= neighborCounter.inactive <= 6) {
    newCellState = currentState;
  }
  // Has more than 3 neighbors = decays one state
  else if (neighborCounter.inactive < 5) {
    newCellState = currentState--;
  }
  // Has 3 neighbors and is inactive = highest value of the neighbors or one above if they are the same
  else if (currentState === REVIEWSTATE.INACTIVE && neighborCounter === 5) {
    Object.keys(neighborCounter).forEach((c) => {
      console.log('keys', c);
    })
    newCellState = 5;
  }
  else {
    throw('somethings wrong');
  }
  return newCellState;
}

function getResults() {
  console.log('results!');
}
