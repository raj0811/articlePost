const mongoose = require('mongoose');
const path = require('path');


const articleSchema = new mongoose.Schema({

    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    auther:{
        type: String,
        require: true
    },
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    postedAt:{
        type:Date,
        default: Date.now
    }

}, {
    timestamps: true
});



const Article = mongoose.model('Article', articleSchema);

module.exports = Article;