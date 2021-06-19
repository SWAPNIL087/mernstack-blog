const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const blogSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    msg:{
        type:String,
        required:true
    },
    likes:[{
        type: ObjectId,ref:'User'
    }]
}) 

const BlogData = mongoose.model('BLOG',blogSchema);

module.exports = BlogData;
