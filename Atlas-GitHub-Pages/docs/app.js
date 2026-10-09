import * as THREE from 'three';
import {OrbitControls} from './vendor/OrbitControls.js';
import {GLTFLoader} from './vendor/GLTFLoader.js';
import {DRACOLoader} from './vendor/DRACOLoader.js';
import {muscleInfo} from './functions.js';
const $=id=>document.getElementById(id), host=$('canvas');
const scene=new THREE.Scene(), camera=new THREE.PerspectiveCamera(35,1,.01,10000);
let renderer;
try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});}catch(e){$('loading').textContent='Não foi possível iniciar o 3D. Ative a aceleração gráfica ou utilize outro navegador.';throw e;}
renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;host.appendChild(renderer.domElement);
const controls=new OrbitControls(camera,renderer.domElement);controls.zoomToCursor=true;controls.screenSpacePanning=true;controls.enableDamping=true;controls.dampingFactor=.08;controls.target.set(0,0,0);
scene.add(new THREE.HemisphereLight(0xe4f5ff,0x455565,2.2));
const key=new THREE.DirectionalLight(0xfff0df,3);key.position.set(4,5,5);scene.add(key);
const fill=new THREE.DirectionalLight(0x94d2ff,1.8);fill.position.set(-4,2,-3);scene.add(fill);
const body=new THREE.Group();scene.add(body);const objects=[];const meshOwners=new WeakMap();let selected=null, isolated=null, hidden=new Set(), defs={}, lex={}, radius=1, center=new THREE.Vector3(), ready=false;
const connective=/fascia|tendon|bursa|retinaculum|aponeurosis|septum|arch|ring|tarsus|trochlea|linea alba|tract|raphe/i;
const baseName=n=>n.replace(/[._](l|r)$/i,'').replace(/_/g,' ').trim();
function lookup(n,dict){const b=baseName(n);return dict[b]||dict[b.replace(/ muscles?$/i,'')]||dict[b.replace(/ muscle/i,'')]||null;}
function label(o){const name=o.userData.anatomyName;const info=o.userData.info;return (info?info[1]:baseName(name))+( /[._]l$/i.test(name)?' · esquerdo':/[._]r$/i.test(name)?' · direito':'');}
function textElement(tag,text,cls){const el=document.createElement(tag);el.textContent=text;if(cls)el.className=cls;return el;}
function panelSection(title,content){$('detail').append(textElement('h3',title),textElement('p',content));}
function select(o){selected=o;$('name').textContent=label(o);const name=o.userData.anatomyName;const latin=lookup(name,lex);$('latin').textContent=latin?.la||baseName(name);$('tags').replaceChildren();const data=o.userData;
 const layer=data.system==='bone'?'Esqueleto':data.connective?'Estrutura associada':data.info?['Superficial na região','Intermédio na região','Profundo na região'][data.info[2]]:'Profundidade não classificada';
 for(const tag of [data.system==='bone'?'Osso / cartilagem':data.connective?'Tecido associado':'Músculo',layer])$('tags').append(textElement('span',tag,'tag'));
 $('detail').replaceChildren();
 if(data.info){panelSection('Articulações e região',data.info[3]);panelSection('Funções principais',data.info[4]);const link=textElement('a','Referência anatómica');link.href=data.info[5];link.target='_blank';link.rel='noopener';$('detail').append(link,textElement('p','Resumo em português · revisão clínica pendente','source'));}
 else if(data.system!=='bone'&&!data.connective){panelSection('Ficha funcional','A ficha de funções em português ainda não está disponível para esta estrutura.');}
 const original=lookup(name,defs);if(original){const details=document.createElement('details');details.append(textElement('summary','Descrição original do atlas · inglês'),textElement('p',typeof original==='string'?original:JSON.stringify(original),'original'));$('detail').append(details,textElement('p','Z-Anatomy / Wikipedia · CC BY-SA 3.0. Descrição original, sem revisão clínica.','source'));}
 if(data.system==='bone')panelSection('Referência óssea','Use esta estrutura como referência espacial para observar a relação dos músculos com o esqueleto.');
 if(data.connective)panelSection('Estrutura associada','Elemento incluído no sistema muscular de origem. A classificação detalhada e a ficha funcional ainda não estão disponíveis.');
 ['isolate','hide','focus'].forEach(id=>$(id).disabled=false);applyVisibility();renderList();}
