
(()=>{'use strict';const cv=document.getElementById('game'),g=cv.getContext('2d');g.imageSmoothingEnabled=false;const ASSETS={esat:'assets/images/ea92ad620342bdf3.png',jessica:'assets/images/efab01154773c47e.png',rabbit:'assets/images/de0e00bcbe0f8fd7.png',scenery:'assets/images/c303c079fae734dd.jpg',esat_run_sheet:'assets/images/0d2e38f96fd87bc4.png'};const hofnarrSprite=new Image();hofnarrSprite.src='assets/images/9e85563726bb8dd6.png';
const hofnarrPortrait=new Image();hofnarrPortrait.src='assets/images/7b4712b462504d20.png';
const jessicaUserSprite=new Image();jessicaUserSprite.src='assets/images/3c48025852d0619c.png';
const imgs={};for(const n of ['esat','jessica','rabbit','scenery','esat_run_sheet']){let im=new Image();im.src=ASSETS[n];imgs[n]=im;}const BOSS_ARENA_CAMERA_X=1885;
// Zweiter Boss: vorläufige Silhouette, Design folgt später.
const SECOND_ARENA_LEFT=4200,SECOND_ARENA_RIGHT=4820;
let secondBoss=null,secondBunnies=[],secondShots=[],secondBossWall=false;
function initSecondArea(){
 secondBoss={x:4600,y:68,w:175,h:FLOOR-68,hp:150,max:150,active:false,defeated:false,cool:105,hit:0,armor:{helmet:3,chest:5,bootLeft:3,bootRight:3},armorFlash:0,attack:'idle',attackT:0,attackType:0,comboPending:false,comboStage:0,comboNextAt:0,comboWarning:0};
 secondBossWall=false;secondShots=[];
 secondBunnies=[3500,3660,3840,4030].map((x,i)=>({x,base:x,y:FLOOR-24,w:27,h:24,dir:i%2?-1:1,alive:true,hop:0,vy:0,cool:45+i*19}));
}
const hopeIdleSprite=new Image();
hopeIdleSprite.src='assets/images/3b21ad9f05400fa2.png';
const hopeAnimationSprites={};
hopeAnimationSprites['atk3_0']=new Image();hopeAnimationSprites['atk3_0'].src='assets/images/23d545c57ba6224c.png';
hopeAnimationSprites['atk3_1']=new Image();hopeAnimationSprites['atk3_1'].src='assets/images/e2ce60170b98b950.png';
hopeAnimationSprites['atk3_2']=new Image();hopeAnimationSprites['atk3_2'].src='assets/images/b44f3cb1c2120382.png';
hopeAnimationSprites['atk3_3']=new Image();hopeAnimationSprites['atk3_3'].src='assets/images/c0ed9b9a86080660.png';
hopeAnimationSprites['atk3_4']=new Image();hopeAnimationSprites['atk3_4'].src='assets/images/fb87bc4bd4f5771d.png';
hopeAnimationSprites['atk3_5']=new Image();hopeAnimationSprites['atk3_5'].src='assets/images/7aba32b3372c057b.png';
hopeAnimationSprites['atk4_0']=new Image();hopeAnimationSprites['atk4_0'].src='assets/images/44da6eb044421f8d.png';
hopeAnimationSprites['atk4_1']=new Image();hopeAnimationSprites['atk4_1'].src='assets/images/f868be6691b7cb1a.png';
hopeAnimationSprites['atk4_2']=new Image();hopeAnimationSprites['atk4_2'].src='assets/images/3d7eca8a2ec384a3.png';
hopeAnimationSprites['atk4_3']=new Image();hopeAnimationSprites['atk4_3'].src='assets/images/32c70a70628c3927.png';
hopeAnimationSprites['atk4_4']=new Image();hopeAnimationSprites['atk4_4'].src='assets/images/e665ccbc5032da8b.png';
hopeAnimationSprites['atk4_5']=new Image();hopeAnimationSprites['atk4_5'].src='assets/images/04a2461ce91a410e.png';
hopeAnimationSprites['atk4_6']=new Image();hopeAnimationSprites['atk4_6'].src='assets/images/75a77faf992a4449.png';
hopeAnimationSprites['atk4_7']=new Image();hopeAnimationSprites['atk4_7'].src='assets/images/d0bbae881057b395.png';
hopeAnimationSprites['atk4_8']=new Image();hopeAnimationSprites['atk4_8'].src='assets/images/acab0cbeadf7ef5c.png';
hopeAnimationSprites['atk4_9']=new Image();hopeAnimationSprites['atk4_9'].src='assets/images/efc6f89a26e7ec09.png';
hopeAnimationSprites['atk1_0']=new Image();hopeAnimationSprites['atk1_0'].src='assets/images/004112b1fa41f8e5.png';
hopeAnimationSprites['atk1_1']=new Image();hopeAnimationSprites['atk1_1'].src='assets/images/792a90ae3fec5cec.png';
hopeAnimationSprites['atk1_2']=new Image();hopeAnimationSprites['atk1_2'].src='assets/images/ddb365156a844246.png';
hopeAnimationSprites['atk1_3']=new Image();hopeAnimationSprites['atk1_3'].src='assets/images/54c3d730bd169826.png';
hopeAnimationSprites['atk1_4']=new Image();hopeAnimationSprites['atk1_4'].src='assets/images/56f3980c349d16ac.png';
hopeAnimationSprites['atk1_5']=new Image();hopeAnimationSprites['atk1_5'].src='assets/images/222115fa77243184.png';
hopeAnimationSprites['atk2_0']=new Image();hopeAnimationSprites['atk2_0'].src='assets/images/3946bdab32496121.png';
hopeAnimationSprites['atk2_1']=new Image();hopeAnimationSprites['atk2_1'].src='assets/images/48e39ba0e6bb429b.png';
hopeAnimationSprites['atk2_2']=new Image();hopeAnimationSprites['atk2_2'].src='assets/images/98a5b560cd61605d.png';
hopeAnimationSprites['atk2_3']=new Image();hopeAnimationSprites['atk2_3'].src='assets/images/e98f031410129314.png';
hopeAnimationSprites['atk2_4']=new Image();hopeAnimationSprites['atk2_4'].src='assets/images/f1f81ddd04e78e07.png';
hopeAnimationSprites['atk2_5']=new Image();hopeAnimationSprites['atk2_5'].src='assets/images/63fca41ee7419e82.png';
hopeAnimationSprites['helmet_0']=new Image();hopeAnimationSprites['helmet_0'].src='assets/images/6b6bd2e120c844a1.png';
hopeAnimationSprites['helmet_1']=new Image();hopeAnimationSprites['helmet_1'].src='assets/images/7e01149f8a69b2ca.png';
hopeAnimationSprites['helmet_2']=new Image();hopeAnimationSprites['helmet_2'].src='assets/images/2403293a57fd7dcd.png';
hopeAnimationSprites['helmet_3']=new Image();hopeAnimationSprites['helmet_3'].src='assets/images/0a0e4c28db313ca0.png';
hopeAnimationSprites['helmet_4']=new Image();hopeAnimationSprites['helmet_4'].src='assets/images/e6b8bb985338c26a.png';
hopeAnimationSprites['helmet_5']=new Image();hopeAnimationSprites['helmet_5'].src='assets/images/f9c9014157c861b7.png';
hopeAnimationSprites['helmet_6']=new Image();hopeAnimationSprites['helmet_6'].src='assets/images/b4758963efc51e4b.png';
hopeAnimationSprites['helmet_7']=new Image();hopeAnimationSprites['helmet_7'].src='assets/images/f9f85ecca9b2c14c.png';
hopeAnimationSprites['helmet_8']=new Image();hopeAnimationSprites['helmet_8'].src='assets/images/b87944d95a4d7c8d.png';
hopeAnimationSprites['helmet_9']=new Image();hopeAnimationSprites['helmet_9'].src='assets/images/af105e7615a6b9bc.png';
hopeAnimationSprites['helmet_drop_0']=new Image();hopeAnimationSprites['helmet_drop_0'].src='assets/images/6207ff4221ee3c15.png';
hopeAnimationSprites['helmet_drop_1']=new Image();hopeAnimationSprites['helmet_drop_1'].src='assets/images/3e92eefad3ae5ff3.png';
hopeAnimationSprites['helmet_drop_2']=new Image();hopeAnimationSprites['helmet_drop_2'].src='assets/images/bc6ee1f45ba421a5.png';
hopeAnimationSprites['helmet_drop_3']=new Image();hopeAnimationSprites['helmet_drop_3'].src='assets/images/baf22398aaf91c4d.png';
hopeAnimationSprites['helmet_drop_4']=new Image();hopeAnimationSprites['helmet_drop_4'].src='assets/images/82aa67e786356cdc.png';
hopeAnimationSprites['helmet_drop_5']=new Image();hopeAnimationSprites['helmet_drop_5'].src='assets/images/29deaf3728e068b2.png';
hopeAnimationSprites['helmet_drop_6']=new Image();hopeAnimationSprites['helmet_drop_6'].src='assets/images/e418be21641efca9.png';
hopeAnimationSprites['helmet_drop_7']=new Image();hopeAnimationSprites['helmet_drop_7'].src='assets/images/67f78b8b8bc21206.png';
hopeAnimationSprites['chest_0']=new Image();hopeAnimationSprites['chest_0'].src='assets/images/6d2dfeb86e8363c4.png';
hopeAnimationSprites['chest_1']=new Image();hopeAnimationSprites['chest_1'].src='assets/images/9067bcc9bd5be263.png';
hopeAnimationSprites['chest_2']=new Image();hopeAnimationSprites['chest_2'].src='assets/images/a651c1045a1fa48a.png';
hopeAnimationSprites['chest_3']=new Image();hopeAnimationSprites['chest_3'].src='assets/images/24b619a818094286.png';
hopeAnimationSprites['chest_4']=new Image();hopeAnimationSprites['chest_4'].src='assets/images/60b8f9b8b6bfdad7.png';
hopeAnimationSprites['chest_5']=new Image();hopeAnimationSprites['chest_5'].src='assets/images/c7899578c73e15d2.png';
hopeAnimationSprites['chest_6']=new Image();hopeAnimationSprites['chest_6'].src='assets/images/bfbd5f9228da9c7b.png';
hopeAnimationSprites['chest_7']=new Image();hopeAnimationSprites['chest_7'].src='assets/images/e771124ed6d75629.png';
hopeAnimationSprites['chest_8']=new Image();hopeAnimationSprites['chest_8'].src='assets/images/831bea5f7a7900fa.png';
hopeAnimationSprites['chest_9']=new Image();hopeAnimationSprites['chest_9'].src='assets/images/c6129d46b018447d.png';
hopeAnimationSprites['chest_drop_0']=new Image();hopeAnimationSprites['chest_drop_0'].src='assets/images/58e06c10cb50dea0.png';
hopeAnimationSprites['chest_drop_1']=new Image();hopeAnimationSprites['chest_drop_1'].src='assets/images/43c2e06def612a81.png';
hopeAnimationSprites['chest_drop_2']=new Image();hopeAnimationSprites['chest_drop_2'].src='assets/images/7bd25946fb0ab63d.png';
hopeAnimationSprites['chest_drop_3']=new Image();hopeAnimationSprites['chest_drop_3'].src='assets/images/1f48a1249ffc8de4.png';
hopeAnimationSprites['chest_drop_4']=new Image();hopeAnimationSprites['chest_drop_4'].src='assets/images/c18ef63960c5cf6a.png';
hopeAnimationSprites['chest_drop_5']=new Image();hopeAnimationSprites['chest_drop_5'].src='assets/images/8393033a6097988a.png';
hopeAnimationSprites['chest_drop_6']=new Image();hopeAnimationSprites['chest_drop_6'].src='assets/images/bba87c7efc506014.png';
hopeAnimationSprites['chest_drop_7']=new Image();hopeAnimationSprites['chest_drop_7'].src='assets/images/26dacab40a5228ba.png';
hopeAnimationSprites['boots_0']=new Image();hopeAnimationSprites['boots_0'].src='assets/images/b751aa93bffb01c8.png';
hopeAnimationSprites['boots_1']=new Image();hopeAnimationSprites['boots_1'].src='assets/images/20494a26a43eb1fb.png';
hopeAnimationSprites['boots_2']=new Image();hopeAnimationSprites['boots_2'].src='assets/images/18f76f156bb332ae.png';
hopeAnimationSprites['boots_3']=new Image();hopeAnimationSprites['boots_3'].src='assets/images/e9e837a3a3659236.png';
hopeAnimationSprites['boots_4']=new Image();hopeAnimationSprites['boots_4'].src='assets/images/a32b762d34ba4e77.png';
hopeAnimationSprites['boots_5']=new Image();hopeAnimationSprites['boots_5'].src='assets/images/dc91064df0c129d2.png';
hopeAnimationSprites['boots_6']=new Image();hopeAnimationSprites['boots_6'].src='assets/images/16a81150c78db63e.png';
hopeAnimationSprites['boots_7']=new Image();hopeAnimationSprites['boots_7'].src='assets/images/c9d00100387de29d.png';
hopeAnimationSprites['boots_8']=new Image();hopeAnimationSprites['boots_8'].src='assets/images/f9e968c8295a8787.png';
hopeAnimationSprites['boots_9']=new Image();hopeAnimationSprites['boots_9'].src='assets/images/c1a0fc533683277a.png';
hopeAnimationSprites['boots_drop_0']=new Image();hopeAnimationSprites['boots_drop_0'].src='assets/images/78bc700769b9e81e.png';
hopeAnimationSprites['boots_drop_1']=new Image();hopeAnimationSprites['boots_drop_1'].src='assets/images/75074612288e2180.png';
hopeAnimationSprites['boots_drop_2']=new Image();hopeAnimationSprites['boots_drop_2'].src='assets/images/60d1a8b99b7c3599.png';
hopeAnimationSprites['boots_drop_3']=new Image();hopeAnimationSprites['boots_drop_3'].src='assets/images/7f7cbff14146f667.png';
hopeAnimationSprites['boots_drop_4']=new Image();hopeAnimationSprites['boots_drop_4'].src='assets/images/ac069c01f485415f.png';
hopeAnimationSprites['boots_drop_5']=new Image();hopeAnimationSprites['boots_drop_5'].src='assets/images/c74522e1543d6046.png';
hopeAnimationSprites['boots_drop_6']=new Image();hopeAnimationSprites['boots_drop_6'].src='assets/images/3673081689203626.png';
hopeAnimationSprites['boots_drop_7']=new Image();hopeAnimationSprites['boots_drop_7'].src='assets/images/52e9f496530adccc.png';


const spriteFootCache=new WeakMap();
function spriteFootPixel(im,sx=0,sy=0,sw=im.naturalWidth,sh=im.naturalHeight){
 let entries=spriteFootCache.get(im);
 if(!entries){entries=new Map();spriteFootCache.set(im,entries);}
 const key=[sx,sy,sw,sh].join(':');if(entries.has(key))return entries.get(key);
 let foot=sh;
 try{
  const canvas=document.createElement('canvas');canvas.width=sw;canvas.height=sh;
  const ctx=canvas.getContext('2d',{willReadFrequently:true});
  ctx.drawImage(im,sx,sy,sw,sh,0,0,sw,sh);
  const rgba=ctx.getImageData(0,0,sw,sh).data,minPixels=Math.max(2,Math.ceil(sw*.008));
  outer:for(let yy=sh-1;yy>=0;yy--){
   let count=0;
   for(let xx=0;xx<sw;xx++)if(rgba[(yy*sw+xx)*4+3]>=160&&++count>=minPixels){foot=yy+1;break outer;}
  }
 }catch(e){/* Retain source bounds if pixel inspection is unavailable. */}
 entries.set(key,foot);return foot;
}
function drawGroundedSprite(im,x,feetY,w,h,sx=0,sy=0,sw=im.naturalWidth,sh=im.naturalHeight,visible=1){
 if(!im.complete||!im.naturalWidth||visible<=0)return;
 const foot=spriteFootPixel(im,sx,sy,sw,sh);
 const top=feetY-foot/sh*h;
 g.drawImage(im,sx,sy,sw,sh*visible,x,top,w,h*visible);
}

function hopeFrame(name){const im=hopeAnimationSprites[name];return im&&im.complete&&im.naturalWidth?im:null;}
function hopeArmorLayer(b){
 // The armor is independent: damaged components remain gone regardless of attack frame.
 const x=b.x,y=b.y;
 const parts=[['helmet',b.armor.helmet,3,44,0,87,79],['chest',b.armor.chest,5,34,83,113,90],['boots',b.armor.bootLeft,3,8,191,83,62],['boots',b.armor.bootRight,3,94,191,81,62]];
 for(let k=0;k<parts.length;k++){
  const [name,hp,max,dx,dy,w,h]=parts[k];
  // intact is already in full-body art; show damage and bare fur from dedicated armor sequences
  if(hp>=max)continue;
  const idx=hp<=0?9:Math.min(8,Math.round((max-hp)/max*8));
  const im=hopeFrame(name+'_'+idx);if(!im)continue;
  g.save();g.beginPath();g.rect(x+dx,y+dy,w,h);g.clip();
  if(name==='boots'){
   // full-body boots sheet is aligned to the full sprite, crop the corresponding boot section
   const sx=k===2?Math.round(im.naturalWidth*.03):Math.round(im.naturalWidth*.52);
   const sw=Math.round(im.naturalWidth*.46);
   g.drawImage(im,sx,Math.round(im.naturalHeight*.67),Math.min(sw,im.naturalWidth-sx),Math.max(1,Math.round(im.naturalHeight*.33)),x+dx,y+dy,w,h);
  }else{
   g.drawImage(im,0,0,im.naturalWidth,im.naturalHeight,x+dx-8,y+dy-14,w+16,h+24);
  }
  g.restore();
 }
}
function hopeDrawArmorFragments(b){
 if(!b.fragments)return;
 for(const f of b.fragments){
  const im=hopeFrame(f.type+'_drop_'+Math.min(7,Math.floor(f.age/5)));
  if(!im)continue;
  g.save();g.globalAlpha=Math.min(1,Math.max(0,(80-f.age)/25));
  const xx=b.x+f.dx+f.vx*f.age,yy=Math.min(FLOOR-18,b.y+f.dy+f.vy*f.age+.22*f.age*f.age);
  g.translate(xx,yy);g.rotate(f.age*.06*f.spin);g.drawImage(im,-f.w/2,-f.h/2,f.w,f.h);g.restore();
 }
}
function hopeProjectileHit(q){
 const b=secondBoss;
 if(!b||!b.active||b.defeated||q.x<0)return false;
 const cx=q.x+q.w/2,cy=q.y+q.h/2;
 // Jede Karotte, die Hopes Koerper trifft, verursacht exakt einen Schadenspunkt.
 // Praezise Koerper-Hitbox: waehrend des Titanensprungs kann Hope in der Luft nicht getroffen werden.
 if(b.attack==='titan'&&(b.titanLift||0)>10)return false;
 const rx=cx-b.x,ry=cy-b.y;
 // Kopf, Oberkoerper und Beine statt der bisherigen riesigen Rechteck-Hitbox.
 const body=((rx-90)/63)**2+((ry-145)/77)**2<=1;
 const head=((rx-69)/44)**2+((ry-66)/54)**2<=1;
 const legs=(((rx-51)/36)**2+((ry-223)/40)**2<=1)
          ||(((rx-133)/38)**2+((ry-223)/40)**2<=1);
 if(!(body||head||legs))return false;
 b.hp=Math.max(0,b.hp-1);
 // Ab den letzten 18 HP beginnt Hopes verzweifelte Endphase.
 if(b.hp<=18&&!b.comboStage&&!b.comboPending){
  b.comboPending=true;b.comboNextAt=frame;
  say('HOPE RASTET AUS! TITANENSPRUNG + GREIFHAND!',115);
 }

 b.hit=12;if(b.hp>0)shake=Math.max(shake,4);snd(600,.14);
 if(b.hp<=0){
  b.defeated=true;b.active=false;secondBossWall=false;secondShots=[];b.grabHand=null;
  hp=3;inv=90;startLevelMusic();
  say('HOPE IST BESIEGT!',150);
  shake=0;b.dying=true;b.deathTick=0;b.deathStage="kneeling";b.deathParticles=[];
 }
 return true;
}
function hopeArmorHit(b,part){
 b.armorFlash=10;
 if(!b.fragments)b.fragments=[];
 if(b.armor[part]===0){
  const p=part==='helmet'?['helmet',75,43,65,48]:part==='chest'?['chest',90,125,100,70]:['boots',part==='bootLeft'?48:134,215,65,40];
  b.fragments.push({type:p[0],dx:p[1],dy:p[2],w:p[3],h:p[4],age:0,vx:part==='bootLeft'?-1.8:1.6,vy:-4.5,spin:part==='bootLeft'?-1:1});
  shake=Math.max(shake,8);snd(190,.2);
 }
}

const hopeGrabSprites={};
hopeGrabSprites['grab_0_0']=new Image();hopeGrabSprites['grab_0_0'].src='assets/images/bf4d27446cdc05f4.png';
hopeGrabSprites['grab_0_1']=new Image();hopeGrabSprites['grab_0_1'].src='assets/images/32f0e32dc4df33ac.png';
hopeGrabSprites['grab_0_2']=new Image();hopeGrabSprites['grab_0_2'].src='assets/images/16abad4e9f37afaa.png';
hopeGrabSprites['grab_0_3']=new Image();hopeGrabSprites['grab_0_3'].src='assets/images/c8a44675d973b792.png';
hopeGrabSprites['grab_0_4']=new Image();hopeGrabSprites['grab_0_4'].src='assets/images/fa37d3dc8121b889.png';
hopeGrabSprites['grab_0_5']=new Image();hopeGrabSprites['grab_0_5'].src='assets/images/9d95a15578ce1bae.png';
hopeGrabSprites['grab_1_0']=new Image();hopeGrabSprites['grab_1_0'].src='assets/images/b1c5f0668c0dd26a.png';
hopeGrabSprites['grab_1_1']=new Image();hopeGrabSprites['grab_1_1'].src='assets/images/61aa90d7348d285a.png';
hopeGrabSprites['grab_1_2']=new Image();hopeGrabSprites['grab_1_2'].src='assets/images/ed84ba5853a83bf0.png';
hopeGrabSprites['grab_1_3']=new Image();hopeGrabSprites['grab_1_3'].src='assets/images/37c90cfca5b8d53f.png';
hopeGrabSprites['grab_1_4']=new Image();hopeGrabSprites['grab_1_4'].src='assets/images/6a9b97aadfef227d.png';
hopeGrabSprites['grab_2_0']=new Image();hopeGrabSprites['grab_2_0'].src='assets/images/3fd9f449f7c1c72e.png';
hopeGrabSprites['grab_2_1']=new Image();hopeGrabSprites['grab_2_1'].src='assets/images/8b94dc22b49f6609.png';
hopeGrabSprites['grab_2_2']=new Image();hopeGrabSprites['grab_2_2'].src='assets/images/25787ac8d4589c26.png';
hopeGrabSprites['grab_2_3']=new Image();hopeGrabSprites['grab_2_3'].src='assets/images/b4abe533fea54736.png';
hopeGrabSprites['grab_2_4']=new Image();hopeGrabSprites['grab_2_4'].src='assets/images/a7d0d07070d5eca5.png';
hopeGrabSprites['grab_2_5']=new Image();hopeGrabSprites['grab_2_5'].src='assets/images/f6286296db265fb6.png';

function hopeGrabImage(key){const img=hopeGrabSprites[key];return img&&img.complete&&img.naturalWidth?img:null;}
function drawHopeGrab(b){
 const h=b.grabHand;
 if(!h)return;
 const wristX=b.x+36,wristY=b.y+105;
 const hx=h.x,hy=h.y;
 g.save();
 g.shadowColor='#ff153b';g.shadowBlur=16;
 g.strokeStyle='#ff3554';g.lineWidth=3;
 g.beginPath();g.moveTo(wristX,wristY);g.quadraticCurveTo((wristX+hx)/2,wristY-18+Math.sin(frame*.3)*8,hx+30,hy+19);g.stroke();
 g.strokeStyle='#ffcfda';g.lineWidth=1;g.beginPath();g.moveTo(wristX,wristY);g.lineTo(hx+30,hy+19);g.stroke();
 const idx=h.state==='out'?Math.min(2,Math.floor(h.age/5)):h.state==='hold'?3:4;
 const img=hopeGrabImage('grab_1_'+idx);
 if(img)g.drawImage(img,hx-15,hy-25,96,75);
 else {r(hx,hy,65,35,'#ff3b55');}
 g.restore();
}
const hopeTitanSprites=[];
hopeTitanSprites[0]=new Image();hopeTitanSprites[0].src='assets/images/c4fdba54f77eae89.png';
hopeTitanSprites[1]=new Image();hopeTitanSprites[1].src='assets/images/a585796363d1e19e.png';
hopeTitanSprites[2]=new Image();hopeTitanSprites[2].src='assets/images/aa3fbf6612834572.png';
hopeTitanSprites[3]=new Image();hopeTitanSprites[3].src='assets/images/def1f2ed7d2f72e0.png';
hopeTitanSprites[4]=new Image();hopeTitanSprites[4].src='assets/images/8fac6852fcd8e39e.png';
hopeTitanSprites[5]=new Image();hopeTitanSprites[5].src='assets/images/c180217cda532977.png';
hopeTitanSprites[6]=new Image();hopeTitanSprites[6].src='assets/images/c4557c2f17df6bc0.png';
hopeTitanSprites[7]=new Image();hopeTitanSprites[7].src='assets/images/e56cc1df9d8ee72a.png';
hopeTitanSprites[8]=new Image();hopeTitanSprites[8].src='assets/images/74baf8377371844a.png';
hopeTitanSprites[9]=new Image();hopeTitanSprites[9].src='assets/images/af9c4d549c488946.png';
hopeTitanSprites[10]=new Image();hopeTitanSprites[10].src='assets/images/bacaafe807a40b71.png';
hopeTitanSprites[11]=new Image();hopeTitanSprites[11].src='assets/images/3d74804e5316b6f4.png';
hopeTitanSprites[12]=new Image();hopeTitanSprites[12].src='assets/images/86f4767cf7d9085c.png';
hopeTitanSprites[13]=new Image();hopeTitanSprites[13].src='assets/images/b4616f5a90ee4d9b.png';
hopeTitanSprites[14]=new Image();hopeTitanSprites[14].src='assets/images/183397c44b3d9697.png';
const hopeDeathSprites=[(()=>{const im=new Image();im.src='assets/images/b4605c6206a03a73.png';return im;})(),(()=>{const im=new Image();im.src='assets/images/7d2836c50f2347f8.png';return im;})(),(()=>{const im=new Image();im.src='assets/images/1a38c117de412367.png';return im;})(),(()=>{const im=new Image();im.src='assets/images/4c1fa9de0a78159f.png';return im;})(),(()=>{const im=new Image();im.src='assets/images/e894468f85140f68.png';return im;})(),(()=>{const im=new Image();im.src='assets/images/75da6982a0a5118d.png';return im;})(),(()=>{const im=new Image();im.src='assets/images/8414c735f5e62994.png';return im;})(),(()=>{const im=new Image();im.src='assets/images/a10eb40c18488978.png';return im;})()];
function drawHopeDeath(b){
 if(b.deathStage==='gone')return;
 // A single sprite-to-world scale for all poses. Only the pose changes height.
 const tick=b.deathTick||0;
 const ix=b.deathStage==='kneeling'||b.deathStage==='speech'
  ? Math.min(4,Math.floor(tick/11))
  : b.deathStage==='falling'?Math.min(7,5+Math.floor(tick/15)):7;
 const im=hopeDeathSprites[ix];
 const scale=b.h/356;
 const centerX=b.x+b.w/2;
 const x=centerX-280*scale,w=560*scale,h=400*scale;
 const y=im&&im.complete&&im.naturalWidth?FLOOR-spriteFootPixel(im)/im.naturalHeight*h:FLOOR-h;
 if(im&&im.complete&&im.naturalWidth){
  g.save();
  if(b.deathStage==='dissolving'){
   const fade=Math.min(1,tick/105);
   g.globalAlpha=1-fade;
   // Dissolve from the ground upward, retaining the same body scale.
   const crop=Math.max(1,Math.floor(im.naturalHeight*(1-fade)));
   g.drawImage(im,0,0,im.naturalWidth,crop,x,y,w,h*(crop/im.naturalHeight));
  }else g.drawImage(im,x,y,w,h);
  g.restore();
 }else if(b.deathStage!=='dissolving')drawGroundedSprite(hopeIdleSprite,b.x,FLOOR,b.w,b.h);
 if(b.deathParticles){
  g.save();
  for(const q of b.deathParticles){
   g.globalAlpha=Math.max(0,Math.min(1,q.life/48));
   g.fillStyle=q.color;g.fillRect(q.x,q.y,q.size,q.size);
  }
  g.restore();
 }
}
function advanceHopeDeathParticles(b){
 if(!b.deathParticles)b.deathParticles=[];
 if(b.deathStage==='dissolving' && b.deathTick<105){
  for(let k=0;k<7;k++){
   const scale=b.h/356;
   b.deathParticles.push({x:b.x+b.w/2+(Math.random()-.5)*b.w*.85,
    y:FLOOR-((b.deathTick/105)*b.h)-Math.random()*25,
    vx:(Math.random()-.5)*2.5,vy:-1.4-Math.random()*2.2,
    life:40+Math.random()*20,size:2+Math.random()*4,
    color:['#f5d4ff','#e958c5','#ffb3df','#ffc966','#b95bea'][Math.floor(Math.random()*5)]});
  }
 }
 for(const q of b.deathParticles){q.x+=q.vx;q.y+=q.vy;q.vy-=.012;q.life--;}
 b.deathParticles=b.deathParticles.filter(q=>q.life>0);
}

function drawHopeEpicAura(b){
 if(b.defeated)return;
 const cx=b.x+b.w/2,base=FLOOR-(b.attack==='titan'?(b.titanLift||0):0);
 g.save();g.globalAlpha=b.active?.5:.24;
 g.shadowColor='#ffc761';g.shadowBlur=b.active?18:9;
 g.strokeStyle='#dfaf59';g.lineWidth=1.5;
 g.beginPath();g.ellipse(cx,base-3,b.w*.47,10,0,0,Math.PI*2);g.stroke();
 if(b.active){
  for(let i=0;i<10;i++){
   const angle=i*Math.PI*2/10+frame*.008;
   const xx=cx+Math.cos(angle)*b.w*.52,yy=base-8+Math.sin(angle)*13;
   g.fillStyle=i%2?'#ffe4a4':'#b76fcd';g.fillRect(xx,yy,3,3);
  }
  for(let i=0;i<8;i++){
   const age=(frame*.65+i*33)%210;
   g.globalAlpha=(1-age/210)*.55;g.fillStyle=i%2?'#ffd880':'#d7acff';
   g.fillRect(cx+Math.sin(i*2.4+age*.013)*b.w*.52,base-age,2+i%2,3);
  }
 }
 g.restore();
}

function drawHope(b){
 const x=b.x,y=b.y;
 drawHopeEpicAura(b);
 g.save();g.filter='saturate(1.2) contrast(1.08) brightness(1.04)';g.shadowColor='#ffd68d';g.shadowBlur=b.active?7:3;if(b.hit>0&&frame%4<2)g.globalAlpha=.65;
 const anim=b.attack==='slam'?'atk1':b.attack==='cast'?'atk2':b.attack==='slash'?'atk3':b.attack==='jump'?'atk4':null;
 const count=anim==='atk4'?10:6;
 const idx=Math.min(count-1,Math.max(0,Math.floor((1-b.attackT/48)*count)));
 const sprite=anim?hopeFrame(anim+'_'+Math.max(0,idx)):null;
 const grabIdx=b.attackT>0?Math.min(11,Math.floor((48-b.attackT)/4)):11;
 const grabSprite=b.attack==='grab'?hopeGrabImage('grab_'+(grabIdx<6?'0':'2')+'_'+(grabIdx<6?grabIdx:grabIdx-6)):null;

 const titanSprite=b.attack==='titan'?hopeTitanSprites[Math.min(14,Math.max(0,Math.floor((96-b.attackT)*15/96)))]:null;
 const img=titanSprite||grabSprite||sprite||hopeIdleSprite;
 // anchored feet: every frame uses identical world position and dimensions
 if(img&&img.complete&&img.naturalWidth)drawGroundedSprite(img,x,FLOOR-(b.attack==='titan'?b.titanLift||0:0),b.w,b.h);
 // Armor stays visible as part of the original full-body sprite.
 g.restore();
 drawHopeGrab(b);
 if(b.armorFlash>0){g.save();g.globalAlpha=b.armorFlash/70;g.fillStyle='#fff0e4';g.fillRect(x,y,b.w,b.h);g.restore();}
 // Keine Ruestungs-Schwachpunkte oder Ruestungs-Fragmente.

}
function secondArenaDraw(){
 // Raised platforms along the new approach.
 for(const pl of platforms.filter(q=>q.secondArea)){
   r(pl.x,pl.y,pl.w,9,'#ec74d5');r(pl.x,pl.y+9,pl.w,10,'#683566');
   for(let k=0;k<pl.w;k+=17)r(pl.x+k,pl.y+2,9,3,'#ffc1f0');
 }
 for(const b of secondBunnies)if(b.alive)drawRabbit(b.x,b.y-b.hop,b.dir,frame);
 if(!secondBoss)return;
 if(secondBossWall){
   g.save();const rise=hopeGateIntro>0?1-hopeGateIntro/45:1;g.beginPath();g.rect(SECOND_ARENA_LEFT-15,FLOOR-(FLOOR-60)*rise,SECOND_ARENA_RIGHT-SECOND_ARENA_LEFT+30,(FLOOR-60)*rise);g.clip();
   for(const x of [SECOND_ARENA_LEFT,SECOND_ARENA_RIGHT]){
   g.save();g.shadowColor='#ed65ff';g.shadowBlur=14;
   r(x-6,66,12,FLOOR-66,'#4c1c60');r(x-2,66,4,FLOOR-66,'#f47bfa');
   for(let y=78;y<FLOOR;y+=22)r(x-5,y,10,4,'#ffd3ff');
   g.restore();
  }
 g.restore();}
 if(!secondBoss.defeated){
  const b=secondBoss;
  drawHope(b);
  if(b.active){
   r(SECOND_ARENA_LEFT+120,62,382,15,'#24142d');
   r(SECOND_ARENA_LEFT+123,65,376*b.hp/b.max,9,'#e43f83');
   text('EISENKRIEGER HOPE',SECOND_ARENA_LEFT+310,55,14,'#ffe4f7','center');
  }
 }else{
  // Preserve Hope's actual corpse throughout the farewell monologue.
  drawHopeDeath(secondBoss);
 }
 for(const q of secondShots){
  g.save();g.shadowColor='#ff7cff';g.shadowBlur=14;
  if(q.titanWave){
 const cx=q.x+q.w/2,age=q.age||0;
 g.shadowColor='#ff174f';g.shadowBlur=25;
 const grad=g.createLinearGradient(cx,FLOOR-125,cx,FLOOR);
 grad.addColorStop(0,'rgba(255,68,108,0)');grad.addColorStop(.35,'#ff3869');grad.addColorStop(.7,'#ffb1b4');grad.addColorStop(1,'#8e092c');
 g.fillStyle=grad;g.beginPath();
 g.moveTo(q.x-12,FLOOR);g.lineTo(q.x+2,FLOOR-55-Math.sin(age*.25)*8);
 g.lineTo(cx,FLOOR-123);g.lineTo(q.x+q.w-3,FLOOR-63);
 g.lineTo(q.x+q.w+12,FLOOR);g.closePath();g.fill();
 g.strokeStyle='#fff0e5';g.lineWidth=3;g.beginPath();g.moveTo(cx,FLOOR-115);g.lineTo(cx-4,FLOOR-25);g.stroke();
 for(let k=0;k<4;k++)r(cx+Math.sin(age*.25+k)*16,FLOOR-15-k*22,3,5,k%2?'#ffb3ca':'#ff3157');
}else if(q.groundWave){
 const age=q.age||0,cx=q.x+q.w/2;
 g.shadowColor='#ff234b';g.shadowBlur=q.epic?25:13;
 g.strokeStyle='#ff315b';g.lineWidth=q.epic?7:4;
 g.beginPath();g.arc(cx,FLOOR-5,q.epic?24:15,Math.PI,Math.PI*2);g.stroke();
 g.strokeStyle='#fff0ec';g.lineWidth=2.8;g.beginPath();g.arc(cx,FLOOR-5,q.epic?19:12,Math.PI*1.07,Math.PI*1.93);g.stroke();
 r(q.x-8,FLOOR-7,q.w+16,5,'#ff3349');
 if(q.epic){for(let k=0;k<5;k++){const t=(age*.13+k*.7);r(cx+Math.cos(t*2)*24,FLOOR-13-Math.abs(Math.sin(t))*25,4,6,k%2?'#fff0de':'#ff5271');}}
}else{r(q.x,q.y,q.w,q.h,'#d53de6');r(q.x+4,q.y+3,Math.max(2,q.w-8),Math.max(2,q.h-6),'#ffe7ff');}
  g.restore();
 }
}
function secondAreaUpdate(){
 if(!secondBoss)return;
 for(const b of secondBunnies){
  if(!b.alive)continue;
  b.cool--;
  if(b.hop>0){b.hop+=b.vy;b.vy-=.45;if(b.hop<0)b.hop=0}
  if(Math.abs(b.x-p.x)<180&&b.cool<=0){b.dir=p.x<b.x?-1:1;b.vy=6.3;b.hop=1;b.cool=75}
  b.x+=b.dir*(b.hop>0?1.3:.28);
  if(Math.abs(b.x-b.base)>45)b.dir*=-1;
  const bb={x:b.x,y:b.y-b.hop,w:b.w,h:b.h};
  if(overlap(esatHurtbox(),bb)){
   if(p.vy>1&&p.y+p.h<=bb.y+13){b.alive=false;p.vy=-7;score+=50;snd(620,.1)}
   else damage();
  }
 }
 if(!secondBoss.active||secondBoss.defeated)return;
 const b=secondBoss;
 if(b.hit>0)b.hit--;if(b.armorFlash>0)b.armorFlash--;if(b.fragments){for(const f of b.fragments)f.age++;b.fragments=b.fragments.filter(f=>f.age<80);}
 if(b.attackT>0)b.attackT--;else {b.attack='idle';b.titanLift=0;}
 // Der Greifarm startet schon waehrend der letzten Erdbebenwellen.
 // So trifft er Esat beim Ausweichsprung auf die Plattform.
 if(b.comboStage===1&&b.attack==='titan'&&b.attackT<=17&&b.titanImpact){
  b.comboStage=2;
  b.attack='grab';b.attackT=48;b.grabHand=null;b.grabFired=false;
  b.grabTarget={x:p.x+p.w/2,y:Math.max(35,Math.min(FLOOR-95,p.y+p.h/2-28))};
  b.comboWarning=24;
  shake=Math.max(shake,13);snd(380,.24);
  say('ACHTUNG! GREIFARM!',45);
 }
 if(b.comboWarning>0)b.comboWarning--;

 if(b.attack==='titan'){
  const t=96-b.attackT;
  if(t<24)b.titanLift=0;
  else if(t<42)b.titanLift=Math.sin((t-24)/18*Math.PI/2)*235;
  else if(t<55)b.titanLift=235;
  else if(t<67)b.titanLift=235*(1-(t-55)/12);
  else b.titanLift=0;
  if(t===67&&!b.titanImpact){
   b.titanImpact=true;shake=Math.max(shake,38);snd(65,.46);
   for(let k=0;k<55;k++)particles.push({x:b.x+b.w/2,y:FLOOR-7,vx:(Math.random()-.5)*12,vy:-2-Math.random()*10,t:25+Math.random()*34,c:k%3===0?'#fff1db':k%2?'#ff3157':'#a2183c'});
  }
  if(b.titanImpact&&b.titanWaveCount<5&&t>=68+b.titanWaveCount*5){
   const dir=p.x<b.x?-1:1;
   secondShots.push({x:b.x+(dir<0?-16:b.w-4),y:FLOOR-116,w:32,h:116,vx:dir*(6.2+b.titanWaveCount*.3),vy:0,titanWave:true,age:0});
   b.titanWaveCount++;shake=Math.max(shake,11);snd(110+b.titanWaveCount*32,.14);
  }
 }
  if(b.attack==='slash'&&!b.waveReleased&&b.attackT<=20&&b.attackT>0){
  b.waveReleased=true;
  const dir=p.x<b.x?-1:1;
  secondShots.push({x:b.x+(dir<0?-15:b.w-5),y:FLOOR-24,w:32,h:23,vx:dir*7.3,vy:0,groundWave:true,epic:true,age:0});
  shake=Math.max(shake,18);snd(95,.34);
  for(let k=0;k<18;k++)particles.push({x:b.x+b.w/2,y:FLOOR-9,vx:(Math.random()-.5)*7,vy:-Math.random()*6-1,t:25+Math.random()*18,c:'#ff354e'});
 }

 if(b.attack==='grab'&&!b.grabFired&&b.attackT<=(b.comboStage===2?39:30)&&b.attackT>0){
  b.grabFired=true;
  if(b.comboStage===2){
   // Zielpunkt: Plattformhoehe plus Ausweichsprung, nicht Esats Bodenposition.
   b.grabTarget={x:p.x+p.w/2,y:Math.max(45,Math.min(FLOOR-150,p.y-72))};
  }
  const sx=b.x+20,sy=b.y+103;
  const target=b.grabTarget||{x:p.x,y:p.y};
  const aimX=Math.max(SECOND_ARENA_LEFT+16,Math.min(SECOND_ARENA_RIGHT-16,target.x));
  const dx=aimX-sx,dy=target.y-sy,len=Math.max(1,Math.hypot(dx,dy));
  b.grabHand={x:sx,y:sy,vx:dx/len*(b.comboStage===2?23:17),vy:dy/len*(b.comboStage===2?23:17),age:0,state:'out',held:0};
  shake=Math.max(shake,6);snd(480,.16);
 }
 if(b.grabHand){
  const h=b.grabHand;h.age++;
  if(h.state==='out'){
   if(b.comboStage===2){
    // Die Hand folgt dem erwarteten Sprungbogen, statt starr an Esat vorbeizufliegen.
    const tx=p.x+p.w/2,ty=Math.max(38,Math.min(FLOOR-105,p.y+p.h/2-32));
    const dx=tx-h.x,dy=ty-h.y,d=Math.max(1,Math.hypot(dx,dy));
    h.vx=h.vx*.84+dx/d*25*.16;
    h.vy=h.vy*.84+dy/d*25*.16;
    const speed=Math.max(1,Math.hypot(h.vx,h.vy));
    h.vx=h.vx/speed*25;h.vy=h.vy/speed*25;
   }
   h.x+=h.vx;h.y+=h.vy;
   if(overlap({x:h.x-(b.comboStage===2?29:10),y:h.y-(b.comboStage===2?29:10),w:b.comboStage===2?112:70,h:b.comboStage===2?100:55},esatHurtbox())){
    h.state='hold';h.held=13;h.caught=true;h.crushed=false;
    hopeAttackLockedUntil=frame+21;
    shake=Math.max(shake,13);snd(130,.23);
    // Schaden und Bluteffekt erst, wenn Hope Esat in seiner Hand zerquetscht.
   }else if(h.age>65||h.x<SECOND_ARENA_LEFT+5||h.x>SECOND_ARENA_RIGHT-5){h.state='back';}
  }else if(h.state==='hold'){
   h.held--;
   p.x=h.x+18;p.y=h.y+4;p.vx=0;p.vy=0;
   if(h.held<=0)h.state='back';
  }else if(h.state==='crush'){
   h.crushFrames--;
   p.x=h.x+18;p.y=h.y+4;p.vx=0;p.vy=0;
   if(h.crushFrames<=0){
    // Kein seitlicher Rueckstoss: Esat wird am Ort der Hand losgelassen.
    p.x=h.x+18;p.y=h.y+4;
    p.vx=0;p.vy=0;
    inv=Math.max(inv,75);
    h.caught=false;h.state='back';
    shake=Math.max(shake,14);snd(180,.22);
   }
  }else{
   const dx=b.x+20-h.x,dy=b.y+103-h.y,dist=Math.hypot(dx,dy);
   if(h.caught&&!h.crushed&&dist<80){
    // Hand schliesst sich an Hopes Brust: Blutfontaene und kurzer Einschlag.
    h.crushed=true;h.crushFrames=10;
    h.state='crush';
    h.x=b.x+23;h.y=b.y+95;
    p.x=h.x+18;p.y=h.y+4;p.vx=0;p.vy=0;
    shake=Math.max(shake,28);snd(80,.35);
    // Kein Blut beim Zurueckziehen oder Zerquetschen.
    damage();
    inv=Math.max(inv,65);
   }else if(dist<18){
    b.grabHand=null;
    // Unmittelbar nach dem abgeschlossenen Greifarm folgt der Bodenschlag
    // mit dem flachen, auf Esat zufliegenden Bodenprojektil (slash).
    b.followupGroundWave=true;
   }else{
    h.x+=dx/dist*19;h.y+=dy/dist*19;
    if(h.caught){p.x=h.x+18;p.y=h.y+4;p.vx=0;p.vy=0;}
   }
  }
 }
 b.cool--;
 if(b.followupGroundWave&&!b.grabHand){
  b.followupGroundWave=false;
  b.attack='slash';b.attackT=48;b.waveReleased=false;
  b.cool=Math.max(b.cool,55);
  snd(210,.12);
 }
 if(b.comboStage===2&&b.attack==='idle'&&!b.grabHand&&!b.followupGroundWave){
  b.comboStage=0;
  b.comboNextAt=frame+340;
  b.cool=Math.max(b.cool,75);
 }
 const comboReady=b.hp<=18&&b.comboStage===0&&frame>=b.comboNextAt;
 const startCombo=comboReady&&(b.comboPending||b.cool<=0);
 if(startCombo||(b.cool<=0&&b.attack==='idle'&&!b.grabHand&&b.comboStage===0)){
  if(startCombo){
   b.comboPending=false;b.comboStage=1;
   b.attackType=2;b.attack='titan';b.attackT=96;b.cool=210;
   say('HOPE: ERDBEBEN-KOMBO!',65);
  }else{
   b.attackType=Math.floor(Math.random()*3);
   b.attack=['slash','grab','titan'][b.attackType];
   b.attackT=b.attack==='titan'?96:48;
   b.cool=100+Math.floor(Math.random()*55);
  }
  if(b.attack==='titan'){
   b.titanWaveCount=0;b.titanLift=0;b.titanImpact=false;b.grabHand=null;snd(170,.22);
  }else if(b.attack==='grab'){
   b.grabHand=null;b.grabFired=false;b.grabTarget={x:p.x+p.w/2,y:p.y+p.h/2};
   snd(300,.15);
  }else{
   b.waveReleased=false;snd(210,.12);
  }
 }
 for(const q of secondShots){q.age=(q.age||0)+1;q.x+=q.vx;q.y+=q.vy;if(overlap(esatHurtbox(),q)){q.x=-999;damage()}}
 secondShots=secondShots.filter(q=>q.x>SECOND_ARENA_LEFT-40&&q.x<SECOND_ARENA_RIGHT+40&&q.y>0&&q.y<FLOOR+30);
}

const W=640,H=360,FLOOR=305,LENGTH=23450,keys={left:false,right:false,jump:false,attack:false,down:false};let hopeAttackLockedUntil=0;let mode='menu',p,cam=0,frame=0,hp=3,carrots=0,score=0,inv=0,projectiles=[],bunnies=[],pickups=[],platforms=[],boss,enemyShots=[],checkpoint=false,bossIntro=0,laser=null,shockwaves=[],grab=null,particles=[],notice='',noticeT=0,muted=false,arenaWall=false,arenaCarrot=null,arenaCarrotRight=null,nextCarrotAt=0,arenaStartFrame=0,finale=null,finaleUsed=false,finaleSecondUsed=false,dialogueTimer=0,enrageSpeech=0,audio,last=0,jumpHeld=false,attackHeld=false;const status=document.getElementById('status');function r(x,y,w,h,c){g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))}function text(s,x,y,size=14,color='#fff2d8',align='left'){g.fillStyle=color;g.font=`bold ${size}px monospace`;g.textAlign=align;g.fillText(s,Math.round(x),Math.round(y));g.textAlign='left'}function snd(freq=440,dur=.07){if(muted)return;try{audio??=new(window.AudioContext||window.webkitAudioContext)();audio.resume();let o=audio.createOscillator(),a=audio.createGain();o.type='square';o.frequency.value=freq;a.gain.setValueAtTime(.035,audio.currentTime);a.gain.exponentialRampToValueAtTime(.001,audio.currentTime+dur);o.connect(a);a.connect(audio.destination);o.start();o.stop(audio.currentTime+dur)}catch(e){}}// Two-track soundtrack. Start from a real click (browser autoplay policy).
// Menu soundtrack: starts on the first user interaction (browser autoplay policy).
const jessicaMenuMusic=new Audio('assets/audio/jessica-start-music.mp3');
const alinaTitleMusic=new Audio('assets/audio/Malenia, Blade of Miquella.mp3');
alinaTitleMusic.loop=true;alinaTitleMusic.preload='auto';alinaTitleMusic.volume=.24;
function startAlinaTitleMusic(){
 if(mode!=='stormTitle'||muted||!alinaTitleMusic.paused)return;
 alinaTitleMusic.play().catch(err=>{if(err.name!=='NotAllowedError')console.warn('Alina-Startmusik:',err);});
}
jessicaMenuMusic.loop=true;jessicaMenuMusic.preload='auto';jessicaMenuMusic.volume=.10;
let jessicaMenuFadeId=0;
function fadeOutJessicaMenuMusic(){
 ++jessicaMenuFadeId;
 jessicaMenuMusic.pause();
 jessicaMenuMusic.currentTime=0;
 jessicaMenuMusic.volume=.10;
}
// Fade naturally over the final two seconds; do not abruptly restart the song.
// Main-menu music loops at a constant volume; no end-of-track fade.
jessicaMenuMusic.addEventListener('ended',()=>{jessicaMenuMusic.volume=.10;});
function startJessicaMenuMusic(){
 if(mode!=='menu'||muted||!jessicaMenuMusic.paused)return;
 ++jessicaMenuFadeId;
 jessicaMenuMusic.volume=.24;
 jessicaMenuMusic.muted=false;
 jessicaMenuMusic.play().catch(err=>{
  // Autoplay is browser-restricted until the first user interaction.
  if(err.name!=='NotAllowedError')console.warn('Startbildschirm-Musik:',err);
 });
}
// Try autoplay, then retry on the first interaction anywhere on the start screen.
startJessicaMenuMusic();
document.addEventListener('pointerdown',()=>{if(mode==='menu')startJessicaMenuMusic();else if(mode==='stormTitle')startAlinaTitleMusic();});
document.addEventListener('keydown',()=>{if(mode==='menu')startJessicaMenuMusic();else if(mode==='stormTitle')startAlinaTitleMusic();});
const levelMusic=new Audio('assets/audio/34395fc846db8351.mp3');
const bossMusic=new Audio('assets/audio/683ffb7eefb3e7ba.mp3');
const alinaAmbientMusic=new Audio('assets/audio/regen alina.mp3');
alinaAmbientMusic.preload='auto';
alinaAmbientMusic.loop=false;
alinaAmbientMusic.volume=.16;
function playAlinaAmbient(restart=false){
 if(restart){alinaAmbientMusic.pause();alinaAmbientMusic.currentTime=0;}
 alinaAmbientMusic.muted=muted;
 if(!muted&&alinaAmbientMusic.paused&&!alinaAmbientMusic.ended)alinaAmbientMusic.play().catch(err=>console.warn('Alina-Levelmusik:',err));
}
function stopAlinaAmbient(){
 alinaAmbientMusic.pause();alinaAmbientMusic.currentTime=0;alinaAmbientMusic.volume=.16;
}
const alinaFightMusic=new Audio('assets/audio/Alina Bosskampf.mp3');
alinaFightMusic.preload='auto';alinaFightMusic.loop=true;alinaFightMusic.volume=.12;
function startAlinaFightMusic(){
 alinaAmbientMusic.pause();levelMusic.pause();bossMusic.pause();alinaFightMusic.pause();alinaFightMusic.currentTime=0;
 alinaFightMusic.muted=muted;if(!muted)alinaFightMusic.play().catch(()=>{});
}
const sametBetrayalMusic=new Audio('assets/audio/Zetsus Theme.mp3');
sametBetrayalMusic.preload='auto';sametBetrayalMusic.loop=false;sametBetrayalMusic.volume=.12;
function startSametBetrayalMusic(){
 alinaAmbientMusic.volume=.095;
 sametBetrayalMusic.pause();sametBetrayalMusic.currentTime=0;
 // Stop EVERY existing music source, not just the two default tracks.
 for(const track of [levelMusic,bossMusic,jessicaMenuMusic,jessicaCrimsonMusic,
                      jessicaFarewellMusic,rhythmTrack,snickersFirstTrack]){
  track.pause();
 }
 sametBetrayalMusic.muted=muted;
 if(!muted)sametBetrayalMusic.play().catch(()=>{});
}
for(const track of [levelMusic,bossMusic]){track.loop=true;track.preload='auto';}
levelMusic.volume=.10;bossMusic.volume=.12;
let bossMusicWanted=false;
function playTrack(track){
 if(muted)return;
 track.muted=false;
 const promise=track.play();
 if(promise&&promise.then)promise.then(()=>{
   document.getElementById('status').textContent=(track===bossMusic?'🎵 Bossmusik: RPG Battle Music':'🎵 Levelmusik: RPG Kingdom Music');
 }).catch(e=>{
   document.getElementById('status').textContent='Audiofehler: '+e.name+' – TON AN klicken';
 });
}
function startLevelMusic(){
 if(mode==='storm'||mode==='stormTitle'){
  levelMusic.pause();bossMusic.pause();
  if(mode==='storm'&&storm&&storm.stage!=='fight'&&storm.stage!=='dying'&&storm.stage!=='won')playAlinaAmbient();
  return;
 }
 bossMusicWanted=false;bossMusic.pause();bossMusic.currentTime=0;if(mode==='jessica'&&jessicaLevel&&jessicaLevel.farewellStage!=='outside'){levelMusic.pause();return;}levelMusic.currentTime=0;playTrack(levelMusic);}
function startBossMusic(){bossMusicWanted=true;levelMusic.pause();bossMusic.currentTime=0;playTrack(bossMusic);}
function stopBossMusic(){bossMusicWanted=false;bossMusic.pause();bossMusic.currentTime=0;levelMusic.pause();}
function syncBossMusic(){
 // Alina has a separate soundtrack: never resume Jessica/Sarah's shared tracks.
 if(mode==='storm'||mode==='stormTitle'){
  for(const track of [levelMusic,bossMusic,jessicaMenuMusic,jessicaCrimsonMusic,
   jessicaFarewellMusic,rhythmTrack,snickersFirstTrack])track.pause();
  alinaAmbientMusic.muted=muted;
  alinaFightMusic.muted=muted;
  sametBetrayalMusic.muted=muted;
  if(mode==='storm'&&storm&&['dying','won'].includes(storm.stage)
    &&!muted&&alinaAmbientMusic.paused&&!alinaAmbientMusic.ended)playAlinaAmbient();
  return;
 }
 alinaAmbientMusic.muted=muted;
 if(mode==='storm'&&storm&&['dying','won'].includes(storm.stage)){
  if(!muted&&alinaAmbientMusic.paused&&!alinaAmbientMusic.ended)playAlinaAmbient();
 }
 jessicaFarewellMusic.muted=muted;
 if(mode==='pause'||mode==='jessicaPause')return;
 if(mode==='storm'&&storm&&['sametStole','sametThreat'].includes(storm.portalScene)){
  for(const track of [levelMusic,bossMusic,jessicaMenuMusic,jessicaCrimsonMusic,
                       jessicaFarewellMusic,rhythmTrack,snickersFirstTrack])track.pause();
  sametBetrayalMusic.muted=muted;
  if(muted)sametBetrayalMusic.pause();
  else if(sametBetrayalMusic.paused&&!sametBetrayalMusic.ended)sametBetrayalMusic.play().catch(()=>{});
  return;
 }
 if(jessicaFarewellActive){
  levelMusic.pause();bossMusic.pause();
  if(!muted&&jessicaFarewellMusic.paused&&!jessicaFarewellMusic.ended)jessicaFarewellMusic.play().catch(()=>{});
  return;
 }
 if(mode==='jessica'&&jessicaLevel&&jessicaLevel.farewellStage==='outside'){
  levelMusic.muted=muted;bossMusic.pause();
  if(!muted&&levelMusic.paused)playTrack(levelMusic);
  return;
 }
 if(finalPath.entered&&finalPath.doorTick>=55){levelMusic.pause();bossMusic.pause();return;}
 if(thirdBossPlaceholder&&['quake','blackout','ball','reveal','ready','rhythm'].includes(thirdBossPlaceholder.realmPhase)){levelMusic.pause();bossMusic.pause();return;}
 for(const track of [levelMusic,bossMusic])track.muted=muted;
 if(muted){levelMusic.pause();bossMusic.pause();return;}
 // Tutorial and the defeat conversation keep playing their respective music.
 // Boss introduction and enraged speech are intentionally silent.
 if(talk&&talk.musicPolicy==='silent'){levelMusic.pause();bossMusic.pause();return;}
 if(mode==='play'||mode==='cutscene'||mode==='postboss'||mode==='sametOutro'){
   const track=bossMusicWanted?bossMusic:levelMusic;
   const other=bossMusicWanted?levelMusic:bossMusic;
   other.pause();
   if(track.paused)playTrack(track);
 }
}
function say(s,t=90){notice=s;noticeT=t}
const sametSprite=new Image();sametSprite.src="assets/images/ef8a97d5713c6fc2.png";
const sametPortrait=new Image();sametPortrait.src='assets/images/4e5d4ace79e6e447.png';
let talk=null,tutorialDone=false;
let sametOutroDone=false,sametOutro=null;
const sametWisdom=[
 {speaker:'Samet',text:'Weißt du, was ich mit der Zeit gelernt habe? Nicht jeder Mensch, der in dein Leben kommt, ist dafür bestimmt, auch zu bleiben.'},
 {speaker:'Samet',text:'Manchmal kannst du alles richtig machen und trotzdem läuft es nicht so, wie du es dir vorgestellt hast.'},
 {speaker:'Samet',text:'Und weißt du, was das Wichtigste ist? Verlier niemals dich selbst, nur um jemanden in deinem Leben zu behalten.'},
 {speaker:'Samet',text:'Manche Menschen sind ein Kapitel in deinem Leben, aber nicht die ganze Geschichte.'},
 {speaker:'Samet',text:'Also Kopf hoch. Was wirklich zu dir gehört, musst du nicht mit aller Kraft festhalten.'},
 {speaker:'Samet',text:'Und jetzt geh deinen Weg. Deine Geschichte ist noch lange nicht zu Ende.'}
];
const tutorialLines=[
 {"speaker":"Samet","text":"Abi … du bist also tatsächlich hier gelandet."},
 {"speaker":"Esat","text":"Samet?! Was machst du hier? Wo bin ich überhaupt?"},
 {"speaker":"Samet","text":"Ich hatte gehofft, dass du diesen Ort niemals sehen musst."},
 {"speaker":"Esat","text":"Samet?!"},
 {"speaker":"Esat","text":"Was machst du hier? Und was zur Hölle ist das für ein Ort?"},
 {"speaker":"Samet","text":"Es gibt eine Theorie über unser Universum."},
 {"speaker":"Samet","text":"Dass jede Entscheidung, jede Möglichkeit und sogar jede Emotion eine eigene Wirklichkeit erzeugen kann."},
 {"speaker":"Samet","text":"Manche nennen es eine quantenverschränkte Raumzeit-Singularität."},
 {"speaker":"Samet","text":"Ein Zustand, in dem die Grenzen zwischen parallelen Realitäten instabil werden."},
 {"speaker":"Samet","text":"Und manchmal … reicht ein einziger emotionaler Zusammenbruch, um diese Grenze zu durchbrechen."},
 {"speaker":"Esat","text":"Ein emotionaler Zusammenbruch?"},
 {"speaker":"Esat","text":"Du meinst … Herzschmerz?"},
 {"speaker":"Samet","text":"Ja, Abi."},
 {"speaker":"Samet","text":"Nicht irgendeine Enttäuschung. Ich rede von einem Schmerz, der so tief sitzt …"},
 {"speaker":"Samet","text":"… dass du irgendwann nicht mehr weißt, wer du ohne diesen Menschen bist."},
 {"speaker":"Samet","text":"Wenn ein Mensch an diesem Punkt ankommt, kann sein Bewusstsein mit einer anderen Realität in Resonanz geraten."},
 {"speaker":"Samet","text":"Und genau das ist dir passiert."},
 {"speaker":"Samet","text":"Willkommen in einer Welt, die zwischen dem existiert, was wir verloren haben …"},
 {"speaker":"Samet","text":"… und dem, was wir uns am meisten wünschen."},
 {"speaker":"Esat","text":"Das ergibt doch alles keinen Sinn."},
 {"speaker":"Esat","text":"Und wenn das stimmt … warum bist du dann hier?"},
 {"speaker":"Samet","text":"Vielleicht erzähle ich dir das irgendwann."},
 {"speaker":"Samet","text":"Aber jetzt musst du etwas anderes wissen."},
 {"speaker":"Samet","text":"Diese Welt ist wunderschön, Abi. Sie birgt Geheimnisse, die in unserer Realität unmöglich wären."},
 {"speaker":"Samet","text":"Aber sie ist auch gefährlich."},
 {"speaker":"Samet","text":"Nicht alles, was dir hier begegnet, ist das, was es zu sein scheint."},
 {"speaker":"Esat","text":"Und wie komme ich wieder nach Hause?"},
 {"speaker":"Samet","text":"Es gibt eine alte Legende."},
 {"speaker":"Samet","text":"Irgendwo in diesem Universum soll ein Relikt verborgen sein."},
 {"speaker":"Samet","text":"Ein Relikt, dessen Macht selbst die Gesetze dieser Welt übersteigt."},
 {"speaker":"Samet","text":"Man sagt, seine Magie sei für jeden Menschen anders."},
 {"speaker":"Samet","text":"Es gibt Menschen, die darin unendliche Macht sehen. Andere suchen Reichtum, Frieden oder eine zweite Chance."},
 {"speaker":"Samet","text":"Aber das Relikt entscheidet nicht nach dem, was du verlangst."},
 {"speaker":"Samet","text":"Es erkennt, was dein Herz wirklich begehrt."},
 {"speaker":"Samet","text":"Und wenn die Legende stimmt … kann es dir genau das schenken."},
 {"speaker":"Esat","text":"Es kann einem wirklich jeden Wunsch erfüllen?"},
 {"speaker":"Samet","text":"Vielleicht."},
 {"speaker":"Samet","text":"Aber sag mir etwas, Abi."},
 {"speaker":"Samet","text":"Wenn du es finden würdest … was würdest du dir wünschen?"},
 {"speaker":"Esat","text":"Ich weiß nicht …"},
 {"speaker":"Esat","text":"Früher hätte ich dir wahrscheinlich hundert Dinge nennen können."},
 {"speaker":"Esat","text":"Geld. Erfolg. Ein Leben, in dem ich mir um nichts Sorgen machen muss."},
 {"speaker":"Esat","text":"Aber wenn ich wirklich darüber nachdenke …"},
 {"speaker":"Esat","text":"Dann ist es eigentlich nur eine Sache."},
 {"speaker":"Samet","text":"Und die wäre?"},
 {"speaker":"Esat","text":"Liebe."},
 {"speaker":"Esat","text":"Nicht irgendeine Liebe."},
 {"speaker":"Esat","text":"Ich will jemanden, bei dem ich nicht ständig Angst haben muss, irgendwann nicht mehr genug zu sein."},
 {"speaker":"Esat","text":"Jemanden, der bleibt. Auch wenn es schwierig wird."},
 {"speaker":"Esat","text":"Ich glaube … das ist alles, was ich mir wirklich wünsche."},
 {"speaker":"Samet","text":"…"},
 {"speaker":"Samet","text":"Dann hoffe ich, dass du findest, wonach du suchst, Abi."},
 {"speaker":"Samet","text":"Aber vergiss eines nicht."},
 {"speaker":"Samet","text":"Diese Welt kann dir zeigen, wonach du dich sehnst."},
 {"speaker":"Samet","text":"Das bedeutet nicht, dass alles, was sie dir anbietet, auch echt ist."},
 {"speaker":"Esat","text":"Ich muss es wenigstens versuchen."},
 {"speaker":"Esat","text":"Wenn dieses Relikt wirklich existiert, dann werde ich es finden."},
 {"speaker":"Samet","text":"Dann beginnt deine Reise hier."},
 {"speaker":"Samet","text":"Pass auf dich auf, Abi."},
 {"speaker":"Samet","text":"Und egal, was du auf deinem Weg siehst …"},
 {"speaker":"Samet","text":"Verlier dich nicht selbst bei dem Versuch, etwas zurückzubekommen, das du verloren hast."},
 {"speaker":"Esat","text":"Danke, Samet."},
 {"speaker":"Esat","text":"Wir sehen uns."},
 {"speaker":"Samet","text":"Das werden wir, Abi."},
 {"speaker":"Samet","text":"Früher, als du denkst."},
];
const jessicaFirstEncounter=[
 {"speaker":"?","text":"Esat …?","voiceOnly":true},
 {"speaker":"?","text":"Nein … das kann nicht sein. Was machst du hier?","voiceOnly":true},
 {"speaker":"Esat","text":"Moment mal …"},
 {"speaker":"Esat","text":"Diese Stimme … Jessi? Bist du das?"},
 {"speaker":"Jessica","text":"Du musst wieder gehen, Esat. Bitte.","voiceOnly":true},
 {"speaker":"Esat","text":"Jessi?! Ich fasse es nicht!"},
 {"speaker":"Esat","text":"Ich weiß nicht mal, wie ich hierhergekommen bin. Und jetzt höre ich plötzlich deine Stimme!"},
 {"speaker":"Esat","text":"Wo bist du? Ich will dich sehen."},
 {"speaker":"Jessica","text":"Nein. Das geht nicht.","voiceOnly":true},
 {"speaker":"Jessica","text":"Du verstehst nicht, was dieser Ort für mich bedeutet.","voiceOnly":true},
 {"speaker":"Esat","text":"Dann erklär es mir!"},
 {"speaker":"Esat","text":"Samet hat mir erzählt, dass Menschen durch großen Herzschmerz hier landen."},
 {"speaker":"Esat","text":"Jessi … was ist dir passiert?"},
 {"speaker":"Jessica","text":"…","voiceOnly":true},
 {"speaker":"Jessica","text":"Ich habe etwas wiedergefunden, von dem ich dachte, dass ich es für immer verloren hätte.","voiceOnly":true},
 {"speaker":"Jessica","text":"Und ich werde es nicht noch einmal verlieren.","voiceOnly":true},
 {"speaker":"Esat","text":"Was meinst du damit? Was hast du wiedergefunden?"},
 {"speaker":"Jessica","text":"Bitte frag nicht weiter.","voiceOnly":true},
 {"speaker":"Jessica","text":"Ich habe hier endlich wieder einen Grund, morgens aufzuwachen und glücklich zu sein.","voiceOnly":true},
 {"speaker":"Jessica","text":"Du kannst nicht verstehen, wie viel mir das bedeutet.","voiceOnly":true},
 {"speaker":"Esat","text":"Vielleicht nicht. Aber ich kenne dich, Jessi."},
 {"speaker":"Esat","text":"Und ich höre doch, dass etwas nicht stimmt."},
 {"speaker":"Jessica","text":"Gerade weil du mich kennst, darfst du nicht näherkommen.","voiceOnly":true},
 {"speaker":"Jessica","text":"Du erinnerst mich an ein Leben, das ich hinter mir lassen wollte.","voiceOnly":true},
 {"speaker":"Esat","text":"Aber ich bin doch nicht irgendein Fremder!"},
 {"speaker":"Esat","text":"Wir waren uns so nah. Willst du wirklich, dass ich einfach verschwinde?"},
 {"speaker":"Jessica","text":"Glaubst du, mir fällt das leicht?","voiceOnly":true},
 {"speaker":"Jessica","text":"Du weißt gar nicht, wie oft ich an dich gedacht habe.","voiceOnly":true},
 {"speaker":"Jessica","text":"Aber manche Dinge kann ich nicht noch einmal durchmachen, Esat.","voiceOnly":true},
 {"speaker":"Jessica","text":"Nicht einmal für dich.","voiceOnly":true},
 {"speaker":"Esat","text":"Dann lass mich wenigstens mit dir reden. Von Angesicht zu Angesicht."},
 {"speaker":"Esat","text":"Ich werde nicht einfach gehen, solange ich nicht weiß, ob es dir wirklich gut geht."},
 {"speaker":"Jessica","text":"Du warst schon immer so stur …","voiceOnly":true},
 {"speaker":"Jessica","text":"Esat, bitte.","voiceOnly":true},
 {"speaker":"Jessica","text":"Wenn dir jemals etwas an mir gelegen hat, dann lass mich hier glücklich sein.","voiceOnly":true},
 {"speaker":"Jessica","text":"Und such nicht nach mir.","voiceOnly":true},
 {"speaker":"Esat","text":"Jessi …?"},
 {"speaker":"Esat","text":"Verdammt."},
 {"speaker":"Esat","text":"Was auch immer hier passiert ist … ich werde es herausfinden."},
];
const jessicaGuardWarning=[
 {"speaker":"Jessica","text":"Du bist immer noch hier …","voiceOnly":true},
 {"speaker":"Jessica","text":"Ich habe dich um eine einzige Sache gebeten, Esat. Warum kannst du nicht einfach umkehren?","voiceOnly":true},
 {"speaker":"Esat","text":"Weil ich dich nicht einfach hier zurücklassen werde, Jessi."},
 {"speaker":"Esat","text":"Du hast mir noch immer nicht gesagt, was hier eigentlich los ist."},
 {"speaker":"Jessica","text":"Weil du es nicht verstehen würdest.","voiceOnly":true},
 {"speaker":"Jessica","text":"Du hast keine Ahnung, wie es sich anfühlt, alles zu verlieren, was einem die Welt bedeutet.","voiceOnly":true},
 {"speaker":"Esat","text":"Du glaubst, ich weiß nicht, wie sich Verlust anfühlt?"},
 {"speaker":"Esat","text":"Jessi, ich bin aus genau demselben Grund hier gelandet wie du!"},
 {"speaker":"Esat","text":"Weil ich etwas verloren habe, das mir unglaublich wichtig war."},
 {"speaker":"Jessica","text":"Dann solltest du mich doch verstehen können!","voiceOnly":true},
 {"speaker":"Jessica","text":"Stell dir vor, Esat … du bekommst eines Tages alles zurück, was dir genommen wurde.","voiceOnly":true},
 {"speaker":"Jessica","text":"Du kannst wieder lachen. Wieder glücklich sein.","voiceOnly":true},
 {"speaker":"Jessica","text":"Und plötzlich steht jemand vor dir, der dich daran erinnert, dass du das alles eigentlich längst verloren hast.","voiceOnly":true},
 {"speaker":"Esat","text":"Aber ich will dir doch nichts wegnehmen!"},
 {"speaker":"Esat","text":"Ich will nur wissen, was mit dir passiert ist."},
 {"speaker":"Jessica","text":"Ich weiß.","voiceOnly":true},
 {"speaker":"Jessica","text":"Und genau das macht es so schwer.","voiceOnly":true},
 {"speaker":"Jessica","text":"Du warst mir einmal so unglaublich nah, Esat.","voiceOnly":true},
 {"speaker":"Jessica","text":"Vielleicht näher, als du jemals verstanden hast.","voiceOnly":true},
 {"speaker":"Esat","text":"Dann verstehe ich erst recht nicht, warum du dich vor mir versteckst."},
 {"speaker":"Esat","text":"Jessi … ich habe dich vermisst."},
 {"speaker":"Jessica","text":"…","voiceOnly":true},
 {"speaker":"Jessica","text":"Ich dich auch.","voiceOnly":true},
 {"speaker":"Jessica","text":"Mehr, als ich zugeben möchte.","voiceOnly":true},
 {"speaker":"Esat","text":"Dann lass uns doch miteinander reden. Bitte."},
 {"speaker":"Esat","text":"Wir müssen uns nicht gegenseitig verlieren."},
 {"speaker":"Jessica","text":"Du verstehst es immer noch nicht.","voiceOnly":true},
 {"speaker":"Jessica","text":"Ich habe hier endlich Frieden gefunden.","voiceOnly":true},
 {"speaker":"Jessica","text":"Zum ersten Mal seit langer Zeit habe ich keine Angst mehr, morgens aufzuwachen und festzustellen, dass jemand fehlt.","voiceOnly":true},
 {"speaker":"Jessica","text":"Und wenn du zu mir kommst … habe ich Angst, dass dieser Frieden für immer verschwindet.","voiceOnly":true},
 {"speaker":"Esat","text":"Jessi, wenn du wirklich glücklich bist, dann werde ich dir das nicht nehmen."},
 {"speaker":"Esat","text":"Aber ich muss dich wenigstens einmal sehen."},
 {"speaker":"Jessica","text":"Esat … bitte zwing mich nicht dazu.","voiceOnly":true},
 {"speaker":"Jessica","text":"Ich wollte niemals, dass es so weit kommt.","voiceOnly":true},
 {"speaker":"Esat","text":"Wozu?"},
 {"speaker":"Esat","text":"Jessi, was hast du vor?"},
 {"speaker":"Jessica","text":"Verzeih mir.","voiceOnly":true},
 {"speaker":"Jessica","text":"Ich kann dich nicht zu mir lassen.","voiceOnly":true},
 {"speaker":"Jessica","text":"Nicht, wenn ich dafür riskiere, alles noch einmal zu verlieren.","voiceOnly":true},
 {"speaker":"Jessica","text":"Wächter …","voiceOnly":true},
 {"speaker":"Jessica","text":"Bringt ihn zurück zum Eingang.","voiceOnly":true},
 {"speaker":"Jessica","text":"Und bitte … tut ihm nicht weh.","voiceOnly":true},
 {"speaker":"Esat","text":"Jessi?!"},
 {"speaker":"Esat","text":"Du schickst deine eigenen Wächter gegen mich?"},
 {"speaker":"Jessica","text":"Es tut mir leid, Esat.","voiceOnly":true},
 {"speaker":"Jessica","text":"Aber ich kann nicht noch einmal alles verlieren.","voiceOnly":true},
];
const jessicaAfterHopeLines=[
 {speaker:'Jessica',voiceOnly:true,text:'Nein …'},
 {speaker:'Jessica',voiceOnly:true,text:'Nein, nein, nein … bitte nicht …'},
 {speaker:'Jessica',voiceOnly:true,text:'WAS HAST DU GETAN?!'},
 {speaker:'Esat',text:'Jessi?! Was ist denn los?!'},
 {speaker:'Jessica',voiceOnly:true,text:'Du hast ihn umgebracht!'},
 {speaker:'Jessica',voiceOnly:true,text:'Ich habe dich angefleht, umzukehren!'},
 {speaker:'Jessica',voiceOnly:true,text:'Warum hast du nicht auf mich gehört?!'},
 {speaker:'Esat',text:'Er wollte mich töten, Jessi!'},
 {speaker:'Esat',text:'Was hätte ich denn machen sollen? Einfach stehen bleiben und mich umbringen lassen?!'},
 {speaker:'Jessica',voiceOnly:true,text:'Ich habe ihn schon einmal verloren …'},
 {speaker:'Jessica',voiceOnly:true,text:'Damals konnte ich nichts dagegen tun.'},
 {speaker:'Jessica',voiceOnly:true,text:'Und jetzt muss ich ihn schon wieder so sehen …'},
 {speaker:'Esat',text:'Schon einmal verloren?'},
 {speaker:'Esat',text:'Jessi, wovon redest du? Wer war er wirklich?'},
 {speaker:'Jessica',voiceOnly:true,text:'Jemand, den ich mehr geliebt habe, als du dir vorstellen kannst.'},
 {speaker:'Jessica',voiceOnly:true,text:'Jemand, den mir diese Welt zurückgegeben hat.'},
 {speaker:'Jessica',voiceOnly:true,text:'Und den du mir gerade wieder genommen hast.'},
 {speaker:'Esat',text:'Es tut mir leid …'},
 {speaker:'Esat',text:'Aber warum hast du ihn dann gegen mich kämpfen lassen?'},
 {speaker:'Esat',text:'Du wusstest doch, dass einer von uns verletzt werden könnte!'},
 {speaker:'Jessica',voiceOnly:true,text:'Ich wollte nur, dass er dich aufhält!'},
 {speaker:'Jessica',voiceOnly:true,text:'Ich wollte nicht, dass jemand stirbt!'},
 {speaker:'Jessica',voiceOnly:true,text:'Ich dachte … ich dachte, er wäre stark genug …'},
 {speaker:'Esat',text:'Jessi, hör mir zu.'},
 {speaker:'Esat',text:'Ich bin nicht hier, um dir etwas wegzunehmen.'},
 {speaker:'Esat',text:'Ich will nur verstehen, was mit dir passiert ist.'},
 {speaker:'Jessica',voiceOnly:true,text:'…'},
 {speaker:'Jessica',voiceOnly:true,text:'Ich kann ihn zurückholen.'},
 {speaker:'Jessica',voiceOnly:true,text:'Ja … ich kann es noch einmal tun.'},
 {speaker:'Esat',text:'Was?'},
 {speaker:'Esat',text:'Wie meinst du das, zurückholen?'},
 {speaker:'Jessica',voiceOnly:true,text:'Hier muss niemand für immer fort sein.'},
 {speaker:'Jessica',voiceOnly:true,text:'Nicht, solange ich noch die Kraft habe, sie zurückzubringen.'},
 {speaker:'Jessica',voiceOnly:true,text:'Aber jedes Mal wird es schwerer …'},
 {speaker:'Esat',text:'Jessi …'},
 {speaker:'Esat',text:'Was auch immer du hier tust, es klingt nicht so, als würde es dir guttun.'},
 {speaker:'Esat',text:'Bitte, lass mich zu dir kommen. Wir können gemeinsam einen Ausweg finden.'},
 {speaker:'Jessica',voiceOnly:true,text:'Sag mir eines, Esat …'},
 {speaker:'Jessica',voiceOnly:true,text:'Du bist doch selbst hier, weil dir etwas fehlt, oder?'},
 {speaker:'Jessica',voiceOnly:true,text:'Du suchst nach Liebe. Nach etwas, das dich endlich glücklich macht.'},
 {speaker:'Jessica',voiceOnly:true,text:'Und ich habe mein Glück hier bereits gefunden.'},
 {speaker:'Jessica',voiceOnly:true,text:'Warum verlangst du von mir, es aufzugeben?'},
 {speaker:'Esat',text:'Weil ich nicht glaube, dass du wirklich glücklich bist, Jessi.'},
 {speaker:'Esat',text:'Nicht, wenn du so viel Angst davor hast, wieder alles zu verlieren.'},
 {speaker:'Jessica',voiceOnly:true,text:'Vielleicht habe ich Angst …'},
 {speaker:'Jessica',voiceOnly:true,text:'Aber weißt du, wie es sich anfühlt, jemanden zurückzubekommen, den man für immer verloren glaubte?'},
 {speaker:'Jessica',voiceOnly:true,text:'Ihn wiederzusehen? Wieder bei sich zu haben?'},
 {speaker:'Jessica',voiceOnly:true,text:'Ich kann das nicht noch einmal aufgeben, Esat.'},
 {speaker:'Esat',text:'Ich will dir dein Glück nicht wegnehmen.'},
 {speaker:'Esat',text:'Aber ich mache mir Sorgen um dich.'},
 {speaker:'Esat',text:'Du warst mir schon immer wichtig, Jessi. Das weißt du doch.'},
 {speaker:'Jessica',voiceOnly:true,text:'Ja … das weiß ich.'},
 {speaker:'Jessica',voiceOnly:true,text:'Und vielleicht ist genau das der Grund, warum es mir so schwerfällt, dich wegzuschicken.'},
 {speaker:'Jessica',voiceOnly:true,text:'Aber ich habe mir dieses Leben nicht ohne Grund aufgebaut.'},
 {speaker:'Jessica',voiceOnly:true,text:'Hier habe ich endlich wieder das, was mir die echte Welt genommen hat.'},
 {speaker:'Esat',text:'Dann lass mich wenigstens mit dir reden.'},
 {speaker:'Esat',text:'Nicht über irgendwelche Stimmen oder Wächter.'},
 {speaker:'Esat',text:'Ich will dich sehen, Jessi. Dich persönlich.'},
 {speaker:'Jessica',voiceOnly:true,text:'…'},
 {speaker:'Jessica',voiceOnly:true,text:'Ich weiß nicht, ob ich das kann.'},
 {speaker:'Jessica',voiceOnly:true,text:'Wenn du vor mir stehst, werde ich mich an alles erinnern, was ich hinter mir lassen wollte.'},
 {speaker:'Esat',text:'Vielleicht müssen wir uns irgendwann genau diesen Erinnerungen stellen.'},
 {speaker:'Esat',text:'Aber du musst das nicht alleine tun.'},
 {speaker:'Jessica',voiceOnly:true,text:'Du warst schon immer so stur …'},
 {speaker:'Jessica',voiceOnly:true,text:'…'},
 {speaker:'Jessica',voiceOnly:true,text:'Ich muss jetzt zu ihm.'},
 {speaker:'Jessica',voiceOnly:true,text:'Bitte … tu keinem der anderen etwas.'},
 {speaker:'Jessica',voiceOnly:true,text:'Ich kann nicht noch mehr verlieren.'}
];
const hopeIntroLines=[
 {speaker:'Hope',text:'Du bist also der Eindringling, der es gewagt hat, sich unserer Königin zu widersetzen.'},
 {speaker:'Hope',text:'Ich bin Hope, der mächtigste Diener unserer Königin. Und ich schwöre dir: Du wirst niemals an mir vorbeikommen!'},
 {speaker:'Hope',text:'Ich werde dich vernichten. Ich werde dich mit meiner eigenen Hand packen und zerquetschen ...'},
 {speaker:'Hope',text:'... bis auch der letzte Tropfen Blut aus deinem Körper gepresst ist! Hier endet dein Weg!'}
];
const hopeDefeatLines=[
 {speaker:'Hope',text:'Ich habe mein ganzes Leben damit verbracht, stärker zu werden … nur um in dem einen Moment zu versagen, in dem es wirklich darauf ankam.'},
 {speaker:'Hope',text:'Ich nannte mich ihren mächtigsten Diener. Doch als sie mich brauchte, war meine Stärke nichts wert.'},
 {speaker:'Hope',text:'Nicht meine Niederlage schmerzt mich am meisten … sondern der Gedanke, dass ich ihr Vertrauen enttäuscht habe.'},
 {speaker:'Hope',text:'Meine Königin … ich wollte doch nur, dass Ihr einmal stolz auf mich seid …'}
];
function beginTalk(lines,finish,musicPolicy='silent'){
 // All dialogue after Winston's final hit keeps the level track uninterrupted.
 if(winstonFarewell&&!(finalPath.entered&&finalPath.doorTick>=55))musicPolicy='continue';
 talk={lines,index:0,finish,musicPolicy};
 p.vx=0;keys.left=false;keys.right=false;keys.jump=false;keys.attack=false;
 if(musicPolicy==='silent'){levelMusic.pause();bossMusic.pause();}
 else syncBossMusic();
}
// Keep gravity and platform collisions active during dialogue and scripted scenes.
// Horizontal movement and attacks remain locked.
function settleEsatDuringScene(){
 if(!p||!platforms)return;
 p.vx=0;
 if(p.on&&p.vy===0)return;
 const previousBottom=p.y+p.h;
 p.vy=Math.min(10,p.vy+.5);
 p.y+=p.vy;
 p.on=false;
 if(p.vy>=0){
  let landing=null;
  for(const pl of platforms){
   if(p.x+p.w>pl.x&&p.x<pl.x+pl.w&&previousBottom<=pl.y+5&&p.y+p.h>=pl.y){
    if(landing===null||pl.y<landing)landing=pl.y;
   }
  }
  if(landing!==null){p.y=landing-p.h;p.vy=0;p.on=true;}
 }
 if(p.y>H){p.y=FLOOR-p.h;p.vy=0;p.on=true;}
}
function nextTalk(){if(!talk)return;talk.index++;if(talk.index>=talk.lines.length){const cb=talk.finish;talk=null;jumpHeld=true;attackHeld=true;keys.jump=false;keys.attack=false;if(cb)cb();else syncBossMusic();}}
function wrapText(str,max){const words=str.split(' '),out=[];let line='';for(const word of words){if((line+' '+word).trim().length>max){if(line)out.push(line);line=word;}else line=(line+' '+word).trim();}if(line)out.push(line);return out;}
const esatDialoguePortrait=new Image();esatDialoguePortrait.src='assets/images/f8ee5037069ffebe.png';
const hopeDialoguePortrait=new Image();hopeDialoguePortrait.src='assets/images/50bc5f019bbcb04b.png';
const jessicaDialoguePortrait=new Image();jessicaDialoguePortrait.src='assets/images/a98d9652f0c2ab00.png';
const snickersDialoguePortrait=new Image();snickersDialoguePortrait.src="assets/images/fc016b83c29bdc1c.png";
const winstonDialoguePortrait=new Image();winstonDialoguePortrait.src='assets/images/ec47559d8fc7e819.png';
const peachDialoguePortrait=new Image();peachDialoguePortrait.src='assets/images/ea43c8a95db859cc.png';
const alinaDialoguePortrait=new Image();alinaDialoguePortrait.src='assets/images/alina_dialogportrait.png';
const alinaArtifactPortrait=new Image();alinaArtifactPortrait.src='assets/images/alina_artefakt_portrait.png';
const azureMagicPortrait=new Image();azureMagicPortrait.src='assets/images/azurblaue_magie_portrait.png';
function drawTalk(){if(!talk)return;const item=talk.lines[talk.index];g.save();
 const finalJessicaDialogue=(mode==='jessica'||mode==='jessicaPause')&&jessicaLevel&&jessicaLevel.throneSceneStarted&&jessicaLevel.farewellStage===null;
 const dy=(finalJessicaDialogue||(item.speaker==='Hope'&&secondBoss&&!secondBoss.dying&&!secondBoss.defeated))?0:-231;g.translate(0,dy);
 r(12,251,616,98,'#1b1128');g.strokeStyle='#f0ad72';g.lineWidth=3;g.strokeRect(12,251,616,98);
 r(18,257,76,84,'#3b263d');g.strokeStyle='#a77453';g.strokeRect(18,257,76,84);
 if(item.speaker==='Samet'&&sametPortrait.complete&&sametPortrait.naturalWidth){g.drawImage(sametPortrait,21,258,70,83)}
 else if(item.speaker==='Esat'&&esatDialoguePortrait.complete&&esatDialoguePortrait.naturalWidth){g.drawImage(esatDialoguePortrait,21,258,70,83)}
 else if(item.speaker==='Alina'&&alinaDialoguePortrait.complete&&alinaDialoguePortrait.naturalWidth){g.drawImage(alinaDialoguePortrait,21,258,70,83)}
 else if(item.speaker==='Relikt des Schicksals'&&alinaArtifactPortrait.complete&&alinaArtifactPortrait.naturalWidth){g.drawImage(alinaArtifactPortrait,21,258,70,83)}
 else if(item.speaker==='Alte Schatztruhe'&&azureMagicPortrait.complete&&azureMagicPortrait.naturalWidth){g.drawImage(azureMagicPortrait,21,258,70,83)}
 else if(item.speaker==='SNICKERS'&&snickersDialoguePortrait.complete&&snickersDialoguePortrait.naturalWidth){g.drawImage(snickersDialoguePortrait,21,258,70,83)}
 else if(item.speaker==='Jessica'&&!item.voiceOnly&&jessicaDialoguePortrait.complete&&jessicaDialoguePortrait.naturalWidth){g.drawImage(jessicaDialoguePortrait,21,258,70,83)}
 else if(item.speaker==='Winston'&&winstonDialoguePortrait.complete&&winstonDialoguePortrait.naturalWidth){g.drawImage(winstonDialoguePortrait,21,258,70,83)}
 else if(item.speaker==='Peach'&&peachDialoguePortrait.complete&&peachDialoguePortrait.naturalWidth){g.drawImage(peachDialoguePortrait,21,258,70,83)}
 if(item.voiceOnly&&item.speaker!=='?'){r(21,258,70,83,'#21152d');text('?',56,315,43,'#f7c0e9','center');}
 if(item.speaker==='?'||item.speaker==='Honey'||item.speaker==='Hope'){
  r(21,258,70,83,'#21152d');
  if(item.speaker==='Hope'&&hopeDialoguePortrait.complete&&hopeDialoguePortrait.naturalWidth)g.drawImage(hopeDialoguePortrait,21,258,70,83);
  else if(item.speaker==='Honey'&&honeyArtReady())g.drawImage(honeyRedesignSheet,110,72,123,130,21,258,70,83);
  else if(item.speaker==='Honey'&&hofnarrFrames.portrait.complete&&hofnarrFrames.portrait.naturalWidth)g.drawImage(hofnarrFrames.portrait,21,258,70,83);
  else text(item.speaker==='Hope'?'H':'?',56,315,43,'#f7c0e9','center');
 }
 const dialogueTitles={honey:'Chaosclown Honey',hope:'Eisenkrieger Hope',snickers:'DJ Snickers',winston:'Wächter Winston',peach:'Prinzessin Peach'};
 const speakerName=dialogueTitles[String(item.speaker).toLowerCase()]||item.speaker;
 const titleWidth=speakerName.length>19?215:speakerName.length>14?190:135;
 r(104,241,titleWidth,24,'#53334c');g.strokeStyle='#f0ad72';g.strokeRect(104,241,titleWidth,24);
 text(speakerName.toUpperCase(),104+titleWidth/2,258,speakerName.length>19?12:14,'#fff2db','center');
 const lines=wrapText(item.text,66);lines.slice(0,4).forEach((line,i)=>text(line,108,282+i*16,12,'#fff5ee'));
 text('LEERTASTE / ENTER  ▶',469,339,11,'#ffdb9c');g.restore();}

let infiniteAmmo=false,goldenCarrot=null,honeyCameraRelease=null;
function dropHoneyReward(){
 if(!infiniteAmmo&&!goldenCarrot)goldenCarrot={x:boss.x+5,y:FLOOR-25,w:28,h:25};
 arenaCarrot=arenaCarrotRight=null;
}
function collectHoneyReward(){
 if(infiniteAmmo||!goldenCarrot||mode!=='postboss'||talk||!overlap(p,goldenCarrot))return false;
 infiniteAmmo=true;goldenCarrot=null;
 for(const item of pickups)item.taken=true;
 arenaCarrot=arenaCarrotRight=null;
 snd(920,.25);say('GOLDENE MÖHRE · UNENDLICHE MUNITION!',480);
 status.textContent='Goldene Möhre erhalten: Esat hat ab jetzt unendlich Munition!';
 beginTalk([{speaker:'Esat',text:'Eine goldene Möhre ... Ab jetzt habe ich unendlich Munition!'}],()=>{syncBossMusic();},'continue');
 return true;
}
function drawHoneyReward(){
 if(!goldenCarrot||infiniteAmmo)return;
 const x=goldenCarrot.x,y=goldenCarrot.y;
 g.save();g.shadowColor='#ffce45';g.shadowBlur=13;
 r(x+10,y,3,7,'#fff0a3');r(x+5,y+2,5,4,'#ffe27a');r(x+14,y+1,5,5,'#f0bc38');
 r(x+4,y+7,19,7,'#ffd35c');r(x+7,y+14,13,5,'#efae29');r(x+10,y+19,7,4,'#e89820');r(x+12,y+23,3,2,'#ffe6a0');
 r(x+7,y+8,3,7,'#fff3bb');g.shadowBlur=0;
 for(let i=0;i<4;i++){const a=frame*.045+i*Math.PI/2;r(x+13+Math.cos(a)*22,y+12+Math.sin(a)*16,2,2,'#ffeab2');}
 g.restore();
}
function releaseHoneyCamera(target){
 const c=honeyCameraRelease;if(!c)return target;
 if(arenaWall||honeyCameraLocked||secondBossWall||hopeCameraLocked||winstonPeachGateActive){honeyCameraRelease=null;return target;}
 const steps=Math.max(0,Math.min(5,frame-c.frame));c.frame=frame;
 c.x+=(target-c.x)*(1-Math.pow(.94,steps));
 if(Math.abs(target-c.x)<.4){honeyCameraRelease=null;return target;}
 return c.x;
}

let honeyGateIntro=0,hopeGateIntro=0,honeyCameraLocked=false,hopeCameraLocked=false;
// V124: The next boss is intentionally a placeholder; its artwork and real mechanics come later.
const THIRD_ARENA_LEFT=5900, THIRD_ARENA_RIGHT=6520;

const FINAL_PATH_START=8640,FINAL_QUEEN_X=8840,FINAL_DOOR_X=10520,FINAL_PATH_END=10740;
let finalPath={queenSpoken:false,queenFinished:false,doorTick:0,entered:false};
const finalQueenLines=[
 {speaker:'Jessica',voiceOnly:true,text:'Winston …'},
 {speaker:'Jessica',voiceOnly:true,text:'Nein … bitte nicht auch noch Winston …'},
 {speaker:'Esat',text:'Jessi, es tut mir leid …'},
 {speaker:'Jessica',voiceOnly:true,text:'HÖR AUF!'},
 {speaker:'Jessica',voiceOnly:true,text:'Hör endlich auf, mir zu sagen, dass es dir leidtut!'},
 {speaker:'Jessica',voiceOnly:true,text:'Honey, Hope, Snickers … und jetzt Winston!'},
 {speaker:'Jessica',voiceOnly:true,text:'Du hast sie mir alle genommen!'},
 {speaker:'Esat',text:'Sie haben mich angegriffen! Was hätte ich denn tun sollen?!'},
 {speaker:'Jessica',voiceOnly:true,text:'DU HÄTTEST EINFACH GEHEN SOLLEN!'},
 {speaker:'Jessica',voiceOnly:true,text:'Ich habe dich so oft darum gebeten!'},
 {speaker:'Jessica',voiceOnly:true,text:'Aber du musstest ja unbedingt weitermachen!'},
 {speaker:'Esat',text:'Winston hat vor seinem Tod noch etwas gesagt.'},
 {speaker:'Jessica',voiceOnly:true,text:'Ich will nichts mehr hören!'},
 {speaker:'Esat',text:'Er wollte nicht, dass du ihn wiederbelebst.'},
 {speaker:'Jessica',voiceOnly:true,text:'… Was?'},
 {speaker:'Esat',text:'Er wusste, dass du mit jeder Wiederbelebung schwächer wirst.'},
 {speaker:'Esat',text:'Er wollte nicht, dass du dich für ihn opferst.'},
 {speaker:'Jessica',voiceOnly:true,text:'…'},
 {speaker:'Jessica',voiceOnly:true,text:'Und du glaubst, das macht irgendetwas besser?'},
 {speaker:'Jessica',voiceOnly:true,text:'Du tötest meine Familie und erzählst mir anschließend, was das Beste für mich sein soll?!'},
 {speaker:'Esat',text:'Nein, Jessi. Ich weiß, dass ich das nicht wiedergutmachen kann.'},
 {speaker:'Jessica',voiceOnly:true,text:'Dann verschwinde endlich …'},
 {speaker:'Jessica',voiceOnly:true,text:'Bitte, Esat …'},
 {speaker:'Jessica',voiceOnly:true,text:'Ich kann dich gerade nicht sehen.'},
 {speaker:'Esat',text:'Ich werde dich nicht einfach hier zurücklassen.'},
 {speaker:'Jessica',voiceOnly:true,text:'Dann tu, was du nicht lassen kannst.'},
 {speaker:'Jessica',voiceOnly:true,text:'Aber erwarte nicht, dass ich dir jemals verzeihe.'}
];
function finalPathActive(){return !!winstonFarewell&&winstonFarewell.stage==='done';}
function tryFinalDoor(){
 if(!finalPathActive()||!finalPath.queenFinished||talk||finalPath.entered||Math.abs(p.x+p.w/2-FINAL_DOOR_X)>62||!p.on)return false;
 finalPath.entered=true;finalPath.doorTick=0;
 p.vx=0;keys.left=keys.right=keys.jump=keys.attack=false;
 mouseShootHeld=keyboardShootHeld=false;
 snd(160,.25);
 status.textContent='Esat tritt durch die Tür ...';
 return true;
}
function updateFinalPath(){
 if(!finalPathActive())return false;
 if(finalPath.entered){
  frame++;finalPath.doorTick=Math.min(90,finalPath.doorTick+1);
  p.vx=0;
  if(finalPath.doorTick===55){levelMusic.pause();bossMusic.pause();}
  if(finalPath.doorTick<55)p.x+=(FINAL_DOOR_X-p.w/2-p.x)*.08;
  if(finalPath.doorTick===90)enterJessicaLevel();
  return true;
 }
 p.x=Math.min(p.x,FINAL_PATH_END-p.w);
 if(!finalPath.queenSpoken&&p.x>=FINAL_QUEEN_X&&!talk){
  finalPath.queenSpoken=true;
  beginTalk(finalQueenLines,()=>{finalPath.queenFinished=true;syncBossMusic();});
  return true;
 }
 return false;
}
function drawFallenRabbitHead(x,y,dir=1){
 g.save();g.translate(x,y);if(dir<0)g.scale(-1,1);
 // Intact stylized head with clearly crossed-out eyes; no exposed wounds.
 r(-9,-10,18,14,'#d7cadc');r(-12,-7,24,8,'#c5b6ce');
 r(-8,-21,5,13,'#cdbdd5');r(3,-19,5,11,'#cdbdd5');
 r(-7,-18,2,8,'#987c9c');r(4,-16,2,6,'#987c9c');
 for(const ex of [-5,4]){
  r(ex-2,-7,2,2,'#342333');r(ex+2,-7,2,2,'#342333');
  r(ex,-5,2,2,'#342333');
  r(ex-2,-3,2,2,'#342333');r(ex+2,-3,2,2,'#342333');
 }
 r(-1,0,3,2,'#775269');
 g.restore();
}
function drawFinalPath(){
 if(!finalPathActive())return;
 const left=Math.max(FINAL_PATH_START,Math.floor(cam/32)*32),right=Math.min(FINAL_PATH_END+W,cam+W+40);
 // Ground remains solid; only its appearance withers.
 for(let x=left;x<right;x+=32){
  const decay=Math.min(1,(x-FINAL_PATH_START)/900);
  r(x,FLOOR,32,55,decay>.55?'#211c29':'#403342');
  r(x,FLOOR,32,5,decay>.55?'#463b4c':'#706052');
  r(x+5,FLOOR-5,2,7,'#3e3445');r(x+14,FLOOR-3,3,5,'#322c39');
  r(x+8,FLOOR+12,16,2,'#120f1c');r(x+19,FLOOR+14,2,12,'#120f1c');
  if(x%96===0){r(x+3,FLOOR+33,9,3,'#64405f');r(x+17,FLOOR+39,12,2,'#392239');}
 }
 // Fallen rabbits and impaled heads alternate along the ruined path.
 for(let i=0;i<15;i++){
  const x=8740+i*114+(i%3)*17;if(x<cam-70||x>cam+W+70)continue;
  if(i%3===1){
   r(x-2,FLOOR-77,4,79,'#655049');r(x,FLOOR-77,1,77,'#9a7a60');
   r(x-4,FLOOR-82,8,7,'#98929d');r(x-2,FLOOR-88,4,6,'#b6b0ba');
   drawFallenRabbitHead(x,FLOOR-72,i%2?-1:1);
  }else{
   g.save();g.translate(x,FLOOR);if(i%2)g.scale(-1,1);
   // The body rests on its side, with paws lying flat on the soil.
   r(-19,-12,28,10,'#aaa2b0');r(-23,-9,7,6,'#cec2d0');
   r(-16,-15,18,8,'#d9cbdc');r(-11,-4,19,4,'#aaa0b1');
   r(-20,-4,10,4,'#bfb0c5');
   drawFallenRabbitHead(12,-7,1);g.restore();
  }
 }
 // An isolated door marks the end of the current route.
 const dx=FINAL_DOOR_X-34,dy=FLOOR-101;
 r(dx-10,dy-10,88,111,'#211a2c');r(dx-5,dy-5,78,106,'#62516a');
 r(dx,dy,68,101,'#170f21');r(dx+5,dy+5,58,96,'#3f2942');
 for(let i=0;i<4;i++)r(dx+9+i*14,dy+9,2,86,'#25172e');
 r(dx+3,dy+25,62,5,'#6c4c60');r(dx+3,dy+72,62,5,'#6c4c60');
 r(dx+50,dy+50,5,8,'#d6ac71');
 if(finalPath.entered){r(dx+4,dy+3,60*Math.min(1,finalPath.doorTick/35),98,'#08060e');}
 else if(finalPath.queenFinished&&Math.abs(p.x+p.w/2-FINAL_DOOR_X)<85){
  text('E / ↑ · TÜR ÖFFNEN',FINAL_DOOR_X,dy-19,11,'#ead4dc','center');
 }
}
function drawFinalDoorFade(){
 if(!finalPath.entered)return;
 g.save();g.globalAlpha=Math.min(1,Math.max(0,(finalPath.doorTick-30)/45));
 r(0,0,W,H,'#08060e');g.restore();
 if(finalPath.doorTick>=90){text('FORTSETZUNG FOLGT',W/2,H/2,22,'#dac3de','center');}
}

let thirdBossPlaceholder, sadRabbits;
function resetThirdBossPlaceholder(){
 thirdBossPlaceholder={x:6345,y:FLOOR-122,w:92,h:122,hp:5,max:5,active:false,defeated:false,intro:false,gate:0,realmPhase:'',realmTick:0};
 sadRabbits=[
   ...Array.from({length:5},(_,i)=>({x:5650+i*225+(i%3)*19,dir:i%2?-1:1,afterSnickers:false})),
   // Scattered, motionless and visibly sad rabbits beyond Snickers' arena.
   ...Array.from({length:24},(_,i)=>({x:i<4?6810+i*190:8660+(i-4)*645+(i%4)*87,dir:i%2?-1:1,afterSnickers:true}))
  ];
}
// Temporary silhouettes for the upcoming Winston & Peach encounter. They appear
// only after Jessica calls them and Esat has walked a few more steps.
const winstonStandSprite=new Image();winstonStandSprite.src='assets/images/49549b1baad85402.png';
const peachStandSprite=new Image();peachStandSprite.src='assets/images/4f803e5bbe644bdd.png';
function drawWinstonPeachArenaWalls(){
 if(!winstonPeachGateActive)return;
 const rise=winstonPeachGate;
 g.save();g.beginPath();g.rect(7940,FLOOR-FLOOR*rise,660,FLOOR*rise);g.clip();
 for(const x of [7965,8570]){
  g.shadowColor='#ff193e';g.shadowBlur=19;
  g.fillStyle='#210711';g.fillRect(x-17,0,38,FLOOR);
  g.fillStyle='#8b1028';g.fillRect(x-12,0,28,FLOOR);
  g.fillStyle='#f9444d';g.fillRect(x-9,0,5,FLOOR);
  g.fillStyle='#ffbd68';g.fillRect(x+11,0,3,FLOOR);
  for(let y=12;y<FLOOR;y+=42){
   g.fillStyle='#310a16';g.fillRect(x-9,y,23,30);
   g.fillStyle='#ff6474';g.fillRect(x-2,y+9,8,11);
   g.fillStyle='#ffd0a3';g.fillRect(x-1,y+10,3,4);
  }
  g.fillStyle='#e13a4d';g.fillRect(x-23,0,50,14);
  g.fillStyle='#ffc47c';g.fillRect(x-20,3,44,4);
 }
 g.restore();
}

const peachSaltoFrames=[];
{const im=new Image();im.src='assets/images/d0ea25f15b2db04b.png';peachSaltoFrames.push(im);}
{const im=new Image();im.src='assets/images/2177d36a024f1752.png';peachSaltoFrames.push(im);}
{const im=new Image();im.src='assets/images/41b3a5f4e59c3a50.png';peachSaltoFrames.push(im);}
{const im=new Image();im.src='assets/images/bceea9bdc8e5a15f.png';peachSaltoFrames.push(im);}
{const im=new Image();im.src='assets/images/20c5944331d85f1a.png';peachSaltoFrames.push(im);}
{const im=new Image();im.src='assets/images/eb166496675ca0ab.png';peachSaltoFrames.push(im);}
{const im=new Image();im.src='assets/images/9610653ad2c044db.png';peachSaltoFrames.push(im);}
{const im=new Image();im.src='assets/images/d5f3b8b8fde5b22d.png';peachSaltoFrames.push(im);}
{const im=new Image();im.src='assets/images/7f1073a7eb6e1e47.png';peachSaltoFrames.push(im);}
const peachWallPose=new Image();peachWallPose.src='assets/images/69342c23c7940efb.png';
let peachCombat={phase:'waiting',tick:0,arrows:[],cooldown:75};
function resetPeachCombat(){peachCombat={phase:'waiting',tick:0,arrows:[],cooldown:75};}
function updatePeachCombat(){
 if(!winstonPeachGateActive||winstonPeachGate<1||winstonPeachGatePending||talk||mode==='dead')return;
 const b=peachCombat;
 b.tick++;
 if(b.phase==='waiting'){b.phase='salto';b.tick=0;}
 if(b.phase==='salto'&&b.tick>=63){b.phase='wall';b.tick=0;}
 if(b.phase==='wall'){
  if(!b.special&&--b.cooldown<=0){
   b.cooldown=95;
   const sx=8525,sy=164,tx=p.x+p.w/2,ty=p.y+p.h*.48;
   const dx=tx-sx,dy=ty-sy,len=Math.hypot(dx,dy)||1;
   b.arrows.push({x:sx,y:sy,vx:dx/len*5.7,vy:dy/len*5.7,life:145,angle:Math.atan2(dy,dx)});
  }
 }

 if(b.special){
  const q=b.special;q.age++;
  if(q.phase==='charge'&&q.age>=9){
   // Fast cinematic follow-up: the arrow starts immediately after a brief draw.
   q.phase='flight';q.age=0;q.x=8525;q.y=164;
   snd(410,.23);
  }else if(q.phase==='flight'){
   // Continuously track the launched player, including their changing altitude.
   const tx=p.x+p.w/2,ty=p.y+p.h*.45;
   const dx=tx-q.x,dy=ty-q.y,len=Math.hypot(dx,dy)||1;
   const speed=38;
   q.vx=dx/len*speed;q.vy=dy/len*speed;
   q.x+=q.vx;q.y+=q.vy;
   // A successful Winston launcher guarantees Peach's follow-up impact.
   if(len<=speed+35||q.age>=28){
    q.x=tx;q.y=ty;
    if(!godMode&&(mode==='play'||(mode==='postboss'&&winstonPeachGateActive&&winstonPeachGate>=1&&!winstonPeachGatePending))){inv=0;damage();}
    p.vy=12;shake=Math.max(shake,20);
    q.phase='impact';q.age=0;
   }
  }else if(q.phase==='impact'&&q.age>23)b.special=null;
 }
 for(const a of b.arrows){
  a.x+=a.vx;a.y+=a.vy;a.life--;
  if(a.life>0&&a.x>p.x-5&&a.x<p.x+p.w+5&&a.y>p.y+5&&a.y<p.y+p.h){
   damage();a.life=0;
  }
 }
 b.arrows=b.arrows.filter(a=>a.life>0&&a.x>7950&&a.x<8600&&a.y>0&&a.y<FLOOR);
}
function drawPeachCombat(){
 const b=peachCombat;
 if(b.phase==='waiting')return;
 g.save();g.imageSmoothingEnabled=false;
 if(b.phase==='salto'){
  const frame=Math.min(8,Math.floor(b.tick/7));
  const im=peachSaltoFrames[frame];
  const t=Math.min(1,b.tick/63);
  const x=8385+146*t;
  const y=FLOOR-145-275*Math.sin(t*Math.PI/2);
  if(im.complete&&im.naturalWidth)g.drawImage(im,x-50,y,100,145);
 }else{
  const im=peachWallPose;
  if(im.complete&&im.naturalWidth)g.drawImage(im,8478,65,100,168);
  // Bowstring flash warns Esat shortly before the next arrow.
  if(b.cooldown<20){g.strokeStyle='#ff648d';g.lineWidth=2;g.beginPath();g.moveTo(8525,164);g.lineTo(p.x+p.w/2,p.y+p.h/2);g.stroke();}
 }

 if(b.special){
  const q=b.special;
  g.save();g.shadowColor='#ff123d';g.shadowBlur=26;
  if(q.phase==='charge'){
   const power=Math.min(1,q.age/31);
   g.strokeStyle='#ff224e';g.lineWidth=3+power*6;
   g.beginPath();g.arc(8525,164,8+power*24,-Math.PI/2,Math.PI/2);g.stroke();
   g.fillStyle='#ff1849';g.beginPath();g.arc(8525,164,4+power*12,0,Math.PI*2);g.fill();
  }else if(q.phase==='flight'){
   g.translate(q.x,q.y);g.rotate(Math.atan2(q.vy,q.vx));
   g.strokeStyle='#ff234e';g.lineWidth=12;g.beginPath();g.moveTo(-95,0);g.lineTo(38,0);g.stroke();
   g.strokeStyle='#ffd4e0';g.lineWidth=3;g.beginPath();g.moveTo(-75,0);g.lineTo(38,0);g.stroke();
   g.fillStyle='#ff113d';g.beginPath();g.moveTo(49,0);g.lineTo(12,-26);g.lineTo(19,0);g.lineTo(12,26);g.closePath();g.fill();
  }else{
   g.translate(q.x,q.y);const r=12+q.age*3.6;
   g.strokeStyle='rgba(255,24,67,'+(1-q.age/24)+')';g.lineWidth=8;
   for(let j=0;j<8;j++){const t=j*Math.PI/4;g.beginPath();g.moveTo(0,0);g.lineTo(Math.cos(t)*r,Math.sin(t)*r);g.stroke();}
  }
  g.restore();
 }
 for(const a of b.arrows){
  g.save();g.translate(a.x,a.y);g.rotate(a.angle);
  g.strokeStyle='#ffd19b';g.lineWidth=3;g.beginPath();g.moveTo(-12,0);g.lineTo(10,0);g.stroke();
  g.fillStyle='#ff477c';g.beginPath();g.moveTo(13,0);g.lineTo(5,-5);g.lineTo(5,5);g.fill();
  g.restore();
 }
 g.restore();
}



const winstonSlashFrames=[];
{const im=new Image();im.src='assets/images/bef9a3d14e25e4c4.png';winstonSlashFrames.push(im);}
{const im=new Image();im.src='assets/images/8a97e632383f12e4.png';winstonSlashFrames.push(im);}
{const im=new Image();im.src='assets/images/25c9f10125a3c2d6.png';winstonSlashFrames.push(im);}
{const im=new Image();im.src='assets/images/dd0baf87a831679e.png';winstonSlashFrames.push(im);}
{const im=new Image();im.src='assets/images/6948ceae48fd5547.png';winstonSlashFrames.push(im);}
{const im=new Image();im.src='assets/images/e38c42d68951065e.png';winstonSlashFrames.push(im);}
{const im=new Image();im.src='assets/images/e1653cdbd7a57457.png';winstonSlashFrames.push(im);}
{const im=new Image();im.src='assets/images/4ca86cf013b57fd7.png';winstonSlashFrames.push(im);}
{const im=new Image();im.src='assets/images/a330d6c11040f28a.png';winstonSlashFrames.push(im);}
{const im=new Image();im.src='assets/images/c4d5b9b70d46e530.png';winstonSlashFrames.push(im);}
{const im=new Image();im.src='assets/images/e94e7c3329e1523b.png';winstonSlashFrames.push(im);}
{const im=new Image();im.src='assets/images/237b549e9d53fc5f.png';winstonSlashFrames.push(im);}
{const im=new Image();im.src='assets/images/452e354d7f39cd9d.png';winstonSlashFrames.push(im);}
{const im=new Image();im.src='assets/images/9ccc118bed2da45a.png';winstonSlashFrames.push(im);}
{const im=new Image();im.src='assets/images/116a55c000346eba.png';winstonSlashFrames.push(im);}

const winstonComboFrames=[];
{const i=new Image();i.src='assets/images/3c23bb81b0bf37f5.png';winstonComboFrames.push(i);}
{const i=new Image();i.src='assets/images/4f9f7b0668d503d0.png';winstonComboFrames.push(i);}
{const i=new Image();i.src='assets/images/d5437f7e9b735284.png';winstonComboFrames.push(i);}
{const i=new Image();i.src='assets/images/1869d1c25864ce4d.png';winstonComboFrames.push(i);}
{const i=new Image();i.src='assets/images/257f0b42318460e0.png';winstonComboFrames.push(i);}
{const i=new Image();i.src='assets/images/6174d411300cdee6.png';winstonComboFrames.push(i);}
{const i=new Image();i.src='assets/images/910e0bcd349d9a07.png';winstonComboFrames.push(i);}
{const i=new Image();i.src='assets/images/82dc3d1c1c430bee.png';winstonComboFrames.push(i);}
{const i=new Image();i.src='assets/images/d07cef05dc922935.png';winstonComboFrames.push(i);}
{const i=new Image();i.src='assets/images/07950f165c73670f.png';winstonComboFrames.push(i);}
{const i=new Image();i.src='assets/images/b4d8f265b2ba3cd5.png';winstonComboFrames.push(i);}
{const i=new Image();i.src='assets/images/1359de053f7817e3.png';winstonComboFrames.push(i);}
{const i=new Image();i.src='assets/images/fb894ff4a6889f9c.png';winstonComboFrames.push(i);}
{const i=new Image();i.src='assets/images/e4efed1831b0f544.png';winstonComboFrames.push(i);}
{const i=new Image();i.src='assets/images/45063476670656fe.png';winstonComboFrames.push(i);}
{const i=new Image();i.src='assets/images/f86d436d40dc485f.png';winstonComboFrames.push(i);}

// V180: full-body run and two blade slashes. All frames use one fixed world-pixel scale.
// V183: redesigned Winston matching his standing character, 16 frames.
const winstonMeleeFrames=[];
{const im=new Image();im.src='assets/images/569b3a00bd43eccc.png';winstonMeleeFrames.push(im);}
{const im=new Image();im.src='assets/images/f96efd612a445dd0.png';winstonMeleeFrames.push(im);}
{const im=new Image();im.src='assets/images/2060a2b907e84a75.png';winstonMeleeFrames.push(im);}
{const im=new Image();im.src='assets/images/eb1cfaf3ed110406.png';winstonMeleeFrames.push(im);}
{const im=new Image();im.src='assets/images/d01748dee9742062.png';winstonMeleeFrames.push(im);}
{const im=new Image();im.src='assets/images/84e7e6774634d081.png';winstonMeleeFrames.push(im);}
{const im=new Image();im.src='assets/images/b8d0db6d71fd4dac.png';winstonMeleeFrames.push(im);}
{const im=new Image();im.src='assets/images/666cd22dc313bab8.png';winstonMeleeFrames.push(im);}
{const im=new Image();im.src='assets/images/8c6f895b5f06bf12.png';winstonMeleeFrames.push(im);}
{const im=new Image();im.src='assets/images/5a0e1a678d9e62d3.png';winstonMeleeFrames.push(im);}
{const im=new Image();im.src='assets/images/848a96eefebd5c45.png';winstonMeleeFrames.push(im);}
{const im=new Image();im.src='assets/images/769914dd333039dd.png';winstonMeleeFrames.push(im);}
{const im=new Image();im.src='assets/images/15e31ae492583317.png';winstonMeleeFrames.push(im);}
{const im=new Image();im.src='assets/images/f5261ee2917cfc30.png';winstonMeleeFrames.push(im);}
{const im=new Image();im.src='assets/images/b97feb3bea1239de.png';winstonMeleeFrames.push(im);}
{const im=new Image();im.src='assets/images/a2d11172ccdcec27.png';winstonMeleeFrames.push(im);}
const winstonSprintPose=new Image();winstonSprintPose.src='assets/images/bb920e180b578210.png';

const winstonSummonPose=new Image();winstonSummonPose.src='assets/images/deac5c8e4d338664.png';
let winstonThrow={tick:0,projectiles:[],cooldown:90,attackAge:-1,attackType:'slash',nextType:'summon',x:8240,dir:-1,jumpStart:8240,jumpEnd:8240,launchHit:false,bombs:[],bombCycle:0,hp:100,maxHp:100,hit:0,defeated:false};
function resetWinstonThrow(){winstonFarewell=null;winstonThrow={tick:0,projectiles:[],cooldown:90,attackAge:-1,attackType:'slash',nextType:'summon',x:8240,dir:-1,jumpStart:8240,jumpEnd:8240,launchHit:false,bombs:[],bombCycle:0,hp:100,maxHp:100,hit:0,defeated:false};}

// Removed the nine combined Winston-in-Peach-arms frames.
let winstonFarewell=null;
const winstonCollapseFrames=['assets/images/c06d862670c4e965.png','assets/images/96d42bbaf31d5310.png','assets/images/5a76bdbcc9fc46ff.png','assets/images/20478ca19ac28759.png','assets/images/11681d64661354b9.png','assets/images/64ea3ce89e5d0f31.png','assets/images/4ea56970e1457b4c.png','assets/images/d335a5f2c108cfee.png'];
const winstonCollapseImages=winstonCollapseFrames.map(src=>{const im=new Image();im.src=src;return im;});
// Stages: collapse (frames 1-4), dialogue on knees, fall (frames 5-8),
// Peach grieves after Winston collapses; no combined embrace/dissolve sprites.
const winstonLastWords=[
 {speaker:'PEACH',line:'WINSTON! NEIN!'},
 {speaker:'PEACH',line:'Bitte … sieh mich an! Bleib bei mir!'},
 {speaker:'WINSTON',line:'Peach … es tut mir leid …'},
 {speaker:'PEACH',line:'Nein! Wir bringen dich zu Jessica!'},
 {speaker:'PEACH',line:'Sie kann dich zurückholen! So wie die anderen!'},
 {speaker:'WINSTON',line:'Nein … bitte nicht …'},
 {speaker:'PEACH',line:'Was redest du da?! Du wirst doch nicht einfach aufgeben!'},
 {speaker:'WINSTON',line:'Jedes Mal, wenn sie uns zurückholt … verliert sie ein Stück ihrer Kraft.'},
 {speaker:'WINSTON',line:'Ich habe gesehen, was es mit ihr macht …'},
 {speaker:'PEACH',line:'Das ist mir egal! Ich will dich nicht verlieren!'},
 {speaker:'WINSTON',line:'Aber ich will nicht, dass unsere Königin meinetwegen zugrunde geht …'},
 {speaker:'WINSTON',line:'Sie hat uns ein zweites Leben geschenkt.'},
 {speaker:'WINSTON',line:'Und das war mehr, als ich mir jemals wünschen konnte.'},
 {speaker:'PEACH',line:'Winston … bitte …'},
 {speaker:'WINSTON',line:'Weißt du noch … wie wir früher immer zusammen gespielt haben?'},
 {speaker:'PEACH',line:'Natürlich … wir waren doch immer zusammen …'},
 {speaker:'WINSTON',line:'Das waren die schönsten Momente meines Lebens.'},
 {speaker:'WINSTON',line:'Nicht die Kämpfe … nicht diese Welt …'},
 {speaker:'WINSTON',line:'Sondern die Zeit mit dir … und Jessica.'},
 {speaker:'PEACH',line:'Dann lass uns noch mehr davon erleben! Bitte!'},
 {speaker:'WINSTON',line:'Versprich mir etwas …'},
 {speaker:'WINSTON',line:'Pass auf unsere Königin auf.'},
 {speaker:'WINSTON',line:'Und lass nicht zu, dass sie sich für uns selbst verliert.'},
 {speaker:'PEACH',line:'Ich verspreche es …'},
 {speaker:'WINSTON',line:'Du warst nie nur meine Kampfgefährtin …'},
 {speaker:'WINSTON',line:'Du warst meine Familie.'},
 {speaker:'PEACH',line:'Und du bist meine …'},
 {speaker:'WINSTON',line:'Leb wohl … Peach.'}
];
const winstonAfterWords=[
 {speaker:'PEACH',line:'Winston …?'},
 {speaker:'PEACH',line:'Bitte … mach die Augen wieder auf.'},
 {speaker:'PEACH',line:'Du hast doch gesagt, dass wir immer zusammenbleiben …'}
];
const peachAloneWords=[
 {speaker:'Peach',text:'Ich könnte Jessica rufen …'},
 {speaker:'Peach',text:'Sie könnte dich zurückbringen …'},
 {speaker:'Peach',text:'…'},
 {speaker:'Peach',text:'Aber du hast mich um etwas gebeten.'},
 {speaker:'Peach',text:'Und ich werde mein Versprechen halten.'},
 {speaker:'Peach',text:'Ich werde nicht mehr kämpfen.'},
 {speaker:'Peach',text:'Nicht für diese Welt.'},
 {speaker:'Peach',text:'Nicht, wenn wir dafür alles verlieren, was uns einmal glücklich gemacht hat.'},
 {speaker:'Peach',text:'Ruhe in Frieden, Winston …'}
];
const peachKneelingSprite=new Image();peachKneelingSprite.src='assets/images/peach-kneeling-grief.png';

// Source bounds exclude empty padding and detached fragments in the existing frames.
const winstonCollapseBounds=[[8,4,274,362],[36,11,278,332],[62,5,319,285],[7,4,372,237],[3,125,389,326],[2,151,419,327],[3,175,433,326],[3,198,487,330]];
function startWinstonFarewell(){
 if(winstonFarewell)return;
 winstonFarewell={stage:'kneeling',tick:0,index:0,x:winstonThrow.x,dir:winstonThrow.dir,peachX:8528,peachY:65,peachTargetX:Math.max(8040,Math.min(8500,winstonThrow.x+(winstonThrow.x>8380?-100:100))),particles:[]};
 winstonThrow.defeated=true;winstonThrow.attackAge=-1;winstonThrow.bombs=[];winstonThrow.projectiles=[];
 peachCombat.arrows=[];peachCombat.special=null;peachCombat.phase='waiting';
 projectiles=[];enemyShots=[];shake=0;
 keys.attack=false;keys.jump=false;mouseShootHeld=false;keyboardShootHeld=false;
 startLevelMusic();
}
function updateWinstonFarewell(){
 const b=winstonFarewell;if(!b||b.stage==='done')return false;
 frame++;shake=0;settleEsatDuringScene();
 if(b.stage==='kneeling'){
  b.tick++;b.index=Math.min(3,Math.floor(b.tick/30));
  if(b.tick>=120){
   b.stage='wallCry';b.tick=0;
   beginTalk([{speaker:'Peach',text:'WINSTON! NEIN!'}],()=>{b.stage='approach';b.tick=0;});
  }
 }else if(b.stage==='approach'){
  const t=Math.min(1,++b.tick/75),ease=t*t*(3-2*t);
  b.peachX=8528+(b.peachTargetX-8528)*ease;
  b.peachY=65+(FLOOR-145-65)*ease;
  if(t>=1){
   b.stage='speech';b.tick=0;
   beginTalk(winstonLastWords.slice(1).map(q=>({speaker:q.speaker==='PEACH'?'Peach':'Winston',text:q.line})),()=>{b.stage='falling';b.tick=0;b.index=4;});
  }
 }else if(b.stage==='falling'){
  b.tick++;b.index=4+Math.min(3,Math.floor(b.tick/34));
  if(b.tick>=136){b.stage='lying';b.tick=0;b.index=7;}
 }else if(b.stage==='lying'){
  b.tick++;
  if(b.tick>=60){
   b.stage='grief';b.tick=0;
   beginTalk(winstonAfterWords.map(q=>({speaker:'Peach',text:q.line})),()=>{b.stage='rest';b.tick=0;});
  }
 }else if(b.stage==='rest'){
  if(++b.tick>=180){b.stage='dissolving';b.tick=0;}
 }else if(b.stage==='dissolving'){
  b.tick++;
  if(b.tick<=105){
   const box=winstonCollapseBounds[7],scale=165/358;
   for(let k=0;k<7;k++)b.particles.push({x:b.x+(Math.random()-.5)*(box[2]-box[0])*scale,
    y:FLOOR-(b.tick/105)*(box[3]-box[1])*scale-Math.random()*8,
    vx:(Math.random()-.5)*2.5,vy:-1.4-Math.random()*2.2,life:40+Math.random()*20,size:2+Math.random()*3,
    color:['#f5d4ff','#e958c5','#ffb3df','#ffc966','#b95bea'][Math.floor(Math.random()*5)]});
  }
  for(const q of b.particles){q.x+=q.vx;q.y+=q.vy;q.vy-=.012;q.life--;}
  b.particles=b.particles.filter(q=>q.life>0);
  if(b.tick>=165){
   b.stage='peachKneeling';b.tick=0;b.particles=[];
  }
 }else if(b.stage==='peachKneeling'){
  if(++b.tick>=36){
   b.stage='peachAlone';b.tick=0;
   beginTalk(peachAloneWords,()=>{b.stage='peachRising';b.tick=0;});
  }
 }else if(b.stage==='peachRising'){
  if(++b.tick>=30){
   b.stage='departing';b.tick=0;b.departX=b.peachX;b.departY=b.peachY;
  }
 }else if(b.stage==='departing'){
  // Leave the arena visibly to the left after Winston has fully dissolved.
  const t=Math.min(1,++b.tick/120),ease=t*t;
  b.peachX=b.departX+(7850-b.departX)*ease;
  b.peachY=b.departY-110*Math.sin(t*Math.PI/2);
  if(t>=1){
   b.stage='done';winstonPeachGateActive=false;winstonPeachGatePending=false;
   winstonPeachGate=0;winstonPeachSummoned=false;
   syncBossMusic();status.textContent='Peach ist nach links davongeflogen. Der Kampf ist vorbei.';
  }
 }
 return true;
}
function drawWinstonFarewell(){
 const b=winstonFarewell;if(!b)return;
 const scale=165/358;
 g.save();
 // Peach cries from the wall, then visibly descends to Winston before speaking.
 const atWall=b.stage==='kneeling'||b.stage==='wallCry';
 const peachSprite=atWall?peachWallPose:peachStandSprite;
 const kneelBlend=b.stage==='peachKneeling'?Math.min(1,b.tick/24):b.stage==='peachAlone'?1:b.stage==='peachRising'?Math.max(0,1-b.tick/30):0;
 const hasKneel=peachKneelingSprite.complete&&peachKneelingSprite.naturalWidth;
 if(b.stage!=='done'&&peachSprite.complete&&peachSprite.naturalWidth){
  const sob=0;
  g.save();g.globalAlpha=hasKneel?1-kneelBlend:1;
  if(atWall)g.drawImage(peachSprite,b.peachX-50,b.peachY,100,168);
  else drawGroundedSprite(peachSprite,b.peachX-47.5,b.peachY+145,95,145);
  g.restore();
  if(hasKneel&&kneelBlend>0){
   // Same ground anchor and character scale; only crossfade the two poses.
   const h=112,w=h*1312/1199;
   g.save();g.globalAlpha=kneelBlend;
   drawGroundedSprite(peachKneelingSprite,b.peachX-w/2,FLOOR,w,h);
   g.restore();
  }
 }
 if(['kneeling','wallCry','approach','speech','falling','lying','grief','rest','dissolving'].includes(b.stage)){
  const im=winstonCollapseImages[b.index],box=winstonCollapseBounds[b.index];
  if(im&&im.complete&&im.naturalWidth){
   const sw=box[2]-box[0],sh=box[3]-box[1];
   g.save();g.filter='saturate(1.16) contrast(1.04)';g.translate(b.x,FLOOR);if(b.dir<0)g.scale(-1,1);
   const fade=b.stage==='dissolving'?Math.min(1,b.tick/105):0;
   g.globalAlpha=1-fade;
   if(fade<1)drawGroundedSprite(im,-sw*scale/2,0,sw*scale,sh*scale,box[0],box[1],sw,sh,1-fade);
   g.restore();
  }
 }
 for(const q of b.particles){g.globalAlpha=Math.max(0,Math.min(1,q.life/48));g.fillStyle=q.color;g.fillRect(q.x,q.y,q.size,q.size);}
 g.restore();
}

function updateWinstonThrow(){
 if(!winstonPeachGateActive||winstonPeachGate<1||winstonPeachGatePending||talk||mode==='dead')return;
 const w=winstonThrow,target=p.x+p.w/2;
 if(w.defeated)return;
 if(w.hit>0)w.hit--;
 w.tick++;
 if(w.attackAge<0)w.dir=target<w.x?-1:1;
 if(w.attackAge>=0){
  w.attackAge++;
  if(w.attackType==='slash'){
   const progress=Math.min(1,w.attackAge/88);
   w.x=w.jumpStart+(w.jumpEnd-w.jumpStart)*Math.min(1,progress*1.7);
   if(w.attackAge===36)w.projectiles.push({type:'slash',x:w.x+w.dir*48,y:FLOOR-113,vx:w.dir*7.2,age:0,hit:false,dir:w.dir});
   if(w.attackAge>=88){w.x=w.jumpEnd;w.attackAge=-1;w.cooldown=68;}
  }else if(w.attackType==='summon'){
   // V191: spectacular dense bombardment. Platforms are solid roofs for bombs.
   if(w.attackAge===16){snd(105,.45);shake=Math.max(shake,5);}
   if(w.attackAge>=22&&w.attackAge<=202&&(w.attackAge-22)%18===0){
    const wave=Math.floor((w.attackAge-22)/18);
    for(let i=0;i<5;i++){
     const x=Math.max(8007,Math.min(8530,8020+((wave*173+i*109)%505)));
     const cover=platforms.filter(pl=>pl.winstonArena&&x>=pl.x+5&&x<=pl.x+pl.w-5).sort((a,b)=>a.y-b.y)[0];
     const impactY=cover?cover.y:FLOOR-18;
     w.bombs.push({x,y:-160-i*38,vy:0,age:0,warning:24+(i%3)*5,phase:'warn',blast:0,hit:false,impactY,covered:!!cover});
    }
   }
   // Maintain summoning pose through the last falling bombs and explosions.
   if(w.attackAge>=295&&w.bombs.length===0){w.attackAge=-1;w.cooldown=120;}
  }else if(w.attackType==='dash'){
   // Frames 1-24: crouched telegraph. Frames 25-45: ground-only lightning dash.
   if(w.attackAge===24){w.dir=target<w.x?-1:1;snd(240,.12);}
   if(w.attackAge>=25&&w.attackAge<=48){
    w.x+=w.dir*22;
    w.x=Math.max(8050,Math.min(8460,w.x));
    if(!w.launchHit&&Math.abs(target-w.x)<62&&p.y+p.h>FLOOR-135){
     w.launchHit=true;
     p.vy=-17.5;p.on=false;
     p.y=Math.min(p.y,FLOOR-p.h-12);
     p.vx=w.dir*1.8;
     shake=Math.max(shake,14);snd(115,.28);
     // Peach launches the huge blood arrow ONLY after Winston connects.
     peachCombat.special={phase:'charge',age:0,tx:p.x+p.w/2};
    }
   }
   if(w.attackAge>=74){w.attackAge=-1;w.cooldown=90;}
  }
 }else{
  const gap=target-w.x;
  if(Math.abs(gap)>155)w.x+=Math.sign(gap)*1.45;
  else if(Math.abs(gap)<95)w.x-=Math.sign(gap)*1.05;
  w.x=Math.max(8050,Math.min(8460,w.x));
  if(--w.cooldown<=0){
   w.attackAge=0;w.dir=target<w.x?-1:1;
   w.attackType=w.nextType;w.nextType=w.nextType==='summon'?'dash':w.nextType==='dash'?'slash':'summon';
   w.jumpStart=w.x;const away=target<w.x?1:-1;
   w.jumpEnd=Math.max(8050,Math.min(8460,w.x+away*84));
   w.launchHit=false;
  }
 }
 for(const bomb of w.bombs){
  bomb.age++;
  if(bomb.phase==='warn'&&bomb.age>=bomb.warning){bomb.phase='fall';bomb.y=-85;bomb.vy=17;}
  if(bomb.phase==='fall'){
   bomb.vy=Math.min(28,bomb.vy+.85);bomb.y+=bomb.vy;
   if(bomb.y>=bomb.impactY){bomb.y=bomb.impactY;bomb.phase='boom';bomb.blast=0;shake=Math.max(shake,6);snd(85,.14);}
  }else if(bomb.phase==='boom'){
   bomb.blast++;
   if(!bomb.hit&&bomb.blast<=13&&Math.abs(p.x+p.w/2-bomb.x)<35&&p.y+p.h>bomb.impactY-42&&p.y<bomb.impactY+14){
    // The roof blocks blood-bomb explosions for Esat standing beneath it.
    // Only count cover when the entire player hurtbox is below the platform,
    // and the blast originates on or above its top surface.
    const sheltered=platforms.some(pl=>pl.winstonArena&&p.x+p.w>pl.x+3&&p.x<pl.x+pl.w-3&&p.y>=pl.y+pl.h-2&&bomb.impactY<=pl.y+2);
    if(!sheltered){damage();bomb.hit=true;}
   }
  }
 }
 w.bombs=w.bombs.filter(b=>b.phase!=='boom'||b.blast<25);
 for(const b of w.projectiles){
  b.age++;b.x+=b.vx;
  if(!b.hit&&b.x+39>p.x&&b.x-39<p.x+p.w&&b.y+35>p.y&&b.y-35<p.y+p.h){damage();b.hit=true;}
 }
 w.projectiles=w.projectiles.filter(b=>b.age<125&&b.x>7870&&b.x<8660);
}
function drawWinstonThrow(){
 for(const b of winstonThrow.bombs){
  g.save();
  if(b.phase==='warn'){
   const t=b.age/b.warning;g.globalAlpha=.35+.5*t;
   g.fillStyle='#ff163d';g.shadowColor='#ff174d';g.shadowBlur=15;
   g.beginPath();g.ellipse(b.x,b.impactY+7,34+8*t,7,0,0,Math.PI*2);g.fill();
   g.strokeStyle='#ffb4c6';g.lineWidth=2;g.beginPath();g.ellipse(b.x,b.impactY+7,39,10,0,0,Math.PI*2);g.stroke();
  }else if(b.phase==='fall'){
   g.shadowColor='#ff1640';g.shadowBlur=24;
   const grad=g.createRadialGradient(b.x,b.y,3,b.x,b.y,28);
   grad.addColorStop(0,'#fff2f3');grad.addColorStop(.28,'#ff4563');grad.addColorStop(.7,'#a50027');grad.addColorStop(1,'rgba(40,0,20,0)');
   g.fillStyle=grad;g.beginPath();g.arc(b.x,b.y,27,0,Math.PI*2);g.fill();
   g.strokeStyle='#ff1748';g.lineWidth=9;g.beginPath();g.moveTo(b.x,b.y-20);g.lineTo(b.x-4,b.y-95);g.stroke();
  }else{
   const t=b.blast/25,r=12+105*t;g.globalAlpha=1-t;
   g.shadowColor='#ff143d';g.shadowBlur=22;g.strokeStyle='#ff2549';g.lineWidth=10*(1-t)+2;
   g.beginPath();g.ellipse(b.x,b.impactY+4,r,r*.36,0,Math.PI,Math.PI*2);g.stroke();
   for(let i=0;i<12;i++){const a=i*2*Math.PI/12+t;const rr=r*(.55+(i%3)*.14);
    g.fillStyle=i%3?'#ff254d':'#ffb4be';g.beginPath();g.arc(b.x+Math.cos(a)*rr,b.impactY-Math.abs(Math.sin(a))*r*.65,3+(i%4)*2,0,Math.PI*2);g.fill();}
  }
  g.restore();
 }
 for(const b of winstonThrow.projectiles){
  g.save();g.translate(b.x,b.y);g.shadowColor='#f20b3c';g.shadowBlur=16;
  const im=winstonSlashFrames[8+(Math.floor(b.age/6)%2)];
  if(im?.complete&&im.naturalWidth){g.scale(b.dir,1);g.drawImage(im,-51,-41,102,82);}
  g.restore();
 }
}
function drawWinstonPeachPlaceholders(){
 if(winstonThrow.defeated)return;
 if(winstonPeachGateActive&&winstonPeachGate>=1){
  const wx=winstonThrow.x-65,wy=FLOOR-190;
  g.fillStyle='#1d0c20';g.fillRect(wx-2,wy-2,134,17);
  g.fillStyle='#6d253a';g.fillRect(wx,wy,130,12);
  g.fillStyle='#ff3c63';g.fillRect(wx,wy,130*winstonThrow.hp/winstonThrow.maxHp,12);
  g.strokeStyle='#ffbdc9';g.lineWidth=1;g.strokeRect(wx,wy,130,12);
  g.font='bold 10px monospace';g.fillStyle='#fff';g.textAlign='center';g.fillText('WINSTON',wx+65,wy-5);
 }
 if(!thirdBossPlaceholder?.defeated||!winstonPeachSummoned||p.x<7750)return;
 const units=[{x:winstonThrow.x,name:'WINSTON',sprite:winstonStandSprite,w:126,h:165},{x:8385,name:'PEACH',sprite:peachStandSprite,w:95,h:145}];
 for(const u of units){
  if(u.x<cam-150||u.x>cam+W+150)continue;
  g.save();g.imageSmoothingEnabled=false;
  if(u.name!=='PEACH'||peachCombat.phase==='waiting'){
   let bx=u.x-u.w/2,by=FLOOR-u.h;
   let sprite=u.sprite,sw=u.w,sh=u.h;
   if(u.name==='WINSTON'&&winstonPeachGateActive&&winstonPeachGate>=1&&winstonThrow.attackAge>=0){
    const age=winstonThrow.attackAge;
    if(winstonThrow.attackType==='summon'){
     sprite=winstonSummonPose;
     if(sprite.complete&&sprite.naturalWidth){sh=165;sw=sh*sprite.naturalWidth/sprite.naturalHeight;bx=winstonThrow.x-sw/2;by=FLOOR-sh;}
    }else if(winstonThrow.attackType==='dash'){
     sprite=winstonSprintPose;
     if(sprite.complete&&sprite.naturalWidth){
      // Sprite source is 1523x1032. Scale to 165px standing-character reference,
      // maintaining identical dimensions during charge and sprint.
      sw=170;sh=113;bx=winstonThrow.x-sw/2;by=FLOOR-sh;
      if(age>=25&&age<=48)by+=Math.sin(age*2.8)*2;
     }
    }else if(winstonThrow.attackType==='melee'){
     // Fixed source-pixel scale: same rabbit size as the 165px standing pose.
     // Width changes only because limbs and blades extend; never scale each pose to a box.
     const index=age<82?Math.min(6,Math.floor(age/12)):
                 age<104?7+Math.min(2,Math.floor((age-82)/8)):
                 age<126?10+Math.min(3,Math.floor((age-104)/6)):
                 14+Math.min(1,Math.floor((age-126)/6));
     sprite=winstonMeleeFrames[index];
     if(!sprite.complete||!sprite.naturalWidth)sprite=winstonStandSprite;
     const fixedScale=sprite===winstonStandSprite?165/sprite.naturalHeight:165/298;
     sw=sprite.naturalWidth*fixedScale;
     sh=sprite.naturalHeight*fixedScale;
     bx=winstonThrow.x-sw/2;
     by=FLOOR-sh;
    }else if(winstonThrow.attackType==='combo'){
     const index=Math.min(15,Math.floor(age/7));
     sprite=winstonComboFrames[index];sw=152;sh=166;bx-=13;
    }else{
     const sequence=[1,2,3,4,5,6,7,8,12,13,14,15];
     const index=Math.min(sequence.length-1,Math.floor(age/7.3));
     sprite=winstonSlashFrames[sequence[index]-1];
     by-=49*Math.sin(Math.min(1,age/88)*Math.PI);
     sw=116;sh=140;bx=winstonThrow.x-sw/2;
    }
   }
   if(sprite.complete&&sprite.naturalWidth){
    if(u.name==='WINSTON')g.filter='saturate(1.16) contrast(1.04)';
    if(u.name==='WINSTON'&&winstonPeachGateActive&&winstonPeachGate>=1&&winstonThrow.dir<0){
     g.save();g.translate(bx+sw,0);g.scale(-1,1);drawGroundedSprite(sprite,0,by+sh,sw,sh);g.restore();
    }else drawGroundedSprite(sprite,bx,by+sh,sw,sh);
   }
  }
  // No name labels above either boss.
  g.restore();
 }
}
function drawSadRabbits(){
 if(!jessicaAfterHopeDone||!sadRabbits)return;
 for(const b of sadRabbits){if(b.afterSnickers&&!thirdBossPlaceholder?.defeated)continue;if(finalPathActive()&&b.x>=FINAL_PATH_START)continue;if(b.x<cam-60||b.x>cam+W+60)continue;
  drawRabbit(b.x,FLOOR-22,b.dir,0);
  g.save();g.translate(b.x+(b.dir<0?19:8),FLOOR-15);
  g.fillStyle='#342c3a';g.fillRect(-2,0,3,3);
  g.strokeStyle='#655a69';g.lineWidth=1.5;g.beginPath();g.moveTo(-3,6);g.lineTo(2,8);g.stroke();g.restore();
 }
}

// V126: Rhythm game. Note positions and scoring use the actual MP3 playback clock.
const rhythmTrack=new Audio('assets/audio/8364adfc73a9163d.mp3');
rhythmTrack.preload='auto';
const rhythmChart=[[1.364,1],[1.913,1],[2.808,3],[3.326,3],[4.181,2],[4.691,2],[5.538,0],[6.027,0],[6.915,2],[7.47,2],[8.28,1],[8.785,1],[9.636,3],[10.132,3],[11.078,0],[11.518,2],[12.408,3],[12.83,1],[13.758,0],[14.23,3],[15.122,2],[15.589,0],[16.48,3],[16.946,2],[17.796,0],[18.328,1],[19.2,3],[19.667,2],[20.535,1],[21.048,0],[21.945,3],[22.248,2],[22.868,2],[23.064,2],[23.324,1],[23.609,2],[24.139,1],[24.271,1],[24.599,2],[24.945,1],[25.496,2],[25.667,2],[26.005,1],[26.383,2],[26.843,1],[26.983,1],[27.347,2],[27.659,3],[28.172,2],[28.316,2],[28.663,3],[28.986,2],[29.546,3],[29.708,3],[30.032,2],[30.363,3],[30.945,2],[31.081,2],[31.395,3],[31.724,2],[32.028,1],[32.407,0],[32.772,3],[34.157,1],[35.512,0],[36.889,3],[38.251,1],[38.951,1],[39.621,1],[40.286,1],[40.983,1],[41.297,1],[41.659,1],[42.017,1],[42.366,1],[42.509,1],[42.65,1],[42.802,1],[42.978,1],[43.147,1],[43.337,1],[43.712,3],[44.067,2],[44.538,1],[44.698,0],[45.037,2],[45.372,1],[45.917,0],[46.109,2],[46.412,1],[46.763,0],[47.274,2],[47.459,1],[47.806,0],[48.137,2],[48.716,1],[48.853,0],[49.152,2],[49.447,1],[50.05,0],[50.212,2],[50.51,1],[50.859,0],[51.396,2],[51.586,1],[51.908,0],[52.253,2],[52.76,1],[52.937,0],[53.252,2],[53.559,1],[54.068,0],[54.24,2],[54.574,3],[54.917,3],[55.294,2],[55.597,1],[55.948,0],[56.293,3],[56.641,2],[56.944,1],[57.307,0],[57.653,3],[58.323,2],[58.678,1],[58.991,2],[59.55,1],[59.722,2],[60.049,1],[60.397,3],[60.75,2],[61.105,1],[61.446,0],[61.766,3],[62.053,2],[62.38,1],[62.714,0],[63.123,2],[63.648,1],[63.822,2],[64.149,1],[64.503,2],[64.987,1],[65.143,2],[65.446,1],[65.846,3],[66.54,2],[66.89,0],[67.219,3],[67.719,2],[67.875,2],[68.194,1],[68.593,3],[69.123,2],[69.282,2],[69.59,0],[69.909,1],[70.439,3],[70.619,3],[70.926,2],[71.235,0],[71.825,3],[71.981,3],[72.293,0],[72.649,2],[73.21,3],[73.378,3],[73.681,0],[73.988,1],[74.584,3],[74.756,3],[75.078,2],[75.366,0],[75.944,3],[76.07,3],[76.407,2],[76.808,3],[77.122,2],[77.439,1],[77.765,0],[78.101,3],[78.451,2],[78.768,1],[79.078,0],[79.447,3],[80.062,2],[80.231,2],[80.524,1],[80.819,2],[81.375,1],[81.516,1],[81.804,2],[82.176,3],[82.532,2],[82.858,1],[83.224,0],[83.583,3],[83.919,2],[84.239,1],[84.565,0],[84.946,3],[85.461,2],[85.614,2],[85.91,1],[86.229,2],[86.65,1],[86.98,2],[87.375,1],[92.844,3],[93.128,3],[93.489,3],[93.838,3],[94.182,3],[94.503,3],[94.869,3],[95.21,3],[95.539,0],[95.715,0],[95.846,0],[96.008,0],[96.186,0],[96.362,0],[96.538,0],[96.721,0],[96.882,0],[97.038,0],[97.206,0],[97.384,0],[97.544,0],[97.708,0],[97.855,0],[98.256,3],[98.599,2],[98.777,2],[98.947,1],[99.266,2],[99.445,2],[99.631,3],[99.993,2],[100.144,2],[100.325,1],[100.66,3],[100.842,3],[101.003,0],[101.333,3],[101.496,3],[101.661,3],[102.029,2],[102.225,2],[102.419,2],[102.538,2],[102.701,2],[102.869,2],[103.036,2],[103.369,2],[103.534,2],[103.687,3],[104.03,0],[104.212,0],[104.381,0],[104.694,1],[104.894,1],[105.06,1],[105.4,3],[105.581,3],[105.755,3],[106.106,2],[106.272,2],[106.445,1],[106.765,3],[106.906,2],[107.049,2],[107.413,1],[107.582,1],[107.789,3],[107.982,3],[108.119,3],[108.275,3],[108.439,3],[108.576,3],[108.873,2],[109.152,1],[109.508,3],[109.655,3],[109.827,3],[110.164,0],[110.387,0],[110.559,3],[110.923,3],[111.046,3],[111.232,0],[111.555,2],[111.732,2],[111.91,1],[112.255,0],[112.421,0],[112.613,3],[112.893,3],[113.082,3],[113.262,2],[113.585,0],[113.734,0],[113.874,0],[114.065,2],[114.32,1],[114.48,1],[114.632,0],[114.957,3],[115.107,3],[115.277,3],[115.63,2],[115.825,2],[115.98,2],[116.296,1],[116.466,1],[116.617,1],[116.991,0],[117.144,0],[117.303,2],[117.696,2],[117.872,2],[118.01,2],[118.351,3],[118.502,3],[118.678,3],[119.028,2],[119.317,1],[119.667,0],[120.041,3],[120.395,2],[120.747,3],[121.08,0],[121.278,1],[121.355,0],[121.453,2],[121.829,2],[121.977,2],[122.117,1],[122.476,2],[122.634,2],[122.8,3],[123.186,2],[123.346,2],[123.684,2],[123.823,2],[124.207,2],[124.525,2],[124.69,2],[125.076,2],[125.233,2],[125.529,1],[125.831,3],[126.013,0],[126.191,3],[126.566,2],[126.735,2],[127.022,1],[127.321,0],[127.514,0],[127.616,3],[127.944,2],[128.111,2],[128.238,0],[128.577,3],[128.696,2],[129.057,1],[129.202,0],[129.355,3],[129.632,2],[129.952,1],[130.15,0],[130.472,3],[130.66,2],[131.002,3],[131.325,2],[131.718,1],[132.061,0],[132.381,3],[132.721,2],[133.024,1],[133.353,0],[133.701,3],[134.038,2],[134.531,1],[134.703,3],[135.062,1],[135.428,3],[135.9,1],[136.065,3],[136.417,2],[136.773,0],[137.105,3],[137.415,2],[137.753,1],[138.134,0],[138.495,3],[138.796,2],[139.077,1],[139.447,0],[139.946,2],[140.103,1],[140.54,2],[140.827,1],[141.016,2],[141.383,1],[141.649,2],[141.875,1],[142.207,3],[142.392,2],[142.685,1],[142.863,0],[143.253,1],[143.575,2],[143.695,1],[144.162,2],[144.295,2],[144.58,1],[144.907,3],[145.457,0],[145.635,3],[145.96,2],[146.286,0],[146.832,3],[146.986,2],[147.326,0],[147.653,3],[148.234,1],[148.371,2],[148.672,0],[149.029,3],[149.618,2],[149.76,0],[150.082,3],[150.397,2],[150.96,0],[151.104,3],[151.453,1],[151.75,2],[152.318,3],[152.463,0],[152.795,3],[153.153,3],[153.474,2],[153.788,1],[154.121,0],[154.472,3],[154.853,2],[155.164,1],[155.514,0],[155.863,3],[156.358,2],[156.505,1],[156.844,2],[157.188,1],[157.751,2],[157.921,1],[158.227,3],[158.608,3],[158.947,2],[159.266,0],[159.636,1],[159.95,2],[160.32,3],[160.598,2],[160.955,0],[161.295,3],[161.807,2],[161.964,1],[162.325,2],[162.666,2],[163.173,1],[163.346,2],[163.671,1]];
const snickersFirstTrack=new Audio('assets/audio/3fdf031cce97aa25.mp3');
const snickersFirstChart=[[2.076,3],[2.385,3],[2.634,3],[3.07,2],[3.435,2],[3.68,2],[4.075,2],[4.286,2],[4.89,3],[5.101,3],[5.351,1],[5.804,1],[6.038,1],[6.446,2],[6.826,2],[7.095,2],[7.462,2],[7.741,2],[8.217,1],[8.419,1],[8.832,2],[9.557,3],[9.775,3],[9.986,3],[10.171,3],[10.581,2],[11.307,3],[11.514,3],[11.735,3],[11.925,3],[12.34,2],[13.009,3],[13.229,3],[13.426,3],[13.632,3],[14.057,1],[14.372,1],[14.732,1],[15.028,1],[15.407,3],[15.613,3],[15.832,2],[16.479,3],[16.702,3],[16.91,3],[17.123,3],[17.55,2],[18.241,3],[18.465,3],[18.68,3],[18.891,3],[19.279,2],[19.965,3],[20.191,3],[20.397,3],[20.595,3],[21.027,0],[21.324,0],[21.69,0],[21.932,0],[22.367,0],[22.586,0],[22.811,2],[23.198,1],[23.428,1],[23.661,1],[24.075,2],[24.526,1],[24.825,1],[25.132,1],[25.857,3],[26.072,3],[26.275,3],[26.704,2],[26.932,2],[27.149,2],[27.551,1],[28.018,3],[28.314,3],[28.593,3],[29.318,0],[29.541,0],[29.759,0],[30.177,0],[30.407,0],[30.618,0],[31.012,0],[31.488,1],[31.804,1],[32.133,1],[32.812,2],[33.05,2],[33.26,2],[33.849,2],[35.005,3],[35.223,3],[35.399,3],[35.631,3],[35.847,3],[36.055,3],[36.26,3],[36.707,0],[37.116,0],[37.576,3],[37.766,3],[38.005,3],[38.464,0],[38.86,0],[39.34,3],[39.539,3],[39.75,3],[39.943,3],[40.22,2],[40.627,2],[41.028,1],[41.242,1],[41.462,1],[41.712,1],[41.942,1],[42.236,1],[42.563,1],[42.763,1],[42.985,1],[43.207,1],[43.673,3],[44.072,3],[44.531,0],[44.754,0],[44.965,0],[45.401,3],[45.828,3],[46.239,2],[46.474,2],[46.685,2],[46.884,2],[47.565,0],[47.799,0],[48.02,0],[48.306,0],[48.607,2],[48.879,2],[49.136,2],[49.343,2],[49.552,2],[49.756,2],[49.963,3],[50.163,3],[50.337,3],[50.583,0],[50.807,0],[51.243,3],[51.705,3],[51.918,0],[52.163,0],[52.397,0],[52.63,0],[53.043,3],[53.463,3],[53.847,2],[54.078,2],[54.493,1],[54.933,0],[55.398,2],[55.607,2],[55.833,1],[56.129,0],[56.432,3],[56.908,2],[57.147,2],[57.368,2],[57.597,1],[57.795,1],[58.237,0],[58.624,3],[59.071,2],[59.478,1],[59.984,2],[60.226,2],[60.451,2],[60.674,2],[60.877,2],[61.104,3],[61.385,2],[61.682,3],[61.915,2],[62.205,3],[62.522,2],[62.763,2],[63.621,0],[64.072,0],[64.519,2],[65.19,3],[65.442,3],[65.643,3],[65.848,3],[66.248,2],[66.951,3],[67.174,3],[67.39,3],[67.607,3],[68.004,2],[68.664,3],[68.89,3],[69.121,3],[69.318,3],[69.76,0],[70.065,0],[70.404,0],[70.646,0],[71.073,3],[71.273,3],[71.514,2],[72.157,3],[72.374,3],[72.603,3],[72.836,3],[73.224,2],[73.873,3],[74.101,3],[74.329,3],[74.537,3],[74.944,2],[75.611,3],[75.844,3],[76.068,3],[76.272,3],[76.696,2],[76.993,2],[77.354,2],[77.606,2],[77.993,1],[78.244,1]];
let snickersSongPhase=1,snickersFirstStats=null;
function snickersCurrentTrack(){return snickersSongPhase===1?snickersFirstTrack:rhythmTrack;}
const RHYTHM_LIMITS={1:3,2:12}, RHYTHM_PERFECT=.075, RHYTHM_GOOD=.155;
let rhythm=null;
function startRhythm(){
 rhythmHeldKeys.clear();
 snickersDanceSecond=-1;snickersDanceIndex=1;
 const oldSummary=document.getElementById('rhythmResultSummary');if(oldSummary)oldSummary.remove();
 const b=thirdBossPlaceholder;if(!b)return;
 levelMusic.pause();bossMusic.pause();bossMusicWanted=false;
 rhythmTrack.pause();snickersFirstTrack.pause();
 const track=snickersCurrentTrack();track.currentTime=0;track.volume=0.42;track.muted=muted;
 rhythm={notes:(snickersSongPhase===1?snickersFirstChart:rhythmChart).map(n=>({t:n[0],lane:n[1],state:0})),misses:0,combo:0,best:0,perfect:0,good:0,score:0,feedback:'',feedbackUntil:0,hitLane:-1,hitKind:'',hitUntil:0,state:'playing',clock:0};
 b.realmPhase='rhythm';b.active=true;
 if(snickersSongPhase===1){rhythm.state='tutorial';rhythm.tutorialTick=0;}
 else {const prom=track.play();if(prom&&prom.catch)prom.catch(()=>{rhythm.state='waiting';});}
}
function playSnickersComboSound(){
 if(muted)return;
 try{
  audio??=new(window.AudioContext||window.webkitAudioContext)();
  audio.resume();
  const t=audio.currentTime;
  [523.25,659.25,783.99,1046.5].forEach((freq,i)=>{
   const osc=audio.createOscillator(),gain=audio.createGain();
   osc.type='triangle';osc.frequency.setValueAtTime(freq,t+i*.075);
   gain.gain.setValueAtTime(.0001,t+i*.075);
   gain.gain.exponentialRampToValueAtTime(.085,t+i*.075+.012);
   gain.gain.exponentialRampToValueAtTime(.0001,t+i*.075+.22);
   osc.connect(gain);gain.connect(audio.destination);
   osc.start(t+i*.075);osc.stop(t+i*.075+.23);
  });
 }catch(e){}
}
function playSnickersMissSound(){
 if(muted)return;
 try{
  audio??=new(window.AudioContext||window.webkitAudioContext)();
  audio.resume();
  const t=audio.currentTime,osc=audio.createOscillator(),gain=audio.createGain();
  osc.type='sawtooth';
  osc.frequency.setValueAtTime(380,t);
  osc.frequency.exponentialRampToValueAtTime(125,t+.22);
  gain.gain.setValueAtTime(.11,t);
  gain.gain.exponentialRampToValueAtTime(.0001,t+.25);
  osc.connect(gain);gain.connect(audio.destination);
  osc.start(t);osc.stop(t+.26);
 }catch(e){}
}
function rhythmPress(lane){
 if(!rhythm)return;
 if(rhythm.state==='failed'||rhythm.state==='tutorial'){return;}
 if(rhythm.state==='waiting'){rhythm.state='playing';snickersCurrentTrack().play().catch(()=>{});return;}
 if(rhythm.state!=='playing'||snickersCurrentTrack().paused)return;
 const now=snickersCurrentTrack().currentTime;
 let candidate=null,delta=Infinity;
 for(const n of rhythm.notes){if(n.state!==0||n.lane!==lane)continue;const d=Math.abs(n.t-now);if(d<delta){candidate=n;delta=d;}if(n.t>now+RHYTHM_GOOD)break;}
 if(candidate&&delta<=RHYTHM_GOOD){
  candidate.state=1;rhythm.combo++;rhythm.best=Math.max(rhythm.best,rhythm.combo);
  if(rhythm.combo%15===0){
   rhythm.comboMilestone=rhythm.combo;
   rhythm.comboMilestoneUntil=now+2.1;
   playSnickersComboSound();
  }
  const perfect=delta<=RHYTHM_PERFECT;
  if(perfect)rhythm.perfect++;else rhythm.good++;
  rhythm.score+=(perfect?100:50)*(1+Math.min(4,Math.floor(rhythm.combo/10)));
  rhythm.feedback=perfect?'PERFECT!':'GOOD';rhythm.feedbackUntil=now+.5;rhythm.hitLane=lane;rhythm.hitKind=perfect?'perfect':'good';rhythm.hitUntil=now+.22;
 }else{rhythm.hitLane=lane;rhythm.hitKind='empty';rhythm.hitUntil=now+.16;playSnickersMissSound();}
}
function rhythmMiss(label,lane=null){
 if(!rhythm||rhythm.state!=='playing')return;
 rhythm.misses++;rhythm.combo=0;playSnickersMissSound();if(lane!==null){rhythm.hitLane=lane;rhythm.hitKind='miss';rhythm.hitUntil=snickersCurrentTrack().currentTime+.32;}rhythm.feedback=label;rhythm.feedbackUntil=snickersCurrentTrack().currentTime+.5;
 if(rhythm.misses>RHYTHM_LIMITS[snickersSongPhase]){rhythm.state='failed';snickersCurrentTrack().pause();deaths++;mode='dead';status.textContent='Snickers: Zu viele Fehler! Neustart am Snickers-Checkpoint.';}
}
function updateRhythm(){
 if(!rhythm||rhythm.state!=='playing')return;
 const activeTrack=snickersCurrentTrack();
 if(activeTrack.paused&&!activeTrack.ended&&!rhythm.forceFinish)return;
 const now=activeTrack.currentTime;rhythm.clock=now;
 for(const n of rhythm.notes){if(n.state!==0)continue;if(n.t<now-RHYTHM_GOOD){n.state=-1;rhythmMiss('MISS',n.lane);if(rhythm.state==='failed')break;}else if(n.t>now+1)break;}
 if(rhythm.state==='playing'&&(rhythm.forceFinish||activeTrack.ended||now>=(snickersSongPhase===1?81.92:174.45))){
  rhythm.state='won';snickersCurrentTrack().pause();
  if(snickersSongPhase===1){
   snickersFirstStats={misses:rhythm.misses,perfect:rhythm.perfect,good:rhythm.good,score:rhythm.score};
   const b=thirdBossPlaceholder;
   // Keep the last Music Realm image visible until the fade has covered it.
   const shot=document.createElement('canvas');shot.width=g.canvas.width;shot.height=g.canvas.height;
   shot.getContext('2d').drawImage(g.canvas,0,0);b.returnRealmShot=shot;
   b.realmPhase='returnWorld';b.realmTick=0;rhythm=null;
   b.afterReturnTalk=()=>beginTalk([
    {speaker:'SNICKERS',text:'Nicht schlecht. Das hätte ich dir tatsächlich nicht zugetraut.'},
    {speaker:'SNICKERS',text:'Du hast meinen ersten Rhythmus überstanden. Beeindruckend.'},
    {speaker:'SNICKERS',text:'Aber bilde dir bloß nichts darauf ein. Das war gerade erst die Aufwärmrunde.'},
    {speaker:'SNICKERS',text:'Mal sehen, ob du bei diesem Song immer noch mithalten kannst!'}
   ],()=>{snickersSongPhase=2;levelMusic.pause();bossMusic.pause();b.realmPhase='quake';b.realmTick=0;},'continue');
   return;
  }
  const finalStats={...rhythm};
  const b=thirdBossPlaceholder;const returnRealmShot=document.createElement('canvas');returnRealmShot.width=g.canvas.width;returnRealmShot.height=g.canvas.height;returnRealmShot.getContext('2d').drawImage(g.canvas,0,0);b.returnRealmShot=returnRealmShot;b.active=false;b.defeated=false;b.realmPhase='returnDeath';b.realmTick=0;b.deathStage=null;b.deathTick=0;b.deathFrame=0;rhythm=null;startLevelMusic();
  const oldSummary=document.getElementById('rhythmResultSummary');if(oldSummary)oldSummary.remove();
  const summary=document.createElement('div');summary.id='rhythmResultSummary';summary.style.cssText='position:fixed;top:12px;left:50%;transform:translateX(-50%);z-index:99999;background:rgba(15,8,31,.94);border:2px solid #ff91d7;border-radius:10px;color:#fff;padding:12px 20px;font:bold 16px monospace;text-align:center;box-shadow:0 5px 22px #000a;pointer-events:none';
  summary.textContent='MUSIC REALM – ERGEBNIS | FEHLER: '+(finalStats.misses+(snickersFirstStats?.misses||0))+' | PERFECT: '+(finalStats.perfect+(snickersFirstStats?.perfect||0))+' | GOOD: '+(finalStats.good+(snickersFirstStats?.good||0))+' | SCORE: '+(finalStats.score+(snickersFirstStats?.score||0))+(godMode?' | TESTMODUS':'');document.body.appendChild(summary);
  say('ZURÜCK IN DER ARENA ...',180);
 }
}
const esatGuitarFrames=[(function(){const im=new Image();im.src='assets/images/f1d4c3eee8ed0936.png';return im;})(),(function(){const im=new Image();im.src='assets/images/f63f244561d06a09.png';return im;})(),(function(){const im=new Image();im.src='assets/images/50e3b800db9e95bc.png';return im;})(),(function(){const im=new Image();im.src='assets/images/eaf48cb141a07870.png';return im;})(),(function(){const im=new Image();im.src='assets/images/a0409d34461fb7a7.png';return im;})(),(function(){const im=new Image();im.src='assets/images/cf582d168d15baeb.png';return im;})(),(function(){const im=new Image();im.src='assets/images/67ca83fc7fb47998.png';return im;})(),(function(){const im=new Image();im.src='assets/images/bb5b52a2b682ab30.png';return im;})()];
function drawRhythm(){
 if(!rhythm||!thirdBossPlaceholder||thirdBossPlaceholder.realmPhase!=='rhythm')return;
 const now=snickersCurrentTrack().currentTime,beat=now*174/60,pulse=Math.pow(Math.max(0,Math.cos(beat*Math.PI*2)),9);
 const left=168,top=100,lw=76,bottom=338,travel=1.65,colors=['#ff587e','#ffca61','#57ddf5','#b48cff'];
 g.save();
 // Layered, animated gothic bunny disco. All effects are drawn locally; no additional assets.
 const bg=g.createLinearGradient(0,0,0,H);
 bg.addColorStop(0,'#080a21');bg.addColorStop(.52,'#291037');bg.addColorStop(1,'#080a19');
 g.fillStyle=bg;g.fillRect(0,0,W,H);
 // Distant light wall and arched stage
 g.save();g.shadowBlur=30+24*pulse;g.shadowColor='#b34aff';
 g.strokeStyle='#b453c9';g.lineWidth=5;g.beginPath();g.ellipse(W/2,198,238,177,0,Math.PI,Math.PI*2);g.stroke();g.restore();
 for(let i=0;i<12;i++){
  const x=18+i*56,y=106+Math.sin(i*2.8)*22;
  g.fillStyle=i%2?'#b63492':'#6242b6';g.globalAlpha=.24+.14*pulse;
  g.fillRect(x,y,3,118);g.globalAlpha=1;
 }
 // Giant luminous bunny-head insignia behind the note highway
 g.save();g.translate(320,157);g.globalAlpha=.25+.09*pulse;
 g.strokeStyle='#fa65d9';g.lineWidth=5;g.shadowColor='#ff3dbb';g.shadowBlur=24;
 g.beginPath();g.ellipse(-37,-56,18,65,-.23,0,Math.PI*2);g.ellipse(37,-56,18,65,.23,0,Math.PI*2);g.stroke();
 g.beginPath();g.ellipse(0,19,79,67,0,0,Math.PI*2);g.stroke();
 g.fillStyle='#ff7fdf';g.beginPath();g.ellipse(-27,12,8,11,0,0,Math.PI*2);g.ellipse(27,12,8,11,0,0,Math.PI*2);g.fill();
 g.restore();
 // Disco ball, tiled mirror surface and rotating light cones
 const cx=320,cy=48,rad=29;
 for(let i=0;i<9;i++){
  const angle=now*.65+i*Math.PI*2/9,tx=cx+Math.sin(angle)*490;
  g.fillStyle=['rgba(243,57,164,.075)','rgba(94,113,255,.075)','rgba(58,227,222,.065)'][i%3];
  g.beginPath();g.moveTo(cx,cy);g.lineTo(tx-72,H);g.lineTo(tx+72,H);g.closePath();g.fill();
 }
 g.strokeStyle='#b7b6d8';g.lineWidth=2;g.beginPath();g.moveTo(cx,0);g.lineTo(cx,cy-rad);g.stroke();
 g.save();g.shadowBlur=24;g.shadowColor='#d38bff';g.fillStyle='#9281bd';
 g.beginPath();g.arc(cx,cy,rad,0,Math.PI*2);g.fill();g.restore();
 g.save();g.beginPath();g.arc(cx,cy,rad-1,0,Math.PI*2);g.clip();
 for(let yy=-3;yy<6;yy++)for(let xx=-3;xx<6;xx++){
  const x=cx+xx*11+(Math.sin(now*.9)*5),y=cy+yy*10;
  g.fillStyle=(xx+yy+Math.floor(now*3))%4===0?'#fff5ff':(xx+yy)%2?'#8b70bb':'#e0bdf1';
  g.fillRect(x,y,9,8);
 }g.restore();
 // Side speakers and neon bunny dancers
 for(const side of [0,1]){
  const x=side?556:28;
  g.fillStyle='#120d22';g.fillRect(x,194,55,133);
  g.strokeStyle='#7149a6';g.lineWidth=3;g.strokeRect(x+2,197,51,126);
  for(const sy of [229,288]){
   g.fillStyle='#21142e';g.beginPath();g.arc(x+27,sy,21,0,Math.PI*2);g.fill();
   g.strokeStyle=side?'#ec60ba':'#65dcf3';g.lineWidth=3+pulse*2;g.beginPath();g.arc(x+27,sy,16,0,Math.PI*2);g.stroke();
   g.fillStyle='#47345e';g.beginPath();g.arc(x+27,sy,7+pulse*3,0,Math.PI*2);g.fill();
  }
  if(side===1){
   const bx=526,by=258+Math.sin(beat*Math.PI)*3;
   g.save();g.translate(bx,by);g.globalAlpha=.85;g.fillStyle='#db7fbf';
   g.beginPath();g.ellipse(-11,-40,7,24,-.25,0,Math.PI*2);g.ellipse(11,-40,7,24,.25,0,Math.PI*2);g.fill();
   g.beginPath();g.arc(0,-10,20,0,Math.PI*2);g.fill();
   g.fillRect(-12,9,24,37);g.fillStyle='#ffe5fa';g.fillRect(-10,-15,5,5);g.fillRect(6,-15,5,5);
   g.restore();
  }
 }
 // Perspective dance floor
 g.fillStyle='#0e0c20';g.fillRect(0,326,W,H-326);
 for(let i=-5;i<12;i++){g.strokeStyle=i%2?'#793c9b':'#38427d';g.globalAlpha=.45+.2*pulse;g.beginPath();g.moveTo(W/2,326);g.lineTo(i*88,H);g.stroke();}
 for(let i=0;i<5;i++){let y=327+i*i*4.5;g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();}g.globalAlpha=1;
 // Esat plays guitar in a fixed eight-frame loop, always in the same order.
 const esatGuitarFrame=esatGuitarFrames[Math.floor(now/0.14)%esatGuitarFrames.length];
 if(esatGuitarFrame.complete&&esatGuitarFrame.naturalWidth){
  g.save();g.imageSmoothingEnabled=false;
  g.drawImage(esatGuitarFrame,64,211,112,112);
  g.restore();
 }
 // Snickers changes to a random dance pose once per full second of music.
 // Polished note highway, clear lane separation
 g.save();g.shadowColor='#bb63fa';g.shadowBlur=19;g.fillStyle='rgba(7,7,25,.94)';
 g.fillRect(left-10,top-8,lw*4+20,bottom-top+38);g.restore();
 for(let lane=0;lane<4;lane++){
  const x=left+lane*lw;
  const laneGrad=g.createLinearGradient(0,top,0,bottom);
  laneGrad.addColorStop(0,lane%2?'#251333':'#18172e');
  laneGrad.addColorStop(1,lane%2?'#352044':'#22213e');
  g.fillStyle=laneGrad;g.fillRect(x,top,lw-2,bottom-top+13);
  g.strokeStyle='rgba(255,255,255,.12)';g.lineWidth=1;g.beginPath();g.moveTo(x,top);g.lineTo(x,bottom+13);g.stroke();
  // Light trail toward the target
  g.fillStyle=colors[lane];g.globalAlpha=.08+.05*pulse;g.fillRect(x+lw/2-2,top,4,bottom-top);g.globalAlpha=1;
 }
 for(const n of rhythm.notes){
  if(n.state!==0)continue;const d=n.t-now;if(d>travel||d<-.18)continue;
  const y=bottom-d/travel*(bottom-top),x=left+n.lane*lw+9;
  g.save();g.shadowColor=colors[n.lane];g.shadowBlur=13;
  g.fillStyle=colors[n.lane];g.beginPath();g.roundRect(x,y-9,lw-20,18,6);g.fill();
  g.shadowBlur=0;g.fillStyle='rgba(255,255,255,.65)';g.fillRect(x+7,y-6,lw-34,3);g.restore();
 }
 // Targets flash green on hits, red on errors
 for(let lane=0;lane<4;lane++){
  const x=left+lane*lw+6,active=rhythm.hitLane===lane&&now<rhythm.hitUntil;
  const hitColor=active?(rhythm.hitKind==='miss'?'#ff344e':rhythm.hitKind==='empty'?'#92929d':'#45ff91'):colors[lane];
  g.save();g.shadowColor=hitColor;g.shadowBlur=active?28:9;
  g.fillStyle=active?(rhythm.hitKind==='miss'?'#852336':rhythm.hitKind==='empty'?'#444550':'#126d48'):'#141124';
  g.beginPath();g.roundRect(x,bottom-14,lw-14,31,7);g.fill();
  g.strokeStyle=hitColor;g.lineWidth=active?4:2;g.stroke();g.restore();
  g.textAlign='center';g.font='bold 17px monospace';g.fillStyle=active?'#ffffff':colors[lane];
  g.fillText('ASDF'[lane],x+(lw-14)/2,bottom+7);
 }
 g.strokeStyle='#fff1ff';g.lineWidth=2;g.beginPath();g.moveTo(left-8,bottom);g.lineTo(left+lw*4+8,bottom);g.stroke();
 // Draw Snickers AFTER the lane rendering, inside the right-side stage area.
 // Previously the note highway covered most of his body.
 // Choose a random dance each second. The wiggle is one paired move:
 // once chosen, alternate its two frames every 150 ms for the full second.
 const sec=Math.floor(now);
 if(sec!==snickersDanceSecond){
  snickersDanceSecond=sec;
  const options=[1,2,3,4,6].filter(n=>n!==snickersDanceIndex);
  snickersDanceIndex=options[Math.floor(Math.random()*options.length)];
 }
 const snickersVisibleDance=snickersDanceIndex===6
  ? (Math.floor((now-sec)*1000/500)%2===0?6:7)
  : snickersDanceIndex;
 g.save();g.shadowColor='#eb6ae8';g.shadowBlur=18;
 drawSnickersSprite(snickersVisibleDance,493,155,110,169);
 g.restore();
 // Top information HUD
 g.fillStyle='rgba(8,5,22,.82)';g.fillRect(0,0,W,37);
 g.textAlign='center';g.font='bold 18px monospace';g.fillStyle='#ffe5fb';g.fillText('MUSIC REALM',W/2,25);
 g.textAlign='left';g.font='bold 13px monospace';g.fillStyle='#fff';
 g.fillText('FEHLER: '+rhythm.misses+'/'+RHYTHM_LIMITS[snickersSongPhase],12,54);
 g.fillText('COMBO: '+rhythm.combo,12,75);g.fillText('SCORE: '+rhythm.score,12,96);
 if(rhythm.comboMilestone&&now<rhythm.comboMilestoneUntil){
  const remaining=rhythm.comboMilestoneUntil-now;
  g.save();g.textAlign='center';g.font='bold 35px monospace';
  g.globalAlpha=Math.min(1,remaining*2);
  g.fillStyle='#ffe17d';g.shadowColor='#fa55ef';g.shadowBlur=23;
  g.fillText('COMBO X'+rhythm.comboMilestone+'!',W/2,145);
  g.restore();
 }
 g.textAlign='right';g.fillText(Math.floor(now/60)+':'+String(Math.floor(now%60)).padStart(2,'0')+(snickersSongPhase===1?' / 1:22':' / 2:55'),W-12,54);
 // Clear judgement text, green/red plus accuracy distinction
 if(rhythm.feedback&&now<rhythm.feedbackUntil){
  const good=rhythm.feedback!=='MISS';
  g.textAlign='center';g.font='bold 24px monospace';g.fillStyle=good?'#4dff9e':'#ff4969';
  g.shadowColor=g.fillStyle;g.shadowBlur=16;g.fillText(rhythm.feedback,W/2,83);g.shadowBlur=0;
 }
 if(rhythm.state==='failed'||rhythm.state==='waiting'){
  g.fillStyle='rgba(6,4,19,.94)';g.fillRect(65,151,510,155);
  g.textAlign='center';g.fillStyle='#ffb9dc';g.font='bold 25px monospace';
  g.fillText(rhythm.state==='failed'?'GAME OVER':'MUSIK STARTEN',W/2,211);
  g.font='14px monospace';g.fillText(rhythm.state==='failed'?'R = Bosskampf neu starten':'A, S, D oder F drücken',W/2,253);
 }
 if(snickersSongPhase===1&&rhythm.state==='tutorial'){
  g.save();g.globalAlpha=1;
  g.fillStyle='rgba(8,5,20,.88)';g.fillRect(88,176,464,94);
  g.strokeStyle='#f5a8ff';g.lineWidth=3;g.strokeRect(88,176,464,94);
  g.textAlign='center';g.fillStyle='#fff';g.font='bold 22px monospace';
  g.fillText('DRÜCKE A S D F',W/2,211);
  g.font='bold 17px monospace';g.fillText('ZUR RICHTIGEN ZEIT!',W/2,240);
  g.restore();
 }
 g.restore();
}
// V125: Music Realm transition.
function advanceThirdRealm(b){
 b.realmTick++;
 if(b.realmPhase==='returnDeath'&&b.realmTick>=110){b.returnRealmShot=null;b.realmPhase='death';b.realmTick=0;b.deathStage='kneel';b.deathTick=0;b.deathFrame=0;}
 else if(b.realmPhase==='returnWorld'&&b.realmTick>=110){b.returnRealmShot=null;b.realmPhase='interlude';b.realmTick=0;if(b.afterReturnTalk){const cb=b.afterReturnTalk;b.afterReturnTalk=null;cb();}}
 else if(b.realmPhase==='quake'&&b.realmTick>=72){b.realmPhase='blackout';b.realmTick=0;}
 else if(b.realmPhase==='blackout'&&b.realmTick>=65){b.realmPhase='ball';b.realmTick=0;}
 else if(b.realmPhase==='ball'&&b.realmTick>=115){b.realmPhase='reveal';b.realmTick=0;}
 else if(b.realmPhase==='reveal'&&b.realmTick>=105){b.realmPhase='ready';b.realmTick=0;startRhythm();}
}
function drawThirdRealmOverlay(){
 const b=thirdBossPlaceholder;if(!b||!b.realmPhase||b.realmPhase==='interlude'||b.realmPhase==='death')return;
 const phase=b.realmPhase,t=b.realmTick;
 g.save();
 if(phase==='returnWorld'||phase==='returnDeath'){if(t<68&&b.returnRealmShot){g.drawImage(b.returnRealmShot,0,0,W,H);}const darkness=t<45?t/45:t<68?1:Math.max(0,1-(t-68)/42);g.fillStyle=`rgba(4,2,12,${Math.min(1,darkness)})`;g.fillRect(0,0,W,H);}
 else if(phase==='quake'){g.translate(Math.sin(t*2.8)*Math.max(0,7-t/11),Math.cos(t*3.3)*Math.max(0,5-t/15));
  g.fillStyle=`rgba(11,2,20,${Math.min(.95,t/75)})`;g.fillRect(0,0,W,H);
  g.fillStyle='#d65df1';for(let i=0;i<7;i++){const x=(i*123+t*11)%W;g.fillRect(x,(i*83+t*7)%H,3,26)}
 }else{
  g.fillStyle='#07040e';g.fillRect(0,0,W,H);
  if(phase==='reveal'||phase==='ready'){
   const a=phase==='ready'?1:Math.min(1,t/100);
   g.globalAlpha=a;
   const grad=g.createLinearGradient(0,40,0,H);grad.addColorStop(0,'#1c0935');grad.addColorStop(1,'#320b34');g.fillStyle=grad;g.fillRect(0,0,W,H);
   for(let i=0;i<10;i++){const x=i*76-30;g.strokeStyle=i%2?'#7632a3':'#ae2e75';g.lineWidth=2;g.beginPath();g.moveTo(W/2,75);g.lineTo(x,H);g.stroke();}
   for(let y=240;y<H;y+=31){g.fillStyle=y%62?'#261331':'#3a1a48';g.fillRect(0,y,W,17);}
   // No old placeholder silhouettes: Esat and Snickers have their own sprites.
   g.globalAlpha=1;
  }
  if(phase!=='blackout'){
   const drop=phase==='ball'?Math.min(1,t/90):1;
   const cx=W/2,cy=-60+drop*170,rad=43;
   g.strokeStyle='#a9a0c4';g.lineWidth=3;g.beginPath();g.moveTo(cx,0);g.lineTo(cx,cy-rad);g.stroke();
   g.shadowColor='#e0a9ff';g.shadowBlur=phase==='ball'?12:24;
   g.fillStyle='#a99bc9';g.beginPath();g.arc(cx,cy,rad,0,Math.PI*2);g.fill();
   g.save();g.beginPath();g.arc(cx,cy,rad,0,Math.PI*2);g.clip();
   for(let yy=cy-rad;yy<cy+rad;yy+=12)for(let xx=cx-rad;xx<cx+rad;xx+=12){g.fillStyle=((Math.floor(xx/12)+Math.floor(yy/12)+Math.floor(frame/14))%3===0)?'#fff0ff':'#6d4e9d';g.fillRect(xx,yy,10,10)}g.restore();g.shadowBlur=0;
   if(phase==='reveal'||phase==='ready'){
    for(let i=0;i<6;i++){g.strokeStyle=['#d94ee7','#b83073','#7357eb'][i%3];g.lineWidth=2;g.beginPath();g.moveTo(cx,cy);g.lineTo((i*117+frame*2)%W,H);g.stroke();}
   }
  }
  if(phase==='ready'){
   g.fillStyle='#160d25db';g.fillRect(82,337,476,55);
   g.fillStyle='#f5d5ff';g.font='bold 20px monospace';g.textAlign='center';g.fillText('MUSIC REALM',W/2,359);
   g.font='11px monospace';g.fillText('RHYTHMUSKAMPF WIRD ALS NAECHSTES ERGAENZT',W/2,378);
  }
 }
 g.restore();
}
const snickersSprites=["assets/images/8f532faf491c7357.png", "assets/images/5164f1a13af7ab0b.png", "assets/images/f49724738fe6356a.png", "assets/images/15da5b143cfca4ee.png", "assets/images/87cb297a93d92b14.png", "assets/images/bf8ebf68c30b8545.png","assets/images/099b6b7c659cb462.png","assets/images/7b883fb6ba56189b.png"];
const snickersImages=snickersSprites.map(src=>{const im=new Image();im.src=src;return im;});
let snickersDanceIndex=1,snickersDanceSecond=-1;
function drawSnickersSprite(index,x,y,w,h){
 const im=snickersImages[index];if(!im||!im.complete||!im.naturalWidth)return false;
 g.drawImage(im,x,y,w,h);return true;
}
const snickersDeathSprites=[(()=>{const i=new Image();i.src='assets/images/850e4729107623dd.png';return i;})(),(()=>{const i=new Image();i.src='assets/images/b225d9570fc65f03.png';return i;})(),(()=>{const i=new Image();i.src='assets/images/74a628b0785b142d.png';return i;})(),(()=>{const i=new Image();i.src='assets/images/9487f453945f9ef1.png';return i;})(),(()=>{const i=new Image();i.src='assets/images/71fc24d226592694.png';return i;})(),(()=>{const i=new Image();i.src='assets/images/df8da8b45a0fc8bd.png';return i;})(),(()=>{const i=new Image();i.src='assets/images/d516f4776ae99273.png';return i;})(),(()=>{const i=new Image();i.src='assets/images/aa6841e2f10d50eb.png';return i;})(),(()=>{const i=new Image();i.src='assets/images/509548e1f75a4b6d.png';return i;})(),(()=>{const i=new Image();i.src='assets/images/3adfcdabce017eda.png';return i;})(),(()=>{const i=new Image();i.src='assets/images/646a45c7c3df89cb.png';return i;})(),(()=>{const i=new Image();i.src='assets/images/52f120f465456226.png';return i;})(),(()=>{const i=new Image();i.src='assets/images/8e0b41a7b775ef93.png';return i;})()];
function initSnickersDissolve(b){
 b.deathParticles=[];
 const img=snickersDeathSprites[12];
 if(!img||!img.complete||!img.naturalWidth)return;
 const off=document.createElement('canvas');off.width=img.naturalWidth;off.height=img.naturalHeight;
 const ctx=off.getContext('2d',{willReadFrequently:true});ctx.drawImage(img,0,0);
 const pixels=ctx.getImageData(0,0,off.width,off.height).data;
 const dx=b.x-62,dw=b.w+124,dh=b.h+48;
 const dy=FLOOR-spriteFootPixel(img)/img.naturalHeight*dh;
 for(let py=4;py<off.height;py+=7)for(let px=4;px<off.width;px+=7){
  const idx=(py*off.width+px)*4;if(pixels[idx+3]<135)continue;
  const gold=pixels[idx]>140&&pixels[idx+1]>85&&pixels[idx+2]<140;
  b.deathParticles.push({x:dx+px/off.width*dw,y:dy+py/off.height*dh,
   vx:(Math.random()-.5)*2.4,vy:-.4-Math.random()*2.1,
   color:gold?'#ffd15e':Math.random()<.4?'#f3a1fc':'#a943da',
   delay:Math.random()*45,size:2+Math.random()*3});
 }
}
function drawSnickersDissolve(b){
 const t=b.deathTick;
 for(const pt of b.deathParticles||[]){
  if(t<pt.delay)continue;
  const age=t-pt.delay;
  const alpha=Math.max(0,1-age/105);
  if(alpha<=0)continue;
  g.globalAlpha=alpha;
  g.fillStyle=pt.color;
  g.fillRect(pt.x+pt.vx*age,pt.y+pt.vy*age+.007*age*age,pt.size,pt.size);
 }
 g.globalAlpha=1;
}
function drawThirdBossPlaceholder(){
 const b=thirdBossPlaceholder;if(!b||b.defeated)return;
 g.save();
 // During the ending use the exact individually cut death frames.
 if(b.deathStage){
  const im=snickersDeathSprites[Math.min(12,Math.max(0,b.deathFrame||0))];
  if(b.deathStage==='dissolve')drawSnickersDissolve(b);
  else if(im&&im.complete&&im.naturalWidth){
   g.imageSmoothingEnabled=false;
   drawGroundedSprite(im,b.x-62,FLOOR,b.w+124,b.h+48);
  }
 }else if(snickersImages[0].complete&&snickersImages[0].naturalWidth){
  drawGroundedSprite(snickersImages[0],b.x-20,FLOOR,b.w+40,b.h+15);
 }else{
  g.fillStyle='#6c3679';g.fillRect(b.x,b.y,b.w,b.h);
 }
 // Snickers has no HP bar: only finishing the second song defeats him.
 g.restore();
 if(b.intro||b.gate>0||b.active||b.realmPhase){const rise=b.intro?Math.min(1,b.gate/45):1;
  g.save();g.beginPath();g.rect(THIRD_ARENA_LEFT-28,FLOOR-FLOOR*rise,THIRD_ARENA_RIGHT-THIRD_ARENA_LEFT+56,FLOOR*rise);g.clip();
  for(const x of [THIRD_ARENA_LEFT-12,THIRD_ARENA_RIGHT+2]){
   g.fillStyle='#171021';g.fillRect(x-10,0,34,FLOOR);
   g.fillStyle='#6d337b';g.fillRect(x-7,0,28,FLOOR);
   g.fillStyle='#e9a64c';g.fillRect(x-7,0,28,9);
   g.fillStyle='#f7cf75';g.fillRect(x-3,9,4,FLOOR-9);
   g.fillStyle='#f7cf75';g.fillRect(x+15,9,4,FLOOR-9);
   for(let yy=25;yy<FLOOR-10;yy+=36){
    g.fillStyle='#301739';g.fillRect(x-4,yy,23,22);
    g.fillStyle='#d88fff';g.fillRect(x+5,yy+6,5,9);
    g.fillStyle='#ffdc86';g.fillRect(x+4,yy+5,7,2);
   }
  }g.restore();
 }
}
let jessicaAfterSnickersDone=false;let winstonPeachSummoned=false;let winstonPeachIntroDone=false;let winstonPeachGate=0;let winstonPeachGateActive=false;let winstonPeachGatePending=false;let guardWarningDone=false;let mysteryVoiceDone=false;let jessicaAfterHopeDone=false;let jessicaAfterHopeAt=null;let finishClock=0;
let deaths=0;
let bossCheckpoint='honey';
function activateBossCheckpoint(stage){
 const order=['honey','hope','snickers','winston','jessica'];
 if(order.indexOf(stage)<=order.indexOf(bossCheckpoint))return;
 bossCheckpoint=stage;checkpoint=true;say('CHECKPOINT · '+stage.toUpperCase(),110);
}
function restartBossCheckpoint(){
 const stage=bossCheckpoint;
 snickersFirstTrack.pause();rhythmTrack.pause();rhythm=null;snickersSongPhase=1;snickersFirstStats=null;
 if(stage==='honey'){reset(true);return;}
 reset(true);
 boss.active=false;boss.hp=0;boss.shots=[];arenaWall=false;honeyCameraLocked=false;
 tutorialDone=true;guardWarningDone=true;checkpoint=true;
 mode='postboss';hp=3;inv=90;carrots=12;
 projectiles=[];enemyShots=[];shockwaves=[];grab=null;laser=null;finale=null;
 secondBoss.active=false;secondBossWall=false;hopeCameraLocked=false;hopeGateIntro=0;secondShots=[];
 if(stage==='hope'){p.x=SECOND_ARENA_LEFT-110;}
 else{
  secondBoss.defeated=true;secondBoss.hp=0;secondBoss.deathStage='gone';
  jessicaAfterHopeDone=true;jessicaAfterHopeAt=null;
  if(stage==='snickers'){p.x=THIRD_ARENA_LEFT-105;}
  else{
   thirdBossPlaceholder.defeated=true;thirdBossPlaceholder.active=false;
   thirdBossPlaceholder.intro=false;thirdBossPlaceholder.realmPhase='';
   jessicaAfterSnickersDone=true;
   winstonPeachSummoned=true;winstonPeachIntroDone=false;
   winstonPeachGateActive=false;winstonPeachGatePending=false;winstonPeachGate=0;
   resetWinstonThrow();resetPeachCombat();winstonFarewell=null;
   p.x=stage==='winston'?7950:FINAL_DOOR_X-220;
   if(stage==='jessica'){
    winstonPeachSummoned=false;winstonPeachIntroDone=true;
    winstonThrow.defeated=true;sametOutroDone=true;portalOpen=true;
    enterJessicaLevel();hp=3;inv=90;
   }
  }
 }
 if(stage!=='jessica'){p.y=FLOOR-p.h;p.vx=0;p.vy=0;p.on=true;p.dir=1;cam=Math.max(0,Math.min(LENGTH-W,p.x-150));}
 keys.left=keys.right=keys.jump=keys.attack=keys.down=false;
 jumpHeld=false;attackHeld=false;
 syncBossMusic();say('CHECKPOINT · '+stage.toUpperCase(),120);
}
function reset(fromCheckpoint=false){if(!fromCheckpoint)bossCheckpoint='honey';stopJessicaFarewell();jessicaFarewellPlayed=false;if(!fromCheckpoint)infiniteAmmo=false;goldenCarrot=null;honeyCameraRelease=null;honeyPoseBlend={current:0,previous:0,since:0};finalPath={queenSpoken:false,queenFinished:false,doorTick:0,entered:false};resetWinstonThrow();resetPeachCombat();resetThirdBossPlaceholder();jessicaAfterSnickersDone=false;winstonPeachSummoned=false;winstonPeachIntroDone=false;winstonPeachGate=0;winstonPeachGateActive=false;winstonPeachGatePending=false;jessicaAfterHopeDone=false;jessicaAfterHopeAt=null;mysteryVoiceDone=fromCheckpoint;guardWarningDone=fromCheckpoint;honeyGateIntro=0;hopeGateIntro=0;honeyCameraLocked=false;hopeCameraLocked=false;if(!fromCheckpoint)deaths=0;sametOutroDone=false;sametOutro=null;talk=null;tutorialDone=false;stopBossMusic();++jessicaMenuFadeId;jessicaMenuMusic.pause();jessicaMenuMusic.currentTime=0;mode='play';finishClock=0;ending=null;portalOpen=false;level2Teaser=false;winClock=0;shake=0;frame=0;hp=3;carrots=0;score=0;inv=0;cam=-850;checkpoint=false;arenaWall=false;arenaCarrot=null;arenaCarrotRight=null;nextCarrotAt=0;arenaStartFrame=0;finale=null;finaleUsed=false;finaleSecondUsed=false;dialogueTimer=0;enrageSpeech=0;projectiles=[];enemyShots=[];particles=[];bossIntro=0;laser=null;shockwaves=[];grab=null;jumpHeld=false;attackHeld=false;hopeAttackLockedUntil=0;p={x:-850,y:FLOOR-34,w:22,h:34,vx:0,vy:0,on:false,dir:1,duck:false};platforms=[{x:-900,y:FLOOR,w:900,h:55},{x:0,y:FLOOR,w:LENGTH+200,h:55},{x:165,y:249,w:104,h:13},{x:380,y:222,w:106,h:13},{x:610,y:249,w:116,h:13},{x:865,y:224,w:106,h:13},{x:1110,y:249,w:120,h:13},{x:1390,y:222,w:105,h:13},{x:1640,y:245,w:110,h:13},{x:1950,y:244,w:115,h:13},{x:2340,y:244,w:115,h:13},{x:2700,y:224,w:100,h:13},{x:13015,y:239,w:95,h:13},{x:13150,y:228,w:75,h:13}];pickups=[140,210,425,465,675,910,1180,1450,1680,1880,2080,2320,2550,2760].map((x,i)=>({x,y:i%2?201:277,taken:false}));bunnies=[350,575,790,1010,1280,1550,1770].map((x,i)=>({x,base:x,y:FLOOR-22,w:27,h:22,dir:i%2?-1:1,alive:true,hop:0,hopSpeed:0,hopWait:35+i*21,attackCooldown:80+i*17}));initSecondArea();platforms.push(...[{x:3400,y:248,w:90},{x:3590,y:217,w:105},{x:3810,y:240,w:100},{x:4000,y:222,w:95},{x:SECOND_ARENA_LEFT+30,y:245,w:95},{x:SECOND_ARENA_RIGHT-130,y:245,w:95}].map(q=>({...q,secondArea:true})));// V187: Three permanent solid platforms in Winston & Peach arena.
// Player collision and normal platform rendering use the shared platforms array.
platforms.push(
 {x:8025,y:FLOOR-65,w:125,h:16,winstonArena:true},
 {x:8395,y:FLOOR-65,w:125,h:16,winstonArena:true},
 {x:8230,y:FLOOR-150,w:115,h:16,winstonArena:true}
);
boss={x:2425,y:FLOOR-66,w:39,h:66,hp:12,max:12,hit:0,cool:90,pattern:-1,attackTime:0,baseX:2425,baseY:FLOOR-66,airVy:0,slam:false,active:false,shots:[],phase:0,firstAttackPending:true};if(fromCheckpoint){checkpoint=true;tutorialDone=true;p.x=1870;p.y=FLOOR-p.h;p.on=true;cam=p.x-180;carrots=5;pickups=pickups.map(q=>({...q,taken:true}));bunnies.forEach(q=>q.alive=false);say('CHECKPOINT · HONEY',120);}else{say('SAMMLE KAROTTEN UND ERKUNDE DAS KÖNIGREICH!');}status.textContent=godMode?'TESTMODUS: Unverwundbar · Gegner greifen zufällig an':'SOULSLIKE: Schaden aktiv · 3 Herzen';}function overlap(a,b){return a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y}let godMode=false,shake=0,winClock=0,ending=null,portalOpen=false,level2Teaser=false;
function esatHurtbox(){const bottom=p.y+p.h;const height=(p.duck&&p.on)?33:53;return {x:p.x,y:bottom-height,w:p.w,h:height}}
function damage(){if(inv||(mode!=='play'&&!(mode==='postboss'&&((secondBoss&&secondBoss.active&&!secondBoss.defeated)||(winstonPeachGateActive&&winstonPeachGate>=1&&!winstonPeachGatePending)))))return;inv=58;shake=11;snd(170,.13);for(let i=0;i<15;i++)particles.push({x:p.x+12,y:p.y+15,vx:(Math.random()-.5)*7,vy:(Math.random()-.5)*6,t:28});if(!godMode){hp--;if(hp<=0){hp=0;deaths++;stopBossMusic();mode='dead';status.textContent=checkpoint?'Esat wurde besiegt. Neustart am Boss-Checkpoint.':'Esat wurde besiegt. Neustart am Levelanfang.'}}}
function bossDamage(){if(boss.hit||!boss.active||finale||dialogueTimer>0||enrageSpeech>0)return;boss.hp--;boss.hit=20;if(boss.hp===2&&!finaleUsed){finaleUsed=true;enrageSpeech=0;levelMusic.pause();bossMusic.pause();finale={stage:'speech',timer:999,clock:0,laser:null,extended:false};beginTalk([
 {speaker:'Honey',text:'Hahaha! Du dachtest wohl, die Vorstellung wäre schon vorbei?'},
 {speaker:'Honey',text:'Ich habe noch eine letzte Überraschung für dich!'},
 {speaker:'Honey',text:'DER LETZTE AKT BEGINNT JETZT!'}
],()=>{finale.stage='rise';finale.timer=75;finale.clock=0;syncBossMusic();});boss.cool=999;boss.slam=false;boss.jumpAttack=false;boss.airCast=false;grab=null;laser=null;boss.shots=[];shockwaves=[];say('HONEY: LETZTE RASEREI!',115);snd(110,.35)}if(boss.hp===1&&finaleUsed&&!finaleSecondUsed){finaleSecondUsed=true;if(!finale){finale={stage:'rise',timer:75,clock:0,laser:null,extended:true};boss.cool=999;boss.slam=false;boss.jumpAttack=false;boss.airCast=false;grab=null;laser=null;boss.shots=[];shockwaves=[];}else{finale.repeatAfter=true;}}score+=150;for(let i=0;i<18;i++)particles.push({x:boss.x+20,y:boss.y+28,vx:(Math.random()-.5)*6,vy:(Math.random()-.8)*5,t:32});snd(760,.17);say('TREFFER! NUTZE DAS ZEITFENSTER!',42);if(boss.hp<=0){boss.hp=0;mode='cutscene';ending={tick:0};portalOpen=false;boss.shots=[];enemyShots=[];projectiles=[];laser=null;grab=null;shockwaves=[];finale=null;enrageSpeech=0;dialogueTimer=0;shake=12;boss.y=boss.baseY;boss.x=boss.baseX;boss.cool=999;status.textContent='Honey ist besiegt ...';snd(280,.45)}}function updateSnickersDeath(){
 const b=thirdBossPlaceholder;
 if(!b||!b.deathStage)return false;
 frame++;shake=0;settleEsatDuringScene();
 if(b.deathStage==='kneel'){
  b.deathTick++;
  b.deathFrame=Math.min(4,Math.floor(b.deathTick/18));
  if(b.deathTick>=90){
   b.deathStage='lastWords';b.deathFrame=5;b.deathTick=0;
   beginTalk([
    {speaker:'SNICKERS',text:'DU HAST MEINEN GROOVE ZERSTÖRT! MEINEN GANZEN RHYTHMUS!'},
    {speaker:'SNICKERS',text:'Ich dachte, solange die Musik spielt, hätte ich einen Platz in dieser Welt ...'},
    {speaker:'SNICKERS',text:'Aber jetzt ist alles still. Und zum ersten Mal höre ich, wie allein ich wirklich bin.'},
    {speaker:'SNICKERS',text:'Meine Königin ... verzeiht mir. Mein letztes Lied war nicht gut genug.'}
   ],()=>{b.deathStage='collapse';b.deathTick=0;b.deathFrame=6;},'continue');
  }
 }else if(b.deathStage==='collapse'){
  b.deathTick++;
  b.deathFrame=Math.min(12,6+Math.floor(b.deathTick/11));
  if(b.deathTick>=77){b.deathStage='lying';b.deathTick=0;b.deathFrame=12;}
 }else if(b.deathStage==='lying'){
  b.deathTick++;b.deathFrame=12;
  if(b.deathTick>=180){b.deathStage='dissolve';b.deathTick=0;initSnickersDissolve(b);}
 }else if(b.deathStage==='dissolve'){
  b.deathTick++;b.deathFrame=12;
  if(b.deathTick>=150){b.deathStage=null;b.realmPhase='';b.defeated=true;b.active=false;b.gate=0;rhythm=null;syncBossMusic();say('SNICKERS IST BESIEGT!',160);}
 }
 return true;
}
function startWinstonPeachIntro(){
 winstonPeachIntroDone=true;
 beginTalk([
   {speaker:'Winston',text:'Du hast Honey, Hope und Snickers auf dem Gewissen …'},
   {speaker:'Winston',text:'Am liebsten würde ich dich hier und jetzt in Stücke reißen!'},
   {speaker:'Peach',text:'Wenn es nach uns ginge, würdest du diesen Ort nicht lebend verlassen.'},
   {speaker:'Winston',text:'Du kannst froh sein, dass unsere Königin uns verboten hat, dich zu töten.'},
   {speaker:'Winston',text:'Aber glaub mir … meine Geduld hat Grenzen!'},
   {speaker:'Peach',text:'Du wirst jetzt umkehren. Freiwillig oder mit Gewalt.'}
  ],()=>{
    // Like Snickers: dialogue first, then the two walls rise and boss music starts.
    winstonPeachGateActive=true;
    winstonPeachGatePending=true;
    winstonPeachGate=0;
    levelMusic.pause();bossMusic.pause();
  },'continue');

}

// Jessica step 1: isolated room; earlier world and Sarah teaser stay intact.
const jessicaStandingSprite=new Image();
jessicaStandingSprite.src='assets/images/jessica_stehend.png';
const jessicaCastingSprite=new Image();
jessicaCastingSprite.src='assets/images/jessica_zauberpose.png';
const JESSICA_STAND_LINE='Es tut mir leid, Esat. Aber ich werde nicht mitkommen.';
const JESSICA_CAST_LINE='Jessi … was machst du?';
const JESSICA_GLOW_LINE='Es ist nicht mehr viel Magie übrig. Aber für eine letzte Sache müsste es reichen.';
function jessicaFarewellPose(){
 if(!jessicaLevel||!jessicaLevel.throneSceneStarted)return 'seated';
 if(jessicaLevel.farewellStage==='teleport')return 'glow';
 if(!talk)return jessicaLevel.magicPose||'seated';
 const line=talk.lines[talk.index]?.text;
 const index=jessicaThroneFarewellLines.findIndex(x=>x.text===line);
 const stand=jessicaThroneFarewellLines.findIndex(x=>x.text===JESSICA_STAND_LINE);
 const cast=jessicaThroneFarewellLines.findIndex(x=>x.text===JESSICA_CAST_LINE);
 const glow=jessicaThroneFarewellLines.findIndex(x=>x.text===JESSICA_GLOW_LINE);
 const pose=glow>=0&&index>=glow?'glow':cast>=0&&index>=cast?'cast':stand>=0&&index>=stand?'stand':'seated';
 jessicaLevel.magicPose=pose;
 return pose;
}
function drawJessicaMagic(ex,ey,intensity){
 g.save();g.globalCompositeOperation='lighter';
 const pulse=.8+.2*Math.sin(frame*.16);
 for(let i=0;i<3;i++){
  g.strokeStyle=i===0?'rgba(172,70,255,.72)':'rgba(215,133,255,.46)';
  g.lineWidth=2+i;
  g.beginPath();g.ellipse(ex,ey,18+i*9+(pulse*3),29+i*9,frame*.016*(i%2?1:-1),0,Math.PI*2);g.stroke();
 }
 for(let i=0;i<24;i++){
  const a=i*2.399+frame*(i%2?.055:-.04);
  const radius=18+(i%6)*7+Math.sin(frame*.11+i)*5;
  const x=ex+Math.cos(a)*radius,y=ey+Math.sin(a)*radius*.85;
  g.fillStyle=i%3?'rgba(170,80,255,.85)':'rgba(255,215,190,.95)';
  g.fillRect(x,y,2+(i%3),3+(i%4));
 }
 if(intensity>1){
  g.strokeStyle='rgba(220,170,255,.9)';g.lineWidth=2;
  for(let i=0;i<5;i++){
   const a=i*1.26+frame*.13;
   g.beginPath();g.moveTo(ex,ey);
   g.lineTo(ex+Math.cos(a)*20,ey+Math.sin(a)*22);
   g.lineTo(ex+Math.cos(a+.3)*43,ey+Math.sin(a+.3)*45);g.stroke();
  }
 }
 g.restore();
}
const jessicaThroneSprite=new Image();
jessicaThroneSprite.src='assets/images/jessica_thron.png';
const JESSICA_LENGTH=1100,JESSICA_ZOOM=.65;
const JESSICA_VIEW_WIDTH=W/JESSICA_ZOOM;
function jessicaCameraX(){return Math.max(0,Math.min(JESSICA_LENGTH-JESSICA_VIEW_WIDTH,p.x-JESSICA_VIEW_WIDTH*.25));}
let jessicaLevel=null;
function jessicaSurfaceY(pl,x){
 return pl.y+(pl.slope||0)*Math.max(0,Math.min(1,(x-pl.x)/pl.w));
}
const jessicaCastleEntranceLines=[
 {speaker:'Esat',text:'Was ist hier los?'},
 {speaker:'Esat',text:'Alles brennt …'},
 {speaker:'Esat',text:'Jessica!!'},
 {speaker:'Esat',text:'Jessi, wo bist du?!'}
];
const jessicaThroneFarewellLines=[
 {speaker:"Esat",text:"Jessi! Endlich! Das ganze Schloss brennt! Wir müssen hier raus!"},
 {speaker:"Jessica",text:"Ich habe dir gesagt, dass du gehen sollst."},
 {speaker:"Esat",text:"Du kannst doch nicht einfach hier sitzen bleiben!"},
 {speaker:"Jessica",text:"Warum nicht? Du hast mir doch sowieso schon alles genommen."},
 {speaker:"Esat",text:"Jessi, bitte …"},
 {speaker:"Jessica",text:"NEIN! Jetzt hörst du mir einmal zu!"},
 {speaker:"Jessica",text:"Honey, Hope, Snickers, Winston … Sie waren meine Familie! Und du hast sie mir genommen!"},
 {speaker:"Esat",text:"Sie wollten mich umbringen! Ich hatte keine andere Wahl!"},
 {speaker:"Jessica",text:"ICH HABE IHNEN GESAGT, DASS SIE DIR NICHTS TUN SOLLEN!"},
 {speaker:"Esat",text:"Aber sie haben nicht auf dich gehört!"},
 {speaker:"Jessica",text:"Ich weiß … Sie wollten mich beschützen. Und jetzt sind sie wieder tot."},
 {speaker:"Esat",text:"Warum hast du diese Welt überhaupt erschaffen?"},
 {speaker:"Jessica",text:"Weil ich sie vermisst habe. Alle fünf."},
 {speaker:"Jessica",text:"In unserer Welt musste ich sie begraben. Einen nach dem anderen."},
 {speaker:"Jessica",text:"Aber hier konnte ich sie zurückholen. Sie waren plötzlich wieder bei mir."},
 {speaker:"Jessica",text:"Ich konnte sie streicheln, mit ihnen spielen und sie in meinen Armen halten."},
 {speaker:"Jessica",text:"Zum ersten Mal seit langer Zeit war ich wieder glücklich."},
 {speaker:"Esat",text:"Jetzt verstehe ich, warum du nicht zurückwolltest."},
 {speaker:"Jessica",text:"Hier hatte ich alles, was ich mir gewünscht habe."},
 {speaker:"Jessica",text:"Bis du gekommen bist."},
 {speaker:"Esat",text:"Ich wollte dir niemals wehtun!"},
 {speaker:"Jessica",text:"Aber das hast du! Und ausgerechnet du, Esat …"},
 {speaker:"Esat",text:"Ich wusste nicht, dass es deine Kaninchen sind!"},
 {speaker:"Jessica",text:"Und wenn du es gewusst hättest? Hättest du dann aufgehört?"},
 {speaker:"Esat",text:"Ich weiß es nicht. Aber ich hätte einen anderen Weg gesucht."},
 {speaker:"Jessica",text:"Du bist doch auch hier, weil du in der echten Welt nicht glücklich warst."},
 {speaker:"Jessica",text:"Du suchst ein Relikt, das dir deinen größten Wunsch erfüllt. Du willst geliebt werden."},
 {speaker:"Jessica",text:"Warum darfst du nach deinem Glück suchen, aber ich nicht nach meinem?"},
 {speaker:"Esat",text:"Vielleicht hast du recht. Aber ich will nicht, dass du daran zugrunde gehst."},
 {speaker:"Esat",text:"JESSI! DAS SCHLOSS STÜRZT EIN!"},
 {speaker:"Jessica",text:"Weißt du, warum es brennt?"},
 {speaker:"Jessica",text:"Diese Welt existiert durch meine Magie. Jede Wiederbelebung hat mich Kraft gekostet."},
 {speaker:"Jessica",text:"Am Anfang habe ich es kaum gespürt. Aber irgendwann wurde ich immer schwächer."},
 {speaker:"Jessica",text:"Und jetzt zerfällt meine Welt. Ich habe kaum noch Magie übrig."},
 {speaker:"Esat",text:"Dann komm mit mir zurück! Du musst nicht hierbleiben!"},
 {speaker:"Jessica",text:"Zurück in eine Welt, in der sie alle tot sind?"},
 {speaker:"Jessica",text:"Ich habe sie schon einmal verloren, Esat. Ich kann das nicht noch einmal."},
 {speaker:"Esat",text:"Jessi, ich weiß, dass ich vieles falsch gemacht habe. Aber ich bin trotzdem hier!"},
 {speaker:"Jessica",text:"Warum gibst du nicht endlich auf?"},
 {speaker:"Esat",text:"WEIL DU MIR WICHTIG BIST! Weil ich nicht zusehen kann, wie du hier stirbst!"},
 {speaker:"Jessica",text:"Du hast keine Ahnung, wie oft ich an unsere gemeinsame Zeit gedacht habe."},
 {speaker:"Jessica",text:"An unsere Gespräche, unsere Abende … Ich habe dich wirklich geliebt, Esat."},
 {speaker:"Esat",text:"Dann komm mit mir! Wir können neue Erinnerungen schaffen!"},
 {speaker:"Jessica",text:"Ich bin müde, Esat. So unglaublich müde."},
 {speaker:"Jessica",text:"Ich habe so lange versucht, alles festzuhalten. Und jedes Mal habe ich wieder jemanden verloren."},
 {speaker:"Esat",text:"Du musst nicht alleine damit klarkommen! Ich bin für dich da!"},
 {speaker:"Jessica",text:"Du kannst mir meine Kaninchen nicht zurückbringen."},
 {speaker:"Esat",text:"Nein … aber ich kann bei dir bleiben."},
 {speaker:"Jessica",text:"Es tut mir leid, Esat. Aber ich werde nicht mitkommen."},
 {speaker:"Esat",text:"WAS?! DU WILLST HIER STERBEN?!"},
 {speaker:"Jessica",text:"Diese Welt war mein Zuhause. Hier hatte ich meine Familie zurück."},
 {speaker:"Jessica",text:"Wenn sie jetzt verschwindet … dann bleibe ich bei ihr."},
 {speaker:"Esat",text:"NEIN! JESSI, BITTE!"},
 {speaker:"Jessica",text:"Glaubst du, mir fällt das leicht? Ich hatte doch endlich wieder alles …"},
 {speaker:"Esat",text:"DU BIST NOCH HIER! SOLANGE DU LEBST, IST NICHT ALLES VERLOREN!"},
 {speaker:"Jessica",text:"Vielleicht hast du recht … Aber ich schaffe es nicht mehr."},
 {speaker:"Esat",text:"Jessi … was machst du?"},
 {speaker:"Jessica",text:"Es ist nicht mehr viel Magie übrig. Aber für eine letzte Sache müsste es reichen."},
 {speaker:"Jessica",text:"Ich kann meine Welt nicht mehr retten. Aber dich vielleicht noch."},
 {speaker:"Esat",text:"NEIN! JESSI, HÖR AUF! WIR GEHEN ZUSAMMEN!"},
 {speaker:"Jessica",text:"Ich weiß … Genau deshalb muss ich es tun."},
 {speaker:"Esat",text:"JESSI, BITTE!"},
 {speaker:"Jessica",text:"Ich habe dich einmal geliebt, Esat … und vielleicht habe ich nie damit aufgehört."},
 {speaker:"Jessica",text:"Aber ich kann nicht mehr. Leb wohl …"},
 {speaker:"Esat",text:"JESSICAAAA!!!"}
];
// Jessica castle soundtrack: fades in on entry, loops until the throne dialogue.
const jessicaCrimsonMusic=new Audio('assets/audio/Crimson Flames.mp3');
jessicaCrimsonMusic.loop=true;
jessicaCrimsonMusic.preload='auto';
jessicaCrimsonMusic.volume=0;
let jessicaCrimsonFade=null;
function fadeJessicaCrimson(target,durationMs){
 if(jessicaCrimsonFade!==null)cancelAnimationFrame(jessicaCrimsonFade);
 const initial=jessicaCrimsonMusic.volume;
 const start=performance.now();
 function step(now){
  const progress=Math.min(1,(now-start)/durationMs);
  jessicaCrimsonMusic.volume=initial+(target-initial)*progress;
  if(progress<1)jessicaCrimsonFade=requestAnimationFrame(step);
  else{jessicaCrimsonFade=null;if(target===0)jessicaCrimsonMusic.pause();}
 }
 jessicaCrimsonFade=requestAnimationFrame(step);
}
function startJessicaCrimson(){
 levelMusic.pause();bossMusic.pause();
 if(jessicaCrimsonFade!==null){cancelAnimationFrame(jessicaCrimsonFade);jessicaCrimsonFade=null;}
 levelMusic.pause();bossMusic.pause();
 jessicaCrimsonMusic.pause();jessicaCrimsonMusic.currentTime=0;
 jessicaCrimsonMusic.volume=0;
 if(muted)return;
 const promise=jessicaCrimsonMusic.play();
 if(promise&&promise.catch)promise.catch(()=>{status.textContent='Crimson Flames: Audio konnte nicht gestartet werden – TON AN prüfen';});
 fadeJessicaCrimson(.20,2500);
}
function stopJessicaCrimson(){fadeJessicaCrimson(0,2200);}
// One-shot music for Jessica's final conversation.
const jessicaFarewellMusic=new Audio('assets/audio/jessica-farewell.mp3');
jessicaFarewellMusic.loop=false;
jessicaFarewellMusic.preload='auto';
let jessicaFarewellActive=false,jessicaFarewellPlayed=false,jessicaFarewellFade=null;
function stopJessicaFarewell(){
 if(jessicaFarewellFade!==null)cancelAnimationFrame(jessicaFarewellFade);
 jessicaFarewellFade=null;jessicaFarewellActive=false;
 jessicaFarewellMusic.pause();jessicaFarewellMusic.currentTime=0;
}
function startJessicaFarewell(){
 if(jessicaFarewellPlayed)return;
 jessicaFarewellPlayed=true;jessicaFarewellActive=true;
 levelMusic.pause();bossMusic.pause();
 if(jessicaCrimsonFade!==null)cancelAnimationFrame(jessicaCrimsonFade);
 jessicaCrimsonFade=null;jessicaCrimsonMusic.pause();
 jessicaFarewellMusic.currentTime=0;jessicaFarewellMusic.volume=0;
 jessicaFarewellMusic.muted=muted;
 jessicaFarewellMusic.play().catch(()=>{status.textContent='Abschiedsmusik: Bitte TON AN klicken';});
 let started=null;
 function fade(now){
  if(!jessicaFarewellActive)return;
  if(started===null)started=now;
  const progress=Math.min(1,(now-started)/2500);
  jessicaFarewellMusic.volume=.20*progress;
  jessicaFarewellFade=progress<1?requestAnimationFrame(fade):null;
 }
 jessicaFarewellFade=requestAnimationFrame(fade);
}
function fadeOutJessicaFarewell(duration=850){
 if(jessicaFarewellFade!==null)cancelAnimationFrame(jessicaFarewellFade);
 jessicaFarewellFade=null;
 const initialVolume=jessicaFarewellMusic.volume;
 let started=null;
 function fade(now){
  if(!jessicaFarewellActive)return;
  if(started===null)started=now;
  const progress=Math.min(1,(now-started)/duration);
  jessicaFarewellMusic.volume=initialVolume*(1-progress);
  if(progress<1)jessicaFarewellFade=requestAnimationFrame(fade);
  else stopJessicaFarewell();
 }
 jessicaFarewellFade=requestAnimationFrame(fade);
}
function startJessicaThroneFarewell(){
 if(jessicaLevel.throneSceneStarted)return;
 startJessicaFarewell();
 jessicaLevel.throneSceneStarted=true;
 jessicaLevel.spawnsStopped=true;
 jessicaLevel.ibizas=[];jessicaLevel.rabbits=[];
 p.vx=0;p.vy=0;p.on=true;
 beginTalk(jessicaThroneFarewellLines,()=>{
  jessicaLevel.farewellStage='teleport';
  jessicaLevel.farewellTimer=85;
  syncBossMusic();
 },'continue');
}
function enterJessicaLevel(){
 activateBossCheckpoint('jessica');
 stopJessicaFarewell();jessicaFarewellPlayed=false;
 startJessicaCrimson();
 jessicaLevel={platforms:[{x:0,y:FLOOR,w:JESSICA_LENGTH,h:55}],ladders:[],climbing:null,cameraY:0,entranceDelay:60,ibizas:[],ibizaClock:0,ibizaInv:0,rabbits:[],rabbitClock:0,rabbitInv:0,spawnsStopped:false,throneSceneStarted:false,farewellStage:null,farewellTimer:0,outsideArrival:0,outsideTitleClock:0,damageFlash:0,outsideEncounter:'approach',outsideTick:0,outsideSametX:0,outsidePortalEntered:false,outsidePortalShrink:0};
 for(let tier=1;tier<=6;tier++){
  const y=FLOOR-tier*100;
  const slope=tier===6?0:(tier%2?24:-24);
  const platform={x:0,y,w:JESSICA_LENGTH,h:14,slope};
  jessicaLevel.platforms.push(platform);
  const ladderX=tier%2?JESSICA_LENGTH-100:100;
  const lower=jessicaLevel.platforms[tier-1];
  jessicaLevel.ladders.push({x:ladderX,top:jessicaSurfaceY(platform,ladderX),bottom:jessicaSurfaceY(lower,ladderX)});
 }
 // Seed rabbits at different points of their descent so the first tiers aren't empty.
 // Keep the starting area clear and leave room for later rabbits from the throne.
 for(let tier=1;tier<=5;tier++){
  const count=tier<=3?3:2;
  for(let i=0;i<count;i++){
   // Even tiers travel left, odd tiers travel right, always toward lower tiers.
   const dir=tier%2===0?-1:1;
   const x=170+i*(tier<=3?290:390);
   const rabbit={tier,x,dir,w:23,h:22,speed:1.65+(tier+i)%3*.3,phase:(tier*2+i)*.7};
   rabbit.y=jessicaSurfaceY(jessicaLevel.platforms[tier],rabbit.x+rabbit.w/2)-rabbit.h;
   jessicaLevel.rabbits.push(rabbit);
  }
 }
 // Cars already descending on different tiers when Esat enters.
 for(const tier of [1,2,3,4,5]){
  const x=tier%2===0?790:330;
  const car={tier,x,dir:tier%2===0?-1:1,w:60,h:24};
  car.y=jessicaSurfaceY(jessicaLevel.platforms[tier],x+car.w/2)-car.h;
  jessicaLevel.ibizas.push(car);
 }
 mode='jessica';p={...p,x:80,y:FLOOR-34,w:22,h:34,vx:0,vy:0,on:true,dir:1,duck:false};
 cam=jessicaCameraX();shake=0;inv=0;
 for(const key of Object.keys(keys))keys[key]=false;
 jumpHeld=false;attackHeld=false;mouseShootHeld=false;keyboardShootHeld=false;
 status.textContent='Jessica · A/D: laufen · W/↑: Leiter hoch · S/↓: runter · Leertaste: springen';
 // The exclamation mark appears first; the conversation starts after 60 frames.
}
// A single turquoise Ibiza rolls down Jessica's platforms in a zigzag.
function updateJessicaIbiza(){
 const level=jessicaLevel;
 if(level.ibizaInv>0)level.ibizaInv--;
 if(!level.spawnsStopped&&++level.ibizaClock>=135&&level.ibizas.length<10){
  level.ibizaClock=0;
  level.ibizas.push({tier:6,x:JESSICA_LENGTH-110,dir:-1,w:60,h:24});
 }
 for(let i=level.ibizas.length-1;i>=0;i--){
  const car=level.ibizas[i];
  car.x+=car.dir*2.35;
  if(car.x<0||car.x+car.w>JESSICA_LENGTH){
   car.tier--;
   if(car.tier<=0){level.ibizas.splice(i,1);continue;}
   car.dir*=-1;
   car.x=car.dir>0?0:JESSICA_LENGTH-car.w;
  }
  car.y=jessicaSurfaceY(level.platforms[car.tier],car.x+car.w/2)-car.h;
  if(!godMode&&level.ibizaInv===0&&car.x<p.x+p.w&&car.x+car.w>p.x&&car.y<p.y+p.h&&car.y+car.h>p.y){
   hp=Math.max(0,hp-1);level.ibizaInv=70;level.damageFlash=24;inv=Math.max(inv,70);shake=Math.max(shake,8);snd(170,.13);
   if(hp<=0){deaths++;mode='dead';if(jessicaCrimsonFade!==null){cancelAnimationFrame(jessicaCrimsonFade);jessicaCrimsonFade=null;}jessicaCrimsonMusic.pause();levelMusic.pause();bossMusic.pause();return;}
  }
 }
}
function drawJessicaIbiza(){
 for(const car of jessicaLevel.ibizas){
  g.save();g.translate(Math.round(car.x),Math.round(car.y));
  if(car.dir>0){g.translate(car.w,0);g.scale(-1,1);}
  r(3,11,54,11,'#00665e');r(5,8,49,12,'#10a79a');
  r(18,2,24,11,'#008e87');r(21,4,17,7,'#203743');
  r(10,18,11,6,'#171923');r(44,18,11,6,'#171923');
  r(13,19,5,5,'#535762');r(47,19,5,5,'#535762');
  r(2,13,4,4,'#f8df98');r(55,14,3,4,'#b42c36');
  r(22,12,20,2,'#38d3bc');
  g.restore();
 }
}
// Rabbit waves descend from Jessica's throne, following the same zigzag route.
function updateJessicaRabbits(){
 const level=jessicaLevel;
 if(level.rabbitInv>0)level.rabbitInv--;
 level.rabbitClock++;
 if(!level.spawnsStopped&&level.rabbitClock>=90&&level.rabbits.length<16){
  level.rabbitClock=0;
  level.rabbits.push({tier:6,x:JESSICA_LENGTH-75,dir:-1,w:23,h:22,speed:1.65+Math.random()*.75,phase:Math.random()*6});
 }
 for(let i=level.rabbits.length-1;i>=0;i--){
  const rabbit=level.rabbits[i];
  rabbit.x+=rabbit.dir*rabbit.speed;
  if(rabbit.x<0||rabbit.x+rabbit.w>JESSICA_LENGTH){
   rabbit.tier--;
   // Tier 0 is Esat's safe starting floor: remove rabbits before they enter it.
   if(rabbit.tier<=0){level.rabbits.splice(i,1);continue;}
   rabbit.dir*=-1;
   rabbit.x=rabbit.dir>0?0:JESSICA_LENGTH-rabbit.w;
  }
  rabbit.y=jessicaSurfaceY(level.platforms[rabbit.tier],rabbit.x+rabbit.w/2)-rabbit.h;
  if(!godMode&&level.rabbitInv===0&&rabbit.x<p.x+p.w&&rabbit.x+rabbit.w>p.x&&rabbit.y<p.y+p.h&&rabbit.y+rabbit.h>p.y){
   hp=Math.max(0,hp-1);level.rabbitInv=75;level.damageFlash=24;inv=Math.max(inv,75);shake=Math.max(shake,8);snd(170,.13);
   if(hp<=0){deaths++;mode='dead';if(jessicaCrimsonFade!==null){cancelAnimationFrame(jessicaCrimsonFade);jessicaCrimsonFade=null;}jessicaCrimsonMusic.pause();levelMusic.pause();bossMusic.pause();return;}
  }
 }
}
function drawJessicaRabbits(){
 for(const rabbit of jessicaLevel.rabbits){
  g.save();
  g.translate(Math.round(rabbit.x+rabbit.w/2),Math.round(rabbit.y+rabbit.h));
  if(rabbit.dir>0)g.scale(-1,1);
  const hop=Math.sin(frame*.24+rabbit.phase)*1.5;
  g.translate(0,hop);
  r(-10,-22,7,13,'#f4dce8');r(2,-24,7,15,'#f4dce8');
  r(-8,-19,3,9,'#d88eaa');r(4,-21,3,9,'#d88eaa');
  r(-11,-12,22,12,'#f6e6ed');r(-10,-2,8,3,'#bca1b7');r(3,-2,8,3,'#bca1b7');
  r(-7,-10,3,3,'#50263f');r(4,-10,3,3,'#50263f');
  r(-2,-6,4,3,'#c95c83');r(9,-9,5,6,'#f7ecf2');
  g.restore();
 }
}
const jessicaOutsideWisdom=[
 {speaker:"Samet",text:"Abi? Da bist du ja endlich!"},
 {speaker:"Samet",text:"Hey … was ist passiert? Du siehst völlig fertig aus."},
 {speaker:"Esat",text:"Es ist wegen Jessica …"},
 {speaker:"Samet",text:"Was ist mit ihr?"},
 {speaker:"Esat",text:"Ihr Schloss hat gebrannt. Ich wollte sie retten, aber sie wollte nicht mitkommen."},
 {speaker:"Esat",text:"Sie hat mich wegteleportiert und ist dort geblieben."},
 {speaker:"Samet",text:"Oh Mann … das tut mir leid."},
 {speaker:"Esat",text:"Ich weiß nicht mal, ob sie noch lebt."},
 {speaker:"Samet",text:"Das wissen wir beide nicht. Vielleicht hat sie es irgendwie geschafft."},
 {speaker:"Esat",text:"Ich hätte mehr tun müssen …"},
 {speaker:"Samet",text:"Du hast alles versucht. Du kannst nicht jeden Menschen retten."},
 {speaker:"Esat",text:"Ich wollte doch einfach nur glücklich werden …"},
 {speaker:"Samet",text:"Und genau deshalb darfst du jetzt nicht aufgeben."},
 {speaker:"Esat",text:"Was bringt mir das alles noch, Samet? Schau doch, was passiert ist."},
 {speaker:"Samet",text:"Ich weiß, dass es gerade schwer ist. Aber erinner dich daran, warum du überhaupt hierhergekommen bist."},
 {speaker:"Esat",text:"Wegen des Relikts …"},
 {speaker:"Samet",text:"Genau. Du hast dein Ziel noch nicht erreicht."},
 {speaker:"Samet",text:"Du bist in diese Welt gekommen, weil du dir ein anderes Leben gewünscht hast. Ein Leben, in dem du endlich glücklich bist."},
 {speaker:"Esat",text:"Und du glaubst wirklich, dass dieses Relikt das ändern kann?"},
 {speaker:"Samet",text:"Ich glaube, dass es dir die Chance geben kann, das Leben zu führen, das du dir schon immer gewünscht hast."},
 {speaker:"Samet",text:"Stell dir vor … keine einsamen Abende mehr. Kein Gefühl mehr, dass dir irgendetwas fehlt."},
 {speaker:"Samet",text:"Ein Leben, in dem du morgens aufwachst und dich wirklich auf den Tag freust."},
 {speaker:"Esat",text:"Das klingt fast zu schön, um wahr zu sein …"},
 {speaker:"Samet",text:"Vielleicht. Aber willst du wirklich umkehren, ohne herauszufinden, ob es möglich ist?"},
 {speaker:"Esat",text:"Nein … eigentlich nicht."},
 {speaker:"Samet",text:"Na also, Abi. Du hast schon so viel geschafft. Jetzt fehlt nur noch der letzte Teil deiner Reise. Ich glaube an dich."},
 {speaker:"Esat",text:"Danke, Samet … Ich weiß nicht, was ich ohne dich machen würde. Du bist wirklich der beste Bruder, den man sich wünschen kann."}
];
// ALINA-STURMWELT – erster spielbarer Prototyp nach Jessicas letztem Portal.
// Eigenstaendiger Zustand: keine Aenderungen an bisherigen Bossen.
const STORM_LENGTH=1800;
let storm=null;

const stormAlinaLines=[
 {speaker:"Esat",text:"Alina?! Was ... was machst du hier?"},
 {speaker:"Alina",text:"Esat. Ausgerechnet du. Ich hätte nicht gedacht, dass du es bis hierher schaffst."},
 {speaker:"Esat",text:"Ich weiß nicht, was hier vor sich geht. Diese Welt ... die Blitze, der Sturm ... Ich will einfach nur nach Hause."},
 {speaker:"Alina",text:"Dann bist du an einem denkbar schlechten Ort gelandet."},
 {speaker:"Esat",text:"Was soll das heißen?"},
 {speaker:"Alina",text:"Ich bin die Wächterin dieser Welt. Und ich beschütze etwas, das niemals in die falschen Hände geraten darf."},
 {speaker:"Esat",text:"Was beschützt du?"},
 {speaker:"Alina",text:"Das Relikt des Schicksals. Ein uraltes Relikt, das seinem Träger Kräfte verleiht, die selbst die Grenzen dieser Welten überwinden können."},
 {speaker:"Esat",text:"Ich habe keine Ahnung von irgendeinem Relikt. Ich bin nicht hier, um dir etwas wegzunehmen."},
 {speaker:"Alina",text:"Und trotzdem stehst du vor mir. Nach allem, was du in den anderen Welten durchgemacht hast ... glaubst du wirklich, dass das Zufall ist?"},
 {speaker:"Esat",text:"Ich weiß nur, dass ich beinahe gestorben wäre. Mehr als einmal. Ich habe nicht vor, hier auch noch mein Leben zu verlieren."},
 {speaker:"Alina",text:"Dann solltest du umkehren. Denn ich werde niemanden an das Relikt heranlassen."},
 {speaker:"Esat",text:"Du verstehst nicht. Ich kann nicht zurück. Ich muss einen Weg aus dieser Welt finden."},
 {speaker:"Alina",text:"Dann bleibt dir wohl nur, mich zu überwinden."},
 {speaker:"Esat",text:"Muss es wirklich so weit kommen? Ich will nicht gegen dich kämpfen, Alina."},
 {speaker:"Alina",text:"Du unterschätzt mich. Ich bin mächtig genug, dieses Relikt ganz allein zu beschützen. Selbst der Entwickler dieses Spiels hielt es nicht für nötig, mir Minibosse oder andere Gegner zur Seite zu stellen."},
 {speaker:"Esat",text:"Oder er hatte einfach keine Lust, noch mehr Gegner einzubauen."},
 {speaker:"Alina",text:"... Pass auf, was du sagst, Esat."},
 {speaker:"Esat",text:"Tut mir leid. Aber ich meine es ernst. Ich will dir nichts wegnehmen. Lass mich einfach gehen."},
 {speaker:"Alina",text:"Ich kann dir nicht vertrauen. Nicht bei dem, was hier auf dem Spiel steht."},
 {speaker:"Esat",text:"Dann lässt du mir keine andere Wahl."},
 {speaker:"Alina",text:"Du hast keine Vorstellung davon, welche Macht ich besitze. Aber wenn du unbedingt weitergehen willst ..."},
 {speaker:"Alina",text:"... dann zeige ich dir, warum dieses Relikt seit Jahrhunderten unberührt geblieben ist."},
 {speaker:"Esat",text:"Ich habe nicht so weit gekämpft, um jetzt aufzugeben."},
];
const alinaSprite=new Image();
alinaSprite.src='assets/images/alina_sprite_blond_freigestellt.png';
const alinaSyringeFrames=Array.from({length:6},(_,i)=>{const im=new Image();im.src='assets/images/alina_spritze_'+String(i+1).padStart(2,'0')+'.png';return im;});
const stormTaunts=[
 'Nicht mal eine ordentliche Trefferanimation?!',
 'Sarah bekommt DREI Phasen und ich nicht mal einen Miniboss?!',
 'DAS musste ich übrigens selbst programmieren!',
 'Wenn ich verliere, hat der Entwickler mich absichtlich generft!'
];
function stormMagicSound(kind){
 if(muted)return;
 try{
  const Ctx=window.AudioContext||window.webkitAudioContext;
  if(!Ctx)return;
  const ctx=stormMagicSound.ctx||(stormMagicSound.ctx=new Ctx());
  if(ctx.state==='suspended')ctx.resume().catch(()=>{});
  const osc=ctx.createOscillator(),gain=ctx.createGain(),now=ctx.currentTime;
  osc.type=kind==='impact'?'sawtooth':kind==='portal'?'triangle':'sine';
  const start=kind==='impact'?170:kind==='portal'?120:650;
  const end=kind==='impact'?45:kind==='portal'?420:110;
  osc.frequency.setValueAtTime(start,now);osc.frequency.exponentialRampToValueAtTime(end,now+.42);
  gain.gain.setValueAtTime(.0001,now);
  gain.gain.exponentialRampToValueAtTime(kind==='impact'?.17:.09,now+.025);
  gain.gain.exponentialRampToValueAtTime(.0001,now+.45);
  osc.connect(gain);gain.connect(ctx.destination);osc.start(now);osc.stop(now+.47);
 }catch(e){}
}
function stormElectricSound(){
 if(muted)return;
 try{
  const Ctx=window.AudioContext||window.webkitAudioContext;
  if(!Ctx)return;
  const ctx=stormMagicSound.ctx||(stormMagicSound.ctx=new Ctx());
  if(ctx.state==='suspended')ctx.resume().catch(()=>{});
  const now=ctx.currentTime,duration=.55;
  const buffer=ctx.createBuffer(1,Math.ceil(ctx.sampleRate*duration),ctx.sampleRate);
  const samples=buffer.getChannelData(0);
  for(let i=0;i<samples.length;i++){
   const env=Math.pow(1-i/samples.length,1.4);
   const crackle=(i%Math.floor(ctx.sampleRate*.025)<ctx.sampleRate*.006)?1:.24;
   samples[i]=(Math.random()*2-1)*env*crackle;
  }
  const source=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain();
  source.buffer=buffer;filter.type='highpass';filter.frequency.value=420;
  gain.gain.setValueAtTime(.0001,now);gain.gain.linearRampToValueAtTime(.16,now+.015);
  gain.gain.exponentialRampToValueAtTime(.0001,now+duration);
  source.connect(filter);filter.connect(gain);gain.connect(ctx.destination);
  source.start(now);
 }catch(e){}
}
const STORM_ARENA_LEFT=295,STORM_ARENA_RIGHT=875;
const STORM_ARENA_PLATFORM={x:510,y:FLOOR-72,w:130,h:12};
let stormAlinaCheckpoint=false;
const alinaTitleImage=new Image();
alinaTitleImage.src='assets/images/alina-startbildschirm-ohne-esat.png';
const alinaEsatFrames=Array.from({length:8},(_,i)=>{
 const img=new Image(),file='esat_mantel_'+String(i+1).padStart(2,'0')+'.png';
 // Support both the documented location and a folder copied to the project root.
 const locations=['assets/images/esat-mantel/','assets/images/esat_mantel_8_frames/','esat_mantel_8_frames/','assets/esat-mantel/'];
 let attempt=0;
 img.onerror=()=>{if(++attempt<locations.length)img.src=locations[attempt]+file;};
 img.src=locations[0]+file;
 return img;
});
let alinaEsatAnimStart=0;
let alinaStartFeedbackAt=0;
let alinaPlayHover=false;
function alinaPlayBounds(){
 const scale=alinaTitleImage.naturalWidth?Math.min(W/alinaTitleImage.naturalWidth,H/alinaTitleImage.naturalHeight):1;
 const dw=alinaTitleImage.naturalWidth?alinaTitleImage.naturalWidth*scale:W;
 const dh=alinaTitleImage.naturalHeight?alinaTitleImage.naturalHeight*scale:H;
 return {x:W/2,y:(H-dh)/2+dh*.79,w:dw*.31,h:dh*.105};
}
function drawAlinaPlayButton(){
 const b=alinaPlayBounds(),now=performance.now(),pressed=!!alinaStartFeedbackAt;
 const elapsed=pressed?now-alinaStartFeedbackAt:0;
 const open=pressed?Math.min(1,Math.max(0,(elapsed-130)/630)):0;
 const ease=open*open*(3-2*open),hover=alinaPlayHover&&!pressed;
 const half=b.w*.5,hh=b.h*.5,shift=ease*b.w*.32;
 // Slow heartbeat-style glow while hovered, with a soft double pulse.
 const beat=hover?Math.pow(Math.max(0,Math.sin(now*Math.PI/850)),3):0;
 const pulse=hover?0.25+0.75*beat:0;
 g.save();g.translate(b.x,b.y);
 // Continuous gothic frame: no visible X or central seam before opening.
 g.shadowColor=hover?'#b34dff':'#2b0a46';g.shadowBlur=hover?12+26*pulse:5;
 g.fillStyle='#0a0817';g.strokeStyle=hover?'rgba(224,169,255,'+(0.65+0.35*pulse)+')':'#9e84b7';g.lineWidth=hover?2.5+1.4*pulse:2.5;
 g.beginPath();g.moveTo(-half+16,-hh);g.lineTo(half-16,-hh);g.lineTo(half+4,0);g.lineTo(half-16,hh);g.lineTo(-half+16,hh);g.lineTo(-half-4,0);g.closePath();g.fill();g.stroke();
 g.shadowBlur=0;
 if(hover){
  g.save();g.globalAlpha=0.12+0.23*pulse;g.shadowColor='#c05cff';g.shadowBlur=18+24*pulse;
  g.strokeStyle='#b54bff';g.lineWidth=3+2*pulse;
  g.beginPath();g.moveTo(-half+16,-hh);g.lineTo(half-16,-hh);g.lineTo(half+4,0);g.lineTo(half-16,hh);g.lineTo(-half+16,hh);g.lineTo(-half-4,0);g.closePath();g.stroke();g.restore();
 }
 if(pressed){
  g.save();g.globalAlpha=Math.min(1,open*2.6);
  g.shadowColor='#b97bff';g.shadowBlur=25;g.fillStyle='#e7c9ff';
  g.beginPath();g.ellipse(0,-hh*.11,hh*.54,hh*.60,0,Math.PI,Math.PI*2);g.lineTo(hh*.46,hh*.28);g.lineTo(-hh*.46,hh*.28);g.closePath();g.fill();
  g.fillStyle='#2b0848';g.shadowBlur=0;
  for(const side of [-1,1]){g.beginPath();g.moveTo(side*hh*.4,-hh*.08);g.lineTo(side*hh*.09,-hh*.08);g.lineTo(side*hh*.24,hh*.18);g.closePath();g.fill();}
  g.beginPath();g.moveTo(0,hh*.08);g.lineTo(-hh*.11,hh*.28);g.lineTo(hh*.11,hh*.28);g.closePath();g.fill();
  g.strokeStyle='#4b1766';g.lineWidth=2;
  for(let i=-2;i<=2;i++){g.beginPath();g.moveTo(i*hh*.13,hh*.30);g.lineTo(i*hh*.13,hh*.46);g.stroke();}
  g.restore();
 }
 // Two doors are clipped to their respective halves; at rest they look like one plaque.
 for(const side of [-1,1]){
  g.save();g.translate(side*shift,0);
  g.beginPath();g.rect(side<0?-half-8:0,-hh-12,half+8,2*hh+24);g.clip();
  const grad=g.createLinearGradient(0,-hh,0,hh);
  grad.addColorStop(0,'#373044');grad.addColorStop(.2,'#171324');grad.addColorStop(.5,'#0b0918');grad.addColorStop(.8,'#20172e');grad.addColorStop(1,'#3c304b');
  g.fillStyle=grad;g.beginPath();g.moveTo(-half+16,-hh+3);g.lineTo(half-16,-hh+3);g.lineTo(half,0);g.lineTo(half-16,hh-3);g.lineTo(-half+16,hh-3);g.lineTo(-half,0);g.closePath();g.fill();
  g.strokeStyle=hover?'#bd7bef':'#806098';g.lineWidth=1.2;
  g.beginPath();g.moveTo(-half+19,-hh+8);g.lineTo(half-19,-hh+8);g.moveTo(-half+19,hh-8);g.lineTo(half-19,hh-8);g.stroke();
  g.restore();
 }
 if(!pressed){
  // Crystal ornaments at top/bottom replace the old X.
  for(const sign of [-1,1]){
   const cy=sign*hh*.96;
   g.save();g.shadowColor='#a74aff';g.shadowBlur=hover?13:5;
   g.fillStyle='#5b2687';g.strokeStyle='#d9b6ff';g.lineWidth=1.3;
   g.beginPath();g.moveTo(0,cy-sign*hh*.36);g.lineTo(hh*.22,cy);g.lineTo(0,cy+sign*hh*.24);g.lineTo(-hh*.22,cy);g.closePath();g.fill();g.stroke();g.restore();
  }
  g.save();g.textAlign='center';g.textBaseline='middle';
  // Lettering breathes in sync with the frame's heartbeat.
  const textScale=hover?1+0.065*pulse:1;
  g.scale(textScale,textScale);
  g.font='bold '+Math.max(14,Math.round(b.h*.43))+'px Georgia, serif';
  // The letters themselves shift from pale lavender to vivid purple on each pulse.
  g.shadowColor=hover?'#b000ff':'#a68cda';g.shadowBlur=hover?9+30*pulse:2;
  g.fillStyle=hover?'rgb('+Math.round(230-64*pulse)+','+Math.round(217-143*pulse)+','+Math.round(241+14*pulse)+')':'#e6d9f1';
  g.fillText('SPIELEN',0,1);g.restore();
  g.save();g.strokeStyle=hover?'#d7a4ff':'#9677b5';g.lineWidth=1.5;
  for(const side of [-1,1]){
   const x=side*b.w*.39;g.beginPath();g.moveTo(x,-hh*.16);g.lineTo(x+side*hh*.16,0);g.lineTo(x,hh*.16);g.lineTo(x-side*hh*.16,0);g.closePath();g.stroke();
  }g.restore();
 }
 g.restore();
}
function confirmAlinaStart(){if(mode!=='stormTitle'||alinaStartFeedbackAt)return;if(!window.esatUnlock?.released('alina')){alert(window.esatUnlock?.message('alina')||'Gesperrt bis 27.11.2026, 18:00 Uhr');return;}alinaStartFeedbackAt=performance.now();status.textContent='ALINA · WELT WIRD GELADEN …';}
function enterStormTitle(){stopAlinaAmbient();alinaFightMusic.pause();alinaFightMusic.currentTime=0;++jessicaMenuFadeId;for(const track of [jessicaMenuMusic,jessicaCrimsonMusic,jessicaFarewellMusic,bossMusic,levelMusic]){track.pause();track.currentTime=0;}mode='stormTitle';alinaStartFeedbackAt=0;alinaPlayHover=false;alinaEsatAnimStart=performance.now();talk=null;status.textContent='ALINA · DIE STURMWELT';alinaTitleMusic.currentTime=0;startAlinaTitleMusic();}
function enterStormLevel(){if(!window.esatUnlock?.released('alina')||!window.esatUnlock?.sarahCompleted()){alert(!window.esatUnlock?.sarahCompleted()?'🔒 Schließe zuerst Sarahs Level ab!':window.esatUnlock.message('alina'));return;}
 stopAlinaAmbient();alinaTitleMusic.pause();alinaTitleMusic.currentTime=0;
 alinaFightMusic.pause();alinaFightMusic.currentTime=0;
 // Entering Alina must cancel Jessica's menu fade and silence every previous soundtrack.
 ++jessicaMenuFadeId;
 for(const track of [jessicaMenuMusic,jessicaCrimsonMusic,jessicaFarewellMusic,rhythmTrack,snickersFirstTrack,bossMusic,levelMusic,sametBetrayalMusic]){
  track.pause();track.currentTime=0;
 }
 jessicaMenuMusic.volume=.10;
 sametBetrayalMusic.pause();sametBetrayalMusic.currentTime=0;
 storm={stage:'walk',time:0,chestX:220,chestOpened:false,chestReveal:0,magicUnlocked:false,artifactCollected:false,portalX:STORM_LENGTH-88,portalScene:'none',sametX:0,sametTimer:0,sametHasArtifact:false,pushTarget:0,pushStart:0,pushAfterimage:[],pushImpact:0,evilPortalTime:0,spellTimer:0,spellX:0,spellY:0,spellFromX:0,spellFromY:0,sametLeapX:0,sametLeapY:0,alinaX:790,alinaIntroTime:0,alinaIntroImpact:false,lightning:0,bossHp:65,bossMax:65,shots:[],poisonBursts:[],shotClock:0,syringeAnim:0,shockAnim:0,shockBeams:[],attackNumber:0,attackType:Math.random()<.5?'electric':'syringe',ultimateAttackCount:0,nextBeamHp:26,lowHpPhase:'beam',arenaWallRise:0,knifeClock:0,knifeWave:null,clash:null,clashCooldown:0,clashClicks:0,playerShotClock:0,pendingMagicClicks:0,chargeFrames:0,chargeActive:false,chargeReady:false,chargePower:0,magicOrbs:[],magicBursts:[],shootWasHeld:false,taunt:'',tauntTimer:0,tauntIndex:0,inv:0,win:false};
 if(stormAlinaCheckpoint){
  // Retry begins just after the chest, with blue magic already unlocked.
  // Alina is ready for a fresh fight; her introduction and dialogue are skipped.
  storm.chestOpened=true;storm.magicUnlocked=true;storm.stage='fight';
  storm.shotClock=0;storm.attackNumber=0;storm.attackType=Math.random()<.5?'electric':'syringe';storm.ultimateAttackCount=0;storm.nextBeamHp=storm.bossMax*.4;storm.lowHpPhase='beam';storm.bossHp=storm.bossMax;
 }
 mode='storm';p={...p,x:stormAlinaCheckpoint?storm.chestX+95:90,y:FLOOR-34,w:22,h:34,vx:0,vy:0,on:true,dir:1,duck:false};
 cam=0;shake=0;inv=0;hp=Math.max(3,hp);
 for(const key of Object.keys(keys))keys[key]=false;
 jumpHeld=false;attackHeld=false;mouseShootHeld=false;keyboardShootHeld=false;
 status.textContent=stormAlinaCheckpoint?'CHECKPOINT · MAGIE FREIGESCHALTET · ALINA':'ALINA · DIE STURMWELT';
 if(stormAlinaCheckpoint)startAlinaFightMusic();else {levelMusic.pause();bossMusic.pause();playAlinaAmbient(true);}
}
// Green test shortcut: jump directly to Alina's defeated state and collect the relic.
const stormArtifactTestButton=document.createElement('button');
stormArtifactTestButton.textContent='🟢 Direkt zum Relikt';
stormArtifactTestButton.title='Alina überspringen und direkt das Relikt des Schicksals testen';
stormArtifactTestButton.style.cssText='margin:6px;padding:9px 13px;background:#147d38;color:white;border:2px solid #80f5a4;border-radius:8px;cursor:pointer;font-weight:bold';
document.getElementById('game').insertAdjacentElement('afterend',stormArtifactTestButton);
stormArtifactTestButton.onclick=()=>{
 enterStormLevel();
 storm.stage='won';storm.bossHp=0;storm.magicUnlocked=true;storm.chestOpened=true;
 p.x=storm.alinaX-45;p.y=FLOOR-p.h;p.vy=0;p.on=true;p.dir=1;
 cam=Math.max(0,Math.min(STORM_LENGTH-W,p.x-W*.35));
 status.textContent='TEST: Relikt des Schicksals';
};
const alinaDeathFrames=Array.from({length:14},(_,i)=>{const img=new Image();img.src='assets/images/alina_tod_'+String(i+1).padStart(2,'0')+'.png';return img;});
const ALINA_DEATH_FRAME_TICKS=7;
function startAlinaDeath(){
 storm.stage='dying';storm.deathTicks=0;storm.bossHp=0;
 storm.clash=null;storm.knifeWave=null;storm.shots=[];storm.shockBeams=[];storm.magicOrbs=[];
 storm.chargeActive=false;storm.chargeReady=false;storm.pendingMagicClicks=0;
 alinaFightMusic.pause();
 playAlinaAmbient(true);
}
// Pink debug shortcut: reduce Alina to one HP without skipping her death animation.
const alinaOneHpButton=document.createElement('button');
alinaOneHpButton.textContent='💗 Alina auf 1 HP';
alinaOneHpButton.title='Setzt Alinas Leben während des Bosskampfs auf 1 HP';
alinaOneHpButton.style.cssText='margin:6px;padding:9px 13px;background:#ed4da8;color:#fff;border:2px solid #ffc1e6;border-radius:8px;cursor:pointer;font-weight:bold';
document.getElementById('game').insertAdjacentElement('afterend',alinaOneHpButton);
alinaOneHpButton.onclick=()=>{
 if(mode!=='storm'||!storm||storm.stage!=='fight')return;
 storm.bossHp=1;
 storm.nextBeamHp=-1;
 storm.lowHpPhase='knife';
 storm.clash=null;storm.clashCooldown=0;storm.knifeWave=null;
 storm.shots=[];storm.shockBeams=[];
 storm.shotClock=0;storm.knifeClock=0;
};
const alinaArtifactImage=new Image();alinaArtifactImage.src='assets/images/alina_artefakt_verjuengung.png';
function stormSay(message){
 storm.taunt=message;storm.tauntTimer=155;
}
function updateStormLevel(){
 if(storm&&storm.stage!=='fight'&&!alinaFightMusic.paused)alinaFightMusic.pause();
 if(!storm)return;
 storm.time++;storm.lightning=Math.max(0,storm.lightning-1);
 // Trigger Samet's red rage aura only once he shouts at Esat.
 if(storm.portalScene==='sametStole'&&talk){
  const line=talk.lines[talk.index];
  const rageStart=line&&line.text.includes('DU SOLLST LEISE SEIN');
  if(rageStart)storm.cinematicRageStarted=true;
  const rageTrigger=line&&storm.cinematicRageStarted&&(
   rageStart||line.text.includes('DU HAST KEINE AHNUNG')||
   line.text.includes('ICH BIN NICHT WIE MEIN VATER')||
   line.text.includes('ES GIBT KEIN WIR MEHR')
  );
  if(storm.cinematicLine!==talk.index){
   storm.cinematicLine=talk.index;
   if(rageTrigger){shake=Math.max(shake,17);storm.lightning=18;stormMagicSound('impact');}
  }
  if(storm.cinematicRageStarted){
   storm.cinematicRage=Math.min(1,(storm.cinematicRage||0)+.035);
   if(storm.time%22===0){storm.lightning=12;shake=Math.max(shake,5);}
  }
 }
 if(storm.stage==='dyingTalk'){
  p.vx=0;p.vy=0;return;
 }
 if(storm.stage==='dyingFinish'){
  storm.deathTicks++;p.vx=0;p.vy=0;
  if(storm.deathTicks>=alinaDeathFrames.length*ALINA_DEATH_FRAME_TICKS){
   storm.deathTicks=alinaDeathFrames.length*ALINA_DEATH_FRAME_TICKS-1;
   storm.stage='dissolving';storm.dissolveTicks=0;
  }
  return;
 }
 if(storm.stage==='dissolving'){
  storm.dissolveTicks++;p.vx=0;p.vy=0;
  if(storm.dissolveTicks>=120){storm.stage='won';}
  return;
 }
 if(storm.stage==='dying'){
  storm.deathTicks++;
  p.vx=0;p.vy=0;
  if(storm.deathTicks>= (alinaDeathFrames.length-5)*ALINA_DEATH_FRAME_TICKS){
   storm.deathTicks=(alinaDeathFrames.length-5)*ALINA_DEATH_FRAME_TICKS-1;
   storm.stage='dyingTalk';
   beginTalk([
    {speaker:'Alina',text:'Nein … das … das kann nicht sein …'},
    {speaker:'Esat',text:'Alina …'},
    {speaker:'Alina',text:'Über hundert Jahre …'},
    {speaker:'Alina',text:'Über hundert Jahre habe ich dieses Relikt beschützt. Niemand konnte es mir wegnehmen.'},
    {speaker:'Alina',text:'Ich habe unzählige Menschen aufgehalten, die versucht haben, es an sich zu reißen.'},
    {speaker:'Alina',text:'Und jetzt … ausgerechnet du …'},
    {speaker:'Esat',text:'Es tut mir leid, Alina.'},
    {speaker:'Alina',text:'Weißt du, was das Schlimmste daran ist, Esat?'},
    {speaker:'Alina',text:'Damals im Krankenhaus habe ich alles getan, damit du weiterleben kannst.'},
    {speaker:'Alina',text:'Ich hätte niemals gedacht, dass du eines Tages derjenige sein würdest, der mein Leben beendet.'},
    {speaker:'Esat',text:'Ich wollte nicht, dass es so endet …'},
    {speaker:'Alina',text:'Doch, Esat. Du hast mir gesagt, dass du bereit bist, mich zu töten.'},
    {speaker:'Esat',text:'…'},
    {speaker:'Alina',text:'Ich hoffe nur … dass dieses Relikt all das wert ist, was du dafür geopfert hast.'},
    {speaker:'Esat',text:'Alina, bitte …'},
    {speaker:'Alina',text:'Meine Aufgabe … ist vorbei.'},
    {speaker:'Alina',text:'Nach über hundert Jahren … darf ich endlich ruhen …'},
    {speaker:'Alina',text:'Leb wohl … Esat …'},
    {speaker:'Esat',text:'Leb wohl, Alina …'},
    {speaker:'Esat',text:'Du bist eine sehr schöne Frau …'},
    {speaker:'Esat',text:'… aber Jessica ist immer noch die Schönste.'}
   ],()=>{storm.stage='dyingFinish';},'keep');
  }
  return;
 }
 if(storm.time%170===0)storm.lightning=7;
 if(storm.tauntTimer>0)storm.tauntTimer--;
 if(storm.inv>0)storm.inv--;
 if(storm.pushImpact>0)storm.pushImpact--;
 // Cutscenes and dialogue never queue or fire player attacks.
 if(talk||storm.portalScene!=='none'){
  storm.pendingMagicClicks=0;storm.chargeActive=false;storm.chargeReady=false;storm.chargeFrames=0;storm.shootWasHeld=true;
  storm.magicOrbs.length=0;storm.magicBursts.length=0;
  keys.attack=false;attackHeld=false;mouseShootHeld=false;keyboardShootHeld=false;
  if(talk){p.vx=0;return;}
 }
 const left=keys.left||keys.a,right=keys.right||keys.d;
 p.vx=(right?3.1:0)-(left?3.1:0);
 if(storm.portalScene!=='none')p.vx=0;
 if(keys.down&&p.on&&p.h===34){p.y+=17;p.h=17;}
 else if((!keys.down||!p.on)&&p.h===17){p.y-=17;p.h=34;}
 p.duck=!!(keys.down&&p.on&&p.h===17);
 if(p.duck)p.vx*=.58;
 const stormPreviousBottom=p.y+p.h;
 p.x=Math.max(0,Math.min(STORM_LENGTH-p.w,p.x+p.vx));
 if(storm.stage==='fight')p.x=Math.max(STORM_ARENA_LEFT+15,Math.min(STORM_ARENA_RIGHT-p.w-15,p.x));
 if(p.vx)p.dir=p.vx>0?1:-1;
 if((keys.jump||keys.up||keys.w)&&p.on&&!keys.down){p.vy=-10;p.on=false;}
 if(!['sametSpell','sametThrowPortal','sametJumpPortal','sametPortalEnd'].includes(storm.portalScene)){p.vy=Math.min(12,p.vy+.55);p.y+=p.vy;}
 if(storm.stage==='fight'&&p.vy>=0&&p.x+p.w>STORM_ARENA_PLATFORM.x&&p.x<STORM_ARENA_PLATFORM.x+STORM_ARENA_PLATFORM.w&&stormPreviousBottom<=STORM_ARENA_PLATFORM.y+6&&p.y+p.h>=STORM_ARENA_PLATFORM.y){p.y=STORM_ARENA_PLATFORM.y-p.h;p.vy=0;p.on=true;}
 if(p.y+p.h>=FLOOR){p.y=FLOOR-p.h;p.vy=0;p.on=true;}
 if(storm.stage==='fight')storm.arenaWallRise=Math.min(1,storm.arenaWallRise+1/42);
 if(storm.portalScene==='none')cam=storm.stage==='fight'||(storm.stage==='lost'&&storm.arenaWallRise>0)?Math.max(0,Math.min(STORM_LENGTH-W,(STORM_ARENA_LEFT+STORM_ARENA_RIGHT-W)/2)):Math.max(0,Math.min(STORM_LENGTH-W,p.x-W*.35));
 if(storm.chestReveal>0){
  p.vx=0;p.dir=1;
  // Normal speed except frames 4–5 are slower; frame 6 holds for an extra beat.
  const chestFrameDurations=[.32,.32,.32,.68,.68,4.68,.18,.18,.18,.18,.18];
  let remaining=stormChestMusic.currentTime,idx=0;
  while(idx<11&&remaining>=chestFrameDurations[idx])remaining-=chestFrameDurations[idx++];
  storm.chestReveal=idx===11?100:idx*9+1;
  if(storm.chestReveal===100&&storm.chestDialoguePending){
   storm.chestDialoguePending=false;
   beginTalk([
    {speaker:'Alte Schatztruhe',text:'Du hast die Kraft der azurblauen Magie gefunden!'},
    {speaker:'Alte Schatztruhe',text:'Wer diese Truhe öffnet, erhält die Macht, reine magische Energie in seinen Händen zu bündeln.'},
    {speaker:'Alte Schatztruhe',text:'Mit einem Linksklick entfesselst du blaue Magiekugeln.'}
   ],()=>{storm.chestReveal=0;stormChestMusic.pause();playAlinaAmbient();stormSay('BLAUE MAGIE FREIGESCHALTET · LINKSKLICK');},'continue');
  }
  return;
 }
 if(storm.stage==='walk'&&p.x>=storm.alinaX-230){
  storm.stage='alinaNoise';p.vx=0;
  beginTalk([{speaker:'Esat',text:'Moment mal ... was war das für ein Geräusch?!'},
   {speaker:'Esat',text:'Da vorne ... irgendetwas bewegt sich im Sturm. Wer ist da?!'}],()=>{
    storm.stage='alinaSummon';storm.alinaIntroTime=0;storm.alinaIntroImpact=false;
    stormMagicSound('spell');
   },'continue');
  return;
 }
 if(storm.stage==='alinaSummon'){
  p.vx=0;p.vy=0;storm.alinaIntroTime++;
  if(storm.alinaIntroTime===50){storm.lightning=16;shake=9;stormMagicSound('portal');}
  if(storm.alinaIntroTime===92){storm.lightning=22;shake=20;stormMagicSound('impact');storm.alinaIntroImpact=true;}
  if(storm.alinaIntroTime>=142){
   storm.stage='dialog';
   beginTalk(stormAlinaLines,()=>{stormAlinaCheckpoint=true;storm.stage='fight';storm.shotClock=0;stormSay('CHECKPOINT AKTIVIERT');startAlinaFightMusic();},'continue');
  }
  return;
 }
 if(storm.stage==='fight'){
  p.x=Math.min(p.x,storm.alinaX-48);
  // Five enchanted knives rise from Alina's hair and fire in sequence.
  // This timer is independent of her syringe and defibrillator attacks.
  if(!storm.clash&&storm.bossHp>storm.bossMax*.4){
   storm.knifeClock++;
   if(!storm.knifeWave&&storm.knifeClock>=280){
    storm.knifeClock=0;
    storm.knifeWave={age:0,knives:Array.from({length:5},(_,i)=>({
     x:storm.alinaX+8,y:FLOOR-133,vx:0,vy:0,launched:false,done:false,index:i,trail:[]
    }))};
    stormMagicSound('spell');
   }
  }
  if(storm.knifeWave&&!storm.clash){
   const wave=storm.knifeWave;wave.age++;
   for(const knife of wave.knives){
    if(knife.done)continue;
    const i=knife.index;
    if(!knife.launched){
     const rise=Math.min(1,wave.age/48);
     knife.x=storm.alinaX+8+(i-2)*24*rise;
     knife.y=FLOOR-133-(70+Math.abs(i-2)*12)*rise+Math.sin(storm.time*.11+i)*3;
     if(wave.age>=78+i*19){
      knife.launched=true;
      const dx=p.x+p.w/2-knife.x,dy=p.y+p.h/2-knife.y,dist=Math.hypot(dx,dy)||1;
      knife.vx=dx/dist*7.2;knife.vy=dy/dist*7.2;
      stormMagicSound('spell');
     }
    }else{
     knife.trail.push({x:knife.x,y:knife.y});
     if(knife.trail.length>9)knife.trail.shift();
     knife.x+=knife.vx;knife.y+=knife.vy;
     if(!godMode&&storm.inv===0&&Math.abs(knife.x-(p.x+p.w/2))<p.w/2+8&&Math.abs(knife.y-(p.y+p.h/2))<p.h/2+8){
      hp=Math.max(0,hp-1);storm.inv=75;knife.done=true;storm.poisonBursts.push({x:knife.x,y:knife.y,age:0});
      stormMagicSound('impact');
      if(hp===0){storm.stage='lost';stormSay('Die verfluchten Klingen haben dich erwischt!');}
     }
     if(knife.x<cam-80||knife.x>cam+W+80||knife.y>FLOOR+65||knife.y< -80)knife.done=true;
    }
   }
   if(wave.age>245||wave.knives.every(k=>k.done)){
    storm.knifeWave=null;
    if(storm.lowHpPhase==='knifeActive')storm.lowHpPhase='beam';
   }
  }
  if(storm.clashCooldown>0)storm.clashCooldown--;
  const c=storm.clash;
  if(c){
   c.age++;
   if(c.phase==='charge'&&c.age>=105){c.phase='flight';c.age=0;stormMagicSound('impact');shake=12;}
   else if(c.phase==='flight'){
    c.x-=4.3;
    const orb=storm.magicOrbs.find(o=>o.power>=.999&&o.vx>0&&Math.abs(o.x-c.x)<46&&Math.abs(o.y-c.y)<72);
    if(orb){orb.age=999;c.phase='duel';c.age=0;c.progress=.45;storm.clashClicks=0;storm.chargeActive=false;storm.chargeReady=false;stormMagicSound('impact');shake=18;}
    else if(c.x<p.x+p.w+25){c.phase='lost';c.age=0;if(!godMode){hp=0;storm.inv=90;storm.stage='lost';}shake=20;stormMagicSound('impact');}
   }else if(c.phase==='duel'){
    c.progress=Math.max(0,Math.min(1,c.progress+storm.clashClicks*.047-.0035));storm.clashClicks=0;
    if(c.age%18===0){shake=7;storm.lightning=7;}
    if(c.progress>=1){c.phase='win';c.age=0;stormMagicSound('impact');shake=25;}
    else if(c.progress<=0||c.age>240){c.phase='lost';c.age=0;if(!godMode){hp=0;storm.inv=90;storm.stage='lost';}shake=22;stormMagicSound('impact');}
   }else if(c.phase==='win'&&c.age>=24){
    storm.bossHp=Math.max(0,storm.bossHp-storm.bossMax*.1);storm.lowHpPhase='knife';storm.nextBeamHp=storm.bossHp;storm.magicBursts.push({x:storm.alinaX-30,y:FLOOR-95,age:0,power:2});storm.clash=null;storm.clashCooldown=210;
    if(storm.bossHp===0){startAlinaDeath();status.textContent='ALINA BESIEGT · Relikt des Schicksals liegt am Boden';}
   }else if(c.phase==='lost'&&c.age>=38){storm.lowHpPhase='knife';storm.clash=null;storm.clashCooldown=0;}
  }
  // Under 40% HP: ultimate -> five enchanted knives -> ultimate, with no overlap.
  if(!storm.clash&&storm.bossHp>0&&storm.bossHp<=storm.bossMax*.4&&storm.lowHpPhase==='knife'&&!storm.knifeWave){
   storm.lowHpPhase='knifeActive';storm.knifeClock=0;storm.shots=[];storm.shockBeams=[];
   storm.knifeWave={age:0,knives:Array.from({length:5},(_,i)=>({
    x:storm.alinaX+8,y:FLOOR-133,vx:0,vy:0,launched:false,done:false,index:i,trail:[]
   }))};
   stormMagicSound('spell');
  }
  if(!storm.clash&&storm.bossHp>0&&storm.bossHp<=storm.bossMax*.4&&storm.lowHpPhase==='beam'){
   storm.clash={phase:'charge',age:0,x:storm.alinaX-75,y:FLOOR-100,progress:0};
   storm.shots=[];storm.shockBeams=[];storm.knifeWave=null;storm.shotClock=0;storm.syringeAnim=0;storm.shockAnim=0;storm.ultimateAttackCount++;storm.attackNumber++;stormMagicSound('spell');
  }
  if(!storm.clash&&storm.bossHp>storm.bossMax*.4){
  // Alternate the syringe and the defibrillator attack. The electric blast
  // has a visible wind-up and travels at waist height, so Esat can jump it.
  storm.shotClock++;
  const electric=storm.attackType==='electric';
  if(storm.shotClock===1){
   storm.syringeAnim=electric?0:1;
   storm.shockAnim=electric?1:0;
  }
  if(!electric&&storm.shotClock===34){
   storm.shots.push({x:storm.alinaX-79,y:FLOOR-103,vx:-4.1,vy:0,age:0,trail:[]});stormMagicSound('spell');
  }
  if(electric&&storm.shotClock===42){
   storm.shockBeams.push({x:storm.alinaX-64,y:FLOOR-32,vx:-8.5,age:0});
   storm.lightning=8;shake=5;stormElectricSound();
  }
  if(storm.shotClock>=105){
   storm.shotClock=0;storm.syringeAnim=0;storm.shockAnim=0;storm.attackNumber++;
   if(storm.bossHp<=storm.bossMax*.4)storm.ultimateAttackCount++;
   storm.attackType=Math.random()<.5?'electric':'syringe';
  }else if(electric)storm.shockAnim=storm.shotClock;
  else if(storm.syringeAnim>0)storm.syringeAnim=Math.min(54,storm.syringeAnim+1);
  }
  for(const beam of storm.shockBeams){
   beam.x+=beam.vx;beam.age++;
   if(!godMode&&storm.inv===0&&beam.x<p.x+p.w&&beam.x+36>p.x&&p.y+p.h>beam.y-10&&p.y<beam.y+10){
    hp=Math.max(0,hp-1);storm.inv=75;beam.x=-999;
    if(hp===0){storm.stage='lost';stormSay('Ein Schock und du bist erledigt!');}
   }
  }
  storm.shockBeams=storm.shockBeams.filter(b=>b.x>cam-60);
  for(const shot of storm.shots){
   shot.trail.push({x:shot.x,y:shot.y,life:12});
   if(shot.trail.length>14)shot.trail.shift();
   shot.x+=shot.vx;shot.age++;
   if(!godMode&&storm.inv===0&&Math.abs(shot.x-(p.x+p.w/2))<20&&Math.abs(shot.y-(p.y+p.h/2))<33){
    hp=Math.max(0,hp-1);storm.inv=75;storm.poisonBursts.push({x:shot.x,y:shot.y,age:0});shot.x=-999;
    if(hp===0){storm.stage='lost';stormSay('Das war nicht mal meine stärkste Attacke!');}
   }
  }
  for(const burst of storm.poisonBursts)burst.age++;
  storm.poisonBursts=storm.poisonBursts.filter(b=>b.age<24);
  storm.shots=storm.shots.filter(q=>q.x>cam-50);

 }
  if(storm.playerShotClock>0)storm.playerShotClock--;
  const shootNow=!!keyboardShootHeld;
  const canShoot=storm.magicUnlocked&&!talk&&storm.portalScene==='none';
  if(canShoot&&storm.chargeActive&&storm.clash?.phase!=='duel')storm.chargeFrames=Math.min(75,storm.chargeFrames+1);
  if(canShoot&&storm.chargeReady&&storm.playerShotClock===0&&storm.clash?.phase!=='duel'){
   const power=storm.chargePower,dir=p.dir||1;
   storm.magicOrbs.push({x:p.x+p.w/2+dir*14,y:p.y+p.h*.45,vx:dir*(8+power*3),age:0,trail:[],power,damage:1+Math.floor(power*4)});
   storm.playerShotClock=60;storm.chargeReady=false;storm.chargePower=0;
   stormMagicSound('spell');
  }else if(canShoot&&storm.clash?.phase!=='duel'&&(storm.pendingMagicClicks>0||(shootNow&&!storm.shootWasHeld))&&storm.playerShotClock===0){
   storm.pendingMagicClicks=0;storm.playerShotClock=60;
   const dir=p.dir||1;
   storm.magicOrbs.push({x:p.x+p.w/2+dir*14,y:p.y+p.h*.45,vx:dir*8,age:0,trail:[],power:0,damage:1});
  }
  for(const orb of storm.magicOrbs){
   orb.trail.push({x:orb.x,y:orb.y,age:0});
   if(orb.trail.length>7)orb.trail.shift();
   orb.x+=orb.vx;orb.age++;
   if(storm.stage==='fight'&&!storm.clash&&orb.x>=storm.alinaX-38&&orb.x<=storm.alinaX+55&&orb.vx>0){
    storm.bossHp=Math.max(0,storm.bossHp-(orb.damage||1));
    storm.magicBursts.push({x:orb.x,y:orb.y,age:0,power:orb.power||0});orb.age=999;
    const thresholds=[14,9,4,1];
    if(storm.tauntIndex<thresholds.length&&storm.bossHp<=thresholds[storm.tauntIndex])stormSay(stormTaunts[storm.tauntIndex++]);
    if(storm.bossHp===0){
     startAlinaDeath();
     stormSay('Unfassbar! Nicht mal einen zweiten Lebensbalken?!');
     status.textContent='ALINA BESIEGT · Relikt des Schicksals liegt am Boden';
    }
   }
  }
  storm.magicOrbs=storm.magicOrbs.filter(o=>o.age<95&&o.x>cam-40&&o.x<cam+W+80);
  for(const burst of storm.magicBursts)burst.age++;
  storm.magicBursts=storm.magicBursts.filter(b=>b.age<18);
  storm.shootWasHeld=shootNow;
 // Only trigger when the portal is completely inside the camera viewport.
 if(storm.stage==='won'&&storm.artifactCollected&&storm.portalScene==='none'&&
    p.x>=storm.portalX-155&&storm.portalX-44>=cam+12&&storm.portalX+44<=cam+W-12){
  storm.portalScene='portalDialogue';p.vx=0;p.dir=1;
  beginTalk([{speaker:'Esat',text:'Das muss der Weg nach draußen sein.'}],()=>{
   storm.portalScene='sametApproach';storm.sametX=cam-80;storm.sametTimer=0;p.dir=-1;
  },'continue');
 }
 if(storm.portalScene==='sametApproach'){
  p.vx=0;p.dir=-1;storm.sametTimer++;
  storm.sametX=Math.min(p.x-105,storm.sametX+1.2);
  if(storm.sametX>=p.x-105){
   storm.portalScene='sametPraise';
   beginTalk([
    {speaker:"Samet",text:"Da bist du ja, Abi."},
    {speaker:"Esat",text:"Samet! Ich hab's geschafft! Ich habe das Relikt des Schicksals!"},
    {speaker:"Samet",text:"Ich weiß. Ich habe es gesehen. Du hast das sehr gut gemacht, Esat. Ich bin sehr stolz auf dich."},
    {speaker:"Esat",text:"Dann können wir endlich nach Hause. Nach allem, was passiert ist … ist es endlich vorbei."}
   ],()=>{storm.portalScene='sametHug';storm.sametTimer=0;},'continue');
  }
 }
 if(storm.portalScene==='sametHug'){
  p.vx=0;p.dir=-1;storm.sametTimer++;
  storm.sametX=Math.min(p.x-12,storm.sametX+1.15);
  if(storm.sametX>=p.x-12){
   storm.portalScene='sametLastWords';storm.sametTimer=0;
   beginTalk([{speaker:'Samet',text:'Ja, Esat. Für dich ist es vorbei.'}],()=>{
    storm.portalScene='sametPush';storm.sametTimer=0;
    storm.sametHasArtifact=true;storm.artifactCollected=false;
    storm.pushStart=p.x;storm.pushTarget=cam+24;storm.pushAfterimage=[];storm.pushImpact=0;
    status.textContent='SAMET HAT DAS RELIKT GESTOHLEN';
   },'continue');
  }
 }
 if(storm.portalScene==='sametPush'){
  p.vx=0;p.dir=1;storm.sametTimer++;
  const progress=Math.min(1,storm.sametTimer/43);
  // Violent launch, high airborne arc, then a heavy crash at screen left.
  const travel=progress<.25?(.25*Math.pow(progress/.25,.65)):progress;
  p.x=storm.pushStart+(storm.pushTarget-storm.pushStart)*travel;
  const height=progress<.72?180*Math.sin(Math.PI*progress/.90):Math.max(0,105*(1-progress)/.28);
  p.y=FLOOR-p.h-Math.max(0,height);
  p.on=progress>=1;
  if(storm.sametTimer===1){shake=24;storm.lightning=14;}
  if(storm.sametTimer%3===0&&progress<.88)storm.pushAfterimage.push({x:p.x,y:p.y,life:15});
  for(const ghost of storm.pushAfterimage)ghost.life--;
  storm.pushAfterimage=storm.pushAfterimage.filter(ghost=>ghost.life>0);
  if(progress>=1&&storm.pushImpact===0){storm.pushImpact=24;shake=28;storm.lightning=16;stormMagicSound('impact');startSametBetrayalMusic();}
  if(progress>=1){
   storm.portalScene='sametStole';p.dir=1;storm.cinematicRage=0;storm.cinematicRageStarted=false;storm.cinematicLine=-1;
   beginTalk([
    {"speaker":"Esat","text":"AAAH! Was zum … Samet?! Was machst du da?!"},
    {"speaker":"Samet","text":"Ich nehme mir, was mir zusteht."},
    {"speaker":"Esat","text":"Das Relikt … Gib es mir zurück!"},
    {"speaker":"Samet","text":"Warum sollte ich? Du hast es doch extra für mich geholt."},
    {"speaker":"Esat","text":"Was redest du da?!"},
    {"speaker":"Samet","text":"Ach, Esat. Du bist wirklich so naiv."},
    {"speaker":"Esat","text":"Samet … was ist los mit dir?"},
    {"speaker":"Samet","text":"Gar nichts. Zum ersten Mal läuft alles genau so, wie ich es geplant habe."},
    {"speaker":"Esat","text":"Geplant?"},
    {"speaker":"Samet","text":"Denk doch mal nach. Wer hat dir von diesem Relikt erzählt? Wer hat dich auf diese Reise geschickt?"},
    {"speaker":"Esat","text":"Du …"},
    {"speaker":"Samet","text":"Richtig."},
    {"speaker":"Samet","text":"Ich wusste, wo es liegt. Ich wusste auch, dass Jessica, Sarah und Alina mir im Weg stehen würden."},
    {"speaker":"Esat","text":"Dann wusstest du auch, was mich in diesen Welten erwartet?!"},
    {"speaker":"Samet","text":"Nicht jedes Detail. Aber ich wusste, dass du stark genug bist, um die Hindernisse zu beseitigen."},
    {"speaker":"Esat","text":"Hindernisse?! Das waren Menschen, Samet!"},
    {"speaker":"Samet","text":"Menschen, die zwischen mir und dem Relikt standen."},
    {"speaker":"Esat","text":"Jessica … Sarah … Alina …"},
    {"speaker":"Samet","text":"Und jetzt stehen sie mir nicht mehr im Weg. Dank dir."},
    {"speaker":"Esat","text":"Du krankes Schwein …"},
    {"speaker":"Samet","text":"Pass auf, wie du mit mir redest."},
    {"speaker":"Esat","text":"Du hast mich die ganze Zeit benutzt?!"},
    {"speaker":"Samet","text":"Ich habe dir einen Grund gegeben, weiterzukämpfen. Ohne mich wärst du wahrscheinlich schon in der ersten Welt umgekehrt."},
    {"speaker":"Esat","text":"Du hast mir gesagt, dass ich mit diesem Relikt endlich glücklich werden kann!"},
    {"speaker":"Samet","text":"Und du hast es geglaubt. Weil du es unbedingt glauben wolltest."},
    {"speaker":"Samet","text":"Weißt du, Esat … das Interessante an diesem Relikt ist, dass es jedem Menschen etwas anderes gibt."},
    {"speaker":"Esat","text":"Was meinst du?"},
    {"speaker":"Samet","text":"Es erkennt den tiefsten Wunsch seines Trägers."},
    {"speaker":"Samet","text":"Du bist wegen deines gebrochenen Herzens in diese Welt gekommen. Du wolltest Liebe. Du wolltest endlich glücklich sein."},
    {"speaker":"Esat","text":"Ja …"},
    {"speaker":"Samet","text":"Und genau das hätte dir das Relikt geben können."},
    {"speaker":"Samet","text":"Aber mir … mir wird es etwas ganz anderes geben."},
    {"speaker":"Esat","text":"Und was?"},
    {"speaker":"Samet","text":"Macht."},
    {"speaker":"Samet","text":"Unvorstellbare Macht. Stärke, die kein gewöhnlicher Mensch jemals besitzen könnte."},
    {"speaker":"Esat","text":"Aber warum willst du so viel Macht?"},
    {"speaker":"Samet","text":"Weil ich aus genau demselben Grund hier bin wie du, Abi."},
    {"speaker":"Esat","text":"…"},
    {"speaker":"Samet","text":"Herzschmerz."},
    {"speaker":"Esat","text":"Was …?"},
    {"speaker":"Samet","text":"Meine Freundin hat mich verlassen."},
    {"speaker":"Esat","text":"Samet …"},
    {"speaker":"Samet","text":"Für einen koreanischen Sänger. Kannst du dir das vorstellen? Sie hat mich einfach gegen irgendeinen Typen ausgetauscht, den sie nicht einmal richtig kennt!"},
    {"speaker":"Samet","text":"Ich habe sie geliebt, Esat. Und für sie war ich offenbar nichts wert."},
    {"speaker":"Esat","text":"Warum hast du mir nie davon erzählt?"},
    {"speaker":"Samet","text":"Weil ich kein Mitleid wollte! Ich wollte nie wieder dieses Gefühl haben. Diese Schwäche. Diese Hilflosigkeit."},
    {"speaker":"Samet","text":"Während du dir gewünscht hast, wieder geliebt zu werden, habe ich mir geschworen, nie wieder machtlos zu sein."},
    {"speaker":"Esat","text":"Und deshalb willst du das Relikt?"},
    {"speaker":"Samet","text":"Ich will Macht und Stärke. Genug, um mich an diesem Sänger zu rächen. Und an all den Koreanern, gegen die sich mein Hass inzwischen richtet."},
    {"speaker":"Esat","text":"Samet, bist du völlig wahnsinnig geworden?! Diese Menschen haben dir überhaupt nichts getan!"},
    {"speaker":"Samet","text":"Du verstehst nicht, wie sehr sie mich gedemütigt hat!"},
    {"speaker":"Esat","text":"Doch! Ich weiß, wie sich Herzschmerz anfühlt! Aber ich würde deswegen niemals unschuldige Menschen umbringen!"},
    {"speaker":"Samet","text":"Dann bist du eben schwächer als ich."},
    {"speaker":"Samet","text":"Siehst du das, Esat? Es reagiert auf mich."},
    {"speaker":"Samet","text":"Es hat meinen Wunsch erkannt."},
    {"speaker":"Samet","text":"Du wolltest Liebe. Ich will Macht."},
    {"speaker":"Samet","text":"Und jetzt bekomme ich sie."},
    {"speaker":"Esat","text":"Weißt du eigentlich, was ich alles durchgemacht habe?"},
    {"speaker":"Samet","text":"Natürlich. Ich habe es mit angesehen."},
    {"speaker":"Esat","text":"Du hast zugesehen?!"},
    {"speaker":"Samet","text":"Ich war dir immer ein Stück voraus oder hinter dir. Weit genug weg, um nicht selbst kämpfen zu müssen."},
    {"speaker":"Esat","text":"Ich wäre so oft beinahe gestorben!"},
    {"speaker":"Samet","text":"Aber du bist nicht gestorben."},
    {"speaker":"Esat","text":"Und wenn doch?!"},
    {"speaker":"Samet","text":"Dann hätte ich mir etwas anderes überlegen müssen."},
    {"speaker":"Esat","text":"…"},
    {"speaker":"Esat","text":"Ich erkenne dich nicht wieder."},
    {"speaker":"Samet","text":"Dann hast du mich wohl nie richtig gekannt."},
    {"speaker":"Esat","text":"Nach Sarahs Tod … erinnerst du dich, was ich dir gesagt habe?"},
    {"speaker":"Samet","text":"Natürlich."},
    {"speaker":"Esat","text":"Ich habe dir gesagt, wie toll du bist. Dass ich froh bin, dich zu haben."},
    {"speaker":"Esat","text":"Ich dachte, wenigstens mein kleiner Bruder steht noch hinter mir."},
    {"speaker":"Samet","text":"Und genau deshalb hast du mir vertraut."},
    {"speaker":"Esat","text":"Du bist meine Familie, Samet! Ich hätte alles für dich getan!"},
    {"speaker":"Samet","text":"Das hast du doch, Abi."},
    {"speaker":"Samet","text":"Du hast mir gerade das mächtigste Relikt dieser Welt besorgt."},
    {"speaker":"Esat","text":"Ich habe dir vertraut … und du hast mich einfach verkauft."},
    {"speaker":"Samet","text":"Nenn es, wie du willst. Mein Plan ist aufgegangen."},
    {"speaker":"Esat","text":"Weißt du, was das Schlimmste daran ist?"},
    {"speaker":"Samet","text":"Dass du verloren hast?"},
    {"speaker":"Esat","text":"Nein."},
    {"speaker":"Esat","text":"Dass du genauso geworden bist wie dein Vater."},
    {"speaker":"Samet","text":"… Was?"},
    {"speaker":"Esat","text":"Du hast mich gehört."},
    {"speaker":"Samet","text":"Nimm das zurück."},
    {"speaker":"Esat","text":"Du benutzt Menschen. Du lügst ihnen ins Gesicht. Du tust so, als würdest du ihnen helfen, während du nur an dich selbst denkst."},
    {"speaker":"Samet","text":"Ich sagte, NIMM DAS ZURÜCK!"},
    {"speaker":"Esat","text":"Du bist genau wie er, Samet."},
    {"speaker":"Samet","text":"DU SOLLST LEISE SEIN!!!"},
    {"speaker":"Samet","text":"DU HAST KEINE AHNUNG, WOVON DU REDEST!"},
    {"speaker":"Esat","text":"Dann beweis mir, dass ich falschliege!"},
    {"speaker":"Samet","text":"ICH BIN NICHT WIE MEIN VATER!"},
    {"speaker":"Esat","text":"Dann warum behandelst du mich genauso?!"},
    {"speaker":"Samet","text":"WEIL DU EINFACH NICHT VERSTEHST, WANN DU DEIN MAUL HALTEN SOLLST!"},
    {"speaker":"Esat","text":"Siehst du?! Genau das meine ich!"},
    {"speaker":"Samet","text":"DU WIRST MICH NIE WIEDER MIT IHM VERGLEICHEN!"},
    {"speaker":"Esat","text":"Samet … hör auf. Bitte."},
    {"speaker":"Samet","text":"Nein. Ich habe lange genug auf dich gehört."},
    {"speaker":"Esat","text":"Du bist mein kleiner Bruder. Egal, was du getan hast, wir können das noch irgendwie …"},
    {"speaker":"Samet","text":"WIR?!"},
    {"speaker":"Samet","text":"ES GIBT KEIN WIR MEHR!"},
    {"speaker":"Esat","text":"…"},
    {"speaker":"Samet","text":"Du hast deine Aufgabe erfüllt. Ich brauche dich nicht mehr."},
    {"speaker":"Esat","text":"Du würdest wirklich deinen eigenen Bruder umbringen?"},
    {"speaker":"Samet","text":"Du hast mir gerade gesagt, ich wäre wie mein Vater."},
    {"speaker":"Esat","text":"Samet …"},
    {"speaker":"Samet","text":"Jetzt wirst du sehen, wie falsch du damit liegst."},
   ],()=>{storm.portalScene='sametThreat';storm.evilPortalTime=0;storm.lightning=15;shake=18;stormMagicSound('portal');},'continue');
  }
 }
 if(storm.portalScene==='sametThreat'){
  p.vx=0;p.dir=1;storm.evilPortalTime++;
  if(storm.evilPortalTime===50){
   storm.portalScene='sametSpell';storm.spellTimer=0;storm.spellFromX=p.x;storm.spellFromY=FLOOR-p.h-90;p.y=storm.spellFromY;p.vy=0;p.on=false;storm.spellStartTime=storm.time;storm.spellCharge=0;storm.magicOrbs.length=0;storm.pendingMagicClicks=0;
   stormMagicSound('spell');shake=13;storm.lightning=16;
   beginTalk([
    {speaker:"Esat",text:"AAAH! Was … was passiert mit mir?!"},
    {speaker:"Samet",text:"Spürst du das? Die Macht des Relikts."},
    {speaker:"Esat",text:"Samet! Lass mich runter!"},
    {speaker:"Samet",text:"Du wolltest unbedingt dieses Relikt haben. Und jetzt bist du der Erste, an dem ich seine Macht ausprobieren darf."},
    {speaker:"Esat",text:"Bitte! Ich bin doch dein Bruder!"},
    {speaker:"Samet",text:"Leb wohl, Abi."},
    {speaker:"Esat",text:"SAMET! NEIN!"}
   ],()=>{storm.portalScene='sametThrowPortal';storm.spellTimer=0;storm.spellFromX=p.x;storm.spellFromY=p.y;stormMagicSound('impact');shake=22;storm.lightning=14;},'continue');
  }
 }
 if(storm.portalScene==='sametSpell'){
  storm.spellTimer++;
  p.vx=0;p.vy=0;p.on=false;p.dir=1;
  p.y=FLOOR-p.h-90-Math.sin(storm.spellTimer*.085)*6;
 }
 if(storm.portalScene==='sametThrowPortal'){
  storm.spellTimer++;
  const t=Math.min(1,storm.spellTimer/34),e=t*t*(3-2*t);
  const portalX=storm.sametX+70;
  p.x=storm.spellFromX+(portalX-p.w/2-storm.spellFromX)*e;
  p.y=storm.spellFromY+(FLOOR-72-p.h/2-storm.spellFromY)*e-45*Math.sin(Math.PI*t);
  p.vx=0;p.vy=0;p.on=false;
  if(t>=1){storm.portalScene='sametJumpPortal';storm.spellTimer=0;storm.sametLeapX=storm.sametX;storm.sametLeapY=FLOOR-58;stormMagicSound('portal');}
 }
 if(storm.portalScene==='sametJumpPortal'){
  storm.spellTimer++;
  const t=Math.min(1,storm.spellTimer/38),e=t*t*(3-2*t);
  storm.sametX=storm.sametLeapX+70*e;
  storm.sametLeapY=FLOOR-58-75*Math.sin(Math.PI*t);
  if(t>=1){storm.portalScene='sametPortalEnd';storm.spellTimer=0;}
 }
 if(storm.portalScene==='sametPortalEnd')storm.spellTimer++;
 if(storm.portalScene==='sametStole'){p.vx=0;p.dir=1;}
 if(storm.stage==='lost'&&(keys.jump||keys.up||keys.w)){enterStormLevel();return;}
 frame++;
}
const stormChestMusic=new Audio('assets/audio/Wind Waker Treasure Chest.mp3');
stormChestMusic.preload='auto';stormChestMusic.volume=.14;
const stormChestFrames=Array.from({length:12},(_,i)=>{const img=new Image();img.src='assets/chest/frame_'+String(i+1).padStart(2,'0')+'.png';return img;});
const stormPanorama=new Image();
stormPanorama.src='assets/images/alina-panorama.png';
function drawStormLevel(){
 const t=storm.time;
 r(0,0,W,H,storm.lightning?'#9177b5':'#180d2c');
 // The selected panorama is used only in the playable Alina world.
 // Cover the canvas while shifting slowly with the camera for a subtle parallax effect.
 if(stormPanorama.complete&&stormPanorama.naturalWidth>0){
  const scale=Math.max(H/stormPanorama.naturalHeight,W/stormPanorama.naturalWidth);
  const width=stormPanorama.naturalWidth*scale,height=stormPanorama.naturalHeight*scale;
  const travel=Math.max(0,width-W);
  const scroll=travel*(Math.max(0,Math.min(1,cam/Math.max(1,STORM_LENGTH-W))))*.55;
  g.save();g.imageSmoothingEnabled=false;
  g.drawImage(stormPanorama,-scroll,(H-height)/2,width,height);
  g.restore();
  // Keep the existing atmospheric lightning flash above the new landscape.
  if(storm.lightning||t%235<9){
   const flash=storm.lightning?Math.min(.22,storm.lightning*.025):(.13*(1-(t%235)/9));
   g.fillStyle='rgba(207,185,255,'+flash+')';g.fillRect(0,0,W,H);
  }
 }
 // Wind-blown rain in screen space; deterministic positions avoid per-frame allocations.
 g.save();g.strokeStyle='#bcb1ed';g.lineWidth=1;g.globalAlpha=.25;
 for(let k=0;k<85;k++){
  const x=((k*97+t*4.8)%(W+80))-40;
  const y=((k*59+t*9.3)%(H+65))-32;
  g.beginPath();g.moveTo(x,y);g.lineTo(x-10,y+22);g.stroke();
 }
 g.restore();
 // The arrival portal stays behind Esat while the storm realm opens ahead.
 g.save();g.translate(-Math.floor(cam),0);
 g.save();g.translate(48,FLOOR-63);
 g.shadowColor='#d86cff';g.shadowBlur=18;
 g.fillStyle='#1a0d34';g.beginPath();g.ellipse(0,0,25,58,0,0,Math.PI*2);g.fill();
 g.strokeStyle='#e6a2ff';g.lineWidth=5;g.stroke();
 g.strokeStyle='#8956e6';g.lineWidth=2;g.beginPath();g.ellipse(0,0,15,47,0,0,Math.PI*2);g.stroke();
 g.restore();
 r(0,FLOOR,STORM_LENGTH,H-FLOOR,'#261e35');
 r(0,FLOOR,STORM_LENGTH,9,'#645077');
 for(let x=0;x<STORM_LENGTH;x+=48){
  r(x+8,FLOOR+15,23,4,'#40304f');r(x+28,FLOOR+34,15,5,'#4d365b');
 }
 for(let x=180;x<STORM_LENGTH;x+=280){
  r(x,FLOOR-45,24,45,'#3d304a');r(x-7,FLOOR-51,38,8,'#64516d');
  g.fillStyle='#a768ee';g.beginPath();g.moveTo(x+45,FLOOR);g.lineTo(x+55,FLOOR-32);g.lineTo(x+67,FLOOR);g.fill();
 }
 // Ancient storm pylons with rotating runes and pulsing violet energy.
 for(const x of [110,560,1120,1660]){
  const y=FLOOR-115;
  g.save();g.shadowColor='#a957ff';g.shadowBlur=10+5*Math.sin(t*.04+x);
  r(x-12,y,24,115,'#292139');r(x-18,y-8,36,14,'#665178');
  r(x-13,y+20,26,6,'#8d54be');
  g.strokeStyle='#d58bff';g.lineWidth=2;
  for(let k=0;k<3;k++){
   const yy=y+40+k*19;
   g.beginPath();g.moveTo(x-6,yy);g.lineTo(x,yy-7+Math.sin(t*.04+k)*2);g.lineTo(x+6,yy);g.stroke();
  }
  g.fillStyle='#d3a0ff';g.beginPath();g.arc(x,y-14+Math.sin(t*.05+x)*5,6,0,Math.PI*2);g.fill();
  g.restore();
 }
 // Floating magical embers and drifting debris give the storm depth.
 g.save();
 for(let k=0;k<46;k++){
  const x=((k*173+t*(k%3+1)*.32)%(STORM_LENGTH+80))-40;
  const y=35+((k*83+Math.sin(t*.025+k)*22)%(FLOOR-65));
  g.globalAlpha=.25+.25*Math.sin(t*.04+k)**2;
  g.fillStyle=k%3===0?'#ff89de':'#a67dff';
  g.fillRect(x,y,k%5===0?4:2,k%5===0?4:2);
 }
 g.restore();
 // Alina's locked boss arena: two walls rise after her introduction.
 if(storm.stage==='fight'||(storm.stage==='lost'&&storm.arenaWallRise>0)){
  const rise=storm.arenaWallRise;
  for(const x of [STORM_ARENA_LEFT,STORM_ARENA_RIGHT]){
   const wallHeight=(FLOOR+35)*rise;
   g.save();g.shadowColor='#b45bff';g.shadowBlur=15;
   r(x-13,FLOOR-wallHeight,26,wallHeight,'#2d173d');
   r(x-17,FLOOR-wallHeight,34,12,'#73518f');
   for(let k=0;k<Math.floor(wallHeight/25);k++){
    const y=FLOOR-18-k*25;
    r(x-9,y,18,4,k%2?'#6e408d':'#54316e');
    g.fillStyle='#d28bff';g.fillRect(x-2,y-8,4,5);
   }
   g.restore();
  }
  // One solid central platform, low enough for Esat to jump onto.
  const pl=STORM_ARENA_PLATFORM;
  g.save();g.shadowColor='#a959ff';g.shadowBlur=13;
  r(pl.x,pl.y,pl.w,pl.h,'#72518c');
  r(pl.x+4,pl.y+2,pl.w-8,4,'#ca8cff');
  r(pl.x+9,pl.y+pl.h,12,8,'#3b2b52');
  r(pl.x+pl.w-21,pl.y+pl.h,12,8,'#3b2b52');
  g.restore();
 }
 // The exit portal appears only after Alina's defeat.
 if(storm.stage==='won'){
  const x=storm.portalX,y=FLOOR-102;
  g.save();g.shadowColor='#9d6aff';g.shadowBlur=24;
  g.fillStyle='#22104b';g.beginPath();g.ellipse(x,y+50,36,54,0,0,Math.PI*2);g.fill();
  g.strokeStyle='#bb87ff';g.lineWidth=7;g.stroke();
  g.strokeStyle='#80e7ff';g.lineWidth=3;g.beginPath();g.ellipse(x,y+50,25+Math.sin(t*.06)*2,42,0,0,Math.PI*2);g.stroke();
  for(let j=0;j<5;j++){
   const sy=y+18+j*17;
   g.strokeStyle=j%2?'#b8a4ff':'#6de4ff';g.globalAlpha=.5;
   g.beginPath();g.moveTo(x-17,sy);g.quadraticCurveTo(x+Math.sin(t*.07+j)*20,sy-9,x+17,sy);g.stroke();
  }
  g.restore();
 }
 // Alina's cinematic arrival: an arcane sigil materializes, opens a rift,
 // and releases the witch through a shockwave before dialogue begins.
 if(storm.stage==='alinaSummon'){
  const age=storm.alinaIntroTime,cx=storm.alinaX+20,cy=FLOOR-85;
  const charge=Math.min(1,age/80),burst=Math.max(0,1-Math.abs(age-95)/20);
  g.save();g.globalCompositeOperation='lighter';
  g.translate(cx,cy);
  for(let ring=0;ring<3;ring++){
   g.save();g.rotate(t*.018*(ring%2?-1:1)+ring*.6);
   g.globalAlpha=(.25+charge*.45)*(1-burst*.25);
   g.strokeStyle=ring===1?'#ffb1f8':'#9a5cff';g.lineWidth=2+ring;
   g.shadowColor='#bd69ff';g.shadowBlur=14;
   g.beginPath();g.ellipse(0,0,(36+ring*22)*charge,(68+ring*19)*charge,0,0,Math.PI*2);g.stroke();
   for(let k=0;k<8;k++){
    const a=k*Math.PI/4,rx=(42+ring*22)*charge,ry=(73+ring*18)*charge;
    g.fillStyle='#f6b9ff';g.fillRect(Math.cos(a)*rx-2,Math.sin(a)*ry-2,4,4);
   }
   g.restore();
  }
  if(age>35){
   const opening=Math.min(1,(age-35)/55);
   g.globalAlpha=.8;g.shadowColor='#e788ff';g.shadowBlur=30;
   g.fillStyle='#170322';g.beginPath();g.ellipse(0,0,29*opening,72*opening,0,0,Math.PI*2);g.fill();
   g.strokeStyle='#ff8cf7';g.lineWidth=5;g.stroke();
   for(let k=0;k<22;k++){
    const a=k*2.4+t*.045,rad=35+Math.sin(t*.06+k)*12;
    g.globalAlpha=.35+.5*opening;
    g.fillStyle=k%3?'#df78ff':'#ffffff';
    g.fillRect(Math.cos(a)*rad,Math.sin(a)*rad*1.7,2+k%3,2+k%3);
   }
  }
  if(age>=92){
   const wave=(age-92)*5;
   g.globalAlpha=Math.max(0,1-(age-92)/35);
   g.strokeStyle='#ffe2ff';g.lineWidth=7;
   g.beginPath();g.ellipse(0,0,20+wave,28+wave*.6,0,0,Math.PI*2);g.stroke();
  }
  g.restore();
 }
 // A cracked ritual circle marks Alina's arena, with a pulsing violet seal.
 const ax=storm.alinaX;
 if(storm.stage==='fight'&&storm.bossHp>0&&storm.bossHp<=storm.bossMax*.4){
  const pulse=1+.1*Math.sin(t*.13);
  g.save();g.globalCompositeOperation='lighter';
  const aura=g.createRadialGradient(ax+20,FLOOR-78,8,ax+20,FLOOR-78,110*pulse);
  aura.addColorStop(0,'rgba(219,112,255,.53)');aura.addColorStop(.45,'rgba(165,45,250,.32)');aura.addColorStop(1,'rgba(117,22,209,0)');
  g.fillStyle=aura;g.beginPath();g.ellipse(ax+20,FLOOR-78,100*pulse,150*pulse,0,0,Math.PI*2);g.fill();
  g.strokeStyle='#d16aff';g.shadowColor='#bd46ff';g.shadowBlur=26;g.lineWidth=3;
  g.globalAlpha=.6+.25*Math.sin(t*.17);g.beginPath();g.ellipse(ax+20,FLOOR-75,48*pulse,91*pulse,0,0,Math.PI*2);g.stroke();g.restore();
 }
 g.save();g.strokeStyle='#9c5bdb';g.lineWidth=3;g.globalAlpha=.6+.2*Math.sin(t*.07);
 g.beginPath();g.ellipse(ax+20,FLOOR-3,113,14,0,0,Math.PI*2);g.stroke();
 for(let i=0;i<8;i++){const x=ax-80+i*27;r(x,FLOOR-6,12,3,'#bd79ec');}
 g.restore();
 if(['dying','dyingTalk','dyingFinish','dissolving'].includes(storm.stage)){
  const dissolveProgress=storm.stage==='dissolving'?Math.min(1,storm.dissolveTicks/120):0;
  g.save();g.globalAlpha=1-dissolveProgress;
  const frameIndex=Math.min(13,Math.floor(storm.deathTicks/ALINA_DEATH_FRAME_TICKS));
  const frame=alinaDeathFrames[frameIndex];
  if(frame.complete&&frame.naturalWidth>0){
   // Each transparent death frame can have different empty margins.
   // Crop to visible pixels, then align its lowest opaque pixel exactly with FLOOR.
   let bounds=frame._groundBounds;
   if(!bounds){
    const offscreen=document.createElement('canvas');
    offscreen.width=frame.naturalWidth;offscreen.height=frame.naturalHeight;
    const offctx=offscreen.getContext('2d',{willReadFrequently:true});
    offctx.drawImage(frame,0,0);
    const pixels=offctx.getImageData(0,0,offscreen.width,offscreen.height).data;
    let left=offscreen.width,right=-1,top=offscreen.height,bottom=-1;
    for(let yy=0;yy<offscreen.height;yy++)for(let xx=0;xx<offscreen.width;xx++){
     if(pixels[(yy*offscreen.width+xx)*4+3]>32){
      if(xx<left)left=xx;if(xx>right)right=xx;
      if(yy<top)top=yy;if(yy>bottom)bottom=yy;
     }
    }
    bounds=right>=left?{x:left,y:top,w:right-left+1,h:bottom-top+1}:
      {x:0,y:0,w:frame.naturalWidth,h:frame.naturalHeight};
    frame._groundBounds=bounds;
   }
   // Keep one constant scale across all 14 frames; do not stretch each pose to 140px.
   const scale=140/frame.naturalHeight;
   const drawW=bounds.w*scale,drawH=bounds.h*scale;
   g.drawImage(frame,bounds.x,bounds.y,bounds.w,bounds.h,
     ax+20-drawW/2,FLOOR-drawH,drawW,drawH);
  }else if(alinaSprite.complete&&alinaSprite.naturalWidth>0){
   const drawH=140,drawW=drawH*alinaSprite.naturalWidth/alinaSprite.naturalHeight;
   g.drawImage(alinaSprite,ax+20-drawW/2,FLOOR-drawH,drawW,drawH);
  }
  g.restore();
  if(storm.stage==='dissolving'){
   g.save();g.globalCompositeOperation='lighter';
   for(let i=0;i<65;i++){
    const seed=i*12.9898,phase=(Math.sin(seed)*43758.5453)%1;
    const x=ax+20+Math.sin(seed*1.3)*35+Math.sin(storm.dissolveTicks*.045+i)*10;
    const y=FLOOR-15-Math.abs(Math.sin(seed*2.1))*95-dissolveProgress*(35+Math.abs(phase)*110);
    const appear=Math.max(0,Math.min(1,dissolveProgress*5-i/80));
    g.globalAlpha=appear*(1-dissolveProgress*.9);
    g.fillStyle=i%3===0?'#f9c8ff':i%3===1?'#b783ff':'#fff1ca';
    g.shadowColor='#c67bff';g.shadowBlur=8;
    g.fillRect(x,y,2+(i%3),2+(i%3));
   }
   g.restore();
  }
 }
 if(!['dying','dyingTalk','dyingFinish','dissolving'].includes(storm.stage)&&storm.stage!=='won'&&storm.stage!=='walk'&&storm.stage!=='alinaNoise'&&
    (storm.stage!=='alinaSummon'||storm.alinaIntroTime>=90)){
  if(alinaSprite.complete&&alinaSprite.naturalWidth>0){
   const progress=storm.syringeAnim;
   const index=progress<=30?Math.min(5,Math.floor((progress-1)/5)):Math.max(0,5-Math.floor((progress-31)/4));
   const animFrame=alinaSyringeFrames[index];
   const syringeReady=storm.stage==='fight'&&progress>0&&progress<=54&&animFrame.complete&&animFrame.naturalWidth>0;
   const spriteH=140,spriteW=spriteH*alinaSprite.naturalWidth/alinaSprite.naturalHeight;
   if(storm.stage==='alinaSummon'){g.save();g.globalAlpha=Math.min(1,(storm.alinaIntroTime-90)/27);g.shadowColor='#e6a4ff';g.shadowBlur=36;}
   if(syringeReady){
    // Independent transparent PNG frames: no adjacent sprites can bleed in.
    // Crop transparent margins so the animated Alina keeps her standing height.
    let bounds=animFrame._visibleBounds;
    if(!bounds){
     const c=document.createElement('canvas');c.width=animFrame.naturalWidth;c.height=animFrame.naturalHeight;
     const ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(animFrame,0,0);
     const pixels=ctx.getImageData(0,0,c.width,c.height).data;
     let left=c.width,right=-1,top=c.height,bottom=-1;
     for(let y=0;y<c.height;y++)for(let x=0;x<c.width;x++){
      if(pixels[(y*c.width+x)*4+3]>20){left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);}
     }
     bounds=right>=left?{x:left,y:top,w:right-left+1,h:bottom-top+1}:{x:0,y:0,w:c.width,h:c.height};
     animFrame._visibleBounds=bounds;
    }
    const w=spriteH*bounds.w/bounds.h;
    g.drawImage(animFrame,bounds.x,bounds.y,bounds.w,bounds.h,ax+20-w/2,FLOOR-spriteH,w,spriteH);
   }else{
   // Keep the original sprite orientation in every idle/dialogue pose.
   g.drawImage(alinaSprite,ax+20-spriteW/2,FLOOR-spriteH,spriteW,spriteH);
   }
   if(storm.stage==='alinaSummon')g.restore();
  }else{
   g.fillStyle='#24102e';g.beginPath();g.moveTo(ax-20,FLOOR);g.lineTo(ax+16,FLOOR-83);g.lineTo(ax+50,FLOOR);g.fill();
   r(ax+8,FLOOR-106,25,28,'#a87c9b');
   g.fillStyle='#2b153e';g.beginPath();g.moveTo(ax-10,FLOOR-107);g.lineTo(ax+21,FLOOR-145);g.lineTo(ax+53,FLOOR-107);g.fill();
  }
  if(storm.clash){
  const c=storm.clash,charging=c.phase==='charge',duel=c.phase==='duel',winning=c.phase==='win',losing=c.phase==='lost';
  const rad=charging?8+c.age*.45:49;
  const x=duel?p.x+100+(storm.alinaX-p.x-180)*c.progress:c.x,y=c.y;
  const impact=duel?1:charging?Math.min(1,c.age/105):.7;
  // The environment reacts to the collision: opposing chromatic lighting and a darkened arena.
  if(duel||winning||losing){
   g.save();
   g.fillStyle='rgba(4,1,18,.22)';g.fillRect(cam,0,W,H);
   const leftGlow=g.createRadialGradient(p.x+30,FLOOR-100,10,p.x+30,FLOOR-100,270);
   leftGlow.addColorStop(0,'rgba(35,201,255,.34)');leftGlow.addColorStop(1,'rgba(35,201,255,0)');
   g.fillStyle=leftGlow;g.fillRect(cam,0,W,H);
   const rightGlow=g.createRadialGradient(storm.alinaX,FLOOR-100,10,storm.alinaX,FLOOR-100,280);
   rightGlow.addColorStop(0,'rgba(239,38,246,.33)');rightGlow.addColorStop(1,'rgba(239,38,246,0)');
   g.fillStyle=rightGlow;g.fillRect(cam,0,W,H);g.restore();
  }
  g.save();g.globalCompositeOperation='lighter';
  // Pulsating vortex, nested rings and a brilliant white-hot core.
  for(let k=5;k>=0;k--){
   g.globalAlpha=.15+k*.09;g.strokeStyle=k%2?'#f4a0ff':'#aa48fa';g.lineWidth=2+k*2;
   g.shadowColor=k%2?'#ff6aff':'#6c44ff';g.shadowBlur=12+k*7;
   g.beginPath();g.ellipse(x,y,rad+k*8+Math.sin(t*.16+k)*5,rad+k*7+Math.cos(t*.13+k)*5,t*.008*(k%2?1:-1),0,Math.PI*2);g.stroke();
  }
  g.globalAlpha=.87;g.shadowColor='#e25bff';g.shadowBlur=42;
  g.fillStyle='#6c168e';g.beginPath();g.arc(x,y,rad,0,Math.PI*2);g.fill();
  g.globalAlpha=.8;g.fillStyle='#fff2ff';g.beginPath();g.arc(x-7,y-8,rad*.5,0,Math.PI*2);g.fill();
  // Hundreds of orbiting sparks are deterministic and cheap to draw.
  g.shadowBlur=0;
  for(let k=0;k<74;k++){
   const a=k*2.39996+t*(k%2?-.083:.095),distance=rad+9+(k*11%68)+Math.sin(t*.13+k)*7;
   const px=x+Math.cos(a)*distance,py=y+Math.sin(a)*distance*.75;
   g.globalAlpha=.25+.55*Math.sin(t*.1+k)**2;
   g.fillStyle=k%4===0?'#fffaff':k%2?'#ff83e9':'#6defff';
   g.fillRect(px,py,2+k%4,2+k%4);
  }
  if(duel){
   const ex=p.x+p.w/2,ey=p.y+p.h*.45,ax=storm.alinaX-25,ay=FLOOR-100;
   // Multiple jagged lightning filaments travel down each beam.
   for(const [sx,sy,tx,ty,color] of [[ex,ey,x-12,y,'#31dfff'],[ax,ay,x+12,y,'#ff42d6']]){
    for(let layer=0;layer<4;layer++){
     g.save();g.globalAlpha=layer===0?.28:layer===3?.95:.64;
     g.strokeStyle=layer===3?'#fffaff':color;
     g.lineWidth=[27,15,7,2][layer];g.lineCap='round';
     g.shadowColor=color;g.shadowBlur=[38,24,14,8][layer];
     g.beginPath();g.moveTo(sx,sy);
     for(let j=1;j<13;j++){
      const u=j/13,off=Math.sin(t*.43+j*2.6+layer*1.9)*((layer===0?4:10)*(1-Math.abs(u-.5)));
      g.lineTo(sx+(tx-sx)*u,sy+(ty-sy)*u+off);
     }
     g.lineTo(tx,ty);g.stroke();g.restore();
    }
   }
   // Expanding shock rings and flying radial energy shards at the impact point.
   for(let k=0;k<4;k++){
    const phase=(c.age*3+k*38)%155;
    g.globalAlpha=(1-phase/155)*.65;g.strokeStyle=k%2?'#d1faff':'#ffd0fa';g.lineWidth=5-k*.7;
    g.beginPath();g.ellipse(x,y,rad+phase,rad*.8+phase*.65,0,0,Math.PI*2);g.stroke();
   }
   for(let k=0;k<38;k++){
    const a=k*2.399+t*.014,len=50+(k*17+c.age*3)%135;
    g.globalAlpha=.18+.5*(1-len/200);g.strokeStyle=k%2?'#ff86e9':'#76eaff';g.lineWidth=1+k%3;
    g.beginPath();g.moveTo(x+Math.cos(a)*(rad+5),y+Math.sin(a)*(rad+5));
    g.lineTo(x+Math.cos(a)*(rad+len),y+Math.sin(a)*(rad+len));g.stroke();
   }
  }
  g.restore();
  // Multi-stage cinematic detonation: implosion, blinding core, shockwave and debris.
  if(winning||losing){
   const age=c.age,impactX=winning?storm.alinaX-32:p.x+p.w/2,impactY=FLOOR-99;
   const burst=Math.min(1,age/24),fade=Math.max(0,1-age/42);
   g.save();g.globalCompositeOperation='lighter';
   // The collapsing energy ball detonates into a giant violet/cyan fireball.
   const blastRadius=18+Math.pow(burst,.65)*255;
   const halo=g.createRadialGradient(impactX,impactY,0,impactX,impactY,blastRadius);
   halo.addColorStop(0,'rgba(255,255,255,'+(fade*.98)+')');
   halo.addColorStop(.13,'rgba(255,236,255,'+(fade*.93)+')');
   halo.addColorStop(.3,winning?'rgba(252,72,255,'+(fade*.8)+')':'rgba(73,235,255,'+(fade*.8)+')');
   halo.addColorStop(.65,'rgba(115,35,245,'+(fade*.43)+')');
   halo.addColorStop(1,'rgba(110,30,210,0)');
   g.fillStyle=halo;g.beginPath();g.arc(impactX,impactY,blastRadius,0,Math.PI*2);g.fill();
   // Three differently paced shock fronts cut across the entire arena.
   for(let k=0;k<3;k++){
    const wave=Math.max(0,age-k*5)/26;
    if(wave<=0||wave>=1.5)continue;
    g.globalAlpha=Math.max(0,1-wave/1.5)*.9;
    g.strokeStyle=k===1?'#fff':'#d879ff';g.lineWidth=Math.max(1,12-wave*6);
    g.shadowColor='#e55bff';g.shadowBlur=28;
    g.beginPath();g.ellipse(impactX,impactY,20+wave*340,15+wave*210,0,0,Math.PI*2);g.stroke();
   }
   g.shadowBlur=0;
   // Dozens of sharp energy fragments and sparks fan outward in slow-motion.
   for(let k=0;k<105;k++){
    const angle=k*2.399963+Math.sin(k*12.7)*.24;
    const speed=3+(k*17%19)*.65;
    const distance=Math.pow(Math.max(0,age),.82)*speed;
    const xx=impactX+Math.cos(angle)*distance,yy=impactY+Math.sin(angle)*distance*.78;
    const tail=5+(k%5)*4;
    g.globalAlpha=fade*(.4+(k%7)/12);
    g.strokeStyle=k%5===0?'#fff':k%2?'#f979ff':'#65eaff';
    g.lineWidth=k%8===0?4:2;
    g.beginPath();g.moveTo(xx,yy);g.lineTo(xx-Math.cos(angle)*tail,yy-Math.sin(angle)*tail);g.stroke();
   }
   // A horizontal light lance briefly washes over the arena.
   if(age<15){
    const beamWidth=(1-age/15)*95;
    const glare=g.createLinearGradient(0,impactY-beamWidth,0,impactY+beamWidth);
    glare.addColorStop(0,'rgba(255,255,255,0)');
    glare.addColorStop(.5,'rgba(255,244,255,'+((1-age/15)*.7)+')');
    glare.addColorStop(1,'rgba(255,255,255,0)');
    g.fillStyle=glare;g.fillRect(cam,impactY-beamWidth,W,beamWidth*2);
   }
   g.restore();
  }
  // A cinematic white flash at the instant the power struggle resolves.
  if(winning||losing){
   const flash=Math.max(0,1-c.age/18);
   g.save();g.fillStyle='rgba(255,245,255,'+(flash*.62)+')';g.fillRect(cam,0,W,H);g.restore();
  }
  if(duel){
   const duelCenterX=(STORM_ARENA_LEFT+STORM_ARENA_RIGHT)/2;
   g.save();r(duelCenterX-165,48,330,57,'#13051fe8');
   text('ENERGIE-DUELL!',duelCenterX,69,19,'#fff3ff','center');
   /* instructional overlay removed */
   r(duelCenterX-140,92,280,7,'#68205d');r(duelCenterX-140,92,280*c.progress,7,'#50e7ff');
   g.restore();
  }
 }
 // Cinematic charge-up effects follow the existing attack timing.
  if(storm.stage==='fight'&&storm.shotClock>0){
   const electric=storm.attackType==='electric',charge=storm.shotClock;
   if(charge<44){
    const px=ax-3,py=FLOOR-100;
    g.save();g.globalCompositeOperation='lighter';
    g.shadowColor=electric?'#5ce9ff':'#c55aff';g.shadowBlur=20;
    for(let k=0;k<10;k++){
     const a=k*Math.PI/5+t*.075,radius=8+charge*.58;
     g.fillStyle=electric?'#9dfaff':'#eeaaff';
     g.fillRect(px+Math.cos(a)*radius,py+Math.sin(a)*radius,3,3);
    }
    g.globalAlpha=.15+.2*charge/44;
    g.strokeStyle=electric?'#b6f9ff':'#f2b0ff';g.lineWidth=3;
    g.beginPath();g.arc(px,py,10+charge*.75,0,Math.PI*2);g.stroke();
    g.restore();
   }
  }
  // Defibrillator paddles, connected by a cable, glow as Alina charges.
  if(storm.stage==='fight'&&storm.shockAnim>0){
   const charge=storm.shockAnim;
   g.save();
   const glow=charge>=42?16:5+charge*.22;
   g.shadowColor='#8beeff';g.shadowBlur=glow;
   for(const [dx,dy] of [[-34,-84],[-13,-75]]){
    g.fillStyle='#485f78';g.fillRect(ax+20+dx,FLOOR+dy,15,22);
    g.fillStyle='#c5efff';g.fillRect(ax+22+dx,FLOOR+dy-5,11,7);
    g.fillStyle='#182a46';g.fillRect(ax+24+dx,FLOOR+dy+9,7,13);
   }
   g.strokeStyle='#6be6ff';g.lineWidth=2;g.beginPath();
   g.moveTo(ax-14,FLOOR-62);g.quadraticCurveTo(ax-36,FLOOR-30,ax+8,FLOOR-50);g.stroke();
   if(charge<42){
    g.globalAlpha=.4+.4*Math.sin(charge*.5);
    g.strokeStyle='#b9faff';g.lineWidth=2;g.beginPath();
    g.moveTo(ax-23,FLOOR-94);g.lineTo(ax-37,FLOOR-103);g.lineTo(ax-21,FLOOR-100);g.stroke();
   }
   g.restore();
  }
  if(storm.stage!=='alinaSummon'&&!storm.clash)text('ALINA',ax+20,FLOOR-156,14,'#f1a9ff','center');
 }
 // Attack telegraph: the defibrillator's lightning expands into a forked burst.
 if(storm.stage==='fight'&&storm.attackType==='electric'&&storm.shotClock>=37&&storm.shotClock<=51){
  const intensity=1-Math.abs(storm.shotClock-44)/8;
  g.save();g.globalCompositeOperation='lighter';g.globalAlpha=Math.max(0,intensity);
  g.strokeStyle='#bafaff';g.shadowColor='#6deaff';g.shadowBlur=24;g.lineWidth=3;
  for(let k=0;k<5;k++){
   const x=storm.alinaX-25,y=FLOOR-80;
   g.beginPath();g.moveTo(x,y);g.lineTo(x-25-k*8,y-14+k*6);
   g.lineTo(x-47-k*9,y+Math.sin(t*.5+k)*17);g.stroke();
  }
  g.restore();
 }
 // Silver cursed blades, each surrounded by a flickering violet aura.
 if(storm.knifeWave){
  for(const knife of storm.knifeWave.knives){
   if(knife.done)continue;
   g.save();g.translate(knife.x,knife.y);
   const angle=knife.launched?Math.atan2(knife.vy,knife.vx)+Math.PI/2:Math.sin(t*.06+knife.index)*.14;
   g.rotate(angle);g.globalCompositeOperation='lighter';
   for(let j=0;j<knife.trail.length;j++){
    const tr=knife.trail[j],alpha=(j+1)/knife.trail.length*.35;
    g.save();g.rotate(-angle);g.globalAlpha=alpha;g.fillStyle='#b356ff';
    g.beginPath();g.arc(tr.x-knife.x,tr.y-knife.y,4+j*.25,0,Math.PI*2);g.fill();g.restore();
   }
   g.shadowColor='#bd47ff';g.shadowBlur=19;
   g.fillStyle='rgba(158,57,255,.45)';g.beginPath();g.ellipse(0,0,15,27,0,0,Math.PI*2);g.fill();
   g.fillStyle='#e3d6f4';g.beginPath();g.moveTo(0,-24);g.lineTo(-6,-6);g.lineTo(-5,10);g.lineTo(5,10);g.lineTo(6,-6);g.closePath();g.fill();
   g.fillStyle='#fffaff';g.beginPath();g.moveTo(0,-24);g.lineTo(0,9);g.lineTo(4,8);g.closePath();g.fill();
   g.fillStyle='#562078';g.fillRect(-8,10,16,5);g.fillRect(-3,15,6,12);
   g.fillStyle='#cf85ff';g.fillRect(-2,18,4,4);
   g.restore();
  }
 }
 // Crackling electric projectile from the defibrillator.
 for(const beam of storm.shockBeams){
  g.save();g.shadowColor='#76eaff';g.shadowBlur=22;
  g.strokeStyle='#aef7ff';g.lineWidth=5;g.beginPath();
  g.moveTo(beam.x+36,beam.y);
  for(let j=0;j<=6;j++)g.lineTo(beam.x+36-j*6,beam.y+(j%2?8:-8));
  g.stroke();g.strokeStyle='#ffffff';g.lineWidth=2;g.stroke();
  g.restore();
 }
 // Esat's blue magic projectiles and their impact flashes.
 // Charging aura follows Esat's hand while left mouse is held.
 if(storm.chargeActive&&storm.magicUnlocked&&storm.portalScene==='none'){
  const power=Math.min(1,storm.chargeFrames/75),cx=p.x+p.w/2+(p.dir||1)*14,cy=p.y+p.h*.45;
  g.save();g.globalCompositeOperation='lighter';
  g.shadowColor='#32d9ff';g.shadowBlur=12+power*30;
  g.fillStyle='#59baff';g.beginPath();g.arc(cx,cy,5+power*17,0,Math.PI*2);g.fill();
  g.strokeStyle='#bdf7ff';g.lineWidth=2+power*3;
  g.beginPath();g.arc(cx,cy,12+power*21+Math.sin(t*.3)*2,0,Math.PI*2);g.stroke();
  for(let k=0;k<12;k++){const a=k*Math.PI/6+t*.09,rad=22+power*23;g.fillStyle='#9cefff';g.fillRect(cx+Math.cos(a)*rad,cy+Math.sin(a)*rad,2+power*3,2+power*3);}
  // At full charge the energy becomes unmistakable: rotating runic rings,
  // lightning forks, inward-flying particles and a pulsing white-hot core.
  if(power>=1){
   const pulse=1+.12*Math.sin(t*.21);
   g.shadowColor='#64efff';g.shadowBlur=38;
   const glow=g.createRadialGradient(cx,cy,2,cx,cy,80*pulse);
   glow.addColorStop(0,'rgba(255,255,255,.9)');
   glow.addColorStop(.2,'rgba(80,235,255,.52)');
   glow.addColorStop(.65,'rgba(23,100,255,.22)');
   glow.addColorStop(1,'rgba(0,50,255,0)');
   g.fillStyle=glow;g.beginPath();g.arc(cx,cy,80*pulse,0,Math.PI*2);g.fill();
   g.fillStyle='#fff';g.beginPath();g.arc(cx,cy,13*pulse,0,Math.PI*2);g.fill();
   for(let ring=0;ring<3;ring++){
    g.save();g.translate(cx,cy);g.rotate(t*(ring%2?-.055:.065)+ring*1.1);
    g.strokeStyle=ring===1?'#ffffff':'#48dfff';g.lineWidth=ring===1?3:2;
    g.setLineDash([12,7,4,9]);g.beginPath();
    g.ellipse(0,0,(30+ring*12)*pulse,(17+ring*9)*pulse,ring*.6,0,Math.PI*2);g.stroke();
    g.restore();
   }
   g.setLineDash([]);
   for(let k=0;k<8;k++){
    const angle=k*Math.PI/4+t*.11,reach=29+(k%3)*9;
    g.strokeStyle=k%2?'#e9ffff':'#49baff';g.lineWidth=2.5;
    g.beginPath();g.moveTo(cx+Math.cos(angle)*12,cy+Math.sin(angle)*12);
    g.lineTo(cx+Math.cos(angle+.18)*reach*.65,cy+Math.sin(angle+.18)*reach*.65);
    g.lineTo(cx+Math.cos(angle)*reach,cy+Math.sin(angle)*reach);g.stroke();
   }
   for(let k=0;k<28;k++){
    const angle=k*2.39996+t*.018,rad=18+((k*17+t*2)%85);
    g.globalAlpha=.35+.65*(1-rad/110);
    g.fillStyle=k%4===0?'#fff':'#7ae8ff';
    g.fillRect(cx+Math.cos(angle)*rad,cy+Math.sin(angle)*rad,2+k%3,2+k%3);
   }
   g.globalAlpha=1;g.shadowBlur=0;
   /* instructional overlay removed */
  }
  g.restore();
 }
 for(const orb of storm.magicOrbs){
  g.save();
  for(let j=0;j<orb.trail.length;j++){
   const tr=orb.trail[j];g.globalAlpha=(j+1)/orb.trail.length*.45;
   g.fillStyle='#47aaff';g.beginPath();g.arc(tr.x,tr.y,(3+j*.45)*(1+(orb.power||0)*1.3),0,Math.PI*2);g.fill();
  }
  g.globalAlpha=1;g.shadowColor='#16aaff';g.shadowBlur=17;
  g.fillStyle='#087bfa';g.beginPath();g.arc(orb.x,orb.y,9*(1+(orb.power||0)*1.8),0,Math.PI*2);g.fill();
  g.fillStyle='#9cf6ff';g.beginPath();g.arc(orb.x-2,orb.y-2,4*(1+(orb.power||0)*1.5),0,Math.PI*2);g.fill();g.restore();
 }
 for(const burst of storm.magicBursts){
  g.save();g.globalAlpha=1-burst.age/18;g.strokeStyle='#71e7ff';g.lineWidth=3;g.shadowColor='#00baff';g.shadowBlur=15;
  g.beginPath();g.arc(burst.x,burst.y,(4+burst.age*1.3)*(1+(burst.power||0)*1.5),0,Math.PI*2);g.stroke();g.restore();
 }
 for(const shot of storm.shots){
  // Continuous violet fluid jet: irregular flowing ribbon with transparent edges,
  // wobbling surface and separated droplets. The projectile hitbox is unchanged.
  g.save();g.lineCap='round';g.lineJoin='round';
  const points=shot.trail.concat([{x:shot.x,y:shot.y}]);
  if(points.length>1){
   for(const [width,color,alpha] of [[18,'#65219b',.32],[12,'#a63ae5',.83],[6,'#dc89ff',.88]]){
    g.globalAlpha=alpha;g.strokeStyle=color;g.lineWidth=width;
    g.shadowColor='#ae43ec';g.shadowBlur=width===12?11:0;
    g.beginPath();
    for(let i=0;i<points.length;i++){
     const q=points[i],wave=Math.sin(storm.time*.42+i*1.25)*3;
     if(i===0)g.moveTo(q.x,q.y+wave);
     else g.lineTo(q.x,q.y+wave);
    }
    g.stroke();
   }
  }
  g.shadowBlur=0;
  // The stream narrows to a splashing tip, not a circular projectile.
  g.globalAlpha=.95;g.fillStyle='#df8cff';
  g.beginPath();g.ellipse(shot.x-5,shot.y+Math.sin(storm.time*.42)*3,11,5,-.16,0,Math.PI*2);g.fill();
  for(let k=0;k<9;k++){
   const phase=shot.age*.31+k*2.37;
   const distance=6+(k*7+shot.age*2)%27;
   const dx=Math.sin(phase)*distance,dy=Math.cos(phase*1.3)*(5+k%4*3);
   g.globalAlpha=.3+.55*(1-(distance/40));
   g.fillStyle=k%3===0?'#f4c5ff':'#b655ef';
   g.beginPath();g.ellipse(shot.x+dx,shot.y+dy,1.5+k%3,2.5+k%2,phase,0,Math.PI*2);g.fill();
  }
  g.restore();
 }
 for(const burst of storm.poisonBursts){
  g.save();g.globalAlpha=Math.max(0,1-burst.age/24);
  g.strokeStyle='#d55bff';g.lineWidth=3;g.shadowColor='#bc42ff';g.shadowBlur=12;
  g.beginPath();g.arc(burst.x,burst.y,4+burst.age*1.25,0,Math.PI*2);g.stroke();
  for(let i=0;i<7;i++){
   const angle=i*Math.PI*2/7+burst.age*.08;
   const radius=burst.age*1.8;
   g.fillStyle=i%2?'#faafff':'#8532db';
   g.beginPath();g.arc(burst.x+Math.cos(angle)*radius,burst.y+Math.sin(angle)*radius,Math.max(1,4-burst.age*.12),0,Math.PI*2);g.fill();
  }
  g.restore();
 }
 if(storm.stage==='won'&&!storm.artifactCollected&&!storm.sametHasArtifact){
  const bob=Math.sin(storm.time*.075)*5,cy=FLOOR-48+bob;
  g.save();g.shadowColor='#c35bff';g.shadowBlur=18+6*Math.sin(storm.time*.08);
  if(alinaArtifactImage.complete&&alinaArtifactImage.naturalWidth>0){
   g.drawImage(alinaArtifactImage,ax-12,cy-51,64,43);
  }else{
   g.fillStyle='#b44bff';g.beginPath();g.moveTo(ax+20,cy-45);g.lineTo(ax+41,cy-25);g.lineTo(ax+20,cy-5);g.lineTo(ax-1,cy-25);g.fill();
  }
  g.restore();
  if(Math.abs((p.x+p.w/2)-(ax+20))<72)text('E - RELIKT AUFHEBEN',ax+20,cy-60,12,'#f1dcff','center');
 }
 // Cinematic storm aura: builds behind Samet after Esat compares him to his father.
 if(storm.cinematicRage>0&&['sametStole','sametThreat','sametSpell','sametThrowPortal','sametJumpPortal'].includes(storm.portalScene)){
  const intensity=storm.cinematicRage,cx=storm.sametX+14,cy=FLOOR-42;
  g.save();g.globalCompositeOperation='lighter';
  const aura=g.createRadialGradient(cx,cy,4,cx,cy,105);
  aura.addColorStop(0,'rgba(255,230,255,'+(.19*intensity)+')');
  aura.addColorStop(.4,'rgba(255,35,35,'+(.25*intensity)+')');
  aura.addColorStop(1,'rgba(140,0,0,0)');
  g.fillStyle=aura;g.fillRect(cx-115,cy-115,230,230);
  for(let i=0;i<26;i++){
   const a=i*2.39996,orbit=15+(i%7)*9;
   const px=cx+Math.cos(a+t*.022*(i%2?1:-1))*orbit;
   const py=cy+Math.sin(a*1.6+t*.045)*22-((t*(1+i%3)*.7+i*23)%112);
   g.globalAlpha=intensity*(.3+.5*Math.abs(Math.sin(t*.045+i)));
   g.fillStyle=i%3===0?'#ff302b':i%3===1?'#ff7a24':'#ffd6a6';
   g.shadowColor='#ff2424';g.shadowBlur=12;
   g.fillRect(px,py,2+i%3,3+i%3);
  }
  g.globalAlpha=intensity*(.35+.25*Math.sin(t*.12));
  g.strokeStyle='#ff4433';g.lineWidth=2;g.shadowBlur=18;
  for(let i=0;i<3;i++){
   g.beginPath();g.ellipse(cx,cy,30+i*17,14+i*9,t*.012+i,0,Math.PI*2);g.stroke();
  }
  g.restore();
 }
 // Samet conjures a sinister portal after his threat.
 if(['sametThreat','sametSpell','sametThrowPortal','sametJumpPortal','sametPortalEnd'].includes(storm.portalScene)){
  const x=(storm.portalScene==='sametJumpPortal'||storm.portalScene==='sametPortalEnd'?storm.sametLeapX:storm.sametX)+70,y=FLOOR-72;
  g.save();g.shadowColor='#ff3d9a';g.shadowBlur=24;
  g.fillStyle='#230620';g.beginPath();g.ellipse(x,y,30,64,0,0,Math.PI*2);g.fill();
  g.strokeStyle='#ff397e';g.lineWidth=6;g.stroke();
  g.strokeStyle='#b456ff';g.lineWidth=3;g.beginPath();g.ellipse(x,y,20+Math.sin(t*.12)*3,53,0,0,Math.PI*2);g.stroke();
  g.restore();
 }
 // Samet runs in from behind after Esat notices the portal.
 if(storm.portalScene==='sametApproach'||storm.portalScene==='sametPraise'||storm.portalScene==='sametHug'||storm.portalScene==='sametLastWords'||storm.portalScene==='sametPush'||storm.portalScene==='sametStole'||storm.portalScene==='sametThreat'||storm.portalScene==='sametSpell'||storm.portalScene==='sametThrowPortal'||storm.portalScene==='sametJumpPortal'){
  const sametWalking=storm.portalScene==='sametApproach'||storm.portalScene==='sametHug';
  const walkPhase=storm.sametTimer*.19;
  const bounce=sametWalking?Math.abs(Math.sin(walkPhase))*2:0;
  g.save();
  g.translate(storm.sametX+14,(storm.portalScene==='sametJumpPortal'?storm.sametLeapY+58:FLOOR)-bounce);
  // The original Samet sprite faces right when mirrored (scale -1).
  // Always orient toward Esat, both on approach and after the throw.
  const facingEsat=p.x+p.w/2>=storm.sametX+14?-1:1;
  g.scale(facingEsat,1);
  if(sametSprite.complete&&sametSprite.naturalWidth){
   // Animate the existing sprite with a subtle waddle and bounce, without added legs.
   g.save();g.rotate(sametWalking?Math.sin(walkPhase)*.035:0);
   g.drawImage(sametSprite,-21,-58,42,58);g.restore();
  }else{
   r(-12,-45,23,45,'#4b85ac');
  }
  g.restore();
  if((storm.portalScene==='sametApproach'&&storm.sametTimer<110)||storm.portalScene==='portalDialogue'){
   text('!',p.x+p.w/2,p.y-18,30,'#ffdf60','center');
  }
 }
 // Flight streaks and ghost silhouettes make Samet's throw feel powerful.
 if(storm.portalScene==='sametPush'||storm.pushImpact>0){
  for(const ghost of storm.pushAfterimage){
   g.save();g.globalAlpha=ghost.life/15*.5;
   g.fillStyle='#d5a1ff';g.fillRect(ghost.x,ghost.y,p.w,p.h);g.restore();
  }
  if(storm.portalScene==='sametPush'){
   g.save();g.strokeStyle='#f7d8ff';g.lineWidth=3;
   for(let k=0;k<5;k++){
    const offset=k*13;
    g.globalAlpha=.6-k*.09;
    g.beginPath();g.moveTo(p.x+24+offset,p.y+7+k*5);g.lineTo(p.x+65+offset,p.y+3+k*5);g.stroke();
   }
   g.restore();
  }
  if(storm.pushImpact>0){
   const cx=storm.pushTarget+p.w/2,cy=FLOOR-8;
   g.save();g.strokeStyle='#ffb5ed';g.lineWidth=4;g.globalAlpha=storm.pushImpact/24;
   g.beginPath();g.ellipse(cx,cy,90*(1-storm.pushImpact/26)+12,16,0,0,Math.PI*2);g.stroke();
   for(let k=0;k<8;k++){
    const angle=Math.PI*2*k/8;
    g.beginPath();g.moveTo(cx+Math.cos(angle)*16,cy+Math.sin(angle)*12);g.lineTo(cx+Math.cos(angle)*65,cy+Math.sin(angle)*25);g.stroke();
   }
   g.restore();
  }
 }
 if(['sametSpell','sametThrowPortal'].includes(storm.portalScene)){
  // Cinematic telekinetic grip: multi-layer red aura, orbiting sigils, sparks,
  // radial shockwaves and energy tethers. Driven by storm.time even in dialogue.
  const cx=p.x+p.w/2,cy=p.y+p.h/2;
  const age=t-(storm.spellStartTime||t);
  g.save();g.globalCompositeOperation='lighter';
  for(let layer=3;layer>=0;layer--){
   const pulse=Math.sin(t*.13+layer)*4;
   g.shadowColor=layer%2?'#ff264f':'#ff9a3d';g.shadowBlur=15+layer*9;
   g.strokeStyle=['#ff1e38','#ff466e','#ff9356','#ff1949'][layer];
   g.globalAlpha=.18+(.08*(3-layer));
   g.lineWidth=2+layer*1.4;
   g.beginPath();g.ellipse(cx,cy,22+layer*7+pulse,35+layer*9+pulse,Math.sin(t*.02)*.1,0,Math.PI*2);g.stroke();
  }
  g.globalAlpha=.78;g.shadowBlur=0;
  for(let k=0;k<14;k++){
   const a=k*Math.PI*2/14+t*(k%2?-.06:.07),radius=38+12*Math.sin(t*.08+k);
   const sx=cx+Math.cos(a)*radius,sy=cy+Math.sin(a)*radius*.9;
   g.fillStyle=k%3?'#ff3b6c':'#ffdfc5';
   g.fillRect(sx,sy,2+k%3,2+k%3);
  }
  for(let ring=0;ring<3;ring++){
   const phase=(age*2.7+ring*32)%105;
   g.globalAlpha=(1-phase/105)*.45;
   g.strokeStyle='#ff667f';g.lineWidth=3;
   g.beginPath();g.ellipse(cx,cy,phase*.75+8,phase+12,0,0,Math.PI*2);g.stroke();
  }
  g.restore();
  // Samet's hand focuses the beam; jagged forks pulse toward Esat.
  g.save();g.globalCompositeOperation='lighter';g.lineCap='round';
  const sx=storm.sametX+14,sy=FLOOR-43;
  for(let beam=0;beam<3;beam++){
   g.strokeStyle=beam===0?'#ff254d':beam===1?'#ff9a7c':'#ffdfc9';
   g.globalAlpha=beam===0?.65:beam===1?.55:.75;
   g.lineWidth=beam===0?8:beam===1?4:1.6;
   g.shadowColor='#ff335b';g.shadowBlur=beam===0?25:10;
   g.beginPath();g.moveTo(sx,sy);
   for(let k=1;k<9;k++){
    const q=k/9;
    g.lineTo(sx+(cx-sx)*q,sy+(cy-sy)*q+Math.sin(t*.33+k*3+beam)*10*(1-q));
   }
   g.lineTo(cx,cy);g.stroke();
  }
  g.restore();
  // A red lighting pass makes Esat himself glow, not only his surroundings.
  g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.25+.12*Math.sin(t*.17)**2;
  g.shadowColor='#ff003f';g.shadowBlur=28;g.fillStyle='#ff163f';
  g.fillRect(p.x-2,p.y-2,p.w+4,p.h+4);g.restore();
  g.save();g.shadowColor='#ff174b';g.shadowBlur=28;
  g.fillStyle='#ff174b55';g.beginPath();g.ellipse(p.x+p.w/2,p.y+p.h/2,25,36,0,0,Math.PI*2);g.fill();
  g.strokeStyle='#ff3c60';g.lineWidth=3;g.beginPath();g.ellipse(p.x+p.w/2,p.y+p.h/2,22+Math.sin(t*.2)*3,34,0,0,Math.PI*2);g.stroke();
  g.restore();
 }
 // Twelve actual transparent PNG frames: Esat opens the chest and raises the blue pearl.
 const frameIndex=storm.chestReveal>0?Math.min(11,Math.floor((storm.chestReveal-1)/9)):0;
 const chestFrame=stormChestFrames[frameIndex];
 if((!storm.chestOpened||storm.chestReveal>0)&&chestFrame.complete&&chestFrame.naturalWidth>0){
  g.save();g.imageSmoothingEnabled=false;
  // The exported frames have a 45px caption strip beneath the actual feet/chest.
  // Crop that strip and anchor the visible sprite bottom exactly on FLOOR.
  // Keep the complete feet and chest bottom in every frame; crop only the caption below y=250.
  // A fixed crop and fixed ground anchor prevent a vertical jump when the pearl is lifted.
  const scale=.30,sourceHeight=Math.min(250,chestFrame.naturalHeight),drawX=storm.chestX-43;
  // The original sprite sheet shifts the artwork 28 source pixels downward at frame 7.
  // Align the actual shoe/chest baseline (218 in frames 1-6, 246 in frames 7-12).
  const spriteGroundY=frameIndex<6?218:246;
  const drawY=FLOOR-spriteGroundY*scale;
  if(storm.chestReveal>0)g.drawImage(chestFrame,0,0,chestFrame.naturalWidth,sourceHeight,drawX,drawY,chestFrame.naturalWidth*scale,sourceHeight*scale);
  else g.drawImage(chestFrame,128,0,chestFrame.naturalWidth-128,sourceHeight,drawX+128*scale,drawY,(chestFrame.naturalWidth-128)*scale,sourceHeight*scale);
  g.restore();
  if(!storm.chestReveal&&Math.abs((p.x+p.w/2)-(storm.chestX+24))<66)
   text('E - TRUHE ÖFFNEN',storm.chestX+24,FLOOR-68,12,'#ffe6a5','center');
 }else if(!storm.chestOpened||storm.chestReveal>0){
  // Graceful fallback until the PNG files are added.
  const x=storm.chestX,y=FLOOR-31;
  r(x,y+9,47,23,'#60321d');r(x+3,y+12,41,17,'#925126');
  r(x-2,y,51,15,'#ad7137');r(x+2,y+3,43,8,'#db9b4e');
  r(x+21,y+4,8,27,'#e7c65b');
  if(!storm.chestReveal&&Math.abs((p.x+p.w/2)-(x+24))<66)
   text('E - TRUHE ÖFFNEN',x+24,y-14,12,'#ffe6a5','center');
 }
 if(!['sametJumpPortal','sametPortalEnd'].includes(storm.portalScene)&&!(storm.chestReveal>0)&&!(storm.inv>0&&Math.floor(storm.inv/5)%2))drawHero(p.x,p.y);
 g.restore();
 // Foreground storm haze, kept below the HUD and dialogue.
 g.save();g.globalAlpha=.12;g.fillStyle='#9a64c8';
 for(let k=0;k<8;k++){
  const x=((k*145+t*.55)%(W+210))-105;
  g.beginPath();g.ellipse(x,FLOOR-9+Math.sin(t*.025+k)*6,100,21,0,0,Math.PI*2);g.fill();
 }
 g.restore();
 r(0,0,W,38,'#1a172bdc');
 text('♥ '.repeat(hp),12,25,21,'#ff88a2');
 text('DIE STURMWELT',W-12,25,14,'#e6baff','right');
 if(storm.stage==='fight'&&!storm.clash){
  r(170,46,300,16,'#32172e');r(172,48,296*storm.bossHp/storm.bossMax,12,'#bd61df');
  text('ALINA – DIE VERGESSENE HEXE',W/2,80,14,'#ffd2ff','center');
 }
 // No floating instructions, status announcements or taunt banners in Alina's world.
 drawTalk();
}

const JESSICA_OUTSIDE_PORTAL_X=2270;
// Let Esat finish falling while a Jessica dialogue locks movement.
function settleJessicaDialogueFall(){
 if(!p)return;
 p.vx=0;
 if(jessicaLevel.farewellStage==='outside'){
  if(p.on&&p.vy===0)return;
  p.vy=Math.min(12,p.vy+.55);p.y+=p.vy;
  if(p.y+p.h>=FLOOR){p.y=FLOOR-p.h;p.vy=0;p.on=true;}
  return;
 }
 if(jessicaLevel.climbing){jessicaLevel.climbing=null;p.vy=0;}
 if(p.on&&p.vy===0)return;
 const oldBottom=p.y+p.h;
 p.vy=Math.min(10,p.vy+.5);p.y+=p.vy;p.on=false;
 if(p.vy>=0){
  let landing=null;
  for(const pl of jessicaLevel.platforms){
   const surface=jessicaSurfaceY(pl,p.x+p.w/2);
   if(p.x+p.w>pl.x&&p.x<pl.x+pl.w&&oldBottom<=surface+6&&p.y+p.h>=surface){
    if(landing===null||surface<landing)landing=surface;
   }
  }
  if(landing!==null){p.y=landing-p.h;p.vy=0;p.on=true;}
 }
 if(p.y+p.h>=FLOOR){p.y=FLOOR-p.h;p.vy=0;p.on=true;}
 cam=jessicaCameraX();jessicaLevel.cameraY=Math.min(0,p.y-(FLOOR-210));
}
function updateJessicaLevel(){
 if(jessicaLevel.damageFlash>0)jessicaLevel.damageFlash--;
 if(jessicaLevel.farewellStage==='teleport'){
  jessicaLevel.farewellTimer--;
  if(jessicaLevel.farewellTimer<=0){
   jessicaLevel.farewellStage='outside';
   jessicaLevel.outsideArrival=244; // 180 frames (3 seconds) fully black, then 64 frames of arrival
   // Still inside Jessica's dreamworld, now safely outside her castle.
   p.x=100;p.y=FLOOR-p.h;p.vx=0;p.vy=0;p.on=true;
   jessicaLevel.cameraY=0;cam=0;
  }
  return;
 }
 if(jessicaLevel.farewellStage==='outside'){
  const scene=jessicaLevel;
  if(scene.outsideArrival>0){
   scene.outsideArrival--;
   // Keep Jessica's farewell song playing through the return, title and Samet encounter.
   if(scene.outsideArrival===64){scene.outsideTitleClock=190;}
   p.vx=0;p.vy=0;keys.left=false;keys.right=false;keys.jump=false;frame++;return;
  }
  if(scene.outsideTitleClock>0){if(scene.outsideTitleClock===189)snd(590,.35);scene.outsideTitleClock--;p.vx=0;p.vy=0;keys.left=false;keys.right=false;keys.jump=false;frame++;return;}
  // A one-time cinematic encounter near the exit portal.
  if(scene.outsideEncounter==='approach'&&p.x>=JESSICA_OUTSIDE_PORTAL_X-150){
   scene.outsideEncounter='surprise';scene.outsideTick=60;
   scene.outsideSametX=cam-72; // Spawn fully off-screen to the left, relative to the frozen camera.
   p.vx=0;p.vy=0;p.on=true;
   p.dir=-1;keys.left=false;keys.right=false;keys.jump=false;
  }
  if(scene.outsideEncounter==='surprise'){
   p.vx=0;p.dir=-1;
   if(--scene.outsideTick<=0)scene.outsideEncounter='sametRunning';
   frame++;return;
  }
  if(scene.outsideEncounter==='sametRunning'){
   p.vx=0;p.dir=-1;
   scene.outsideSametX=Math.min(p.x-65,scene.outsideSametX+2.0);
   if(scene.outsideSametX>=p.x-65){
    scene.outsideEncounter='talking';
    beginTalk(jessicaOutsideWisdom,()=>{scene.outsideEncounter='done';syncBossMusic();},'continue');
   }
   frame++;return;
  }
  if(scene.outsideEncounter==='talking'||talk){if(talk)settleJessicaDialogueFall();else p.vx=0;return;}
  if(scene.outsidePortalEntered){
   p.vx=0;p.vy=0;keys.left=false;keys.right=false;keys.jump=false;
   scene.outsidePortalShrink++;
   if(scene.outsidePortalShrink>=48){
    if(window.portalWarp)window.portalWarp('sarah-level.html','rose',{x:Math.max(0,Math.min(1,(JESSICA_OUTSIDE_PORTAL_X-cam+29)/W)),y:(FLOOR-75)/H});
    else window.location.href='sarah-level.html';
   }
   frame++;return;
  }
  // Independent walkable exterior scene; scrolling camera reveals the panorama.
  if(talk){settleJessicaDialogueFall();return;}
  const left=keys.left||keys.a,right=keys.right||keys.d;
  p.vx=(right?3.1:0)-(left?3.1:0);
  p.x=Math.max(0,Math.min(2350-p.w,p.x+p.vx));
  if(p.vx)p.dir=p.vx>0?1:-1;
  if((keys.jump||keys.up||keys.w)&&p.on){p.vy=-10;p.on=false;}
  p.vy=Math.min(12,p.vy+0.55);
  p.y+=p.vy;
  if(p.y+p.h>=FLOOR){p.y=FLOOR-p.h;p.vy=0;p.on=true;}
  cam=Math.max(0,Math.min(2350-W,p.x-W*.35));
  if(scene.outsideEncounter==='done'&&p.x+p.w>JESSICA_OUTSIDE_PORTAL_X-12&&p.x<JESSICA_OUTSIDE_PORTAL_X+66&&p.y+p.h>FLOOR-145){
   scene.outsidePortalEntered=true;scene.outsidePortalShrink=0;
   fadeOutJessicaFarewell(800);
  }
  frame++;
  return;
 }
 if(jessicaLevel.entranceDelay>0){
  jessicaLevel.entranceDelay--;
  p.vx=0;
  if(jessicaLevel.entranceDelay===0){
   beginTalk(jessicaCastleEntranceLines,()=>{syncBossMusic();},'continue');
  }
  return;
 }
 if(talk){settleJessicaDialogueFall();return;}
 // Jessica sits at the far right of the top landing.
 if(!jessicaLevel.throneSceneStarted&&p.y+p.h<=jessicaSurfaceY(jessicaLevel.platforms[6],p.x+p.w/2)+8&&p.x>=JESSICA_LENGTH-205){
  startJessicaThroneFarewell();return;
 }
 frame++;
 // Once Esat reaches the top platform, Jessica stops sending reinforcements.
 if(p.y+p.h<=jessicaSurfaceY(jessicaLevel.platforms[6],p.x+p.w/2)+6){
  jessicaLevel.spawnsStopped=true;
 }
 updateJessicaIbiza();
 if(mode==='dead')return;
 updateJessicaRabbits();
 if(mode==='dead')return;
 const speed=3;p.vx=(keys.right?speed:0)-(keys.left?speed:0);
 const climbDirection=(keys.down?1:0)-(keys.climbUp?1:0);
 let ladder=jessicaLevel.climbing;
 if(ladder&&(p.vx||keys.jump&&!jumpHeld)){
  jessicaLevel.climbing=null;ladder=null;
  if(keys.jump&&!jumpHeld){p.vy=-7.3;p.on=false;}
 }
 if(!ladder&&!p.vx&&!keys.jump&&climbDirection){
  const feet=p.y+p.h;
  ladder=jessicaLevel.ladders.find(l=>Math.abs(p.x+p.w/2-l.x)<=19&&feet>=l.top-2&&feet<=l.bottom+2&&(climbDirection<0?feet>l.top+.1:feet<l.bottom-.1));
  if(ladder){
   if(p.h===17){p.y-=17;p.h=34;}
   jessicaLevel.climbing=ladder;
  }
 }
 if(ladder){
  p.x=ladder.x-p.w/2;p.vx=0;p.vy=0;p.duck=false;p.on=false;
  const feet=Math.max(ladder.top,Math.min(ladder.bottom,p.y+p.h+climbDirection*2.2));
  p.y=feet-p.h;
  if((climbDirection<0&&feet===ladder.top)||(climbDirection>0&&feet===ladder.bottom)){jessicaLevel.climbing=null;p.on=true;}
  jumpHeld=keys.jump;
  cam=jessicaCameraX();jessicaLevel.cameraY=Math.min(0,p.y-(FLOOR-210));
  return;
 }
 if(keys.down&&p.on&&p.h===34){p.y+=17;p.h=17;}
 else if((!keys.down||!p.on)&&p.h===17){p.y-=17;p.h=34;}
 p.duck=keys.down&&p.on&&p.h===17;if(p.duck)p.vx*=.58;
 if(p.vx)p.dir=Math.sign(p.vx);
 if(keys.jump&&!jumpHeld&&p.on&&!keys.down){p.vy=-7.3;p.on=false;}
 jumpHeld=keys.jump;
 const oldBottom=p.y+p.h;
 p.x=Math.max(0,Math.min(JESSICA_LENGTH-p.w,p.x+p.vx));
 p.vy=Math.min(10,p.vy+.5);p.y+=p.vy;p.on=false;
 for(const pl of jessicaLevel.platforms){
  const surface=jessicaSurfaceY(pl,p.x+p.w/2);
  if(p.x+p.w>pl.x&&p.x<pl.x+pl.w&&oldBottom<=surface+6&&p.y+p.h>=surface&&p.vy>=0){
   p.y=surface-p.h;p.vy=0;p.on=true;
  }
 }
 cam=jessicaCameraX();jessicaLevel.cameraY=Math.min(0,p.y-(FLOOR-210));
}
// Pixel ornaments belong to Jessica's room only; gameplay geometry stays unchanged.
function drawJessicaRabbit(x,y,size=1,crowned=false){
 g.save();g.translate(x,y);g.scale(size,size);
 r(-12,-25,8,22,'#f9e5ed');r(4,-25,8,22,'#f9e5ed');
 r(-10,-22,4,15,'#dc8cad');r(6,-22,4,15,'#dc8cad');
 r(-14,-5,28,19,'#f9e5ed');r(-10,14,20,3,'#cfa5bf');
 r(-8,2,3,4,'#4a244c');r(5,2,3,4,'#4a244c');
 r(-2,7,4,3,'#c56490');r(-9,9,4,2,'#edb3ca');r(5,9,4,2,'#edb3ca');
 if(crowned){r(-10,-11,20,5,'#edc36f');r(-10,-17,4,7,'#edc36f');r(-2,-20,4,10,'#ffe4a1');r(6,-17,4,7,'#edc36f');r(-1,-12,2,3,'#d968a2');}
 g.restore();
}
// Deterministic animated embers and flames: decorative, never damage Esat.
function drawJessicaFlame(x,y,scale=1,seed=0){
 const t=Date.now()/180+seed;
 const sway=Math.sin(t)*3;
 g.save();g.translate(x,y);g.scale(scale,scale);
 r(-9,-18,18,18,'#b52f24');r(-6+sway*.3,-28,12,22,'#f07026');
 r(-3+sway*.5,-37,7,25,'#ffb83b');r(-2,-17,5,14,'#ffe58a');
 g.restore();
}
// Massive layered inferno, with low-cost pixel flames and drifting smoke.
function drawJessicaInferno(){
 const time=Date.now()/230;
 // Deep red atmospheric bands and distant ruined arches.
 for(let i=0;i<8;i++){
  const y=FLOOR-790+i*105;
  r(0,y,JESSICA_LENGTH,105,i%2?'#391a25':'#451c25');
 }
 for(let x=90;x<JESSICA_LENGTH;x+=240){
  r(x-52,FLOOR-790,104,790,'#291922');
  r(x-39,FLOOR-790,78,790,'#371e29');
  for(let y=FLOOR-755;y<FLOOR-70;y+=155){
   r(x-40,y,80,7,'#7e382f');
   r(x-31,y+7,62,4,'#b64c2d');
  }
 }
 // Removed the tall floor-wide fire wall to keep the lowest area clear.
 // Burning wall vents at multiple heights.
 for(let tier=1;tier<=6;tier++){
  const y=FLOOR-tier*100+38;
  for(let x=60+(tier%2)*45;x<JESSICA_LENGTH;x+=105){
   const height=38+(x+tier*13)%42;
   drawJessicaFlame(x,y,1.5+height/60,x+tier*19);
  }
 }
 // Slow translucent smoke columns, behind the player.
 g.save();
 for(let i=0;i<19;i++){
  const x=(i*137+43)%JESSICA_LENGTH+Math.sin(time*.22+i)*20;
  const y=FLOOR-((i*89+time*7)%820);
  g.globalAlpha=.13+Math.sin(time*.25+i)*.03;
  r(x,y,52+(i%3)*16,24,'#100e19');
  r(x+16,y-21,44,20,'#160f19');
 }
 g.restore();
}
function drawJessicaForegroundFire(){
 // Foreground flames frame the scene without hiding Esat or Jessica.
 for(let tier=0;tier<6;tier++){
  const pl=jessicaLevel.platforms[tier];
  for(let x=18;x<JESSICA_LENGTH;x+=77){
   if((Math.floor(x/77)+tier)%3===0)continue;
   const y=jessicaSurfaceY(pl,x);
   drawJessicaFlame(x,y+8,.65+(x%4)*.12,x+tier*19);
  }
 }
}
function drawJessicaEmbers(){
 const t=Date.now()/70;
 for(let i=0;i<155;i++){
  const x=(i*173+37)%JESSICA_LENGTH;
  const y=FLOOR-((i*97+t*(1+i%3)*.55)%790);
  r(x+Math.sin(t*.04+i)*7,y,i%4===0?3:2,i%4===0?3:2,i%3===0?'#ffd27c':'#f05b36');
 }
}
function drawJessicaHall(){
 const top=FLOOR-790,bottom=FLOOR;
 r(0,top,JESSICA_LENGTH,bottom-top,'#27141e');
 drawJessicaInferno();
 for(let row=0;row<23;row++){
  const y=top+row*36;
  for(let x=(row%2?-44:0);x<JESSICA_LENGTH;x+=88){
   r(x+1,y+1,85,33,row%2?'#39232c':'#321e29');r(x+3,y+2,81,2,'#65404a'); if((row*7+x)%5===0){r(x+55,y+10,2,16,'#b44830');r(x+57,y+25,8,2,'#b44830');}
  }
 }
 for(let x=35;x<JESSICA_LENGTH;x+=300){
  r(x,top,28,bottom-top,'#5b3c60');r(x+5,top,7,bottom-top,'#805774');
  r(x-5,top+7,38,14,'#d4ac70');r(x-5,FLOOR-17,38,17,'#9c674f');
  for(let y=top+125;y<FLOOR-30;y+=235){drawJessicaFlame(x+14,y,1.15,x+y);r(x+4,y-50,19,4,'#4d2b2c');}
 }
 for(let x=265;x<JESSICA_LENGTH;x+=600){
  // Torn, charred royal rabbit banners.
  r(x-44,top+60,88,8,'#6c4b43');
  g.save();g.beginPath();g.moveTo(x-39,top+68);g.lineTo(x+39,top+68);
  g.lineTo(x+34,top+185);g.lineTo(x+20,top+202);g.lineTo(x+10,top+188);
  g.lineTo(x-7,top+229);g.lineTo(x-19,top+198);g.lineTo(x-34,top+212);
  g.closePath();g.clip();
  r(x-40,top+68,80,165,'#5c263d');
  r(x-33,top+72,66,119,'#8a3954');
  drawJessicaRabbit(x,top+155,1.55,true);
  r(x-34,top+178,65,6,'#21181e');
  r(x-22,top+112,12,17,'#23191e');r(x+19,top+170,9,15,'#23191e');
  g.restore();
  for(let by=top+86;by<top+215;by+=29){drawJessicaFlame(x-37,by,1.15,x+by);drawJessicaFlame(x+37,by,1.2,x-by);}
  drawJessicaFlame(x-26,top+208,2,x);
  drawJessicaFlame(x+28,top+189,1.9,x+10);
 }
 // Repeated rabbit portraits fill the walls between the climbing routes.
 for(let tier=0;tier<6;tier++){
  const y=FLOOR-tier*100-48;
  for(const x of [330,620]){
   r(x-30,y-30,60,67,'#b68b62');r(x-26,y-26,52,59,'#482047');
   drawJessicaRabbit(x,y+4,.9,tier===5);
  }
 }
 for(let x=35;x<JESSICA_LENGTH;x+=95){
  // No oversized floor flames at the bottom.

  drawJessicaFlame(x+40,top+30,1.4,x+30);
 }
 drawJessicaEmbers();
 // Royal carpet and a large crowned rabbit crest above the highest landing.
 r(0,FLOOR-2,JESSICA_LENGTH,3,'#e1b66c');
 drawJessicaRabbit(490,FLOOR-703,2.1,true);
}
const jessicaBurningCastleBackground=new Image();
jessicaBurningCastleBackground.src='assets/images/jessica_castle_burning.png';
function drawJessicaHUD(){
 // One compact HUD shared by the palace and the exterior scene.
 g.save();
 r(8,7,W-16,35,'#1a142be8');
 r(8,7,W-16,2,'#d9a4cb');
 r(8,40,W-16,2,'#775478');
 for(const x of [153,314,455])r(x,13,1,23,'#8b688c');
 text('♥ '.repeat(Math.max(0,hp)),19,32,19,'#ff8ba7');
 text('🥕 '+(infiniteAmmo||(secondBoss&&secondBoss.active&&!secondBoss.defeated)?'∞':carrots),171,30,17,'#ffdb91');
 text('TODE '+deaths,333,30,15,'#f4d7e7');
 text('LEVEL 1',W-26,30,15,'#f3bdd5','right');
 g.restore();
}
function drawJessicaPauseOverlay(){r(180,135,280,80,'#181626');text('PAUSE',W/2,184,28,'#ffd27a','center');}
function drawJessicaLevel(){
 if(jessicaLevel.farewellStage==='outside'){
  // Parallax panorama: image moves with the camera, revealing more as Esat walks.
  const image=jessicaBurningCastleBackground;
  if(image.complete&&image.naturalWidth>0){
   // Uniform scaling: never stretch the panorama horizontally or vertically.
   const scale=H/image.naturalHeight;
   const drawW=image.naturalWidth*scale;
   const maxScroll=Math.max(0,drawW-W);
   const progress=Math.max(0,Math.min(1,cam/Math.max(1,2350-W)));
   const offset=progress*maxScroll;
   // Center a narrower image instead of distorting it to fill the screen.
   g.drawImage(image,drawW<W?(W-drawW)/2:-offset,0,drawW,H);
  }else{r(0,0,W,H,'#291b38');}
  // Concrete walkway: fixed in the world, with seams and chipped stone edges.
  r(0,FLOOR,W,H-FLOOR,'#4c4a56');
  r(0,FLOOR,W,7,'#a5a2aa');
  r(0,FLOOR+7,W,5,'#77737d');
  for(let i=Math.floor(cam/86)-1;i<=Math.ceil((cam+W)/86)+1;i++){
   const x=i*86-cam;
   r(x,FLOOR+9,2,H-FLOOR-9,'#292b37');
   r(x+5,FLOOR+22,28,2,'#66636b');
   r(x+42,FLOOR+36,17,2,'#383943');
  }
  // Detailed rabbit-themed stone portal, drawn in pixel-art without extra assets.
  const portalX=JESSICA_OUTSIDE_PORTAL_X-cam;
  const portalActive=jessicaLevel.outsideEncounter==='done';
  g.save();g.translate(Math.round(portalX),FLOOR-130);
  g.shadowColor=portalActive?'#c64cff':'#6c3b84';g.shadowBlur=portalActive?23:8;
  // Cracked stone arch, layered masonry and side columns.
  r(-12,31,15,99,'#201b30');r(56,31,15,99,'#201b30');
  r(-8,27,12,98,'#5d526e');r(55,27,12,98,'#5d526e');
  r(-12,50,20,8,'#8d739e');r(53,50,20,8,'#8d739e');
  r(-12,82,20,7,'#a48aaf');r(53,82,20,7,'#a48aaf');
  r(-18,120,91,10,'#40334f');r(-21,126,97,6,'#9c80a9');
  r(1,17,57,24,'#30243f');r(7,10,45,19,'#716081');
  r(15,4,29,17,'#ad8cc1');r(22,0,15,9,'#e6c6f4');
  // The violet vortex stays animated, but the frame never stretches.
  r(5,34,49,86,'#211039');
  g.save();g.beginPath();g.rect(7,35,45,82);g.clip();
  for(let k=0;k<9;k++){
   const yy=39+k*11;
   const xx=10+Math.sin(frame*.075+k*.9)*8;
   r(xx,yy,39,7,k%2?'#6c27a8':'#9d46d8');
   r(xx+8,yy+2,18,3,'#d788ff');
  }
  r(25+Math.sin(frame*.1)*5,74,11,11,'#f1c0ff');
  g.restore();
  // Bunny insignia on the keystone.
  r(23,9,5,13,'#e9c9ee');r(32,9,5,13,'#e9c9ee');
  r(21,17,18,14,'#f0d9f0');r(25,22,3,3,'#5c2a71');r(33,22,3,3,'#5c2a71');
  r(30,27,3,2,'#b35b9b');
  for(let k=0;k<5;k++){
   const xx=10+k*11,yy=47+(k%2)*15+Math.sin(frame*.08+k)*4;
   r(xx,yy,3,3,'#f9d2ff');
  }
  g.restore();
  
  if(jessicaLevel.outsideEncounter==='surprise'){
   r(p.x-cam+3,p.y-45,18,23,'#fff0df');
   text('!',p.x-cam+12,p.y-28,20,'#a32654','center');
  }
  if(['sametRunning','talking','done'].includes(jessicaLevel.outsideEncounter)&&sametWalkSprite.complete&&sametWalkSprite.naturalWidth){
   const x=jessicaLevel.outsideSametX-cam;
   const pose=jessicaLevel.outsideEncounter==='sametRunning'?Math.floor(frame/7)%8:0;
   g.save();g.translate(Math.round(x+24),FLOOR);g.scale(-1,1);
   drawGroundedSprite(sametWalkSprite,-24,0,48,78,pose*64,0,64,104);
   g.restore();
  }
  if(jessicaLevel.outsideArrival>0){
   const a=jessicaLevel.outsideArrival;
   if(a<=64){
    const strength=Math.min(1,(64-a)/30);
    g.save();g.globalAlpha=strength;drawHero(p.x-cam,p.y);g.restore();
    drawJessicaMagic(p.x-cam+p.w/2,p.y+p.h/2,2);
   }
   if(a>64)r(0,0,W,H,'#000000');
  }else if(jessicaLevel.outsidePortalEntered){
   const t=Math.min(1,jessicaLevel.outsidePortalShrink/48),scale=Math.max(0,1-t);
   const startX=p.x-cam+p.w/2,startY=p.y+p.h/2;
   const targetX=JESSICA_OUTSIDE_PORTAL_X-cam+29,targetY=FLOOR-76;
   const x=startX+(targetX-startX)*t,y=startY+(targetY-startY)*t;
   if(scale>0){g.save();g.translate(x,y);g.scale(scale,scale);drawHero(-p.w/2,-p.h/2);g.restore();}
  }else drawHero(p.x-cam,p.y);
  if(jessicaLevel.outsideTitleClock>0&&jessicaLevel.outsideArrival===0){const elapsed=190-jessicaLevel.outsideTitleClock;const alpha=Math.max(0,Math.min(1,elapsed/38,jessicaLevel.outsideTitleClock/35));g.save();g.globalAlpha=alpha;r(0,0,W,H,'#130d20e8');text('BOSS BESIEGT',320,124,17,'#e7bd72','center');text('LOVE DESTROYED',320,174,34,'#e7bd72','center');text('Jessica – Die Kaninchenkönigin',320,204,14,'#f3c6df','center');g.restore();}
  if(jessicaLevel.outsidePortalEntered){
   r(0,0,W,H,'#130b24df');
  }
  // Keep the same unified HUD outside the castle.
  drawJessicaHUD();
  // The exterior scene returns early: render its dialogue and pause overlay explicitly.
  drawTalk();
  if(mode==='jessicaPause')drawJessicaPauseOverlay();
  return;
 }
 r(0,0,W,H,'#24152f');
 g.save();g.translate(0,FLOOR*(1-JESSICA_ZOOM));g.scale(JESSICA_ZOOM,JESSICA_ZOOM);g.translate(-cam,-jessicaLevel.cameraY);
 drawJessicaHall();
 for(const ladder of jessicaLevel.ladders){
  r(ladder.x-13,ladder.top,4,ladder.bottom-ladder.top,'#f3d5e4');
  r(ladder.x+9,ladder.top,4,ladder.bottom-ladder.top,'#f3d5e4');
  for(let y=ladder.top+7;y<ladder.bottom;y+=12)r(ladder.x-9,y,18,3,'#d6ad69');
  // Paired rabbit ears at each ladder's crown.
  r(ladder.x-13,ladder.top-17,4,17,'#ffe6ef');r(ladder.x+9,ladder.top-17,4,17,'#ffe6ef');
  r(ladder.x-12,ladder.top-14,2,10,'#d884aa');r(ladder.x+10,ladder.top-14,2,10,'#d884aa');
 }
 for(const pl of jessicaLevel.platforms){
  g.save();g.translate(pl.x,pl.y);g.transform(1,(pl.slope||0)/pl.w,0,1,0,0);
  r(0,0,pl.w,pl.h,'#754866');r(0,0,pl.w,4,'#e6c381');
  r(0,4,pl.w,4,'#b36c91');
  if(pl.h>20){
   r(0,8,pl.w,12,'#8c325d');
   for(let x=22;x<pl.w;x+=65){r(x,11,7,5,'#d9a76f');r(x+2,8,3,3,'#d9a76f');}
  }else{
   for(let x=40;x<pl.w-20;x+=105){
    r(x-4,8,3,4,'#f5dce7');r(x+2,8,3,4,'#f5dce7');r(x-5,11,11,6,'#f5dce7');
   }
  }
  g.restore();
 }
 drawJessicaForegroundFire();
 drawJessicaIbiza();
 drawJessicaRabbits();
 // Jessica's farewell poses; retain the throne as a fallback if assets are not installed yet.
 const pose=jessicaFarewellPose();
 const topY=FLOOR-600;
 const throneHeight=132;
 const throneWidth=jessicaThroneSprite.naturalWidth?throneHeight*jessicaThroneSprite.naturalWidth/jessicaThroneSprite.naturalHeight:96;
 const throneX=JESSICA_LENGTH-throneWidth-28;
 if(pose==='seated'&&jessicaThroneSprite.complete&&jessicaThroneSprite.naturalWidth>0){
  g.drawImage(jessicaThroneSprite,throneX,topY-throneHeight,throneWidth,throneHeight);
 }
 if(pose!=='seated'){
  const sprite=pose==='stand'?jessicaStandingSprite:jessicaCastingSprite;
  if(sprite.complete&&sprite.naturalWidth>0){
   // Cover the seated figure with the standing/casting character without altering the throne asset.
   const spriteH=116,spriteW=spriteH*sprite.naturalWidth/sprite.naturalHeight;
   const sx=throneX+throneWidth*.52-spriteW*.5,sy=topY-spriteH;
   // Both Jessica poses face Esat on the left; no aura or particles on Jessica.
   g.save();
   g.translate(sx+spriteW,0);
   g.scale(-1,1);
   g.drawImage(sprite,0,sy,spriteW,spriteH);
   g.restore();
  }
 }
 if(jessicaLevel.damageFlash<=0||Math.floor(jessicaLevel.damageFlash/4)%2===0)drawHero(p.x,p.y);
 if(jessicaLevel.farewellStage==='teleport'){
  const t=jessicaLevel.farewellTimer;
  const progress=1-t/85;
  const ex=p.x+p.w/2,ey=p.y+p.h/2;
  drawJessicaMagic(ex,ey,2);
  g.save();g.globalCompositeOperation='lighter';
  g.strokeStyle='rgba(193,115,255,.8)';g.lineWidth=3;
  for(let k=0;k<3;k++){
   g.beginPath();g.ellipse(ex,ey,25+progress*18,11+k*13,frame*.045*(k%2?1:-1),0,Math.PI*2);g.stroke();
  }
  if(progress>.75){
   g.fillStyle='rgba(235,195,255,'+Math.min(.8,(progress-.75)*3)+')';
   g.beginPath();g.arc(ex,ey,progress*90,0,Math.PI*2);g.fill();
  }
  g.restore();
  // The castle fades to black before the exterior appears.
  if(progress>.52)r(0,0,W,H,'rgba(0,0,0,'+Math.min(1,(progress-.52)/.38)+')');
 }
 if(jessicaLevel.entranceDelay>0){
  // Floating surprise icon in world space, directly above Esat.
  const exX=p.x+p.w/2,exY=p.y-28;
  r(exX-12,exY-15,24,28,'#fff0c4');
  r(exX-9,exY-12,18,22,'#a92f40');
  text('!',exX,exY+7,23,'#fff2c5','center');
 }
 g.restore();
 if(jessicaLevel.damageFlash>0){const alpha=.08+.27*(jessicaLevel.damageFlash/24);r(0,0,W,H,'rgba(235,25,53,'+alpha+')');text('−1 ♥',W/2,72,25,'#fff0f0','center');}
 drawJessicaHUD();
 drawTalk();
 if(mode==='jessicaPause')drawJessicaPauseOverlay();
}

function update(){
 if(mode==='storm'){updateStormLevel();return;}
 if(mode==='jessica'){updateJessicaLevel();return;}
 if(mode==='jessicaPause')return;
 if(updateWinstonFarewell())return;
 if(updateSnickersDeath())return;
 if(secondBoss&&secondBoss.dying){
  shake=0;frame++;
  const b=secondBoss;
  settleEsatDuringScene();
  if(b.deathStage==='kneeling'){
   b.deathTick=Math.min(44,b.deathTick+1);
   if(b.deathTick>=44){
    b.deathStage='speech';
    // Freeze on the fully kneeling frame for the complete monologue.
    beginTalk(hopeDefeatLines,()=>{
     b.deathStage='falling';b.deathTick=0;
     syncBossMusic();
    },'continue');
   }
  }else if(b.deathStage==='speech'){
   // The dialogue handler runs on the following frames; keep the kneeling pose.
  }else if(b.deathStage==='falling'){
   b.deathTick++;
   if(b.deathTick>=45){b.deathStage='lying';b.deathTick=0;}
  }else if(b.deathStage==='lying'){
   b.deathTick++;
   if(b.deathTick>=180){b.deathStage='dissolving';b.deathTick=0;}
  }else if(b.deathStage==='dissolving'){
   b.deathTick++;
   advanceHopeDeathParticles(b);
   if(b.deathTick>=150){b.deathStage='gone';b.dying=false;b.deathParticles=[];hopeCameraLocked=false;jessicaAfterHopeAt=p.x;}
  }
  return;
 }

if(talk){settleEsatDuringScene();return;}
if(collectHoneyReward())return;
if(updateFinalPath())return;
if(winstonPeachGatePending){
 frame++;settleEsatDuringScene();
 winstonPeachGate=Math.min(1,winstonPeachGate+1/70);
 if(winstonPeachGate>=1){
  winstonPeachGatePending=false;
  resetPeachCombat();resetWinstonThrow();startBossMusic();
 }
 return;
}

updatePeachCombat();updateWinstonThrow();
if(honeyGateIntro>0||hopeGateIntro>0){
 frame++;settleEsatDuringScene();
 if(honeyGateIntro>0){honeyGateIntro--;if(honeyGateIntro===0){startBossMusic();boss.cool=0;boss.attackTime=0;boss.pattern=-1;boss.firstAttackPending=true;}}
 if(hopeGateIntro>0){hopeGateIntro--;if(hopeGateIntro===0){secondBoss.cool=90;startBossMusic();say('HOPE – DER GEPANZERTE WAECHTER! 150 TREFFER ZUM SIEG!',180);}}
 return;
}

if(mode==='cutscene'){
 settleEsatDuringScene();
 frame++;ending.tick++;const t=ending.tick;
 // Jessica must be fully on her knees before the farewell dialogue begins.
 // The clock stops during dialogue until the player confirms both lines.
 if(t===92){startLevelMusic();beginTalk([
   {speaker:'Honey',text:'Nein … ich habe versagt …'},
   {speaker:'Honey',text:'Ich wollte sie doch nur wieder lächeln sehen …'},
   {speaker:'Honey',text:'Verzeiht mir, meine Königin …'}
],()=>{syncBossMusic();},'continue');}
 if(shake>0)shake--;
 for(const z of particles){z.x+=z.vx;z.y+=z.vy;z.vy+=.09;z.t--}
 particles=particles.filter(z=>z.t>0);
 if(t>275&&t<380&&t%3===0){particles.push({x:boss.x+Math.random()*35,y:boss.baseY+Math.random()*58,vx:(Math.random()-.5)*1.6,vy:-1.2-Math.random()*1.6,t:55})}
 if(t===385){dropHoneyReward();portalOpen=false;arenaWall=false;status.textContent='Honey ist besiegt · Folge dem Weg zum nächsten Boss';try{localStorage.setItem('esat-run-level1-cleared','yes')}catch(e){}}
 if(t>=435){mode='postboss';honeyCameraLocked=false;honeyCameraRelease={x:BOSS_ARENA_CAMERA_X,frame};p.vx=0;cam=BOSS_ARENA_CAMERA_X;}
 return;
}
if(mode==='levelFinish'){finishClock++;frame++;if(finishClock>=235){mode='level2';level2Teaser=true;status.textContent='Level 2 – Sarah · Fortsetzung folgt';}return;}
if(mode==='level2'){frame++;return;}
if(mode!=='play'&&mode!=='postboss'&&mode!=='sametOutro')return;
if(mode==='play'&&!tutorialDone&&p.x>=76&&!boss.active){tutorialDone=true;beginTalk(tutorialLines,()=>{syncBossMusic();},'continue');return;}
if(mode==='play'&&tutorialDone&&!mysteryVoiceDone&&p.x>=260&&!boss.active){mysteryVoiceDone=true;beginTalk(jessicaFirstEncounter,()=>{syncBossMusic();},'continue');return;}
if(mode==='sametOutro'){
 settleEsatDuringScene();
 frame++;
 if(sametOutro&&sametOutro.stage==='run'){
   sametOutro.x=Math.min(p.x-46,sametOutro.x+1.35);
   sametOutro.t++;
   if(sametOutro.x>=p.x-46){
     sametOutro.stage='talk';
     beginTalk(sametWisdom,()=>{
       sametOutro.stage='done';sametOutroDone=true;portalOpen=true;snd(790,.35);mode='postboss';
       syncBossMusic();
     },'continue');
   }
 }
 cam=(arenaWall||honeyCameraLocked)?BOSS_ARENA_CAMERA_X:Math.max(-900,Math.min(LENGTH-W,p.x-150));
 return;
}
if(mode==='postboss'){
  if(secondBoss.defeated&&p.x>=THIRD_ARENA_LEFT-145&&!thirdBossPlaceholder.defeated)activateBossCheckpoint('snickers');
  if(thirdBossPlaceholder.defeated&&p.x>=7850&&!winstonThrow.defeated)activateBossCheckpoint('winston');
  const tb=thirdBossPlaceholder;
  if(tb&&tb.intro){snickersSongPhase=1;snickersFirstStats=null;tb.gate=Math.min(45,tb.gate+1);if(tb.gate===45){tb.intro=false;beginTalk([
    {speaker:'SNICKERS',text:'Du hast also tatsächlich meine Arena erreicht.'},
    {speaker:'SNICKERS',text:'Die anderen haben versucht, dich mit roher Gewalt aufzuhalten. Wie einfallslos.'},
    {speaker:'SNICKERS',text:'Ich hingegen habe eine weitaus elegantere Methode entwickelt, meine Gegner zu vernichten.'},
    {speaker:'SNICKERS',text:'Ich töte sie mit Musik.'},
    {speaker:'SNICKERS',text:'Und jetzt ... wirst du nach meinem Rhythmus tanzen.'}
   ],()=>{levelMusic.pause();bossMusic.pause();tb.realmPhase='quake';tb.realmTick=0;},'continue');}frame++;p.vx=0;cam=THIRD_ARENA_LEFT;return;}
  if(tb&&tb.realmPhase){if(!(tb.realmPhase==='rhythm'&&rhythm&&rhythm.state==='tutorial'))frame++;p.vx=0;cam=THIRD_ARENA_LEFT;if(tb.realmPhase==='rhythm'){if(rhythm&&rhythm.state==='tutorial'){rhythm.tutorialTick++;if(rhythm.tutorialTick>=180){rhythm.state='playing';const pr=snickersCurrentTrack().play();if(pr&&pr.catch)pr.catch(()=>{rhythm.state='waiting';});}}else updateRhythm();}else if(tb.realmPhase!=='interlude')advanceThirdRealm(tb);return;}
  // The placeholder is no longer damageable: it waits for the dedicated rhythm battle.
  if(tb&&jessicaAfterHopeDone&&!tb.active&&!tb.defeated&&!tb.intro&&p.x>=THIRD_ARENA_LEFT+170){
   p.vx=0;tb.intro=true;tb.gate=0;cam=THIRD_ARENA_LEFT;return;
  }
  if(!jessicaAfterHopeDone&&jessicaAfterHopeAt!==null&&p.x>=jessicaAfterHopeAt+900&&!talk){
   jessicaAfterHopeDone=true;p.vx=0;
   beginTalk(jessicaAfterHopeLines,()=>{syncBossMusic();},'continue');
   return;
 }
 // Jessica intervenes after Esat has walked past several motionless, grieving rabbits.
 if(tb&&tb.defeated&&!jessicaAfterSnickersDone&&p.x>=7510&&!talk){
  jessicaAfterSnickersDone=true;p.vx=0;
  beginTalk([
   {speaker:'Jessica',voiceOnly:true,text:'Erst Honey … dann Hope … und jetzt Snickers.'},
   {speaker:'Jessica',voiceOnly:true,text:'Drei von ihnen hast du mir schon genommen.'},
   {speaker:'Jessica',voiceOnly:true,text:'Wie viele muss ich noch verlieren, bevor du endlich aufhörst?'},
   {speaker:'Esat',text:'Jessi, sie haben mich angegriffen! Ich musste mich verteidigen!'},
   {speaker:'Jessica',voiceOnly:true,text:'Sie sollten dich nur aufhalten! Ich wollte nicht, dass jemand stirbt!'},
   {speaker:'Esat',text:'Dann hör auf, sie gegen mich zu schicken!'},
   {speaker:'Esat',text:'Ich will doch nur zu dir!'},
   {speaker:'Jessica',voiceOnly:true,text:'Ich habe sie schon einmal verloren, Esat.'},
   {speaker:'Jessica',voiceOnly:true,text:'Und diese Welt hat sie mir zurückgegeben.'},
   {speaker:'Jessica',voiceOnly:true,text:'Aber jedes Mal, wenn ich einen von ihnen wiederbelebe, verliere ich einen Teil meiner Kraft.'},
   {speaker:'Jessica',voiceOnly:true,text:'Ich weiß nicht, wie lange ich das noch durchhalte …'},
   {speaker:'Esat',text:'Dann hör auf damit, Jessi! Du machst dich selbst kaputt!'},
   {speaker:'Jessica',voiceOnly:true,text:'Und was soll ich tun? Zurück in die echte Welt?'},
   {speaker:'Jessica',voiceOnly:true,text:'Dorthin, wo mich jeden Tag alles daran erinnert, dass sie nicht mehr da sind?'},
   {speaker:'Esat',text:'Du musst das nicht alleine durchstehen.'},
   {speaker:'Esat',text:'Lass mich zu dir. Bitte.'},
   {speaker:'Jessica',voiceOnly:true,text:'Ich würde dich so gerne wiedersehen …'},
   {speaker:'Jessica',voiceOnly:true,text:'Aber du erinnerst mich an alles, was ich vergessen wollte.'},
   {speaker:'Jessica',voiceOnly:true,text:'An unser altes Leben. An die schönen Zeiten … und an den Schmerz danach.'},
   {speaker:'Esat',text:'Jessi, ich bin immer noch derselbe.'},
   {speaker:'Esat',text:'Und du bist mir immer noch wichtig.'},
   {speaker:'Jessica',voiceOnly:true,text:'Ich weiß …'},
   {speaker:'Jessica',voiceOnly:true,text:'Und genau deshalb fällt mir das so schwer.'},
   {speaker:'Jessica',voiceOnly:true,text:'Winston … Peach …'},
   {speaker:'Jessica',voiceOnly:true,text:'Ihr seid die Letzten, die mir noch geblieben sind.'},
   {speaker:'Jessica',voiceOnly:true,text:'Bitte bringt ihn zurück zum Eingang.'},
   {speaker:'Jessica',voiceOnly:true,text:'Aber tut ihm nichts. Ich will ihn nicht auch noch verlieren.'},
   {speaker:'Esat',text:'Jessi, bitte! Schick sie nicht auch noch gegen mich!'},
   {speaker:'Jessica',voiceOnly:true,text:'Es tut mir leid …'},
   {speaker:'Jessica',voiceOnly:true,text:'Ich weiß einfach nicht mehr, was ich sonst tun soll.'}
  ],()=>{winstonPeachSummoned=true;syncBossMusic();},'continue');
  return;
 }
 if(winstonPeachSummoned&&!winstonPeachIntroDone&&!winstonPeachGatePending&&thirdBossPlaceholder?.defeated&&p.x>=8100){
   p.vx=0;keys.left=false;keys.right=false;
   cam=7950;
   startWinstonPeachIntro();
   return;
  }
  if(!sametOutroDone&&secondBoss&&secondBoss.defeated&&p.x>=14920&&thirdBossPlaceholder.defeated){    mode='sametOutro';p.vx=0;p.dir=-1;keys.left=false;keys.right=false;keys.jump=false;keys.attack=false;
   sametOutro={stage:'run',x:Math.min(cam-70,p.x-300),t:0};return;
 }
 frame++;if(inv>0)inv--;if(shake>0)shake--;if(noticeT>0)noticeT--;for(const z of particles){z.x+=z.vx;z.y+=z.vy;z.t--}particles=particles.filter(z=>z.t>0);const speed=3;p.vx=(keys.right?speed:0)-(keys.left?speed:0);
 if(keys.down&&p.on&&p.h===34){p.y+=17;p.h=17}else if((!keys.down||!p.on)&&p.h===17){p.y-=17;p.h=34}
 p.duck=keys.down&&p.on&&p.h===17;if(p.duck)p.vx*=.58;
 if(p.vx)p.dir=Math.sign(p.vx);
 if(keys.jump&&!jumpHeld&&p.on&&!keys.down){p.vy=-10.3;p.on=false}jumpHeld=keys.jump;
 const oldBottom=p.y+p.h;
 // Solid red arena gates: no retreat or escape once the walls have risen.
 const winstonLeft=winstonPeachGateActive&&winstonPeachGate>=1?7988:-Infinity;
 const winstonRight=winstonPeachGateActive&&winstonPeachGate>=1?8570-p.w:Infinity;
 p.x=Math.max((thirdBossPlaceholder.active||thirdBossPlaceholder.realmPhase)?THIRD_ARENA_LEFT+12:secondBossWall?SECOND_ARENA_LEFT+12:1907,Math.min((thirdBossPlaceholder.active||thirdBossPlaceholder.realmPhase)?THIRD_ARENA_RIGHT-p.w-12:secondBossWall?SECOND_ARENA_RIGHT-p.w-12:LENGTH-25,p.x+p.vx));
 if(winstonPeachGateActive&&winstonPeachGate>=1)p.x=Math.max(winstonLeft,Math.min(winstonRight,p.x));
 p.vy=Math.min(10,p.vy+.5);p.y+=p.vy;p.on=false;
 for(const pl of platforms){if(!(grab&&grab.victim)&&p.x+p.w>pl.x&&p.x<pl.x+pl.w&&oldBottom<=pl.y+5&&p.y+p.h>=pl.y&&p.vy>=0){p.y=pl.y-p.h;p.vy=0;p.on=true}}
 // Keep the post-miniboss section playable, including shooting and rabbit combat.
 if(keys.attack&&!attackHeld&&frame>=hopeAttackLockedUntil&&!(secondBoss&&secondBoss.grabHand&&secondBoss.grabHand.caught)&&(infiniteAmmo||carrots>0||(secondBoss&&secondBoss.active&&!secondBoss.defeated)||(winstonPeachGateActive&&winstonPeachGate>=1&&!winstonThrow.defeated))){
  if(!infiniteAmmo&&!(secondBoss&&secondBoss.active&&!secondBoss.defeated)&&!(winstonPeachGateActive&&winstonPeachGate>=1&&!winstonThrow.defeated))carrots--;projectiles.push({x:p.x+(p.dir>0?22:-12),y:p.y+12,w:15,h:9,vx:p.dir*6.5,vy:-1.2,enemy:false});snd(570,.07);
 }
 attackHeld=keys.attack;
 for(const q of projectiles){
  q.x+=q.vx;q.y+=q.vy;
  if(winstonPeachGateActive&&winstonPeachGate>=1&&!winstonThrow.defeated&&q.x+q.w>winstonThrow.x-43&&q.x<winstonThrow.x+43&&q.y+q.h>FLOOR-165&&q.y<FLOOR){
   if(winstonThrow.hit<=0){winstonThrow.hp=Math.max(0,winstonThrow.hp-1);winstonThrow.hit=9;score+=30;snd(680,.09);}
   q.x=-999;
   if(winstonThrow.hp===0){startWinstonFarewell();snd(130,.4);}
  }
  for(const b of secondBunnies)if(b.alive&&overlap(q,{x:b.x,y:b.y-b.hop,w:b.w,h:b.h})){b.alive=false;q.x=-999;score+=50;snd(650,.12)}
  if(hopeProjectileHit(q)){q.x=-999;}
 }
 projectiles=projectiles.filter(q=>q.x>0&&q.x<LENGTH&&q.y>-30&&q.y<H+30);
 if(!secondBoss.active&&!secondBoss.defeated&&!winstonPeachSummoned&&p.x>=SECOND_ARENA_LEFT-130)activateBossCheckpoint('hope');
  if(!secondBoss.active&&!secondBoss.defeated&&!winstonPeachSummoned&&p.x>=SECOND_ARENA_LEFT+170){
  secondBoss.active=true;hopeCameraLocked=true;secondBoss.cool=999;
  p.x=Math.max(p.x,SECOND_ARENA_LEFT+15);
  beginTalk(hopeIntroLines,()=>{
   secondBossWall=true;hopeGateIntro=45;
  },'continue');
 }
 secondAreaUpdate();
 cam=(thirdBossPlaceholder.active||thirdBossPlaceholder.intro||thirdBossPlaceholder.realmPhase)?THIRD_ARENA_LEFT:(secondBossWall||hopeCameraLocked)?SECOND_ARENA_LEFT:Math.max(-900,Math.min(LENGTH-W,p.x-150));
 if(p.x>15165&&p.x<15250&&sametOutroDone&&portalOpen&&secondBoss.defeated){levelMusic.pause();bossMusic.pause();enterJessicaLevel();}
 return;
}
frame++;
// Dialogue lock: stop all movement, attacks, physics, boss AI and projectiles.
// Keep the dialogue countdown running so the fight resumes automatically.
if(dialogueTimer>0 || enrageSpeech>0){
  if(dialogueTimer>0){dialogueTimer--;if(dialogueTimer===0&&boss&&boss.active&&!finale){startBossMusic();boss.cool=0;boss.attackTime=0;boss.pattern=-1;boss.firstAttackPending=true;}}
  if(enrageSpeech>0){enrageSpeech--;if(finale&&finale.stage==='speech'){
    finale.timer=enrageSpeech;
    if(enrageSpeech===0){syncBossMusic();finale.stage='rise';finale.timer=75;finale.clock=0;}
  }}
  p.vx=0;
  // Don't buffer jump/attack inputs into the first active frame.
  jumpHeld=keys.jump;attackHeld=keys.attack;
  if(boss.hit>0)boss.hit--;
  return;
}
if(shake>0)shake--;if(inv)inv--;for(const z of particles){z.x+=z.vx;z.y+=z.vy;z.vy+=.13;z.t--}particles=particles.filter(z=>z.t>0);if(noticeT)noticeT--;if(boss.hit)boss.hit--;const speed=3;const grappled=!!(grab&&grab.victim);
 p.vx=grappled?0:(keys.right?speed:0)-(keys.left?speed:0);if(p.vx)p.dir=Math.sign(p.vx);if(!grappled&&keys.jump&&!jumpHeld&&p.on&&!keys.down){p.vy=-10.3;p.on=false;snd(390)}jumpHeld=keys.jump;if(!grappled&&keys.attack&&!attackHeld&&(infiniteAmmo||carrots>0||(secondBoss&&secondBoss.active&&!secondBoss.defeated)||(winstonPeachGateActive&&winstonPeachGate>=1&&!winstonThrow.defeated))){if(!infiniteAmmo&&!(secondBoss&&secondBoss.active&&!secondBoss.defeated)&&!(winstonPeachGateActive&&winstonPeachGate>=1&&!winstonThrow.defeated))carrots--;projectiles.push({x:p.x+(p.dir>0?22:-12),y:p.y+12,w:15,h:9,vx:p.dir*6.5,vy:-1.2,enemy:false});snd(570)}attackHeld=keys.attack;if(keys.down&&p.on&&p.h===34){p.y+=17;p.h=17}
else if((!keys.down||!p.on)&&p.h===17){p.y-=17;p.h=34}
p.duck=keys.down&&p.on&&p.h===17&&!(grab&&grab.victim);
if(p.duck)p.vx*=.58;const oldBottom=p.y+p.h;p.x=Math.max(arenaWall?1906:-900,Math.min(arenaWall?2480:LENGTH-25,p.x+p.vx));p.vy=Math.min(10,p.vy+.5);p.y+=p.vy;p.on=false;if(grab&&grab.stage==='lift')p.vy=0;for(let pl of platforms){if(p.x+p.w>pl.x&&p.x<pl.x+pl.w&&oldBottom<=pl.y+5&&p.y+p.h>=pl.y&&p.vy>=0){p.y=pl.y-p.h;p.vy=0;p.on=true;if(grab&&grab.stage==='throw'){grab.stage='return';grab.timer=24;for(let i=0;i<32;i++)particles.push({x:p.x+12,y:p.y+p.h,vx:(Math.random()-.5)*9,vy:-Math.random()*6,t:25});snd(75,.27);say('AUFPRALL!',40)}}}if(p.y>H){damage();p.x=checkpoint?1870:Math.max(20,p.x-140);p.y=FLOOR-p.h;p.vy=0}for(let item of pickups)if(!infiniteAmmo&&!item.taken&&overlap(p,{x:item.x,y:item.y,w:14,h:17})){item.taken=true;carrots++;score+=25;snd(740);say('+1 KAROTTE',35)}for(let b of bunnies){
if(!b.alive)continue;
// Friedliche Hasen laufen auf dem Boden und springen nur gelegentlich.
 if(b.hop<=0){
  b.hop=0;b.hopSpeed=0;
  if(--b.hopWait<=0){b.hop=.01;b.hopSpeed=5.0+Math.random()*1.4;b.hopWait=65+Math.floor(Math.random()*105);}
 }else{
  b.hop+=b.hopSpeed;b.hopSpeed-=.47;
  if(b.hop<=0){b.hop=0;b.hopSpeed=0;}
 }
 b.x+=b.dir*(b.hop>0?1.05:.48);
 if(Math.abs(b.x-b.base)>48){b.x=b.base+Math.sign(b.x-b.base)*48;b.dir*=-1;}
 // Keine Kollision mit Esat, kein Schaden und keine Angriffe.
}
for(let q of enemyShots){q.x+=q.vx;q.y+=q.vy;q.vy+=.035;if(overlap(q,esatHurtbox())){damage();q.x=-999}}
enemyShots=enemyShots.filter(q=>q.x>cam-100&&q.x<cam+W+200&&q.y<340);if(p.x>1805&&!guardWarningDone&&!talk){
 guardWarningDone=true;
 p.vx=0;
 beginTalk(jessicaGuardWarning,
 ()=>{syncBossMusic();},'continue');
 snd(160,.25);
 return;
}
 if(p.x>1870&&!checkpoint){bossCheckpoint='honey';checkpoint=true;say('CHECKPOINT AKTIVIERT!',120);carrots=Math.max(5,carrots)}if(p.x>2050&&!boss.active&&guardWarningDone){boss.active=true;honeyCameraLocked=true;cam=BOSS_ARENA_CAMERA_X;arenaStartFrame=frame;nextCarrotAt=frame+420;bossIntro=0;dialogueTimer=0;boss.cool=510;beginTalk([
 {speaker:'Honey',text:'Hihihi … Da ist unser Eindringling.'},
 {speaker:'Honey',text:'Unsere Königin hat endlich wieder ihr Lächeln gefunden.'},
 {speaker:'Honey',text:'Und jetzt bringst du sie erneut zum Weinen.'},
 {speaker:'Honey',text:'Verzeih mir … aber deine Reise endet hier.'}
],()=>{arenaWall=true;honeyGateIntro=45;boss.cool=999;},'continue');p.vx=0;snd(170,.28);jumpHeld=keys.jump;attackHeld=keys.attack;return;}if(bossIntro>0)bossIntro--;if(arenaWall&&boss.active&&!infiniteAmmo){if(frame>=nextCarrotAt){if(!arenaCarrot)arenaCarrot={x:1915,y:FLOOR-20};if(!arenaCarrotRight)arenaCarrotRight={x:2460,y:FLOOR-20};nextCarrotAt=frame+420;}if(arenaCarrot&&overlap(p,{x:arenaCarrot.x,y:arenaCarrot.y,w:16,h:20})){carrots++;score+=25;arenaCarrot=null;snd(740);say('+1 KAROTTE · NACHLADUNG',45)}if(arenaCarrotRight&&overlap(p,{x:arenaCarrotRight.x,y:arenaCarrotRight.y,w:16,h:20})){carrots++;score+=25;arenaCarrotRight=null;snd(740);say('+1 KAROTTE · NACHLADUNG',45)}}if(boss.active){
 // Honey observes Esat, faces him and slowly approaches when not attacking.
 boss.face=p.x+ p.w/2 < boss.x+boss.w/2?-1:1;
 if(!grab&&!boss.slam&&!finale&&boss.hit<=0&&boss.cool>32){
  const distance=(p.x+p.w/2)-(boss.x+boss.w/2);
  if(Math.abs(distance)>115){
   boss.x=Math.max(2040,Math.min(2445,boss.x+Math.sign(distance)*.64));
  }
 }
 if(finale)updateFinale();boss.cool--;const phase=boss.hp<=4?3:boss.hp<=8?2:1;
if(boss.cool<=0&&!grab&&!boss.slam&&!finale){
 const previousPattern=boss.pattern;
 let nextPattern;
 if(boss.firstAttackPending){nextPattern=4;boss.firstAttackPending=false;}
 else {const options=[0,1,2,3,4].filter(n=>n!==previousPattern);nextPattern=options[Math.floor(Math.random()*options.length)];}
 boss.pattern=nextPattern;boss.attackTime=0;
 if(boss.pattern===0){laser={stage:'warn',timer:52,y:FLOOR-23,h:22,dir:boss.face||-1};say('BODENLASER! SPRING ODER NUTZE DIE PLATTFORMEN!',70)}
 if(boss.pattern===1){
  // Targeted jump replaces the old horizontal ball wall.
  boss.slam=true;boss.jumpAttack=true;boss.jumpFrame=0;
  boss.jumpTarget=Math.max(1930,Math.min(2460,p.x+p.w/2));
  boss.airVy=-11.8;boss.y=boss.baseY;
  boss.shots=[];say('HONEY SPRINGT! WEICHE DER LANDUNG AUS!',80);
}
 if(boss.pattern===2){laser={stage:'warn',timer:53,y:FLOOR-69,h:24,dir:boss.face||-1};say('KOPFLASER! DUCKEN MIT S / PFEIL RUNTER!',75)}
 if(boss.pattern===3){
  // Separate aerial attack: rises, aims at Esat and casts a tracking magic mask.
  boss.slam=true;boss.jumpAttack=false;boss.airVy=-12;boss.y=boss.baseY;
  boss.airCast=true;boss.airCastFired=false;boss.airCastTimer=0;
  say('HONEY: MAGISCHE MASKE! WEICHE AUS!',85);
}
 if(boss.pattern===4){grab={stage:'warn',timer:42,dir:-1,victim:false,rotation:0};say('PACKANGRIFF! WEICHE AUS!',75)}
 boss.cool=phase===3?115:phase===2?138:158;snd(170)
}
if(boss.landingHold>0)boss.landingHold--;
if(boss.slam&&!finale){
  if(boss.airCast){
    boss.airCastTimer++;
    // Fire at the apex, after a visible charge; aim at Esat's current location.
    if(!boss.airCastFired&&boss.airVy>=-1.4){
      boss.airCastFired=true;
      const sx=boss.x+boss.w/2,sy=boss.y+boss.h*.55;
      const dx=p.x+p.w/2-sx,dy=p.y+p.h/2-sy,len=Math.max(1,Math.hypot(dx,dy));
      boss.shots.push({x:sx-17,y:sy-17,w:34,h:34,vx:dx/len*5.8,vy:dy/len*5.8,enemy:true,straight:true,airMask:true,age:0});
      snd(460,.19);
    }
  }
  if(boss.jumpAttack){
    boss.jumpFrame++;
    const dx=boss.jumpTarget-(boss.x+boss.w/2);
    boss.x=Math.max(1930,Math.min(2460,boss.x+Math.max(-6,Math.min(6,dx*.085))));
  }
  boss.airVy+=.55;boss.y+=boss.airVy;
  if(boss.y>=boss.baseY){
    boss.y=boss.baseY;boss.slam=false;
    if(boss.airCast){boss.airCast=false;boss.landingHold=10;}
    if(boss.jumpAttack){
      boss.jumpAttack=false;boss.jumpFrame=0;boss.landingHold=14;
      shake=Math.max(shake,12);
      // Two ground shockwaves travel outward from the impact.
      const dir=p.x+p.w/2<boss.x+boss.w/2?-1:1;
      shockwaves.push({x:boss.x+boss.w/2-dir*12,y:FLOOR-34,w:38,h:34,vx:dir*(6.2+phase*.45),warn:9,jesterWave:true,age:0});
      if(overlap(esatHurtbox(),{x:boss.x-25,y:boss.baseY-7,w:boss.w+50,h:boss.h+14}))damage();
      say('HONEY-MAGIE! SPRING ÜBER DEN SCHOCKGEIST!',60);snd(95,.29);
    }else if(!boss.airCastFired){
      // No old ground wave: the aerial spell is the entire attack.
    }
  }
}
if(grab&&!finale){
 grab.timer--;
 if(grab.stage==='warn'&&grab.timer<=0){
   grab.stage='dash';grab.timer=56;grab.elapsed=0;grab.dir=p.x+p.w/2<boss.x+boss.w/2?-1:1;
   grab.targetX=Math.max(1928,Math.min(2470,p.x+p.w/2));
   grab.startX=boss.x;grab.afterimage=0;
   snd(130,.14);
 }else if(grab.stage==='dash'){
   // Sweep the complete travel distance. A fast dash must never skip Esat's hitbox.
   grab.elapsed++;
   const previousX=boss.x;
   const targetCenter=Math.max(1928,Math.min(2470,p.x+p.w/2));
   // Re-aim while far away; commit when close enough so the attack remains dodgeable.
   if(Math.abs(targetCenter-(boss.x+boss.w/2))>65&&grab.elapsed<25)
     grab.dir=targetCenter<boss.x+boss.w/2?-1:1;
   const dashSpeed=15+phase*.8+Math.min(5,grab.elapsed*.26);
   boss.x=Math.max(1910,Math.min(2465,boss.x+grab.dir*dashSpeed));
   boss.y=boss.baseY;
   grab.afterimage=(grab.afterimage+1)%3;
   const sweptLeft=Math.min(previousX,boss.x)-14;
   const sweptRight=Math.max(previousX+boss.w,boss.x+boss.w)+14;
   const hero=esatHurtbox();
   const canGrab=hero.x+hero.w>sweptLeft&&hero.x<sweptRight
     &&hero.y+hero.h>boss.y-34&&hero.y<boss.y+boss.h+24;
   if(canGrab){
     grab.stage='ascend';grab.timer=45;grab.victim=true;grab.rotation=0;
     grab.anchorX=Math.max(1945,Math.min(2370,p.x+10));
     boss.x=grab.anchorX-18;
     p.vy=0;p.on=false;
     damage();inv=Math.max(inv,155);
     shake=Math.max(shake,12);snd(90,.3);
     for(let i=0;i<26;i++){const a=i*Math.PI*2/26;
       particles.push({x:boss.x+20,y:boss.y+22,vx:Math.cos(a)*(2+Math.random()*4),vy:Math.sin(a)*(2+Math.random()*4),t:25});}
   }else if(grab.timer<=0||boss.x<=1911||boss.x>=2464){
     // Do not remain stuck against the arena wall.
     grab.stage='return';grab.timer=24;
   }
 }else if(grab.stage==='ascend'){
   // Both fighters rise together, visibly locked in the same grapple.
   const progress=1-grab.timer/45;
   const ease=1-Math.pow(1-progress,2);
   boss.x=grab.anchorX-18;
   boss.y=boss.baseY-166*ease;
   p.x=boss.x+12;p.y=boss.y+15;p.vy=0;p.on=false;
   if(grab.timer<=0){grab.stage='spin';grab.timer=40;grab.rotation=0;snd(310,.17);}
 }else if(grab.stage==='spin'){
   // Several rapid full rotations at the top of the arena.
   grab.rotation+=(Math.PI*2)/11;
   boss.y=FLOOR-66-166+Math.sin(frame*.35)*3;
   p.x=boss.x+12;p.y=boss.y+15;p.vy=0;p.on=false;
   if(grab.timer<=0){grab.stage='dive';grab.timer=25;snd(115,.22);}
 }else if(grab.stage==='dive'){
   grab.rotation+=(Math.PI*2)/8;
   const progress=1-grab.timer/25;
   boss.y=FLOOR-66-166+166*progress*progress;
   p.x=boss.x+12;p.y=boss.y+15;p.vy=0;p.on=false;
   if(grab.timer<=0){
     boss.y=boss.baseY;
     p.y=FLOOR-p.h;p.x=boss.x+10;p.vy=0;p.on=true;
     grab.stage='impact';grab.timer=24;grab.rotation=0;
     shake=22;snd(65,.38);
     // Earth and stone erupt from the impact, followed by expanding dust rings.
     for(let i=0;i<92;i++){
       const a=Math.random()*Math.PI;
       const speed=2+Math.random()*8;
       particles.push({x:boss.x+20,y:FLOOR-3,vx:Math.cos(a)*speed*(Math.random()<.5?-1:1),
         vy:-Math.sin(a)*speed-1,t:30+Math.floor(Math.random()*28),
         earth:true,size:2+Math.floor(Math.random()*6)});
     }
     grab.impactX=boss.x+18;
   }
 }else if(grab.stage==='impact'){
   p.x=boss.x+12;p.y=FLOOR-p.h;p.vy=0;p.on=true;
   if(grab.timer<=0){grab.stage='return';grab.timer=24;grab.victim=false;}
 }else if(grab.stage==='return'){
   boss.x+=(boss.baseX-boss.x)*.24;
   boss.y+=(boss.baseY-boss.y)*.25;
   if(grab.timer<=0){boss.x=boss.baseX;boss.y=boss.baseY;grab=null;}
 }
}
if(laser&&!finale){laser.timer--;if(laser.stage==='warn'&&laser.timer<=0){laser.stage='fire';laser.timer=40;snd(85,.25)}else if(laser.stage==='fire'){const beam={x:(laser.dir||-1)<0?boss.x-650:boss.x+boss.w,y:laser.y,w:650,h:laser.h};if(overlap(esatHurtbox(),beam))damage();if(laser.timer<=0)laser=null}}
for(const sw of shockwaves){if(sw.warn>0)sw.warn--;else{sw.x+=sw.vx;if(sw.jesterWave)sw.age++;if(overlap(esatHurtbox(),sw))damage()}}shockwaves=shockwaves.filter(sw=>sw.x>1895&&sw.x<2510&&(!sw.jesterWave||sw.age<110));
if(overlap(esatHurtbox(),boss)&&!grab?.victim&&!finale)damage()}
for(let q of [...projectiles,...boss.shots]){
 if(q.airMask){
   q.age=(q.age||0)+1;
   if(q.age<42){
     const dx=p.x+p.w/2-(q.x+q.w/2),dy=p.y+p.h/2-(q.y+q.h/2);
     const len=Math.max(1,Math.hypot(dx,dy));
     q.vx=q.vx*.965+dx/len*.22;q.vy=q.vy*.965+dy/len*.22;
     const speed=Math.hypot(q.vx,q.vy);if(speed>6.4){q.vx*=6.4/speed;q.vy*=6.4/speed;}
   }
 }
 q.x+=q.vx;q.y+=q.vy;if(q.enemy){if(!q.rabbit&&!q.straight)q.vy+=.07;if(overlap(q,esatHurtbox())){damage();q.x=-999}}else{if(boss.active&&!(grab&&grab.victim)&&overlap(q,boss)){bossDamage();q.x=-999}for(let b of bunnies)if(b.alive&&overlap(q,b)){b.alive=false;q.x=-999;score+=40;snd(610)}}}projectiles=projectiles.filter(q=>q.x>-50&&q.x<LENGTH+30&&q.y<350);boss.shots=boss.shots.filter(q=>q.x>boss.baseX-900&&q.y<350&&q.x>-50);cam=(arenaWall||honeyCameraLocked)?BOSS_ARENA_CAMERA_X:Math.max(-900,Math.min(LENGTH-W,p.x-150));}function updateFinale(){
 const f=finale;if(!f)return;f.clock++;
 const center=2210,top=94;
 if(f.stage==='speech'){
  // Jessica bleibt stehen, bis ihre komplette Sprechblase vorbei ist.
  boss.x=boss.baseX;boss.y=boss.baseY;
  if(--f.timer<=0){f.stage='rise';f.timer=75;f.clock=0;}
 }else if(f.stage==='rise'){
  boss.x+=(center-boss.x)*.095;boss.y+=(top-boss.y)*.075;
  if(--f.timer<=0){f.stage='barrage';f.timer=f.extended?490:325;f.clock=0;say('VON OBEN! WEICHE DEN SALVEN AUS!',105)}
 }else if(f.stage==='barrage'){
  boss.x=center+Math.sin(f.clock*.037)*112;boss.y=top+Math.sin(f.clock*.085)*9;
  // Angled downward volleys, leaving readable safe corridors.
  if(f.clock%49===1){
   const gap=Math.floor(Math.random()*5);for(let i=0;i<6;i++){
    if(i===gap||i===gap+1)continue;
    const target=1945+i*95;
    const dx=target-(boss.x+20),dy=FLOOR-(boss.y+35),len=Math.hypot(dx,dy);
    boss.shots.push({x:boss.x+20,y:boss.y+35,w:13,h:13,vx:dx/len*6.7,vy:dy/len*6.7,enemy:true,orb:true,straight:true,finaleShot:true});
   }snd(440,.12)
  }
  // Vertical beam from the airborne boss, with a telegraph before firing.
  if(f.clock===92||f.clock===222||(f.extended&&(f.clock===345||f.clock===438))){f.laser={stage:'warn',timer:48,x:p.x+p.w/2};say('SENKRECHTER LASER! BEWEG DICH!',65)}
  if(f.laser){const l=f.laser;l.timer--;if(l.stage==='warn'&&l.timer<=0){l.stage='fire';l.timer=33;snd(100,.2)}else if(l.stage==='fire'){if(overlap(esatHurtbox(),{x:l.x-16,y:0,w:32,h:FLOOR}))damage();if(l.timer<=0)f.laser=null}}
  if(--f.timer<=0){f.stage='descend';f.timer=80;f.laser=null;say('DER HONEY LANDET WIEDER!',70)}
 }else if(f.stage==='descend'){
  boss.x+=(boss.baseX-boss.x)*.07;boss.y+=(boss.baseY-boss.y)*.09;
  if(--f.timer<=0){boss.x=boss.baseX;boss.y=boss.baseY;if(f.repeatAfter){finale={stage:'rise',timer:75,clock:0,laser:null,extended:true};boss.cool=999;boss.shots=[];}else{finale=null;boss.cool=90;}}
 }
}
function drawHero(x,y){
 /* Testmodus: Hero bleibt sichtbar auch bei Trefferanimationen. */
 // L-sit with the ORIGINAL Esat sprite's head, beard, face and hoodie.
 // Only the lower body is repositioned; no simplified block character.
 if(p.duck&&p.on){
   const moving=Math.abs(p.vx)>.15;
   const step=moving?Math.sin(frame*.45):0;
   const sprite=imgs.esat_run_sheet;
   g.save();
   g.translate(Math.round(x+11),Math.round(y+p.h));
   if(p.dir<0)g.scale(-1,1);
   // Lower the whole L-sit silhouette, including the head, toward the floor.
   g.scale(1,.70);
   g.imageSmoothingEnabled=false;
   g.fillStyle='#160e1b66';g.fillRect(-18,-2,53,3);
   // Two extended legs in a single silhouette, ending in exactly two shoes.
   // The two shoes sit side by side at the tip, not at four separate positions.
   g.fillStyle='#181721';g.fillRect(0,-17,29,12);
   g.fillStyle='#292733';g.fillRect(4,-15,24,3);
   g.fillStyle='#111017';g.fillRect(2,-9,28,4);
   // Upper shoe (far leg).
   g.fillStyle='#16151e';g.fillRect(29,-17,9,6);
   g.fillStyle='#e9e8ee';g.fillRect(30,-17,8,2);
   // Lower shoe (near leg).
   g.fillStyle='#16151e';g.fillRect(29,-9,10,6);
   g.fillStyle='#e9e8ee';g.fillRect(30,-9,8,2);
   // Keep Esat's real head and beard, but do not render the original
   // hoodie sleeves / pocket hands. Draw one pair of supporting arms only.
   if(sprite.complete&&sprite.naturalWidth){
     // Head and neck only: original sprite pixels.
     g.drawImage(sprite,5*96,0,96,54,-22,-46,44,24);
   }else if(imgs.esat.complete&&imgs.esat.naturalWidth){
     g.drawImage(imgs.esat,0,0,imgs.esat.naturalWidth,Math.round(imgs.esat.naturalHeight*.42),-20,-46,40,24);
   }
   // Black hoodie torso, folded into an L-sit, with small fabric highlights.
   g.fillStyle='#14131d';g.fillRect(-15,-24,31,15);
   g.fillStyle='#24222d';g.fillRect(-12,-22,24,4);
   g.fillStyle='#30303b';g.fillRect(-10,-18,20,2);
   g.fillStyle='#0d0c14';g.fillRect(-17,-11,29,5);
   // Exactly two arms: angled down from the shoulders to the floor.
   const stride=moving?Math.round(step*2):0;
   g.fillStyle='#1b1925';
   g.fillRect(-17,-22,6,17);
   g.fillRect(7,-22,6,17);
   g.fillStyle='#36313c';g.fillRect(-16,-18,2,10);g.fillRect(8,-18,2,10);
   // Hands alternate slightly during the handwalk.
   g.fillStyle='#bd896b';
   g.fillRect(-18+stride,-5,9,5);
   g.fillRect(6-stride,-5,9,5);
   g.restore();return;
 }
 const moving=Math.abs(p.vx)>.2, grounded=p.on;
 const sprite=imgs.esat_run_sheet;
 const pose=!grounded?2:moving?Math.floor(frame/6)%4:5;
 const bob=0;
 g.save();g.translate(Math.round(x+11),Math.round(y+p.h-bob));
 if(p.dir<0)g.scale(-1,1);
 if(sprite.complete&&sprite.naturalWidth){
   // Feet align with player collision floor; no rectangles overlapping the ground.
   drawGroundedSprite(sprite,-22,0,44,53,pose*96,0,96,128);
 }else if(imgs.esat.complete&&imgs.esat.naturalWidth){
   drawGroundedSprite(imgs.esat,-19,0,38,52);
 }
 g.restore();
}
const hofnarrLaserFull=new Image();hofnarrLaserFull.src='assets/images/7c41cfe23d9a9d8d.png';
const hofnarrJumpFrames={};hofnarrJumpFrames.crouch=new Image();hofnarrJumpFrames.crouch.src='assets/images/831c9ae4ed43f335.png';hofnarrJumpFrames.jump_start=new Image();hofnarrJumpFrames.jump_start.src='assets/images/4e14f103d486bae7.png';hofnarrJumpFrames.jump_air=new Image();hofnarrJumpFrames.jump_air.src='assets/images/08be2c36b3a87b70.png';hofnarrJumpFrames.jump_land=new Image();hofnarrJumpFrames.jump_land.src='assets/images/4013f80f1deb5b11.png';hofnarrJumpFrames.slam_impact=new Image();hofnarrJumpFrames.slam_impact.src='assets/images/0abec1e265a07fef.png';
const hofnarrJumpFixed=new Image();hofnarrJumpFixed.src='assets/images/7c41cfe23d9a9d8d.png';
const hofnarrLandingFixed=new Image();hofnarrLandingFixed.src='assets/images/4755c9a3e0c1f4de.png';
const hofnarrV79={};
hofnarrV79.jump_prep=new Image();hofnarrV79.jump_prep.src='assets/images/d26a9e95c5024b23.png';
hofnarrV79.jump_charge=new Image();hofnarrV79.jump_charge.src='assets/images/d26a9e95c5024b23.png';
hofnarrV79.jump_takeoff=new Image();hofnarrV79.jump_takeoff.src='assets/images/b91bf89dd46d0b80.png';
hofnarrV79.jump_rise=new Image();hofnarrV79.jump_rise.src='assets/images/04fd54dc1c0f3c6c.png';
hofnarrV79.grab_prep=new Image();hofnarrV79.grab_prep.src='assets/images/c15618dfbce9c83b.png';
hofnarrV79.grab_dash=new Image();hofnarrV79.grab_dash.src='assets/images/c15618dfbce9c83b.png';
hofnarrV79.grab_reach=new Image();hofnarrV79.grab_reach.src='assets/images/7c41cfe23d9a9d8d.png';
hofnarrV79.grab_contact=new Image();hofnarrV79.grab_contact.src='assets/images/7c41cfe23d9a9d8d.png';
hofnarrV79.grab_spin=new Image();hofnarrV79.grab_spin.src='assets/images/04fd54dc1c0f3c6c.png';
hofnarrV79.grab_lift=new Image();hofnarrV79.grab_lift.src='assets/images/b91bf89dd46d0b80.png';
const hofnarrFrames={};
hofnarrFrames.portrait=new Image();hofnarrFrames.portrait.src='assets/images/33e176ee007b9189.png';
hofnarrFrames.idle=new Image();hofnarrFrames.idle.src='assets/images/43b1e1880e6d2b49.png';
hofnarrFrames.idle2=new Image();hofnarrFrames.idle2.src='assets/images/43b1e1880e6d2b49.png';
hofnarrFrames.run1=new Image();hofnarrFrames.run1.src='assets/images/c910a2c303a6760d.png';
hofnarrFrames.run2=new Image();hofnarrFrames.run2.src='assets/images/7122087a0b4d8b82.png';
hofnarrFrames.cast1=new Image();hofnarrFrames.cast1.src='assets/images/7c41cfe23d9a9d8d.png';
hofnarrFrames.cast2=new Image();hofnarrFrames.cast2.src='assets/images/7c41cfe23d9a9d8d.png';
hofnarrFrames.jump=new Image();hofnarrFrames.jump.src='assets/images/218bdc1059daea9a.png';
hofnarrFrames.slam=new Image();hofnarrFrames.slam.src='assets/images/304ebd0470e14a60.png';
hofnarrFrames.hit=new Image();hofnarrFrames.hit.src='assets/images/9c8ab21a0f3a8fad.png';
hofnarrFrames.death=new Image();hofnarrFrames.death.src='assets/images/5c17d1f968a4a152.png';
hofnarrFrames.teleport=new Image();hofnarrFrames.teleport.src='assets/images/43b1e1880e6d2b49.png';

hofnarrFrames.hit1=new Image();hofnarrFrames.hit1.src='assets/images/bc23f391331127ed.png';

hofnarrFrames.hit2=new Image();hofnarrFrames.hit2.src='assets/images/bc23f391331127ed.png';

hofnarrFrames.hit3=new Image();hofnarrFrames.hit3.src='assets/images/aab267406a7fe041.png';

hofnarrFrames.hit4=new Image();hofnarrFrames.hit4.src='assets/images/69e4083d57bff050.png';

hofnarrFrames.hit5=new Image();hofnarrFrames.hit5.src='assets/images/c3e985072abdda21.png';

const honeyRedesignSheet=new Image();honeyRedesignSheet.src='assets/images/honey-rabbit-jester-v2.png';
const honeyRedesignRects=[[110,72,233,282],[402,73,553,280],[705,73,853,280],[1003,77,1185,283],[91,421,234,569],[402,363,553,532],[703,360,857,565],[1001,432,1151,570],[85,687,252,860],[383,678,563,861],[679,682,882,860],[1007,687,1169,836],[95,982,245,1179],[396,1019,546,1178],[688,1060,862,1177],[981,1122,1180,1178]];
let honeyPoseBlend={current:0,previous:0,since:0};
function honeyArtReady(){return honeyRedesignSheet.complete&&honeyRedesignSheet.naturalWidth>0;}
function drawHoneyRedesignPose(index,cx,feetY,alpha=1){
 if(!honeyArtReady())return false;
 const box=honeyRedesignRects[index],scale=.4,sw=box[2]-box[0],sh=box[3]-box[1];
 g.save();g.globalAlpha*=alpha;
 drawGroundedSprite(honeyRedesignSheet,cx-sw*scale/2,feetY,sw*scale,sh*scale,box[0],box[1],sw,sh);
 g.restore();return true;
}
function honeyRedesignPose(){
 if(!boss.active)return 0;
 if(grab){
  if(grab.stage==='warn')return 8;
  if(grab.stage==='dash')return grab.timer>32?9:10;
  if(grab.stage==='spin'||grab.stage==='dive')return 11;
  return grab.stage==='impact'?7:10;
 }
 if(boss.hit)return 12;
 if(boss.landingHold>0)return 7;
 if(boss.jumpAttack)return boss.jumpFrame<7?4:boss.airVy<0?5:6;
 if(boss.airCast)return boss.airVy<0?5:3;
 if(boss.slam)return boss.y<boss.baseY-10?6:7;
 if(laser||boss.pattern===1||boss.pattern===2)return 3;
 return Math.abs(boss.x-boss.baseX)>20?(Math.floor(frame/8)%2?1:2):0;
}
function drawHoneyRedesign(){
 const pose=honeyRedesignPose();
 if(pose!==honeyPoseBlend.current){
  honeyPoseBlend={current:pose,previous:honeyPoseBlend.current,since:frame};
 }
 const blend=Math.min(1,Math.max(0,(frame-honeyPoseBlend.since)/4));
 const grounded=![5,6,11].includes(pose);
 const breath=0;
 const feet=33+(grounded?breath:0);
 if(blend<1)drawHoneyRedesignPose(honeyPoseBlend.previous,0,feet,1-blend);
 drawHoneyRedesignPose(pose,0,feet,blend);
}

function drawHoney(x,y){
 const state=boss.hit?'hit':boss.slam?(boss.y<boss.baseY-10?'jump':'slam'):boss.pattern===2?'cast2':boss.pattern===1?'cast2':boss.pattern===4?'teleport':Math.abs(boss.x-boss.baseX)>20?(frame%16<8?'run1':'run2'):(frame%40<20?'idle':'idle2');
 const jumpState=boss.landingHold>0?'slam_impact':(boss.jumpAttack?(boss.y<boss.baseY-22?(boss.airVy<0?'jump_start':'jump_air'):'slam_impact'):null);
  const jumpPose=boss.jumpAttack?(boss.jumpFrame<7?'jump_prep':boss.airVy< -7?'jump_takeoff':boss.airVy<0?'jump_rise':'jump_charge'):null;
  const grabPose=grab?(grab.stage==='warn'?'grab_prep':grab.stage==='dash'?(grab.timer>32?'grab_dash':'grab_reach'):grab.stage==='ascend'?'grab_contact':(grab.stage==='spin'||grab.stage==='dive')?'grab_spin':grab.stage==='impact'?'grab_prep':'grab_lift'):null;
  const chosen=grabPose?hofnarrV79[grabPose]:(jumpState==='slam_impact'?hofnarrLandingFixed:jumpPose?hofnarrV79[jumpPose]:boss.airCast?(boss.airVy< -6?hofnarrV79.jump_takeoff:hofnarrV79.jump_rise):(laser&&laser.stage?hofnarrLaserFull:hofnarrFrames[state]));
  const im=chosen&&chosen.complete&&chosen.naturalWidth?chosen:hofnarrFrames.idle;
 g.save();g.translate(Math.round(x+19),Math.round(y+33));
 if(p.x+p.w/2 < boss.x+boss.w/2)g.scale(-1,1);
 const hover=0;
 const awakened=boss.active&&boss.hp>0&&boss.hp<=2;
 if(awakened){
   // Pink-purple magical power aura, only during the last 2 HP.
   const pulse=.82+Math.sin(frame*.21)*.12;
   g.save();g.globalCompositeOperation='lighter';
   g.shadowColor='#ef5cff';g.shadowBlur=25;
   for(let layer=3;layer>=0;layer--){
     const width=31+layer*8+Math.sin(frame*.17+layer)*3;
     const height=53+layer*8+Math.cos(frame*.13+layer)*4;
     g.fillStyle=layer%2?'rgba(207,67,255,.17)':'rgba(255,132,240,.18)';
     g.beginPath();g.moveTo(-width*.75,33);
     g.quadraticCurveTo(-width*1.3,-12,-width*.6,-height*.8);
     g.lineTo(-width*.28,-height-8-Math.sin(frame*.23)*8);
     g.lineTo(0,-height*.72);
     g.lineTo(width*.28,-height-13-Math.sin(frame*.27+2)*7);
     g.quadraticCurveTo(width*1.2,-18,width*.75,33);
     g.closePath();g.fill();
   }
   g.restore();
   g.save();g.globalAlpha=pulse*.8;
   for(let i=0;i<18;i++){
     const a=i*2.399+frame*.028;
     const xx=Math.sin(a)* (23+i%4*8);
     const yy=31-((frame*(1+i%3*.3)+i*27)%115);
     r(xx,yy,2+i%3,3+i%3,i%2?'#ffe6ff':'#c35cff');
   }
   // Occasional crackling lilac arcs.
   g.strokeStyle='#ffc4ff';g.lineWidth=1.6;
   for(let i=0;i<3;i++){
     const yy=-40+i*26+(frame%13)*.5;
     const side=i%2?-1:1;
     g.beginPath();g.moveTo(side*30,yy);
     g.lineTo(side*40,yy-9);g.lineTo(side*34,yy-17);g.stroke();
   }
   g.restore();
 }
 if(boss.active&&!awakened){g.fillStyle='#f83db6';g.globalAlpha=.22+.1*Math.sin(frame*.12);g.beginPath();g.ellipse(0,8,36,52,0,0,Math.PI*2);g.fill();g.globalAlpha=1}
 if(honeyArtReady()){
   if(awakened){g.shadowColor='#d36cff';g.shadowBlur=16;}
   drawHoneyRedesign();g.shadowBlur=0;
 }else if(im.complete&&im.naturalWidth){
   drawGroundedSprite(im,-36,33,74,91);
 }else r(-19,-33,39,66,'#25172c');
 if(boss.active){
   const ax=-22+Math.sin(frame*.08)*3,ay=-13+hover;
   g.fillStyle=awakened?'#f7a5ff':'#ff4eb9';
   g.shadowColor=awakened?'#c44aff':'#ff3dca';g.shadowBlur=12;
   g.beginPath();g.arc(ax,ay,5+Math.sin(frame*.13)*1.5,0,Math.PI*2);g.fill();g.shadowBlur=0;
   g.fillStyle='#fff0ff';g.fillRect(ax-1,ay-2,2,3);
 }
 g.restore();
}
const kneelSprite=new Image();kneelSprite.src='assets/images/895ab45ba87ad13c.png';
const hofnarrDefeatedLying=new Image();hofnarrDefeatedLying.src='assets/images/1ac2b3d8cc74029a.png';
function drawHoneyDefeated(x,y,t){
 g.save();
 const alpha=t>=280?Math.max(0,(380-t)/100):1;
 g.globalAlpha=alpha;
 // Fall down first, then remain visibly lying on the ground until dissolving.
 const state=t<22?'hit2':t<47?'hit3':'hit4';
 const im=t>=47?hofnarrDefeatedLying:hofnarrFrames[state];
 if(honeyArtReady()){
  g.save();g.translate(x+19,FLOOR);
  if(p.x+p.w/2<boss.x+boss.w/2)g.scale(-1,1);
  drawHoneyRedesignPose(t<22?13:t<47?14:15,0,0);g.restore();
 }else if(im&&im.complete&&im.naturalWidth){
  const w=t>=47?102:77,h=t>=47?46:85;
  g.save();g.translate(x+19,FLOOR);
  if(p.x+p.w/2<boss.x+boss.w/2)g.scale(-1,1);
  drawGroundedSprite(im,-w/2,0,w,h);g.restore();
 }
 if(t>=280){
  const k=Math.max(0,1-(t-280)/100);
  for(let i=0;i<18;i++){
   const a=i*2.39996;
   g.globalAlpha=k*(.4+.6*Math.sin(t*.12+i)**2);
   g.fillStyle=i%3?'#e968ff':'#fff1ff';
   g.fillRect(x+19+Math.cos(a)*(12+(t-280)*.48),FLOOR-16+Math.sin(a)*(8+(t-280)*.38),3+i%3,3+i%2);
  }
 }
 g.restore();
}
function drawRabbit(x,y,dir=1,phase=0){
 const im=imgs.rabbit,hop=Math.sin(phase*.28),kick=Math.sin(phase*.38)*3;
 g.save();g.translate(Math.round(x+14),Math.round(y+6));if(dir<0)g.scale(-1,1);
 // Distinct legs and feet, alternating as rabbits hop.
 r(-12,7+Math.max(0,kick),11,7,'#fff5fc');r(2,7+Math.max(0,-kick),11,7,'#fff5fc');
 r(-13,13+Math.max(0,kick),13,3,'#d7aedb');r(1,13+Math.max(0,-kick),13,3,'#d7aedb');
 if(im.complete&&im.naturalWidth){g.drawImage(im,-18,-23+hop,34,31)}else r(-12,-10,24,20,'#fff0fa');
 g.restore();
}
// Jessica menu: clickable bunny button with a short squash-and-bounce confirmation.
let jessicaBunnyClickAt=0,jessicaBunnyHover=false;
function drawJessicaBunnyButton(){
 const elapsed=jessicaBunnyClickAt?performance.now()-jessicaBunnyClickAt:0;
 // Give the bunny time to complete its full 360-degree happy spin before starting.
 const duration=760; // The spin completes here; start the fade immediately, without a static pause.
 if(jessicaBunnyClickAt&&elapsed>=duration+720){jessicaBunnyClickAt=0;jessicaBunnyHover=false;reset();startLevelMusic();g.save();g.fillStyle='#150721';g.fillRect(0,0,W,H);g.restore();return;}
 const pressed=jessicaBunnyClickAt>0;
 const t=pressed?Math.min(1,elapsed/760):0;
 const ease=t*t*(3-2*t);
 const spinAngle=pressed?ease*Math.PI*2:0; // clearly visible complete 360-degree cartwheel
 const hop=pressed?-Math.abs(Math.sin(t*Math.PI*2))*17:(jessicaBunnyHover?-5:0);
 const bounce=pressed?1+.11*Math.sin(t*Math.PI*3):(jessicaBunnyHover?1.10:1)+Math.sin(performance.now()/280)*.025;
 const cx=320,cy=232;
 g.save();g.translate(cx,cy+hop);g.scale(bounce,bounce);
 g.shadowColor=pressed?'#fff6b3':'#ff8cce';g.shadowBlur=pressed?30:jessicaBunnyHover?30:15;
 g.fillStyle=pressed?'#ffc6e6':'#ffb9df';g.strokeStyle='#fff0fa';g.lineWidth=3;
 g.beginPath();g.roundRect(-66,-26,132,55,22);g.fill();g.stroke();g.shadowBlur=0;
 // Rotate the bunny itself, not the button background.
 g.save();g.rotate(spinAngle);
 g.fillStyle='#fff7fd';g.beginPath();g.ellipse(-17,-34,10,24,-.16,0,Math.PI*2);g.ellipse(17,-34,10,24,.16,0,Math.PI*2);g.fill();
 g.fillStyle='#f8a3c9';g.beginPath();g.ellipse(-17,-34,4,15,-.16,0,Math.PI*2);g.ellipse(17,-34,4,15,.16,0,Math.PI*2);g.fill();
 g.fillStyle='#fff7fd';g.beginPath();g.ellipse(0,1,27,23,0,0,Math.PI*2);g.fill();
 if(pressed){
  // Eyes squeezed shut with joy and a wide open laughing mouth.
  g.strokeStyle='#66334c';g.lineWidth=2.7;g.lineCap='round';
  g.beginPath();g.arc(-10,0,5,Math.PI*1.12,Math.PI*1.9);g.arc(10,0,5,Math.PI*1.12,Math.PI*1.9);g.stroke();
  g.fillStyle='#ff8caf';g.beginPath();g.ellipse(-19,7,6,4,0,0,Math.PI*2);g.ellipse(19,7,6,4,0,0,Math.PI*2);g.fill();
  g.fillStyle='#85365d';g.beginPath();g.ellipse(0,10,10,9,0,0,Math.PI*2);g.fill();
  g.fillStyle='#ff8cb2';g.beginPath();g.ellipse(0,15,6,3,0,0,Math.PI*2);g.fill();
  g.fillStyle='#fff';g.fillRect(-5,3,10,3);
 }else{
  g.fillStyle='#66334c';g.beginPath();g.arc(-10,-2,2.7,0,Math.PI*2);g.arc(10,-2,2.7,0,Math.PI*2);g.fill();
  g.fillStyle='#ff93b8';g.beginPath();g.arc(-18,7,5,0,Math.PI*2);g.arc(18,7,5,0,Math.PI*2);g.fill();
  g.fillStyle='#a44d70';g.beginPath();g.moveTo(0,3);g.lineTo(-4,0);g.lineTo(4,0);g.closePath();g.fill();
 }
 g.restore();g.restore();
 g.save();g.textAlign='center';g.font='bold 12px monospace';g.fillStyle='#fff2cd';
 g.fillText(pressed?'JAAA! LOS GEHT\'S!':'HÄSCHEN ANTIPPEN',320,291);
 if(pressed||jessicaBunnyHover){
  g.fillStyle=pressed?'#ffe28b':'#ffd5f0';
  for(let i=0;i<12;i++){
   const a=i*Math.PI/6+(pressed?elapsed*.009:performance.now()*.001);
   const rad=pressed?77+elapsed*.035:78;
   g.fillRect(cx+Math.cos(a)*rad,cy+Math.sin(a)*(pressed?40+elapsed*.025:43),4,4);
  }
 }
 g.restore();
}
function drawPinkShot(q){
 const x=q.x,y=q.y,rad=q.rabbit?10:7;
 g.save();g.shadowBlur=12;g.shadowColor='#ff39d8';g.fillStyle='#ff46d0';
 g.beginPath();g.arc(x+rad,y+rad,rad,0,Math.PI*2);g.fill();
 g.shadowBlur=0;g.fillStyle='#ffe2fc';g.fillRect(x+rad-3,y+rad-3,6,5);
 if(q.rabbit){g.fillStyle='#ff80e5';g.fillRect(x+rad-7,y-9,5,12);g.fillRect(x+rad+3,y-9,5,12);g.fillStyle='#54204d';g.fillRect(x+rad-5,y+rad,3,3);g.fillRect(x+rad+3,y+rad,3,3)}
 g.restore();
}
function drawCarrot(x,y){r(x+5,y,3,6,'#65b56b');r(x+2,y+5,12,7,'#ed8c36');r(x+4,y+12,8,4,'#e69a39');r(x+6,y+16,4,2,'#f3b35d')}function bg(){
const im=imgs.scenery;r(0,0,W,H,'#42214e');
if(im.complete&&im.naturalWidth){
// The source is a single continuous panorama. It never repeats.
// Move the viewport smoothly from left to right; clamp before the edges.
const scale=Math.max(W/im.naturalWidth, H/im.naturalHeight);
const dw=im.naturalWidth*scale,dh=im.naturalHeight*scale;
const offset=Math.max(0,dw-W)*(Math.max(0,cam)/(LENGTH-W));
g.drawImage(im,-offset,(H-dh)/2,dw,dh);
}else r(0,0,W,H,'#653d75');
if(finalPathActive()&&cam>FINAL_PATH_START-W){
 g.save();g.globalAlpha=Math.min(.65,Math.max(0,(cam-FINAL_PATH_START+W)/1600));
 r(0,0,W,H,'#201329');g.restore();
}
// Low-opacity distance fog adds depth without artificial cake-shaped tiles.
r(0,260,W,100,'#24183b35');
}
const sametWalkSprite=new Image();sametWalkSprite.src='assets/images/18c1febcad26b55c.png';
function drawGameOverOverlay(){r(86,82,468,198,'#181626');r(93,89,454,184,'#39304e');text('GAME OVER',320,146,31,'#ffd27a','center');text('VERSUCH ES NOCHMAL!',320,190,17,'#fff0d2','center');}
function draw(){
 if((mode==='pause'||mode==='jessicaPause')&&gamePauseFrame){
  g.drawImage(gamePauseFrame,0,0,W,H);
  r(0,0,W,H,'#0d081388');
  r(180,135,280,80,'#181626');
  text('PAUSE',W/2,184,28,'#ffd27a','center');
  return;
 }
 if(mode==='stormTitle'){
 if(alinaStartFeedbackAt&&performance.now()-alinaStartFeedbackAt>=1050){alinaStartFeedbackAt=0;enterStormLevel();drawStormLevel();return;}
 if(alinaTitleImage.complete&&alinaTitleImage.naturalWidth>0){
  g.save();g.imageSmoothingEnabled=false;
  // Show the entire menu artwork without stretching or cropping the buttons.
  const scale=Math.min(W/alinaTitleImage.naturalWidth,H/alinaTitleImage.naturalHeight);
  const dw=alinaTitleImage.naturalWidth*scale,dh=alinaTitleImage.naturalHeight*scale;
  g.fillStyle='#10071f';g.fillRect(0,0,W,H);
  const bgX=(W-dw)/2,bgY=(H-dh)/2;
  g.drawImage(alinaTitleImage,bgX,bgY,dw,dh);
  // Alina title copy: keep the original artwork, but replace its title area.
  g.save();
  const titleX=bgX+dw*.5;
  const titleY=bgY+dh*.12;
  const panelX=bgX+dw*.10,panelY=bgY+dh*.035,panelW=dw*.80,panelH=dh*.39;
  g.textAlign='center';g.textBaseline='middle';
  // Strong text outlines and soft shadows keep the title readable without a dark panel.
  g.lineJoin='round';
  g.shadowColor='rgba(12,3,28,.95)';g.shadowBlur=Math.max(7,dh*.035);
  g.strokeStyle='rgba(17,5,35,.95)';g.lineWidth=Math.max(3,dh*.018);
  g.font='bold '+Math.max(18,Math.round(dh*.087))+'px monospace';
  g.strokeText('Jump ’n’ Love',titleX,titleY);
  g.fillStyle='#ffe5a0';g.fillText('Jump ’n’ Love',titleX,titleY);
  g.shadowBlur=Math.max(5,dh*.022);
  g.strokeStyle='rgba(16,5,34,.98)';g.lineWidth=Math.max(3,dh*.014);
  g.font='bold '+Math.max(11,Math.round(dh*.045))+'px monospace';
  g.strokeText('DIE HÜTERIN DES RELIKTS',titleX,bgY+dh*.245,panelW*.96);
  g.fillStyle='#f5d4ff';g.fillText('DIE HÜTERIN DES RELIKTS',titleX,bgY+dh*.245,panelW*.96);
  g.restore();
  // Esat stands on the left foreground rock; only his cape changes frame.
  const frame=alinaEsatFrames[Math.floor((performance.now()-alinaEsatAnimStart)/150)%8];
  if(frame.complete&&frame.naturalWidth>0){
   const heroW=dw*.215,heroH=dh*.405;
   const heroX=bgX+dw*.005,heroY=bgY+dh*.965-heroH;
   g.drawImage(frame,heroX,heroY,heroW,heroH);
  }
  // If files are missing, show a useful hint instead of silently hiding Esat.
  if(!alinaEsatFrames.some(img=>img.naturalWidth>0)){
   g.save();g.fillStyle='#ffe7ff';g.font='12px sans-serif';g.textAlign='left';
   g.fillText('Esat-Sprites fehlen: assets/images/esat-mantel/',12,H-12);g.restore();
  }
  drawAlinaPlayButton();
  if(alinaStartFeedbackAt){const progress=Math.min(1,Math.max(0,(performance.now()-alinaStartFeedbackAt-790)/260));g.fillStyle='rgba(20,7,39,'+(progress*.72)+')';g.fillRect(0,0,W,H);g.save();g.textAlign='center';g.textBaseline='middle';g.shadowColor='#d69aff';g.shadowBlur=18+progress*22;g.font='bold 21px monospace';g.fillStyle='#ffe4a6';g.restore();}
  g.restore();return;
 }
 // Keep a neutral loading frame until the actual Alina artwork is ready.
 // Never render the obsolete placeholder title during image loading.
 g.fillStyle='#10071f';g.fillRect(0,0,W,H);
 return;
}
if(mode==='storm'){drawStormLevel();return;}if(mode==='jessica'||mode==='jessicaPause'||(mode==='dead'&&bossCheckpoint==='jessica'&&jessicaLevel)){drawJessicaLevel();if(mode==='dead')drawGameOverOverlay();return;}if(arenaWall||honeyCameraLocked)cam=BOSS_ARENA_CAMERA_X;else if(secondBossWall||hopeCameraLocked)cam=SECOND_ARENA_LEFT;else if(thirdBossPlaceholder&&(thirdBossPlaceholder.intro||thirdBossPlaceholder.active||thirdBossPlaceholder.realmPhase))cam=THIRD_ARENA_LEFT;else if(winstonPeachGateActive)cam=7950;if(mode==='win'){winClock++;if(shake>0)shake--;for(const z of particles){z.x+=z.vx;z.y+=z.vy;z.vy+=.12;z.t--}particles=particles.filter(z=>z.t>0)}if(mode==='menu'){bg();r(0,0,W,H,'#1a0c2c99');for(let i=0;i<45;i++)r(i*73%W,i*47%H,3,3,'#f3a8db');text("Jump ’n’ Love",320,100,30,'#ffd27a','center');text('DAS GEHEIMNISVOLLE KANINCHENREICH',320,145,17,'#f7afca','center');;drawJessicaBunnyButton();if(mode!=='menu')return;const menuTime=performance.now();const menuRabbitX=-35+((menuTime*0.065)%(W+75));drawRabbit(menuRabbitX,269,1,menuTime/70);const secondRabbitTime=menuTime-2000;if(secondRabbitTime>=0){const secondRabbitX=W+35-((secondRabbitTime*0.065)%(W+75));drawRabbit(secondRabbitX,304,-1,secondRabbitTime/70);}if(jessicaBunnyClickAt){const fade=Math.min(1,Math.max(0,(menuTime-jessicaBunnyClickAt-760)/720));if(fade>0){g.save();g.fillStyle='rgba(21,7,33,'+(fade*fade)+')';g.fillRect(0,0,W,H);g.restore();}}return}cam=releaseHoneyCamera(cam);bg();if(finalPathActive())cam=Math.min(cam,FINAL_PATH_END-W);g.save();g.translate(-Math.floor(cam)+(shake?Math.round((Math.random()-.5)*shake):0),(shake?Math.round((Math.random()-.5)*shake):0));
 // Newly extended approach to Jessica's arena (throne sequence reserved for later).
 for(let j=0;j<6;j++){const xx=1950+j*170;g.fillStyle='#613057';g.fillRect(xx,FLOOR-7,12,7);g.fillStyle='#f59aca';g.fillRect(xx+2,FLOOR-11,8,4);}
for(let pl of platforms){r(pl.x,pl.y,pl.w,pl.h,'#51304b');r(pl.x,pl.y,pl.w,4,'#b9e76c');r(pl.x,pl.y+4,pl.w,5,'#6d9243');for(let x=pl.x+7;x<pl.x+pl.w;x+=23){r(x,pl.y+11,13,6,'#75465a');r(x+7,pl.y+17,9,5,'#39233b');r(x+5,pl.y-3,3,3,'#e0f28a')}}for(let item of pickups)if(!infiniteAmmo&&!item.taken)drawCarrot(item.x,item.y);secondArenaDraw();
 // The dreamworld is withering after Hope: beige-brown dry soil, not healthy green grass.
 if(jessicaAfterHopeDone){
  const start=5600,end=LENGTH+200;
  g.save();g.fillStyle='#a78a68';g.fillRect(start,FLOOR,end-start,55);
  g.fillStyle='#c5ab84';g.fillRect(start,FLOOR,end-start,5);
  for(let xx=start;xx<end;xx+=39){g.fillStyle=xx%3?'#79624e':'#dfc49c';g.fillRect(xx+7,FLOOR+10+(xx%4)*5,12,3);}
  g.restore();
 }
 drawHoneyReward();drawFinalPath();drawSadRabbits();drawThirdBossPlaceholder();drawWinstonPeachPlaceholders();drawPeachCombat();drawWinstonThrow();drawWinstonFarewell();drawWinstonPeachArenaWalls();if(arenaWall){g.save();const rise=honeyGateIntro>0?1-honeyGateIntro/45:1;g.beginPath();g.rect(1880,FLOOR-(FLOOR-60)*rise,660,(FLOOR-60)*rise);g.clip();r(2498,75,13,FLOOR-75,'#251529');r(2502,75,6,FLOOR-75,'#d65ba8');for(let wy=82;wy<FLOOR;wy+=24){r(2500,wy,10,5,'#ffb5e7');r(2503,wy+8,4,7,'#842a70')}r(2492,65,25,15,'#ff83ce');r(1896,75,13,FLOOR-75,'#251529');r(1900,75,6,FLOOR-75,'#d65ba8');for(let wy=82;wy<FLOOR;wy+=24){r(1898,wy,10,5,'#ffb5e7');r(1901,wy+8,4,7,'#842a70')}r(1890,65,25,15,'#ff83ce');text('!',1902,77,12,'#3e163d','center');g.restore()}if(portalOpen&&sametOutroDone&&secondBoss&&secondBoss.defeated){g.save();const px=15200,py=235;g.shadowColor='#ff8af5';g.shadowBlur=24;g.strokeStyle='#ff83ef';g.lineWidth=9;g.beginPath();g.ellipse(px,py,27,62,0,0,Math.PI*2);g.stroke();g.fillStyle='#6b2a9f';g.globalAlpha=.75;g.beginPath();g.ellipse(px,py,22,57,0,0,Math.PI*2);g.fill();g.globalAlpha=1;for(let i=0;i<13;i++){let a=frame*.045+i*Math.PI*2/13;r(px+Math.cos(a)*24,py+Math.sin(a)*54,4,4,'#ffe6fc')}g.restore();}if(arenaCarrot&&!infiniteAmmo){g.save();g.shadowColor='#ffd05b';g.shadowBlur=16;drawCarrot(arenaCarrot.x,arenaCarrot.y);g.restore();}if(arenaCarrotRight&&!infiniteAmmo){g.save();g.shadowColor='#ffd05b';g.shadowBlur=16;drawCarrot(arenaCarrotRight.x,arenaCarrotRight.y);g.restore();}for(let b of bunnies)if(b.alive)drawRabbit(b.x,b.y-b.hop,b.dir,frame);if(sametSprite.complete&&sametSprite.naturalWidth){drawGroundedSprite(sametSprite,119,FLOOR,43,78);if(!tutorialDone&&p&&Math.abs(p.x-130)<140){r(137,FLOOR-105,17,20,'#fff3e6');r(143,FLOOR-85,5,5,'#fff3e6');text('!',145,FLOOR-89,16,'#402333','center');}}if(sametOutro&&sametOutro.stage!=='done'&&sametWalkSprite.complete&&sametWalkSprite.naturalWidth){
 const walking=sametOutro.stage==='run';
 const pose=walking?Math.floor(sametOutro.t/9)%8:0;
 g.save();
 g.translate(Math.round(sametOutro.x+21),FLOOR);
 // The original character art looks left; mirror the complete animated body toward Esat.
 if(sametOutro.x<p.x)g.scale(-1,1);
 drawGroundedSprite(sametWalkSprite,-24,0,48,78,pose*64,0,64,104);
 g.restore();
 if(walking){
  r(p.x+4,p.y-53,19,22,'#fff1e9'); text('!',p.x+13,p.y-36,18,'#432338','center');
 }
}
 if(boss.active&&finale){g.save();g.globalAlpha=.25+.14*Math.sin(frame*.23);g.fillStyle='#ff53d6';g.beginPath();g.arc(boss.x+20,boss.y+29,48,0,Math.PI*2);g.fill();g.restore();for(let i=0;i<8;i++){const a=frame*.07+i*Math.PI/4;r(boss.x+18+Math.cos(a)*43,boss.y+30+Math.sin(a)*36,5,5,i%2?'#fff0ff':'#ff42c7')}if(finale.laser){const l=finale.laser;const bx=l.x;const cy=20;const charge=l.stage==='warn';const pulse=Math.sin(frame*.22);
 g.save();
 // Ritual circle suspended above the falling beam, with spinning runes.
 g.translate(bx,cy+13);g.rotate(frame*(charge?.015:.055));
 g.strokeStyle=charge?'#ff8bee':'#ff38e5';g.lineWidth=2.4;g.shadowColor='#ff42f5';g.shadowBlur=18;
 for(let j=0;j<2;j++){g.beginPath();g.ellipse(0,0,24+j*10,8+j*4,0,0,Math.PI*2);g.stroke()}
 for(let j=0;j<12;j++){const an=j*Math.PI/6;g.beginPath();g.moveTo(Math.cos(an)*37,Math.sin(an)*14);g.lineTo(Math.cos(an)*43,Math.sin(an)*17);g.stroke()}
 g.restore();
 if(charge){
  g.save();g.globalAlpha=.45+.22*pulse;g.shadowColor='#fa4dff';g.shadowBlur=14;
  r(bx-5,35,10,FLOOR-35,'#ff77f0');r(bx-1,35,2,FLOOR-35,'#fff0ff');g.restore();
  for(let j=0;j<16;j++){const yy=35+((frame*6+j*29)%(FLOOR-40));const xx=bx+Math.sin(j*3.1+frame*.12)*(13+j%4*4);r(xx,yy,3,7,j%2?'#fff5ff':'#fa5ce8')}
 }else{
  g.save();g.shadowColor='#ff36f7';g.shadowBlur=34;
  r(bx-37,30,74,FLOOR-30,'#651064');r(bx-29,30,58,FLOOR-30,'#bc19cb');r(bx-21,30,42,FLOOR-30,'#f13fff');r(bx-11,30,22,FLOOR-30,'#ffb7ff');r(bx-5,30,10,FLOOR-30,'#ffffff');g.restore();
  // Animated helix wrapping around the entire laser column.
  g.save();g.strokeStyle='#ffb3ff';g.lineWidth=3;g.shadowColor='#f840ff';g.shadowBlur=12;
  for(let strand=0;strand<2;strand++){g.beginPath();for(let yy=35;yy<FLOOR;yy+=5){const xx=bx+Math.sin(yy*.045+frame*.18+strand*Math.PI)*30;if(yy===35)g.moveTo(xx,yy);else g.lineTo(xx,yy)}g.stroke()}g.restore();
  // Glitter, lightning arcs and flying shards.
  for(let j=0;j<26;j++){const yy=40+((j*59+frame*(9+j%3))%(FLOOR-45));const xx=bx+Math.sin(j*2.4+frame*.12)*(27+j%5*9);r(xx,yy,2+j%3*2,3+j%4*2,j%3===0?'#fff':'#ff5ae8')}
  g.save();g.shadowColor='#ff51ff';g.shadowBlur=25;g.globalAlpha=.8+.15*pulse;
  g.fillStyle='#ff7bed';g.beginPath();g.ellipse(bx,FLOOR-3,48+6*pulse,11,0,0,Math.PI*2);g.fill();
  g.fillStyle='#fff6ff';g.beginPath();g.ellipse(bx,FLOOR-3,24+3*pulse,5,0,0,Math.PI*2);g.fill();g.restore();
  for(let j=0;j<12;j++){const an=j*Math.PI/6+frame*.045;const dist=26+(frame*3+j*13)%38;r(bx+Math.cos(an)*dist,FLOOR-8-Math.abs(Math.sin(an))*dist*.65,3+j%3*2,3+j%3*2,j%2?'#f742ed':'#ffe0ff')}
 }
}}if(boss.active&&grab){
 if(grab.stage==='warn'||grab.stage==='dash'){g.save();g.globalAlpha=.3+.22*Math.sin(frame*.65);r(boss.x-16,boss.y+8,72,36,'#ff55d2');g.restore()}
 if(grab.stage==='ascend'||grab.stage==='spin'||grab.stage==='dive'){for(let i=0;i<4;i++){let a=frame*.17+i*Math.PI/2;g.fillStyle=i%2?'#ffe2ff':'#ff48d6';g.fillRect(boss.x+18+Math.cos(a)*31,boss.y+20+Math.sin(a)*27,6,6)}}
 }if(mode==='cutscene'&&ending.tick<380){drawHoneyDefeated(boss.x,boss.baseY,ending.tick)}else if(boss.hp>0&&mode==='play'&&!(grab&&grab.victim))drawHoney(boss.x,boss.y);if(boss.active&&mode==='play'){r(boss.x-32,65,110,10,'#281d32');r(boss.x-30,67,106*boss.hp/boss.max,6,'#ff7294');}for(let q of enemyShots){r(q.x-2,q.y-2,13,13,'#f6a0ff');r(q.x+1,q.y+1,7,7,'#ff4d9d');r(q.x+3,q.y+3,3,3,'#fff0ff')}for(let q of projectiles)drawCarrot(q.x,q.y-4);for(let q of boss.shots){
 if(q.airMask){
   const cx=q.x+q.w/2,cy=q.y+q.h/2,angle=Math.atan2(q.vy,q.vx);
   g.save();g.translate(cx,cy);g.rotate(angle);g.shadowColor='#f52bff';g.shadowBlur=16;
   // Fast magical comet tail and rune orbit.
   for(let i=5;i>=1;i--){g.globalAlpha=.12+(6-i)*.12;g.fillStyle=i%2?'#f448f6':'#9c35e8';
     g.beginPath();g.ellipse(-i*10,Math.sin(frame*.3+i)*3,16-i,7-i*.7,0,0,Math.PI*2);g.fill();}
   g.globalAlpha=1;g.fillStyle='#6e1d92';g.beginPath();g.ellipse(0,0,18,16,0,0,Math.PI*2);g.fill();
   g.strokeStyle='#ff78f5';g.lineWidth=3;g.stroke();g.shadowBlur=0;
   g.fillStyle='#fff1ff';g.beginPath();g.moveTo(-12,-5);g.lineTo(-3,-1);g.lineTo(-11,2);g.fill();
   g.beginPath();g.moveTo(12,-5);g.lineTo(3,-1);g.lineTo(11,2);g.fill();
   g.strokeStyle='#ffb8fc';g.lineWidth=2;g.beginPath();g.arc(0,2,8,.12,Math.PI-.12);g.stroke();
   g.fillStyle='#f7a4ff';for(let i=0;i<4;i++){const a=frame*.16+i*Math.PI/2;r(Math.cos(a)*23,Math.sin(a)*20,3,3,'#f7a4ff')}
   g.restore();
 }else drawPinkShot(q);
}
if(boss.active){if(grab&&grab.stage==='warn'){g.globalAlpha=.45+.3*Math.sin(frame*.4);r((boss.face||-1)<0?boss.x-350:boss.x+boss.w,FLOOR-5,350,5,'#ff55c8');g.globalAlpha=1}for(const sw of shockwaves){
 if(sw.jesterWave){
  const cx=sw.x+sw.w/2,cy=sw.y+sw.h/2,age=sw.age||0;
  g.save();
  if(sw.warn>0){
   g.globalAlpha=.3+.4*Math.sin(frame*.5)**2;
   g.strokeStyle='#ff7afb';g.lineWidth=3;
   g.beginPath();g.ellipse(cx,FLOOR-8,22,6,0,0,Math.PI*2);g.stroke();
  }else{
   const direction=Math.sign(sw.vx)||1;
   g.shadowColor='#ed39ff';g.shadowBlur=18;
   g.fillStyle='#8d24c6';
   g.beginPath();g.ellipse(cx,cy,21,17,0,0,Math.PI*2);g.fill();
   g.strokeStyle='#ff7eff';g.lineWidth=3;g.stroke();
   g.shadowBlur=0;
   g.fillStyle='#fce7ff';
   g.beginPath();g.moveTo(cx-11,cy-3);g.lineTo(cx-3,cy+2);g.lineTo(cx-11,cy+5);g.fill();
   g.beginPath();g.moveTo(cx+11,cy-3);g.lineTo(cx+3,cy+2);g.lineTo(cx+11,cy+5);g.fill();
   g.strokeStyle='#ffb9ff';g.lineWidth=2;
   g.beginPath();g.arc(cx,cy+4,7,.12,Math.PI-.12);g.stroke();
   for(let i=0;i<5;i++){
    const tx=cx-direction*(24+i*11),ty=cy+Math.sin(age*.35+i*1.9)*12;
    r(tx,ty,10-i,3+i%2,i%2?'#ff72fa':'#f8d7ff');
   }
   for(let i=0;i<4;i++){
    const a=age*.18+i*Math.PI/2;
    r(cx+Math.cos(a)*26,cy+Math.sin(a)*19,4,4,'#ffb0fc');
   }
  }
  g.restore();
 }else if(sw.warn>0){
  g.globalAlpha=.35+.2*Math.sin(frame*.3);r(sw.x-380,FLOOR-7,380,7,'#ff4ab8');g.globalAlpha=1
 }else{r(sw.x,sw.y,sw.w,sw.h,'#ff2bbf');r(sw.x+5,sw.y-9,13,9,'#ffd2ff')}
}
if(laser){const bx=(laser.dir||-1)<0?boss.x-640:boss.x+boss.w;if(laser.stage==='warn'){for(let i=0;i<9;i++){const qx=bx+((frame*9+i*77)%640);r(qx,laser.y-12-(i%3)*6,5,5,i%2?'#fff4ff':'#ff66dd')}g.globalAlpha=.35+.25*Math.sin(frame*.4);r(bx,laser.y+laser.h/2-2,640,4,'#ff4ac9');g.globalAlpha=1;for(let i=0;i<8;i++)r(bx+i*80,laser.y+laser.h/2-7,3,14,'#ffc5f0')}else{
 const cy=laser.y+laser.h/2,dir=laser.dir||-1,origin=dir<0?boss.x:boss.x+boss.w,tip=dir<0?bx:bx+640;
 g.save();
 g.shadowColor='#f335ff';g.shadowBlur=26;
 r(bx,cy-laser.h*.95,640,laser.h*1.9,'#6b167d');
 r(bx,cy-laser.h*.65,640,laser.h*1.3,'#e32be8');
 r(bx,cy-laser.h*.3,640,laser.h*.6,'#fff1ff');
 g.shadowBlur=0;
 for(let i=0;i<24;i++){
  const qx=bx+((frame*(15+i%4*3)+i*79)%640);
  const off=Math.sin(frame*.21+i*2.3)*(laser.h*.8+7);
  r(qx,cy+off,8+i%3*4,2+i%3,i%3?'#ff7ff8':'#fff9ff');
 }
 g.strokeStyle='#ffb4ff';g.lineWidth=2.5;
 for(let k=0;k<5;k++){
  const x=bx+((frame*18+k*139)%640);
  g.beginPath();g.ellipse(x,cy,9+Math.sin(frame*.13+k)*4,laser.h*.85,0,0,Math.PI*2);g.stroke();
 }
 // Magic casting ring at the hand, visible during the full blast.
 g.translate(origin,cy);g.rotate(frame*.045);
 g.strokeStyle='#ff62ef';g.lineWidth=3;g.shadowColor='#ff4dff';g.shadowBlur=16;
 for(let j=0;j<2;j++){g.beginPath();g.arc(0,0,19+j*8,0,Math.PI*2);g.stroke()}
 for(let j=0;j<8;j++){const a=j*Math.PI/4;g.beginPath();g.moveTo(Math.cos(a)*31,Math.sin(a)*31);g.lineTo(Math.cos(a)*38,Math.sin(a)*38);g.stroke()}
 g.restore();
 // Laser reaches the arena wall in a brilliant impact.
 g.save();g.globalAlpha=.72+.2*Math.sin(frame*.37);g.shadowColor='#ff4dff';g.shadowBlur=22;
 g.fillStyle='#ffb2ff';g.beginPath();g.arc(tip,cy,14+Math.sin(frame*.29)*4,0,Math.PI*2);g.fill();
 for(let j=0;j<9;j++){const a=j*Math.PI*2/9+frame*.1;const rr=21+(frame+j*11)%17;r(tip+Math.cos(a)*rr,cy+Math.sin(a)*rr,4,4,j%2?'#fff':'#ff54e8')}
 g.restore();
}}}
for(let z of particles){
 const size=z.earth?(z.size||4):3+(mode==='win'?2:0);
 const color=z.earth?(['#6a443b','#ad8059','#d5ae7d','#8d6b57'][Math.floor(z.t/4)%4]):(z.t%2?'#ff77d8':'#fff3b4');
 r(z.x,z.y,size,size,color);
}if(!(grab&&grab.victim)&&!(mode==='storm'&&storm?.chestReveal>0&&stormChestFrames[Math.min(11,Math.floor((storm.chestReveal-1)/9))]?.naturalWidth>0)&&(!inv||frame%8<5||godMode))drawHero(p.x,p.y);
 if(grab&&grab.stage==='warn'){
   const cx=boss.x+boss.w/2,cy=boss.y+boss.h/2;
   g.save();g.globalAlpha=.48+.22*Math.sin(frame*.4)**2;
   g.strokeStyle='#ff82f6';g.lineWidth=2.5;g.shadowColor='#f135ff';g.shadowBlur=13;
   for(let j=0;j<2;j++){g.beginPath();g.arc(cx,cy,28+j*13,frame*.07+j,frame*.07+j+Math.PI*1.6);g.stroke();}
   g.restore();
 }
 if(grab&&grab.stage==='dash'){
   g.save();g.globalCompositeOperation='lighter';
   const dir=grab.dir||-1;
   for(let k=1;k<=6;k++){
     g.globalAlpha=(7-k)*.065;
     const sprite=hofnarrV79.grab_dash;
     if(honeyArtReady())drawHoneyRedesignPose(9,boss.x+19-dir*k*14,boss.y+66);
     else if(sprite&&sprite.complete&&sprite.naturalWidth)
       g.drawImage(sprite,boss.x-dir*k*14-18,boss.y-14,74,91);
     g.fillStyle=k%2?'#ff7bf8':'#fff4ff';
     g.fillRect(boss.x+18-dir*k*18,boss.y+15+Math.sin(frame*.7+k)*12,13,3);
   }
   g.restore();
 }
 if(grab&&(grab.stage==='spin'||grab.stage==='dive')){
   const cx=boss.x+20,cy=boss.y+30;
   g.save();g.globalCompositeOperation='lighter';
   for(let k=0;k<5;k++){
     const angle=grab.rotation-k*.55;
     const radius=48+k*7;
     g.strokeStyle=k%2?'#ff5deb':'#ffd8ff';
     g.lineWidth=Math.max(1,4-k*.5);g.globalAlpha=.42-k*.06;
     g.beginPath();g.arc(cx,cy,radius,angle,angle+Math.PI*.85);g.stroke();
   }
   g.restore();
 }
 if(grab&&grab.victim){
   const rotating=grab.stage==='spin'||grab.stage==='dive';
   const cx=boss.x+20,cy=boss.y+30;
   g.save();g.translate(cx,cy);
   if(rotating)g.rotate(grab.rotation);
   // Both sprites rotate as a single locked pair.
   const ji=hofnarrV79.grab_spin;
   // Full-body jester and Esat rotate together.
   if(honeyArtReady())drawHoneyRedesignPose(11,0,35);
   else if(ji&&ji.complete&&ji.naturalWidth)g.drawImage(ji,-39,-53,76,92);
   drawHero(-3,-12);
   g.globalCompositeOperation='lighter';
   for(let ring=0;ring<3;ring++){
     const radius=38+ring*11+Math.sin(frame*.26+ring)*3;
     g.strokeStyle=ring===1?'#fff1ff':'#f83bff';
     g.globalAlpha=.55-ring*.12;
     g.lineWidth=3-ring*.55;
     g.beginPath();g.arc(0,0,radius,frame*.22+ring*2,frame*.22+ring*2+Math.PI*1.35);g.stroke();
   }
   for(let spark=0;spark<13;spark++){
     const angle=frame*.24+spark*Math.PI*2/13;
     const radius=43+spark%3*10;
     g.globalAlpha=.5+.4*Math.sin(frame*.21+spark)**2;
     g.fillStyle=spark%3?'#ff65ed':'#fff8ff';
     g.fillRect(Math.cos(angle)*radius,Math.sin(angle)*radius,3+spark%3,3+spark%2);
   }
   g.globalAlpha=1;g.globalCompositeOperation='source-over';
   g.restore();
 }
 if(grab&&grab.stage==='impact'){
   const age=24-grab.timer;
   g.save();g.globalCompositeOperation='lighter';
   const alpha=Math.max(0,1-age/24);
   g.globalAlpha=alpha;g.shadowColor='#f04cff';g.shadowBlur=24;
   for(let i=0;i<3;i++){
     g.strokeStyle=i===1?'#fff0ff':'#ef52ff';g.lineWidth=5-i;
     g.beginPath();g.ellipse(grab.impactX,FLOOR-4,8+age*(3+i*1.6),5+age*.45,0,Math.PI,Math.PI*2);g.stroke();
   }
   for(let i=0;i<14;i++){
     const angle=Math.PI*2*i/14;
     const rr=10+age*(2.1+i%3*.5);
     g.fillStyle=i%3?'#ff74ee':'#fff';
     g.fillRect(grab.impactX+Math.cos(angle)*rr,FLOOR-7+Math.sin(angle)*rr*.5,4+i%3,4+i%2);
   }
   g.restore();
   g.save();g.strokeStyle='#b68b76';g.lineWidth=3;g.globalAlpha=Math.max(0,1-age/24);
   for(let i=0;i<3;i++){g.beginPath();g.ellipse(grab.impactX,FLOOR-3,age*(3.2+i*1.7),5+age*.3,0,Math.PI,Math.PI*2);g.stroke()}
   g.restore();
 }if(inv&&mode==='play'){g.save();g.globalAlpha=.2;r(p.x-5,p.y-7,p.w+10,p.h+14,'#ff9cce');g.restore()}
 if(grab&&(grab.stage==='ascend'||grab.stage==='spin'||grab.stage==='dive')){g.save();g.strokeStyle='#ff9ef3';g.lineWidth=3;g.globalAlpha=.8;g.beginPath();g.arc(p.x+12,p.y+17,25+4*Math.sin(frame*.3),0,Math.PI*2);g.stroke();for(let i=0;i<3;i++){g.fillStyle='#ffe2ff';g.fillRect(p.x-7+i*19,p.y-13-(frame+i*6)%17,4,8)}g.restore()}
 g.restore();
if(mode==='cutscene'){
 const t=ending.tick;
 if(t<75){r(0,0,W,H,'#1b102255');}
 
}
if(mode==='levelFinish'){
 const fade=Math.min(1,finishClock/65);
 g.save();g.globalAlpha=fade;r(0,0,W,H,'#100b20');g.restore();
 if(finishClock>65){
   const appear=Math.min(1,(finishClock-65)/32);
   g.save();g.globalAlpha=appear;
   text('✦ LEVEL 1 ABGESCHLOSSEN ✦',320,132,25,'#ffd27a','center');
   text('DAS GEHEIMNISVOLLE KANINCHENREICH',320,174,15,'#f7b5d9','center');
   text('TODE: '+deaths,320,211,17,'#f9e7d2','center');
   text('DEIN WEG GEHT WEITER ...',320,259,13,'#cbb5f6','center');
   g.restore();
 }
}
if(mode==='level2'){r(0,0,W,H,'#0e0919');text('LEVEL 2 – SARAH',320,134,32,'#ff8fcb','center');text('DAS REICH DER VERLORENEN LIEBE',320,179,16,'#f9d8ee','center');text('FORTSETZUNG FOLGT',320,240,17,'#eac78d','center')}
if(mode!=='levelFinish'&&mode!=='level2'){r(0,0,W,38,'#1a172bdc');text('♥ '.repeat(hp),12,25,21,'#ff88a2');if(godMode)text('TEST',78,24,10,'#b6ffe6');text('🥕 '+(infiniteAmmo||(secondBoss&&secondBoss.active&&!secondBoss.defeated)?'∞':carrots),145,24,16,'#ffd68b');text('TODE '+deaths,275,24,15);text('LEVEL 1',545,24,14,'#f3a5c5');}if(arenaWall)text('MOEHRE IN '+Math.max(0,Math.ceil((nextCarrotAt-frame)/60))+'s',424,50,11,'#ffe39a');drawTalk();drawThirdRealmOverlay();drawRhythm();drawFinalDoorFade();if(['pause','dead'].includes(mode)||(mode==='win'&&winClock>85)){r(86,82,468,198,'#181626');r(93,89,454,184,'#39304e');text(mode==='pause'?'PAUSE':mode==='dead'?'GAME OVER':'HONEY BESIEGT!',320,146,mode==='win'?27:31,'#ffd27a','center');text(mode==='win'?'LEVEL 1 GESCHAFFT!':mode==='dead'?'VERSUCH ES NOCHMAL!':'P DRUECKEN ZUM FORTSETZEN',320,190,17,'#fff0d2','center');text(mode==='win'?'DRUECKE NEUSTART FUER EINEN NEUEN RUN':mode==='dead'?'':'',320,233,13,'#efabc7','center')}}document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!muted&&mode==='play')syncBossMusic()});// Fixed 60 Hz simulation: gameplay speed does not depend on monitor refresh rate.
const FIXED_STEP=1000/60;
let previousFrameTime=null,simulationAccumulator=0;
function loop(t){
 if(previousFrameTime===null)previousFrameTime=t;
 const elapsed=Math.max(0,Math.min(t-previousFrameTime,250));
 previousFrameTime=t;
 simulationAccumulator+=elapsed;
 let steps=0;
 while(simulationAccumulator>=FIXED_STEP && steps<5){
  if(mode==='storm'||mode==='jessica'||mode==='play'||mode==='cutscene'||mode==='postboss'||mode==='sametOutro'||mode==='level2'||mode==='levelFinish')update();
  simulationAccumulator-=FIXED_STEP;
  steps++;
 }
 // Avoid fast-forwarding the game after a long stall or background-tab pause.
 if(steps===5 && simulationAccumulator>=FIXED_STEP)simulationAccumulator=0;
 if(steps>0 || mode==='menu' || mode==='dead'||mode==='pause'||mode==='jessicaPause')draw();
 requestAnimationFrame(loop);
}
document.addEventListener('visibilitychange',()=>{previousFrameTime=null;simulationAccumulator=0;if(document.hidden&&(mode==='jessica'||mode==='play'||mode==='storm'))toggleGamePause();else if(!document.hidden&&(mode==='pause'||mode==='jessicaPause'))draw();});// Developer shortcut: test Samet's entrance without fighting Jessica.
// Test shortcuts: finish either Snickers song using the existing completion flow.
function skipSnickersSong(targetPhase){
 const b=thirdBossPlaceholder;
 if(!b||b.realmPhase!=='rhythm'||!rhythm||snickersSongPhase!==targetPhase){
  status.textContent=targetPhase===1?'Starte zuerst Snickers Song 1.':'Starte zuerst Snickers Song 2.';
  return;
 }
 // Skipped notes are neutral, not counted as misses or hits.
 for(const note of rhythm.notes){if(note.state===0)note.state=2;}
 rhythm.forceFinish=true;
 updateRhythm();
 status.textContent=targetPhase===1?'Song 1 übersprungen – Zwischensequenz':'Song 2 übersprungen – Sterbesequenz';
}
for(const [phase,label] of [[1,'⏭ Song 1 skippen'],[2,'⏭ Song 2 skippen']]){
 const btn=document.createElement('button');btn.textContent=label;
 btn.title=phase===1?'Direkt zum Dialog zwischen den Songs':'Direkt zu Snickers Sterbeszene';
 btn.style.cssText='margin:6px;padding:9px 13px;background:#50306b;color:#fff;border:2px solid #d5a3ff;border-radius:8px;cursor:pointer;font-weight:bold';
 document.getElementById('game').insertAdjacentElement('afterend',btn);
 btn.onclick=()=>skipSnickersSong(phase);
}
const snickersDoneTest=document.createElement('button');
snickersDoneTest.textContent='⚔️ Direkt zu Winston & Peach';
snickersDoneTest.title='Direkt zum Auftritt des Doppelbosses';
snickersDoneTest.style.cssText='margin:6px;padding:9px 13px;background:#622b39;color:#fff;border:2px solid #ff6379;border-radius:8px;cursor:pointer;font-weight:bold';
document.getElementById('game').insertAdjacentElement('afterend',snickersDoneTest);
snickersDoneTest.onclick=()=>{
 reset();stopBossMusic();
 const b=thirdBossPlaceholder;
 b.defeated=true;b.active=false;b.intro=false;b.realmPhase='';b.deathStage=null;b.gate=0;
 rhythm=null;snickersSongPhase=0;
 jessicaAfterHopeDone=true;jessicaAfterSnickersDone=true;
 winstonPeachSummoned=true;winstonPeachIntroDone=false;
 winstonPeachGateActive=false;winstonPeachGatePending=false;winstonPeachGate=0;
 boss.active=false;boss.defeated=true;arenaWall=false;
 // Direktboss-Test: Hope wirklich abschließen, nicht nur Honey.
 // Sonst aktiviert der globale Hope-Trigger bei x >= SECOND_ARENA_LEFT+170
 // den alten Boss erneut und übernimmt Kamera/Spielzustand.
 secondBoss.active=false;secondBoss.defeated=true;secondBoss.dying=false;
 secondBoss.deathStage='gone';secondBoss.hp=0;secondBossWall=false;
 hopeCameraLocked=false;hopeGateIntro=0;secondShots=[];grab=null;
 mode='postboss';talk=null;tutorialDone=true;checkpoint=true;
 p.x=8100;p.y=FLOOR-p.h;p.vx=0;p.vy=0;p.on=true;p.dir=1;
 cam=Math.max(0,Math.min(LENGTH-W,p.x-150));
 keys.left=keys.right=keys.jump=keys.attack=keys.down=false;
 bossMusicWanted=false;startLevelMusic();
 status.textContent='⚔️ Winston & Peach · Bossauftritt startet beim Weiterlaufen';
};
// Reuse the existing boss shortcut setup, then finish its state at the final door.
const jessicaDoorTest=document.createElement('button');
jessicaDoorTest.id='jessica-door-shortcut';
jessicaDoorTest.textContent='🚪 Direkt zur Jessica-Tür';
jessicaDoorTest.title='Vor der letzten Tür starten · mit E eintreten';
jessicaDoorTest.style.cssText=snickersDoneTest.style.cssText;
document.getElementById('game').insertAdjacentElement('afterend',jessicaDoorTest);
jessicaDoorTest.onclick=()=>{
 snickersDoneTest.onclick();
 winstonPeachIntroDone=true;
 winstonThrow.defeated=true;winstonThrow.hp=0;
 winstonFarewell={stage:'done',particles:[]};
 finalPath={queenSpoken:true,queenFinished:true,doorTick:0,entered:false};
 p.x=FINAL_DOOR_X-p.w/2-35;p.y=FLOOR-p.h;p.vx=p.vy=0;p.on=true;
 cam=Math.min(FINAL_PATH_END-W,p.x-150);
 honeyCameraRelease=null;honeyCameraLocked=false;
 status.textContent='Jessica-Tür · E, Pfeil hoch oder WEITER zum Eintreten';
};
// Test shortcut: jump directly to the final dialogue beat before teleportation.
const alinaTestButton=document.createElement('button');
 alinaTestButton.id='alina-level-test';
 alinaTestButton.textContent='⚡ Direkt zum Alina-Level';
 alinaTestButton.title='Startet den neuen Sturmwelt-Prototyp ohne Jessica durchzuspielen';
 alinaTestButton.style.cssText=jessicaDoorTest.style.cssText;
 document.getElementById('game').insertAdjacentElement('afterend',alinaTestButton);
 alinaTestButton.onclick=()=>{
  if(talk){talk=null;}
  jessicaCrimsonMusic.pause();jessicaFarewellMusic.pause();bossMusic.pause();
  enterStormTitle();
 };
 const jessicaTeleportTest=document.createElement('button');
jessicaTeleportTest.id='jessica-teleport-shortcut';
jessicaTeleportTest.textContent='✨ Kurz vor Jessicas Teleportation';
jessicaTeleportTest.title='Startet den letzten Abschiedsdialog direkt vor dem Teleport';
jessicaTeleportTest.style.cssText=jessicaDoorTest.style.cssText;
document.getElementById('game').insertAdjacentElement('afterend',jessicaTeleportTest);
jessicaTeleportTest.onclick=()=>{
 enterJessicaLevel();
 jessicaLevel.entranceDelay=0;
 jessicaLevel.throneSceneStarted=true;
 jessicaLevel.spawnsStopped=true;
 jessicaLevel.ibizas=[];jessicaLevel.rabbits=[];
 jessicaLevel.farewellStage=null;
 p.x=JESSICA_LENGTH-180;
 p.y=jessicaSurfaceY(jessicaLevel.platforms[6],p.x+p.w/2)-p.h;
 p.vx=0;p.vy=0;p.on=true;
 cam=jessicaCameraX();
 jessicaLevel.cameraY=Math.min(0,p.y-(FLOOR-210));
 keys.left=keys.right=keys.jump=keys.attack=keys.down=false;
 startJessicaFarewell();
 const lastLines=jessicaThroneFarewellLines.slice(-7);
 beginTalk(lastLines,()=>{
  jessicaLevel.farewellStage='teleport';
  jessicaLevel.farewellTimer=85;
  syncBossMusic();
 },'continue');
 status.textContent='Jessica · Abschied und Teleportation testen';
};
const sametTest=document.createElement('button');
sametTest.textContent='🎬 Samets Einlauf testen';
sametTest.title='Springt direkt zur Szene vor dem Portal';
sametTest.style.cssText='margin:6px;padding:9px 13px;background:#304c61;color:#fff;border:2px solid #8ce1ee;border-radius:8px;cursor:pointer;font-weight:bold';
document.getElementById('game').insertAdjacentElement('afterend',sametTest);
sametTest.onclick=()=>{
 reset();
 talk=null;tutorialDone=true;sametOutroDone=false;sametOutro=null;
 boss.active=false;boss.hp=0;
 portalOpen=false;arenaWall=false;checkpoint=true;
 mode='postboss';ending=null;finale=null;laser=null;grab=null;shockwaves=[];
 projectiles=[];enemyShots=[];
 p.x=2300;p.y=FLOOR-p.h;p.vx=0;p.vy=0;p.on=true;p.dir=1;
 cam=(arenaWall||honeyCameraLocked)?BOSS_ARENA_CAMERA_X:Math.max(-900,Math.min(LENGTH-W,p.x-150));
 keys.left=keys.right=keys.jump=keys.attack=keys.down=false;
 bossMusicWanted=false;startLevelMusic();
 status.textContent='🎬 Test: Samet läuft von links ein · Dialog mit Leertaste / Enter';
};
const toggle=document.createElement('button');toggle.id='damageToggle';toggle.textContent='🛡 Testmodus: AN';toggle.style.cssText='margin:6px;padding:9px 13px;background:#482448;color:#fff;border:2px solid #ff8bda;border-radius:8px;cursor:pointer;font-weight:bold';document.getElementById('game').insertAdjacentElement('afterend',toggle);toggle.onclick=()=>{godMode=!godMode;toggle.textContent=godMode?'🛡 Testmodus: AN':'⚔ Schaden: AN';status.textContent=godMode?'TESTMODUS: Unverwundbar':'SOULSLIKE: Schaden aktiv · 3 Herzen';};document.getElementById('nextDialog').addEventListener('pointerdown',e=>{e.preventDefault();if(talk)nextTalk();else tryFinalDoor();});
// Alina's title prompt is drawn on the canvas, so clicking the canvas must start the level too.
document.getElementById('game').addEventListener('pointermove',e=>{
 if(mode!=='menu'){jessicaBunnyHover=false;e.currentTarget.style.cursor='';return;}
 const rect=e.currentTarget.getBoundingClientRect(),x=(e.clientX-rect.left)*W/rect.width,y=(e.clientY-rect.top)*H/rect.height;
 jessicaBunnyHover=x>=250&&x<=390&&y>=176&&y<=270;
 e.currentTarget.style.cursor=jessicaBunnyHover?'pointer':'default';
});
document.getElementById('game').addEventListener('pointermove',e=>{
 if(mode!=='stormTitle'){alinaPlayHover=false;return;}
 const rect=e.currentTarget.getBoundingClientRect(),x=(e.clientX-rect.left)*W/rect.width,y=(e.clientY-rect.top)*H/rect.height,b=alinaPlayBounds();
 alinaPlayHover=Math.abs(x-b.x)<=b.w/2&&Math.abs(y-b.y)<=b.h/2;
 e.currentTarget.style.cursor=alinaPlayHover?'pointer':'default';
});
document.getElementById('game').addEventListener('pointerleave',e=>{jessicaBunnyHover=false;e.currentTarget.style.cursor='';});
document.getElementById('game').addEventListener('click',e=>{
 if(mode==='menu'){
  const rect=e.currentTarget.getBoundingClientRect();
  const x=(e.clientX-rect.left)*W/rect.width,y=(e.clientY-rect.top)*H/rect.height;
  if(x>=250&&x<=390&&y>=176&&y<=270&&!jessicaBunnyClickAt){
   jessicaBunnyClickAt=performance.now();e.currentTarget.style.cursor='pointer';
  }
  return;
 }

 if(mode!=='stormTitle')return;
 const canvas=e.currentTarget,rect=canvas.getBoundingClientRect();
 const x=(e.clientX-rect.left)*canvas.width/rect.width;
 const y=(e.clientY-rect.top)*canvas.height/rect.height;
 const bounds=alinaPlayBounds();
 if(Math.abs(x-bounds.x)<=bounds.w/2&&Math.abs(y-bounds.y)<=bounds.h/2)confirmAlinaStart();
});
document.getElementById('start').onclick=()=>{if(mode==='stormTitle'){confirmAlinaStart();return;}(mode==='dead'&&checkpoint?restartBossCheckpoint():reset());if(mode!=='jessica'&&mode!=='jessicaPause')syncBossMusic();};document.getElementById('miniboss-shortcut').onclick=()=>{reset(true);guardWarningDone=true;startLevelMusic();say('TESTSTART · VOR DEM HONEYEN',105);};document.getElementById('after-honey-shortcut').onclick=()=>{
 reset(false);
 // Recreate the post-Honey state without playing the old boss or outro cutscene.
 guardWarningDone=true;tutorialDone=true;checkpoint=true;
 boss.active=false;boss.hp=0;boss.shots=[];boss.cool=999;
 arenaWall=false;portalOpen=false;ending=null;finale=null;laser=null;grab=null;
 enemyShots=[];projectiles=[];shockwaves=[];particles=[];
 mode='postboss';p.x=3040;p.y=FLOOR-p.h;p.vx=0;p.vy=0;p.on=true;p.dir=1;
 hp=3;carrots=12;inv=90;cam=Math.max(-900,Math.min(LENGTH-W,p.x-150));
 bunnies.forEach(b=>b.alive=false);
 pickups.forEach(q=>{if(q.x<3000)q.taken=true;});
 keys.left=keys.right=keys.jump=keys.attack=keys.down=false;
 stopBossMusic();startLevelMusic();
 say('HONEY BESIEGT · WEITER ZU HOPE!',150);
 status.textContent='TESTSTART: Nach Honey – auf dem Weg zu Hope';
};
document.getElementById('boss3-shortcut').onclick=()=>{
 reset(false);
 guardWarningDone=true;mysteryVoiceDone=true;tutorialDone=true;checkpoint=true;
 boss.active=false;boss.hp=0;boss.shots=[];boss.cool=999;
 secondBoss.active=false;secondBoss.defeated=true;secondBoss.dying=false;secondBoss.hp=0;
 secondBoss.deathStage='gone';secondBossWall=false;hopeCameraLocked=false;hopeGateIntro=0;
 jessicaAfterHopeDone=true;jessicaAfterHopeAt=null;
 arenaWall=false;portalOpen=false;ending=null;finale=null;laser=null;grab=null;
 enemyShots=[];projectiles=[];shockwaves=[];particles=[];
 mode='postboss';p.x=THIRD_ARENA_LEFT-105;p.y=FLOOR-p.h;p.vx=0;p.vy=0;p.on=true;p.dir=1;
 hp=3;carrots=12;inv=90;cam=Math.max(-900,Math.min(LENGTH-W,p.x-150));
 bunnies.forEach(b=>b.alive=false);pickups.forEach(q=>{if(q.x<p.x)q.taken=true;});
 keys.left=keys.right=keys.jump=keys.attack=keys.down=false;
 rhythmTrack.pause();rhythm=null;stopBossMusic();startLevelMusic();
 say('TESTSTART: MUSIC REALM · LAUF NACH RECHTS!',180);
 status.textContent='TESTSTART: Vor Boss 3 auf der verdorbenen Wiese';
};
document.getElementById('sound').onclick=e=>{
 muted=!muted;
 if(mode==='menu'){if(muted)jessicaMenuMusic.pause();else startJessicaMenuMusic();}
 else if(mode==='stormTitle'){if(muted)alinaTitleMusic.pause();else startAlinaTitleMusic();}
 else syncBossMusic();
 e.currentTarget.textContent=muted?'♫ TON AUS':'♫ TON AN';
};function map(k){k=k.toLowerCase();return k==='a'||k==='arrowleft'?'left':k==='d'||k==='arrowright'?'right':k==='s'||k==='arrowdown'?'down':k==='w'||k==='arrowup'||k===' '?'jump':k==='f'?'attack':null}// Linke Maustaste: auf dem Spielfeld klicken; F bleibt als Alternative erhalten.
let mouseShootHeld=false;
function refreshShootKey(){keys.attack=mouseShootHeld||keyboardShootHeld;}
let keyboardShootHeld=false;
cv.addEventListener('pointerdown',e=>{
 if(e.button!==0||e.pointerType==='touch')return;
 if((mode==='play'||mode==='postboss'||mode==='storm')&&!talk){
  e.preventDefault();
  mouseShootHeld=true;refreshShootKey();
  if(mode==='storm'&&storm&&storm.portalScene==='none'&&storm.magicUnlocked){if(storm.clash?.phase==='duel'){storm.clashClicks++;}else{storm.chargeActive=true;storm.chargeReady=false;storm.chargeFrames=0;storm.pendingMagicClicks=0;}}
  attackHeld=false; // jeder neue Linksklick schiesst auch nach gehaltenem F
 }
});
window.addEventListener('pointerup',e=>{
 if(e.button===0&&e.pointerType!=='touch'){
  if(mode==='storm'&&storm&&storm.chargeActive&&storm.clash?.phase!=='duel'){
   storm.chargePower=Math.min(1,storm.chargeFrames/75);
   storm.chargeReady=storm.magicUnlocked&&storm.portalScene==='none'&&!talk;
   storm.chargeActive=false;
  }
  mouseShootHeld=false;refreshShootKey();
 }
});
cv.addEventListener('contextmenu',e=>e.preventDefault());
window.addEventListener('blur',()=>{mouseShootHeld=false;keyboardShootHeld=false;if(storm){storm.chargeActive=false;storm.chargeReady=false;}refreshShootKey();});
document.getElementById('hope-one-hp').addEventListener('click',()=>{
 if(secondBoss&&secondBoss.active&&!secondBoss.defeated&&!secondBoss.dying){
  secondBoss.hp=1;
  status.textContent='Hope hat jetzt 1 HP – der nächste Treffer besiegt ihn!';
 }else{
  status.textContent='Der Button funktioniert während des aktiven Hope-Kampfes.';
 }
});
// Match the existing Hope test shortcut: only change HP during the active fight.
const winstonOneHpButton=document.createElement('button');
winstonOneHpButton.id='winston-one-hp';
winstonOneHpButton.textContent='⚔ WINSTON AUF 1 HP';
winstonOneHpButton.title='Winston im aktiven Kampf auf 1 HP setzen';
winstonOneHpButton.style.cssText='margin:6px;padding:10px 14px;background:#7d2038;color:#fff;border:2px solid #ff9bb2;border-radius:8px;cursor:pointer;font-weight:bold';
winstonOneHpButton.addEventListener('click',()=>{
 if(winstonPeachGateActive&&winstonPeachGate>=1&&!winstonPeachGatePending&&!winstonThrow.defeated&&!winstonFarewell){
  winstonThrow.hp=1;winstonThrow.hit=0;
  status.textContent='Winston hat jetzt 1 HP – der nächste Treffer startet seine Sterbeszene!';
 }else status.textContent='Der Button funktioniert während des aktiven Winston-Kampfes.';
});
document.querySelector('.controls').prepend(winstonOneHpButton);
const rhythmHeldKeys=new Set();
const pauseAudioTracks=[levelMusic,bossMusic,jessicaCrimsonMusic,jessicaFarewellMusic,snickersFirstTrack,rhythmTrack];
let pausedAudioTracks=[];
function pauseGameAudio(){pausedAudioTracks=pauseAudioTracks.filter(track=>!track.paused&&!track.ended);for(const track of pausedAudioTracks)track.pause();}
function resumeGameAudio(){const tracks=pausedAudioTracks;pausedAudioTracks=[];if(muted)return;for(const track of tracks){if(!track.ended)track.play().catch(()=>{});}}
const jessicaPausableModes=new Set(['play','cutscene','postboss','sametOutro','level2','levelFinish','jessica','storm']);
let modeBeforeGamePause='play',gamePauseFrame=null;
function toggleGamePause(){
 if(mode==='pause'||mode==='jessicaPause'){
  mode=modeBeforeGamePause;
  gamePauseFrame=null;
  previousFrameTime=null;simulationAccumulator=0;
  resumeGameAudio();
 }else if(jessicaPausableModes.has(mode)){
  modeBeforeGamePause=mode;
  const snapshot=document.createElement('canvas');
  snapshot.width=cv.width;snapshot.height=cv.height;
  snapshot.getContext('2d').drawImage(cv,0,0);
  gamePauseFrame=snapshot;
  pauseGameAudio();
  mode=mode==='jessica'?'jessicaPause':'pause';
 }
}
window.addEventListener('keydown',e=>{
 if(e.key.toLowerCase()!=='e'||e.repeat||mode!=='storm'||!storm||talk)return;
 if(storm.stage==='won'&&!storm.artifactCollected&&!storm.sametHasArtifact&&Math.abs((p.x+p.w/2)-(storm.alinaX+20))<72){
  e.preventDefault();storm.artifactCollected=true;
  status.textContent='Relikt des Schicksals GESICHERT';
  beginTalk([{speaker:'Relikt des Schicksals',text:'Ein uraltes Relikt, das seinem Träger ungeheure magische Macht verleiht.'},{speaker:'Relikt des Schicksals',text:'Seine Kraft ist nahezu grenzenlos – doch niemand weiß, welchen Preis diese Macht fordert.'}
  ],()=>{},'continue');
  return;
 }
 if(storm.chestOpened||Math.abs((p.x+p.w/2)-(storm.chestX+24))>=66)return;
 e.preventDefault();p.x=storm.chestX-40;p.y=FLOOR-p.h;p.vx=0;p.vy=0;p.on=true;p.dir=1;storm.chestOpened=true;storm.magicUnlocked=true;storm.chestReveal=1;
 levelMusic.pause();bossMusic.pause();stormChestMusic.currentTime=0;stormChestMusic.muted=muted;
 stormChestMusic.play().catch(()=>{stormChestMusic.pause();storm.chestReveal=100;});
 storm.pendingMagicClicks=0;storm.shootWasHeld=false;
 storm.chestDialoguePending=true;
 /* Dialogue begins after the chest-opening and blue-pearl lift animation. */
 /* beginTalk([
  {speaker:'Alte Schatztruhe',text:'Du hast die Kraft der azurblauen Magie gefunden!'},
  {speaker:'Alte Schatztruhe',text:'Wer diese Truhe öffnet, erhält die Macht, reine magische Energie in seinen Händen zu bündeln.'},
  {speaker:'Alte Schatztruhe',text:'Mit einem Linksklick entfesselst du blaue Magiekugeln. Sie fliegen in deine Blickrichtung und verletzen deine Feinde.'},
  {speaker:'Alte Schatztruhe',text:'Nutze diese Gabe weise. In dieser Welt wirst du sie brauchen.'}
 ],()=>{stormSay('BLAUE MAGIE FREIGESCHALTET · LINKSKLICK');},'continue'); */
});
window.addEventListener('keydown',e=>{if(e.key.toLowerCase()==='p'&&!e.repeat&&(jessicaPausableModes.has(mode)||mode==='pause'||mode==='jessicaPause')){e.preventDefault();toggleGamePause();return;}if(mode==='pause'||mode==='jessicaPause')return;if(thirdBossPlaceholder&&thirdBossPlaceholder.realmPhase==='rhythm'&&rhythm){const k=e.key.toLowerCase();if('asdf'.includes(k)&&k.length===1){e.preventDefault();if(!e.repeat&&!rhythmHeldKeys.has(k) )rhythmPress('asdf'.indexOf(k));rhythmHeldKeys.add(k);return;}if(k==='r'&&rhythm.state==='failed'){e.preventDefault();restartBossCheckpoint();return;}if(k===' '||k.startsWith('arrow')){e.preventDefault();return;}}if(talk){if(e.code==='Space'||e.key==='Enter')e.preventDefault();return;}if((mode==='jessica'||mode==='jessicaPause')&&(e.key.toLowerCase()==='w'||e.key==='ArrowUp')){e.preventDefault();keys.climbUp=true;return;}if(!e.repeat&&(e.key.toLowerCase()==='e'||e.key==='ArrowUp')&&tryFinalDoor()){e.preventDefault();return;}let k=map(e.key);if(k){e.preventDefault();if(k==='attack'){keyboardShootHeld=true;refreshShootKey();}else keys[k]=true}if(e.key==='Enter'&&mode==='menu'){reset();startLevelMusic()}});window.addEventListener('keyup',e=>{if(e.key.toLowerCase()==='w'||e.key==='ArrowUp')keys.climbUp=false;rhythmHeldKeys.delete(e.key.toLowerCase());let k=map(e.key);if(k){if(k==='attack'){keyboardShootHeld=false;refreshShootKey();}else keys[k]=false}});document.addEventListener('touchmove',e=>{if(e.target.closest('.touch'))e.preventDefault()},{passive:false});window.addEventListener('blur',()=>{Object.keys(keys).forEach(k=>keys[k]=false);if(mode==='jessica'||mode==='play'||mode==='storm')toggleGamePause();});document.querySelectorAll('[data-k]').forEach(el=>{const k=el.dataset.k;el.addEventListener('pointerdown',e=>{e.preventDefault();if(!talk)keys[k]=true;el.setPointerCapture(e.pointerId)});for(let ev of ['pointerup','pointercancel','lostpointercapture'])el.addEventListener(ev,e=>{e.preventDefault();keys[k]=false})});cv.addEventListener('click',()=>{if(mode==='menu')return; if(talk){if(mode!=='pause'&&mode!=='jessicaPause')nextTalk();return;}if(mode==='dead'){(checkpoint?restartBossCheckpoint():reset());if(mode!=='jessica'&&mode!=='jessicaPause')syncBossMusic()}});if(new URLSearchParams(window.location.search).get('level')==='alina')enterStormTitle();requestAnimationFrame(loop)})();

