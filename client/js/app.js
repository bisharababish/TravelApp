// API configuration
const apiConfig = {
  geonames: {
    url: 'http://api.geonames.org/searchJSON',
    username: process.env.REACT_APP_GEONAMES_USERNAME,
  },
  weatherbit: {
    url: 'https://api.weatherbit.io/v2.0/current',
    apiKey: process.env.REACT_APP_WEATHERBIT_API_KEY,
  },
  pixabay: {
    url: 'https://pixabay.com/api/',
    apiKey: process.env.REACT_APP_PIXABAY_API_KEY,
  },
  placeholderData: {
    location: 'New York',
    latitude: '',
    longitude: '',
    temperature: '',
    weatherDescription: '',
    imageUrl: '',
    error: '',
  },
};

// Fetch geolocation data from Geonames
const fetchGeonamesData = async (location) => {
  const { url, username } = apiConfig.geonames;
  try {
    const response = await fetch(`${url}?q=${location}&maxRows=1&username=${username}`);
    if (!response.ok) {
      throw new Error(`Geonames API Error: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Geonames API Response:', data); // Debugging
    if (data.geonames && data.geonames.length > 0) {
      return {
        latitude: data.geonames[0].lat,
        longitude: data.geonames[0].lng,
      };
    } else {
      throw new Error('Location not found');
    }
  } catch (error) {
    console.error('Geonames API Error:', error);
    throw error;
  }
};

// Fetch weather data from Weatherbit
const fetchWeatherbitData = async (latitude, longitude) => {
  const { url, apiKey } = apiConfig.weatherbit;
  try {
    const response = await fetch(`${url}?lat=${latitude}&lon=${longitude}&key=${apiKey}`);
    if (!response.ok) {
      throw new Error(`Weatherbit API Error: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Weatherbit API Response:', data); // Debugging
    if (data.data && data.data.length > 0) {
      return {
        temperature: data.data[0].temp,
        weatherDescription: data.data[0].weather.description,
      };
    } else {
      throw new Error('Weather data not found');
    }
  } catch (error) {
    console.error('Weatherbit API Error:', error);
    throw error;
  }
};

// Fetch image data from Pixabay
const fetchPixabayData = async (location) => {
  const { url, apiKey } = apiConfig.pixabay;
  try {
    const response = await fetch(`${url}?key=${apiKey}&q=${location}&image_type=photo`);
    if (!response.ok) {
      throw new Error(`Pixabay API Error: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Pixabay API Response:', data); // Debugging
    if (data.hits && data.hits.length > 0) {
      // Select a random image from the hits array
      const randomIndex = Math.floor(Math.random() * data.hits.length);
      return {
        imageUrl: data.hits[randomIndex].webformatURL,
      };
    } else {
      throw new Error('Image not found');
    }
  } catch (error) {
    console.error('Pixabay API Error:', error);
    throw error;
  }
};

// Primary function to fetch travel data
export const fetchTravelData = async (location) => {
  try {
    if (!location) {
      throw new Error('Please enter a valid location.');
    }

    const { latitude, longitude } = await fetchGeonamesData(location);
    const { temperature, weatherDescription } = await fetchWeatherbitData(latitude, longitude);
    const { imageUrl } = await fetchPixabayData(location);

    return {
      ...apiConfig.placeholderData,
      location,
      latitude,
      longitude,
      temperature,
      weatherDescription,
      imageUrl,
    };
  } catch (error) {
    console.error('Error fetching travel data:', error.message);
    return {
      ...apiConfig.placeholderData,
      location,
      error: error.message || 'Failed to fetch travel data. Please try again.',
    };
  }
};