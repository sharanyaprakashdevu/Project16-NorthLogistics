import React, { Component,useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import{FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";
//import {DateRangePickerComponent} from '@syncfusion/ej2-react-calendars';

export default function Storage(){

    const [fname, setfname] = useState("");
    const [phone, setphone] = useState("");


    const[storageType,setstorageType]=useState("");
    const [selectedStorage,setSelectedStorage]=useState(false);
    const options=['Boxes/Bags','Pallets','Machinery','Containers','box']

    const [dimensions, setdimensions] = useState("");
    const [storageDate, setstorageDate] = useState("");
    const [storageDuration, setstorageDuration] = useState("");
    

    //Submit function
  const handleSubmit=(e)=>{
    e.preventDefault();
    
    console.log(fname,phone,storageType,dimensions,storageDate,storageDuration);
    fetch("http://localhost:5000/storage_register",{
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
      storageType,
      dimensions,
      storageDate,
      storageDuration
      
    
        
      }),
    })
    .then((res)=>res.json())
    .then((data)=>{
     console.log(data,"storageRegister");
    

    if(data.status=="ok"){
      alert("Storage details added successfully");
      //window.localStorage.setItem("token",data.data);
      window.location.href ="./storage";
      }
      else{
        alert("Already Exist");
      }
    });
    
  }
    
    return (
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
                      <Link className="nav-link" to={'/sign-up'}>
                        Parking
                      </Link>
                    </li>
    
                  </ul>
                </div>
            </div>
            </nav>


    <div style={{width:"auto"}}>
      <form onSubmit={handleSubmit} style={{width:"auto"}}>
        <h3>Storage</h3>
        
        <div className="mb-3">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            //access values
            onChange={(e)=>setfname(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Phone</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            //access values
            onChange={(e)=>setphone(e.target.value)}
          />
        </div>

        <div className="dropdown" >
        <label>Storage Type</label>
          <div className="dropdown-btn" onClick={e=> 
            setSelectedStorage(!selectedStorage)}>
             
            {storageType}
            <span className="fas fa-caret-down" ></span>
            <FontAwesomeIcon icon={faCaretDown}/>
          </div>
          {selectedStorage &&(
          <div className="dropdown-content">
            {options.map(option=>(

                      <div onClick={e=>{
                        setstorageType(option)
                        setSelectedStorage(false)
                      }
                     } className="dropdown-item">
                        {option}
                        
                      </div>
            ))}     
          </div>
          )}
        </div>

        <div className="mb-3">
          <label>Dimensions</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            //access values
            onChange={(e)=>setdimensions(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Storage Date</label>
          
          <input
            type="date"
            className="form-control"
            placeholder="First name"
            //access values
            onChange={(e)=>setstorageDate(e.target.value)}
          />
        </div>
        

        <div className="mb-3">
          <label>Storage Duration</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            //access values
            onChange={(e)=>setstorageDuration(e.target.value)}
          />
        </div>

        <div className="d-grid">
          
          <button type="submit" className="btn btn-primary" >
            Confirm Storage
          </button>
          
        </div>
        


        </form>
 </div>
 </div>
             )
}