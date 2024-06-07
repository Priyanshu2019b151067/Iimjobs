const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const dotenv = require('dotenv');
const morgan = require('morgan');

// routers
const companyRouter = require('./routes/company');
const recruiterRouter = require('./routes/recruiter');
const consultantRouter = require('./routes/consultant');
const verifyRouter = require('./routes/verification');

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"}));
app.use(morgan('common'));
app.use(bodyParser.json({limit:'30mb',extended:true}));
app.use(bodyParser.urlencoded({limit : '30mb',extended:true}));
app.use(cors());

// routes set up

app.use('/company',companyRouter);
app.use('/consultant',consultantRouter);
app.use('/recruiter',recruiterRouter);
app.use('/verify',verifyRouter);



// DATA BASE SETUP
const PORT = process.env.PORT || 6000
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server Port :${PORT}`);
    })
}).catch((error)=>{
    console.log(`${error} did not connect`);
})