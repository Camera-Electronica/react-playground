import logo from './logo.svg';
import './App.css';
import React from 'react';
import Map from './components/map/Map';

function App() {
  return (
    <div className="App">

      <div className="Map">
        <h3>Interactive US Map</h3>
        <Map />
      </div>
    </div>

  );
}

export default App;


