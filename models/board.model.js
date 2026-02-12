const mongoose = require('mongoose');
const Board = mongoose.model('Board',{
    projectId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Project',
        required : true
    },
    backlog : {
        type : Array,
        default : []
    },
    inprogress : {
        type : Array,
        default : []
    },
    inhold : {
        type : Array,
        default : []
    },
    done : {
        type : Array,
        default : []
    },
    date : {
        type : Date
    }
})

module.exports = Board;