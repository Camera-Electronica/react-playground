import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { geoPath, geoAlbersUsa } from 'd3-geo';

const MapSvg = ({ props, usStates, usCounties, selectedState, setSelectedState, setSelectedCounty }) => {
  const svgRef = useRef();
  const width = props.width || 960;
  const height = props.height || 600;
  const scale = props.scale || 1000;
  const projection = geoAlbersUsa().translate([width / 2, height / 2]).scale(scale);
  const path = geoPath().projection(projection);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Render states
    svg.selectAll('.state').remove();
    svg.selectAll('.state')
      .data(usStates?.features || [])
      .enter()
      .append('path')
      .attr('class', 'state')
      .attr('d', path)
      .attr('fill', '#ccc')
      .attr('stroke', '#333')
      .on('click', (event, d) => setSelectedState(d));

    // Render counties if a state is selected
    if (selectedState) {
      const stateCounties = usCounties?.features?.filter(
        county => county.properties.STATE_NAME === selectedState.properties.NAME
      ) || [];

      svg.selectAll('.county').remove();
      svg.selectAll('.county')
        .data(stateCounties)
        .enter()
        .append('path')
        .attr('class', 'county')
        .attr('d', path)
        .attr('fill', '#aaa')
        .attr('stroke', '#666')
        .on('click', (event, d) => setSelectedCounty(d));
    }
  }, [usStates, usCounties, selectedState, setSelectedState, setSelectedCounty, path]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default MapSvg;