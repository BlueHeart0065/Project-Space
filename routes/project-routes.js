//dependencies
const express = require('express');

//exports
const Project = require('../models/project');
const projectControl = require('../controllers/project');


const router = express.Router();

router.get('/' , projectControl.index);

router.get('/new' , projectControl.new);

router.post('/new' , projectControl.postNew);

router.get('/:id/edit' , projectControl.edit);

router.put('/:id/edit' , projectControl.putEdit);

router.delete('/:id' , projectControl.delete);

router.get('/:id' , projectControl.show);




module.exports = router;