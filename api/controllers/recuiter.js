const recuriterProfile =require('../models/recuriter');
const Company =require('../models/companies');
const Consultant = require('../models/consultant');
const transporter = require('../mail/transporterConfigure');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  {sendEmail} = require('../mail/recruiterVerification');


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

        const verificationToken = 'generated-verification-token'; // Generate a token in practice

        const mailOptions = {
            from: 'priyanshukingh@gmail.com',
            to: email,
            subject: 'Email Verification',
            html: `<h1>Hello </h1><p>Please verify your email by clicking the following link: <a href="http://localhost:3000/verify-email?token=${verificationToken}">Verify Email</a></p>`
        };
        
        
        //await sendEmail(email,'Email Verification',`<h1>Hello </h1><p>Please verify your email by clicking the following link: <a href="http://localhost:3000/verify-email?token">Verify Email</a></p>`);
         
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
      } catch (error) {
        console.error('Error sending email:', error);
      }
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