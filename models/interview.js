const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    uid:{
        type:String,
        required:true,
        unique:true
    },
    startDate:{
        type: Date,
        required:true,
    },
    endDate:{
        type: Date,
        required:true,
    },
    participants:[String]
});

module.exports = mongoose.model("interview",interviewSchema);