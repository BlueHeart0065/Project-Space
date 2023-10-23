//dependencies
const express = require('express');
const joi = require('joi');

//exports
const Comment = require('../models/comment');
const commentControl = require('../controllers/comment');
const wrapAsync = require('../utils/wrapAsync');
const expressError = require('../utils/expressError');
const Project = require('../models/project');


const validateComment = (req , res , next) => {

    const commentSchema = joi.object({
        commentText : joi.string().required()
    });

    const {error} = commentSchema.validate(req.body);

    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new expressError(msg , 400);
    }
    else{
        next();
    }
}


const router = express.Router();

router.post('/ProjectSpace/:id/comments',validateComment ,commentControl.createComment );

router.delete('/ProjectSpace/:id/:commentId' , commentControl.deleteComment);




module.exports = router;
