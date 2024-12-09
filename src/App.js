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

      <div className="Map">
        <h3>Interactive US Map</h3>
        <Map width={width} height={height} scale={1000} />
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


