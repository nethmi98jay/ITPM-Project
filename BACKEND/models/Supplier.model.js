const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const supplierSchema = new Schema({
    supplierID : {
        type : String,
        required : true
    },
    modelID : {
        type : String,
        required : true
    },
    Squantity :{
        type : String,
        required : true
    },
    Samount :{
        type : String,
        required : true
    },
    Sdate :{
        type : String,
        required : true
    },
    CreditPeriod :{
        type : String,
        required : true
    
    }
})

const Supplier = mongoose.model("Supplier", supplierSchema);
module.exports = Supplier;