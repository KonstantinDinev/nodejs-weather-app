const request = require('request');

const DarkSkyAPIKEY = 'ef8345307d41be1c729889b61d5ed70f';

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.forecast.io/forecast/${DarkSkyAPIKEY}/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else if (response.statusCode === 400) {
      callback('Unable to fetch weather');
    } else {
      callback('Unable to connect to Forecast.io server.');
    }
  });
};

module.exports.getWeather = getWeather;
