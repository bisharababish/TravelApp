const apiConfig = {
  geonames: {
    url: 'http://api.geonames.org/searchJSON',
    username: 'bisharababish',
  },
  weatherbit: {
    url: 'https://api.weatherbit.io/v2.0/current',
    apiKey: '9a750d1eb6264ec08b199adf330bbea3',
  },
  pixabay: {
    url: 'https://pixabay.com/api/',
    apiKey: '48571413-8c5433ffd3b763d0e53118687',
  },
  placeholderData: {
    location: 'New York',
    latitude: '',
    longitude: '',
    temperature: '',
    weatherDescription: '',
    imageUrl: '',
  },
};

const fetchGeonamesData = async (location) => {
  const { url, username } = apiConfig.geonames;
  try {
    const response = await fetch(`${url}?q=${location}&maxRows=1&username=${username}`);
    const data = await response.json();
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

const fetchWeatherbitData = async (latitude, longitude) => {
  const { url, apiKey } = apiConfig.weatherbit;
  const response = await fetch(`${url}?lat=${latitude}&lon=${longitude}&key=${apiKey}`);
  const data = await response.json();
  if (data.data && data.data.length > 0) {
    return {
      temperature: data.data[0].temp,
      weatherDescription: data.data[0].weather.description,
    };
  }
  throw new Error('Weather data not found');
};

const fetchPixabayData = async (location) => {
  const { url, apiKey } = apiConfig.pixabay;
  const response = await fetch(`${url}?key=${apiKey}&q=${location}&image_type=photo`);
  const data = await response.json();
  if (data.hits && data.hits.length > 0) {
    return {
      imageUrl: data.hits[0].webformatURL,
    };
  }
  throw new Error('Image not found');
};

export const fetchTravelData = async (location) => {
  try {
    const { latitude, longitude } = await fetchGeonamesData(location);
    const { temperature, weatherDescription } = await fetchWeatherbitData(latitude, longitude);
    const { imageUrl } = await fetchPixabayData(location);

    const travelData = {
      ...apiConfig.placeholderData,
      location,
      latitude,
      longitude,
      temperature,
      weatherDescription,
      imageUrl,
    };

    return travelData;
  } catch (error) {
    console.error('Error fetching travel data:', error);
    return {
      ...apiConfig.placeholderData,
      location,
    };
  }
};