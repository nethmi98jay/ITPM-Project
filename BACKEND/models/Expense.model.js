const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const  expensSchema = new Schema({
    department : {
        type : String,
        required : true
    },
    expenseMachineName : {
        type : String,
        required : true
    },
    expenseMachineSerialNumber :{
        type : String,
        required : true
    },
    expenseType :{
        type : String,
        required : true
    },
    expenseDate :{
        type : String,
        required : true
    },
    expenseAmount :{
        type : String,
        required : true
    },
})

const  Expens = mongoose.model("Expens", expensSchema);
module.exports =  Expens;