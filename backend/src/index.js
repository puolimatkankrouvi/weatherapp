// const debug = require('debug')('weathermap');

const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');
const bodyParser = require('koa-bodyparser');

const appId = process.env.APPID || 'a0903457a9bebf5ad5f207cd4b267ea3';
const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';
const targetCity = process.env.TARGET_CITY || 'Helsinki,fi';

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors(), bodyParser());

const fetchWeather = async (geolocation) => {
  /*
    Now retrieves five day forecast JSON, instead of current weather
   */
  var endpoint = `${mapURI}/forecast?q=${targetCity}&appid=${appId}&`;

  // Uses geolocation's longitude and latitude if available
  if (geolocation) {
    const latitude = geolocation.lat;
    const longitude = geolocation.lon;
    endpoint = `${mapURI}/forecast?lat=${latitude}&lon=${longitude}&appid=${appId}&`;
  }

  const response = await fetch(endpoint);

  return response ? response.json() : {};
};

/* Get version for sending latitude and longitude in parameters */
router.get('/api/weather', async ctx => {
  let geolocation = null;

  if (ctx.query.lat && ctx.query.lon) {
    geolocation = { lat: ctx.query.lat, lon: ctx.query.lon, };
  }

  const weatherData = await fetchWeather(geolocation);

  ctx.type = 'application/json; charset=utf-8';
  // The second element of list-array parameter contains the weather few hours from now
  ctx.body = weatherData.list ? weatherData.list[1].weather[0] : {};
});

/* Post version for sending latitude and longitude in post body */
router.post('/api/weather', async ctx => {
  let geolocation = null;
  if (ctx.request.body.lat && ctx.request.body.lon) {
    geolocation = { lat: ctx.request.body.lat, lon: ctx.request.body.lon, };
  }
  const weatherData = await fetchWeather(geolocation);

  ctx.type = 'application/json; charset=utf-8';
  // The second element of list-array parameter contains the weather few hours from now
  ctx.body = weatherData.list ? weatherData.list[1].weather[0] : {};
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
