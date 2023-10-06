import React from 'react';

function SectorFilter(props) {
    const {filter,typeOfFilter}=props
  // Convert the Set to an array
  const sectorArray = Array.from(filter);

  return (
    <select id="sectorFilter">
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
