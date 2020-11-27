const mongoose = require('mongoose');
const {DB_URI} = require('../config/dev');
const SeederPortfolios = require('./seeder');

    mongoose.connect(DB_URI,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true}, async (err)=>{
        if (err){console.error(err)}
        else{
            console.log('>Starting populating DB...');
            await SeederPortfolios.populate();
            await mongoose.connection.close();
            console.log('Alles GUT');
        }
    });


