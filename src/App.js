import React, { Component } from 'react';
import {
  BrowserRouter
} from 'react-router-dom';
import Layout from './components/layout/Layout.js'
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
        
    }
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
