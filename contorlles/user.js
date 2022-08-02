const User=require("./../models/User")

const register=async (req,res)=> {
    const {name,password,email}=req.body;
    if(!name || !password || !email) {
        return res.status(404).json({error:"Plese provid name,email and password"});
    }
    try {
        //create a new user
        const user=await User.create(req.body);
        // create token for the current user
        const token=user.createJWT();
        res.status(200).json({user,token});
    }catch(error) {
        res.status(500).json({error})
    }
}

const login=async (req,res)=> {
    const {email,password}=req.body;
    if(!email || !password) {
        return res.status(404).json({error:"Please provide email and password"});
    }
    // find the user using email
    const user=await User.findOne({email});
    if(!user) {
        return res.status(404).json({error:`there is no user with the email :${email}`});
    }
    // cheek if the password is correct;
    const isCorrectPassword=await user.comparePassword(password)
    if(!isCorrectPassword) {
        return res.status(400).json({error:`invalid password`})
    }

    // create token
    const token=user.createJWT();
    res.status(200).json({user,token})
}

module.exports={
    register,
    login
}