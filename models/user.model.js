const mongoose = require('mongoose');
const User = mongoose.model('User',{
    fullName:{
        type : String,
        required : true
    },
    email : {
        type : String,
        required  : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required  : true,
        unique : true
    },
    image : {
        type : String,
        default : 'user.webp'
    },
    role : {
        type : String
    },
    tools : {
        type : Array,
        default : []
    },
    date : {
        type : Date
    },
    publicId: {
        type : String
    }

})

module.exports = User;