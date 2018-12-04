const request = require('request');

// const GOOGLE_URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${API_KEY}`

geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address)

  const API_KEY = 'AIzaSyAeJbT73ajsPMRC6-dBovP59qlm5UX5xCk';

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${API_KEY}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Google servers.');
    }
    else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find that address');
    }
    else if (body.status === 'OK')
    {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });

      console.log(JSON.stringify(body, undefined, 2));
      console.log(`Address: ${body.results[0].formatted_address}`);
      console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
      console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
    }
    else {
      console.log(body.status);
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;

// DarkSky API
// ef8345307d41be1c729889b61d5ed70f
