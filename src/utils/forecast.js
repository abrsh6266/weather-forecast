// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
const request = require('request');
const forecast = (latitude,longitude,callback) =>{
    const url = 'https://api.open-meteo.com/v1/forecast?latitude='+latitude+'&longitude='+longitude+'&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m'
    request({url:url,json:true},(error,response) =>{
        if(error)
        {
            callback('unable to connect to location server!!',undefined)
        }
        else if(response.body.error)
        {
            callback(response.body.reason,undefined)
        }
        else
        {
            console.log('it is currently ',response.body.current_weather.temperature,'degrees. and It has a wind speed ',response.body.current_weather.windspeed,'km/h')
            callback(undefined,{
                temp: response.body.current_weather.temperature+' degrees out',
                speed: response.body.current_weather.windspeed+' Km/h'
            })
        }
    })
}
  module.exports = forecast;