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
        category : joi.array().items(joi.string()).required,
        tags : joi.array().items(joi.string()).required(),
        project_level : joi.string().required(),
        author : joi.string().required(),
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



const router = express.Router();

router.get('/' , wrapAsync(projectControl.index));

router.get('/new' , projectControl.new);

router.post('/new' ,validateProject , wrapAsync(projectControl.postNew));

router.get('/:id/edit' , wrapAsync(projectControl.edit));

router.put('/:id/edit' , validateProject ,wrapAsync(projectControl.putEdit));

router.delete('/:id' , wrapAsync(projectControl.delete));

router.get('/:id' , wrapAsync(projectControl.show));




module.exports = router;