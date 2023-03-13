import React, { Component,useEffect,useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

export default function UserHome({ userData }){
    const logOut=()=>{
        //clear data from local storage
        window.localStorage.clear();
        window.location.href="./sign-in";
    };
    
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
                    <Link className="nav-link" to={'/addShipment'}>
                      Shipment
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
        
          <div>
              Hello...<h1>{userData.fname}</h1>
              <br/>
              <button onClick={logOut} className="btn btn-primary">
                  LOG OUT
              </button>
  
          </div>
        </div>
      );
}