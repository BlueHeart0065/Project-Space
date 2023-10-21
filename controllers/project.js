const Project = require('../models/project');


module.exports.index  = async (req , res) => {
    const allProjects = await Project.find({});
    res.render('home' , {allProjects});
}

module.exports.new = (req , res) => {
    res.render('new');
}

module.exports.postNew = async (req , res) => {
    const {title , description , author , level , category , tags , contributors} = req.body;

    const newProject = new Project({
        title : title ,
        description : description , 
        author : author,
        level : level,
        category : category,
        tags : tags,
        contributors : contributors
    });

    await newProject.save();

    res.redirect('/ProjectSpace');
}

module.exports.show = async (req , res) => {
    const id = req.params.id;

    const project = await Project.findById(id);

    res.render('show' , {project});
}

module.exports.edit = async (req , res) => {
    const id = req.params.id;

    const project = await Project.findById(id);

    res.render('edit' , {project});
}

module.exports.putEdit = async (req , res) => {
    const id = req.params.id;
    const {title , description , author} = req.body;

    const editProject = await Project.findByIdAndUpdate(id , {'title' : title , 'description' : description , 'author' : author});

    await editProject.save();

    res.redirect(`/ProjectSpace/${id}`);
}

module.exports.delete = async (req , res) => {
    const id = req.params.id;

    await Project.findByIdAndDelete(id);

    res.redirect('/ProjectSpace');
}