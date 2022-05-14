
const router = require("express").Router();
const res = require("express/lib/response");
let Supplier = require("../models/Supplier.model");

//Insert supplier details

http://localhost:8070/Supplier/add

router.route("/add").post((req, res)=>{
    //body
    const supplierID = req.body.supplierID;
    const modelID = req.body.modelID;
    const Squantity = req.body.Squantity;
    const Samount = req.body.Samount;
    const Sdate = req.body. Sdate;
    const CreditPeriod = req.body.CreditPeriod; 

     //create a object of model
    const newSupplier = new Supplier({
        supplierID,
        modelID ,
        Squantity,
        Samount,
        Sdate,
        CreditPeriod
    })

    //pass the object to mongodb
    newSupplier.save().then(()=>{
        res.json("Supplier Added")
    }).catch((err)=>{
        console.log(err);
    })

})

//display supplier details

http://localhost:8070/Supplier

router.route("/").get((req, res)=>{
    //body
    Supplier.find().then((suppliers)=>{
        res.json(suppliers)
    }).catch((err)=> {
        console.log(err)
    })

})

//Update supplier details

http://localhost:8070/Supplier/update/

router.route("/update").post(async(req, res)=>{
    if (req.body.id == null || req.body.id == undefined) {
        res.status(400).send({
            message: "ID can not be empty!"
        });
        return;
    }

    const {supplierID, modelID,Squantity,Samount, Sdate,CreditPeriod} = req.body;
    console.log(req.body);
    
    Supplier.findOne({_id : req.body.id }, (err, foundBul) => {
        if(err) return res.status(401).send(err);

        if(!foundBul) return res.status(404).send("Building not found");

        if(supplierID){
            foundBul.supplierID = req.body.supplierID;
        }
        if(modelID){
            foundBul.modelID = req.body.modelID;
        }
        if(Squantity){
            foundBul.Squantity = req.body.Squantity;
        }
        if(Samount){
            foundBul.Samount = req.body.Samount;
        } 
        if(Sdate){
            foundBul.Sdate = req.body.Sdate;
        }
        if(CreditPeriod){
            foundBul.supplierAmount = req.body.CreditPeriod;
        }

        foundBul.save((err, savedBul) => {
            if(err) return res.status(401).send(err);

            if(!savedBul) return res.status(404).send("Not saved");

            return res.status(200).send(savedBul);
        });
    });
})

 //Delete Supplier
 
 http://localhost:8070/Supplier
 router.route("/delete/:id").delete(async(req, res)=> {
    console.log(req.params.id);
    
    if (req.params.id == null || req.params.id == undefined) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    
    Supplier.findOneAndDelete({ _id: req.params.id })
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
        const build = await Supplier.findOne({ _id: req.params.id });
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

 http://localhost:8070/Supplier
router.route("/get/:id").get(async(req, res)=> {
    let supID = req.params.id;
    const sup = await Supplier.findById(supID)
    .then((suppliers)=> {
        res.status(200).send({status: "Supplier fetched", suppliers})
    }).catch(()=> {
        console.log(eer.message);
        res.status(500).send({status: "Error with get supplier", error: err(message)})
    })
})


module.exports = router;