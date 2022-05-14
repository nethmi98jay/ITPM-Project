const router = require("express").Router();
const res = require("express/lib/response");
let Expense = require("../models/Expense.model");

router.route("/add").post((req, res)=>{
    const department = req.body.department;
    const expenseMachineName = req.body.expenseMachineName;
    const expenseMachineSerialNumber = req.body.expenseMachineSerialNumber;
    const expenseType = req.body.expenseType;
    const expenseDate = req.body. expenseDate;
    const expenseAmount = req.body. expenseAmount;
    const newExpense = new Expense({
        department,
        expenseMachineName,
        expenseMachineSerialNumber,
        expenseType,
        expenseDate,
        expenseAmount
    })

    newExpense.save().then(()=>{
        res.json("Expense Added")
    }).catch((err)=>{
        console.log(err);
    })

})
router.route("/").get((req, res)=>{
    Expense.find().then((expense)=>{
        res.json(expense)
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

    const {department, expenseMachineName, expenseMachineSerialNumber, expenseType, machineDate, expenseAmount} = req.body;
    console.log(req.body);
    
    Expense.findOne({_id : req.body.id }, (err, foundBul) => {
        if(err) return res.status(401).send(err);

        if(!foundBul) return res.status(404).send("Building not found");

        if(department){
            foundBul.department = req.body.department;
        }
        if(expenseMachineName){
            foundBul.expenseMachineName = req.body.expenseMachineName;
        }
        if(expenseMachineSerialNumber){
            foundBul.expenseMachineSerialNumber = req.body.expenseMachineSerialNumber;
        }
        if(expenseType){
            foundBul.expenseType = req.body.expenseType;
        }
        if(machineDate){
            foundBul.machineDate = req.body.machineDate;
        }
        if(expenseAmount){
            foundBul.expenseAmount = req.body.expenseAmount;
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
    
    Expense.findOneAndDelete({ _id: req.params.id })
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
        const build = await Expense.findOne({ _id: req.params.id });
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

router.route("/getByDate/:date").get(async(req, res)=> {
   


    Expense.find({ expenseDate: req.params.date }).then((expense)=>{
        res.json(expense)
    }).catch((err)=> {
        console.log(err)
    })

    
})


module.exports = router;