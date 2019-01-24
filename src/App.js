import React, { Component } from 'react';
import CountriesPanel from "./containers/CountriesPanel/CountriesPanel";

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <CountriesPanel />
      </div>
    );
  }
}

export default App;
