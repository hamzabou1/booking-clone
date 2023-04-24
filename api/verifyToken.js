const jwt = require("jsonwebtoken");
const router = require('express').Router();

const verify = (req , res , next) =>{

    const token = req.Cookies.access_token ;
    if(!token) {
        console.log("it's a error of token")
    }

    jwt.verify(token , process.env.JWT_SECRETE , (err, user) =>{

        if(err) {
        console.log('error of token')
        req.user = user;
        next();
    }

    })
}

module.exports = router 