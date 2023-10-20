//dependencies
const mongoose = require('mongoose');

//exports
const Project = require('../models/project');
const projectData = require('./projectData');



mongoose.connect('mongodb://127.0.0.1:27017/ProjectSpace').then(() => {
    console.log('Database connected');
}).catch(err => {
    console.log('Failed to connect to database');
})


const seedDB = async () => {

    await Project.deleteMany({});
    for(let i = 0 ; i < 9 ; i++){ 
        const randomNumber = Math.floor((Math.random()*15) + 1);
        console.log(randomNumber);

        const seedProject = new Project({
            title : `${projectData[randomNumber].title}`,
            description : `${projectData[randomNumber].description}`,
            author : `${projectData[randomNumber].author}`,
            image : 'https://www.elprocus.com/wp-content/uploads/Arduino-Uno-Projects.jpg'
        });

        await seedProject.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})