const router = require("express").Router();
const res = require("express/lib/response");
let Employee = require("../models/Employee.model");

//Insert employee details

http://localhost:8070/Employee/add

router.route("/add").post((req, res)=>{
    //body
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phoneNumber = req.body.phoneNumber;
    const empNIC = req.body.empNIC;
    const email = req.body. email;
    const address = req.body.address; 
    const accountNumber = req.body.accountNumber;
    const empType = req.body.empType

     //create a object of model
    const newEmployee = new Employee({
        firstName,
        lastName,
        phoneNumber,
        empNIC,
        email,
        address,
        accountNumber,
        empType
    })

    //pass the object to mongodb
    newEmployee.save().then(()=>{
        res.json("Employee Added")
    }).catch((err)=>{
        console.log(err);
    })

})

//display employee details

http://localhost:8070/Employee

router.route("/").get((req, res)=>{
    //body
    Employee.find().then((employees)=>{
        res.json(employees)
    }).catch((err)=> {
        console.log(err)
    })

})

//Update employee details

http://localhost:8070/Employee/update/

router.route("/update/:id").put(async(req, res)=>{
    let empId = req.params.id;  //fetch the backend url id
    //Destructure in js
    const {firstName,lastName,phoneNumber,empNIC,email,address,accountNumber,empType} = req.body;

    const updateEmployee = {
        firstName,
        lastName,
        phoneNumber,
        email,
        address,
        empType
    }
    
    const update = await Employee.findByIdAndUpdate(empId, updateEmployee).then(()=> {
        res.status(200).send({status: "Employee Updated"})
    }).catch((err)=> {
        console.log(err)
        res.status(500).send({status: "Error with updating data", error: err(message) })
    })
})
 //Delete Employee
 
 http://localhost:8070/Employee
 router.route("/delete/:id").delete(async(req, res)=> {
     let empId = req.params.id;
     await Employee.findByIdAndDelete(empId).then(()=>{
         res.status(200).send({status: "Employee deleted"})
     }).catch((err)=> {
        console.log(err.message)
        res.status(500).send({status: "Error with updating data", error: err(message)})
    })
 })

 http://localhost:8070/Employee
router.route("/get/:id").get(async(req, res)=> {
    let empId = req.params.id;
    const emp = await Employee.findById(empId)
    .then((employees)=> {
        res.status(200).send({status: "Employee fetched", employees})
    }).catch((err)=> {
        console.log(eer.message);
        res.status(500).send({status: "Error with get employee", error: err(message)})
    })
})


module.exports = router;