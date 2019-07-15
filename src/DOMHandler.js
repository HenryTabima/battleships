'use strict'

let mainContainer

function init({ players }) {
  mainContainer = document.getElementById('main')
  players.forEach(player => {
    presentBoards(player)
  })
}

function presentBoards(player) {
  const compGrid = document.createElement('div')
  compGrid.classList.add('board-container')

  // const isComputer = player.isComputer()

  const boardState = player.board.getBoardState()

  let gridCells = ``

  for (let i = 0; i < 100; i++) {
    const cell = boardState[i]
    // false ; true ; { ship, index }
    const shipClass = typeof cell !== 'boolean' && !player.isComputer() ? 'ship' : ''
    gridCells += `<div class="cell cell-${i} ${shipClass}"></div>`
  }
  compGrid.innerHTML = gridCells

  mainContainer.appendChild(compGrid)
}

export default { init }
