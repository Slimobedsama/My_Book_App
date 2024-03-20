const express = require('express');
const Router = express.Router();
const userController = require('../controller/userController');
const { signupValidation, loginValidation } = require('../validation/userValidate');

// VIEWS ROUTE
Router.get('/signup', userController.sign); // SIGNUP VIEW IN EJS
Router.get('/login', userController.access); // LOGIN VIEW IN EJS

// LOGIC ROUTE
Router.get('/all-users', userController.all);
Router.get('/:id', userController.single);
Router.post('/signup', signupValidation, userController.create);
Router.post('/login', loginValidation, userController.signIn);

module.exports = Router;