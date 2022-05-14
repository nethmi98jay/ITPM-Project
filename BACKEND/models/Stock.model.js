const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const stockSchema = new Schema({
    itemCode : {
        type : String,
        required : true
    },
    itemName : {
        type : String,
        required : true
    },
    garmentQuantity :{
        type : String,
        required : true
    },
    month :{
        type : String,
        required : true
    },
    priceEach :{
        type : String,
        required : true
    },
    garmentStatus :{
        type : String,
        required : true
    }
    
   
})

const Stock = mongoose.model("Stock", stockSchema);
module.exports = Stock;