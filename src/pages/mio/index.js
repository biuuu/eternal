import React, { Component } from 'react'
import { Input, Button } from 'antd'
import { injectGlobal } from 'styled-components'
import { Link } from 'react-router-dom'

const TextArea = Input.TextArea

injectGlobal`
  .page-mio {
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

class Mio extends Component {
  state = {
    value: '',
    result: ''
  }

  onChange = (e) => {
    const { value } = e.target
    this.setState({ value })
  }


  componentDidMount () {
    document.title = 'no title'
  }

  render () {
    return (
      <div className="page-mio">
        <Link to="/alice">zzzz</Link>
        <h1>well</h1>
      </div>
    )
  }
}

export default Mio
