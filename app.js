const express = require('express');
const path = require('path');

const app = express();
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' });

const fortune = require('./lib/fortune');


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    res.locals.showTest = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about', { 
      fortune: fortune.getFortune(),
      pageTestScript: '/qa/tests-about.js'
    });
});

app.get('/tours/hood-rever', (req, res) => {
  res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', (req, res) => {
  res.render('tours/request-group-rate');
});

// obrabotchik 404 Middleware
app.use((req, res, next) => {
    res.status(404);
    res.render('404');
});

// obrabotchik oshibki 500 Middleware
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), () => {
    console.log(`Express server works on ` + app.get('port'));
});


