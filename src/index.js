import './styles.scss'

const mainContainer = document.getElementById('main')
document.addEventListener('DOMContentLoaded', () => {
  presentBoards()
  presentBoards()
})

function presentBoards() {
  const compGrid = document.createElement('div')
  compGrid.classList.add('board-container')

  let gridCells = ``

  for (let i = 0; i < 100; i++) {
    gridCells += `<div class="cell cell-${i}">cell-${i}</div>`
  }
  compGrid.innerHTML = gridCells

  mainContainer.appendChild(compGrid)


}
