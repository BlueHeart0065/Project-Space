const User = require('../models/user');

module.exports.register = (req , res , next) => {
    res.render('register');
}

module.exports.postRegister = async (req , res , next) => {
    const {username , email , password} = req.body;

    const user = new User({username , email});

    const registeredUser = await User.register(user , password);

    req.login(registeredUser , err => {
        if(err){
            return next(err);
        }   
        req.flash('success' , 'Welcome to Project Space!!');
        res.redirect('/ProjectSpace');
    })
}

module.exports.login = (req , res , next) => {
    res.render('login');
}

module.exports.postLogin =  (req , res , next) => {
    req.flash('success' , 'Welcome to Project Space!!');
    res.redirect('/ProjectSpace');
}

module.exports.logout = (req , res , next) => {
    req.logOut(function (err) {
        if(err){
            return next(err);
        }
        req.flash('success' , 'Successfully logged out');
        res.redirect('/ProjectSpace');
    });
}
