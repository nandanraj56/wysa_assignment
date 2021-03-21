const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema({
    order:{
        type:Number,
        required :true,
        unique:true
    },
    question:{
        type:String,
        required:true,
    },
    instructions:{
        type:String
    },
    responses:[{
        type:String
    }],
    rtype:{
        type:String
    }
})

const Question = mongoose.model('Question',questionSchema)

module.exports = Question