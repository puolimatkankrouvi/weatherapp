// const debug = require('debug')('weathermap');

const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');

const appId = process.env.APPID || 'a0903457a9bebf5ad5f207cd4b267ea3';
const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';
const targetCity = process.env.TARGET_CITY || 'Helsinki,fi';

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors());

const fetchWeather = async () => {
  // Uses geolocation longitude and latitude if available
  /*
  const geolocation = await getGeolocation();
  if(geolocation){
    latitude = geolocation.coords.latitude;
    longitude = geolocation.coords.longitude;
    endpoint = `${mapURI}/forecast?lat=${latitude}&lon={longitude}&appid=${appId}&`;
  }
  */

  /*
    Now retrieves five day forecast JSON, instead of current weather
   */
  const endpoint = `${mapURI}/forecast?q=${targetCity}&appid=${appId}&`;

  const response = await fetch(endpoint);

  return response ? response.json() : {};
};

var getGeolocation = () => {
  return {};
};

router.get('/api/weather', async ctx => {
  const weatherData = await fetchWeather();

  ctx.type = 'application/json; charset=utf-8';
  // The second element of list-array parameter contains the weather few hours from now
  ctx.body = weatherData.list ? weatherData.list[1].weather[0] : {};
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
