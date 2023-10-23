
//dependencies
const express = require('express');
const ejs = require('ejs-mate');
const ejsMate = require('ejs-mate');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');


//exports
const projectRoutes = require('./routes/project-routes');
const expressError = require('./utils/expressError');
const commentRoutes = require('./routes/comment-routes');

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
app.use(flash());

app.use(session({
    secret : 'thisisthesecret',
    resave : false,
    saveUninitialized : true,
    cookie : {
        httpOnly : true,
        expires : Date.now() + (1000 * 60 * 60 * 24 * 7 ),
        maxAge : (1000 * 60 * 60 * 24 * 7 )
    }
}))

app.use((req , res , next) => {
    res.locals.success = req.flash('success');
    res.locals.deletion = req.flash('deletion');
    next();
});

app.use('/ProjectSpace/' , projectRoutes);
app.use('/' , commentRoutes);


mongoose.connect('mongodb://127.0.0.1:27017/ProjectSpace').then(() => {
    console.log('Database connected');
}).catch(err => {
    console.log('Failed to connect to database');
})

app.get('/' , (req , res) => {
    res.send('working');
});

app.all('*' , (req , res , next) => {
    next(new expressError('Page not found' , 404));
})

app.use((err , req , res , next) => {
    const {statusCode = 500} = err;
    if(!err.message) err.message = 'Something went wrong';
    res.status(statusCode).render('error' , {err , statusCode});
})

app.listen(3000 , () => {
    console.log(`app listening on port 3000`);
});