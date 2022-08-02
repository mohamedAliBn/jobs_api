const mongoose=require("mongoose");
const bcrypt=require("bcryptjs")
const jwt =require("jsonwebtoken");
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide name"],
        trim:true,
        maxLength:20
    },email:{
        type:String,
        required:[true,"Please provide email"],
        trim:true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide Email"
        ],
        unique:true
    },
    password:{
        required:[true,"Please provide password"],
        type:String
    }
})
UserSchema.pre("save",async function(next){
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
})

UserSchema.methods.createJWT=function(){
    return jwt.sign({userId:this._id,name:this.name},process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_LIFITIME})
}
UserSchema.methods.comparePassword=async function(pass) {
    const isMatch=await bcrypt.compare(pass,this.password)
    return isMatch;
}
const User=mongoose.model("User",UserSchema);
module.exports=User;