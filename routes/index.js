const express = require('express');
const routes = express.Router();
const user = require('./user');
const interview = require('./interview');


routes.get('/',(req,res)=>{
    res.send("hello india");
});

routes.use('/user',user);

routes.use('/interview',interview);


module.exports = routes;