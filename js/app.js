const {useState,useMemo,useEffect,useRef,useContext,createContext}=React;
const h=htm.bind(React.createElement);
const MARK='data:image/png;base64,__MARK__';
const brl=new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'});
const pad=n=>String(n).padStart(2,'0');
const iso=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const P={grid:'<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',chart:'<path d="M5 20V10M12 20V4M19 20v-7M3 20h18"/>',list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',bell:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',plus:'<path d="M12 5v14M5 12h14"/>',down:'<path d="M12 5v14m-6-6 6 6 6-6"/>',up:'<path d="M12 19V5m-6 6 6-6 6 6"/>',bank:'<path d="M3 10 12 4l9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>',shield:'<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',dollar:'<circle cx="12" cy="12" r="9"/><path d="M14.5 9.5C14 8.5 13 8 12 8c-1.5 0-2.500.8-2.500 2s1 1.700 2.500 2 2.500.8 2.500 2-1 2-2.500 2c-1 0-2-.5-2.500-1.500M12 6v2m0 8v2"/>',cart:'<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.600 12.400a2 2 0 0 0 2 1.600h7.700a2 2 0 0 0 2-1.500L21 8H6"/>',eye:'<path d="M2 12s3.500-7 10-7 10 7 10 7-3.500 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',eyeoff:'<path d="M3 3l18 18M10.600 6.100A9.800 9.800 0 0 1 12 6c6.500 0 10 6 10 6a17 17 0 0 1-3 3.700M6.600 7.600C3.800 9.300 2 12 2 12s3.500 7 10 7c1.600 0 3-.4 4.300-1M9.900 9.900a3 3 0 0 0 4.200 4.200"/>',trash:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',moon:'<path d="M20 14.500A8 8 0 1 1 9.500 4a6.500 6.500 0 0 0 10.500 10.500z"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.900 4.900l1.400 1.400m11.400 11.400 1.400 1.400M2 12h2m16 0h2M4.900 19.100l1.400-1.400M17.700 6.300l1.400-1.400"/>',reset:'<path d="M3 12a9 9 0 1 0 3-6.700L3 8M3 3v5h5"/>',home:'<path d="M3 11 12 3l9 8M5 10v10h14V10M10 20v-6h4v6"/>',food:'<path d="M7 3v8a2 2 0 0 0 2 2v8M11 3v8a2 2 0 0 1-2 2M17 21V3c-2 1-3.500 3.500-3.500 7 0 2 1.500 3 3.500 3"/>',car:'<path d="M5 17h14M6 17l1-8h10l1 8M7 9l1-4h8l1 4M8 14h.01M16 14h.01"/>',film:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m10 9 5 3-5 3z"/>',heart:'<path d="M20.800 5.600a5 5 0 0 0-7.100 0L12 7.300l-1.700-1.700a5 5 0 0 0-7.100 7.100L12 21.500l8.800-8.800a5 5 0 0 0 0-7.100z"/>',brief:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>',laptop:'<rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 20h20"/>',trend:'<path d="m3 17 6-6 4 4 8-8M15 7h6v6"/>',receipt:'<path d="M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6"/>',pulse:'<path d="M5 12.500a10 10 0 0 1 14 0M8.500 15.500a6 6 0 0 1 7 0M12 19h.01"/>',arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',check:'<path d="m5 12 5 5 9-10"/>'};
const Ic=({n,s=20})=>h`<svg viewBox="0 0 24 24" width=${s} height=${s} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML=${{__html:P[n]}}/>`;
const CATS={despesa:['Moradia','Alimentação','Transporte','Lazer','Saúde','Outros'],receita:['Salário','Freelance','Investimentos','Outros']};
const ALLC=['Moradia','Alimentação','Transporte','Lazer','Saúde','Metas','Outros'];
const COL=['#6D5BFF','#A18CFF','#35D0FF','#2BD98A','#FFB84D','#FF5C7A','#8E97C0'];
const ci=t=>t.type==='receita'&&t.cat==='Outros'?'dollar':({Moradia:'home','Alimentação':'food',Transporte:'car',Lazer:'film','Saúde':'heart',Metas:'target','Salário':'brief',Freelance:'laptop',Investimentos:'trend'}[t.cat]||'receipt');
const load=(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}};
const save=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const Hide=createContext(false);
const s=i=>({'--i':i});
function seed(){const n=new Date(),a=[];let id=1;
 for(let m=0;m<12;m++){const d=x=>iso(new Date(n.getFullYear(),n.getMonth()-m,x));
  a.push({id:id++,type:'receita',desc:'Salário',amount:6500,cat:'Salário',date:d(5)});
  a.push({id:id++,type:'receita',desc:'Projeto freelance',amount:500+((m*397)%1900),cat:'Freelance',date:d(18)});
  if(m%4===2)a.push({id:id++,type:'receita',desc:'Rendimento da carteira',amount:420,cat:'Investimentos',date:d(25)});
  a.push({id:id++,type:'despesa',desc:'Aluguel',amount:1800,cat:'Moradia',date:d(8)});
  a.push({id:id++,type:'despesa',desc:'Supermercado',amount:760+((m*163)%520),cat:'Alimentação',date:d(12)});
  a.push({id:id++,type:'despesa',desc:'Transporte por app',amount:180+((m*71)%260),cat:'Transporte',date:d(15)});
  a.push({id:id++,type:'despesa',desc:'Cinema e jantar',amount:240+((m*129)%480),cat:'Lazer',date:d(20)});
  if(m%3===1)a.push({id:id++,type:'despesa',desc:'Consulta médica',amount:320,cat:'Saúde',date:d(22)});}
 return a}
