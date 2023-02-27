import React, { Component } from 'react'

export default class UserPage extends Component {
   //create state
    constructor(props){
        super(props)
        this.state={
          userData:"",
        };
    }
componentDidMount(){
    fetch("http://localhost:5000/userData",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        token:window.localStorage.getItem("token"),
      }),
    })
    .then((res)=>res.json())
    .then((data)=>{
    console.log(data,"userData");
    this.setState({userData:data.data});

    
    });
}


//Logout function
logOut=()=>{
    //clear data from local storage
    window.localStorage.clear();
    window.location.href="./sign-in";
};

render() {
    return(
        <div>
            Hello...<h1>{this.state.userData.fname}</h1>
            <br/>
            <button onClick={this.logOut} className="btn btn-primary">
                LOG OUT
            </button>

        </div>
    );
}
}