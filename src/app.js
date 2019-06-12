const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../public/templates/views')
const partialsPath = path.join(__dirname,'../public/templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectory))


app.get('', (req, res) => {  //req === request and it contains information about incoming request to the server, while res === response. response allow us to customize what we are gonna send back to the requester
    res.render('index', {
        title: 'Weather',
        name: 'Gafar Raji'
    })
}) //lets us configure what the server should do when someone tries to get the resource at a specific url, maybe we should be sending back html or JSON


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is the help you need',
        name: 'Gafar Raji'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Gafar Raji'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        })
    }

   geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if(error){
        return res.send({ error })
    }
    forecast(latitude, longitude, (error, forecastData) => {
        if(error) {
            return res.send({error})
        }
        res.send({
            forecast: forecastData,
            location, 
            address: req.query.address
        })
    })
   })
    // res.send({
    //     forecast: forecast,
    //     location: geocode
    // })
})

app.get('/products', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('error', {
        title: 'Error on help page',
        name: "Gafar Raji"
    })
})

app.get('*', (req, res) =>{
    res.render('error', {
        title: 'Error!!!',
        name: 'Gafar Raji'
    })
})

app.listen(port, () =>{
    console.log('server is up on port' + port)
})