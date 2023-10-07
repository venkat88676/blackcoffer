import React, { useEffect, useState } from "react";

const TabularData = ({ data }) => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    setTableData(data);
  }, [data]);
//   console.log("tabledata",tableData)
  return (
    <div>
      <table >
        <thead>
          <tr>
            <th>Title</th>
            <th>Topic</th>
            <th>Sector</th>
            <th>Relevance</th>
            <th>Country</th>
            <th>Intensity</th>
          </tr>
        </thead>
        <tbody>
            {tableData.map((elem,index)=>{
                return(
                    <tr key={index}>
                        <td>{elem.title}</td>
                        <td>{elem.topic}</td>
                        <td>{elem.sector}</td>
                        <td>{elem.relevance}</td>
                        <td>{elem.country}</td>
                        <td>{elem.intensity}</td>
                    </tr>
                )
               
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TabularData;
