<!-- ================= script.js (append these additive scripts to the END of your script.js) ================= -->
};
const reset = ()=> card.style.transform = '';
card.addEventListener('pointermove', onMove);
card.addEventListener('pointerleave', reset);
});


/* Spotlight cursor */
const spotlight = document.getElementById('spotlight');
window.addEventListener('pointermove', (e)=>{
spotlight.style.setProperty('--x', e.clientX + 'px');
spotlight.style.setProperty('--y', e.clientY + 'px');
}, { passive: true });


/* Starfield background (respect reduce motion) */
const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');
let stars = [], w=0,h=0, animId;
const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const resize = ()=>{ w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; init(); };
const init = ()=>{ stars = Array.from({length: rm? 80: 200}, ()=>({ x: Math.random()*w, y: Math.random()*h, z: Math.random()*1.5 + 0.5, r: Math.random()*1.2 + 0.3 })); };
const step = ()=>{
ctx.clearRect(0,0,w,h);
ctx.fillStyle = 'rgba(255,255,255,0.9)';
for(const s of stars){
s.x += s.z * 0.15; s.y += s.z * 0.05;
if(s.x>w || s.y>h){ s.x = Math.random()*w*0.2; s.y = -5; }
ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2); ctx.fill();
}
animId = requestAnimationFrame(step);
};
window.addEventListener('resize', resize);
resize(); if(!rm) step();


/* Command palette (Ctrl/Cmd + K) */
const cmdk = document.getElementById('cmdk');
const input = document.getElementById('cmdk-input');
const list = document.getElementById('cmdk-results');
const commands = [
{label:'Go to Home', action:()=>location.hash='#home'},
{label:'Go to Skills', action:()=>location.hash='#skills'},
{label:'Go to Projects', action:()=>location.hash='#projects'},
{label:'Go to Contact', action:()=>location.hash='#contact'},
{label:'Open Resume', action:()=>window.open('https://drive.google.com/uc?export=download&id=1_kqy5GRMojP7V4anfhcSK_hMSxnn8fb2','_blank')},
{label:'Toggle Theme', action:()=>document.getElementById('theme-toggle')?.click()},
{label:'Scroll to Top', action:()=>window.scrollTo({top:0,behavior:'smooth'})},
];
let idx = 0;
const render = (q='')=>{
const items = commands.filter(c=> c.label.toLowerCase().includes(q.toLowerCase()));
list.innerHTML = items.map((c,i)=>`<li role="option" aria-selected="${i===idx}" data-i="${i}"><i class='fa fa-bolt'></i><span>${c.label}</span></li>`).join('');
};
const open = ()=>{ cmdk.setAttribute('aria-hidden','false'); input.value=''; idx=0; render(); setTimeout(()=>input.focus(), 10); };
const close = ()=> cmdk.setAttribute('aria-hidden','true');
document.addEventListener('keydown', (e)=>{
if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); open(); }
if(cmdk.getAttribute('aria-hidden')==='false'){
if(e.key==='Escape'){ close(); }
if(e.key==='ArrowDown'){ idx=Math.min(idx+1, list.children.length-1); render(input.value); }
if(e.key==='ArrowUp'){ idx=Math.max(idx-1, 0); render(input.value); }
if(e.key==='Enter'){ const items = [...list.children]; const item = items[idx]; const label = item?.innerText.trim(); const cmd = commands.find(c=>c.label===label); if(cmd){ close(); cmd.action(); }}
}
});
input.addEventListener('input', ()=>{ idx=0; render(input.value); });
list.addEventListener('click', (e)=>{
const li = e.target.closest('li');
if(!li) return; idx = Number(li.dataset.i)||0; const label = li.innerText.trim(); const cmd = commands.find(c=>c.label===label); if(cmd){ close(); cmd.action(); }
});


});
</script>
