const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const attendanceSchema = new Schema({
    firstName : {
        type : String,
        required : false
    },
    accountNumber :{
        type : String,
        required : true
    },
    empType :{
        type : String,
        required : true
    },
    workedhrs :{
        type : String,
        required : true
    },
    month :{
        type : String,
        required : true
    }
})

const EmpAttendance = mongoose.model("EmpAttendance", attendanceSchema);
module.exports = EmpAttendance;