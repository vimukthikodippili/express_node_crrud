const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors')

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');


/////////route////////////////////////////////////////////////
const CustomerRout=require('./routes/CustomerRoute');
const UserRoute=require('./routes/UserRoute');



const serverPort =process.env.servicePort;
const app=express();

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}));

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/e_dealers',()=>{
    app.listen(serverPort,()=>{
        console.log(` & Running on : ${serverPort}`);
    });
});
/////////////////////////////////
app.use('/api/v1/customer',CustomerRout);
app.use('/api/v1/user',UserRoute);

