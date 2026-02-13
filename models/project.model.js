const mongoose = require('mongoose');
const Project = mongoose.model('Project',{
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    status : {
        type : String
    },
    clientId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Client',
        required : true
    },
    team : {
        type : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User'
            }
        ],
        required : true
    },
    startDate : {
        type : Date
    },
    endDate : {
        type : Date
    },
    files :[
        {
            url : String,
            publicId: String
        }
    ],
    budget : {
        type : String,
        required : true,
        validate: {
            validator: function(v) {
                return /^[0-9]+(\.[0-9]+)?$/.test(v); // accepte 123 ou 123.45
            },
            message: props => `${props.value} n'est pas un budget valide !`
        }
    },
    date : {
        type : Date
    }
});



module.exports = Project;