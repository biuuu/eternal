import React from 'react'
import { Spin } from 'antd'
import styled from 'styled-components'

const ScLoading = styled.div`
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

const Loading = (props) => {
  if (props.error) {
    return <ScLoading><span>加载页面失败</span></ScLoading>
  } else if (props.pastDelay) {
    return <ScLoading><Spin /></ScLoading>
  } else {
    return null
  }
}

export default Loading
