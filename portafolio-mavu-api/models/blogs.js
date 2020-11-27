const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogsSchema = new Schema({
    slug: { type:String,unique:true , sparse:true},
    title:{type:String, maxlength:96, required:true},
    subTitle: {type:String, required:true},
    content: {type:String, required:true},
    userId: { type:String, required:true },
    status: {type:String, default:'draft',enum:['draft','published']},
    createdAt: {type:Date,default: Date.now},
    updatedAt:  {type:Date,default: Date.now}
});

module.exports = mongoose.model('Blog',BlogsSchema);