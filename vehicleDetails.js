const mongoose=require("mongoose");

const VehicleDetailsSchema=new mongoose.Schema(
    {
        vehicleType:String,
        loadCapacity:Number,
        passengerSeating:Number,
        charges:Number,
        chargesDaily:Number,
    },
    {
        collection:"VehicleInfo",
    }
);

mongoose.model("VehicleInfo",VehicleDetailsSchema);