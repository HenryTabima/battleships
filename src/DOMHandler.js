'use strict'

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

  // const isComputer = player.isComputer()

  // const boardState = player.board.getBoardState()

  let gridCells = ``

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const cell = player.board.getPosition(row, col)
      const isShip = typeof cell !== 'boolean' && !player.isComputer()
      const shipClass = isShip ? 'ship' : ''
      const orientationClass = isShip ? cell.orientation : ''
      gridCells += `<div class="cell ${shipClass} ${orientationClass}" ${player.isComputer() ? `onClick="document.exposedFunctions.play(${row},${col})` : ''}"></div>`
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
