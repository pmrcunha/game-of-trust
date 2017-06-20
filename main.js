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

// Set board dimensions
const boardWidth =  50;
const boardHeight = 50;

// Create the board array
let board = new Array(boardHeight);
let boardRow = new Array(boardWidth);
boardRow.fill(0);
board.fill(boardRow);

console.log(board);

// Create the container element
let boardElm = document.createElement('div');
document.body.append(boardElm);

// Create the review cells from the array
// and add them to an elements array, so that they are easier to access
boardDivs = [];
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

updateBoardDivs();

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
      console.log(board[cellPos.x]);
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
  console.log(board);
}

function updateBoardDivs() {
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
