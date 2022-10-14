const CACHE_NAME = "version-1";
const urlsToCache = [ 'index.html',  'offLine.html' ];
// Instalar SW
self.addEventListener('install', (event) =>{
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache)=>{
            console.log('JJRO: Opened cache');
            return cache.addAll(urlsToCache);
        })
    )
})
// Escuchar respuesta
self.addEventListener('fetch', (event) =>{
    event.respondWith(
        caches.match(event.request)
            .then(()=> {
                console.log('JJRO: Listen for requests');
                return fetch(event.request)
                .catch(() => caches.match('offLine.html'))
            })
    )
})
// Activar SW
self.addEventListener('activate', (event) =>{
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);
    event.waitUntil(
        caches.keys().then((cacheNames)=> Promise.all(
            cacheNames.map((cacheName) => {
                console.log('JJRO: Activate  Service Worker (SW)');
                if(!cacheWhiteList.includes(cacheName)) {
                    console.log('JJRO: Delete CacheName');
                    return caches.delete(cacheName);
                }
            }
        )))
    )
})