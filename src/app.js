const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// __dirname, __filename comes from wrapper function that we see in debugger.
// console.log(__dirname);

const app = express();

// Define paths for Express Config.
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setting up handlebars. Also it looks at views directory.
app.set('view engine', 'hbs');
// To set customized views path.
app.set('views', viewsPath);
// Configure partials
hbs.registerPartials(partialsPath);

// To serve the directory. To customize the server to use static contents.
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Vipul Goel'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Vipul Goel'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        body: 'Contact Support',
        name: 'Vipul Goel'
    })
});


// Static will take it up.
// app.get('',(req, res)=>{
//     res.send('<h1>Weather</h1>');
// });

// app.get('/help',(req,res)=>{
//     res.send([{
//         name: 'Vipul',
//         age: 24
//     },{
//         name: 'Sarthak',
//         age: 13
//     }]);
// });

// app.get('/about',(req,res)=>{
//     res.send('<b>About page</b>');
// });

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    // Destructure undefined we get a javascript error
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({
                    error
                });
            }
            return res.send({
                forecast: data,
                location,
                address: req.query.address
            });
        })

    });
    // res.send({
    //     forecast: 'Forecast',
    //     location : req.query.address,
    //     address: req.query.address
    // });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found.',
        title: 'Error Page',
        name: 'Vipul Goel'
    });
});

// Match anything that hasnt been matched so far.
app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found.',
        title: '404',
        name: 'Vipul Goel'
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
});

