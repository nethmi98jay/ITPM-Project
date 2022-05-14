const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const machineSchema = new Schema({
    machineName : {
        type : String,
        required : false
    },
    machineModelNumber : {
        type : String,
        required : false
    },
    machineDepartment :{
        type : String,
        required : false
    },
    machineSerialNumber :{
        type : String,
        required : false
    },
    machineDate :{
        type : String,
        required : false
    }
})

const Machine = mongoose.model("Machine", machineSchema);
module.exports = Machine;