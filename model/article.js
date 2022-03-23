let mongoose = require('mongoose');

let articleSchema = new mongoose.Schema({
    title : {
        type : String,
       required: true

    },
    author:{
        type : String,
       required: true
    },
    body:{
        type : String,
       required : true
    }

});

const models=module.exports   = mongoose.model('Article', articleSchema);
