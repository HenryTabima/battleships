import './styles.scss'
import DOMHandler from './DOMHandler'
import Player from './models/player'
import GameBoard from './models/gameBoard'
import Ship from './models/ship'

document.addEventListener('DOMContentLoaded', startGameLoop)

document.exposedFunctions = {
  play
}

let currentPlayer
let waitingPlayer

function startGameLoop() {
  const board1 = initBoard()
  const board2 = initBoard()

  const player1 = Player(board1)
  const computer = Player(board2, { computer: true })
  DOMHandler.init({ players: [player1, computer] })
  currentPlayer = player1
  waitingPlayer = computer
}

function initBoard() {
  const board = GameBoard(Ship)

  const shipData = [
    { shipLength: 5, orientation: generateOrientation() },
    { shipLength: 4, orientation: generateOrientation() },
    { shipLength: 3, orientation: generateOrientation() },
    { shipLength: 3, orientation: generateOrientation() },
    { shipLength: 2, orientation: generateOrientation() },
    { shipLength: 2, orientation: generateOrientation() },
    { shipLength: 2, orientation: generateOrientation() }
  ]

  shipData.forEach(({ shipLength, orientation }) => {
    const { row, col } = generatePositions({ shipLength, orientation }, board)
    board.positionShip({ shipLength, orientation, row, col })
  })

  return board
}
function generatePositions({ shipLength, orientation }, board) {
  let notDone = true
  const rowSpan = orientation === 'horizontal' ? 10 - shipLength : 10
  const colSpan = orientation === 'horizontal' ? 10 : 10 - shipLength
  let row, col
  while (notDone) {
    row = Math.floor(Math.random() * rowSpan)
    col = Math.floor(Math.random() * colSpan)
    notDone = !board.validPosition({ shipLength, orientation, row, col })
  }
  return { row, col }
}

function generateOrientation() {
  const orientations = ['vertical', 'horizontal']
  return orientations[Math.floor(Math.random() * 2)]
}

function play(row = null, col = null) {
  if (currentPlayer.isComputer()) {
    currentPlayer.autoPlay(waitingPlayer.board)
  } else {
    currentPlayer.attack({ enemyBoard: waitingPlayer.board, row, col })
  }
  DOMHandler.render()
  if (waitingPlayer.board.allShipsSunk()) {
    DOMHandler.displayWinnerMessage(currentPlayer)
  } else {
    togglePlayer()
    if (currentPlayer.isComputer()) play()
  }
}

function togglePlayer() {
  const aux = currentPlayer
  currentPlayer = waitingPlayer
  waitingPlayer = aux
}
