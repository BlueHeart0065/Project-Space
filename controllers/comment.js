const Project = require('../models/project');
const Comment = require('../models/comment');


module.exports.createComment = async (req , res , next) => {
    const id = req.params.id;
    const {commentText} = req.body;

    const project = await Project.findById(id);

    const comment = new Comment({
        commentText : commentText
    });

    console.log(project);

    project.comments.push(comment);
    await project.save();
    await comment.save();

    res.redirect(`/ProjectSpace/${id}`);
}

module.exports.deleteComment = async (req , res ,next) => {
    const id = req.params.id;
    const commentId = req.params.commentId;

    await Project.findByIdAndUpdate(id , {$pull : {comments : commentId}});
    await Comment.findByIdAndDelete(commentId);

    res.redirect(`/ProjectSpace/${id}`);


}