const router = require("express").Router();
const res = require("express/lib/response");
let Machine = require("../models/Machine.model");

router.route("/add").post((req, res)=>{
    const machineName = req.body.machineName;
    const machineModelNumber = req.body.machineModelNumber;
    const machineDepartment = req.body.machineDepartment;
    const machineSerialNumber = req.body.machineSerialNumber;
    const machineDate = req.body. machineDate;
    const newMachine = new Machine({
        machineName,
        machineModelNumber,
        machineDepartment,
        machineSerialNumber,
        machineDate
    })

    newMachine.save().then(()=>{
        res.json("Machine Added")
    }).catch((err)=>{
        console.log(err);
    })

})
router.route("/").get((req, res)=>{
    Machine.find().then((machine)=>{
        res.json(machine)
    }).catch((err)=> {
        console.log(err)
    })

})

router.route("/update").post(async(req, res)=>{
    if (req.body.id == null || req.body.id == undefined) {
        res.status(400).send({
            message: "ID can not be empty!"
        });
        return;
    }

    const {machineName, machineModelNumber, machineDepartment, machineSerialNumber, machineDate} = req.body;
    console.log(req.body);
    
     Machine.findOne({_id : req.body.id }, (err, foundBul) => {
        if(err) return res.status(401).send(err);

        if(!foundBul) return res.status(404).send("Building not found");

        if(machineName){
            foundBul.machineName = req.body.machineName;
        }
        if(machineModelNumber){
            foundBul.machineModelNumber = req.body.machineModelNumber;
        }
        if(machineDepartment){
            foundBul.machineDepartment = req.body.machineDepartment;
        }
        if(machineSerialNumber){
            foundBul.machineSerialNumber = req.body.machineSerialNumber;
        }
        if(machineDate){
            foundBul.machineDate = req.body.machineDate;
        }

        foundBul.save((err, savedBul) => {
            if(err) return res.status(401).send(err);

            if(!savedBul) return res.status(404).send("Not saved");

            return res.status(200).send(savedBul);
        });
    });
})

 router.route("/delete/:id").delete(async(req, res)=> {
    console.log(req.params.id);
    
    if (req.params.id == null || req.params.id == undefined) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    
    Machine.findOneAndDelete({ _id: req.params.id })
    .then( result => {

        if (!result) {
            throw new Error('No record found')
        }

        res.status(200).send({
            message: "Deleted successfully"
        });
    
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while deleting the data."
        });
    });   
 })

router.route("/getOne/:id").get(async(req, res)=> {
   
    try {
        const build = await Machine.findOne({ _id: req.params.id });
        return res.status(200).send({
            data: build
        })
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            error: error
        })
    }
})


module.exports = router;