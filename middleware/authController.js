const jwt = require('jsonwebtoken');

const authUser = (req, res, next)=> {
    const token = req.cookies.jwt;
    if(token) {
       jwt.verify(token, process.env.JWT_SECRETE, (err, decodedToken)=> {
        if(err) {
            console.log(err.message);
            res.status(401).json({error: err.message})
        } else {
            console.log(decodedToken);
            next();
        }
       });
    } else {
        res.status(403).json({error: 'Unauthorized Access'});
    }
    
}

module.exports = authUser;