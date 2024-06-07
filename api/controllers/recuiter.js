const recuriterProfile =require('../models/recuriter');
const Company =require('../models/companies');
const Consultant = require('../models/consultant');
const transporter = require('../mail/transporterConfigure');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../mail/recruiterVerification');



const registerRecuriter = async (req,res)=>{
    try {
        const {fullName,email,password,phone,location,designation,type,entityId} = req.body;
        // console.log(fullName);
        const salt =  await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);
        let recuriter = await recuriterProfile.findOne({
            $or : [
                {email : email},
                {phone  : phone}
            ]
        });
        if(recuriter){
            return res.status(400).json({ error : 'Email or Phone already exist.'})
        }
        recuriter = await recuriterProfile.findOne({phone});
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
          return res.status(400).json({ error : 'Invalid type'});
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
        await sendEmail(email,fullName);
     
        const payload = {id : newRecuiter._id,email,fullName};
        const token = jwt.sign(payload,process.env.JWT_SECRET);
        res.status(201).json({token,newRecuiter, message: 'Verification email sent'});
    } catch (error) {
        res.status(500).json({error : error.message});
    }
};

const loginRecuriter = async (req,res) =>{
    try {
        const {email,password} = req.body;
        console.log(email);
        const recruiter = await recuriterProfile.findOne({email});
        if(!recruiter){
            return res.status(404).json({message : "recruiter not found"});
        }
        const match = await bcrypt.compare(password,recruiter.password);
        if(!match){
            return res.status(404).json({message : "password incorrect"});
        }
        const payload = {id : recruiter._id,email,fullName : recruiter.fullName}
        const token = jwt.sign(payload,process.env.JWT_SECRET);
        res.status(200).json({token,recruiter});
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