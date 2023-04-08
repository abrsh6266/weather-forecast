const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const request = require('request');
const express = require('express');
const hbs = require('hbs')
const { rmSync } = require('fs');
const path = require('path')
const app = express();
const port = process.env.PORT || 3001
console.log(__dirname)
const publicDirectory = path.join(__dirname,'../public')
const viewDirectory = path.join(__dirname,'../templates/views')
const partialDirectory = path.join(__dirname,'../templates/partials')
app.set('view engine','hbs')
app.set('views',viewDirectory)
hbs.registerPartials(partialDirectory);
app.use(express.static(publicDirectory))
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: ' please provide the address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,countryName,place}={}) =>{
        if(error)
        {
            return res.send({error})
        }
        forecast(latitude,longitude, (error, {temp,speed}={}) => {
        res.send({
            temprature: temp,
            location: place+','+countryName,
            windspeed: speed
        })
    })
    })
})
app.get('',(req,res) =>{
    res.render('index',{
        title: 'Weather',
        name: 'abrsh  xo9'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'about page',
        name: 'abrsh  xo9'
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error: 'please provide the search value!!'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'help page',
        name: 'abrsh  xo9'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404error',{
        title: '404 Error',
        err:'Help article is not found',
        name:'abrsh  xo9'
    })
})
app.get('*',(req,res)=>{
    res.render('404error',{
        title: '404 Error',
        err:'Page not found',
       name:'abrsh  xo9'
    })
})
app.listen(port,()=>{
    console.log('port number ',port)
})