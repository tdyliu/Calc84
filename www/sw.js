// Offline support for the web version: answer from the cache instantly, refresh the cache in the background
// (so a new version shows up on the next visit). Bump CACHE to force everyone onto a fresh copy.
const CACHE = 'calc84-v4';
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const vendor = await fetch('vendor/precache.json').then(r => r.json()); // written by scripts/vendor.js
    await (await caches.open(CACHE)).addAll([...CORE, ...vendor]);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith((async () => {
    const c = await caches.open(CACHE), hit = await c.match(r, {ignoreSearch: true});
    const net = fetch(r).then(res => { if (res.ok) c.put(r, res.clone()); return res }).catch(() => hit || Response.error());
    e.waitUntil(net.catch(() => {}));
    return hit || net;
  })());
});