const SG=[{id:1,name:'Reserva de emergência',target:20000,saved:8400},{id:2,name:'Viagem de férias',target:6000,saved:2150},{id:3,name:'Notebook novo',target:7500,saved:5200}];
function useCount(v){const [x,setX]=useState(0);const f=useRef(0);
 useEffect(()=>{if(matchMedia('(prefers-reduced-motion:reduce)').matches){f.current=v;setX(v);return}
  let raf,t0;const a=f.current;const step=t=>{t0=t0||t;const p=Math.min(1,(t-t0)/900),e=1-Math.pow(1-p,3),val=a+(v-a)*e;f.current=val;setX(val);if(p<1)raf=requestAnimationFrame(step)};raf=requestAnimationFrame(step);return()=>cancelAnimationFrame(raf)},[v]);return x}
const M=({v})=>{const hd=useContext(Hide),x=useCount(v);return hd?'R$ ••••••':brl.format(x)};
const Big=({v})=>{const hd=useContext(Hide),x=useCount(v);const [i,f]=brl.format(x).split(',');return hd?'R$ ••••••':h`<span>${i}<small>,${f}</small></span>`};
function smooth(p){let d='M'+p[0].x+' '+p[0].y;for(let i=0;i<p.length-1;i++){const a=p[i-1]||p[i],b=p[i],c=p[i+1],e=p[i+2]||c;d+='C'+(b.x+(c.x-a.x)/6)+' '+(b.y+(c.y-a.y)/6)+' '+(c.x-(e.x-b.x)/6)+' '+(c.y-(e.y-b.y)/6)+' '+c.x+' '+c.y}return d}
const pct=(a,b)=>b?Math.round((a-b)/b*1000)/10:0;
const Delta=({v,up=true})=>{const good=(v>=0)===up;return h`<span className="dl" style=${{'--c':good?'var(--g)':'var(--r)'}}><${Ic} n=${v>=0?'up':'down'} s=${12}/>${Math.abs(v).toFixed(1).replace('.',',')}%</span>`};
const Stat=({i,ic,l,v,dl,up,idx})=>h`<div className="glass stat st" style=${s(idx)}><div className="ico"><${Ic} n=${ic}/></div><div className="l">${l}</div><div className="v num"><${M} v=${v}/></div>${dl}</div>`;
function Ring({p,size=64,sw=7,gid}){const r=(size-sw)/2,C=2*Math.PI*r;const [m,setM]=useState(false);useEffect(()=>{const t=setTimeout(()=>setM(true),120);return()=>clearTimeout(t)},[]);
 return h`<div className="ring" style=${{width:size,height:size}}><svg width=${size} height=${size}><defs><linearGradient id=${'g'+gid}><stop offset="0" stopColor="var(--v)"/><stop offset="1" stopColor="#35D0FF"/></linearGradient></defs><circle cx=${size/2} cy=${size/2} r=${r} fill="none" stroke="var(--chip)" strokeWidth=${sw}/><circle cx=${size/2} cy=${size/2} r=${r} fill="none" stroke=${'url(#g'+gid+')'} strokeWidth=${sw} strokeLinecap="round" strokeDasharray=${C} strokeDashoffset=${m?C*(1-Math.min(100,p)/100):C}/></svg><b className="num">${Math.round(p)}%</b></div>`}
