import React, { Component } from 'react'
import img from '../../assets/ha.jpg'
import * as PIXI from 'pixi.js'
import { app, size } from './stage'
import move, { computePos } from './move'

class Mio extends Component {
  rootElm = null

  componentDidMount () {
    document.title = 'no title'

    this.rootElm.appendChild(app.view);

    // load the texture we need
    PIXI.loader.add('pic', img).load((loader, resources) => {
        // This creates a texture from a 'pic.png' image
        const pic = new PIXI.Container()
        const sprite = new PIXI.Sprite(resources.pic.texture);

        pic.height = sprite.height
        pic.width = sprite.width
        // Setup the position of the pic
        pic.x = app.renderer.width / 2;
        pic.y = app.renderer.height / 2;

        // Rotate around the center
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        const blurFt = new PIXI.filters.BlurFilter()
        blurFt.blurX = 0
        blurFt.blurY = 0
        pic.filters = [blurFt]
        pic.rotation = Math.PI/4
        // Add the pic to the scene we are building
        pic.addChild(sprite)
        app.stage.addChild(pic);

        app.ticker.add(() => {
            // each frame we spin the pic around a bit
            // if (app.ticker.lastTime % 1000 < 60) console.log(app.ticker.lastTime)
            const { len, speed } = move(app.ticker.lastTime)
            const { x, y, rotation } = computePos(len, {
              x: pic.x, y: pic.y, width: size.width, height: size.height,
              rotation: pic.rotation
            })
            blurFt.blurX = Math.abs(Math.floor(speed * Math.cos(rotation)))
            blurFt.blurY = Math.abs(Math.floor(speed * Math.sin(rotation)))
            pic.x = x
            pic.y = y
            pic.rotation = rotation
        });
    });
  }

  render () {

    return (
      <div ref={elm => this.rootElm = elm} className="page-mio">

      </div>
    )
  }
}

export default Mio
