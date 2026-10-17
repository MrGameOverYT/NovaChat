// NovaChat: service worker. Файлы всегда свежие из сети, кэш — только без интернета. Плюс push-уведомления.
const CACHE = 'novachat-v6';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'badge-96.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return; // Firebase и Telegram идут напрямую
  if (/\.(mp3|ogg|wav|m4a|aac|mp4|webm)$/i.test(u.pathname)) return; // звуки и видео браузер грузит сам (нужны частичные запросы)
  e.respondWith(fetch(u.href, { cache: 'no-cache' }).then(r => {
    const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r;
  }).catch(() => caches.match(e.request).then(m => m || caches.match('index.html'))));
});

// Push от Firebase Cloud Messaging (приходит, даже когда приложение закрыто)
self.addEventListener('push', e => {
  let p = {};
  try { p = e.data ? e.data.json() : {}; } catch (x) {}
  const d = p.data || p;
  e.waitUntil((async () => {
    const cs = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    if (d.kind !== 'call') (await self.registration.getNotifications({ tag: 'call' })).forEach(n => n.close()); // звонок закончился
    if (cs.some(c => c.visibilityState === 'visible')) return; // приложение на экране — оно всё показывает само
    const call = d.kind === 'call';
    const opt = {
      body: d.body || '', tag: d.tag || 'novachat', renotify: true, silent: false, timestamp: Date.now(), data: d,
      icon: d.icon || 'icon-192.png', badge: 'badge-96.png',
    };
    if (call) Object.assign(opt, {
      requireInteraction: true, vibrate: [400, 200, 400, 200, 400],
      actions: [{ action: 'accept', title: '✅ Принять' }, { action: 'decline', title: '❌ Отклонить' }],
    });
    else opt.vibrate = [200, 100, 200];
    await self.registration.showNotification(d.title || 'NovaChat', opt);
  })());
});

// Нажатие на уведомление / кнопки «Принять» и «Отклонить»
self.addEventListener('notificationclick', e => {
  const n = e.notification, d = n.data || {};
  n.close();
  if (e.action === 'decline' && d.id && d.w && d.sig) { // отклоняем, не открывая приложение
    e.waitUntil(fetch(d.w + '/decline?id=' + encodeURIComponent(d.id) + '&sig=' + d.sig, { method: 'POST' }).catch(() => {}));
    return;
  }
  const acc = d.kind === 'call' && e.action === 'accept' && d.id;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
    for (const c of cs) {
      if (acc) c.postMessage({ kind: 'acc', id: d.id });
      if ('focus' in c) return c.focus();
    }
    return self.clients.openWindow(acc ? './?acc=' + d.id : './');
  }));
});
