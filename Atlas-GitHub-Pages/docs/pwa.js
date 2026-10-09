const installButton=document.getElementById('install-app');
const updateButton=document.getElementById('update-app');
const status=document.getElementById('offline-status');
let installPrompt=null, registration=null;
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;installButton.hidden=false;});
installButton.addEventListener('click',async()=>{if(!installPrompt)return;await installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;installButton.hidden=true;});
window.addEventListener('appinstalled',()=>{installPrompt=null;installButton.hidden=true;});
function offerUpdate(){if(registration?.waiting){updateButton.hidden=false;status.textContent='Nova versão disponível';}}
updateButton.addEventListener('click',()=>registration?.waiting?.postMessage({type:'ACTIVATE_UPDATE'}));
let reloadForUpdate=false;
navigator.serviceWorker?.addEventListener('controllerchange',()=>{if(reloadForUpdate)location.reload();});
updateButton.addEventListener('click',()=>{reloadForUpdate=true;});
if('serviceWorker' in navigator&&window.isSecureContext){
 status.textContent='A guardar o atlas para consulta offline…';
 navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'}).then(async reg=>{
  registration=reg;offerUpdate();reg.addEventListener('updatefound',()=>{const worker=reg.installing;worker?.addEventListener('statechange',()=>{if(worker.state==='installed'){offerUpdate();if(!navigator.serviceWorker.controller)status.textContent='Atlas disponível offline neste dispositivo';}else if(worker.state==='redundant'&&!reg.active)status.textContent='Não foi possível guardar offline. Recarregue com ligação à Internet.';});});
  await navigator.serviceWorker.ready;if(!reg.waiting)status.textContent='Atlas disponível offline neste dispositivo';
 }).catch(()=>{status.textContent='Consulta online · armazenamento offline indisponível';});
}else status.textContent='A instalação e o modo offline requerem a ligação HTTPS publicada';
