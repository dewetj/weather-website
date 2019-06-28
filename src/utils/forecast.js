//-------------------------------------------------------------------
// forecast() - Calls darksky api
//             - Takes in geo-coordinates as 2 integers and a callback function
//-------------------------------------------------------------------
const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/5defb02a0bbab1c8d5a114eb1a337f0a/'+ latitude + ',' + longitude +'?units=si';

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined);
        } else if (body.error)  {
            callback('Invalid coordinates!', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature +' degrees out with a high of '+body.daily.data[0].temperatureHigh +' degress. There is a ' + body.currently.precipProbability + '% chance of rain');
        }
    });
}

module.exports = forecast;