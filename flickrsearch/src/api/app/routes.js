'use strict';
/*jshint esversion: 6 */
/* jshint node: true */

const url = require('url');
const flickr = require('./flickrSearch').flickrSearch;

module.exports = function(app, db) {
  app.get('/flickr', (req, res) => {
    var parsedUrl = url.parse(req.url, true);
    var params = parsedUrl.query;
    console.log(params);
    flickr(params.query)
      .then(searchResults => res.status(200).send(searchResults))
      .catch(searchError => res.status(500).send(searchError));
  });
};
