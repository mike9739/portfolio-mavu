const mongoose = require('mongoose');
const {DB_URI} = require('../config/dev');



exports.connect = () =>{
    mongoose.connect(DB_URI,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true},(err)=>{
        if (err){console.error(err)
        }else{
            console.log('Connected to Database')
        }
    });
}

