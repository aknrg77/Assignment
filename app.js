const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const routes = require('./routes/index');
const db = require('./config/mongoose');

const app = express();
app.use(cors());
//parsing the incoming requests using bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/',routes);

app.listen(process.env.PORT,(err)=>{
    console.log(`Server is running on ${process.env.PORT}`);
});