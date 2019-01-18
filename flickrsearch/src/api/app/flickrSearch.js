'use strict';
/*jshint esversion: 6 */
/* jshint node: true */

const Flickr = require('flickr-sdk');

exports.flickrSearch = (query, page) => {
  const apiKey = process.env.FLICKR_API_KEY;
  const flickr = new Flickr(apiKey);
  const request = {
    text: query,
    per_page: 20,
    page: page || 1
  };
  return flickr.photos.search(request);
};
