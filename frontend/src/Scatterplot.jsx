import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ScatterPlot = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    // D3.js code to create the scatter plot
    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    // Calculate the inner width and height
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Define scales for X and Y axes
    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.relevance)]) // Adjust the domain as needed
      .nice()
      .range([0, innerWidth]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.likelihood)]) // Adjust the domain as needed
      .nice()
      .range([innerHeight, 0]);

    // Create the scatter plot points
    svg
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d.relevance))
      .attr('cy', (d) => y(d.likelihood))
      .attr('r', 5) // Adjust the radius as needed
      .style('fill', 'blue'); // Adjust the color as needed

    // Create X and Y axes
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(xAxis);

    svg
      .append('g')
      .attr('class', 'y-axis')
      .call(yAxis);

     // Add X-axis label
     svg
     .append('text')
     .attr('class', 'x-label')
     .attr('x', innerWidth / 2)
     .attr('y', height - 5)
     .attr('text-anchor', 'middle')
     .text('Relevance');

   // Add Y-axis label
   svg
     .append('text')
     .attr('class', 'y-label')
     .attr('x', -innerHeight / 2)
     .attr('y', -margin.left + 30)
     .attr('text-anchor', 'middle')
     .attr('transform', 'rotate(-90)')
     .text('Likelihood');

    // Cleanup function
    return () => {
      svg.selectAll('*').remove(); // Clear the chart when the component unmounts
    };
  }, [data]);

  return <svg id='scatterplot' ref={svgRef}></svg>;
};

export default ScatterPlot;
