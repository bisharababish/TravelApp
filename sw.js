import { precacheAndRoute } from 'workbox-precaching';

// Precache all assets defined by webpack
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install', (event) => {
    console.log('Service Worker installing.');
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activating.');
});