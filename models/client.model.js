const mongoose = require('mongoose');
const Client = mongoose.model('Client',{
    fullName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phone : {
        type : String,
        required : true,
        unique : true
    },
    image : {
        type : String
    },
    address : {
        type : String
    },
    date : {
        type : Date
    },
    publicId : {
        type : String
    }

})




module.exports = Client;