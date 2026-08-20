const qs=s=>document.querySelector(s), qsa=s=>[...document.querySelectorAll(s)];
const cursor=qs('.cursor');
window.addEventListener('mousemove',e=>{if(cursor){cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'}});
qsa('a,button,.media-open,.polaroid,.frame,.page,.zine-sheet,.zine-cover,.event-photo,.poster').forEach(el=>{el.addEventListener('mouseenter',()=>cursor?.classList.add('big'));el.addEventListener('mouseleave',()=>cursor?.classList.remove('big'))});
const meter=qs('.scroll-meter i');
window.addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;meter.style.height=(scrollY/Math.max(max,1)*100)+'%';qsa('[data-parallax]').forEach(el=>{const r=el.getBoundingClientRect();const y=(r.top-innerHeight/2)*-.025;el.style.transform=`translateY(${y}px)`})},{passive:true});
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.08});qsa('.reveal').forEach(el=>io.observe(el));

const lightbox=qs('#lightbox'), lightboxImage=qs('#lightboxImage'), dims=qs('#lightboxDims'), original=qs('#openOriginal');
function openMedia(src){
 lightboxImage.src=src; original.href=src; lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
 lightboxImage.onload=()=>{dims.textContent=`ORIGINAL DIMENSIONS · ${lightboxImage.naturalWidth} × ${lightboxImage.naturalHeight} PX`};
}
function closeMedia(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.style.overflow='';lightboxImage.src=''}
qsa('.media-open').forEach(el=>el.addEventListener('click',e=>{e.stopPropagation();const src=el.dataset.src || el.querySelector('img')?.src;if(src)openMedia(src)}));
qs('#closeLightbox').addEventListener('click',closeMedia);qs('.lightbox-bg').addEventListener('click',closeMedia);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMedia()});

// Drag-to-scroll on the long filmstrip, like a tactile magazine rail.
qsa('.horizontal-film').forEach(track=>{let down=false,start=0,left=0;track.addEventListener('pointerdown',e=>{down=true;start=e.clientX;left=track.scrollLeft;track.setPointerCapture(e.pointerId)});track.addEventListener('pointermove',e=>{if(!down)return;track.scrollLeft=left-(e.clientX-start)*1.25});track.addEventListener('pointerup',()=>down=false);track.addEventListener('pointercancel',()=>down=false)});

// Gentle tilt on featured objects.
qsa('.book-scene,.media-zine,.event-reel,.polaroid-field,.social-layout').forEach(box=>{box.addEventListener('pointermove',e=>{const r=box.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;box.style.setProperty('--mx',`${x*8}deg`);box.style.setProperty('--my',`${y*-6}deg`)});box.addEventListener('pointerleave',()=>{box.style.setProperty('--mx','0deg');box.style.setProperty('--my','0deg')})});

// Make videos play only when visible to reduce loading and fix blank states on mobile.
const vids=qsa('video');const vio=new IntersectionObserver(entries=>entries.forEach(e=>{const v=e.target;if(e.isIntersecting){v.play().catch(()=>{})}else{v.pause()}}),{threshold:.15});vids.forEach(v=>vio.observe(v));


// UAAP rail arrows + tactile drag/scroll.
qsa('[data-rail="uaap"]').forEach(track=>{
 const stage=track.closest('.film-stage');
 stage?.querySelector('.rail-prev')?.addEventListener('click',()=>track.scrollBy({left:-track.clientWidth*.72,behavior:'smooth'}));
 stage?.querySelector('.rail-next')?.addEventListener('click',()=>track.scrollBy({left:track.clientWidth*.72,behavior:'smooth'}));
 let down=false,start=0,left=0;
 track.addEventListener('pointerdown',e=>{down=true;start=e.clientX;left=track.scrollLeft;track.classList.add('dragging');track.setPointerCapture?.(e.pointerId)});
 track.addEventListener('pointermove',e=>{if(!down)return;track.scrollLeft=left-(e.clientX-start)*1.35});
 const end=()=>{down=false;track.classList.remove('dragging')}; track.addEventListener('pointerup',end);track.addEventListener('pointercancel',end);track.addEventListener('mouseleave',()=>{if(down)end()});
 track.addEventListener('wheel',e=>{if(Math.abs(e.deltaY)>Math.abs(e.deltaX)){e.preventDefault();track.scrollLeft+=e.deltaY}}, {passive:false});
});

// One animated phone containing every supplied social/profile/video asset.
// Videos are self-contained, muted, H.264 MP4s so they autoplay inside the phone without opening another page.
qsa('[data-phone]').forEach(phone=>{
 const slides=qsa('.phone-slide',phone), title=qs('.phone-title',phone), counter=phone.parentElement.querySelector('.phone-counter b'), open=qs('.phone-open',phone);
 let index=0,startX=0;
 const setSlide=(next,dir=1)=>{
   index=(next+slides.length)%slides.length;
   slides.forEach((s,i)=>{
     s.classList.toggle('active',i===index);
     const v=s.querySelector('video');
     if(v){
       v.muted=true; v.playsInline=true; v.loop=true; v.autoplay=i===index;
       if(i===index){ v.currentTime=0; const playNow=()=>v.play().catch(()=>{}); if(v.readyState>=2) playNow(); else v.addEventListener('loadeddata',playNow,{once:true}); }
       else { v.pause(); v.currentTime=0; }
     }
   });
   const s=slides[index];
   if(title)title.textContent=s.dataset.title||'';
   if(counter)counter.textContent=String(index+1).padStart(2,'0');
   if(open){
     if(s.dataset.type==='video'){ open.textContent='AUTOPLAYING · TAP VIDEO TO PAUSE'; open.disabled=true; open.setAttribute('aria-hidden','true'); }
     else { open.textContent='OPEN FULL ↗'; open.disabled=false; open.removeAttribute('aria-hidden'); }
   }
 };
 phone.querySelector('.phone-prev')?.addEventListener('click',()=>setSlide(index-1,-1));
 phone.querySelector('.phone-next')?.addEventListener('click',()=>setSlide(index+1,1));
 phone.querySelector('.phone-screen')?.addEventListener('pointerdown',e=>{startX=e.clientX});
 phone.querySelector('.phone-screen')?.addEventListener('pointerup',e=>{const dx=e.clientX-startX;if(Math.abs(dx)>45)setSlide(index+(dx<0?1:-1),dx<0?1:-1)});
 qsa('video',phone).forEach(v=>v.addEventListener('click',()=>{if(v.paused)v.play().catch(()=>{});else v.pause()}));
 open?.addEventListener('click',e=>{e.stopPropagation();const s=slides[index];if(s.dataset.type==='image')openMedia(s.dataset.src)});
 setSlide(0);
});
