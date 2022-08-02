const express=require("express")
const router=express.Router();

const {
    getAllJobs,
    getSingleJob,
    createJob,
    updateJob,
    deleteJob}=require("../contorlles/job");

router.route("/").get(getAllJobs).post(createJob)
router.route("/:jobId").get(getSingleJob).patch(updateJob).delete(deleteJob);

module.exports=router;
