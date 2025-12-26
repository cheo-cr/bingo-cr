const CACHE_NAME = 'bingo-tico-v3.1.5';
const VERSION = '3.1.5';
const FORCE_UPDATE_DATE = '2025-12-25'; // Cambiar esta fecha para forzar actualización
const urlsToCache = [
  'index.html',
  'styles.css',
  'app.js',
  'cantos.js',
  'manifest.json'
];

// Auto-destrucción si es versión vieja
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
  if (event.data.action === 'checkVersion') {
    event.ports[0].postMessage({ version: VERSION, date: FORCE_UPDATE_DATE });
  }
});

// Instalación - cachear recursos
self.addEventListener('install', event => {
  console.log('Service Worker instalando versión:', CACHE_NAME, 'Fecha:', FORCE_UPDATE_DATE);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto:', CACHE_NAME);
        // Cachear archivos individualmente para evitar que un fallo bloquee todo
        return Promise.all(
          urlsToCache.map(url => {
            return cache.add(url).catch(err => {
              console.warn('No se pudo cachear:', url, err);
            });
          })
        );
      })
      .then(() => self.skipWaiting())
  );
});

// Activación - limpiar caches antiguos y notificar clientes
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Tomar control inmediatamente
      return self.clients.claim();
    }).then(() => {
      // Notificar a todos los clientes sobre la nueva versión
      return self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({
            type: 'VERSION_UPDATE',
            version: VERSION
          });
        });
      });
    })
  );
});

// Fetch - Network First con cache busting
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Network First para HTML, CSS, JS - SIEMPRE buscar en red primero
  if (url.pathname.endsWith('.html') || 
      url.pathname.endsWith('.css') || 
      url.pathname.endsWith('.js') || 
      url.pathname === '/' ||
      url.pathname.endsWith('/')) {
    event.respondWith(
      fetch(event.request, { cache: 'no-cache' })
        .then(response => {
          // Solo cachear si es una respuesta válida
          if (response.ok) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // Si falla la red, usar cache como fallback
          return caches.match(event.request);
        })
    );
  } else {
    // Cache First para otros recursos (imágenes, manifest, etc)
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  }
});
