
import React, { Component,useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import{FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";
//import Park from './park'
//import React from 'react'
//import Select from 'react-select'

export default function Parking() {

  //Get values
  const [fname, setfname] = useState("");
  const [phone, setphone] = useState("");
  const [vehicleName, setvehicleName] = useState("");
  const [vehicleNumber, setvehicleNumber] = useState("");
  const [vehicleType, setvehicleType] = useState("");
  const [parkingDate,setparkingDate]=useState("");
  const [parkingDuration,setparkingDuration]=useState("");

  //const [additional,setadditional]=useState("")

  
  //Submit function
  const handleSubmit=(e)=>{
    e.preventDefault();
    
    console.log(fname,phone,vehicleName,vehicleNumber,vehicleType,parkingDate,parkingDuration);
    fetch("http://localhost:5image.png000/park_register",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
      fname,
      phone,
      vehicleName,
      vehicleNumber,
      vehicleType,
      parkingDate,
      parkingDuration
    
        
      }),
    })
    .then((res)=>res.json())
    .then((data)=>{
     console.log(data,"parkRegister");
    

    if(data.status=="ok"){
      alert("Parking details added successfully");
      //window.localStorage.setItem("token",data.data);
      window.location.href ="./viewParking";
      }
      else{
        alert("Already Exist");
      }
    });
    
  }

 
    return (
      <div >
    

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
                    <Link className="nav-link" to={'/rental'}>
                      Rental
                    </Link>
                  </li>
  
                  <li className="nav-item">
                    <Link className="nav-link" to={'/sign-up'}>
                      Storage
                    </Link>
                  </li>
  
                  <li className="nav-item">
                    <Link className="nav-link" to={'/addShipment'}>
                      Shipment
                    </Link>
                  </li>
  
                </ul>
              </div>
              </div>
           </nav>


      <div class="auth-inners">
      <form onSubmit={handleSubmit} style={{width:"auto"}}>
        <h3>Book Your Parking In Seconds !!! </h3>
        
        <div className="mb-3">
          <label>Name </label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            //access values
            onChange={(e)=>setfname(e.target.value)}
          />
        </div>
       
        <div className="mb-3">
          <label>Email / Number</label>
          <input type="phone"
          className="form-control" 
          placeholder="Email / Number"
          onChange={(e)=>setphone(e.target.value)} />
        </div>

        <div className="mb-3">
          <label>Vehicle Name</label>
          <input type="text"
            className="form-control"
            placeholder="Vehicle Name"
            onChange={(e)=>setvehicleName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Vehicle Number</label>
          <input type="text"
            className="form-control"
            placeholder="Vehicle Number"
            onChange={(e)=>setvehicleNumber(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Vehicle Type</label>
          <input type="text"
            className="form-control"
            placeholder="Vehivle Type"
            onChange={(e)=>setvehicleType(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Parking Date</label>
          <input type="date"
            className="form-control"
            placeholder="Parking Date"
            onChange={(e)=>setparkingDate(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Parking Duration</label>
          <input type="number"
            className="form-control"
            placeholder="Parking Duration"
            onChange={(e)=>setparkingDuration(e.target.value)}
          />
        </div>
 
        
        <div className="d-grid">
          
          <button type="submit" className="btn btn-primary" >
            Check For Parking
          </button>
          
        </div>
        
      </form>
      </div>  

      
</div>    


    )
  }
