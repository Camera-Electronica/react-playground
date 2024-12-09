import React, { useEffect, useState } from 'react';
import MapSvg from './mapSvg';
import './Map.css';

const Map = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [usStates, setUsStates] = useState(null);
  const [usCounties, setUsCounties] = useState(null);

  useEffect(() => {
    import('./data/us-states.json').then((data) => setUsStates(data));
  }, []);

  useEffect(() => {
    import('./data/us-counties.json').then((data) => setUsCounties(data));
  }, []);

  return (
    <div>
      <MapSvg
        usStates={usStates}
        usCounties={usCounties}
        selectedState={selectedState}
        setSelectedState={setSelectedState}
        setSelectedCounty={setSelectedCounty}
      />
      <div>
        <h3>Selected State: {selectedState?.properties.NAME || 'None'}</h3>
        <h3>Selected County: {selectedCounty?.properties.NAME || 'None'}</h3>
      </div>
    </div>
  );
};

export default Map;