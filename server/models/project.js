const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
    },
    pimg:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    cat:{
        type:String,
        required:true,
    }

})

module.exports = mongoose.model('Project', projectSchema);