function Flow({ms,mode}){const [hv,setHv]=useState(11);const hd=useContext(Hide);const vals=ms.map(m=>m[mode]),max=Math.max(1,...vals);
 const pts=vals.map((v,i)=>({x:i*1000/11,y:86-(v/max)*66}));const d=smooth(pts);
 const mv=e=>{const r=e.currentTarget.getBoundingClientRect();setHv(Math.max(0,Math.min(11,Math.round((e.clientX-r.left)/r.width*11))))};
 return h`<div><div className="plot" onPointerMove=${mv} onPointerDown=${mv}>
 <svg key=${mode} viewBox="0 0 1000 100" preserveAspectRatio="none"><defs><linearGradient id="ar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--v)" stopOpacity=".5"/><stop offset="1" stopColor="var(--v)" stopOpacity="0"/></linearGradient><linearGradient id="st" x1="0" x2="1"><stop offset="0" stopColor="var(--v)"/><stop offset="1" stopColor="var(--v2)"/></linearGradient></defs><path d=${d+'L1000 100L0 100Z'} fill="url(#ar)"/><path d=${d} fill="none" stroke="url(#st)" strokeWidth="3" vectorEffect="non-scaling-stroke"/></svg>
 <i className="vl" style=${{left:(hv/11*100)+'%'}}></i>
 ${pts.map((p,i)=>h`<b key=${i} className=${'dot'+(i===hv?' on':'')} style=${{left:(i/11*100)+'%',top:p.y+'%'}}></b>`)}
 <div className="tip num" style=${{left:'clamp(52px,'+(hv/11*100)+'%,calc(100% - 52px))',top:pts[hv].y+'%'}}>${hd?'••••':brl.format(vals[hv])}</div></div>
 <div className="xl">${ms.map((m,i)=>h`<span key=${m.k} className=${i===hv?'on':''}>${m.l}</span>`)}</div></div>`}
function VCard(){const r=useRef();const mv=e=>{const b=r.current.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;r.current.style.transform='perspective(700px) rotateY('+x*14+'deg) rotateX('+-y*14+'deg)'};
 return h`<div ref=${r} className="vcard st" style=${s(2)} onMouseMove=${mv} onMouseLeave=${()=>r.current.style.transform=''}><div className="t"><img src="img/logoN.png" alt=""/><span style=${{opacity:.1}}><${Ic} n="pulse" s=${24}/></span></div><div className="n num">•••• •••• •••• 3892</div><div className="r"><div><small>TITULAR</small>Gustavo Leal</div><div style=${{textAlign:'right'}}><small>VALIDADE</small>12/30</div></div></div>`}
