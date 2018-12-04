const yargs = require('yargs');
const axios = require('axios');

const API_KEY = 'AIzaSyAeJbT73ajsPMRC6-dBovP59qlm5UX5xCk';
const DarkSkyAPIKEY = 'ef8345307d41be1c729889b61d5ed70f';

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

//console.log(argv);

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${API_KEY}`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address');
  }

  //console.log(response);
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;

  var weatherUrl = `https://api.forecast.io/forecast/${DarkSkyAPIKEY}/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  console.log(response.data);

  return axios.get(weatherUrl);

}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);
}).catch((err) => {
  if (err.code === 'ENOTFOUND') {
    console.log('enable to connect to API servers');
  }
  console.log(err);
});
