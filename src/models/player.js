'use strict'

function Player(board, options = { computer: false }) {
  function attack({ enemyBoard, row, col }) {
    enemyBoard.receiveAttack(row, col)
  }

  function isComputer() {
    return options.computer
  }

  function autoPlay(enemyBoard) {
    const positions = enemyBoard.getAvailablePositions()
    const attackPosition = positions[Math.floor(Math.random() * positions.length)]
    enemyBoard.receiveAttack(...attackPosition)
  }

  return { attack, isComputer, autoPlay, board }
}

export default Player
