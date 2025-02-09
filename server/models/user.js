const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required : true,
        unique:true
    },
    password : 
    {
        type : String, 
        required : true
    },
    role :
    {
        type : String,
         enum : ["admin", "user"],
         default: "user"
    }, 
    email : 
    {
        type : String,
        default: ""
    },
    phone_number :
    {
        type: String,
        default: ""
    },
    name : 
    {
        type : String,
        default: ""
    },
    surname : 
    {
        type : String,
        default: ""
    },
    address : 
    {
        type : String,
        default: ""
    },
    post_code : 
    {
        type: String,
        default: ""
    },
    country : 
    {
        type : String,
        default: ""
    }
})


const User = mongoose.model('User', userSchema)
module.exports = User;