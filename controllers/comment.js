const Project = require('../models/project');
const Comment = require('../models/comment');


module.exports.createComment = async (req , res , next) => {
    const id = req.params.id;
    const {commentText} = req.body;

    const project = await Project.findById(id);

    const comment = new Comment({
        commentText : commentText
    });

    console.log(comment);

    project.comments.push(comment);
    await project.save();
    await comment.save();

    res.redirect(`/ProjectSpace/${id}`);
}