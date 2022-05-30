const router = require("express").Router();
const res = require("express/lib/response");
let EmpSalary = require("../models/EmpSalary.model");

//Insert employees' attendance details

http://localhost:8070/EmpSalary/sadd

router.route("/sadd").post((req, res)=>{
    //body
    const firstName = req.body.fName;
    const accountNumber = req.body.accountNumber;
    const empType  = req.body.empType ;
    const basicSalary = req.body.bSal;
    const workedHrs  = req.body.workedhrs;
    const othrs = req.body.otCal;
    const otIncrement = req.body.otPrice;
    const totSal = req.body.totalSal;
    const month = req.body.month;
    
     //create a object of model
    const newSalary = new EmpSalary({

        firstName,
        accountNumber,
        empType,
        basicSalary,
        workedHrs ,
        othrs,
        otIncrement,
        totSal,
        month

    })

    //pass the object to mongodb
    newSalary.save().then(()=>{
        res.json("Calculated")
    }).catch((err)=>{
        console.log(err);
    })

  

})

//display employee salary details

http://localhost:8070/EmpSalary

router.route("/").get((req, res)=>{
    //body
    EmpSalary.find().then((empsalaries)=>{
        res.json(empsalaries)
    }).catch((err)=> {
        console.log(err)
    })

})

module.exports = router;