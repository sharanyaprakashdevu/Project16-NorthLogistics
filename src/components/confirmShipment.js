import React, { Component,useEffect,useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import AddShipment from './addShipment'

export default function ConfirmShipment(){
    const [fname, setfname] = useState("");

    return(
        <div>
            helllo{fname}
           
        </div>
    )
}