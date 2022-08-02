const Job=require("../models/Job")

const getAllJobs=async function(req,res){

    try{
        const jobs=await Job.find({}).sort("createdAt");
        res.status(200).json({jobs,count:jobs.length})
    }catch(error) {
        res.status(500).json({error})
    }
}

const getSingleJob=async (req,res)=> {
    const {
        params:{jobId},
        user:{userId}
    }=req
    try{
        const job=await Job.findOne({_id:jobId,createdBy:userId})
        res.status(200).json({job})
    }catch (error) {
        res.status(500).json({error})
    }
}

const updateJob=async (req,res)=> {
    const {
        params:{jobId},
        user:{userId},
        body:{company,position}
    }=req
    if(!company || !position ){
        return res.status(404).json({error:'Please provide company and position'})
    }
    try {
        const job=await Job.findOneAndUpdate({_id:jobId,createdBy:userId},req.body,{new:true})
        res.status(200).json({job,msg:"update job"});
    } catch (error) {
        res.status(500).json({error})
    }

}
const deleteJob=async (req,res)=> {
    const {
        params:{jobId},
        user:{userId}
    }=req;
    try{
        const job=await Job.findOneAndDelete({_id:jobId,createdBy:userId});
        res.status(200).json({job})
    }catch(error) {
        res.status(500).json({error})
    }
}
const createJob=async (req,res)=> {
    const {
        body:{company,position},
        user:{userId}
    }=req;
    
    if(!company || !position) {
        return res.status(404).json({msg:"Please provide company and position"})
    }

    try{
        const newJob={...req.body,createdBy:userId}
        const job=await Job.create(newJob)
        res.status(200).json({job,msg:"job added"})
    }catch (error) {
        res.status(500).json({error})
    }
}

module.exports={
    getAllJobs,
    getSingleJob,
    createJob,
    updateJob,
    deleteJob
}
