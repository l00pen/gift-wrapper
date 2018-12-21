import React, { Component } from 'react';

import Gift from './Gift';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Gift />
        </header>
      </div>
    );
  }
}

export default App;
