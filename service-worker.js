// Service Worker MINIMO - Solo para permitir instalacion PWA
// NO CACHEA NADA - Siempre busca en la red

const VERSION = '3.2.0';

// Instalacion - No cachear nada
self.addEventListener('install', event => {
    console.log('SW v' + VERSION + ' instalado');
    self.skipWaiting();
});

// Activacion - Eliminar todos los caches antiguos
self.addEventListener('activate', event => {
    console.log('SW v' + VERSION + ' activado');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    console.log('Eliminando cache:', cacheName);
                    return caches.delete(cacheName);
                })
            );
        }).then(() => {
            return self.clients.claim();
        })
    );
});

// Fetch - SIEMPRE ir a la red, NUNCA usar cache
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request, { 
            cache: 'no-store'
        }).catch(error => {
            console.log('Error de red:', error);
            return new Response('Sin conexion', { status: 503 });
        })
    );
});
