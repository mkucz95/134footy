
//Files to cache in ServiceWorker
const cacheID = 'v1';
const cacheFiles = [
    'index.html',
    'login.html',
    'viewSquad.html',
    'addgame.html',
    'addplayer.html',
    'editGame.html',
    'editplayer.html',
    'signup.html',
    'stats.html',
    'viewSchedule.html',
    'viewplayer.html',

    //css files
    'form.css',
    'custom.css',
    'game_stats.css',
    'nav.css',
    'signup.css',
    'table.css',
    'home.css',

    //js files
    'db.js',
    'permission.js',
    'addgame.js',
    'loadData.js',
    'homeDisplay.js',
    'player.js',
    'schedule.js',
    'squad.js',
    'stats.js',
    'sw.js',
    'logout.js',

    //manifest
    'manifest.json'
];

//Installing ServiceWorker
self.addEventListener('install', function (event) {
    console.log('Attempting to install service worker and cache static assets');
    event.waitUntil(
        caches.open(cacheID).then(function (cache) {
            return cache.addAll(cacheFiles);
        })
        .catch(function (error) {
            console.log(`Unable to add cached assets: ${error}`);
        })
        );
});

//Updating ServiceWorker
self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheID) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
        );
    return self.clients.claim();
});

//Getting cache responses and returning them
self.addEventListener('fetch', function (e) {
    e.respondWith(
      caches.match(e.request).then(function (response) {
          if (response) {
              return response;
          }
          var fetchReq = e.request.clone();
          return fetch(fetchReq).then(
              function(response){
                  if(!response || response.status !== 200 || response.type !== 'basic') {
                      return response;
                  }
                  var responseToCache = response.clone();
                  caches.open(cacheID).then(function(cache){
                      cache.put(e.request, responseToCache);
                  });
                  return response;
              }
          );
      })
    );
});


/*
importScripts('workbox-sw.dev.v2.1.2.js');
const workboxSW = new WorkboxSW();
workboxSW.precache([
    //html files
    { url: 'index.html' },
    { url: 'login.html' },
    { url: 'viewSquad.html' },
    { url: 'addgame.html' },
    { url: 'addplayer.html' },
    { url: 'editGame.html' },
    { url: 'editplayer.html' },
    { url: 'signup.html' },
    { url: 'stats.html' },
    { url: 'viewSchedule.html' },
    { url: 'viewplayer.html' },

    //css files
    { url: 'form.css' },
    { url: 'custom.css' },
    { url: 'game_stats.css' },
    { url: 'nav.css' },
    { url: 'signup.css' },
    { url: 'table.css' },
    {url:'home.css'},

    //js files
    { url: 'permission.js' },
    { url: 'loadData.js' },
    { url: 'homeDisplay.js' },
    { url: 'player.js' },
    { url: 'schedule.js' },
    { url: 'squad.js' },
    { url: 'stats.js' },
    { url: 'addgame.js' },
    {url:'logout.js'}

]);

const networkFirst = workboxSW.strategies.networkFirst({
    cacheName: 'index',
    cacheExpiration: {
        maxEntries: 50
    }
});
workboxSW.router.registerRoute('/134footy/', networkFirst);
*/

