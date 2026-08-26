/* ---------------- Speech ----------------
   Speech Synthesis has a few well-known real-device failure modes this guards
   against: the voice list loads asynchronously (a speak() call before it's
   ready can go silent on some browsers), Chrome can leave the engine "paused"
   after idle periods, calling cancel()+speak() in the same tick can drop the
   new utterance, and iOS/Safari requires the very first speak() to happen
   inside a direct user gesture (a silent "unlock" utterance on first tap
   handles that so later delayed calls, like Magic E's, still work). */
const SPEECH_OK='speechSynthesis' in window;
let cachedVoice=null,speechFailStreak=0,speechWarned=false;
let speechRate=0.82,speechVoiceURI='';
function englishVoices(){return SPEECH_OK?speechSynthesis.getVoices().filter(v=>v.lang&&v.lang.startsWith('en')):[];}
function pickVoice(){
  if(!SPEECH_OK)return null;
  const pool=englishVoices().length?englishVoices():speechSynthesis.getVoices();
  if(!pool.length)return null;
  if(speechVoiceURI){const match=pool.find(v=>v.voiceURI===speechVoiceURI);if(match)return match;}
  return pool[0];
}
function renderVoiceOptions(){
  const sel=$('voiceSelect');if(!sel)return;
  const voices=englishVoices();
  if(!voices.length){sel.innerHTML='<option value="">Default voice</option>';return;}
  sel.innerHTML=voices.map(v=>`<option value="${v.voiceURI}">${v.name}${v.lang?' ('+v.lang+')':''}</option>`).join('');
  if(speechVoiceURI&&voices.some(v=>v.voiceURI===speechVoiceURI))sel.value=speechVoiceURI;
}
function updateVoice(){speechVoiceURI=$('voiceSelect').value;cachedVoice=pickVoice();persist();}
function updateRate(){speechRate=parseFloat($('rateSelect').value)||0.82;persist();}
if(SPEECH_OK){
  cachedVoice=pickVoice();
  speechSynthesis.onvoiceschanged=()=>{cachedVoice=pickVoice();renderVoiceOptions();};
  const unlock=()=>{try{const u=new SpeechSynthesisUtterance('');u.volume=0;speechSynthesis.speak(u);}catch(e){}
    document.removeEventListener('click',unlock);document.removeEventListener('touchstart',unlock);};
  document.addEventListener('click',unlock,{once:true});
  document.addEventListener('touchstart',unlock,{once:true});
}
function speak(t){
  if(!SPEECH_OK){showSpeechWarning();return;}
  try{
    if(speechSynthesis.paused)speechSynthesis.resume();
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(t);
    u.rate=speechRate;u.pitch=1.05;u.lang='en-US';
    if(!cachedVoice)cachedVoice=pickVoice();
    if(cachedVoice)u.voice=cachedVoice;
    u.onstart=()=>{speechFailStreak=0;};
    u.onerror=(e)=>{
      // A new speak() call cancels whatever utterance was already playing — that
      // fires 'canceled'/'interrupted' on the OLD utterance as completely normal
      // behavior, not a real failure. Only count genuine errors toward the streak.
      if(e&&(e.error==='canceled'||e.error==='interrupted'))return;
      speechFailStreak++;if(speechFailStreak>=3)showSpeechWarning();
    };
    setTimeout(()=>{try{speechSynthesis.speak(u);}catch(e){speechFailStreak++;if(speechFailStreak>=3)showSpeechWarning();}},0);
  }catch(e){speechFailStreak++;if(speechFailStreak>=3)showSpeechWarning();}
}
function showSpeechWarning(){
  if(speechWarned)return;speechWarned=true;
  const el=$('speechWarning');if(el)el.classList.add('show');
}
const SPKR='<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4zM14 3.2v2.1a7 7 0 010 13.4v2.1a9 9 0 000-17.6z"/></svg>';
const rand=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(v=>v[1]);
const $=id=>document.getElementById(id);

