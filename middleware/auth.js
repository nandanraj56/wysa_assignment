const jwt  = require("jsonwebtoken")
const { findOne } = require("../models/user")
const User = require('../models/user')

const verifyToken = async(req,res,next)=>{
    try{
        //console.log(req)
        const token = req.header("Authorization").replace("Bearer ","")
        
        const decoded = jwt.verify(token,/*process.env.JWT_SECRET ||*/ "test")
        const user = await User.findOne({_id:decoded._id,"tokens.token":token})
        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()


    }catch(e){
        res.status(401).send({error:"Please Authenticate"})
    }
}

module.exports = verifyToken