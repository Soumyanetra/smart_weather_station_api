const express = require('express');
const { getWeatherData } = require('../controllers/WeatherInfo__controller__')
const { setWeatherData } = require('../controllers/Hardware__controller__')
const { setCordinate } = require('../controllers/Hardware__controller__')

const router = express.Router()

router.post('/weather', getWeatherData);
router.post('/setWeather', setWeatherData);
router.post('/setCordinate', setCordinate);

module.exports = {
    routes: router
}