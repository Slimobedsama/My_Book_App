const User = require('../model/userModel');
const bcrypt = require('bcrypt');
// const cookieParser = require('cookie-parser');
const generateToken = require('../utils/create');
// COOKIE EXPIRES IN 2HOURS
const TIMEOUT = 2 * 60 * 60 * 1000

exports.all = async(req, res, next)=> {
    try {
       const allUsers = await User.find().sort({lastName: 'asc'});
       return res.status(200).json(allUsers)
    } catch (err) {
        res.status(500).json({errors: err.message});
    }
    next();
}

exports.single = async(req, res, next)=> {
    const id = req.params.id;
    try {
        const oneUser = await User.findById(id);
        if(!oneUser) {
            throw new Error(`The User with id ${id} does not exists.`)
        }
        res.status(200).json({ message: `Successful, The User With id ${id} found.`, data: oneUser })
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

exports.create = async(req, res, next)=> {
    const {firstName, lastName, email, password} = req.body;
    try {
        const encryptedPassword = await bcrypt.hash(password, 12);
        const createUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: encryptedPassword
        });
        const token = generateToken(createUser._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: TIMEOUT});
        res.status(201).json({message: 'New User Created...', Users: createUser._id});
    } catch (err) {
        return next(err)
    }
}


exports.signIn = async(req, res, next)=> {
    const { email, password } = req.body;
    try {
        const findEmail = await User.findOne({ email });
        if(findEmail) {
            const isValidPassword = await bcrypt.compare(password, findEmail.password);
            if(isValidPassword) {
                const token = generateToken(findEmail._id);
                res.cookie('jwt', token, {httpOnly: true, maxAge: TIMEOUT});
                return res.status(200).json({message: 'Login Successful', User: findEmail._id});
            }
            throw  new Error("Invalid Password");
        }
    } catch (err) {
        // next(err);
        console.log(err.message);
        res.status(400).json({message: err.message})
    }
    next();
}

//TEMPLATE RENDERING LOGIC 
exports.access = (req, res)=> {
    res.render('../views/users/login', {title: 'Login'});
}

exports.sign = (req, res)=> {
    res.render('../views/users/register', {title: 'Signup'});
}