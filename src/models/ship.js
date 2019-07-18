'use strict'

function Ship(length) {
  const positions = Array.from({ length }, () => false)

  function getLength() {
    return positions.length
  }

  function getStatus(pos = -1) {
    return pos === -1 ? positions : positions[pos]
  }

  function hit(pos) {
    positions[pos] = true
    return this
  }

  function isSunk() {
    return positions.every(pos => pos)
  }

  return { getLength, getStatus, hit, isSunk }
}

export default Ship
