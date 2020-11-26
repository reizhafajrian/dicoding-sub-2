if( 'undefined' === typeof window){
    importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');   
if(workbox){
    console.log("workbok berhasil")
    workbox.precaching.precacheAndRoute([
        {
        url: './',
        revision: '1'
    },
    {
        url: './icon/icon2.png',
        revision: '1'
    },
    {
        url: './js/api.js',
        revision: '1'
    },
    {
        url: './js/index.js',
        revision: '1'
    },
    {
        url: './js/idb.js',
        revision: '1'
    },
    {
        url: './js/db.js',
        revision: '1'
    },
    {
        url: './pages/home.html',
        revision: '1'
    },
    {
        url: './pages/topscorer.html',
        revision: '1'
    },
    {
        url: './pages/favorit.html',
        revision: '1'
    },
    {
        url: './index.html',
        revision: '1'
    },
    {
        url: './manifest.json',
        revision: '1'
    },
    {
        url: './nav.html',
        revision: '1'
    },
    {
        url: './push.js',
        revision: '1'
    },
    {
        url: './style.css',
        revision: '1'
    },
    {
        url: 'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css',
        revision: '1'
    },
    {
        url: 'https://fonts.googleapis.com/icon?family=Material+Icons',
        revision: '1'
    },

    {
        url: 'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',
        revision: '1'
    },

    {
        url: './js/servicerun.js',
        revision: '1'
    },

    {
        url: './icon/icon3.png',
        revision: '1'
    },

    {
        url: './icon/icon4.png',
        revision: '1'
    },
    {
        url: './icon/icon5.png',
        revision: '1'
    },
]);
workbox.routing.registerRoute(
    /.*(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'images-cached',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.Plugin({
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            }),
        ]
    })
);
workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate()
);
workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);
workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);
workbox.routing.registerRoute(
    new RegExp('./pages/'),
    workbox.strategies.staleWhileRevalidate()
);
}
else{
    console.log("gagal di muat")
}}
self.addEventListener('push', function(event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  let options = {
    body: body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
