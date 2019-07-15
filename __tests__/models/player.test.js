'use strict'

import Player from '../../src/models/player'
import GameBoard from '../../src/models/gameBoard'
import Ship from '../../src/models/ship'

describe('Player Factory', () => {
  let player
  let board

  beforeEach(() => {
    player = Player()
    board = GameBoard(Ship)
  })

  it('Player can atack enemy board', () => {
    const row = 1
    const col = 1
    expect(board.getPosition(row, col)).toBeFalsy()
    player.attack({ enemyBoard: board, row, col })
    expect(board.getPosition(row, col)).toBeTruthy()
  })

  it('Player can be a computer a play random positions without repeat', () => {
    player = Player({ computer: true })
    expect(player.isComputer()).toBe(true)
    const moves = board.getAvailablePositions()
    player.autoPlay(board)
    const updatedMoves = board.getAvailablePositions()
    expect(updatedMoves.length).toBe(moves.length - 1)
  })
})
