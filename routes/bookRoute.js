const express = require('express');
const Router = express.Router();
const bookController = require('../controller/bookController');
const authUser = require('../middleware/authController');
const validateBook = require( '../validation/bookValidate');

//VIEWS ROUTE
Router.get('/', bookController.home);

//LOGIC ROUTE
Router.get('/all-books', bookController.all);
Router.get('/:id', authUser, bookController.getOne);
Router.post('/', validateBook, bookController.create);

module.exports  = Router;