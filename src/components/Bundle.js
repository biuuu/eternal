import React, { Component } from 'react'
import { Spin, Alert } from 'antd'
import styled from 'styled-components'

const Loading = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`

class Bundle extends Component {
  state = {
    // short for "module" but that's a keyword in js, so "mod"
    mod: null,
    status: 'init'
  }

  componentWillMount () {
    this.load(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  async load (props) {
    this.setState({
      status: 'loading'
    })
    try {
      const mod = await props.load()
      this.setState({ mod: mod.default ? mod.default : mod, status: 'loaded' })
    } catch (e) {
      this.setState({ status: 'failed', mod: null })
    }
  }

  render () {
    const components = []
    const Page = this.state.mod
    if (this.state.mod) {
      components.push(this.props.children(this.state.mod))
    }
    if (this.state.status === 'loading') {
      components.push(<Loading key="loading"><Spin /></Loading>)
    } else if (this.state.status === 'failed') {
      components.push(<Alert key="failed" message="页面加载失败，请刷新重试" />)
    }
    return components
  }
}

export default Bundle
