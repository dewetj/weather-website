//External
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const request = require('request');

//Internal
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for Express config
const publicDirectoryPath= path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'DWJ'
    });
});

//app.com/about
app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'DWJ'
    });
});

//app.com/help
app.get('/help',(req, res) => {
    res.render('help', {
        title: 'Help page',
        helpText: 'Please help me I fucked up!',
        name: 'DWJ'
    });
});

//app.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    };

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({
                error: error
            });
        };

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                });
            };
        
            return res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    };

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found.',
        name: 'DWJ'
    });
});

//app.com/404 
//Page asterics indicates everything else wildcard so keep this last
app.get('*',(req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'DWJ'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});