//dependencies
const express = require('express');

//exports
const Comment = require('../models/comment');
const commentControl = require('../controllers/comment');
const wrapAsync = require('../utils/wrapAsync');
const expressError = require('../utils/expressError');
const Project = require('../models/project');



const router = express.Router();

router.post('/comments', commentControl.createComment );




module.exports = router;
