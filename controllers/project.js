const Project = require('../models/project');
const flash = require('connect-flash');
const {cloudinary} = require('../cloudinary');



module.exports.index  = async (req , res , next) => {
    const allProjects = await Project.find({});
    res.render('home' , {allProjects});
}

module.exports.new = (req , res , next) => {
    res.render('new');
}

module.exports.postNew = async (req , res , next) => {
    const {title , description , project_level , category , tags , contributors} = req.body;

    const newProject = new Project({
        title : title ,
        description : description , 
        project_level : project_level,
        category : category,
        tags : tags,
        contributors : contributors
    });

    newProject.images = req.files.map(f => ({url : f.path , filename : f.filename}))

    await newProject.save();
    req.flash('success' , 'Your project has been uploaded successfully!!');
    res.redirect(`/ProjectSpace/${newProject.id}`);
}

module.exports.show = async (req , res , next) => {
    const id = req.params.id;

    const project = await Project.findById(id).populate('comments');

    res.render('show' , {project});
}

module.exports.edit = async (req , res , next) => {
    const id = req.params.id;

    const project = await Project.findById(id);

    res.render('edit' , {project});
}

module.exports.putEdit = async (req , res , next) => {
    const id = req.params.id;
    const {title , description , author , project_level , category , tags , contributors} = req.body;

    const editProject = await Project.findByIdAndUpdate(id , 
        {
        'title' : title ,
        'description' : description ,
        'author' : author ,
        'project_level' : project_level ,
        'category' : category,
        'tags' : tags,
        'contributors' : contributors
    });

    const imgs = req.files.map(f => ({url : f.path , filename : f.filename}));
    editProject.images.push(...imgs);

    if(req.body.deleteimages){
        for(let filename of req.body.deleteimages){
            await cloudinary.uploader.destroy(filename);
        }
        await editProject.updateOne({$pull : {images : {filename : {$in:  req.body.deleteimages}}}});
        
    }

    await editProject.save();
    req.flash('success' , 'Project updated successfully!!');

    res.redirect(`/ProjectSpace/${id}`);
}

module.exports.delete = async (req , res , next) => {
    const id = req.params.id;

    await Project.findByIdAndDelete(id);
    req.flash('deletion' , 'Your project has been deleted!!');

    res.redirect('/ProjectSpace');
}