const recuriterProfile =require('../models/recuriter');
const Company =require('../models/companies');
const Consultant = require('../models/consultant');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const registerRecuriter = async (req,res)=>{
    try {
        const {fullName,email,password,phone,location,designation,type,entityId} = req.body;
        console.log(fullName);
        const salt =  await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);
        const newRecuiter = new recuriterProfile({
            fullName,
            email,
            password : hashPassword,
            phone,
            location,
            designation,
            type,
            entityId
        });
        if(!['Company','Consultant'].includes(type)){
            res.status(400).json({ error : 'Invalid type'});
        }

        let entity;
        if(type === 'Company'){
            entity = await Company.findById(entityId);
        }else if(type === 'Consultant'){
            entity = await Consultant.findById(entityId);
        }

        if(!entity){
            return res.status(404).json({ error: 'Entity not found or mismatched type' });
        }

        await newRecuiter.save();
        const payload = {id : newRecuiter._id,email,fullName};
        const token = jwt.sign(payload,process.env.JWT_SECRET);
        res.status(201).json({token,newRecuiter});
    } catch (error) {
        res.status(500).json({error : error.message});
    }
};

const loginRecuriter = async (req,res) =>{
    try {
        const {email,password} = req.body;
        const recuiter = await recuriterProfile.findOne({email});
        if(!recuiter){
            res.status(404).json({message : "recruiter not found"});
        }
        const match = await bcrypt.compare(password,recuiter.password);
        if(!match){
            res.status(404).json({message : "password incorrect"});
        }
        const payload = {id : recuiter._id,email,fullName : recuiter.fullName}
        const token = jwt.sign(payload,process.env.JWT_SECRET);
        res.status(200).json({token,recuiter});
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

const getCompanyNConsultancy = async (req,res) =>{
    try {
        const companies = await Company.find();
        const consultancy = await Consultant.find();
        res.status(200).json({companies,consultancy});
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}
module.exports = {
    registerRecuriter,
    loginRecuriter,
    getCompanyNConsultancy
}