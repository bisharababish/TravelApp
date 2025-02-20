## FEND Capstone - Travel App

### Overview:

#### The Travel App is a web application developed as part of the Front End Nanodegree (FEND) Capstone  project. It allows users to plan trips by providing weather forecasts, destination images, and  other relevant information. The app integrates with multiple APIs (geonames, Weatherbit, Pixabay) to fetch real-time data and offers offline capabilities using service workers.

### Features:

#### Weather Forecast: Get weather information for your travel destination.

#### Destination Images: View images of your travel destination.

#### Offline Capabilities: Use the app even without an internet connection.

#### Responsive Design: Works seamlessly on both desktop and mobile devices.

### Installation:
#### 1. Run `npm install` to install dependencies.
#### 2. Run `npm start` to start the server.
#### 3. Open `http://localhost:9000` in your browser.
#### 4. npx http-server dist for existing https servers


### Dependencies:

#### Express: For setting up the server.

#### Webpack: For bundling the application.

#### Sass: For styling the app.

#### Workbox: For enabling offline capabilities.


### API Integration:
#### The app integrates with the following APIs:

#### Weatherbit: Provides weather forecasts for the travel destination.

#### Pixabay: Fetches images of the travel destination.
#### geonames: Geographical database with global locations.

#### To use these APIs, you need to obtain API keys from their respective websites and add them to the server.js file.

### Installation:

#### 1. Run `npm install` to install dependencies.
#### 2. Run `npm start` to start the server.
#### 3. Open `http://localhost:9000` in your browser.
#### 4. npx http-server dist for existing https servers

#### node  version: v22.11.0