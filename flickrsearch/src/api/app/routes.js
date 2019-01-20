'use strict';
/*jshint esversion: 6 */
/* jshint node: true */

const url = require('url');
const FlickrActions = require('./flickr-search');
const TwitterActions = require('./twitter');
const WeatherActions = require('./weather');
const NewsActions = require('./news');

module.exports = function(app, db) {

  // Finds Flickr photos using a keyword
  app.get('/flickr/photos', (req, res) => {
    var parsedUrl = url.parse(req.url, true);
    var params = parsedUrl.query;
    FlickrActions.keywordSearch(params.query, params.page)
    .then(searchResults => res.status(200).send(searchResults))
    .catch(searchError => res.status(500).send(searchError));
  });

  app.get('/flickr/info', (req, res) => {
    var parsedUrl = url.parse(req.url, true);
    var params = parsedUrl.query;
    FlickrActions.photoInfo(params.id)
    .then(searchResults => res.status(200).send(searchResults))
    .catch(searchError => res.status(500).send(searchError));
  });

  // Gets Flickr photos for Ireland (using a WOEID)
  app.get('/flickr/ireland', (req, res) => {
    FlickrActions.irelandSearch()
    .then(searchResults => res.status(200).send(searchResults))
    .catch(searchError => res.status(500).send(searchError));
  });

  // Gets the trending tags for Ireland (using a WOEID)
  app.get('/twitter/trending', (req, res) => {
    TwitterActions.trendingInIreland()
    .then(trending => res.status(200).send(trending))
    .catch(trendingError => res.status(500).send(trendingError));
  });

  // Get the weather for Dublin
  app.get('/weather/dublin', (req, res) => {
    WeatherActions.dublinWeather()
    .then(weather => res.status(200).send(weather))
    .catch(weatherError => res.status(500).send(weatherError));
  });

  // Get the news headlines
  app.get('/news/ireland', (req, res) => {
    NewsActions.headlines()
    .then(news => res.status(200).send(news))
    .catch(newsError => res.status(500).send(newsError));
  });
};
