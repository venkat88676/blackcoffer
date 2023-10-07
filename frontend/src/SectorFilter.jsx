import React, {useState} from 'react';


function SectorFilter(props) {  

  const {filter,typeOfFilter,getValue}=props

  const sectorArray = Array.from(filter);

  // console.log("filterrr",filter)
  return (
    <select id="sectorFilter" onChange={(e)=>{    
        getValue(e.target.value,typeOfFilter)
    }}>
      <option value="">Choose {typeOfFilter}</option>
      {sectorArray.map((sector, index) => (
        <option key={index} value={sector}>
          {sector}
        </option>
      ))}
    </select>
  );
}

export default SectorFilter;
