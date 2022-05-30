const router = require("express").Router();
const res = require("express/lib/response");
let EmpAttendance = require("../models/EmpAttendance.model");

//Insert employees' attendance details

http://localhost:8070/EmpAttendance/add

router.route("/add").post((req, res)=>{
    //body
    const firstName = req.body.fName;
    const accountNumber = req.body.accountNumber;
    const empType = req.body.empType;
    const workedhrs  = req.body.workedhrs ;
    const month = req.body.month;

     //create a object of model
    const newAttendance = new EmpAttendance({
        firstName,
        accountNumber,
        empType,
        workedhrs,
        month,

    })

    //pass the object to mongodb
    newAttendance.save().then(()=>{
        res.json("Attendance marked")
    }).catch((err)=>{
        console.log(err);
    })

  

})

//display employee attendance details

http://localhost:8070/EmpAttendance

router.route("/").get((req, res)=>{
    //body
    EmpAttendance.find().then((empattendances)=>{
        res.json(empattendances)
    }).catch((err)=> {
        console.log(err)
    })

})

module.exports = router;