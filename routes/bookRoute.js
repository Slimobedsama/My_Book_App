const express = require('express');
const Router = express.Router();
const bookController = require('../controller/bookController');
const authUser = require('../middleware/authController');

Router.get('/all-books', bookController.all);
Router.get('/', bookController.home);
Router.get('/search', bookController.getSearch);
Router.get('/:id', authUser, bookController.getOne);
Router.post('/', bookController.create);

module.exports = Router;