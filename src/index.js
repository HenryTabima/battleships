import './styles.scss'
import DOMHandler from './DOMHandler'
import Player from './models/player'
import GameBoard from './models/gameBoard'
import Ship from './models/ship'

document.addEventListener('DOMContentLoaded', startGameLoop)

let currentPlayer

function startGameLoop() {
  const board1 = initBoard()
  const board2 = initBoard()

  const player1 = Player(board1)
  const computer = Player(board2, { computer: true })
  DOMHandler.init({ players: [player1, computer] })
  currentPlayer = player1
}

function initBoard() {
  const board = GameBoard(Ship)

  const shipData = [
    { shipLength: 3, orientation: 'vertical' },
    { shipLength: 4, orientation: 'horizontal' },
    { shipLength: 6, orientation: 'vertical' },
    { shipLength: 5, orientation: 'horizontal' }
  ]

  shipData.forEach(ship => {
    board.positionShip({ ...ship, ...generatePositions(ship) })
  })

  return board
}
function generatePositions(ship) {
  const row = Math.floor(Math.random() * (10 - ship.shipLength))
  const col = Math.floor(Math.random() * (10 - ship.shipLength))
  return { row, col }
}

function play() {

}
