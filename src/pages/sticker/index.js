import React from 'react'
import img from '../../assets/rabi.jpg'
import * as PIXI from 'pixi.js'
import styled from 'styled-components'
import { Input } from 'antd'

const Stage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const AreaIpt = styled.div`
  width: 240px;
  .ant-input-group-wrapper {
    margin-top: 4px;
  }
`

class Sticker extends React.Component {
  app = null
  txt = null
  txtShort = null
  state = {
    txt1: '不行',
    txt2: ''
  }
  componentWillMount () {
    this.app = new PIXI.Application({
      width: 142, height: 142,
      transparent: true
    })
    this.app.loader.add('rabi', img).load((loader, res) => {
      const rabi = new PIXI.Sprite(res.rabi.texture)
      const txtShort = new PIXI.Text(this.state.txt1, {
        fontSize: 15, fill: 0x333333, align: 'center', fontFamily: '"Microsoft YaHei", "Helvetica Neue"'
      })
      const txt = new PIXI.Text(this.state.txt2 || `发出${this.state.txt1}的声音`, {
        fontSize: 16, fill: 0x333333, align: 'center',
        fontFamily: '"Microsoft YaHei", "Helvetica Neue"'
      })
      txtShort.anchor = { x: 0.5, y: 0.5 }
      txtShort.x = 25
      txtShort.y = 28
      txt.anchor = { x: 0.5, y: 0.5 }
      txt.x = 71
      txt.y = 129
      
      this.txt = txt
      this.txtShort = txtShort
      this.app.stage.addChild(rabi)
      this.app.stage.addChild(txt)
      this.app.stage.addChild(txtShort)
    })
  }
  updateText () {
    this.txt.text = this.state.txt2 || `发出${this.state.txt1}的声音`
    this.txtShort.text = this.state.txt1
  }
  componentDidMount () {
    const stage = document.getElementById('sticker-stage')
    stage.appendChild(this.app.view)
  }
  componentWillUnmount () {
    this.app.destroy(true)
  }
  changeTxt1 = (e) => {
    this.setState({
      txt1: e.target.value
    }, this.updateText)
  }
  changeTxt2 = (e) => {
    this.setState({
      txt2: e.target.value
    }, this.updateText)
  }
  render () {
    return (
      <Stage>
        <div id="sticker-stage"></div>
        <AreaIpt>
          <Input size="small" value={this.state.txt1} onChange={this.changeTxt1} addonBefore="文字1" />
          <Input size="small" value={this.state.txt2} onChange={this.changeTxt2} addonBefore="文字2" />
        </AreaIpt>
      </Stage>
    )
  }
}

export default Sticker
