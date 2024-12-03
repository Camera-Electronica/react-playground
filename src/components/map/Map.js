import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { geoPath, geoAlbersUsa } from 'd3-geo';
import './Map.css'

const Map = () => {
  const svgRef = useRef();
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [usStates, setUsStates] = useState(null);
  const [usCounties, setUsCounties] = useState(null);

  // Dynamic import the Geo JSON data for states...
  useEffect(() => {
    const loadData = () => import('./data/us-states.json')
      .then((value) => setUsStates(value));
    loadData();
  }, []);

  // Dynamic import the Geo JSON data for counties...
  useEffect(() => {
    const loadData = () => import('./data/us-counties.json')
      .then((value) => setUsCounties(value));
    loadData();
  }, []);

  // Init render context
  const svg = d3.select(svgRef.current);
  const width = 960;
  const height = 600;

  const projection = geoAlbersUsa().translate([width / 2, height / 2]).scale(1000);
  const path = geoPath().projection(projection);

  // Render States & select on click
  useEffect(() => {

    svg.selectAll('path')
      .data(usStates?.features || [])
      .enter()
      .append('path')
      .attr('d', path)
      .attr('fill', '#ccc')
      .attr('stroke', '#333')
      .on('click', (event, d) => {
        setSelectedState(d);
      });
  });

  // Render Counties only for selected state
  useEffect(() => {

    // How to find all Counties in a State
    const selectStateCounties = (state) =>
      usCounties?.features?.filter(
        county => county.properties.STATE_NAME === state.properties.NAME
      ) || [];

    // How to render Counties and select on click
    const renderCounties = (counties, path, svg) => {
      svg.selectAll('.county').remove();

      svg.selectAll('.county')
        .data(counties)
        .enter()
        .append('path')
        .attr('class', 'county')
        .attr('d', path)
        .attr('fill', '#aaa')
        .attr('stroke', '#666')
        .on('click', (event, d) => {
          setSelectedCounty(d);
        });
    };

    // Filter counties & render, based on selected state
    if (selectedState) {
      const counties = selectStateCounties(selectedState);
      renderCounties(counties, path, svg);
    }

  });

  return (
    <div>
      <svg ref={svgRef} width="960" height="600"></svg>
      <div>
        <p>Selected State: {selectedState?.properties.NAME || 'None'}</p>
        <p>Selected County: {selectedCounty?.properties.NAME || 'None'}</p>
      </div>
    </div>
  );
};

export default Map;
