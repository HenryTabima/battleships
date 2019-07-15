'use strict'

const BOARD_SIZE = 10

function GameBoard(shipModel) {
  const ships = []
  const positions = Array.from({ length: BOARD_SIZE * BOARD_SIZE }, () => false)
  const attackedPositions = []

  const computePosition = (row, col) => (row * BOARD_SIZE) + col

  function positionShip({ shipLength, orientation, row, col }) {
    const ship = shipModel(shipLength)
    const position = computePosition(row, col)
    ships.push(ship)
    const INCREASER = orientation === 'horizontal' ? 1 : 10
    for (let i = 0; i < shipLength; i++) {
      positions[position + (i * INCREASER)] = { ship, index: i }
    }
  }

  function receiveAttack(row, col) {
    const pos = computePosition(row, col)
    if (positions[pos] && positions[pos].ship) {
      positions[pos].ship.hit(positions[pos].index)
    } else {
      positions[pos] = true
    }
    attackedPositions.push(pos)
  }

  function getAvailablePositions() {
    return Array.from(positions, (val, i) => i)
      .filter(val => !attackedPositions.includes(val))
      .map(i => ([Math.floor(i / BOARD_SIZE), i % BOARD_SIZE]))
  }

  function getShips() {
    return ships
  }

  function getBoardState() {
    return positions
  }

  function getPosition(row, col) {
    return positions[computePosition(row, col)]
  }

  function allShipsSunk() {
    return ships.every(ship => ship.isSunk())
  }

  return { positionShip, getShips, getPosition, getBoardState, receiveAttack, allShipsSunk, getAvailablePositions }
}

export default GameBoard