/* ---------------- Pip mascot ---------------- */
function pipSVG(size){
  return `<svg class="mascot" style="width:${size}px;height:${size}px" viewBox="0 0 100 100" aria-hidden="true">
    <ellipse cx="50" cy="62" rx="34" ry="30" fill="#38d6b6"/><ellipse cx="50" cy="70" rx="22" ry="16" fill="#eafff9"/>
    <circle cx="33" cy="34" r="15" fill="#38d6b6"/><circle cx="67" cy="34" r="15" fill="#38d6b6"/>
    <circle cx="33" cy="33" r="8" fill="#fff"/><circle cx="67" cy="33" r="8" fill="#fff"/>
    <circle cx="35" cy="35" r="4" fill="#17233d"/><circle cx="65" cy="35" r="4" fill="#17233d"/>
    <path d="M38 66 Q50 78 62 66" stroke="#17233d" stroke-width="4" fill="none" stroke-linecap="round"/>
    <circle cx="30" cy="60" r="5" fill="#ff9db0" opacity="0.7"/><circle cx="70" cy="60" r="5" fill="#ff9db0" opacity="0.7"/>
  </svg>`;
}

/* ---------------- Save / load ---------------- */
const SAVE_KEY='wordpond_v1';
let stars=0; const enabled={}; GAMES.forEach(g=>enabled[g.id]=g.on);
let masteredWords=new Set();
let childName='Mckenna';
let storageOK=true;
function persist(){try{localStorage.setItem(SAVE_KEY,JSON.stringify({stars,enabled,mastered:[...masteredWords],name:childName,rate:speechRate,voiceURI:speechVoiceURI}));}catch(e){storageOK=false;}}
function loadSave(){try{const s=JSON.parse(localStorage.getItem(SAVE_KEY));if(s){if(typeof s.stars==='number')stars=s.stars;
  if(s.enabled)GAMES.forEach(g=>{if(g.id in s.enabled)enabled[g.id]=s.enabled[g.id];});
  if(Array.isArray(s.mastered))masteredWords=new Set(s.mastered);
  if(typeof s.name==='string'&&s.name.trim())childName=s.name.trim();
  if(typeof s.rate==='number')speechRate=s.rate;
  if(typeof s.voiceURI==='string')speechVoiceURI=s.voiceURI;}}catch(e){storageOK=false;}}
function resetProgress(){stars=0;GAMES.forEach(g=>enabled[g.id]=g.on);masteredWords=new Set();persist();$('starCount').textContent=0;renderMenu();renderSkillList();}
function updateName(){const v=$('nameInput').value.trim();childName=v||'Reader';persist();renderGreeting();}

function addStar(n=1){stars+=n;$('starCount').textContent=stars;persist();
  document.querySelectorAll('.mascot').forEach(m=>{m.classList.remove('happy');void m.offsetWidth;m.classList.add('happy');});}

/* ---------------- Menu render ---------------- */
function renderGreeting(){
  $('menuIntro').innerHTML=`Hi ${childName}! I'm Pip the pond frog! 🐸 Pick a game, tap the blue speaker to hear a word, and grab a star for every one you get right. Ready? Let's hop to it!`;
}
function lessonCard(l){return `<button class="game-card ${l.cls}" onclick="Game.launch('L','${l.id}')">
  <div class="emoji">${l.emoji}</div><div class="tag">Lesson ${l.n}</div>
  <div class="title">${l.title}</div></button>`;}
