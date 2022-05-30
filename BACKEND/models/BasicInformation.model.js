const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const  basicinfoSchema = new Schema({
    empType : {
        type : String,
        required : true
    },
    basicSalary : {
        type : String,
        required : true
    },
    workedHrs :{
        type : String,
        required : true
    },
    otRate :{
        type : String,
        required : true
    }
    
})

const BasicInfotmation = mongoose.model("BasicInfotmation", basicinfoSchema);
module.exports = BasicInfotmation;