// import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import "./App.css";
import BarChart from "./Barchart";
import Navbar from "./Navbar";
import ScatterPlot from "./Scatterplot";
import TabularData from "./TabularData";
import SectorFilter from "./SectorFilter";
// import { set } from "mongoose";


function App() {
  const [data, setData] = useState([]);
  const [sectors, setSector] = useState(new Set());
  const [country, setCountry] = useState(new Set());
  const [topic, setTopic] = useState(new Set());
  const [filter,setFilter] = useState("");
  const [filterValue,setFilterValue] = useState("")

  function getValue(value,filter){
    console.log("value is",value,filter)
    setFilter(filter);
    setFilterValue(value)
  }

  useEffect(() => {
    fetch(`http://localhost:8800/getdata?filter=${filter}&filterValue=${filterValue}`)
      .then((res) => res.json())
      .then((data) => {
  
        setData(data);
        data.map((e)=>{
          sectors.add(e.sector)
          country.add(e.country)
          topic.add(e.topic)
        })
        
        // console.log("sec",sectors)
        console.log("data", data);
      })
      .catch((err) => console.log(err));
  }, [filter,filterValue]);
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
      <SectorFilter 
        filter={topic} 
        typeOfFilter={"topic"}
        getValue={getValue}
      />
      
      <div id="body">
        <div id="tableBody">
          <TabularData data={data}></TabularData>
        </div>
        <div id="graphBody">
          <BarChart data={data} />
          <ScatterPlot data={data}></ScatterPlot>
        </div>
      </div>
    
     
    </div>
  );
}

export default App;
