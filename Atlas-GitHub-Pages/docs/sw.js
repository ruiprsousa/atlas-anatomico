// Increase VERSION when publishing changed files. Paths work under /repository/.
const VERSION='v2';
const ROOT=new URL('./',self.location.href);
const PREFIX='atlas-musculoesqueletico:'+ROOT.pathname+':';
const CACHE=PREFIX+VERSION;
const FILES=['./','index.html','style.css','app.js','functions.js','pwa.js','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','models/muscular.glb','models/skeletal.glb','models/License.txt','data/definitions.json','data/lexicon.json','draco/draco_decoder.js','draco/draco_wasm_wrapper.js','draco/draco_decoder.wasm','vendor/three.module.js','vendor/OrbitControls.js','vendor/GLTFLoader.js','vendor/DRACOLoader.js','vendor/BufferGeometryUtils.js'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES.map(file=>new URL(file,ROOT).href)))));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys()){if(key.startsWith(PREFIX)&&key!==CACHE)await caches.delete(key);}await self.clients.claim();})()));
self.addEventListener('message',event=>{if(event.data?.type==='ACTIVATE_UPDATE')self.skipWaiting();});
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==ROOT.origin||!url.pathname.startsWith(ROOT.pathname))return;
 event.respondWith((async()=>{const cache=await caches.open(CACHE);const cached=await cache.match(event.request,{ignoreSearch:true});if(cached)return cached;try{return await fetch(event.request);}catch(error){if(event.request.mode==='navigate'&&url.pathname===ROOT.pathname)return cache.match(new URL('index.html',ROOT).href);throw error;}})());
});
