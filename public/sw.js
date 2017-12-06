// JavaScript source code

importScripts('workbox-sw.dev.v2.1.2.js');
const workboxSW = new WorkboxSW();
workboxSW.precache([
    { url: 'index.html' },
    { url: 'login.html' },
    { url: 'viewSquad.html' },
    { url: 'logged_in.js' },
    { url: 'permissions.js' },
    { url: 'loadData.js' },
    { url: 'homeDisplay.js' }
]);


