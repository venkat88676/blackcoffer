// import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import * as d3 from 'd3';
import "./App.css";
import BarChart from "./Barchart";
import Navbar from "./Navbar";
import ScatterPlot from "./Scatterplot";
import TabularData from "./TabularData";
import SectorFilter from "./SectorFilter";
import PieChart from "./Piechart";
// import { set } from "mongoose";

function App() {
  const sectorCounts = {};
  const sectors = new Set();
  const country = new Set();
  const topic = new Set();

  const [data, setData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [filter, setFilter] = useState("");
  const [filterValue, setFilterValue] = useState("");

  function getValue(value, filter) {
    console.log("value is", value, filter);
    setFilter(filter);
    setFilterValue(value);
  }

  useEffect(() => {
    fetch(
      `http://localhost:8800/getdata?filter=${filter}&filterValue=${filterValue}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);

        data.map((e) => {
          let obj = {};
          if (sectorCounts[e.sector]) {
            sectorCounts[e.sector]++;
          } else {
            sectorCounts[e.sector] = 1;
          }
          let a = Object.entries(sectorCounts).map(([sector, value]) => ({
            sector,
            value,
          }));
          setPieChartData(a);

          sectors.add(e.sector);
          country.add(e.country);
          topic.add(e.topic);
        });

        // console.log("sec",sectors)
        // console.log("data", data);
      })
      .catch((err) => console.log(err));
  }, [filter, filterValue]);

  return (
    <div className="App">
      <Navbar></Navbar>
      <SectorFilter
        filter={sectors}
        typeOfFilter={"sector"}
        getValue={getValue}
      />
      <SectorFilter
        filter={country}
        typeOfFilter={"country"}
        getValue={getValue}
      />
      <SectorFilter filter={topic} typeOfFilter={"topic"} getValue={getValue} />

      <div id="body">
        <div id="tableBody">
          <TabularData data={data}></TabularData>
        </div>
        <div id="graphBody">
          <div>  

            <PieChart data={pieChartData} width={400} height={400}></PieChart>

            <div className="label-container" >
                {pieChartData.map((entry, index) => (
                  <div key={index} >
                    <span
                      className="color-code"
                      style={{ backgroundColor: d3.schemeCategory10[index] } }
                    ></span>
                    {entry.sector}
                  </div>
                ))}
              </div>
          </div>
          
          <BarChart data={data} />
          <ScatterPlot data={data}></ScatterPlot>
        </div>
      </div>
    </div>
  );
}

export default App;
