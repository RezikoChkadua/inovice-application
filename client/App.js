import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Login, Invoice, Registration, MainPage } from "./components";

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Login} />
          <Route path="/registration" component={Registration} />
          <Route path="/mainpage/:id" component={MainPage} />
          <Route path="/invoice/:id" component={Invoice} />
        </div>
      </Router>
    );
  }
}

export default App;
