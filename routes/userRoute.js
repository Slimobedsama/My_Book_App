const express = require('express');
const Router = express.Router();
const userController = require('../controller/userController');
const { signupValidation, loginValidation } = require('../validation/userValidate');

Router.get('/signup', userController.sign); // SIGNUP VIEW IN EJS
Router.post('/signup', signupValidation, userController.create);
Router.get('/login', userController.access); // LOGIN VIEW IN EJS
Router.post('/login', loginValidation, userController.signIn);
Router.get('/all-users', userController.all);
Router.get('/search', userController.search);
Router.get('/:id', userController.single);
Router.patch('/:id', userController.edit);

module.exports = Router;