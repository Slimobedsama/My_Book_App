const { body, validationResult } = require('express-validator');
// const Book = require('../model/booksModel');

const validateBook = 
[
    body('author').notEmpty().withMessage("Author field cannot be empty"),
    body('title').notEmpty().withMessage("Title field cannot be empty"),
    body('genre').notEmpty().withMessage( "Genre field cannot be empty"),
    body('summary').notEmpty().withMessage("Summary field cannot be empty"),
    body('price').notEmpty().isNumeric().withMessage("Price must be a number"),
    (req, res, next)=> {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            console.log(errors.array().map(error => error.msg));
            return res.status(400).json({ message: 'Failed', errors: errors.array().map(error => error.msg)});
        }
        next();
    }
];

module.exports = validateBook;