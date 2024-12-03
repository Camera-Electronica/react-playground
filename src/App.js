import logo from './logo.svg';
import './App.css';
import React from 'react';
import Map from './components/map/Map';
import Canvas from './components/canvas/Canvas';
import Particles from "./components/shapes/Particles";

function App() {
  const width = 800;
  const height = 600;
  const particles = Particles(width, height, 3, 10);

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

      <hr />
      
      <div className="Canvas">
        <h3>Canvas animation in React</h3>
        <Canvas move={particles.moveAll} draw={particles.drawAll} width={width} height={height} style={{ border: '1px solid black' }} />
      </div>
    </div>

  );
}

export default App;


