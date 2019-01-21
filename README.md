# Flickr Finder
This is a test project using the Flickr API to display results related to specific keywords.

## Installation
To install, follow the follwing steps.

1. Make sure you have npm and Node (>8.9) installed
2. Clone this repo: `git clone https://github.com/hindmarch/flickrtest.git`
3. Traverse into the project folder: `cd flickrtest`
4. Install dependencies: `npm i`
5. Create the `.env` file in the project root (use the file provided separately, or type `cp default.env env`)
6. Start the server: `npm start`
7. Wait for the NodeJS server and Angular app to start up (look for `｢wdm｣: Compiled successfully.`)
8. Open the app at http://localhost:4200

## Features
* Flickr keyword search
* Click on photo to view larger version with title, credit, link and tags
* Click a tag to search using that tag
* Random background image from Flickr
* Find photos based on trending Twitter tags
* Find photos based on current Dublin weather conditions
* Find photos based on keywords from current Irish news stories
* Lazy loaded results

## How it works
This is an Angular and NodeJS project.
The NodeJS service uses several APIs (including Flickr) to provide results.

When the project launches, it kicks off two servers in dev mode: the Angular server and the NodeJS server.
These run on different ports.

### Angular
The Angular app makes use of a couple of key services.

#### flickr.service.ts
This service talks to the Flickr API end points/
It will perform a keyword search and grab a random image from Ireland to display as a splash photo.

#### results.service.ts
The results component is controlled by this service.
If results are passed to the results service, the results component is activated.

#### Other services
The interceptor service works with `http-interceptor.ts` to display in the UI when HTTP events are pending (i.e. it shows a loading indicator).

The secondary features (like the Twitter tags) are very simple, and only work to grab data from the API to provide the Flickr service with a keyword.

This means the weather, Twitter tags and news components are designed to output a string to the Flickr service and then use the response from Flickr to send to the results service.

### NodeJS
The NodeJS API is straight forward.
The `server.js` is launched, which then reads in the API keys in `.env` and then loads `routes.js`, which allows the API to respond to the endpoints.

All requests for data from the Angular app are sent to the NodeJS API.

## Future work
If this app were developed further, work would include:
* Unit tests
* Error handling
* Responsive layout
* API configuration reporting (i.e. API has an endpoint `/capabilities` that reports on missing API keys and if there are problems connecting to any of the third party APIs)
* Spotify chart photos: a further integration might be to use the Spotify API to pull chart data and find photos for the returned artists
* Expand on the meta data displayed next to the Flickr search results
* Display in some form the news articles that the news keywords were created from to provide some context to the displayed keywords
* Animate transitions with Angular's own animation library instead of simple CSS to allow events to be triggered upon animation completion