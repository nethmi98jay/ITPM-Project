const router = require("express").Router();
//const res = require("express/lib/response");
let BasicInformation = require("../models/BasicInformation.model");

//Get employees' basic information

http://localhost:8070/BasicInformation

router.route("/").get((req, res)=>{
    //body
    BasicInformation.find().then((basicInformations)=>{
        res.json(basicInformations)
    }).catch((err)=> {
        console.log(err)
    })

})
http://localhost:8070/BasicInformation/badd
 

router.route("/badd").post(async(req, res)=>{try {
    const basicInformation = await BasicInformation.create(req.body)
    res.status(201).send("Success")
} catch (error) {
    console.log(error);
}})

http://localhost:8070/BasicInformation/get
router.route("/get/:type").get(async(req, res)=> {try {
    const { type: empT } = req.params;
    console.log("hello");
    const  basicInformation = await BasicInformation.findOne({ empType: empT })
    console.log(basicInformation);
    res.status(200).json(basicInformation)
} catch (error) {
    console.log(error);
    
}
  
})


module.exports = router;