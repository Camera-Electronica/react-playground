import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { geoPath, geoAlbersUsa } from 'd3-geo';
import usStates from './data/us-states.json'; // Your GeoJSON data for states
import usCounties from './data/us-counties.json'; // Your GeoJSON data for counties
import './Map.css'

const Map = () => {
    const svgRef = useRef();
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCounty, setSelectedCounty] = useState(null);
  
    useEffect(() => {
      const svg = d3.select(svgRef.current);
      const width = 960;
      const height = 600;
  
      const projection = geoAlbersUsa().translate([width / 2, height / 2]).scale(1000);
      const path = geoPath().projection(projection);
  
      svg.selectAll('path')
        .data(usStates.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', '#ccc')
        .attr('stroke', '#333')
        .on('click', (event, d) => {
          setSelectedState(d);
          // Filter counties based on selected state
          const counties = usCounties.features.filter(
            county => county.properties.STATE_NAME === d.properties.NAME
          );
          renderCounties(counties, path, svg);
        });
  
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
    }, []);
  
    return (
      <div>
        <svg ref={svgRef} width="960" height="600"></svg>
        <div>
          <h3>Selected State: {selectedState?.properties.NAME || 'None'}</h3>
          <h3>Selected County: {selectedCounty?.properties.NAME || 'None'}</h3>
        </div>
      </div>
    );
  };
  
  export default Map;
  