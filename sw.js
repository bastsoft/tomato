var CACHE_NAME = 'v1::fundamentals';

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll([
                    './',
                    'index.html',
                    'main.css',
                    'tomato.css',
                    'tomato.js'
                ]);
            })
            .then(function () {
                console.log('WORKER: install completed');
            })
    );
});

self.addEventListener('activate', function () {
    console.log('activate');
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                var fetchPromise = fetch(event.request)
                    .then(function (response) {
                        caches.open(CACHE_NAME).then(function (cache) {
                            cache.put(event.request, response.clone());
                        });

                        return response;
                    });

                return response || fetchPromise;
            })
    );
});

self.addEventListener('notificationclick', function (event) {
    console.log('notificationclick');
    event.notification.close();
});