const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const  salarySchema = new Schema({
    firstName : {
        type : String,
        required : false
    },
    accountNumber : {
        type : String,
        required : false
    },
    empType : {
        type : String,
        required : false
    },
    basicSalary : {
        type : String,
        required : false
    },
    workedHrs :{
        type : String,
        required : false
    },

    othrs :{
        type : String,
        required : false
    },

    otIncrement :{
        type : String,
        required : false
    },

    totSal :{
        type : String,
        required : false
    },

    month :{
        type : String,
        required : false
    }
    
})

const EmpSalary = mongoose.model("EmpSalary", salarySchema);
module.exports = EmpSalary;