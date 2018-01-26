import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const Text = styled.p`
  font-size: 16px;
  line-height: 1.5;
  white-space: pre-line;
  padding: 10px 10px 100px 10px;
`

const Menulink = styled.p`
  font-size: 22px;
  padding: 10px;
`

const context = require.context('../../assets/', true, /\.txt$/)
const lrcMap = {}
const lrcNames = context.keys().map(filename => {
  const rgs = filename.match(/lrc\/([^/]+)\.txt$/)
  if (!rgs) return null
  const name = rgs[1]
  lrcMap[name] = context(filename)
  return name
})

class Lrc extends React.Component {
  state = {
    text: ''
  }

  async getText (path) {
    if (!path) return
    const res = await axios.get(path)
    this.setState({
      text: res.data
    })
  }

  getPath (props) {
    const { name } = props ? props.match.params : this.props.match.params
    return lrcMap[name]
  }

  componentDidMount () {
    const path = this.getPath()
    this.getText(path)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.match.params.name !== this.props.match.params.name) {
      const path = this.getPath(nextProps)
      this.getText(path)
    }
  }

  render () {
    const { name } = this.props.match.params
    return (
      <div>
        {
          !name
          ? <ul>
              {
                lrcNames.map(n => <li key={n}><Link to={`/lrc/${window.encodeURIComponent(n)}`}>{n}</Link></li>)
              }
            </ul>
          : <div>
              <Menulink><Link to="/lrc">&lt; 目录</Link></Menulink>
              <Text>{this.state.text}</Text>
            </div>
        }
      </div>
    )
  }
}

export default Lrc
