import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Bundle from './components/Bundle'

const loadAlice = () => import('./pages/alice/')
const loadMio = () => import('./pages/mio/')

const asyncComptMap = { alice: loadAlice, mio: loadMio }

const AsyncComponent = ({ name, ...props }) => (
  <Bundle load={asyncComptMap[name]}>
    {(Compt) => <Compt {...props} key={name} />}
  </Bundle>
)

const AsyncRoute = ({ name, ...rest }) => (
  <Route {...rest} render={props => (
    <AsyncComponent {...props} name={name} />
  )}/>
)

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <AsyncRoute exact path="/" name="mio" />
          <AsyncRoute path="/alice" name="alice" />
        </Switch>
      </Router>
    )
  }
}

export default App