function applyVisibility(){const depth=Number($('depth').value)||0;let count=0;for(const o of objects){const d=o.userData;let show=!hidden.has(o.uuid);if(isolated)show=show&&o===isolated;else if(d.system==='bone')show=show&&$('bones').checked;else if(d.connective)show=show&&$('connective').checked;else show=show&&$('muscles').checked&&(!d.info||d.info[2]>=depth);o.visible=show;if(show)count++;for(const part of d.parts){part.material.color.set(o===selected?0x65e7cf:d.color);part.material.emissive.set(o===selected?0x164c42:0x000000);part.material.opacity=d.system==='bone'?1:Number($('opacity').value)/100;part.material.transparent=part.material.opacity<1;part.material.depthWrite=part.material.opacity>=.95;}}
 $('visibleCount').textContent=count+' estruturas visíveis';$('isolate').textContent=isolated?'Sair do isolamento':'Isolar';}
function renderList(){const q=$('search').value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');const matches=objects.filter(o=>{const l=lookup(o.userData.anatomyName,lex);const s=(label(o)+' '+o.userData.anatomyName+' '+(l?.la||'')).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');return s.includes(q)}).sort((a,b)=>label(a).localeCompare(label(b),'pt'));
 $('count').textContent=matches.length+'/'+objects.length;$('list').replaceChildren();const frag=document.createDocumentFragment();for(const o of matches){const row=document.createElement('div');row.className='row'+(o===selected?' active':'');const btn=textElement('button',label(o));btn.title=o.userData.anatomyName;btn.onclick=()=>{if(hidden.has(o.uuid))hidden.delete(o.uuid);if(isolated&&isolated!==o)isolated=o;select(o);};const eye=textElement('button',o.visible?'●':'○','eye');eye.setAttribute('aria-label',(o.visible?'Ocultar ':'Mostrar ')+label(o));eye.onclick=()=>{if(o.visible)hidden.add(o.uuid);else{hidden.delete(o.uuid);isolated=o;}applyVisibility();renderList();};row.append(btn,eye);frag.append(row);}$('list').append(frag);}
function fitBody(view='front'){if(!ready)return;controls.target.copy(center);const dist=radius/Math.sin(THREE.MathUtils.degToRad(camera.fov/2))*1.04;const direction={front:[0,0,1],back:[0,0,-1],left:[1,0,0],right:[-1,0,0]}[view];camera.position.copy(center).add(new THREE.Vector3(...direction).multiplyScalar(dist));camera.near=radius/1000;camera.far=radius*100;camera.updateProjectionMatrix();controls.minDistance=radius*.04;controls.maxDistance=radius*12;controls.update();}
function focus(){if(!selected)return;const dir=camera.position.clone().sub(controls.target).normalize();const box=new THREE.Box3().setFromObject(selected), sphere=box.getBoundingSphere(new THREE.Sphere());controls.target.copy(sphere.center);const halfFov=THREE.MathUtils.degToRad(camera.fov/2);const fitDistance=sphere.radius/Math.sin(Math.min(halfFov,Math.atan(Math.tan(halfFov)*camera.aspect)));camera.position.copy(sphere.center).add(dir.multiplyScalar(Math.max(fitDistance*1.15,controls.minDistance*1.1)));controls.update();}
for(const id of ['bones','muscles','connective','depth'])$(id).onchange=()=>{isolated=null;applyVisibility();renderList();};$('opacity').oninput=applyVisibility;$('search').oninput=renderList;
function restore(){hidden.clear();isolated=null;$('bones').checked=true;$('muscles').checked=true;$('connective').checked=false;$('depth').value='all';$('opacity').value='100';applyVisibility();renderList();}
 $('restore').onclick=restore;$('reset').onclick=()=>fitBody();document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>fitBody(b.dataset.view));$('hide').onclick=()=>{hidden.add(selected.uuid);applyVisibility();renderList();};$('isolate').onclick=()=>{isolated=isolated?null:selected;hidden.delete(selected.uuid);applyVisibility();renderList();};$('focus').onclick=focus;
