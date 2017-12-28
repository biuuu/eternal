import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loading from './components/ScreenLoading'
import Loadable from 'react-loadable'

const AsyncAlice = Loadable({
  loader: () => import('./pages/alice/'),
  loading: Loading
})

const AsyncMio = Loadable({
  loader: () => import('./pages/mio/'),
  loading: Loading
})

const AsyncFeather = Loadable({
  loader: () => import('./pages/feather/'),
  loading: Loading
})

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={AsyncMio} />
          <Route path="/alice" component={AsyncAlice} />
          <Route path="/feather" component={AsyncFeather} />
        </Switch>
      </Router>
    )
  }
}

export default App
