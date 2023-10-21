
//dependencies
const express = require('express');
const ejs = require('ejs-mate');
const ejsMate = require('ejs-mate');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');


//exports
const projectRoutes = require('./routes/project-routes');
const expressError = require('./utils/expressError');
const wrapAsync = require('./utils/wrapAsync');

const app = express();

//uses
app.use(express.static(path.join(__dirname , 'views')));
app.use(express.static(path.join(__dirname , 'public')));
app.use(express.static(path.join(__dirname , 'assets')));
app.set('view engine' , 'ejs');
app.engine('ejs' , ejsMate);
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use('/ProjectSpace/' , projectRoutes);


mongoose.connect('mongodb://127.0.0.1:27017/ProjectSpace').then(() => {
    console.log('Database connected');
}).catch(err => {
    console.log('Failed to connect to database');
})

app.get('/' , (req , res) => {
    res.send('working');
});

app.use((err , req , res , next) => {
    const {statusCode = 500} = err;
    if(!err.message) err.message = 'Something went wrong';
    res.status(statusCode).render('error' , {err , statusCode});
})

app.listen(3000 , () => {
    console.log(`app listening on port 3000`);
});