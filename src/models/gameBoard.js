'use strict'

const BOARD_SIZE = 10

function GameBoard(shipModel) {
  const ships = []
  const postions = Array.from({ length: BOARD_SIZE }, () => new Array(BOARD_SIZE))

  function positionShip({ shipLength, orientation, row, col }) {
    const ship = shipModel(shipLength)
    ships.push(ship)
    // postions[lat][long]
    for (let i = 0; i < shipLength; i++) {
      if (orientation === 'horizontal') {
        postions[row][col + i] = { ship, index: i }
      } else {
        postions[row + i][col] = { ship, index: i }
      }
    }
  }

  function receiveAttack(row, col) {
    const cell = postions[row][col]
    if (cell && cell.ship) {
      cell.ship.hit(cell.index)
    } else {
      postions[row][col] = true
    }
  }

  function getShips() {
    return ships
  }

  function getPositions() {
    return postions
  }

  function allShipsSunk() {
    return ships.every(ship => ship.isSunk())
  }

  return { positionShip, getShips, getPositions, receiveAttack, allShipsSunk }
}

export default GameBoard
