import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/cat/123">Cat</Link></li>
          </ul>

          <hr/>

          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/cat/:id" component={Cat}/>
        </div>
      </Router>
    );
  }
}

const Home = () => 'Home'
const About = () => 'About'
const Cat = ({ match }) => `cat ${match.params.id}`

export default App
