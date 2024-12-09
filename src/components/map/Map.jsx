import React, { useEffect, useState } from 'react';
import MapSvg from './MapSvg';
import './Map.css';

const Map = (props) => {
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
      <MapSvg props={props}
        usStates={usStates}
        usCounties={usCounties}
        selectedState={selectedState}
        setSelectedState={setSelectedState}
        setSelectedCounty={setSelectedCounty}
      />
      <div>
        <p>Selected State: {selectedState?.properties.NAME || 'None'}</p>
        <p>Selected County: {selectedCounty?.properties.NAME || 'None'}</p>
      </div>
    </div>
  );
};

export default Map;