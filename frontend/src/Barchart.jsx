import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    // D3.js code to create the bar chart
    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 60, left: 60 }; // Adjusted margins for labels

    // Calculate the inner width and height
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.topic))
      .range([0, innerWidth])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.intensity)])
      .nice()
      .range([innerHeight, 0]);

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.topic))
      .attr('y', (d) => y(d.intensity))
      .attr('height', (d) => innerHeight - y(d.intensity))
      .attr('width', x.bandwidth());

    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x))
      .append('text') // Add x-axis label
      .attr('x', innerWidth / 2)
      .attr('y', 40)
      .attr('fill', 'black')
      .text('Topics'); // Label for x-axis

    g.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y).ticks(5))
      .append('text') // Add y-axis label
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerHeight / 2)
      .attr('y', -45)
      .attr('fill', 'black')
      .text('Intensity'); // Label for y-axis

    // Cleanup function
    return () => {
      svg.selectAll('*').remove(); // Clear the chart when the component unmounts
    };
  }, [data]);

  return <svg id='barchart' ref={svgRef}></svg>;
};

export default BarChart;
