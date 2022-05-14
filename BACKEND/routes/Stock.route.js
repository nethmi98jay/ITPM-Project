const router = require("express").Router();
const res = require("express/lib/response");
let Stock = require("../models/Stock.model");

//Insert stock details

http://localhost:8070/Stock/add

router.route("/add").post((req, res)=>{
    //body
    const itemCode = req.body.itemCode;
    const itemName= req.body.itemName;
    const garmentQuantity = req.body.garmentQuantity;
    const month = req.body.month;
    const priceEach = req.body. priceEach;
    const garmentStatus = req.body.garmentStatus; 
    

     //create a object of model
    const newStock = new Stock({
        itemCode,
        itemName,
        garmentQuantity,
        month,
        priceEach,
        garmentStatus
    })

    //pass the object to mongodb
    newStock.save().then(()=>{
        res.json("Stock Added")
    }).catch((err)=>{
        console.log(err);
    })

})

//display Stock details

http://localhost:8070/Stock

router.route("/").get((req, res)=>{
    //body
    Stock.find().then((stocks)=>{
        res.json(stocks)
    }).catch((err)=> {
        console.log(err)
    })

})

//Update stock details
http://localhost:8070/Stock/update
router.route("/update").post(async(req, res)=>{
    if (req.body.id == null || req.body.id == undefined) {
        res.status(400).send({
            message: "ID can not be empty!"
        });
        return;
    }

    const {itemCode, itemName, garmentQuantity, month, priceEach, garmentStatus } = req.body;
    console.log(req.body);
    
     Stock.findOne({_id : req.body.id }, (err, foundBul) => {
        if(err) return res.status(401).send(err);

        if(!foundBul) return res.status(404).send("Building not found");

        if(itemCode){
            foundBul.itemCode = req.body.itemCode;
        }
        if(itemName){
            foundBul.itemName = req.body.itemName;
        }
        if(garmentQuantity){
            foundBul.garmentQuantity = req.body.garmentQuantity;
        }
        if(month){
            foundBul.month = req.body.month;
        }
        if(priceEach){
            foundBul.priceEach = req.body.priceEach;
        }
        if(garmentStatus){
            foundBul.garmentStatus = req.body.garmentStatus;
        }

        foundBul.save((err, savedBul) => {
            if(err) return res.status(401).send(err);

            if(!savedBul) return res.status(404).send("Not saved");

            return res.status(200).send(savedBul);
        });
    });
})


//delete stock
http://localhost:8070/Stock
 router.route("/delete/:id").delete(async(req, res)=> {
    console.log(req.params.id);
    
    if (req.params.id == null || req.params.id == undefined) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    
    Stock.findOneAndDelete({ _id: req.params.id })
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
        const build = await Stock.findOne({ _id: req.params.id });
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