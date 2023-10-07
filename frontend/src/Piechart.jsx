import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data, width, height }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const radius = Math.min(width, height) / 2;
    const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const g = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`);

    const arcs = g.selectAll('.arc').data(pie(data)).enter().append('g');

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(i))
      .attr('stroke', 'white')
      .attr('stroke-width', 2);

    // Labels inside the pie chart
    // arcs
    //   .append('text')
    //   .attr('transform', (d) => `translate(${arc.centroid(d)})`)
    //   .attr('dy', '0.35em')
    //   .attr('text-anchor', 'middle')
    //   .text((d) => d.data.sector);

  }, [data, width, height]);

  return (
    <div>
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  );
};

export default PieChart;
