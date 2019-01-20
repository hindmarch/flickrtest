'use strict';
/*jshint esversion: 6 */
/* jshint node: true */

const Twitter = require('twitter');
const twitter = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
});

exports.trendingInIreland = () => {
  return new Promise((resolve, reject) => {
    twitter.get('trends/place', {id: 23424803}, (error, trends) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(trends);
      }
    });
  });
};
