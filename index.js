const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors')
/////////route////////////////////////////////////////////////
const CustomerRout=require('./routes/CustomerRoute');


const serverPort =process.env.servicePort;
const app=express();
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/e_dealers',()=>{
    app.listen(serverPort,()=>{
        console.log(` & Running on : ${serverPort}`);
    });
});
/////////////////////////////////
app.use('/api/v1/customer',CustomerRout);

