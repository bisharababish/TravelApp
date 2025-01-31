import { fetchWeather } from './app';

describe('fetchWeather', () => {
    it('fetches weather data', async () => {
        const data = await fetchWeather('New York');
        expect(data).toBeDefined();
    });
});