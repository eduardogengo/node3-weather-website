const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=5af2b5da99d2196766de5f761c4fd4df&query=${latitude},${longitude}&units=m`

    request({ url, json: true }, (error, { body }) => {
        if (!!error) {
            callback('Não foi possível conectar a Weather Stack', undefined)
        } else if (!!body.error) {
            callback(body.error.info, undefined)
        } else {
            const data = body
            const current = data.current
            
            callback(undefined, {
                description:current.weather_descriptions[0],
                temperature:current.temperature,
                feelslike:current.feelslike,
                location:`${data.location.name} / ${data.location.region} / ${data.location.country}`
            })
            // console.log(`${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out, but it feels like ${current.feelslike}, degrees`)
        }
    })
}

module.exports = forecast