function Tx({t,del}){const hd=useContext(Hide);const dt=new Date(t.date+'T12:00:00').toLocaleDateString('pt-BR',{day:'2-digit',month:'short'}).replace('.','');
 return h`<div className="row"><div className="bub"><${Ic} n=${ci(t)}/></div><div className="grow"><b>${t.desc}</b><span className="mute">${t.cat} · ${dt}</span></div><span className=${t.type==='receita'?'pos':'neg'}>${t.type==='receita'?'+':'−'} ${hd?'••••':brl.format(t.amount)}</span>${del&&h`<button className="xb" aria-label="Excluir transação" onClick=${()=>del(t.id)}><${Ic} n="trash" s=${18}/></button>`}</div>`}
function Form({kind,onSave,onClose}){const [type,setT]=useState(kind),[amount,setA]=useState(''),[desc,setD]=useState(''),[cat,setC]=useState(CATS[kind][0]),[date,setDt]=useState(iso(new Date())),[err,setE]=useState('');
 const pick=t=>{setT(t);setC(CATS[t][0])};
 const go=()=>{const v=parseFloat(String(amount).replace(',','.'));if(!(v>0))return setE('Informe um valor maior que zero.');if(!desc.trim())return setE('Dê um nome para a transação.');onSave({id:Date.now(),type,desc:desc.trim(),amount:Math.round(v*100)/100,cat,date})};
 return h`<div className="ov" onClick=${e=>e.target===e.currentTarget&&onClose()}><div className="sheet" role="dialog" aria-label="Nova transação"><h3 className="hd" style=${{margin:'0 0 14px',fontSize:22}}>Nova transação</h3>
 <div className="sg"><button className=${type==='despesa'?'on':''} onClick=${()=>pick('despesa')}>Despesa</button><button className=${type==='receita'?'on':''} onClick=${()=>pick('receita')}>Receita</button></div>
 <input className="in" inputMode="decimal" placeholder="Valor (R$)" aria-label="Valor" value=${amount} onChange=${e=>setA(e.target.value)}/>
 <input className="in" placeholder="Descrição" aria-label="Descrição" value=${desc} onChange=${e=>setD(e.target.value)}/>
 <select className="in" aria-label="Categoria" value=${cat} onChange=${e=>setC(e.target.value)}>${CATS[type].map(c=>h`<option key=${c}>${c}</option>`)}</select>
 <input className="in" type="date" aria-label="Data" value=${date} onChange=${e=>setDt(e.target.value)}/>
 ${err&&h`<p style=${{color:'var(--r)',margin:'10px 0 0',fontSize:13}}>${err}</p>`}
 <div className="two" style=${{marginTop:16}}><button className="btn" onClick=${onClose}>Cancelar</button><button className="btn p" onClick=${go}>Salvar</button></div></div></div>`}
function GoalCard({g,dep,rm,idx}){const [v,setV]=useState('');const p=g.saved/g.target*100;
 return h`<div className="glass st" style=${s(idx)}><div style=${{display:'flex',gap:16,alignItems:'center'}}><${Ring} p=${p} size=${84} sw=${9} gid=${g.id}/><div className="grow"><h3 className="hd" style=${{margin:0,fontSize:18}}>${g.name}</h3><div className="mute" style=${{marginTop:4}}><${M} v=${g.saved}/> de <${M} v=${g.target}/></div><div className="mute">Faltam <${M} v=${Math.max(0,g.target-g.saved)}/></div></div><button className="xb" aria-label="Excluir meta" onClick=${()=>rm(g.id)}><${Ic} n="trash" s=${18}/></button></div>
 <div style=${{display:'flex',gap:8,marginTop:16}}><input className="in" style=${{margin:0}} inputMode="decimal" placeholder="Valor a guardar" aria-label=${'Valor para '+g.name} value=${v} onChange=${e=>setV(e.target.value)}/><button className="btn p s" onClick=${()=>{const n=parseFloat(String(v).replace(',','.'));if(n>0){dep(g.id,n);setV('')}}}>Guardar</button></div></div>`}
