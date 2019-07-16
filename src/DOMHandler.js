'use strict'

import { type } from "os";

let gamePlayers

let mainContainer
function init({ players }) {
  gamePlayers = players
  mainContainer = document.getElementById('main')
  render()
}

function presentBoards(player) {
  const compGrid = document.createElement('div')
  compGrid.classList.add('board-container')
  let gridCells = ``
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const cell = player.board.getPosition(row, col)
      // states
      const isShip = typeof cell !== 'boolean'
      const isComputer = player.isComputer()
      const shipStatus = isShip && cell.ship.getStatus(cell.index)
      const isFailedHit = !isShip && cell === true
      // variable styles
      const shipClass = isShip && !isComputer ? 'ship' : ''
      const orientationClass = isShip && !isComputer ? cell.orientation : ''
      const content = isFailedHit || shipStatus ? 'X' : ''
      const action = isComputer && !isFailedHit && !shipStatus ? `onClick="document.exposedFunctions.play(${row},${col})"` : ''
      const hitShipClass = content === 'X' && isShip ? 'red' : ''
      const sunkClass = isShip && cell.ship.isSunk() ? 'sunk' : ''
      const clickableClass = player.isComputer() ? 'clickable' : ''
      gridCells += `
        <div class="cell ${shipClass} ${orientationClass} ${hitShipClass} ${sunkClass} ${clickableClass}" ${action}>
          ${content}
        </div>
      `
    }
  }

  compGrid.innerHTML = gridCells

  mainContainer.appendChild(compGrid)
}

function render() {
  mainContainer.innerHTML = ''
  gamePlayers.forEach(player => {
    presentBoards(player)
  })
}

export default { init, render }
