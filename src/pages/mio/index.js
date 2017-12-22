import React, { Component } from 'react'
import img from '../../assets/ha.jpg'
import * as PIXI from 'pixi.js'
import { app, size } from './stage'
import move from './move'

class Mio extends Component {
  rootElm = null

  componentDidMount () {
    document.title = 'no title'

    this.rootElm.appendChild(app.view);

    // load the texture we need
    PIXI.loader.add('pic', img).load((loader, resources) => {
        // This creates a texture from a 'pic.png' image
        const pic = new PIXI.Sprite(resources.pic.texture);

        // Setup the position of the pic
        pic.x = app.renderer.width / 2;
        pic.y = app.renderer.height / 2;

        // Rotate around the center
        pic.anchor.x = 0.5;
        pic.anchor.y = 0.5;
        const blurFt = new PIXI.filters.BlurFilter()
        blurFt.blurX = 0
        blurFt.blurY = 0
        pic.filters = [blurFt];
        // Add the pic to the scene we are building
        app.stage.addChild(pic);
        // Listen for frame updates
        app.ticker.add(() => {
            // each frame we spin the pic around a bit
            // if (app.ticker.lastTime % 1000 < 60) console.log(app.ticker.lastTime)
            const { len, speed } = move(app.ticker.lastTime)
            pic.x -= len
            blurFt.blurX = Math.floor(speed * 2)
            if (pic.x < 0) {
              pic.x = size.width + pic.x % size.width
            }
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
