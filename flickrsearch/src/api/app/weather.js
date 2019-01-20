'use strict';
/*jshint esversion: 6 */
/* jshint node: true */

const weather = require('openweather-apis');
exports.dublinWeather = () => {
  weather.setLang('en');
  weather.setUnits('metric');
  weather.setAPPID(process.env.OPEN_WEATHER_MAP_API_KEY);
  weather.setCityId(2964574);
  return new Promise((resolve, reject) => {
    weather.getAllWeather((err, desc) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(desc);
      }
    });
  });
};

