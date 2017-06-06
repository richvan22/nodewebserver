const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs'); // key value pair to tell app what to use
//middleware order matters
app.use((req, res, next) => { // next to tell app when you are done
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (e) => {
        if (e) {
            console.log('unable to append to server.log');
        }
    });
    next(); // tell app to move on to next middleware
}); // app.use to register middleware, takes a function as arg

//app.use((req, res, next) => {
//    res.render('maintenance.hbs');
//});

app.use(express.static(__dirname + '/public')); // tells app where to search for static files


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
}); //functions you can run withiin templates 1st arg name 2nd function

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
}); 

hbs.registerHelper()
app.get('/', (req, res) => {
    res.render('home.hbs', { //optional 2nd arg to pass dynamic properties used in declared file.
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to home page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', { //optional 2nd arg to pass dynamic properties used in declared file.
        pageTitle: 'About Page',
    });
});


app.listen(port, () => {
    console.log(`serving up files... on ${port}`);
}); //optional 2nd arg what to do before app is served.
