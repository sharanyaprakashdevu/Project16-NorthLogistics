import React, { Component,useEffect,useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'



export default function ViewStorage(){

  const [data,setData]=useState([]);
  const [allImage,setAllImage]=useState("");
  useEffect(()=>{
      fetch("http://localhost:5000/getStorageDetails",{
        method:"GET"         
      })
      
  .then((res)=>res.json())
  .then((data)=>{
  console.log(data,"StorageDetails");
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
                <th>First Name</th>
                <th>Phone</th>
                <th>Storage Type</th>
                <th>Dimensions</th>
                <th>Storage Date</th>
                <th>Storage Duration</th>
                </tr>
                
                {data.map(i=>{
                    return(
                  
                      <tr>
                       
                      
                      <td>{i.fname}</td>
                      <td>{i.phone}</td>
                      <td>{i.storageType}</td>
                      <td>{i.dimensions}</td>
                      <td>{i.storageDate}</td>
                      <td>{i.storageDuration}</td>

                  </tr>
                          
                    )
                })}


            </table>
        </div>
    </div>
    </div>
)
}