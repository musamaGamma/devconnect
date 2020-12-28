const jwt = require("jsonwebtoken")
const config = require("config")

//protect routes from unAuthorized access
module.exports = function(req, res, next) {
    //get the token from the header
    const token = req.header("x-auth-token")
    //check if there is a token
    if(!token) return res.status(401).json({msg: "No Token, unauthorized access"})
    
    try {
        //decode the token 
        const decoded = jwt.verify(token, config.get("jwtSecret"))
        //set req.user to user id
        console.log(decoded.user)
        req.user = decoded.user
        next()
    } catch (error) {
        console.log(error.message)
        res.json({msg: "token is not valid"})
    }
}