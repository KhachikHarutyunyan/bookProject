const express = require('express');
const path = require('path');

const app = express();
const handlebars = require('express-handlebars').create({ defaultLayout: 'main',
    helpers: {
        section: function(name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});
// const handlebars = require('express-handlebars').create({ extname: '.hbs' });

const fortune = require('./lib/fortune');

function getWeatherData() {
    return {
        locations: [
            {
                name: 'Portland',
                forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
                weather: 'Sploshnaya oblachnost ',
                temp: '54.1 F (12.3 C)'
            },
            {
                name: 'Bend',
                forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
                weather: 'Malooblachno ',
                temp: '55.0 F (12.8 C)'
            },
            {
                name: 'Manzanita',
                forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
                weather: 'Nebolshoi dojd ',
                temp: '55.0 F (12.8 C)'
            }
        ]
    };
}

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

app.get('/nursery-rhyme', (req, res) => {
    res.render('nursery-rhyme');
});

app.get('/data/nursery-rhyme', (req, res) => {
    res.json({
        animal: 'belchonok',
        bodyPart: 'xvost',
        adjictive: 'pushist@i',
        noune: 'chiort'
    });
});

// app.use((req, res, next) => {
//     if (!res.locals.partials) res.locals.partials = {};
//     res.locals.partials.weatherContext = getWeatherData();
//     next();
// });

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


