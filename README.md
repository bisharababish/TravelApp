## Travel App


### Overview:

#### A web application that allows users to search for travel destinations and view weather information and location images.

### Features

#### 1.Search for any destination worldwide
#### 2.Display current weather conditions including temperature
#### 3.Show location coordinates (latitude and longitude)
#### 4.Display relevant images of the destination
#### 4.Responsive design that works on desktop and mobile devices
#### 6.Progressive Web App (PWA) capabilities with service worker integration

### Technologies Used

#### HTML5, CSS3 (SCSS)
#### JavaScript (ES6+)
#### Webpack for bundling and asset management
#### Service Workers for offline functionality
#### Responsive design using CSS media queries

### Installation:
#### 1. Run `npm install` to install dependencies.
#### 2. Run `npm start` to start the server.
#### 3. Run `npm run dev`
#### 4. Open `http://localhost:9001` in your browser.


### Usage

#### Enter a location (city or country) in the input field
#### Click the "Search" button
#### View the weather information and image of the specified location

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

#### node version: v22.11.0
