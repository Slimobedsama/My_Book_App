const User = require('../model/userModel');
const bcrypt = require('bcrypt');
// const cookieParser = require('cookie-parser');
const generateToken = require('../utils/create');
// COOKIE EXPIRES IN 2HOURS
const TIMEOUT = 2 * 60 * 60 * 1000

exports.create = async(req, res, next)=> {
    const {firstName, lastName, email, userName, mobileNo, password} = req.body;
    try {
        const encryptedPassword = await bcrypt.hash(password, 12);
        const createUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            userName: req.body.userName,
            mobileNo: req.body.mobileNo,
            password: encryptedPassword
        });
        const token = generateToken(createUser._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: TIMEOUT});
        res.status(201).json({message: 'New User Created...', Users: createUser._id});
    } catch (err) {
        return next(err)
    }
}

exports.access = (req, res)=> {
    res.render('../views/users/login', {title: 'Login'});
}

exports.sign = (req, res)=> {
    res.render('../views/users/register', {title: 'Signup'});
}

exports.signIn = async(req, res, next)=> {
    const {userName, mobileNo, password} = req.body;
    try {
        const findUserName = await User.findOne({userName});
        const findMobileNo = await User.findOne({mobileNo});
        const loginData = findUserName || findMobileNo;
        
        if(loginData) {
            const isValidPassword = await bcrypt.compare(password, loginData.password);
            if(isValidPassword) {
                const token = generateToken(loginData._id);
                res.cookie('jwt', token, {httpOnly: true, maxAge: TIMEOUT});
                return res.status(200).json({message: 'Login Successful', User: loginData._id});
            }
            throw new Error('Incorrect Password');
        }
        throw new Error('Incorrect Username or Mobile Number');
    } catch (err) {
        next(err);
    }
}

exports.all = async(req, res, next)=> {
    try {
       const allUsers = await User.find().sort({lastName: 'asc'});
       return res.status(200).json(allUsers)
    } catch (err) {
        res.status(500).json({errors: err.message});
    }
    next();
}

exports.search = async(req, res, next)=> {
    const query = req.query;
    try {
        const userSearch = await User.find(query);
        if(!query) {
            return res.status(400).json({Error: 'Search not found...'})
        }
        res.status(200).json({message: 'Successful', userSearch});
    } catch (err) {
        res.status(400).json({Error: `Search ${query} not found...`});
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

exports.edit = async(req, res)=> {
    const id = req.params.id;
    const {firstName, lastName, userName, mobileNo} = req.body;
    try {
        const checkUserName = await User.findOne({userName});
        if(checkUserName) {
            throw new Error('Username Already exists');
        }

        if(id) {
            if(firstName || lastName || userName || mobileNo) {
                const updateInfo = await User.findByIdAndUpdate(id, req.body, {new: true});
                return res.status(200).json({message: 'Update Successful.', updateInfo});
            } else {
                res.status(400).json({errors: 'Only First Name, Last Name, Username & Mobile Number Can be Updated.'})
            }
        }

    } catch (err) {
        res.status(400).json({errors: `User with id ${id} not found`});
    }
}