'use strict';
/*jshint esversion: 6 */
/* jshint node: true */

const url = require('url');
const Flickr = require('./flickr-search');

module.exports = function(app, db) {

  // Finds Flickr photos using a keyword
  app.get('/flickr/photos', (req, res) => {
    var parsedUrl = url.parse(req.url, true);
    var params = parsedUrl.query;
    Flickr.keywordSearch(params.query, params.page)
      .then(searchResults => res.status(200).send(searchResults))
      .catch(searchError => res.status(500).send(searchError));
  });


  app.get('/flickr/info', (req, res) => {
    var parsedUrl = url.parse(req.url, true);
    var params = parsedUrl.query;
    Flickr.photoInfo(params.id)
      .then(searchResults => res.status(200).send(searchResults))
      .catch(searchError => res.status(500).send(searchError));
  });

  // Gets Flickr photos for Dublin (using a place id)
  app.get('/flickr/ireland', (req, res) => {
    Flickr.irelandSearch()
      .then(searchResults => res.status(200).send(searchResults))
      .catch(searchError => res.status(500).send(searchError));
  })
};
