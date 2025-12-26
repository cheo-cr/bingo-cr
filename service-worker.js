const CACHE_NAME = 'bingo-tico-v3.1.1';
const urlsToCache = [
  'index.html',
  'styles.css',
  'app.js',
  'cantos.js',
  'manifest.json'
];

// Instalación - cachear recursos
self.addEventListener('install', event => {
  console.log('Service Worker instalando versión:', CACHE_NAME);
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

// Activación - limpiar caches antiguos
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
    })
  );
  self.clients.claim();
});

// Fetch - Network First para archivos principales, Cache para recursos estáticos
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Network First para HTML, CSS, JS
  if (url.pathname.endsWith('.html') || 
      url.pathname.endsWith('.css') || 
      url.pathname.endsWith('.js') || 
      url.pathname === '/' ||
      url.pathname === '/index.html') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cachear la nueva respuesta
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // Si falla la red, usar cache
          return caches.match(event.request);
        })
    );
  } else {
    // Cache First para otros recursos
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  }
});
