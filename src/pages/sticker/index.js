import React from 'react'
import img from '../../assets/rabi.jpg'
import * as PIXI from 'pixi.js'
import styled from 'styled-components'
import { Input, Button, Tooltip } from 'antd'

// http://www.zhangxinxu.com/wordpress/2017/07/js-text-string-download-as-html-json-file/
var tryDownload = function (context, filename) {
  // 创建隐藏的可下载链接
  var eleLink = document.createElement('a');
  eleLink.download = filename;
  eleLink.style.display = 'none';
 
  // 如果是PNG图片，则context.toDataURL('image/png')
  eleLink.href = context.toDataURL();
  // 触发点击
  document.body.appendChild(eleLink);
  eleLink.click();
  // 然后移除
  document.body.removeChild(eleLink);
}

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
  text-align: center;
  .ant-input-group-wrapper {
    margin-top: 4px;
  }
  .ant-btn {
    margin-top: 8px;
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
    document.title = '沙雕兔子'
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
  download = () => {
    this.app.renderer.render(this.app.stage)
    tryDownload(this.app.renderer.view, this.state.txt1 || '图片')
  }
  render () {
    return (
      <Stage>
        <div id="sticker-stage"></div>
        <AreaIpt>
          <Input size="small" value={this.state.txt1} onChange={this.changeTxt1} addonBefore="文字1" />
          <Input size="small" value={this.state.txt2} onChange={this.changeTxt2} addonBefore="文字2" />
          <Tooltip placement="bottom" title="也有可能下载不了，可以试试右键">
            <Button onClick={this.download} icon="picture">下载图片</Button>
          </Tooltip>
        </AreaIpt>
      </Stage>
    )
  }
}

export default Sticker