function gameCard(g){
  if(enabled[g.id]) return `<button class="game-card ${g.cls}" onclick="Game.launch('G','${g.id}')">
    <div class="emoji">${g.emoji}</div><div class="title">${g.name}</div><div class="sub">${g.sub}</div></button>`;
  return `<div class="game-card locked ${g.cls}"><div class="lock-badge">🔒</div>
    <div class="emoji">${g.emoji}</div><div class="title">${g.name}</div><div class="sub">Unlocks later</div></div>`;
}
function renderMenu(){
  $('lessonGrid').innerHTML = LESSONS.length ? LESSONS.map(lessonCard).join('')
    : `<div class="empty-hint">Lessons you're working on will appear here.</div>`;
  $('menuGrid').innerHTML = GAMES.map(gameCard).join('');
}
function renderSkillList(){
  $('skillList').innerHTML = GAMES.map(g=>`<div class="skillrow">
    <div class="info"><b>${g.emoji} ${g.name}</b><span>${g.hint}</span></div>
    <label class="switch"><input type="checkbox" ${enabled[g.id]?'checked':''}
      onchange="enabled['${g.id}']=this.checked;persist();renderMenu();"><span class="slider"></span></label></div>`).join('')
    + (storageOK?'':'<p class="note" style="margin-top:14px;color:#b06">Note: this browser is blocking saved progress (common when a file is opened directly from a folder). Stars will still work during a session but won’t be remembered after closing.</p>');
}
function togglePanel(show){$('overlay').classList.toggle('active',show);
  if(show){$('nameInput').value=childName;renderVoiceOptions();$('rateSelect').value=String(speechRate);renderSkillList();}}

function renderIntro(deck){
  const intro=deck.intro;
  const wordChips=w=>`<button class="speak-btn" style="width:34px;height:34px;box-shadow:0 3px 0 #2f7ed8;margin:4px 6px 4px 0" onclick="speak('${w}')" aria-label="hear ${w}">${SPKR}</button>`;
  const words=(intro.words||[]).map(w=>`<span class="intro-word">${w}${wordChips(w)}</span>`).join('');
  const review=(intro.review||[]).length?`<p class="intro-review"><b>Words to review:</b> ${intro.review.join(', ')}</p>`:'';
  const trick=intro.trick?`<div class="trick-box"><div class="trick-title">🐸 ${intro.trick.title}</div>
    ${intro.trick.points.map(p=>`<div class="trick-point"><b>${p.w}</b> — ${p.note}</div>`).join('')}</div>`:'';
  $('introArea').innerHTML=`<div class="card">
    <div class="intro-head"><div class="lesson-badge">Lesson ${deck.n}</div>${pipSVG(44)}</div>
    <h2 class="intro-topic">${intro.topic}</h2>
    ${intro.lines.map(l=>`<p class="intro-line">${l}</p>`).join('')}
    <div class="intro-words">${words}</div>
    ${review}
    ${trick}
    <button class="next-btn" onclick="Game.begin()">Start Practice ▶</button>
  </div>`;
}

/* ---------------- Session ordering ----------------
   Builds a shuffled, no-repeat draw queue for a stage/engine+pool so a single
   sitting never asks the same question twice. Only the "target" item is drawn
   without replacement; multiple-choice distractors may still recur across
   different rounds (that's normal), but never duplicate within one round's
   options (see the per-engine dedup loops below). */
function resolveOrder(engine,pool,count){
  let items;
  if(engine==='phonogram'){
    const all=pool.all||pool;const focus=pool.focus||Object.keys(all);
    items=[];focus.forEach(phon=>all[phon].forEach(word=>items.push({phon,word})));
  }else if(engine==='ed'){
    items=[];Object.keys(pool).forEach(sound=>pool[sound].forEach(word=>items.push({sound,word})));
  }else if(engine==='wordchange'){
    items=(Array.isArray(pool)?pool:pool.pairs).slice();
  }else{
    items=pool.slice();
  }
  return shuffle(items).slice(0,Math.min(count,items.length));
}
/* Picks up to `n` unique-by-key distractors from `pool`, excluding `excludeKey`. */
function pickUnique(pool,keyFn,excludeKey,n){
  const seen=new Set([excludeKey]);const out=[];
  for(const item of shuffle(pool)){
    const k=keyFn(item);
    if(!seen.has(k)){seen.add(k);out.push(item);if(out.length>=n)break;}
  }
  return out;
}

