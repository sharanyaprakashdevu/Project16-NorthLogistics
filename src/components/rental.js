import React, { Component,useEffect,useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'



export default function Rental(){

    const [data,setData]=useState([]);
    const [allImage,setAllImage]=useState("");
    useEffect(()=>{
        fetch("http://localhost:5000/getAllVehicle",{
          method:"GET"         
        })
        
    .then((res)=>res.json())
    .then((data)=>{
    console.log(data,"vehicleData");
    setData(data.data);
    
    });
},[]);


return(
    <div>
         <nav className="navbar navbar-expand-lg navbar-light fixed-top">
           <div className="container">
              <Link className="navbar-brand" to={'/sign-in'}>
                North Logistic
              </Link>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={'/userPage'}>
                     Home
                    </Link>
                  </li>
  
                  <li className="nav-item">
                    <Link className="nav-link" to={'/addShipment'}>
                    Shipment
                    </Link>
                  </li>
  
                  <li className="nav-item">
                    <Link className="nav-link" to={'/sign-up'}>
                      Storage
                    </Link>
                  </li>
  
                  <li className="nav-item">
                    <Link className="nav-link" to={'/sign-up'}>
                      Parking
                    </Link>
                  </li>
  
                </ul>
              </div>
              </div>
           </nav>
           
    
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
                       <td><img width={100} height={100} scr={i.image}/></td>   
                      
                      <td>{i.vehicleType}</td>
                      <td>{i.loadCapacity}</td>
                      <td>{i.passengerSeating}</td>
                      <td>{i.charges}</td>
                      <td>{i.chargesDaily}</td>

                  </tr>
                          
                    )
                })}

            </table>
        </div>
    </div>
    </div>
)
}