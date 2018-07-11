import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { Login } from "./components";
import { Registration } from "./components";
import { MainPage } from './components'

class App extends Component {


  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Login} />
          <Route path="/registration" component={Registration} />
          <Route path="/mainpage/:id" component={MainPage} />
        </div>
      </Router>

    );
  }
}

export default App;
