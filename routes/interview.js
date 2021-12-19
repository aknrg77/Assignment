const { Router } = require('express');
const express = require('express');
const routes = express.Router();
const {createInterview,getAllUpcomingInterviews,listInterviewById} = require('../controller/interview');
const {tokenDecode,typeCheckForAdmin,interviewValidation,interviewUpdateValidation} = require('../middleware/validation');

routes.use(tokenDecode,typeCheckForAdmin);
routes.post('/',interviewValidation,createInterview);
routes.patch('/:uid',interviewUpdateValidation,createInterview);
routes.get('/',getAllUpcomingInterviews);
routes.get('/:uid',listInterviewById);


module.exports = routes;