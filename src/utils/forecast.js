const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/1ba078864c4e10d2ef6d503a493978fc/'+ latitude + ',' + longitude + '?units=si&lang=en'

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to reach forecast services!', undefined)
        } else if(body.error) {
            callback('Unable to find location. Try another forecast', undefined)
        } else {
            callback(undefined, `${body.daily.summary} It is currently ${body.currently.temperature} degrees out there. There is a ${body.currently.precipProbability}% chance of rain `)
        }
    })
}

module.exports = forecast