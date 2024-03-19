const { body, validationResult } = require('express-validator');
const User = require('../model/userModel');

signupValidation = 
[
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Please provide a valid email address').custom(async value => {
        const checkEmail = await User.findOne({ email: value });
        if(checkEmail) {
            throw new Error('This email has already been registered');
        }
    }),
    body('password').isStrongPassword({ minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 }).withMessage('Password Must Be Minimum of 6 Characters, 1 Uppercase, & 1 Lowercase'),
    (req, res, next)=> {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            console.log(errors.array().map(error => error.msg));
            return res.status(400).json({ message: 'Failed', errors: errors.array().map(error => error.msg)});
        }
        next();
    }
];

const loginValidation = 
[
    body('email').isEmail().withMessage('Please provide a valid email address').custom(async value => {
        const checkEmail = await User.findOne({ email: value });
        if(checkEmail) {
            return true;
        }
        throw new Error('Email not found');
    }),
    body('password').isStrongPassword({ minLength: 6, minLowercase: 0, minUppercase: 0, minNumbers: 1, minSymbols: 0 }).withMessage('Incorrect password'),
    (req, res, next)=> {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            console.log(errors.array().map(error => error.msg));
            return res.status(400).json({ message: 'Failed', errors: errors.array().map(error => error.msg)});
        }
        next();
    }
]

module.exports = { signupValidation, loginValidation };