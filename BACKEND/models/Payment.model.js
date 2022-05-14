const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PaymentSchema = new Schema({
    PsupplierID : {
        type : String,
        required : true
    },
    Pamount : {
        type : String,
        required : true
    },
    Pdate :{
        type : String,
        required : true
    
    }
})

const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;