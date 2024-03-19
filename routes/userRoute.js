const express = require('express');
const Router = express.Router();
const userController = require('../controller/userController');

Router.get('/signup', userController.sign);
Router.post('/signup', userController.create);
Router.get('/login', userController.access);
Router.post('/login', userController.signIn);
Router.get('/all-users', userController.all);
Router.get('/search', userController.search);
Router.get('/:id', userController.single);
Router.patch('/:id', userController.edit);

module.exports = Router;