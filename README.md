# Flickr Finder
This is a test project using the Flickr API to display results related to specific keywords.

## Installation
To install, follow the follwing steps.

1. Clone this repo: `git clone git@github.com:hindmarch/flickrtest.git`
2. From the repo root folder type: `npm install`
3. Create the `.env` file (use the file provided separately, or type `cp default.env env`)
4. Start the server: `npm start`

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