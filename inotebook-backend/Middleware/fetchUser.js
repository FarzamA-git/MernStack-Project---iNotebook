var jwt = require('jsonwebtoken');
const JWT_SECRET_KEY='mynameisFarzam';

const fetchUser=(req,res,next)=>{
    try {
        const token=req.header('auth-token');
        if(!token){
            return res.status(401).json({message:"Invalid token"});
        }
        const data=jwt.verify(token,JWT_SECRET_KEY);
        req.user=data.user;
        next();
        
    } catch (error) {
        return res.status(401).json({message:"Invalid token"});
    }

}

module.exports=fetchUser;