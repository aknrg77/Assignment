const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    uid:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type: String,
        default: null
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    type :{
        type:String,
        enum: ["admin", "interviewee", "interviewer"],
        default: "interviewee"
    }
});

module.exports = mongoose.model("user",userSchema);