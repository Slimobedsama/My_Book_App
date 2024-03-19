const express = require('express');
const Router = express.Router();
const uploadController = require('../controller/uploadController');
Router.post('/', uploadController.uploadPic);

module.exports = Router;