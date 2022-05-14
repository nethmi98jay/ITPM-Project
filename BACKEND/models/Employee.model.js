const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const employeeSchema = new Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    phoneNumber :{
        type : String,
        required : true
    },
    empNIC :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    address :{
        type : String,
        required : true
    },
    accountNumber :{
        type : String,
        required : true
    },
    empType :{
        type : String,
        required : true
    }
})

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;