
const router = require("express").Router();
const res = require("express/lib/response");
let Payment = require("../models/Payment.model");

//Insert payment details

http://localhost:8070/Payment/add

router.route("/add").post((req, res)=>{
    //body
    const PsupplierID = req.body.PsupplierID;
    const Pamount = req.body.Pamount;
    const Pdate = req.body.Pdate;

     //create a object of model
    const newPayment = new Payment({
        PsupplierID,
        Pamount,
        Pdate
        
    })

    //pass the object to mongodb
    newPayment.save().then(()=>{
        res.json("Payment Added")
    }).catch((err)=>{
        console.log(err);
    })

})

//display payment details

http://localhost:8070/Payment

router.route("/").get((req, res)=>{
    //body
    Payment.find().then((payments)=>{
        res.json(payments) 
    }).catch((err)=> {
        console.log(err)
    })

})

//Update payment details

http://localhost:8070/Payement/update/

router.route("/update").post(async(req, res)=>{
    if (req.body.id == null || req.body.id == undefined) {
        res.status(400).send({
            message: "ID can not be empty!"
        });
        return;
    }

    const {PsupplierID, Pamount, Pdate} = req.body;
    console.log(req.body);
    
    Payment.findOne({_id : req.body.id }, (err, foundBul) => {
        if(err) return res.status(401).send(err);

        if(!foundBul) return res.status(404).send("Building not found");

        if(PsupplierID){
            foundBul.supplierID = req.body.supplierID;
        }
        if(Pamount){
            foundBul.Pamount = req.body.Pamount;
        }
        if(Pdate){
            foundBul.Pdate = req.body.Pdate;
        }
        foundBul.save((err, savedBul) => {
            if(err) return res.status(401).send(err);

            if(!savedBul) return res.status(404).send("Not saved");

            return res.status(200).send(savedBul);
        });
    });
})

 //Delete Payment
 
 http://localhost:8070/Payment
 router.route("/delete/:id").delete(async(req, res)=> {
    console.log(req.params.id);
    
    if (req.params.id == null || req.params.id == undefined) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    
    Payment.findOneAndDelete({ _id: req.params.id })
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
        const build = await Payment.findOne({ _id: req.params.id });
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
   


    Payment.find({ paymentDate: req.params.date }).then((payment)=>{
        res.json(payment)
    }).catch((err)=> {
        console.log(err)
    })

    
})


 http://localhost:8070/Payment
router.route("/get/:id").get(async(req, res)=> {
    let payID = req.params.id;
    const pay = await Payment.findById(payID)
    .then((payments)=> {
        res.status(200).send({status: "Payment fetched", payments})
    }).catch(()=> {
        console.log(eer.message);
        res.status(500).send({status: "Error with get payment", error: err(message)})
    })
})


module.exports = router;