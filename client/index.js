import './styles/styles.scss';
import { fetchTravelData } from './js/app.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  // Get DOM elements
  const searchButton = document.getElementById('search-button');
  const locationInput = document.getElementById('location-input');
  const weatherDiv = document.getElementById('weather');
  const imageDiv = document.getElementById('image');

  // Function to fetch and display travel data
  const fetchAndDisplayData = async (location) => {
    try {
      const travelData = await fetchTravelData(location);
      console.log('Travel Data:', travelData); // Debugging

      if (travelData.error) {
        weatherDiv.innerHTML = `<p>Error: ${travelData.error}</p>`;
        imageDiv.innerHTML = '';
      } else {
        weatherDiv.innerHTML = `
          <h2>${travelData.location}</h2>
          <p>Latitude: ${travelData.latitude}</p>
          <p>Longitude: ${travelData.longitude}</p>
          <p>Temperature: ${travelData.temperature}°C</p>
          <p>Weather: ${travelData.weatherDescription}</p>
        `;

        imageDiv.innerHTML = `
          <img src="${travelData.imageUrl}" alt="${travelData.location}" />
        `;
      }
    } catch (error) {
      console.error('Error fetching travel data:', error);
      weatherDiv.innerHTML = `<p>Error: ${error.message}</p>`;
      imageDiv.innerHTML = '';
    }
  };

  // Added event listener for the search button
  searchButton.addEventListener('click', () => {
    const location = locationInput.value.trim();
    console.log('Search Button Clicked. Location:', location); // Debugging
    if (location) {
      fetchAndDisplayData(location);
    } else {
      alert('Please enter a valid location.');
    }
  });
});

// Register the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}