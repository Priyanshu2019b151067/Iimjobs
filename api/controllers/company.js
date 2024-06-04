const Company = require('../models/companies');
const getall = async (req,res)=>{
    try {
        const allCompany = await Company.find();
        res.status(200).json({allCompany});
    } catch (error) {
        res.status(500).json({error : error.message});
    }
};

const createCompany = async (req,res)=>{
    try {
        const {name} = req.body;
        const newCompany = new Company({
            name
        });
        await newCompany.save();
        res.status(201).json({newCompany});
    } catch (error) {
        res.status(500).json({error : error.message});
    }
};

module.exports = {
    getall,
    createCompany
}
