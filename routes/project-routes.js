//dependencies
const express = require('express');
const joi = require('joi');

//exports
const Project = require('../models/project');
const projectControl = require('../controllers/project');
const wrapAsync = require('../utils/wrapAsync');
const expressError = require('../utils/expressError');

const validateProject = (req ,res , next) => {

    const projectSchema = joi.object({
        title : joi.string().required(),
        description : joi.string().required(),
        // category : joi.array().items(joi.string()).required(),
        category : joi.string(),
        tags : joi.string(),
        project_level : joi.string(),
        contributors : joi.string()
    });

    const {error} = projectSchema.validate(req.body);

    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new expressError(msg , 400);
    }
    else{
        next();
    }
};

const isLoggedin = (req , res , next) => {
    if(!req.isAuthenticated()){
        req.flash('failure' , 'You need to be logged in to perform this action');
        req.session.returnTo = req.originalUrl;

        return res.redirect('/ProjectSpace/login');
    }
    next();
}

const isAuthor = async (req , res , next) => {
    const id = req.params.id;
    
    const project = await Project.findById(id);
    const authorID = project.author;

    if(req.user.id != authorID){
        req.flash('failure' , 'You do not have the permission to perform that action');
        return res.redirect(`/ProjectSpace/${id}`);
    }

}


const router = express.Router();

router.get('/' , wrapAsync(projectControl.index));

router.get('/new' , isLoggedin ,projectControl.new);

router.post('/new' , isLoggedin ,validateProject , wrapAsync(projectControl.postNew));

router.get('/:id/edit' , isLoggedin, isAuthor ,wrapAsync(projectControl.edit));

router.put('/:id/edit' , isLoggedin, isAuthor ,validateProject ,wrapAsync(projectControl.putEdit));

router.delete('/:id' , isLoggedin, isAuthor ,wrapAsync(projectControl.delete));

router.get('/:id' , wrapAsync(projectControl.show));




module.exports = router;