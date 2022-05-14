const router = require("express").Router();
const res = require("express/lib/response");
let DStock = require("../models/DStock.model");

//Insert Damaged stock details

http://localhost:8070/DStock/add

router.route("/add").post((req, res)=>{
    //body
    const ItemCode = req.body.ItemCode;
    const Description = req.body.Description ;
    const Price = req.body.Price;
    const Month = req.body.Month;
    
    

     //create a object of model
    const newDStock = new DStock({
        ItemCode,
        Description,
        Price,
        Month
        
    })


    //pass the object to mongodb
    newDStock.save().then(()=>{
        res.json("Damaged Stock Added")
    }).catch((err)=>{
        console.log(err);
    })

})

//display Damaged Stock details

http://localhost:8070/DStock

router.route("/").get((req, res)=>{
    //body
    DStock.find().then((dstocks)=>{
        res.json(dstocks)
    }).catch((err)=> {
        console.log(err)
    })

})

//Update stock details
http://localhost:8070/DStock/update
router.route("/update").post(async(req, res)=>{
    if (req.body.id == null || req.body.id == undefined) {
        res.status(400).send({
            message: "ID can not be empty!"
        });
        return;
    }

    const {ItemCode, Description, Price, Month } = req.body;
    console.log(req.body);
    
     DStock.findOne({_id : req.body.id }, (err, foundBul) => {
        if(err) return res.status(401).send(err);

        if(!foundBul) return res.status(404).send("Building not found");

        if(ItemCode){
            foundBul.ItemCode = req.body.ItemCode;
        }
        if(Description){
            foundBul.Description = req.body.Description;
        }
        if(Price){
            foundBul.Price = req.body.Price;
        }
        
        if(Month){
            foundBul.Month = req.body.Month;
        }
        
        foundBul.save((err, savedBul) => {
            if(err) return res.status(401).send(err);

            if(!savedBul) return res.status(404).send("Not saved");

            return res.status(200).send(savedBul);
        });
    });
})


//delete damage stock
http://localhost:8070/DStock
 router.route("/delete/:id").delete(async(req, res)=> {
    console.log(req.params.id);
    
    if (req.params.id == null || req.params.id == undefined) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    
    DStock.findOneAndDelete({ _id: req.params.id })
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
        const build = await DStock.findOne({ _id: req.params.id });
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