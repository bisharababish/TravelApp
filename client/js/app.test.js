import { jest } from '@jest/globals';
import { fetchTravelData } from './app';

// Mock the fetch function
global.fetch = jest.fn((url) => {
    if (url.includes('geonames.org')) {
        // Mock Geonames API response
        return Promise.resolve({
            ok: true,
            json: () =>
                Promise.resolve({
                    geonames: [
                        {
                            lat: '40.7128',
                            lng: '-74.0060',
                        },
                    ],
                }),
        });
    } else if (url.includes('weatherbit.io')) {
        // Mock Weatherbit API response
        return Promise.resolve({
            ok: true,
            json: () =>
                Promise.resolve({
                    data: [
                        {
                            temp: 15,
                            weather: {
                                description: 'Clear sky',
                            },
                        },
                    ],
                }),
        });
    } else if (url.includes('pixabay.com')) {
        // Mock Pixabay API response
        return Promise.resolve({
            ok: true,
            json: () =>
                Promise.resolve({
                    hits: [
                        {
                            webformatURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS39yNND6SoflwC2ceV3OxcbhntjOEqu3aquQ&s',
                        },
                    ],
                }),
        });
    } else {
        // Mock an error for invalid URLs
        return Promise.reject(new Error('Invalid API URL'));
    }
});

describe('fetchTravelData', () => {
    it('should fetch travel data for a valid location', async () => {
        const data = await fetchTravelData('New York');
        expect(data).toBeDefined();
        expect(data.latitude).toBe('40.7128');
        expect(data.longitude).toBe('-74.0060');
        expect(data.temperature).toBe(15);
        expect(data.weatherDescription).toBe('Clear sky');
        expect(data.imageUrl).toBe('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS39yNND6SoflwC2ceV3OxcbhntjOEqu3aquQ&s');
    });

    it('should return placeholder data for an invalid location', async () => {
        // Mock a failed Geonames API call
        fetch.mockImplementationOnce(() =>
            Promise.reject(new Error('Location not found'))
        );

        const data = await fetchTravelData('InvalidLocation');
        expect(data).toEqual({
            location: 'InvalidLocation',
            latitude: '',
            longitude: '',
            temperature: '',
            weatherDescription: '',
            imageUrl: '',
            error: 'Location not found',
        });
    });
});