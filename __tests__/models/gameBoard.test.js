import GameBoard from '../../src/models/gameBoard'
import Ship from '../../src/models/ship'

describe('GameBoard Factory', () => {
  let board
  beforeEach(() => {
    board = GameBoard(Ship)
  })

  it('palces ships at specific coordinated by calling ship factory', () => {
    board.positionShip({ shipLength: 4, orientation: 'horizontal', row: 0, col: 0 })
    expect(board.getShips().length).toBe(1)
  })

  it('receive attack function with a pair of coordinates', () => {
    board.receiveAttack(0, 0)
    expect(board.getPosition(0, 0)).toBeTruthy()
  })
  it('keep track of missed attacts so it can be displayed', () => {
    expect(board.getPosition(2, 3)).toBeFalsy()
    board.receiveAttack(2, 3)
    expect(board.getPosition(2, 3)).toBeTruthy()
  })
  it('report if a ship has been sunk or not', () => {
    board.positionShip({
      shipLength: 2,
      orientation: 'horizontal',
      row: 0,
      col: 0
    })
    expect(board.allShipsSunk()).toBe(false)
    board.receiveAttack(0, 0)
    board.receiveAttack(0, 1)
    expect(board.allShipsSunk()).toBe(true)
  })
})
