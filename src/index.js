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
  board.positionShip({ shipLength: 4, orientation: 'vertical', row: 0, col: 0 })
  return board
}

function play() {

}
