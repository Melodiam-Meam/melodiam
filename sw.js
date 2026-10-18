self.addEventListener('push',e=>{let d={};try{d=e.data.json()}catch(_){d={title:'Melodiam Meam',body:e.data?e.data.text():''}}
e.waitUntil(Promise.all([self.registration.showNotification(d.title||'Melodiam Meam',{body:d.body||'',icon:'icon-192.png',badge:'icon-192.png'}),bump()]))});
async function bump(){try{const c=await caches.open('badge'),r=await c.match('/badge-n');let n=r?parseInt(await r.text())||0:0;n++;await c.put('/badge-n',new Response(String(n)));if(self.navigator&&self.navigator.setAppBadge)await self.navigator.setAppBadge(n)}catch(e){}}
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if('focus' in c)return c.focus()}return clients.openWindow('./')}))});

self.addEventListener('fetch',()=>{});
