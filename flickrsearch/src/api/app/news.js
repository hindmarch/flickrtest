'use strict';
/*jshint esversion: 6 */
/* jshint node: true */

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWSAPI_API_KEY);
const keyword_extractor = require("keyword-extractor");

exports.headlines = () => {
  return new Promise((resolve, reject) => {
    newsapi.v2.topHeadlines({
      language: 'en',
      country: 'ie'
    })
    .then(response => {
      response.keywords = [];
      response.articles = response.articles.map(article => {
        // We want to return the article, but suffix the keywords for the article
        article.keywords = keyword_extractor.extract(
          `${article.title}, ${article.description}, ${article.content}`,
          {
            language:"english",
            remove_digits: true,
            return_changed_case:true,
            remove_duplicates: false
          }
        );
        article.keywords.map(keyword => {
          let index = response.keywords.findIndex(existingKeyword => existingKeyword.word === keyword);
          if (index > 0) {
            response.keywords[index].count ++;
          } else if(keyword.search(/[\W]/g) === -1) { // Ignore words with non alpha chars
            response.keywords.push({word: keyword, count: 1});
          }
        });

        // Get top 25 keywords
        response.keywords = response.keywords
          .filter(keyword => keyword.count > 1)
          .sort((a, b) => a.count > b.count ? -1 : 1)
          .splice(0, 25);

        return article;
      });
      return resolve(response);
    })
    .catch(err => reject(err));
  });
};
