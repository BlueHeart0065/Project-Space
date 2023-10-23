const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    commentText : {
        type : String
    },
    commentAuthor : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
});

const Comment = mongoose.model('Comment' , commentSchema);

module.exports = Comment;