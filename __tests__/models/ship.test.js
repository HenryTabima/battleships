import Ship from '../../src/models/ship'

describe('Ship Factory', () => {
  const ship = Ship(3)

  it('getLength return the length of the ship', () => {
    expect(ship.getLength()).toBe(3)
  })

  it('getStatus return the hit positions of the ship', () => {
    expect(ship.getStatus()).toEqual([false, false, false])
  })

  it('hit change the status of the ship', () => {
    ship.hit(1)
    expect(ship.getStatus()).toEqual([false, true, false])
  })

  it('isSunk return true if every ship position is hit', () => {
    ship.hit(0).hit(1)
    expect(ship.isSunk()).toBe(false)
    ship.hit(2)
    expect(ship.isSunk()).toBe(true)
  })
})
