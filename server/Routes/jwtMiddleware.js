const jwt = require('jsonwebtoken')

const Verifytoken = (req , res, next) =>{
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token , process.env.JWT_SECRETEKEY , (err , user)=>{
            if(err) return res.status(403).json('invalid token')
            req.user= user;
            next();
        })
    }else{
        return res.status(401).json({msg : "Not authenticated"})
    }
}
const VerfyUserOrAdmin = (req , res , next)=>{
    Verifytoken(req , res , ()=>{
        if (req.user.id === req.params["id"] || req.user.isAdmin) {
            next();
        } else {
            console.log("does not match");
            return res.status(500).json("Internal Server Error");
          }
    })
}

const VerfyAdmin = (req , res , next)=>{
    Verifytoken(req , res , ()=>{
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json('Not authorized');
        }
    })
}


module.exports = {VerfyAdmin ,Verifytoken, VerfyUserOrAdmin}