// const express = require('express');
const jwt = require('jsonwebtoken');
const generateToken = (id)=> {
    return jwt.sign({id}, process.env.JWT_SECRETE, {expiresIn: process.env.EXPIRES_IN});
}

module.exports = generateToken;