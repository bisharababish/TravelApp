import { fetchTravelData } from './js/app.js';

document.addEventListener('DOMContentLoaded', async () => {
  const location = 'New York';
  const travelData = await fetchTravelData(location);

  const weatherDiv = document.getElementById('weather');
  const imageDiv = document.getElementById('image');

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
});