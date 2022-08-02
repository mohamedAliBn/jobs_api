const mongoose=require("mongoose");

const JobSchema=new mongoose.Schema({
    company:{
        type:String,
        required:[true,"Please provide company"],
        trim:true,
        maxLength:50
    },position:{
        type:String,
        trim:true,
        maxLenth:30,
        required:[true,"provide position"]
    },status:{
        type:String,
        enum:["interview","declined","pending"],
        default:"pending",
    },
    createdBy:{
            type:mongoose.Types.ObjectId,
            ref:"User",
            required:[true,"Please provide user Id"]
    }
},{timestamps:true})

const Job=mongoose.model("Jobs",JobSchema);
module.exports=Job;