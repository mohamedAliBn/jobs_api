require("dotenv").config();

const express=require("express");
const app=express();

const connectDB=require("./db/connect");
const authRouter=require("./routes/user");
const jobRouter=require("./routes/job");
const authorization=require("./middlewares/authorization");
//middleware
app.use(express.json());

//routes
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/jobs",authorization,jobRouter);
// app.use("/",(req,res)=> {
//     res.send("<h1>jobs api</h1>")
// })
// connect to db
const port=process.env.PORT || 8080;

const start=async function(){
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>console.log("connect to the db"));
    } catch (error) {
        console.log(error)
    }
}

start();