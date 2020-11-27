const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
    title:{type:String, maxArrayLength:128, required:true},
    company: {type:String, required:true},
    userId: { type: String, required:true },
    companyWebsite:{type: String, required:false, maxlength:128},
    location: {type: String,required:true},
    jobTitle: {type: String,required:true},
    description: { type: String, required: true},
    startDate: {type: Date, required: true},
    endDate: { type:Date, required:false },
    createdAt: {type: Date,default: Date.now}
});

module.exports = mongoose.model('Portfolio',PortfolioSchema)