import React from 'react'

const TabularData = ({data}) => {
    let tableCont=document.getElementById("tableCont")
    data.map((element)=>{
        let tr=document.createElement("tr")
        let html=`
        <tr>
            <td >${element.title}</td>
            <td>${element.topic}</td>
            <td>${element.sector}</td>
            <td>${element.relevance}</td>
            <td>${element.country}</td>
            <td>${element.intensity}</td>               
        </tr>
        `
        tr.innerHTML=html
        tableCont.append(tr)

    })
  return (
    <div >
        <table id='tableCont'>
            <tr>
                <th>Title</th>
                <th>Topic</th>
                <th>Sector</th>
                <th>Relevance</th>
                <th>Country</th>
                <th>Intensity</th>               
            </tr>
        </table>
    </div>
  )
}

export default TabularData