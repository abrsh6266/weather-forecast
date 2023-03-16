// let date_ob = new Date();
// let date = ("0" + date_ob.getDate()).slice(-2);
// // current month
// let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
// // current year
// let year = date_ob.getFullYear();
// // current hours
// let hours = date_ob.getHours();
let longitude,latitude,countryName,place;
const request = require('request');
const geocode = (address,callback) =>{
    const geoCodeUrl = 'https://api.geoapify.com/v1/geocode/search?text='+address+'&apiKey=3fef694082934bb6bc0074542984ec5a'
request({url:geoCodeUrl,json: true},(error,response)=>
{
    if(error)
    {
        callback('unable to connect to location server!!',undefined)
    }
    else if(response.body.features.length===0)
    {
        callback('Unable to search the location of the address!!!',undefined)
    }
    else
    {

        latitude = response.body.features[0].properties.lat
        longitude = response.body.features[0].properties.lon
        countryName = response.body.features[0].properties.country
        place = response.body.features[0].properties.name
        console.log('your adress status....');
        console.log('Country name = '+ countryName)
        console.log('Specific place name = '+ place)
        console.log('Latitude = '+ latitude)
        console.log('Longitude = '+ longitude)
        if(!place)
        {
            place=address;
        }
        callback(undefined,{
            latitude: latitude,
            longitude: longitude,
            place:place,
            countryName: countryName
        })
    }
})}
module.exports = geocode;