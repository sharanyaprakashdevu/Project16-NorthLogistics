const express=require("express");
const app = express();
const mongoose=require("mongoose");
const cors=require("cors");
app.use(cors());

app.use(express.json());
const bcrypt=require("bcryptjs");

//var popup=require("popups");

//import web token
const jwt=require("jsonwebtoken");
//assign random numbers or characters for decrypting
const JWT_SECRET="fghyt34567()?[]jmhuynbvfti";

//Database connection
const mongoUrl="mongodb+srv://sharanya:12345@cluster0.ocxbpg7.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoUrl,{
   
    useNewUrlParser:true
    
}).then(()=>{console.log("Connected to Database");})
.catch(e=>console.log(e));




//import Schema
require("./userDetails");

const User=mongoose.model("UserInfo");
//Create register api
app.post("/register",async(req,res)=>{

    const {fname,lname,email,password}=req.body;
    const encryptPassword=await bcrypt.hash(password,10);
    try{
        const oldUser=await User.findOne({email});
        if(oldUser){
           return res.json({error:"User Exists"});
           
        }//alert("Already registered");
        //create new user
        await User.create({
            fname,
            lname,
            email,
            password:encryptPassword,
        });
        res.send({status:"ok"});
        //alert("Registered successfully");
    }
    catch(error)
    {
        res.send({status:"error"});
        
    }
});

//Create login api
app.post("/login-user",async(req,res)=>{
    //get email and password
    const{email,password}=req.body;

    //Check if user exist or not
    const user=await User.findOne({email});

    if(!user){
        return res.json({error:"User Not Found"});
    }

    //decrypt password
    if(await bcrypt.compare(password,user.password)){
        //create token if user has succefully logged in
        const token=jwt.sign({email:user.email},JWT_SECRET);
       

        if(res.status(201)){
            return res.json({status:"ok",data:token});
        }
        else{
            return res.json({status:"error"});
        }
    }
    return res.json({status:"Invalid"})
});


//Get user data
app.post("/userData",async(req,res)=>{
    const{token}=req.body;
    try{
        const user=jwt.verify(token,JWT_SECRET);
        console.log(user);
       
        const useremail=user.email;
        User.findOne({email:useremail})
        .then((data)=>{
            res.send({status:"ok",data:data});

        })
        .catch((error)=>{
            res.send({status:"error",data:error});
        });
    }catch(error){
        
    }
});


app.listen(5000,()=>{
    console.log("Server Started");
});