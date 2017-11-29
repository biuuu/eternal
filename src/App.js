import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Alice from './pages/alice/'

class App extends Component {
  render() {
    return (
      <Router>
          <Route exact path="/alice" component={Alice}/>
      </Router>
    )
  }
}

export default App
