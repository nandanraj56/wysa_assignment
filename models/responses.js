const mongoose = require('mongoose')

const responseSchema = new mongoose.Schema({
    question:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'Question'
    },
    response:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'User'
    }
},{
    timestamps:true
})

const Response = mongoose.model('Response',responseSchema)

module.exports = Response