const express=require("express");
const app = express();
const mongoose=require("mongoose");
const cors=require("cors");
app.use(cors());

const redis=require("redis");
let redisClient;

//Redis connection
(async ()=>{
    redisClient=redis.createClient();
    redisClient.on('error',(error)=>console.log('Redis Error'+error));
    await redisClient.connect();
    console.log("Connected to redis server");
})();


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

    const {fname,lname,email,password,userType}=req.body;

    const encryptPassword=await bcrypt.hash(password,10);
    try{
        const oldUser=await User.findOne({email});
        
        if(oldUser){
           return res.json({error:"User Exists"});
           
        }

        await User.create({
            fname,
            lname,
            email,
            password:encryptPassword,
            userType
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

//import  Vehicle details Schema
require("./vehicleDetails");

const Vehicle=mongoose.model("VehicleInfo");
//Create register api
app.post("/vehicle_register",async(req,res)=>{

    const {base64,vehicleType,loadCapacity,passengerSeating,charges,chargesDaily}=req.body;

    
    try{
       

        await Vehicle.create({
            image:base64,
            vehicleType,
            loadCapacity,
            passengerSeating,
            charges,
            chargesDaily
        });
        res.send({status:"ok"});
        //alert("Registered successfully");
    }
    catch(error)
    {
        res.send({status:"error"});
        
    }
});

//fetch user data
app.get("/getAllUser",async(req,res)=>{
   try{
    const cachedData=await redisClient.get('getAllUser');
    if(cachedData){
      res.send(JSON.parse(cachedData));
       return;
    }
    else{

    
        const allUser=await User.find({});
        res.send({status:"ok",data:allUser});
        await redisClient.set('getAllUser',JSON.stringify(res));
        
       }   
    }
    catch(error){
        console.log(error);
    }
});

//fetch rental vehicle details
app.get("/getAllVehicle",async(req,res)=>{
    try{
        const allVehicle=await Vehicle.find({});
        res.send({status:"ok",data:allVehicle});
        
        
    }
    catch(error){
        console.log(error);
    }
});


//Delete user

app.post("/deleteUser",async(req,res)=>{
    const {userid} =req.body;
    try{
        User.deleteOne({_id:userid},function(err,res){
            console.log(err);

        });
        res.send({status:"Ok",data:"Deleted"});
    }
    catch(error){
        console.log(error);
    }
});

//shipment api

require("./shipmentDetails");
const Shipment=mongoose.model("ShipmentInfo");

app.post("/shipment_register",async(req,res)=>{

    const {fname,phone,addressFrom,addressTo,selectedShip,selectedService,dimensions}=req.body;
  
    
    try{

    await Shipment.create({
      fname,
      phone,
      addressFrom,
      addressTo,
      selectedShip,
      selectedService,
      dimensions
       });

        res.send({status:"ok"});
        
    }
    catch(error)
    {
        res.send({status:"error1"});
        
    }
});

//fetch shipment details
app.get("/getShipmentDetails",async(req,res)=>{
    const {id} =req.body;
    try{
        const shipmentDetails=await Shipment.find();
        res.send({status:"ok",data:shipmentDetails});
        
    }
    catch(error){
        console.log(error);
    }
});



//storage api
require("./storageDetails");
const Storage=mongoose.model("StorageInfo");

app.post("/storage_register",async(req,res)=>{

    const {fname,phone,storageType,dimensions,storageDate,storageDuration}=req.body;
  
    
    try{

    await Storage.create({
      fname,
      phone,
      storageType,
      dimensions,
      storageDate,
      storageDuration
      
       });

        res.send({status:"ok"});
        
    }
    catch(error)
    {
        res.send({status:"error1"});
        
    }
});


//fetch storage details
app.get("/getStorageDetails",async(req,res)=>{
    //const {userid} =req.body;
    try{
        const storageDetails=await Storage.find({});
        res.send({status:"ok",data:storageDetails});
        
    }
    catch(error){
        console.log(error);
    }
});


//parking api

require("./parkDetail");
const Parking=mongoose.model("ParkingInfo");

app.post("/park_register",async(req,res)=>{

    const {fname,phone,vehicleName,vehicleNumber,vehicleType,parkingDate,parkingDuration}=req.body;
  
    
    try{

    await Parking.create({
      fname,
      phone,
      vehicleName,
      vehicleNumber,
      vehicleType,
      parkingDate,
      parkingDuration
     
       });

        res.send({status:"ok"});
        
    }
    catch(error)
    {
        res.send({status:"error1"});
        
    }
});

//fetch park details
app.get("/getParkDetail",async(req,res)=>{
    const {userid} =req.body;
    try{
        const parkDetail=await Parking.find({});
        res.send({status:"ok",data:parkDetail});
        
    }
    catch(error){
        console.log(error);
    }
});




app.listen(5000,()=>{
    console.log("Server Started");
});