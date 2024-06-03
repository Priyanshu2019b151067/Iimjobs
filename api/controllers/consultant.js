const Consultant = require('../models/consultant');
const getall = async (req,res)=>{
    try {
        const allConsultant = await Consultant.find();
        res.status(200).json({allConsultant});
    } catch (error) {
        res.status(500).json({error : error.message});
    }
};
 
const createConsultant = async (req,res)=>{
    try {
        const {name} = req.body;
        const newConsultancy = new Consultant({
            name
        });
        await newConsultancy.save();
        res.status(201).json({newConsultancy});
    } catch (error) {
        res.status(500).json({error : error.message});
    }
};

module.exports = {
    getall,
    createConsultant
}
