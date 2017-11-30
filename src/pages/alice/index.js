import React, { Component } from 'react'
import { Input, Button } from 'antd'
import { injectGlobal } from 'styled-components'
import { mora2Code, code2Mora } from './parseData'

const TextArea = Input.TextArea

injectGlobal`
  .page-alice {
    width: 600px;
    margin: 0 auto;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    pre {
      white-space: pre-line;
    }
  }
`

class Alice extends Component {
  state = {
    value: '',
    result: ''
  }

  onChange = (e) => {
    const { value } = e.target
    this.setState({ value })
  }

  mora2Code = () => {
    const result = mora2Code(this.state.value).code
    this.setState({ result })
  }

  code2Mora = () => {
    const data = code2Mora(this.state.value)
    const result = `${data.romaji}\n\n${data.mora}\n\n${data.mora2}`
    this.setState({ result })
  }

  componentDidMount () {
    document.title = '平假名/片假名 转摩尔斯码'
  }

  render () {
    return (
      <div className="page-alice">
        <h1>平假名片假名转摩尔斯码</h1>
        <p style={{ margin: '10px 0' }}>
          只支持平假名和片假名，1长，0短。数据来源
          <a href="https://en.wikipedia.org/wiki/Wabun_code" rel="noopener noreferrer" target="_blank">wikipedia</a>
        </p>
        <p style={{ marginBottom: 20 }}>(ッ促音没有对应的编码，因此会被忽略)</p>
        <TextArea value={this.state.value} onChange={this.onChange} autosize={{ minRows: 4, maxRows: 6 }} />
        <div style={{ margin: '20px 0' }}>
          <Button onClick={this.mora2Code} style={{ marginRight: 20 }}>转码</Button>
          <Button onClick={this.code2Mora}>解码</Button>
        </div>
        <pre>{this.state.result}</pre>
      </div>
    )
  }
}

export default Alice
