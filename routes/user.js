const express = require('express');
const routes = express.Router();
const {createUser,listUser,listUserById} = require('../controller/user');
const {userValidation,tokenDecode,typeCheck} = require('../middleware/validation');


routes.post('/',userValidation,createUser);
routes.get('/',tokenDecode,typeCheck,listUser);
routes.get('/:id',tokenDecode,typeCheck,listUserById);

module.exports = routes;