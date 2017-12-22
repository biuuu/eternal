import * as PIXI from 'pixi.js'

let app = null
const size = {
  width: 0, height: 0
}

const getWinSize = () => {
  const width = window.innerWidth
  const height = window.innerHeight
  size.width = width
  size.height = height
  return { width, height }
}

const initStage = () => {
  const { width, height } = getWinSize()
  app = new PIXI.Application({
    width, height,
    backgroundColor: 0xffffff
  })
  app.view.style.display = 'block'
}

const resetSize = () => {
  const { width, height } = getWinSize()
  app.view.width = width
  app.view.height = height
}

window.addEventListener('resize', resetSize, false)

initStage()

export { app, size }