/* ---------------- Engines ---------------- */
const ENGINES={
  review(target,pool){
    const distract=pickUnique(pool.filter(w=>w!==target),w=>w,target,2);
    const opts=shuffle([target,...distract]);
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">Tap the speaker, then find the word you heard.</div>
      <button class="speak-btn" style="width:74px;height:74px;box-shadow:0 7px 0 #2f7ed8" onclick="speak('${target}')" aria-label="hear word">${SPKR}</button></div>
      <div class="options three">${opts.map(w=>`<button class="opt" onclick="Game.pickWord(this,'${w}','${target}')">${w}</button>`).join('')}</div>
      <div class="feedback" id="fb"></div></div>`;speak(target);},

  phonogram(item,pool){const all=pool.all||pool;const {phon,word:correctWord}=item;
    const otherKeys=shuffle(Object.keys(all).filter(p=>p!==phon));
    const seen=new Set([correctWord]);const others=[];
    for(const k of otherKeys){const w=rand(all[k]);if(!seen.has(w)){seen.add(w);others.push(w);if(others.length>=3)break;}}
    const opts=shuffle([correctWord,...others]);
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">Which word has this sound?</div>
      <div class="big-target"><span class="phon-chip">${phon}</span>
        <button class="speak-btn" onclick="speak('${phon}')" aria-label="hear sound">${SPKR}</button></div></div>
      <div class="options">${opts.map(w=>`<button class="opt" onclick="Game.pickWord(this,'${w}','${correctWord}','${phon} sound')">${w}
        <button class="speak-btn" style="width:34px;height:34px;box-shadow:0 3px 0 #2f7ed8;margin-top:8px" onclick="event.stopPropagation();speak('${w}')" aria-label="hear ${w}">${SPKR}</button></button>`).join('')}</div>
      <div class="feedback" id="fb"></div></div>`;speak(phon);},

  ed(item){const {sound,word}=item;
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">Listen — which -ed sound do you hear?</div>
      <div class="big-target word-target">${word.slice(0,-2)}<span class="hl">ed</span>
        <button class="speak-btn" onclick="speak('${word}')" aria-label="hear ${word}">${SPKR}</button></div></div>
      <div class="bucket-row">
        <div class="bucket" onclick="Game.pickBucket(this,'/t/','${sound}')"><div class="snd">/t/</div><div class="ex">like <b>jumped</b></div></div>
        <div class="bucket" onclick="Game.pickBucket(this,'/d/','${sound}')"><div class="snd">/d/</div><div class="ex">like <b>snowed</b></div></div>
        <div class="bucket" onclick="Game.pickBucket(this,'/id/','${sound}')"><div class="snd">/id/</div><div class="ex">like <b>wanted</b></div></div>
      </div><div class="feedback" id="fb"></div></div>`;speak(word);},

  magic(p){const s=p.short,vowel=s[p.v];
    const before=s.slice(0,p.v),after=s.slice(p.v+1);
    $('gameArea').innerHTML=`<div class="card magic-stage">
      <div class="instruction" style="color:#5a6b82;font-family:Lexend;margin-bottom:6px">Add the magic <b>e</b> and watch the vowel change its sound!</div>
      <div class="magic-word" id="mword">${before}<span class="vowel">${vowel}</span>${after}<span class="adde">e</span></div>
      <div class="magic-meaning" id="mmean"></div>
      <div class="magic-controls">
        <button class="speak-btn" onclick="speak('${s}')" style="box-shadow:0 6px 0 #2f7ed8">${SPKR}</button>
        <button class="btn-grape" id="addBtn" onclick="Game.doMagic('${s}','${p.long}',\`${p.mean}\`)">✨ Add Magic E</button>
      </div><div class="feedback" id="fb"></div></div>`;speak(s);},

  contraction(c,pool){
    const distract=pickUnique(pool.filter(x=>x.one!==c.one),x=>x.one,c.one,2);
    const opts=shuffle([c,...distract]);
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">Squish these two words into one!</div>
      <div class="big-target">${c.two}<button class="speak-btn" onclick="speak('${c.two}')" aria-label="hear">${SPKR}</button></div></div>
      <div class="options three">${opts.map(o=>`<button class="opt" onclick="Game.pickWord(this,'${o.one.replace(/'/g,"\\'")}','${c.one.replace(/'/g,"\\'")}')">${o.one}</button>`).join('')}</div>
      <div class="feedback" id="fb"></div></div>`;speak(c.two);},

  syllabletype(item){
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">Open or closed? Say the word and listen to the vowel.</div>
      <div class="big-target word-target">${item.w}<button class="speak-btn" onclick="speak('${item.w}')" aria-label="hear ${item.w}">${SPKR}</button></div></div>
      <div class="options">
        <button class="opt" onclick="Game.pickType(this,'open','${item.t}','${item.w}')">Open<small>ends in a vowel · long sound</small></button>
        <button class="opt" onclick="Game.pickType(this,'closed','${item.t}','${item.w}')">Closed<small>ends in a consonant · short sound</small></button>
      </div><div class="feedback" id="fb"></div></div>`;speak(item.w);},

  wordchange(pair,poolMeta){const arr=Array.isArray(poolMeta)?poolMeta:poolMeta.pairs;
    const instruction=Array.isArray(poolMeta)?'Change the word! Add a blend to make a new word.':(poolMeta.instruction||'Change the word!');
    const distract=pickUnique(arr.filter(p=>p.to!==pair.to),p=>p.to,pair.to,2).map(p=>p.to);
    const opts=shuffle([pair.to,...distract]);
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">${instruction}</div>
      <div class="big-target word-target">${pair.from}
        <button class="speak-btn" onclick="speak('${pair.from}')" aria-label="hear ${pair.from}">${SPKR}</button></div></div>
      <div class="options three">${opts.map(w=>`<button class="opt" onclick="Game.pickWord(this,'${w}','${pair.to}')">${w}</button>`).join('')}</div>
      <div class="feedback" id="fb"></div></div>`;speak(pair.from);},

  syllablesplit(item){const w=item.w;const correct=item.parts.join('-');
    const splitIdx=item.parts[0].length;const candidates=[];
    for(let i=2;i<=w.length-2;i++){const opt=w.slice(0,i)+'-'+w.slice(i);if(i!==splitIdx&&!candidates.includes(opt))candidates.push(opt);}
    const opts=shuffle([correct,...shuffle(candidates).slice(0,2)]);
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">Where does this word split into syllables?</div>
      <div class="big-target word-target">${w}
        <button class="speak-btn" onclick="speak('${w}')" aria-label="hear ${w}">${SPKR}</button></div></div>
      <div class="options three">${opts.map(o=>`<button class="opt" onclick="Game.pickWord(this,'${o}','${correct}')">${o}</button>`).join('')}</div>
      <div class="feedback" id="fb"></div></div>`;speak(w);},

  sightword(w){
    $('gameArea').innerHTML=`<div class="card" style="text-align:center">
      <div class="instruction" style="font-family:Lexend;font-weight:500;color:#5a6b82;font-size:16px;margin-bottom:16px">Read the word out loud! Stuck? Tap the speaker.</div>
      <div class="big-target word-target">${w}
        <button class="speak-btn" onclick="speak('${w}')" aria-label="hear ${w}">${SPKR}</button></div>
      <div class="sight-controls">
        <button class="btn-mint" onclick="Game.sightAnswer(true,'${w}')">✓ I read it!</button>
        <button class="btn-soft" onclick="Game.sightAnswer(false,'${w}')">🔁 Still tricky</button>
      </div>
      <div class="feedback" id="fb"></div></div>`;},

  syllable(s){
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">Say it and clap. How many syllables?</div>
      <div class="big-target word-target">${s.w}<button class="speak-btn" onclick="speak('${s.w}')" aria-label="hear ${s.w}">${SPKR}</button></div></div>
      <div class="options three">${[1,2,3].map(n=>`<button class="opt" onclick="Game.pickNumber(this,${n},${s.n})">${n}<small>${'👏'.repeat(n)}</small></button>`).join('')}</div>
      <div class="feedback" id="fb"></div></div>`;speak(s.w);}
};

/* ---------------- Game controller ---------------- */
const Game={
  deck:null,round:0,total:25,correct:0,locked:false,order:null,stageOrders:null,sightUsed:null,
  home(){speechSynthesis&&speechSynthesis.cancel();$('home').classList.add('active');
    $('game').classList.remove('active');$('lessonIntro').classList.remove('active');},
  buildOrders(){
    this.sightUsed=new Set();
    if(this.deck.id==='sight')return;
    if(this.deck.stages){this.stageOrders=this.deck.stages.map(s=>resolveOrder(s.engine,s.pool,s.rounds));this.order=null;}
    else{this.order=resolveOrder(this.deck.engine,this.deck.pool,this.total);this.stageOrders=null;}
  },
  launch(kind,id){
    this.deck = kind==='L' ? LESSONS.find(l=>l.id===id) : GAMES.find(g=>g.id===id);
    this.total = this.deck.stages ? this.deck.stages.reduce((a,s)=>a+s.rounds,0) : 25;
    this.round=0;this.correct=0;
    this.buildOrders();
    if(this.deck.intro){$('home').classList.remove('active');$('lessonIntro').classList.add('active');renderIntro(this.deck);return;}
    $('home').classList.remove('active');$('game').classList.add('active');this.next();
  },
  begin(){$('lessonIntro').classList.remove('active');$('game').classList.add('active');this.next();},
  currentStageInfo(){
    if(!this.deck.stages)return{stage:{engine:this.deck.engine,pool:this.deck.pool,label:null},item:this.order[this.round-1]};
    let acc=0;
    for(let i=0;i<this.deck.stages.length;i++){
      const s=this.deck.stages[i];
      if(this.round<=acc+s.rounds)return{stage:s,item:this.stageOrders[i][this.round-acc-1]};
      acc+=s.rounds;
    }
    const last=this.deck.stages.length-1;
    return{stage:this.deck.stages[last],item:this.stageOrders[last][this.stageOrders[last].length-1]};
  },
  next(){this.locked=false;this.round++;
    if(this.round>this.total){this.finish();return;}
    if(this.deck.id==='sight'){
      const unmastered=SIGHTWORDS.filter(w=>!masteredWords.has(w));
      if(unmastered.length===0){this.showAchievement();return;}
      let avail=unmastered.filter(w=>!this.sightUsed.has(w));
      if(avail.length===0){this.sightUsed.clear();avail=unmastered;}
      const w=rand(avail);this.sightUsed.add(w);
      $('progress').textContent=unmastered.length+' / '+SIGHTWORDS.length+' left to master';
      ENGINES.sightword(w);
      return;
    }
    const {stage,item}=this.currentStageInfo();
    $('progress').textContent=this.round+' / '+this.total+(stage.label?' · '+stage.label:'');
    ENGINES[stage.engine].call(ENGINES,item,stage.pool);},
  win(){this.correct++;addStar();},
  good(msg){$('fb').textContent=msg;$('fb').className='feedback good';},
  bad(msg){$('fb').textContent=msg;$('fb').className='feedback try';},

  pickWord(btn,word,correct,label){
    if(this.locked)return;this.locked=true;
    if(word===correct){btn.classList.add('correct');this.win();this.good('✓ Yes! '+correct);speak(correct);}
    else{btn.classList.add('wrong');
      document.querySelectorAll('.opt').forEach(o=>{if(o.childNodes[0].textContent.trim()===correct)o.classList.add('correct');});
      this.bad(label?('That’s not the '+label):('This one says '+correct));speak(correct);}
    this.showNext();
  },
  pickBucket(el,picked,correct){
    if(this.locked)return;this.locked=true;
    if(picked===correct){el.classList.add('correct');this.win();this.good('✓ That’s right!');}
    else{el.classList.add('wrong');
      document.querySelectorAll('.bucket').forEach(b=>{if(b.querySelector('.snd').textContent===correct)b.classList.add('correct');});
      this.bad('It’s the '+correct+' sound');}
    this.showNext();
  },
  pickNumber(btn,picked,correct){
    if(this.locked)return;this.locked=true;
    if(picked===correct){btn.classList.add('correct');this.win();this.good('✓ '+correct+' claps!');}
    else{btn.classList.add('wrong');
      document.querySelectorAll('.opt').forEach(o=>{if(parseInt(o.childNodes[0].textContent)===correct)o.classList.add('correct');});
      this.bad('It has '+correct+' syllables');}
    this.showNext();
  },
  pickType(btn,picked,correct,word){
    if(this.locked)return;this.locked=true;
    if(picked===correct){btn.classList.add('correct');this.win();
      this.good(correct==='open'?('✓ Open! '+word+' ends in a vowel — long sound.'):('✓ Closed! '+word+' ends in a consonant — short sound.'));}
    else{btn.classList.add('wrong');
      document.querySelectorAll('.opt').forEach(o=>{if(o.childNodes[0].textContent.trim().toLowerCase()===correct)o.classList.add('correct');});
      this.bad(correct==='open'?(word+' is open — it ends in a vowel'):(word+' is closed — it ends in a consonant'));}
    this.showNext();
  },
  sightAnswer(knewIt,word){
    if(this.locked)return;this.locked=true;
    if(knewIt){
      if(word&&!masteredWords.has(word)){masteredWords.add(word);persist();}
      this.win();this.good('⭐ Way to read it!');
    }else{this.bad('Nice try — that one will come back around.');}
    this.showNext();
  },
  showAchievement(){
    $('progress').textContent='';
    $('gameArea').innerHTML=`<div class="card done-card achievement-card">
      <div class="done-mascot">${pipSVG(70)}</div>
      <div class="achievement-badge">🏆</div>
      <h2>Congratulations, ${childName}!</h2>
      <p>You've mastered all ${SIGHTWORDS.length} sight words! Pip is so proud of you. 🐸✨</p>
      <button class="back" style="margin-top:6px" onclick="Game.home()">Back to menu</button>
    </div>`;
  },
  doMagic(shortW,longW,mean){
    if(this.locked)return;this.locked=true;
    const w=$('mword');w.classList.add('show-e');w.querySelector('.vowel').style.color='#9b6cf0';
    $('mmean').textContent=mean;$('addBtn').disabled=true;setTimeout(()=>speak(longW),350);
    this.good(shortW+' → '+longW+' ✨');this.win();this.showNext();
  },
  finish(){
    const pct=Math.round(this.correct/this.total*100);
    const msg=pct===100?'Perfect, '+childName+'! You’re a Word Pond champion! 🏆':pct>=70?'Great job, '+childName+'! Keep leaping! 🐸':'Nice try, '+childName+'! Practice makes it easier! 💪';
    const P='M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z';
    let row='';
    for(let i=1;i<=this.total;i++){
      row += i<=this.correct
        ? `<svg class="rs earned" style="animation-delay:${(i-1)*90}ms" viewBox="0 0 24 24" fill="#ffc93c"><path d="${P}"/></svg>`
        : `<svg class="rs" viewBox="0 0 24 24" fill="none" stroke="#d9cfae" stroke-width="1.7"><path d="${P}"/></svg>`;
    }
    $('gameArea').innerHTML=`<div class="card done-card">
      <div class="done-mascot">${pipSVG(56)}</div>
      <h2>All done, ${childName}!</h2>
      <div class="star-row">${row}</div>
      <div class="score-caption">${this.correct} out of ${this.total} stars</div>
      <p>${msg}</p>
      <button class="next-btn" onclick="Game.replay()">Play again</button>
      <button class="back" style="margin-top:12px" onclick="Game.home()">Back to menu</button></div>`;
    if(pct===100)addStar(2);
  },
  replay(){this.round=0;this.correct=0;this.buildOrders();this.next();},
  showNext(){const label=this.round>=this.total?'See my stars →':'Next →';
    $('gameArea').querySelector('.card').insertAdjacentHTML('beforeend',`<button class="next-btn" onclick="Game.next()">${label}</button>`);}
};

loadSave();
$('starCount').textContent=stars;
renderGreeting();
renderMenu();
$('pipIntroTopbar').innerHTML=pipSVG(36);
$('pipGameTopbar').innerHTML=pipSVG(36);
$('pipPanel').innerHTML=pipSVG(30);
