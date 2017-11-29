import React, { Component } from 'react'
import { Input, Button } from 'antd'
import styled, { injectGlobal } from 'styled-components'
import { mora2Code, code2Mora } from './parseData'

const TextArea = Input.TextArea

injectGlobal`
  .page-alice {
    width: 600px;
    margin: 0 auto;
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
    const result = `${data.romaji}\n${data.mora}`
    this.setState({ result })
  }

  render () {
    return (
      <div className="page-alice">
        <TextArea value={this.state.value} onChange={this.onChange} />
        <pre>{this.state.result}</pre>
        <Button onClick={this.mora2Code}>转码</Button>
        <Button onClick={this.code2Mora}>解码</Button>
      </div>
    )
  }
}

export default Alice
