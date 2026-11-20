/* Shared pixel-art portal transitions. No changes to gameplay state. */
(function(){
'use strict';
if(window.portalWarp)return;
const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let active=false;
function play(kind,arrival,destination){
 if(active)return;active=true;
 const duration=reduced?200:(arrival?((kind==='alina')?2400:(kind==='rose'?2100:450)):((kind==='alina')?4400:(kind==='rose'?3900:950)));
 const el=document.createElement('canvas');el.setAttribute('aria-hidden','true');
 el.style.cssText='position:fixed;inset:0;width:100vw;height:100vh;z-index:2147483647;pointer-events:none;image-rendering:pixelated';
 if(arrival&&(kind==='rose'||kind==='alina'))el.style.background='#0c0218';
 document.body.appendChild(el);
 const ctx=el.getContext('2d'),palette=kind==='rose'?['#ffb6f4','#d86cff','#fff1fa','#8e45c7']:kind==='gold'?['#ffeeb0','#ffc052','#fff','#f99d42']:['#c9b2ff','#8648f9','#e9e4ff','#66c9ff'];
 const particles=Array.from({length:38},(_,i)=>({a:i*2.39996,r:0.2+(i%13)/18,s:1+i%3,c:palette[i%4]}));
 const start=performance.now();let last=0;
 function frame(now){
  const t=Math.min(1,(now-start)/duration),w=el.width=Math.max(1,Math.floor(innerWidth/3)),h=el.height=Math.max(1,Math.floor(innerHeight/3));
  ctx.clearRect(0,0,w,h);const cx=w/2,cy=h/2,scale=Math.max(w,h);
  const progress=arrival?1-t:t;
  // Localized sprite-sized effect: the scene stays visible throughout.
  const target=window.portalWarpTarget;
  const px=target?target.x*w:0.5*w,py=target?target.y*h:0.55*h;
  ctx.save();ctx.translate(px,py);
  const radius=(arrival?22*(1-t)+2:4+20*t);
  for(let j=8;j>=0;j--){ctx.beginPath();ctx.arc(0,0,radius*(1+j*.11),0,Math.PI*2);ctx.strokeStyle=palette[j%4];ctx.globalAlpha=(0.04+j*.012)*(arrival?t:1-t*.4);ctx.lineWidth=2+j*.6;ctx.stroke();}
  ctx.globalAlpha=1;
  for(const p of particles){
   const a=p.a+now*.0018*(arrival?-1:1),r=scale*(p.r*(arrival?t:1-t)+.018);
   const x=Math.cos(a)*r,y=Math.sin(a)*r*.62;
   ctx.fillStyle=p.c;ctx.fillRect(Math.round(x),Math.round(y),p.s,p.s);
  }
  if(kind==='storm'&&!arrival&&t>.45&&t<.85){ctx.globalAlpha=(Math.sin(t*60)>0.7?.55:0);ctx.fillStyle='#f4edff';ctx.fillRect(-radius,-radius,radius*2,radius*2);ctx.globalAlpha=1;}
  ctx.restore();
  // Sarah -> Alina: dedicated cinematic storm vortex, expanding lightning and a final whiteout.
  if(kind==='alina'){
   const smooth=v=>{v=Math.max(0,Math.min(1,v));return v*v*(3-2*v);};
   const fade=arrival?1-smooth(t):smooth((t-.12)/.78);
   ctx.save();
   ctx.fillStyle='rgba(9,2,26,'+(arrival?(.98*(1-smooth(t))):(.1+.8*fade))+')';
   ctx.fillRect(0,0,w,h);
   const cx=w*.5,cy=h*.48,span=Math.max(w,h);
   ctx.translate(cx,cy);
   const zoom=arrival?(1.7-1.6*smooth(t)):(.12+2.25*smooth(t));
   const spin=(arrival?-1:1)*t*10;
   // Layered swirling storm rings, with perspective and shimmering runes.
   for(let ring=0;ring<11;ring++){
    const rad=span*zoom*(.13+ring*.046);
    ctx.save();ctx.rotate(spin*(.42+ring*.055)+ring*.43);
    ctx.beginPath();ctx.ellipse(0,0,rad,rad*.48,ring*.12,0,Math.PI*2);
    ctx.strokeStyle=ring%3===0?'#f5d3ff':ring%2?'#9b40ff':'#e348ff';
    ctx.globalAlpha=(arrival?.4*(1-t):.15+.45*fade)*(1-ring*.045);
    ctx.lineWidth=1.2+ring*.18;ctx.stroke();ctx.restore();
   }
   // Dense spiral sparks fly towards the eye, giving a warp-speed effect.
   for(let k=0;k<180;k++){
    const a=k*2.399963+spin*(.5+k%4*.1);
    const distance=span*zoom*(.045+(k%31)/48);
    const x=Math.cos(a)*distance,y=Math.sin(a)*distance*.62;
    ctx.fillStyle=k%7===0?'#ffffff':k%3?'#ad55ff':'#f78bff';
    ctx.globalAlpha=arrival?(1-t*.85):(.2+.8*fade);
    const size=1+(k%5===0?2:0);
    ctx.fillRect(x,y,size,size);
   }
   ctx.globalAlpha=1;
   // Branching bolts hit at irregular intervals and intensify before the cut.
   const lightning=arrival?(t<.22&&Math.sin(t*120)>-.15):(t>.25&&t<.91&&(Math.sin(t*95)+Math.sin(t*173)*.7>0.35));
   if(lightning){
    for(let bolt=0;bolt<5;bolt++){
     const x=(bolt-2)*w*.22;
     ctx.beginPath();ctx.moveTo(x,-h*.65);
     for(let seg=1;seg<=11;seg++){
      const y=-h*.65+seg*h*.14;
      const zig=Math.sin(seg*7.7+bolt*11+t*100)*w*.035;
      ctx.lineTo(x+zig,y);
     }
     ctx.strokeStyle=bolt%2?'#bd5bff':'#f9eaff';ctx.lineWidth=bolt%2?2:3;
     ctx.shadowColor='#d17aff';ctx.shadowBlur=14;ctx.globalAlpha=.7;ctx.stroke();
    }
    ctx.shadowBlur=0;ctx.globalAlpha=1;
   }
   ctx.restore();
   if(!arrival){
    // Rhythmic flashes and a white impact, then deep violet blackout for navigation.
    const pulse=t>.5&&t<.83?Math.max(0,Math.sin(t*72))*.13:0;
    if(pulse){ctx.fillStyle='rgba(237,205,255,'+pulse+')';ctx.fillRect(0,0,w,h);}
    if(t>.81&&t<.91){
     const flash=Math.sin(Math.PI*(t-.81)/.1);
     ctx.fillStyle='rgba(245,229,255,'+(flash*.95)+')';ctx.fillRect(0,0,w,h);
    }
    if(t>.91){ctx.fillStyle='rgba(12,2,24,'+smooth((t-.91)/.07)+')';ctx.fillRect(0,0,w,h);}
   }else{
    // Alina's title screen materializes behind a shrinking vortex.
    ctx.fillStyle='rgba(12,2,24,'+(1-smooth(t))+')';ctx.fillRect(0,0,w,h);
   }
  }
  // Jessica -> Sarah: collapsing dream-world, shattered rose glass and a luminous portal.
  // This is intentionally different from Alina's thunder vortex.
  if(kind==='rose'){
   const ease=v=>{v=Math.max(0,Math.min(1,v));return v*v*(3-2*v);};
   ctx.save();
   const cx=w*.5,cy=h*.52,span=Math.max(w,h);
   const p=arrival?1-ease(t):ease(t);
   ctx.fillStyle='rgba(20,4,33,'+(arrival?(.72*(1-ease(t))):(.08+.65*ease(t*.95)))+')';
   ctx.fillRect(0,0,w,h);
   ctx.translate(cx,cy);
   const rot=(arrival?-1:1)*t*3.7;
   const expansion=arrival?1.35-1.2*ease(t):.12+1.8*ease(t);
   // A golden-pink dream gate forms from concentric ornate elliptical rings.
   for(let ring=0;ring<8;ring++){
    const radius=span*expansion*(.095+ring*.048);
    ctx.save();ctx.rotate(rot*(1+ring*.08)+ring*.22);
    ctx.beginPath();ctx.ellipse(0,0,radius*.72,radius,0,0,Math.PI*2);
    ctx.strokeStyle=ring%3===0?'#fff0bb':ring%2?'#ff92d9':'#bf75ff';
    ctx.lineWidth=1.5+ring*.26;ctx.globalAlpha=(arrival?.62*(1-t):.23+.5*ease(t))*(1-ring*.07);
    ctx.shadowColor='#ffb7e9';ctx.shadowBlur=7;ctx.stroke();ctx.restore();
   }
   ctx.shadowBlur=0;ctx.globalAlpha=1;
   // Glass-like fragments and rose petals spiral outward as Jessica's dream falls apart.
   for(let k=0;k<140;k++){
    const angle=k*2.399963+rot*(.45+(k%5)*.13);
    const radius=span*expansion*(.06+(k%29)/49);
    const x=Math.cos(angle)*radius,y=Math.sin(angle)*radius*.76;
    const sz=1+(k%4);
    ctx.save();ctx.translate(x,y);ctx.rotate(angle+t*5*(k%2?1:-1));
    ctx.globalAlpha=arrival?(1-t)*.85:(.2+.7*ease(t));
    if(k%3===0){
     ctx.fillStyle=k%2?'#ffb1d8':'#ffddf3';
     ctx.beginPath();ctx.moveTo(0,-sz*1.6);ctx.quadraticCurveTo(sz*2,-sz,sz,sz);ctx.quadraticCurveTo(-sz,sz*2,0,-sz*1.6);ctx.fill();
    }else{
     ctx.fillStyle=k%5===0?'#fff1c8':'#c77dff';
     ctx.beginPath();ctx.moveTo(0,-sz*2);ctx.lineTo(sz*1.4,0);ctx.lineTo(0,sz*1.8);ctx.lineTo(-sz,0);ctx.closePath();ctx.fill();
    }
    ctx.restore();
   }
   // Cracks of light radiate through the collapsing dream at the climax.
   if(!arrival&&t>.43&&t<.92){
    const power=ease((t-.43)/.28)*(1-ease((t-.83)/.09));
    ctx.globalAlpha=power*.85;
    for(let k=0;k<12;k++){
     const a=k*Math.PI/6+t*.18;
     ctx.save();ctx.rotate(a);
     ctx.beginPath();ctx.moveTo(0,0);
     for(let seg=1;seg<=8;seg++){
      const d=span*(.035+seg*.046)*expansion;
      ctx.lineTo(d,Math.sin(seg*3.4+k*7)*span*.013);
     }
     ctx.strokeStyle=k%3===0?'#fff8dc':'#ff8cda';ctx.lineWidth=k%3===0?2.4:1.2;ctx.stroke();ctx.restore();
    }
    ctx.globalAlpha=1;
   }
   ctx.restore();
   if(!arrival){
    // A luminous bloom becomes a clean dark cut to the next page.
    if(t>.73&&t<.88){
     const f=Math.sin(Math.PI*(t-.73)/.15);
     ctx.fillStyle='rgba(255,224,248,'+Math.max(0,f)*.85+')';ctx.fillRect(0,0,w,h);
    }
    if(t>.87){ctx.fillStyle='rgba(12,2,24,'+ease((t-.87)/.1)+')';ctx.fillRect(0,0,w,h);}
   }else{
    // Sarah's start screen appears behind drifting fading rose fragments.
    ctx.fillStyle='rgba(12,2,24,'+(1-ease(t))+')';ctx.fillRect(0,0,w,h);
   }
  }
  // The arrival canvas is now painted; remove the pre-paint blackout guard.
  if(arrival)document.documentElement.classList.remove('portal-arrival-pending');
  if(t<1){requestAnimationFrame(frame);}else if(destination){
   // Keep the old world completely covered until navigation replaces the page.
   ctx.globalAlpha=1;ctx.fillStyle='#0c0218';ctx.fillRect(0,0,w,h);
   el.style.background='#0c0218';
   window.location.assign(destination);
  }else{el.remove();active=false;}
 }
 requestAnimationFrame(frame);
}
window.portalWarp=function(destination,kind,target){
 if(active)return;kind=kind||'storm';window.portalWarpTarget=target||null;
 try{sessionStorage.setItem('esatPortalArrival',kind);}catch(e){}
 play(kind,false,destination);
};
let incoming=null;try{incoming=sessionStorage.getItem('esatPortalArrival');sessionStorage.removeItem('esatPortalArrival');}catch(e){}
if(incoming){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>play(incoming,true,null),{once:true});else play(incoming,true,null);}
})();