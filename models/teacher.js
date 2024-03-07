const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    mobile:{
        type:String,
        require:true
    },
    adress:{
        type:String,
        require:true
    }
});

const teacherModel = mongoose.model('teacher',teacherSchema);
module.exports = teacherModel;