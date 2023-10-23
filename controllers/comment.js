const Project = require('../models/project');
const Comment = require('../models/comment');
const flash = require('connect-flash');



module.exports.createComment = async (req , res , next) => {
    const id = req.params.id;
    const {commentText} = req.body;

    const project = await Project.findById(id);

    const comment = new Comment({
        commentText : commentText
    });

    project.comments.push(comment);
    await project.save();
    await comment.save();

    req.flash('success' , 'Comment added!!');

    res.redirect(`/ProjectSpace/${id}`);
}

module.exports.deleteComment = async (req , res ,next) => {
    const id = req.params.id;
    const commentId = req.params.commentId;

    await Project.findByIdAndUpdate(id , {$pull : {comments : commentId}});
    await Comment.findByIdAndDelete(commentId);

    req.flash('deletion' , 'Comment removed!!');

    res.redirect(`/ProjectSpace/${id}`);


}