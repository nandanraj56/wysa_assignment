const mongoose = require("mongoose")

let url = process.env.MONGO_URL;

mongoose.connect(url,{useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true,useFindAndModify:false})
    .then(()=>{
        console.log('succesfully connected to db');
    }).catch((e)=>{
        console.log(e);
    })