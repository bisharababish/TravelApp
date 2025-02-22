if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered: ', registration);
      })
      .catch((error) => {
        console.log('Service Worker registration failed: ', error);
      });
  });
}

import { fetchTravelData } from './js/app.js';

// Example usage of fetchTravelData
document.addEventListener('DOMContentLoaded', async () => {
  const location = 'New York'; // Default location
  const travelData = await fetchTravelData(location);

  const weatherDiv = document.getElementById('weather');
  const imageDiv = document.getElementById('image');

  if (travelData.error) {
    weatherDiv.innerHTML = `<p>Error: ${travelData.error}</p>`;
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
});