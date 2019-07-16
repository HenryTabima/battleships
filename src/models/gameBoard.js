'use strict'

const BOARD_SIZE = 10

function GameBoard(shipModel) {
  const ships = []
  const positions = Array.from({ length: BOARD_SIZE * BOARD_SIZE }, () => false)
  const attackedPositions = []

  const computePosition = (row, col) => (row * BOARD_SIZE) + col

  function forEachCellPositionInShip({ shipLength, orientation, row, col }, cb) {
    const position = computePosition(row, col)
    const INCREASER = orientation === 'horizontal' ? 1 : 10
    for (let i = 0; i < shipLength; i++) {
      const indexPosition = position + (i * INCREASER)
      cb(positions[indexPosition], indexPosition, i)
    }
  }

  function positionShip({ shipLength, orientation, row, col }) {
    const ship = shipModel(shipLength)
    ships.push(ship)
    forEachCellPositionInShip({ shipLength, orientation, row, col }, (cell, index, shipIndex) => {
      positions[index] = { ship, index: shipIndex, orientation }
    })
  }

  function validPosition({ shipLength, orientation, row, col }) {
    const isInRange = orientation === 'horizontal'
      ? (col + shipLength) <= BOARD_SIZE
      : (row + shipLength) <= BOARD_SIZE
    const cells = []
    forEachCellPositionInShip({ shipLength, orientation, row, col }, (cell) => {
      cells.push(cell)
    })
    return cells.every(cell => typeof cell === 'boolean') && isInRange
  }

  function receiveAttack(row, col) {
    const pos = computePosition(row, col)
    if (positions[pos] && positions[pos].ship) {
      positions[pos].ship.hit(positions[pos].index)
      console.log(positions[pos].ship, positions[pos].ship.getStatus())
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

  return { positionShip, getShips, getPosition, getBoardState, receiveAttack, allShipsSunk, getAvailablePositions, validPosition }
}

export default GameBoard
