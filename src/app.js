const express = require('express');
const User = require("../models/user")
const Question = require("../models/question")
const Response = require("../models/responses")
const auth = require("../middleware/auth")
require("../db/mongoose")
const app = express()
app.use(express.json())

app.post("/signup",async (req,res)=>{
    try{
        const user = new User(req.body)
        const token = await user.getAuthToken();
        const data = await user.save()
        res.send({data,token})
    }
    catch(e){
        res.status(400).send(e.message)
    }
    

})
//Get all questions 
app.get("/landing",auth,async (req,res)=>{
    const question = await Question.find({}).sort({order:-1})
    res.send(question)

})
//Record Responce of each question
app.post("/landing",auth,async (req,res)=>{
    const response = new Response({
        ...req.body,
        user:req.user._id
    });
    try{
        await response.save();
        res.send()
    }catch(e){
        console.log(e)
        res.status(500).send()
    }
})
const url = process.env.PORT || 2000
app.listen(url,()=>{
    console.log("listening")
})