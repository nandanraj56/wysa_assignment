const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
},{
    timestamps:true
})

userSchema.methods.toJSON = function(){
    const userObj = this.toObject()
    delete userObj.password
    delete userObj.tokens
    return userObj
}
userSchema.methods.getAuthToken= async function(){
    const user = this
    const token = await jwt.sign({_id:user._id.toString()},/*process.env.JWT_SECRET || */"test")
    //console.log(token)
    user.tokens = user.tokens.concat({ token })
    try{
        await user.save()
    }catch(e){
        console.log(e)
    }
    
    return token
    
};

userSchema.pre("save",async function(next){
    const user = this
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User