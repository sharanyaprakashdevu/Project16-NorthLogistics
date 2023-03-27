import React, { Component,useEffect,useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
//import Parking from './parking'

require("./parking");
export default function ViewParking(){
    const [data, setData] = useState([]);

    useEffect(()=>{
        
       
    fetch("http://localhost:7000/getParkDetail",{
            method:"GET"         
          })
          
      .then((res)=>res.json())
      .then((data)=>{
      console.log(data,"parkDetail");
      setData(data.data);
      
    });
},[]);
    



return(
<div className="auth-wrapper">
        <div style={{width:"auto"}}>
            <h2>Vehicle Info</h2>
            <table style={{width:500}}>
                <tr>
                <th>Vehicle Image</th>
                <th>Vehicle Type</th>
                <th>Load Capacity</th>
                <th>Passenger Seating</th>
                <th>4 Hours charge</th>
                <th>Daily charge</th>
                </tr>

            {data.map(i=>{
                   
                  return(

                 
                     <tr>
                      
                     <td> {i.fname}</td>
                      <td>{i.phone}</td>
                     <td>{i.vehicleName}</td>
                     <td> {i.vehicleNumber}</td>
                     <td> {i.vehicleType}</td>
                     <td> {i.parkingDate}</td>
                     <td> {i.parkingDuration}</td>
             
                    </tr>
                          
                    )
         })}
        </table>
        </div>
    </div>   
)          
 }
