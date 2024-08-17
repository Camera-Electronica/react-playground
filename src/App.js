import logo from './logo.svg';
import './App.css';
import React from 'react';
import Map from './components/map/Map';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <div className="Map">
        <h3>Interactive US Map</h3>
        <Map />
      </div>
    </div>

  );
}

export default App;