const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let down=null;
function hit(event){const rect=renderer.domElement.getBoundingClientRect();pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);raycaster.setFromCamera(pointer,camera);const part=raycaster.intersectObjects(objects.filter(o=>o.visible),true)[0]?.object;return part?meshOwners.get(part):undefined;}
renderer.domElement.addEventListener('dblclick',e=>{const o=hit(e);if(o){select(o);focus();}});
renderer.domElement.addEventListener('pointerdown',e=>down=[e.clientX,e.clientY]);renderer.domElement.addEventListener('pointerup',e=>{if(down&&Math.hypot(e.clientX-down[0],e.clientY-down[1])<5){const o=hit(e);if(o)select(o);}down=null;});renderer.domElement.addEventListener('pointermove',e=>{if(e.buttons){$('hover').hidden=true;return;}const o=hit(e);$('hover').hidden=!o;if(o){$('hover').textContent=label(o);const rect=host.getBoundingClientRect();$('hover').style.left=Math.min(e.clientX-rect.left+15,rect.width-230)+'px';$('hover').style.top=Math.min(e.clientY-rect.top+15,rect.height-60)+'px';}});renderer.domElement.addEventListener('pointerleave',()=>$('hover').hidden=true);
function resize(){camera.aspect=host.clientWidth/host.clientHeight;camera.updateProjectionMatrix();renderer.setSize(host.clientWidth,host.clientHeight);}new ResizeObserver(resize).observe(host);resize();renderer.setAnimationLoop(()=>{controls.update();renderer.render(scene,camera);});
const draco=new DRACOLoader();draco.setDecoderPath('./draco/');draco.setDecoderConfig({type:'wasm'});const loader=new GLTFLoader();loader.setDRACOLoader(draco);
async function loadSystem(file,system){
 const gltf=await loader.loadAsync(file),structures=new Map();
 gltf.scene.traverse(part=>{
  if(!part.isMesh)return;
  // Multi-material primitives belong to their named anatomical node.
  let owner=part;
  while(owner.parent&&!owner.userData.za_name&&!owner.userData.name)owner=owner.parent;
  const name=owner.userData.za_name||owner.userData.name||part.name||'Estrutura';
  let structure=structures.get(owner.uuid);
  if(!structure){
   structure=owner;const assoc=system==='muscle'&&connective.test(name);
   const color=system==='bone'?0xd7d3bb:assoc?0xa6bec5:0xb65b52;
   structure.userData={...structure.userData,anatomyName:name,system,connective:assoc,info:system==='muscle'?muscleInfo(name):null,color,parts:[]};
   structures.set(owner.uuid,structure);objects.push(structure);
  }
  structure.userData.parts.push(part);meshOwners.set(part,structure);
  part.material=new THREE.MeshStandardMaterial({color:structure.userData.color,roughness:.7,metalness:0,side:THREE.DoubleSide});
 });
 body.add(gltf.scene);
}
try{const data=await Promise.all([fetch('./data/lexicon.json').then(r=>r.json()),fetch('./data/definitions.json').then(r=>r.json()),loadSystem('./models/skeletal.glb','bone'),loadSystem('./models/muscular.glb','muscle')]);lex=data[0];defs=data[1];body.updateMatrixWorld(true);const box=new THREE.Box3().setFromObject(body);center=box.getCenter(new THREE.Vector3());radius=box.getBoundingSphere(new THREE.Sphere()).radius;ready=true;fitBody();$('loading').hidden=true;applyVisibility();renderList();window.atlasDebug={objects,scene,camera,body,select,fitBody,renderer,controls};}
catch(e){console.error(e);$('loading').textContent='O modelo não foi carregado. Verifique a ligação e volte a abrir a página.';}
// WebMCP: exploration tools when supported by the browser.
if(navigator.modelContext?.registerTool){navigator.modelContext.registerTool({name:'select_anatomical_structure',description:'Seleciona uma estrutura pelo nome inglês exato do atlas.',inputSchema:{type:'object',properties:{name:{type:'string'}},required:['name']},execute:async({name})=>{const o=objects.find(o=>o.userData.anatomyName===name);if(!o)return {error:'Estrutura não encontrada'};select(o);return {name:label(o),function:o.userData.info?.[4]||'Ficha funcional não disponível'};}});}

