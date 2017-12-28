import * as PIXI from 'pixi.js'

PIXI.utils.skipHello()

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

const resetSize = () => {
  const { width, height } = getWinSize()
  if (app && app.view) {
    app.view.width = width
    app.view.height = height
  }
}

const listenResize = () => {
  window.addEventListener('resize', resetSize, false)
}

const unlistenResize = () => {
  window.removeEventListener('resize', resetSize)
}

const initStage = () => {
  const { width, height } = getWinSize()
  app = new PIXI.Application({
    width, height,
    backgroundColor: 0xffffff
  })
  app.view.style.display = 'block'
  listenResize()
  return app
}

const removeStage = () => {
  unlistenResize()
  app.destroy(true)
  app = null
}

export { initStage, removeStage, size }
