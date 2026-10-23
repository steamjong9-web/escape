const K="ss1",$=s=>document.querySelector(s),sh=a=>a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(x=>x[1]);
let S=JSON.parse(localStorage.getItem(K)||"null");
const save=()=>localStorage.setItem(K,JSON.stringify(S)),ui=h=>{$("#m").innerHTML=h;scrollTo(0,0)};
function toast(t){const d=document.createElement("div");d.className="ts";d.textContent=t;document.body.appendChild(d);setTimeout(()=>d.remove(),2600)}
function clue(t){if(!S.k.includes(t)){S.k.push(t);save();toast("📒 단서: "+t);$("#nb").textContent="📒 "+S.k.length}}
function tick(h){const r=S.end-Date.now(),c=$("#clk");if(!c)return;if(r<=0){S.o="timeout";save();location="end.html";return}c.textContent="⏱ "+Math.floor(r/6e4)+":"+String(Math.floor(r%6e4/1e3)).padStart(2,"0");c.className=r<3e5?"red":"";if(h){c.classList.add("hit");setTimeout(()=>c.classList.remove("hit"),500)}}
function pen(m){S.end-=m*6e4;save();tick(1)}
function eff(e){e.split(";").forEach(x=>{const i=x.indexOf(":"),a=x.slice(0,i),b=x.slice(i+1);if(a=="pen"){pen(+b);S.f.press=(S.f.press||0)+1;save()}if(a=="k")clue(b);if(a=="f"){S.f[b]=1;save()}})}
const OK=(s,nx,h)=>{ui(`<h2>${h||"✅"}</h2><p>${s}</p><button class=go id=g>다음 ▶</button>`);$("#g").onclick=nx};
const T={
text:(s,nx)=>{ui(`<h2>${s.h}</h2><p>${typeof s.b=="function"?s.b():s.b}</p>${s.x||""}<button class=go id=g>${s.bt||"다음 ▶"}</button>`);$("#g").onclick=nx},
fn:(s,nx)=>s.f(nx),
one:(s,nx)=>{ui(`<h2>${s.h}</h2><p>${s.b}</p>${s.o.map((o,j)=>`<button class=op data-j=${j}>${o[0]}</button>`).join("")}`);document.querySelectorAll(".op").forEach(b=>b.onclick=()=>{const[k,v]=s.o[b.dataset.j][1].split(":");S.f[k]=v;save();nx()})},
tf:(s,nx)=>{const a=s.q.map(()=>-1);ui(`<h2>${s.h}</h2><p>${s.b}</p>${s.q.map((q,j)=>`<div class=r><span>${q}</span><span><button data-j=${j} data-v=1>참</button><button data-j=${j} data-v=0>거짓</button></span></div>`).join("")}<button class=go id=g>🔑 열쇠 돌리기</button><p id=e></p>`);
document.querySelectorAll(".r button").forEach(b=>b.onclick=()=>{a[b.dataset.j]=+b.dataset.v;b.parentNode.querySelectorAll("button").forEach(x=>x.classList.remove("on"));b.classList.add("on")});
$("#g").onclick=()=>{if(a.join("")==s.ans)OK("찰칵. 문이 열렸다.",nx,"🔓");else{pen(1);$("#e").innerHTML="🔒 열리지 않는다 (−1분)<br>"+s.hint}}},
order:(s,nx)=>{const L=sh(s.items.map((t,i)=>[t,i]));let q=[];const d=()=>{ui(`<h2>${s.h}</h2><p>${s.b}</p>${L.map(([t,i])=>`<button class="op${q.includes(i)?' on':''}" data-i=${i}>${q.includes(i)?q.indexOf(i)+1+'. ':''}${t}</button>`).join("")}<button class=go id=g>확인</button><button id=rs>다시</button><p id=e></p>`);
document.querySelectorAll(".op").forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(!q.includes(i)){q.push(i);d()}});$("#rs").onclick=()=>{q=[];d()};
$("#g").onclick=()=>{if(q.join()==s.items.map((_,i)=>i).join()){if(s.clue)clue(s.clue);OK(s.ok,nx)}else{pen(1);q=[];d();$("#e").textContent="순서가 맞지 않는다 (−1분). "+s.hint}}};d()},
pick:(s,nx)=>{const sel=new Set();ui(`<h2>${s.h}</h2><p>${s.b}</p>${s.x||""}${s.o.map((t,i)=>`<button class=op data-i=${i}>${t}</button>`).join("")}<button class=go id=g>확인</button><p id=e></p>`);
document.querySelectorAll(".op").forEach(b=>b.onclick=()=>{const i=+b.dataset.i;sel.has(i)?sel.delete(i):sel.add(i);b.classList.toggle("on")});
$("#g").onclick=()=>{if(s.fl)for(const i in s.fl)if(sel.has(+i)){S.f[s.fl[i]]=1;save()}const ok=s.a.length==sel.size&&s.a.every(i=>sel.has(i));
if(s.once){S.f[s.key]=ok?1:0;save();return OK(ok?s.ok:s.no,nx,ok?"✅":"⚠️")}
if(ok){if(s.clue)clue(s.clue);OK(s.ok,nx)}else{pen(1);$("#e").innerHTML="❌ 다시 생각해 보자 (−1분)<br>"+s.hint}}},
chat:(s,nx)=>{let log="";const go=id=>{const n=s.n[id];let k=0;const draw=c=>{ui(`<h2>${s.h}</h2><div class=chat>${log}</div>${c?(n.c?n.c.map((o,j)=>`<button class=op data-j=${j}>${o[0]}</button>`).join(""):"<button class=go id=g>다음 ▶</button>"):""}`);
if(c){if(n.c)document.querySelectorAll(".op").forEach(b=>b.onclick=()=>{const o=n.c[b.dataset.j];if(o[2])eff(o[2]);log+=`<div class="b me"><small>나</small>${o[0]}</div>`;go(o[1])});else $("#g").onclick=nx}};
const step=()=>{if(k<n.m.length){const[w,t]=n.m[k++];log+=`<div class=b><small>${w}</small>${t}</div>`;draw(0);setTimeout(step,650)}else draw(1)};step()};go("a")}};
function run(R){if(R.start){S={end:Date.now()+18e5,k:[],f:{},v:{}};save()}
if(!S){location="index.html";return}
document.body.innerHTML=`<header><b>🕵️ ${R.title}</b><span id=clk></span><button id=nb>📒 ${S.k.length}</button></header><main id=m></main><div id=nt hidden></div>`;
$("#nb").onclick=()=>{const n=$("#nt");n.hidden=!n.hidden;n.innerHTML="<b>📒 단서 수첩</b><br>"+(S.k.length?S.k.map(x=>"• "+x).join("<br>"):"아직 단서가 없다")};
tick();setInterval(tick,1000);let i=0;const nx=()=>{if(i>=R.steps.length){S.v[R.id]=1;save();if(R.next)location=R.next;return}const s=R.steps[i++];T[s.t](s,nx)};nx()}
