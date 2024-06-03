const mongoose = require('mongoose');
// its just a good practice to make the code clean as hell.
const Company = require('./companies');
const Consultant = require('./consultant');

const recuriterProfileSchema = new mongoose.Schema({
   fullName : {
    type : String,
    required : true,
    trim:true
    },
   email : {
    type : String,
    required : true,
    unique : true,
    trim : true
   },
   phone : {
    type : String,
    required : true,
    trim : true
   },
   location : {
    type : String,
    required : true,
    trim : true 
   },
   designation : {
    type : String,
    required : true,
    trim : true
   }
   ,password : {
    type : String,
    required : true
   },
   type :{
    type : String,
    required : true,
    enum : ['Company','Consultant']
   },
   entityId : {
     type : mongoose.Schema.Types.ObjectId,
     required : true,
     refPath : 'type'
   }

},{timestamps : true});

module.exports = mongoose.model('recuriterProfile',recuriterProfileSchema);