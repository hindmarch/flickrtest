'use strict';
/*jshint esversion: 6 */
/* jshint node: true */

const url = require('url');
const FlickrActions = require('./flickr-search');
const TwitterActions = require('./twitter');

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
};
