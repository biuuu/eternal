import React, { Component } from 'react'
import img from '../../assets/ha.jpg'
import * as PIXI from 'pixi.js'
import { size, initStage, removeStage } from './stage'
import move, { computePos } from './move'

const getTint = (speed) => {
  const num = Math.floor(0xff - speed / 20 * (0xff - 0xee))
  return num * Math.pow(16, 4) + num * Math.pow(16, 2) + num
}

const run = (app, count = 1) => () => {
  const container = new PIXI.particles.ParticleContainer(1500, {
    rotation: true,
    tint: true
  })
  container.width = app.renderer.width
  container.height = app.renderer.height
  const pics = []
  for (let i = 0; i < count; i++) {
    const pic = new PIXI.Sprite(PIXI.loader.resources['pic'].texture)
    pic.x = app.renderer.width / 2;
    pic.y = app.renderer.height / 2;
    pic.anchor.x = 0.5
    pic.anchor.y = 0.5
    pic.rotation = Math.PI / 4
    container.addChild(pic)
    pics.push({
      pic,
      lastLength: Math.floor(Math.random() * 6000)
    })
  }

  app.stage.addChild(container)

  app.ticker.add(() => {
      // each frame we spin the pic around a bit
      for (let i = 0; i < count; i++) {
        const pic = pics[i].pic
        const { len, speed } = move(app.ticker.lastTime, pics[i].lastLength)
        pics[i].lastLength += len
        const { x, y, rotation } = computePos(len, {
          x: pic.x, y: pic.y, width: size.width, height: size.height,
          rotation: pic.rotation
        })
        pic.tint = getTint(speed)
        pic.x = x
        pic.y = y
        pic.rotation = rotation
      }
  })
}

class Mio extends Component {
  rootElm = null

  componentDidMount () {
    document.title = 'WOW SO FAST'
    const rgs = this.props.location.search.match(/count=(\d+)/)
    const count = (rgs ? Number(rgs[1]) : 1) || 1
    const app = initStage()

    this.rootElm.appendChild(app.view)

    // load the texture we need
    if (!PIXI.loader.resources['pic']) {
      PIXI.loader.add('pic', img).load(() => {
        run(app, count)()
      })
    } else {
      run(app, count)()
    }
  }

  componentWillUnmount () {
    removeStage()
  }

  render () {
    return (
      <div ref={elm => this.rootElm = elm} className="page-mio">
      </div>
    )
  }
}

export default Mio
