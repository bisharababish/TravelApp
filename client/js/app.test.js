import { jest } from '@jest/globals';
import { fetchTravelData } from './app';

// Mock the fetch function
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () =>
            Promise.resolve({
                geonames: [
                    {
                        lat: '40.7128',
                        lng: '-74.0060',
                    },
                ],
                data: [
                    {
                        temp: 15,
                        weather: { description: 'Clear sky' },
                    },
                ],
                hits: [
                    {
                        webformatURL: 'https://tinyurl.com/bdzb8tjw',
                    },
                ],
            }),
    })
);

describe('fetchTravelData', () => {
    it('should fetch travel data for a valid location', async () => {
        const data = await fetchTravelData('New York');
        expect(data).toBeDefined();
        expect(data.latitude).toBe('40.7128');
        expect(data.longitude).toBe('-74.0060');
        expect(data.temperature).toBe(15);
        expect(data.weatherDescription).toBe('Clear sky');
        expect(data.imageUrl).toBe('https://tinyurl.com/bdzb8tjw'); // Ensure this matches the mock data
    });

    it('should return placeholder data for an invalid location', async () => {
        fetch.mockImplementationOnce(() => Promise.reject(new Error('Location not found')));
        const data = await fetchTravelData('InvalidLocation');
        expect(data).toEqual({
            location: 'InvalidLocation',
            latitude: '',
            longitude: '',
            temperature: '',
            weatherDescription: '',
            imageUrl: '',
        });
    });
});