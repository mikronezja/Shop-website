const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    userid : {
        type: String,
        required : true
    },
    productid : 
    {
        type: Number,
        required : true
    },
    username : 
    {
        type : String,
        required : true,
    },
    rating : {
        type: Number,
        required : true
    },
    body : {
        type: String,
        required : true
    },
    date : 
    {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Comment', commentSchema)