const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName : { type : String,required : true,unique:true,trim:true}
},{timestamps : true})

module.exports = mongoose.model('Company',companySchema);