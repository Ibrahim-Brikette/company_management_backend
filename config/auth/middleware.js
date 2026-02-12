const jwt = require('jsonwebtoken');

const verifyToken = async (req,resizeBy, next)=>{
    try{
        const decoded = await jwt.verify(req.headers.authorization.split(" ")[1] , process.env.SECRET_KEY);
        req.user = decoded
        next();

    }
    catch(error){
        resizeBy.status(401).json({
            message : "invalid token",
            status : false
        }
            
        )
    }
}
module.exports = { verifyToken };