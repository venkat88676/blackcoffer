// import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import "./App.css";
import BarChart from "./Barchart";
import Navbar from "./Navbar";
import ScatterPlot from "./Scatterplot";


function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8800/getdata")
      .then((res) => res.json())
      .then((data) => {
  
        setData(data);
        console.log("data", data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="App">
      <Navbar></Navbar>
      <BarChart data={data} />
      <ScatterPlot data={data}></ScatterPlot>
    </div>
  );
}

export default App;
