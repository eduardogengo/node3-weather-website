const request = require('postman-request')

const geocode = (address, callback) => {
    console.log('Executando GEOCODE')
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZWR1YXJkb2dlbmdvIiwiYSI6ImNrOXVic2ljcjAwNzYzb2s1enR0Z2x0dm4ifQ.NoGzg6QcfRdqV2d0FtFDdg&limit=1`

    request({ url, json: true }, (error, { body } = {}) => {
        if (!!error) {
            console.log('Caiu no primeiro erro', error)
            callback('Unable to connect to MapBox!', undefined)
        } else if (!body.features[0]) {
            callback('Invalid Location', undefined)
        } else {
            const features = body.features[0]

            callback(undefined, {
                latitude:features.center[1],
                longitude:features.center[0],
                location:features.place_name
            })
        }
    })
}

module.exports = geocode