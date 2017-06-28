
// Enums
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

const PAGES = {
  HOME: 0,
  SINGLEPLAYER: 1,
  MULTIPLAYER: 2,
  SANDBOX: 3
}

// Globals

// List of functions that set SVG links to the right icon
const symbolsArray = [
  (use) => {use.setAttributeNS(xlinkns, "href", "#review-inactive");},
  (use) => {use.setAttributeNS(xlinkns, "href", "#review-onestar");},
  (use) => {use.setAttributeNS(xlinkns, "href", "#review-twostars");},
  (use) => {use.setAttributeNS(xlinkns, "href", "#review-threestars");},
  (use) => {use.setAttributeNS(xlinkns, "href", "#review-fourstars");},
  (use) => {use.setAttributeNS(xlinkns, "href", "#review-fivestars");}
];

// SVG namespaces
const  svgns = "http://www.w3.org/2000/svg";
const  xlinkns = "http://www.w3.org/1999/xlink";

// DOM Elements
//UI
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

//Game
const dropdownRules = document.getElementById('dropdown-rules');

const singleStarsLeftElm = document.getElementById('single-stars-left');
const singleStarsUsedElm = document.getElementById('single-stars-used');

const p1StarsLeftElm = document.getElementById('p1-stars-left');
const p1StarsUsedElm = document.getElementById('p1-stars-used');

const p2StarsLeftElm = document.getElementById('p2-stars-left');
const p2StarsUsedElm = document.getElementById('p2-stars-used');

const counterElm = document.getElementById('turn-counter');
const inputTurns = document.getElementById('nr-turns');
const inputTurnsMulti = document.getElementById('nr-turns-multi');

// Available stars for each player to place in the start of the game
const availableStars = 25;
const availableStarsMultiplayer = 12;

