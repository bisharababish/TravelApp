/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/index.js":
/*!*************************!*\
  !*** ./client/index.js ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/app.js */ \"./client/js/app.js\");\nif ('serviceWorker' in navigator) {\n  window.addEventListener('load', () => {\n    navigator.serviceWorker.register('/service-worker.js').then(registration => {\n      console.log('Service Worker registered: ', registration);\n    }).catch(error => {\n      console.log('Service Worker registration failed: ', error);\n    });\n  });\n}\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  console.log('DOM fully loaded and parsed');\n\n  // Get DOM elements\n  const searchButton = document.getElementById('search-button');\n  const locationInput = document.getElementById('location-input');\n  const weatherDiv = document.getElementById('weather');\n  const imageDiv = document.getElementById('image');\n\n  // Default location\n  const defaultLocation = 'New York';\n\n  // Function to fetch and display travel data\n  const fetchAndDisplayData = async location => {\n    try {\n      const travelData = await (0,_js_app_js__WEBPACK_IMPORTED_MODULE_0__.fetchTravelData)(location);\n      console.log('Travel Data:', travelData);\n      if (travelData.error) {\n        weatherDiv.innerHTML = `<p>Error: ${travelData.error}</p>`;\n        imageDiv.innerHTML = '';\n      } else {\n        weatherDiv.innerHTML = `\n          <h2>${travelData.location}</h2>\n          <p>Latitude: ${travelData.latitude}</p>\n          <p>Longitude: ${travelData.longitude}</p>\n          <p>Temperature: ${travelData.temperature}°C</p>\n          <p>Weather: ${travelData.weatherDescription}</p>\n        `;\n        imageDiv.innerHTML = `\n          <img src=\"${travelData.imageUrl}\" alt=\"${travelData.location}\" />\n        `;\n      }\n    } catch (error) {\n      console.error('Error fetching travel data:', error);\n      weatherDiv.innerHTML = `<p>Error: ${error.message}</p>`;\n      imageDiv.innerHTML = '';\n    }\n  };\n\n  // Fetch data for the default location on page load\n  fetchAndDisplayData(defaultLocation);\n\n  // Add event listener for the search button\n  searchButton.addEventListener('click', () => {\n    const location = locationInput.value.trim();\n    if (location) {\n      fetchAndDisplayData(location);\n    } else {\n      alert('Please enter a valid location.');\n    }\n  });\n});\n\n//# sourceURL=webpack://fend-capstone-travel-app/./client/index.js?");

/***/ }),

/***/ "./client/js/app.js":
/*!**************************!*\
  !*** ./client/js/app.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fetchTravelData: () => (/* binding */ fetchTravelData)\n/* harmony export */ });\n// API configuration\nconst apiConfig = {\n  geonames: {\n    url: 'http://api.geonames.org/searchJSON',\n    username: process.env.REACT_APP_GEONAMES_USERNAME\n  },\n  weatherbit: {\n    url: 'https://api.weatherbit.io/v2.0/current',\n    apiKey: process.env.REACT_APP_WEATHERBIT_API_KEY\n  },\n  pixabay: {\n    url: 'https://pixabay.com/api/',\n    apiKey: process.env.REACT_APP_PIXABAY_API_KEY\n  },\n  placeholderData: {\n    location: 'New York',\n    latitude: '',\n    longitude: '',\n    temperature: '',\n    weatherDescription: '',\n    imageUrl: '',\n    error: ''\n  }\n};\n\n// Fetch geolocation data from Geonames\nconst fetchGeonamesData = async location => {\n  const {\n    url,\n    username\n  } = apiConfig.geonames;\n  try {\n    const response = await fetch(`${url}?q=${location}&maxRows=1&username=${username}`);\n    const data = await response.json();\n    if (data.geonames && data.geonames.length > 0) {\n      return {\n        latitude: data.geonames[0].lat,\n        longitude: data.geonames[0].lng\n      };\n    } else {\n      throw new Error('Location not found');\n    }\n  } catch (error) {\n    console.error('Geonames API Error:', error);\n    throw error;\n  }\n};\n\n// Fetch weather data from Weatherbit\nconst fetchWeatherbitData = async (latitude, longitude) => {\n  const {\n    url,\n    apiKey\n  } = apiConfig.weatherbit;\n  const response = await fetch(`${url}?lat=${latitude}&lon=${longitude}&key=${apiKey}`);\n  const data = await response.json();\n  if (data.data && data.data.length > 0) {\n    return {\n      temperature: data.data[0].temp,\n      weatherDescription: data.data[0].weather.description\n    };\n  }\n  throw new Error('Weather data not found');\n};\n\n// Fetch image data from Pixabay\nconst fetchPixabayData = async location => {\n  const {\n    url,\n    apiKey\n  } = apiConfig.pixabay;\n  const response = await fetch(`${url}?key=${apiKey}&q=${location}&image_type=photo`);\n  const data = await response.json();\n  if (data.hits && data.hits.length > 0) {\n    return {\n      imageUrl: data.hits[0].webformatURL\n    };\n  }\n  throw new Error('Image not found');\n};\n\n// Primary function to fetch travel data\nconst fetchTravelData = async location => {\n  try {\n    if (!location) {\n      throw new Error('Please enter a valid location.');\n    }\n    const {\n      latitude,\n      longitude\n    } = await fetchGeonamesData(location);\n    const {\n      temperature,\n      weatherDescription\n    } = await fetchWeatherbitData(latitude, longitude);\n    const {\n      imageUrl\n    } = await fetchPixabayData(location);\n    return {\n      ...apiConfig.placeholderData,\n      location,\n      latitude,\n      longitude,\n      temperature,\n      weatherDescription,\n      imageUrl\n    };\n  } catch (error) {\n    console.error('Error fetching travel data:', error.message);\n    return {\n      ...apiConfig.placeholderData,\n      location,\n      error: error.message || 'Failed to fetch travel data. Please try again.'\n    };\n  }\n};\n\n//# sourceURL=webpack://fend-capstone-travel-app/./client/js/app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./client/index.js");
/******/ 	
/******/ })()
;