function NewGoal({add,idx}){const [n,setN]=useState(''),[t,setT]=useState('');
 return h`<div className="glass st" style=${s(idx)}><h3 className="hd" style=${{margin:0,fontSize:18}}>Nova meta</h3><input className="in" placeholder="Nome da meta" aria-label="Nome da meta" value=${n} onChange=${e=>setN(e.target.value)}/><input className="in" inputMode="decimal" placeholder="Valor alvo (R$)" aria-label="Valor alvo" value=${t} onChange=${e=>setT(e.target.value)}/><button className="btn p w" style=${{marginTop:14}} onClick=${()=>{const v=parseFloat(String(t).replace(',','.'));if(n.trim()&&v>0){add({id:Date.now(),name:n.trim(),target:v,saved:0});setN('');setT('')}}}><${Ic} n="plus" s=${18}/>Criar meta</button></div>`}

function App(){
 const [txs,setTxs]=useState(()=>load('nx2_txs',null)||seed()),[goals,setGoals]=useState(()=>load('nx2_goals',null)||SG);
 const [tab,setTab]=useState('home'),[open,setOpen]=useState(null),[hide,setHide]=useState(false),[mode,setMode]=useState('inc'),[filter,setFilter]=useState('todas'),[q,setQ]=useState(''),[toast,setToast]=useState(''),[theme,setTheme]=useState('dark');
 useEffect(()=>save('nx2_txs',txs),[txs]);useEffect(()=>save('nx2_goals',goals),[goals]);
 useEffect(()=>{document.documentElement.dataset.theme=theme},[theme]);
 useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(''),2400);return()=>clearTimeout(t)},[toast]);
 useEffect(()=>{const f=e=>{const g=e.target.closest&&e.target.closest('.glass');if(!g)return;const r=g.getBoundingClientRect();g.style.setProperty('--mx',(e.clientX-r.left)+'px');g.style.setProperty('--my',(e.clientY-r.top)+'px')};addEventListener('pointermove',f);return()=>removeEventListener('pointermove',f)},[]);
 const mon=useMemo(()=>{const n=new Date(),ms=[];for(let i=11;i>=0;i--){const d=new Date(n.getFullYear(),n.getMonth()-i,1);ms.push({k:d.getFullYear()+'-'+pad(d.getMonth()+1),l:d.toLocaleDateString('pt-BR',{month:'short'}).replace('.','').toUpperCase(),inc:0,exp:0,cats:{}})}
  const map=Object.fromEntries(ms.map(m=>[m.k,m]));let bal=0;txs.forEach(t=>{const sg=t.type==='receita'?1:-1;bal+=sg*t.amount;const m=map[t.date.slice(0,7)];if(m){if(sg>0)m.inc+=t.amount;else{m.exp+=t.amount;m.cats[t.cat]=(m.cats[t.cat]||0)+t.amount}}});return{ms,bal}},[txs]);
 const cur=mon.ms[11],prv=mon.ms[10],saved=goals.reduce((a,g)=>a+g.saved,0),tgt=goals.reduce((a,g)=>a+g.target,0);
 const sorted=useMemo(()=>[...txs].sort((a,b)=>b.date.localeCompare(a.date)||b.id-a.id),[txs]);
 const cats=Object.entries(cur.cats).sort((a,b)=>b[1]-a[1]);
 const add=t=>{setTxs([...txs,t]);setOpen(null);setToast('Transação adicionada')};
 const del=id=>setTxs(txs.filter(t=>t.id!==id));
 const dep=(id,v)=>{const g=goals.find(x=>x.id===id);setGoals(goals.map(x=>x.id===id?{...x,saved:x.saved+v}:x));setTxs([...txs,{id:Date.now(),type:'despesa',desc:'Meta: '+g.name,amount:v,cat:'Metas',date:iso(new Date())}]);setToast('Valor guardado na meta')};
 const hr=new Date().getHours(),hi=hr<12?'Bom dia':hr<18?'Boa tarde':'Boa noite';
 const list=sorted.filter(t=>(filter==='todas'||t.type===filter)&&(!q||(t.desc+t.cat).toLowerCase().includes(q.toLowerCase())));
 const NAV=[['home','grid','Painel'],['ana','chart','Análises'],['tx','list','Transações'],['goals','target','Metas']];
 const mname=new Date().toLocaleDateString('pt-BR',{month:'long'});
 const savR=cur.inc?Math.round((cur.inc-cur.exp)/cur.inc*100):0;
 const avg=Math.round(mon.ms.reduce((a,m)=>a+m.exp,0)/12);
 const tot=mon.ms.reduce((a,m)=>a+m[mode],0);
 const segs=(()=>{const top=cats.slice(0,3),rest=cats.slice(3).reduce((a,c)=>a+c[1],0);return[...top.map(([c,v])=>[c,v]),...(rest?[['Outras',rest]]:[])]})();

 const home=h`<div className="home"><div className="col"><div className="tops">
  <div className="glass wallet st" style=${s(0)}><div className="ph"><div><h3 className="hd">Carteira Nexora</h3><div className="mute" style=${{marginTop:4}}>Saldo geral das suas contas</div></div><button className="btn p s" onClick=${()=>setOpen('despesa')}><${Ic} n="plus" s=${16}/>Adicionar</button></div>
   <div className="big num"><${Big} v=${mon.bal}/></div><div className="live"><i></i>Atualizado automaticamente</div>
   <div style=${{marginTop:22}}><div className="ph mute"><span>Distribuição dos gastos em ${mname}</span><span>${cats.length?'100%':'0%'}</span></div><div className="seg">${segs.map(([c,v],i)=>h`<i key=${c} style=${{width:(v/cur.exp*100)+'%',background:COL[i]}}></i>`)}</div><div className="lg">${segs.map(([c],i)=>h`<span key=${c} style=${{'--c':COL[i]}}>${c}</span>`)}</div></div></div>
  <${Stat} idx=${1} ic="bank" l="Saldo total" v=${mon.bal} up=${true} dl=${h`<${Delta} v=${pct(mon.bal,mon.bal-(cur.inc-cur.exp))}/>`}/>
  <${Stat} idx=${2} ic="shield" l="Total em metas" v=${saved} dl=${h`<span className="dl" style=${{'--c':'var(--v2)'}}>${tgt?Math.round(saved/tgt*100):0}% do alvo</span>`}/>
  <${Stat} idx=${3} ic="dollar" l="Receitas do mês" v=${cur.inc} dl=${h`<${Delta} v=${pct(cur.inc,prv.inc)}/>`}/>
  <${Stat} idx=${4} ic="cart" l="Despesas do mês" v=${cur.exp} dl=${h`<${Delta} v=${pct(cur.exp,prv.exp)} up=${false}/>`}/></div>
  <div className="glass st" style=${s(5)}><div className="ph"><div><h3 className="hd" style=${{fontSize:20}}>Fluxo de caixa</h3><div className="big num" style=${{margin:'8px 0 0',fontSize:36}}><${M} v=${tot}/></div><div className="mute">Total dos últimos 12 meses</div></div><div className="tg"><button className=${mode==='inc'?'on':''} onClick=${()=>setMode('inc')}>Receitas</button><button className=${mode==='exp'?'on':''} onClick=${()=>setMode('exp')}>Despesas</button></div></div><${Flow} ms=${mon.ms} mode=${mode}/></div></div>
 <div className="side"><div className="glass st wide" style=${s(1)}><div className="ph"><h3 className="hd">Minhas metas</h3><button className="lk" onClick=${()=>setTab('goals')}>Ver todas</button></div><div className="rings">${goals.slice(0,3).map(g=>h`<div className="rg" key=${g.id}><${Ring} p=${g.saved/g.target*100} gid=${'s'+g.id}/><span className="mute" style=${{maxWidth:'100%',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>${g.name}</span></div>`)}</div></div>
  <div className="wide" style=${{display:'grid',gap:14}}><${VCard}/><div className="two"><button className="btn p" onClick=${()=>setOpen('receita')}>Receita<${Ic} n="down" s=${18}/></button><button className="btn" onClick=${()=>setOpen('despesa')}>Despesa<${Ic} n="arrow" s=${18}/></button></div></div>
  <div className="wide st" style=${s(3)}><h3 className="hd" style=${{margin:'0 0 12px'}}>Ações rápidas</h3><div className="qa"><button onClick=${()=>setOpen('receita')}><span><${Ic} n="down"/></span>Receber</button><button onClick=${()=>setOpen('despesa')}><span><${Ic} n="up"/></span>Gastar</button><button onClick=${()=>setTab('goals')}><span><${Ic} n="target"/></span>Guardar</button></div></div>
  <div className="glass st wide" style=${s(4)}><div className="ph"><h3 className="hd">Atividade recente</h3><button className="lk" onClick=${()=>setTab('tx')}>Ver tudo</button></div>${sorted.slice(0,4).map(t=>h`<${Tx} key=${t.id} t=${t}/>`)}</div></div></div>`;

 const gmax=Math.max(1,...mon.ms.map(m=>Math.max(m.inc,m.exp)));
 const ana=h`<div className="grid2" style=${{gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,340px),1fr))'}}>
  <div className="glass st" style=${{...s(0),gridColumn:'1/-1'}}><div className="ph"><h3 className="hd" style=${{fontSize:20}}>Receitas e despesas por mês</h3><div className="lg"><span style=${{'--c':'var(--v)'}}>Receitas</span><span style=${{'--c':'#35D0FF'}}>Despesas</span></div></div><div className="gb">${mon.ms.map(m=>h`<div key=${m.k}><p><i style=${{height:(m.inc/gmax*100)+'%',background:'var(--v)'}}></i><i style=${{height:(m.exp/gmax*100)+'%',background:'#35D0FF'}}></i></p>${m.l}</div>`)}</div></div>
  <div className="glass st" style=${s(1)}><h3 className="hd" style=${{margin:'0 0 16px'}}>Gastos por categoria em ${mname}</h3>${cats.length?cats.map(([c,v])=>h`<div key=${c} style=${{marginBottom:14}}><div className="ph" style=${{marginBottom:6,fontSize:14}}><span style=${{display:'flex',gap:8,alignItems:'center'}}><${Ic} n=${ci({type:'despesa',cat:c})} s=${16}/>${c}</span><b><${M} v=${v}/></b></div><div className="bar"><i style=${{width:(v/cats[0][1]*100)+'%'}}></i></div></div>`):h`<div className="empty">Nenhuma despesa neste mês.</div>`}</div>
  <div className="glass st" style=${s(2)}><h3 className="hd" style=${{margin:'0 0 16px'}}>Resumo do mês</h3><div style=${{display:'flex',alignItems:'center',gap:18}}><${Ring} p=${Math.max(0,savR)} size=${96} sw=${10} gid="sv"/><div><div className="mute">Taxa de economia</div><div className="hd" style=${{fontSize:20,fontWeight:700}}>${savR}% da renda</div></div></div>
  <div className="row" style=${{marginTop:12}}><div className="bub"><${Ic} n="chart"/></div><div className="grow"><b>Média mensal de gastos</b><span className="mute">Últimos 12 meses</span></div><b className="num"><${M} v=${avg}/></b></div>
  <div className="row"><div className="bub"><${Ic} n="trend"/></div><div className="grow"><b>Maior categoria</b><span className="mute">${cats[0]?cats[0][0]:'Sem gastos'}</span></div><b className="num"><${M} v=${cats[0]?cats[0][1]:0}/></b></div></div></div>`;

 const txp=h`<div className="glass st" style=${s(0)}><div className="chips" style=${{marginBottom:10}}>${[['todas','Todas'],['receita','Receitas'],['despesa','Despesas']].map(([k,l])=>h`<button key=${k} className=${filter===k?'on':''} onClick=${()=>setFilter(k)}>${l}</button>`)}<span className="mute" style=${{marginLeft:'auto',alignSelf:'center',whiteSpace:'nowrap'}}>${list.length} resultados</span></div>${list.length?list.slice(0,80).map(t=>h`<${Tx} key=${t.id} t=${t} del=${del}/>`):h`<div className="empty">Nada encontrado. Ajuste a busca ou o filtro.</div>`}</div>`;
 const gp=h`<div className="grid2">${goals.map((g,i)=>h`<${GoalCard} key=${g.id} g=${g} idx=${i} dep=${dep} rm=${id=>setGoals(goals.filter(x=>x.id!==id))}/>`)}<${NewGoal} idx=${goals.length} add=${g=>{setGoals([...goals,g]);setToast('Meta criada')}}/></div>`;
 const TT={home:[hi+'!','Aqui está o que está acontecendo com suas finanças hoje.'],ana:['Análises','Entenda para onde vai o seu dinheiro.'],tx:['Transações','Todo o histórico de receitas e despesas.'],goals:['Metas de economia','Acompanhe cada objetivo até a conclusão.']}[tab];

 return h`<${Hide.Provider} value=${hide}><div className="shell">
  <aside className="rail"><img src="img/logoN.png" alt=""/>${NAV.map(([k,i,l])=>h`<button key=${k} className=${'ri'+(tab===k?' on':'')} aria-label=${l} title=${l} onClick=${()=>setTab(k)}><${Ic} n=${i}/></button>`)}<div className="sp"></div><button className="ri" aria-label="Alternar tema" title="Alternar tema" onClick=${()=>setTheme(theme==='dark'?'light':'dark')}><${Ic} n=${theme==='dark'?'sun':'moon'}/></button><button className="ri" aria-label="Restaurar dados de exemplo" title="Restaurar dados de exemplo" onClick=${()=>{setTxs(seed());setGoals(SG);setToast('Dados de exemplo restaurados')}}><${Ic} n="reset"/></button></aside>
  <main><header className="hdr"><div className="wm"><img src="img/logo.png" alt=""/><div><b className="hd">Ne<i>X</i>ora</b><small>FINANCE</small></div></div>
   <nav className="tabs" aria-label="Seções">${NAV.map(([k,,l])=>h`<button key=${k} className=${tab===k?'on':''} onClick=${()=>setTab(k)}>${l}</button>`)}</nav>
   <div className="hr"><button className="cb th" aria-label="Alternar tema" onClick=${()=>setTheme(theme==='dark'?'light':'dark')}><${Ic} n=${theme==='dark'?'sun':'moon'} s=${19}/></button><button className="cb" aria-label=${hide?'Mostrar valores':'Ocultar valores'} onClick=${()=>setHide(!hide)}><${Ic} n=${hide?'eyeoff':'eye'} s=${19}/></button><button className="cb" aria-label="Notificações"><${Ic} n="bell" s=${19}/><span className="pd"></span></button><div className="avt" aria-hidden="true">NF</div></div></header>
   <div className="gr"><div><h1 className="hd">${TT[0]}</h1><p>${TT[1]}</p></div><label className="srch"><${Ic} n="search" s=${18}/><input placeholder="Buscar transações" aria-label="Buscar transações" value=${q} onChange=${e=>{setQ(e.target.value);setTab('tx')}}/></label></div>
   <div key=${tab}>${{home,ana,tx:txp,goals:gp}[tab]}</div></main>
  <nav className="bnav" aria-label="Navegação">${NAV.map(([k,i,l])=>h`<button key=${k} className=${tab===k?'on':''} onClick=${()=>setTab(k)}><${Ic} n=${i} s=${22}/>${l}</button>`)}</nav>
  <button className="fab" aria-label="Nova transação" onClick=${()=>setOpen('despesa')}><${Ic} n="plus" s=${26}/></button>
  ${open&&h`<${Form} kind=${open} onSave=${add} onClose=${()=>setOpen(null)}/>`}
  ${toast&&h`<div className="toast" role="status"><${Ic} n="check" s=${18}/>${toast}</div>`}</div><//>`}
ReactDOM.createRoot(document.getElementById('root')).render(h`<${App}/>`);