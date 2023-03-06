import React, { Component,useEffect,useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

export default function Users(){

    const [data,setData]=useState("");
    useEffect(()=>{
        fetch("http://localhost:5000/getAllUser",{
          method:"GET"         
        })
        
    .then((res)=>res.json())
    .then((data)=>{
    console.log(data,"userData");
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
                    <Link className="nav-link" to={'/addVehicle'}>
                      Add Vehicle
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
            <h2>User Info</h2>
            <table style={{width:500}}>
                <tr>
                <th>Name</th>
                <th>Email</th>
                <th>User Type</th>
                
                </tr>
                {data.map((i)=>{
                    return(
                        <tr>
                            <td>{i.fname}</td>
                            <td>{i.email}</td>
                            <td>{i.userType}</td>
                           

                        </tr>
                    );
                })}
            </table>
        </div>
    </div>
    </div>
)
}