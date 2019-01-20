'use strict';
/*jshint esversion: 6 */
/* jshint node: true */

const Flickr = require('flickr-sdk');
const apiKey = process.env.FLICKR_API_KEY;
const flickr = new Flickr(apiKey);

exports.keywordSearch = (query, page) => {
  const request = {
    text: query,
    per_page: 20,
    page: page || 1
  };
  return flickr.photos.search(request);
};

exports.photoInfo = photo_id => {
  const request = { photo_id };
  return flickr.photos.getInfo(request);
};

exports.irelandSearch = () => {
  const request = {
    place_id: 23424803,
    per_page: 100
  };
  return flickr.photos.search(request);
};
