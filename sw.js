self.addEventListener('push',e=>{let d={};try{d=e.data.json()}catch(_){d={title:'Melodiam Meam',body:e.data?e.data.text():''}}
e.waitUntil(Promise.all([self.registration.showNotification(d.title||'Melodiam Meam',{body:d.body||'',icon:'icon-192.png',badge:'icon-192.png'}),bump()]))});
async function bump(){try{const c=await caches.open('badge'),r=await c.match('/badge-n');let n=r?parseInt(await r.text())||0:0;n++;await c.put('/badge-n',new Response(String(n)));if(self.navigator&&self.navigator.setAppBadge)await self.navigator.setAppBadge(n)}catch(e){}}
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if('focus' in c)return c.focus()}return clients.openWindow('./')}))});

self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
if(u.hostname==='cdn.jsdelivr.net'||u.hostname==='cdnjs.cloudflare.com'){e.respondWith(caches.open('libs-v1').then(c=>c.match(r).then(m=>m||fetch(r).then(x=>{if(x&&(x.ok||x.type==='opaque'))c.put(r,x.clone());return x}))));return}
if(r.mode==='navigate'&&u.origin===self.location.origin){e.respondWith(caches.open('shell-v1').then(c=>{const net=fetch(r).then(x=>{if(x&&x.ok)c.put(r,x.clone());return x});const to=new Promise(ok=>setTimeout(()=>ok(null),3500));return Promise.race([net.catch(()=>null),to]).then(x=>x||c.match(r).then(m=>m||net))}))}});
