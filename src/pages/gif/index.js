import React from 'react'
import gifFrames from 'gif-frames'
import img from '../../assets/gif.gif'
import styled from 'styled-components'
import GIF from 'gif.js'
import {
  Upload, Button, Icon, Card
} from 'antd'

const { Meta } = Card
const PageGif = styled.div`
  @media (min-width: 700px) {
    width: 700px;
    margin: auto;
  }
  text-align: center;
  > * {
    display: block;
    margin: 10px;
  }
  > span:first-child {
    margin-top: 100px;
  }
  .ant-upload.ant-upload-drag {
    display: inline-block;
    padding: 0;
    background: transparent;
    border: none;
    width: auto;
    height: auto;
  }
`

const tryDownload = (src, filename = 'image.gif') => {
  const eleLink = document.createElement('a')
  eleLink.download = filename
  eleLink.style.display = 'none'
  eleLink.href = src
  document.body.appendChild(eleLink)
  eleLink.click()
  document.body.removeChild(eleLink)
}

class Gif extends React.Component {
  state = {
    url: null,
    src: null,
    name: ''
  }

  reverse (url) {
    return gifFrames({ url, frames: 'all', outputType: 'canvas', cumulative: true })
    .then(function (frameData) {
      return new Promise((rev, rej) => {
        const gif = new GIF({
          workerScript: '/gif.worker.js',
          workers: 2,
          width: frameData[0].frameInfo.width,
          height: frameData[0].frameInfo.height
        })
        frameData.reverse().forEach(item => {
          const delay = item.frameInfo.delay || 1
          gif.addFrame(item.getImage(), { delay: delay * 10 })
        })
        gif.on('finished', function(blob) {
          rev(URL.createObjectURL(blob))
        })
        gif.render()
      })
    }).catch(err => {
      alert(err)
    })
  }

  componentDidMount () {
    document.title = 'GIF在线反转'
  }

  importGif = (file) => {
    if (!file) return false
    const name = file.name.replace(/\.gif$/, '-reverse.gif')
    this.setState({ name })
    const src = URL.createObjectURL(file)
    this.setState({
      src: src
    })
    this.reverse(src).then(url => {
      this.setState({
        url
      })
    })
    return false
  }

  download = () => {
    if (this.state.url) {
      tryDownload(this.state.url, this.state.name)
    }
  }

  render () {
    return (
      <PageGif>
        {
          this.state.src
          ? (<Card
            hoverable
            cover={<img alt="原图" src={this.state.src} />}
            style={{ display: 'inline-block', margin: 10 }}
          >
            <Meta
              title="原图"
            />
          </Card>)
          : null
        }
        {
          this.state.url
          ? (<Card
            hoverable
            cover={<img alt="反转" src={this.state.url} />}
            style={{ display: 'inline-block', margin: 10 }}
          >
            <Meta
              title="反转"
            />
          </Card>)
          : null
        }

        <Upload.Dragger accept="image/gif" showUploadList={false} beforeUpload={this.importGif}>
          <Button type="primary" ghost>
            <Icon type="picture" /> 选择图片
          </Button>
        </Upload.Dragger>
        {
            this.state.url
            ? (
              <Button onClick={this.download}>
                <Icon type="download" /> 下载图片
              </Button>
            ) : null
          }
      </PageGif>
    )
  }
}

export default Gif