const examples = {
  exploder: {
    array: [
      [5,1,5],
      [1,2,1],
      [5,1,5]
    ],
    rules: RULES.TPSINGLE
  },
  christmasTree: {
    array: [
      [0,0,0,0,0,0,3,0,0,0,0,0,0],
      [0,0,0,0,0,3,0,3,0,0,0,0,0],
      [0,0,0,0,0,0,3,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,5,0,0,0,0,0,0],
      [0,0,0,0,0,0,5,0,0,0,0,0,0],
      [0,0,0,0,0,0,5,0,0,0,0,0,0],
      [0,0,0,5,0,0,0,0,0,5,0,0,0],
      [0,0,0,5,0,0,0,0,0,5,0,0,0],
      [0,0,0,5,0,0,0,0,0,5,0,0,0],
      [5,0,0,0,0,0,5,0,0,0,0,0,5],
      [5,0,0,0,0,0,5,0,0,0,0,0,5],
      [5,0,0,0,0,0,5,0,0,0,0,0,5]
    ],
    rules: RULES.TPSINGLE
  },
  pentadecathlon: {
    array: [
      [0,5,0],
      [0,5,0],
      [5,0,5],
      [0,5,0],
      [0,5,0],
      [0,5,0],
      [0,5,0],
      [5,0,5],
      [0,5,0],
      [0,5,0]
    ],
    rules: RULES.CONWAY
  },
  pulsar: {
    array: [
      [0,0,5,5,5,0,0,0,5,5,5,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0],
      [5,0,0,0,0,5,0,5,0,0,0,0,5],
      [5,0,0,0,0,5,0,5,0,0,0,0,5],
      [5,0,0,0,0,5,0,5,0,0,0,0,5],
      [0,0,5,5,5,0,0,0,5,5,5,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,5,5,5,0,0,0,5,5,5,0,0],
      [5,0,0,0,0,5,0,5,0,0,0,0,5],
      [5,0,0,0,0,5,0,5,0,0,0,0,5],
      [5,0,0,0,0,5,0,5,0,0,0,0,5],
      [0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,5,5,5,0,0,0,5,5,5,0,0]
    ],
    rules: RULES.CONWAY
  },
  gosperGliderGun: {
    array: [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,5,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,5,5,0,0,0,0,0,0,5,5,0,0,0,0,0,0,0,0,0,0,0,0,5,5],
      [0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,5,0,0,0,0,5,5,0,0,0,0,0,0,0,0,0,0,0,0,5,5],
      [5,5,0,0,0,0,0,0,0,0,5,0,0,0,0,0,5,0,0,0,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [5,5,0,0,0,0,0,0,0,0,5,0,0,0,5,0,5,5,0,0,0,0,5,0,5,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,5,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],
    rules: RULES.CONWAY
  },
  blinker: {
    array: [
      [0,0,0,0,5,0,0,0,0],
      [0,0,0,0,5,0,0,0,0],
      [0,0,0,0,5,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [5,5,5,0,0,0,5,5,5],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,5,0,0,0,0],
      [0,0,0,0,5,0,0,0,0],
      [0,0,0,0,5,0,0,0,0]
    ],
    rules: RULES.CONWAY
  }
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

class GameOfTrust {
  constructor(boardWidth, boardHeight) {
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    // this.setSize();
    // Create the board array
    this.board = GameOfTrust.createBoardArray(boardWidth, boardHeight);
    this.boardDivs = []; // Array with the div elements of the board

    // Get the container element
    let boardElm = document.getElementById('board');

    this.handleCellClick = this.handleCellClick.bind(this);
    // Create the review cells from the array
    // and add them to an elements array, so that they are easier to access
    this.board.forEach(
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

          cellElm.addEventListener('mousedown', this.handleCellClick);
        })
        this.boardDivs.push(rowDivs);
      }
    )

    this.currentPlayer = 1;
    this.placedStars = 0;
    this.counter = 0;
  }

  startGame() {
    // Get number of turns
    switch (gameUI.currentPage) {
      case PAGES.SINGLEPLAYER:
        this.turns = Number(inputTurns.value);
        break;
      case PAGES.MULTIPLAYER:
        this.turns = Number(inputTurnsMulti.value);
        break;
      default:
        this.turns = null;
    }
    // Remove event listeners so that the user can't change their initial input
    this.removeEventListeners();

    // Remove previous 'winner' elements if there are any
    if (this.winner) {
      this.winner.remove();
    }
    //
    this.runGame(this.turns, RULES.functions[GameOfTrust.getRules()]);
  }

  runGame(turns, rules) {
    rules = rules || trustpilotSingleRules;
    this.turns = turns || null; //Allow for a continuous game
    if (this.turns) {
      this.turns += this.counter //increment turns if we are continuing a game
    }

    this.isGameStopped = false;
    let nextBoard;

    this.intervalID = window.setInterval(() => {

      if (this.turns && this.counter >= this.turns || this.isGameStopped) {
        window.clearInterval(this.intervalID);
        this.getResults(this.board);
        gameUI.showContinueButtons();
      }
      else {
        this.counter++;
        this.board = GameOfTrust.nextGeneration(this.board, rules);
        // Update the board
        GameOfTrust.updateBoardDivs(this.board, this.boardDivs);
        counterElm.innerText = this.counter;
      }
    }, 500);

    gameUI.showStopButton();
    gameUI.showPanel();
  }

  stopGame() {
    if (this.turns) {
      inputTurns.value = this.turns - this.counter;
      inputTurnsMulti.value = this.turns - this.counter;
    }

    this.isGameStopped = true;
    gameUI.showContinueButtons();
  }

  resetGame() {
    this.counter = 0;
    this.isGameStopped = false;
    this.board = GameOfTrust.createBoardArray(this.boardWidth, this.boardHeight);
    this.currentPlayer = 0;
    this.playerReady();

    // Reset UI
    // Update the game board for the new, empty board array
    GameOfTrust.updateBoardDivs(this.board, this.boardDivs);
    this.addEventListeners();
    // re-start the counter
    counterElm.innerText = this.counter;
    // reset the input fields to their defaults
    inputTurns.value = 50;
    inputTurnsMulti.value = 50;

    if (this.winner) {
      console.log(this.winner);
      this.winner.remove();
    }
    // re-enable start button
    if (gameUI.currentPage !== PAGES.MULTIPLAYER) {
      gameUI.enableStart();
    }
    gameUI.showStartButton();
    gameUI.showPanel();
  }

  getResults(board) {
    if (gameUI.currentPage === PAGES.SANDBOX) {
      return;
    }
    // Calculate the game results from the current board

    // Count how many instances of each state there are in the board
    let results = {};
    board.forEach((row) => {
      row.forEach((cell) => {
        results[cell] = (results[cell] || 0) + 1;
      })
    });

    // Get the DOM elements where we will present the results
    const result1Star = document.getElementById('result-1star');
    const result2Stars = document.getElementById('result-2stars');
    const result3Stars = document.getElementById('result-3stars');
    const result4Stars = document.getElementById('result-4stars');
    const result5Stars = document.getElementById('result-5stars');

    let resultElms = [result1Star, result2Stars, result3Stars, result4Stars, result5Stars];

    const resultTrustscore = document.getElementById('result-trustscore');

    resultElms.forEach((el, i) => {
      // Set the result for each element
      el.innerText = results[i + 1] || 0;
      // Hide stars 2 to 4 in multiplayer mode
      if (gameUI.currentPage === PAGES.MULTIPLAYER && i > 0 && i < 4) {
        el.parentElement.style.display = 'none';
      }
    });

    let nrStars = 0;
    let nrReviews = 0;
    Object.keys(results).forEach((key, index) => {
      if (key == 0) {
        return;
      } else {
        nrReviews += results[key];
        nrStars += (results[key] * key);
      }
    })
    let trustscore = nrStars * 2 / nrReviews || 0;
    resultTrustscore.innerText = Math.round(trustscore * 100) / 100; //rounded to centesims

    // If it is a multiplayer game, tell which player won
    if (gameUI.currentPage === PAGES.MULTIPLAYER) {
      this.winner = document.createElement('h3');
      if (trustscore > 5) {
        this.winner.innerText = 'Player 1 wins!';
      } else {
        this.winner.innerText = 'Player 2 wins!';
      }
      panelResults.append(this.winner);
    }

    gameUI.showResults();
  }

  playerReady() {
    // Pass the player turn in a multiplayer game

    this.placedStars = 0;
    if (this.currentPlayer === 1) {
      this.currentPlayer = 2;
      gameUI.enablePlayer2();
    } else if (this.currentPlayer === 2) {
      this.currentPlayer = 0;
      gameUI.enableStart();
    } else {
      this.currentPlayer = 1;
      gameUI.enablePlayer1();
    }
  }

  handleCellClick(event) {
    let cell = event.currentTarget;
    let cellPos = {
      x: cell.getAttribute('data-row'),
      y: cell.getAttribute('data-cell')
    }

    switch (GameOfTrust.getRules()) {

      case RULES.TPSINGLE:
        // Input restrictions for a game following Trustpilot single player rules

        if (
          gameUI.currentPage !== PAGES.SANDBOX &&
          this.placedStars >= availableStars ||
          this.board[cellPos.x][cellPos.y] === REVIEWSTATE.FIVESTARS
        ) {
          this.placedStars -= this.board[cellPos.x][cellPos.y];
          this.board[cellPos.x][cellPos.y] = REVIEWSTATE.INACTIVE;
        } else {
          this.placedStars++;
          this.board[cellPos.x][cellPos.y]++;
        }

        singleStarsLeftElm.innerText = availableStars - this.placedStars;
        singleStarsUsedElm.innerText = this.placedStars;
        break;

      case RULES.TPMULTI:
        // Input restrictions for a game following Trustpilot multiplayer rules

        if (this.currentPlayer === 1) {
          if (this.board[cellPos.x][cellPos.y] === REVIEWSTATE.FIVESTARS) {
            --this.placedStars;
            this.board[cellPos.x][cellPos.y] = REVIEWSTATE.INACTIVE;
          } else if (this.board[cellPos.x][cellPos.y] === REVIEWSTATE.INACTIVE && this.placedStars < availableStarsMultiplayer) {
            ++this.placedStars;
            this.board[cellPos.x][cellPos.y] = REVIEWSTATE.FIVESTARS;
          }

          p1StarsLeftElm.innerText = availableStarsMultiplayer - this.placedStars;
          p1StarsUsedElm.innerText = this.placedStars;
        } else if (this.currentPlayer === 2) {
          if (this.board[cellPos.x][cellPos.y] === REVIEWSTATE.ONESTAR) {
            --this.placedStars;
            this.board[cellPos.x][cellPos.y] = REVIEWSTATE.INACTIVE;
          } else if (this.board[cellPos.x][cellPos.y] === REVIEWSTATE.INACTIVE && this.placedStars < availableStarsMultiplayer) {
            ++this.placedStars;
            this.board[cellPos.x][cellPos.y] = REVIEWSTATE.ONESTAR;
          }

          p2StarsLeftElm.innerText = availableStarsMultiplayer - this.placedStars;
          p2StarsUsedElm.innerText = this.placedStars;
        } else {
          console.warn('currentPlayer incorrectly set or both have played');
        }
       break;

      case RULES.CONWAY:
        // Input restrictions for a game following Conway's rules
        if (this.board[cellPos.x][cellPos.y] === REVIEWSTATE.FIVESTARS) {
          this.board[cellPos.x][cellPos.y] = REVIEWSTATE.INACTIVE;
        } else {
          this.board[cellPos.x][cellPos.y] = REVIEWSTATE.FIVESTARS;
        }
        break;
    }



    let iconUseSVG = cell.firstChild.firstChild;
    symbolsArray[this.board[cellPos.x][cellPos.y]](iconUseSVG);
  }

  addEventListeners() {
    this.boardDivs.forEach((row) => {
      row.forEach((cell) => {
        cell.addEventListener('mousedown', this.handleCellClick);
      })
    })
  }

  removeEventListeners() {
    this.boardDivs.forEach((row) => {
      row.forEach((cell) => {
        cell.removeEventListener('mousedown', this.handleCellClick);
      })
    })
  }

  createExample(example) {
    // Set an example array on the board

    // Set the dropdown to the right kind of rules
    dropdownRules.value = example.rules;
    // Create empty board
    let emptyBoard = GameOfTrust.createBoardArray(this.boardWidth, this.boardHeight);
    // Center the array
    this.board = GameOfTrust.centerArray(emptyBoard, example.array);
    GameOfTrust.updateBoardDivs(this.board, this.boardDivs);
  }

  static createBoardArray(boardWidth, boardHeight) {
    // Creates a matrix to track the state of each board cell

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

  static getRules() {
    // Returns which rules should be applied for the current game

    switch (gameUI.currentPage) {
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

  static updateBoardDivs(board, boardDivs) {
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

  static nextGeneration(board, rules) {
    let nextBoard = board.map((row, i) => {
      return row.map((cellState, j) => {
        return this.getNewState(board, cellState, i, j, rules);
      })
    });

    //
    return nextBoard;
  }

  static getNewState(board, currentState, cellRow, cellCol, rules) {
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

  static centerArray(bigArr, smallArr) {
    // Places an [NxN] array in the center of another one

    if (smallArr.length > bigArr.length || smallArr[0].length > bigArr[0].length) {
      throw('You provided an array that is larger than the one that is supposed to contain it.')
    } else {
      // Get the half width (HW) and half height (HH) of both arrays
      let bigArrHW = Math.floor(bigArr[0].length / 2);
      let bigArrHH = Math.floor(bigArr.length / 2);
      let smallArrHW = Math.floor(smallArr[0].length / 2);
      let smallArrHH = Math.floor(smallArr.length / 2);

      smallArr.forEach((row, i) => {
        row.forEach((cell, j) => {
          bigArr[bigArrHH - smallArrHH + i][bigArrHW - smallArrHW + j] = smallArr[i][j];
        })
      });

      return bigArr;
    }
  }

  // setSize() {
  //   // const board = document.getElementById('board');
  //   if (window.innerWidth < 1024) {
  //     this.boardWidth = Math.floor(Number(window.innerWidth) / 20);
  //   } else {
  //     this.boardWidth = Math.floor(Number(window.innerWidth * 0.7) / 20);
  //   }
  //
  //   this.boardHeight = Math.floor(Number(window.innerHeight) / 20);
  //   board.style.width = (this.boardWidth * 20) + 'px';
  //   board.style.height = (this.boardHeight * 20) + 'px';
  //
  // }

}

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

//Initialize the interface control
const gameUI = new UserInterface();

// Initialize and set board dimensions
const game = new GameOfTrust(30, 30);
