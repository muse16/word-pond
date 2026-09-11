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
/* Escapes a word for an inline onclick's single-quoted JS string. Contractions
   (Lesson 27) carry apostrophes that would otherwise close the string and break
   the handler outright -- the button silently does nothing when clicked. */
const jsq=s=>String(s).replace(/'/g,"\\'");
/* Same idea for an argument passed between backticks: a stray backtick or a
   ${ would end the template early and kill the button. */
const jsb=s=>String(s).replace(/[\`$]/g,'\\$&');
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
let masteredLeap=new Set();
let childName='Mckenna';
let storageOK=true;
let examResults={};
function persist(){try{localStorage.setItem(SAVE_KEY,JSON.stringify({stars,enabled,mastered:[...masteredWords],leap:[...masteredLeap],name:childName,rate:speechRate,voiceURI:speechVoiceURI,exams:examResults}));}catch(e){storageOK=false;}}
/* Exam attempts are kept so a retake can be read against the first try. Five per
   exam is plenty for a school year and keeps the save small. */
function examHistory(id){return (examResults&&examResults[id])||[];}
function saveExamResult(id,result){
  if(!examResults)examResults={};
  const list=examHistory(id).concat([result]);
  examResults[id]=list.slice(-5);
  persist();
}
function loadSave(){try{const s=JSON.parse(localStorage.getItem(SAVE_KEY));if(s){if(typeof s.stars==='number')stars=s.stars;
  if(s.enabled)GAMES.forEach(g=>{if(g.id in s.enabled)enabled[g.id]=s.enabled[g.id];});
  if(Array.isArray(s.mastered))masteredWords=new Set(s.mastered);
  if(Array.isArray(s.leap))masteredLeap=new Set(s.leap);
  if(typeof s.name==='string'&&s.name.trim())childName=s.name.trim();
  if(typeof s.rate==='number')speechRate=s.rate;
  if(typeof s.voiceURI==='string')speechVoiceURI=s.voiceURI;
  if(s.exams&&typeof s.exams==='object')examResults=s.exams;}}catch(e){storageOK=false;}}
function resetProgress(){stars=0;GAMES.forEach(g=>enabled[g.id]=g.on);masteredWords=new Set();masteredLeap=new Set();persist();$('starCount').textContent=0;renderMenu();renderSkillList();}
function updateName(){const v=$('nameInput').value.trim();childName=v||'Reader';persist();renderGreeting();}

function addStar(n=1){stars+=n;$('starCount').textContent=stars;persist();
  document.querySelectorAll('.mascot').forEach(m=>{m.classList.remove('happy');void m.offsetWidth;m.classList.add('happy');});}

/* ---------------- Menu render ---------------- */
function renderGreeting(){
  $('menuIntro').innerHTML=`Hi ${childName}! I'm Pip the pond frog! 🐸 Pick a game, tap the blue speaker to hear a word, and grab a star for every one you get right. Ready? Let's hop to it!`;
}
function lessonCard(l){return `<button class="game-card ${l.cls}" onclick="Game.launch('L','${jsq(l.id)}')">
  <div class="emoji">${l.emoji}</div><div class="tag">Lesson ${l.n}</div>
  <div class="title">${l.title}</div></button>`;}
function gameCard(g){
  if(enabled[g.id]) return `<button class="game-card ${g.cls}" onclick="Game.launch('G','${jsq(g.id)}')">
    <div class="emoji">${g.emoji}</div><div class="title">${g.name}</div><div class="sub">${g.sub}</div></button>`;
  return `<div class="game-card locked ${g.cls}"><div class="lock-badge">🔒</div>
    <div class="emoji">${g.emoji}</div><div class="title">${g.name}</div><div class="sub">Unlocks later</div></div>`;
}
/* The two check-ups sit in their own row under the practice areas, and are never
   locked: they are meant to be taken whenever, and retaken. */
function examCard(e){
  const past=examHistory(e.id), last=past[past.length-1];
  const note=last?`Last time: ${last.correct} / ${last.total}`:e.sub;
  return `<button class="game-card exam-card ${e.cls}" onclick="Game.launch('E','${jsq(e.id)}')">
    <div class="emoji">${e.emoji}</div><div class="tag">${e.n}</div>
    <div class="title">${e.title}</div><div class="sub">${note}</div></button>`;
}
function renderMenu(){
  $('lessonGrid').innerHTML = LESSONS.length ? LESSONS.map(lessonCard).join('')
    : `<div class="empty-hint">Lessons you're working on will appear here.</div>`;
  $('menuGrid').innerHTML = GAMES.map(gameCard).join('');
  if($('examGrid'))$('examGrid').innerHTML = EXAMS.map(examCard).join('');
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
  const wordChips=w=>`<button class="speak-btn" style="width:34px;height:34px;box-shadow:0 3px 0 #2f7ed8;margin:4px 6px 4px 0" onclick="speak('${jsq(w)}')" aria-label="hear ${w}">${SPKR}</button>`;
  const words=(intro.words||[]).map(w=>`<span class="intro-word">${w}${wordChips(w)}</span>`).join('');
  const review=(intro.review||[]).length?`<p class="intro-review"><b>Words to review:</b> ${intro.review.join(', ')}</p>`:'';
  const trick=intro.trick?`<div class="trick-box"><div class="trick-title">🐸 ${intro.trick.title}</div>
    ${intro.trick.points.map(p=>`<div class="trick-point"><b>${p.w}</b> — ${p.note}</div>`).join('')}</div>`:'';
  $('introArea').innerHTML=`<div class="card">
    <div class="intro-head"><div class="lesson-badge">${typeof deck.n==='number'?'Lesson '+deck.n:deck.n}</div>${pipSVG(44)}</div>
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
function poolItems(engine,pool){
  if(engine==='phonogram'){
    const all=pool.all||pool;const focus=pool.focus||Object.keys(all);
    const items=[];focus.forEach(phon=>all[phon].forEach(word=>items.push({phon,word})));return items;
  }
  if(engine==='ed'){
    const items=[];Object.keys(pool).forEach(sound=>pool[sound].forEach(word=>items.push({sound,word})));return items;
  }
  if(engine==='sortsound')return pool.items.slice();
  if(engine==='buildword')return pool.items.slice();
  if(engine==='wordchange')return (Array.isArray(pool)?pool:pool.pairs).slice();
  return pool.slice();
}
function resolveOrder(engine,pool,count){
  const items=poolItems(engine,pool);
  return shuffle(items).slice(0,Math.min(count,items.length));
}
/* The word or words a round is ABOUT, so two stages can be kept off the same one.
   Change the Word is keyed on its answer, not on the word shown, because that is
   what she ends up reading. */
function promptWords(engine,item){
  if(item==null)return [];
  const w=[];
  const add=x=>{if(x)w.push(String(x).toLowerCase());};
  if(typeof item==='string'){add(item);return w;}
  switch(engine){
    case 'wordchange': add(item.to); break;
    case 'magic': add(item.short); add(item.long); break;
    case 'contraction': case 'expand': add(item.one); break;
    case 'phonogram': add(item.word); break;
    // all four, not just the odd one: two sets that share words are two goes at
    // the same question, and the dealer can only avoid what it can see
    case 'oddoneout': (item.words||[]).forEach(add); break;
    case 'sentence': add(item.answer); break;
    // both sides of a minimal pair are shown as buttons, and a heteronym item
    // keys its word differently, so neither was being claimed by the dealer
    case 'minimalpair': add(item.w); add(item.other); break;
    case 'heteronym': add(item.word); break;
    case 'ed': add(item.word); break;
    default: add(item.w); break;
  }
  return w;
}
/* One sitting should not ask about the same word twice. Draws inside a stage were
   already without replacement, but nothing kept two stages off the same word:
   Lesson 12 could split pocket and then ask her to blend pock...et, and a pool
   that lists one answer under two different changes could serve both.
   Dealing the stages is a small allocation problem, and which stage goes first
   decides how well it comes out. Neither order wins everywhere -- forced-first
   clears Lesson 14, tightest-first clears Lesson 12 -- so both are tried a few
   times and the arrangement with the fewest repeats is the one played.
   Some lessons cannot reach zero: Lesson 4 practises sixteen y-words over
   twenty-five rounds, so nine of them have to come round twice. Those stages
   reuse rather than running short. */
function dealStages(stages,forcedFirst){
  const used=new Set(), out=stages.map(()=>null);
  const meta=stages.map((s,i)=>{
    const items=poolItems(s.engine,s.pool), words=new Set();
    items.forEach(x=>promptWords(s.engine,x).forEach(w=>words.add(w)));
    return {i,s,items,slack:words.size-s.rounds};
  });
  // forced-first puts the stages with no choice at all in front; tightest-first
  // ranks every stage by how many spare words it has.
  const order=forcedFirst
    ? meta.slice().sort((a,b)=>(a.items.length<=a.s.rounds?0:1)-(b.items.length<=b.s.rounds?0:1))
    : meta.slice().sort((a,b)=>a.slack-b.slack);
  order.forEach(({i,s,items})=>{
    const deck=shuffle(items), chosen=[];
    for(const it of deck){
      if(chosen.length>=s.rounds)break;
      if(promptWords(s.engine,it).some(w=>used.has(w)))continue;
      chosen.push(it);promptWords(s.engine,it).forEach(w=>used.add(w));
    }
    for(const it of deck){
      if(chosen.length>=s.rounds)break;
      if(chosen.indexOf(it)===-1)chosen.push(it);
    }
    out[i]=chosen;
  });
  return out;
}
function countRepeats(stages,orders){
  const seen={};let n=0;
  orders.forEach((list,i)=>list.forEach(it=>promptWords(stages[i].engine,it).forEach(w=>{
    seen[w]=(seen[w]||0)+1;if(seen[w]===2)n++;
  })));
  return n;
}
function buildStageOrders(stages){
  let best=null,bestDup=Infinity;
  for(let attempt=0;attempt<24;attempt++){
    const orders=dealStages(stages,attempt%2===0);
    const dup=countRepeats(stages,orders);
    if(dup<bestDup){bestDup=dup;best=orders;if(!dup)break;}
  }
  return best;
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

/* A hint reads "change the l to a t". The two letters ARE the instruction, and in
   plain sentence text they were the easiest part to skim past, so each one is
   pulled out onto its own tile. Only letters get marked: a short word that
   happens to sit in one of these positions -- the "end" of "at the end" -- is
   left alone. */
const HINTWORDS=/^(and|add|all|at|by|do|end|is|it|its|not|of|off|one|or|out|say|so|the|to|why)$/i;
function markHint(h){
  // After "to a" or "and an" the next short token is always the letter itself,
  // even when that letter is a or i, so it is marked without asking.
  const tile=x=>'<b>'+x+'</b>', b=x=>HINTWORDS.test(x)?x:tile(x);
  return String(h)
    .replace(/\bthe (double )?([a-z]{1,3})\b/gi,(m,d,x)=>'the '+(d||'')+b(x))
    .replace(/\bto (an?) (double )?([a-z]{1,3})\b/gi,(m,a,d,x)=>'to '+a+' '+(d||'')+tile(x))
    .replace(/\badd (an? )?([a-z]{1,3})\b/gi,(m,a,x)=>'add '+(a||'')+b(x))
    .replace(/\band (an?) ([a-z]{1,3})\b/gi,(m,a,x)=>'and '+a+' '+tile(x))
    .replace(/\b([a-z]{2,3}) blend\b/gi,(m,x)=>b(x)+' blend');
}

/* ---------------- Engines ---------------- */
const ENGINES={
  review(target,pool){
    const distract=pickUnique(pool.filter(w=>w!==target),w=>w,target,2);
    const opts=shuffle([target,...distract]);
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">Tap the speaker, then find the word you heard.</div>
      <button class="speak-btn" style="width:74px;height:74px;box-shadow:0 7px 0 #2f7ed8" onclick="speak('${jsq(target)}')" aria-label="hear word">${SPKR}</button></div>
      <div class="options three">${opts.map(w=>`<button class="opt" onclick="Game.pickWord(this,'${jsq(w)}','${jsq(target)}')">${w}</button>`).join('')}</div>
      <div class="feedback" id="fb"></div></div>`;speak(target);},

  phonogram(item,pool){const all=pool.all||pool;const {phon,word:correctWord}=item;
    // Browser TTS can't reliably pronounce a bare 2-letter grapheme like "nk" or "ck" —
    // it reads out letter names or guesses wrong. Speak a real word from the same
    // phonogram family instead; the chip still shows the letters for the print match.
    const sameFamily=all[phon].filter(w=>w!==correctWord);
    const spokenWord=sameFamily.length?rand(sameFamily):correctWord;
    // The question is "which one has the same sound?", so a distractor must not
    // share the sound. oy and oi are one sound with two spellings, and so are ow
    // and ou -- Lessons 52 and 56 teach exactly that -- so a word from the twin
    // bucket is as correct as the answer. A distractor that merely CONTAINS the
    // letters is just as bad: flower carries er, wheel carries ee.
    const TWIN={oy:'oi',oi:'oy',ow:'ou',ou:'ow'};
    const otherKeys=shuffle(Object.keys(all).filter(p=>p!==phon&&p!==TWIN[phon]));
    const seen=new Set([correctWord]);const others=[];
    for(const k of otherKeys){
      const fair=all[k].filter(w=>!w.toLowerCase().includes(phon)&&!seen.has(w));
      if(!fair.length)continue;
      const w=rand(fair);seen.add(w);others.push(w);if(others.length>=3)break;
    }
    const opts=shuffle([correctWord,...others]);
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">Listen to the word — which one has the same sound?</div>
      <div class="big-target"><span class="phon-chip">${phon}</span>
        <button class="speak-btn" onclick="speak('${jsq(spokenWord)}')" aria-label="hear word">${SPKR}</button></div></div>
      <div class="options">${opts.map(w=>`<button class="opt" onclick="Game.pickWord(this,'${jsq(w)}','${jsq(correctWord)}','${phon} sound')">${w}
        <button class="speak-btn" style="width:34px;height:34px;box-shadow:0 3px 0 #2f7ed8;margin-top:8px" onclick="event.stopPropagation();speak('${jsq(w)}')" aria-label="hear ${w}">${SPKR}</button></button>`).join('')}</div>
      <div class="feedback" id="fb"></div></div>`;speak(spokenWord);},

  ed(item){const {sound,word}=item;
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">Listen — which -ed sound do you hear?</div>
      <div class="big-target word-target">${word.slice(0,-2)}<span class="hl">ed</span>
        <button class="speak-btn" onclick="speak('${jsq(word)}')" aria-label="hear ${word}">${SPKR}</button></div></div>
      <div class="bucket-row">
        <div class="bucket" onclick="Game.pickBucket(this,'/t/','${jsq(sound)}')"><div class="snd">/t/</div><div class="ex">like <b>jumped</b></div></div>
        <div class="bucket" onclick="Game.pickBucket(this,'/d/','${jsq(sound)}')"><div class="snd">/d/</div><div class="ex">like <b>snowed</b></div></div>
        <div class="bucket" onclick="Game.pickBucket(this,'/id/','${jsq(sound)}')"><div class="snd">/id/</div><div class="ex">like <b>wanted</b></div></div>
      </div><div class="feedback" id="fb"></div></div>`;speak(word);},

  magic(p){const s=p.short,vowel=s[p.v];
    const before=s.slice(0,p.v),after=s.slice(p.v+1);
    $('gameArea').innerHTML=`<div class="card magic-stage">
      <div class="instruction" style="color:#5a6b82;font-family:Lexend;margin-bottom:6px">Add the magic <b>e</b> and watch the vowel change its sound!</div>
      <div class="magic-word" id="mword">${before}<span class="vowel">${vowel}</span>${after}<span class="adde">e</span></div>
      <div class="magic-meaning" id="mmean"></div>
      <div class="magic-controls">
        <button class="speak-btn" onclick="speak('${jsq(s)}')" style="box-shadow:0 6px 0 #2f7ed8">${SPKR}</button>
        <button class="btn-grape" id="addBtn" onclick="Game.doMagic('${jsq(s)}','${jsq(p.long)}',\`${p.mean}\`)">✨ Add Magic E</button>
      </div><div class="feedback" id="fb"></div></div>`;speak(s);},

  contraction(c,pool){
    const distract=pickUnique(pool.filter(x=>x.one!==c.one),x=>x.one,c.one,2);
    const opts=shuffle([c,...distract]);
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">Squish these two words into one!</div>
      <div class="big-target">${c.two}<button class="speak-btn" onclick="speak('${jsq(c.two)}')" aria-label="hear">${SPKR}</button></div></div>
      <div class="options three">${opts.map(o=>`<button class="opt" onclick="Game.pickWord(this,'${jsq(o.one)}','${jsq(c.one)}')">${o.one}</button>`).join('')}</div>
      <div class="feedback" id="fb"></div></div>`;speak(c.two);},

  /* Lesson 15 adds the third syllable type, so unlike `syllabletype` (open vs
     closed) this one is a three-way sort and the options carry their definitions
     as captions -- the child is learning the tags themselves, not just applying
     one they already know. Pool words are all single-syllable so the tag describes
     the whole word, the way the manual's syllable tags do. */
  /* Lesson 17 asks the same question twice about different letters -- "which of
     these two sounds do you hear?" -- so this engine is generic over its buckets
     rather than hard-coded like `ed`. The word is always spoken, because both
     halves of the lesson are ear questions: nothing in the spelling of cute vs
     rule, or nose vs goose, tells you the answer. Feedback carries the bucket's
     own explanation so a wrong guess teaches the distinction, not just the label. */
  /* Lesson 21's heteronyms. The child picks the MEANING rather than a pronunciation
     symbol, because meaning is what the sentence actually settles and it is what a
     seven-year-old can read off a button. This is the only engine that never calls
     speak(): saying the sentence aloud would hand over the answer outright, and
     browser text-to-speech guesses heteronyms from context unreliably anyway. */
  heteronym(item){
    const opts=shuffle([item.right,item.wrong]);
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">Read the sentence. What does the blue word mean here?</div>
      <div class="sentence">${item.sentence}</div></div>
      <div class="options">${opts.map(o=>`<button class="opt" onclick="Game.pickMeaning(this,\`${jsb(o)}\`,\`${jsb(item.right)}\`,'${jsq(item.word)}',\`${jsb(item.note)}\`)">${o}</button>`).join('')}</div>
      <div class="feedback" id="fb"></div></div>`;},

  sortsound(item,pool){
    const right=pool.buckets.find(b=>b.key===item.k);
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">${pool.instruction}</div>
      <div class="big-target word-target">${item.w}
        <button class="speak-btn" onclick="speak('${jsq(item.w)}')" aria-label="hear ${item.w}">${SPKR}</button></div></div>
      <div class="bucket-row${pool.buckets.length===2?' two':pool.buckets.length===4?' four':''}">${pool.buckets.map(b=>`<div class="bucket" onclick="Game.pickSound(this,'${jsq(b.key)}','${jsq(item.k)}','${jsq(item.w)}',\`${jsb(right.why)}\`)">
        <div class="snd">${b.key}</div><div class="ex">like <b>${b.ex}</b></div></div>`).join('')}</div>
      <div class="feedback" id="fb"></div></div>`;speak(item.w);},

  syllabletag(item,pool){
    const ALL=[['closed','Closed','ends in a consonant \u00b7 short vowel'],
               ['open','Open','ends in a vowel \u00b7 long vowel'],
               ['name','Name Game','ends in Silent E \u00b7 vowel says its name'],
               ['team','Vowel Team','letters teaming up for one vowel sound'],
               ['bossy','Bossy R','a vowel with an r bossing it around']];
    // Buttons come from the types the pool actually uses, so Lesson 15 still asks a
    // three-way question and Lesson 25, which adds Vowel Team, asks a four-way one.
    const present=new Set((pool||[]).map(x=>x.t));
    const TAGS=ALL.filter(t=>present.has(t[0]));
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">Which syllable tag does this word get?</div>
      <div class="big-target word-target">${item.w}
        <button class="speak-btn" onclick="speak('${jsq(item.w)}')" aria-label="hear ${item.w}">${SPKR}</button></div></div>
      <div class="options${TAGS.length===3?' three':TAGS.length===5?' five':''}">${TAGS.map(t=>`<button class="opt" onclick="Game.pickTag(this,'${jsq(t[0])}','${jsq(item.t)}','${jsq(item.w)}')">${t[1]}<small>${t[2]}</small></button>`).join('')}</div>
      <div class="feedback" id="fb"></div></div>`;speak(item.w);},

  /* The mirror of `contraction`, and the other half of the manual's rubber-band
     idea: that engine contracts two words into one, this one expands one back
     into two. Distractors are other two-word phrases from the same pool, so the
     child has to know what the contraction actually stands for rather than
     picking the only grammatical-looking option. */
  expand(c,pool){
    const distract=pickUnique(pool.filter(x=>x.two!==c.two),x=>x.two,c.two,2);
    const opts=shuffle([c,...distract]);
    const spoken=c.one;
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">Stretch it back out! Which two words is this short for?</div>
      <div class="big-target word-target">${c.one}
        <button class="speak-btn" onclick="speak('${jsq(spoken)}')" aria-label="hear ${c.one}">${SPKR}</button></div></div>
      <div class="options three">${opts.map(o=>`<button class="opt" onclick="Game.pickWord(this,'${jsq(o.two)}','${jsq(c.two)}')">${o.two}</button>`).join('')}</div>
      <div class="feedback" id="fb"></div></div>`;speak(c.one);},

  syllabletype(item){
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">Open or closed? Say the word and listen to the vowel.</div>
      <div class="big-target word-target">${item.w}<button class="speak-btn" onclick="speak('${jsq(item.w)}')" aria-label="hear ${item.w}">${SPKR}</button></div></div>
      <div class="options">
        <button class="opt" onclick="Game.pickType(this,'open','${jsq(item.t)}','${jsq(item.w)}')">Open<small>ends in a vowel · long sound</small></button>
        <button class="opt" onclick="Game.pickType(this,'closed','${jsq(item.t)}','${jsq(item.w)}')">Closed<small>ends in a consonant · short sound</small></button>
      </div><div class="feedback" id="fb"></div></div>`;speak(item.w);},

  wordchange(pair,poolMeta){const arr=Array.isArray(poolMeta)?poolMeta:poolMeta.pairs;
    const instruction=Array.isArray(poolMeta)?'Change the word! Add a blend to make a new word.':(poolMeta.instruction||'Change the word!');
    // The child SEES pair.from ("ro...bot"), but browser TTS reads a bare syllable with
    // letter-to-sound rules and gets the vowel wrong -- "ro" comes out short, which is the
    // opposite of the long vowel an open syllable teaches. When a pair supplies `say`, speak
    // that respelling instead (see GUESS10 in lessons.js); display is untouched either way.
    const spoken=pair.say||pair.from;
    // Also drop any pair whose `to` is the word being SHOWN: these pools form chains
    // (cake to bake to lake), so without this the prompt word can turn up among its
    // own options, and "change the word" cannot be answered with the same word.
    const distract=pickUnique(arr.filter(p=>p.to!==pair.to&&p.to!==pair.from),p=>p.to,pair.to,2).map(p=>p.to);
    const opts=shuffle([pair.to,...distract]);
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">${instruction}</div>
      <div class="big-target word-target">${pair.from}
        <button class="speak-btn" onclick="speak('${jsq(spoken)}')" aria-label="hear ${pair.from}">${SPKR}</button></div>
      ${pair.hint?`<div class="hint">${markHint(pair.hint)}</div>`:''}</div>
      <div class="options three">${opts.map(w=>`<button class="opt" onclick="Game.pickWord(this,'${jsq(w)}','${jsq(pair.to)}')">${w}</button>`).join('')}</div>
      <div class="feedback" id="fb"></div></div>`;speak(spoken);},

  /* Lesson 14's "Kit or Kite?" -- a pure listening contrast where the two options
     differ only by whether Silent E is doing its job. Nothing is shown before the
     answer, so the child has to hear the vowel length rather than read it. Both
     members of the pair are real words, which is why the pool alternates which
     one is the target: otherwise "pick the one with the e" would always win. */
  minimalpair(item){
    const opts=shuffle([item.w,item.other]);
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">Listen closely. Which word did you hear?</div>
      <button class="speak-btn" style="width:74px;height:74px;box-shadow:0 7px 0 #2f7ed8" onclick="speak('${jsq(item.w)}')" aria-label="hear word">${SPKR}</button></div>
      <div class="options">${opts.map(o=>`<button class="opt" onclick="Game.pickHeard(this,'${jsq(o)}','${jsq(item.w)}')">${o}</button>`).join('')}</div>
      <div class="feedback" id="fb"></div></div>`;speak(item.w);},

  /* Lesson 33's three-syllable words. The wrong options carry TWO splits as well,
     just in the wrong places -- if they had one split each, a child could win the
     round by counting hyphens rather than deciding where the syllables break.
     Every generated piece is at least two letters, so each option reads as a real
     attempt at the word instead of obvious filler. */
  syllablesplit3(item){
    const w=item.w, correct=item.parts.join('-');
    const a=item.parts[0].length, b=a+item.parts[1].length;
    const cands=[];
    for(let i=2;i<=w.length-4;i++)for(let j=i+2;j<=w.length-2;j++){
      if(i===a&&j===b)continue;
      cands.push(w.slice(0,i)+'-'+w.slice(i,j)+'-'+w.slice(j));
    }
    const opts=shuffle([correct,...shuffle(cands).slice(0,2)]);
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">This word has three syllables. Where do the splits go?</div>
      <div class="big-target word-target">${w}
        <button class="speak-btn" onclick="speak('${jsq(w)}')" aria-label="hear ${w}">${SPKR}</button></div></div>
      <div class="options three split">${opts.map(o=>`<button class="opt" onclick="Game.pickWord(this,'${jsq(o)}','${jsq(correct)}')">${o}</button>`).join('')}</div>
      <div class="feedback" id="fb"></div></div>`;speak(w);},

  syllablesplit(item){const w=item.w;const correct=item.parts.join('-');
    const splitIdx=item.parts[0].length;const candidates=[];
    // Splitting only between positions 2 and length-2 left seven Lesson 31 words
    // -- paper, river, never, over -- with a single wrong answer, so the round was
    // a coin flip in a three-button grid. Every split position is fair game.
    for(let i=1;i<=w.length-1;i++){const opt=w.slice(0,i)+'-'+w.slice(i);if(i!==splitIdx&&!candidates.includes(opt))candidates.push(opt);}
    const opts=shuffle([correct,...shuffle(candidates).slice(0,2)]);
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">Where does this word split into syllables?</div>
      <div class="big-target word-target">${w}
        <button class="speak-btn" onclick="speak('${jsq(w)}')" aria-label="hear ${w}">${SPKR}</button></div></div>
      <div class="options three split">${opts.map(o=>`<button class="opt" onclick="Game.pickWord(this,'${jsq(o)}','${jsq(correct)}')">${o}</button>`).join('')}</div>
      <div class="feedback" id="fb"></div></div>`;speak(w);},

  /* Lesson 12: the child sees ONE word and the two splits that are genuinely in
     contention -- consonant forward (open first syllable, long vowel) versus
     consonant slid back (closed first syllable, short vowel). Unlike
     `syllablesplit`, the distractor is never invented from an arbitrary letter
     position: the wrong option here is the exact mistake the rule exists to
     correct, so a right answer means the child applied the rule rather than
     ruled out nonsense. Only the real word is ever spoken -- hearing whether the
     first vowel is long or short IS the clue that decides which split works. */
  vcvsplit(item){
    const correct=item.correct==='open'?item.open:item.closed;
    const other=item.correct==='open'?item.closed:item.open;
    const opts=shuffle([item.open,item.closed]);
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">Listen to the word. Which split makes a real word?</div>
      <div class="big-target word-target">${item.w}
        <button class="speak-btn" onclick="speak('${jsq(item.w)}')" aria-label="hear ${item.w}">${SPKR}</button></div></div>
      <div class="options split">${opts.map(o=>`<button class="opt" onclick="Game.pickSplit(this,'${jsq(o)}','${jsq(correct)}','${jsq(other)}','${jsq(item.correct)}')">${o}</button>`).join('')}</div>
      <div class="feedback" id="fb"></div></div>`;speak(item.w);},

  /* Leap Words. Same read-aloud-and-self-report shape as `sightword`, with the
     reason added afterwards: these words are odd for a reason, and a grown-up
     sitting alongside benefits from knowing whether this one truly breaks the
     rules or merely arrived before the rule that explains it. */
  leapword(item){
    const q=item.w, spoken=item.say||item.w;
    $('gameArea').innerHTML=`<div class="card" style="text-align:center">
      <div class="instruction" style="font-family:Lexend;font-weight:500;color:#5a6b82;font-size:16px;margin-bottom:16px">Read the Leap Word out loud! Stuck? Tap the speaker.</div>
      <div class="big-target word-target">${item.w}
        <button class="speak-btn" onclick="speak('${jsq(spoken)}')" aria-label="hear ${item.w}">${SPKR}</button></div>
      <div class="sight-controls">
        <button class="btn-mint" onclick="Game.leapAnswer(true,'${jsq(q)}')">\u2713 I read it!</button>
        <button class="btn-soft" onclick="Game.leapAnswer(false,'${jsq(q)}')">🔁 Still tricky</button>
      </div>
      <div class="feedback" id="fb"></div></div>`;},

  /* A pool entry is normally just the word, but it may be {w, say} when the
     spelling would mislead the voice -- Mr. and Mrs. have no vowel, and some
     voices spell them out rather than saying mister and missus. */
  sightword(item){
    const w=(item&&item.w)||item, q=w, spoken=(item&&item.say)||w;
    $('gameArea').innerHTML=`<div class="card" style="text-align:center">
      <div class="instruction" style="font-family:Lexend;font-weight:500;color:#5a6b82;font-size:16px;margin-bottom:16px">Read the word out loud! Stuck? Tap the speaker.</div>
      <div class="big-target word-target">${w}
        <button class="speak-btn" onclick="speak('${jsq(spoken)}')" aria-label="hear ${w}">${SPKR}</button></div>
      <div class="sight-controls">
        <button class="btn-mint" onclick="Game.sightAnswer(true,'${jsq(q)}')">✓ I read it!</button>
        <button class="btn-soft" onclick="Game.sightAnswer(false,'${jsq(q)}')">🔁 Still tricky</button>
      </div>
      <div class="feedback" id="fb"></div></div>`;},

  syllable(s){
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">Say it and clap. How many syllables?</div>
      <div class="big-target word-target">${s.w}<button class="speak-btn" onclick="speak('${jsq(s.w)}')" aria-label="hear ${s.w}">${SPKR}</button></div></div>
      <div class="options three">${[1,2,3].map(n=>`<button class="opt" onclick="Game.pickNumber(this,${n},${s.n})">${n}<small>${'👏'.repeat(n)}</small></button>`).join('')}</div>
      <div class="feedback" id="fb"></div></div>`;speak(s.w);},

  /* ---------------- Exam engines ----------------
     Five rounds that exist only in the two check-ups. Each one asks her to do
     something the practice lessons never ask: spot a pattern rather than apply
     a named rule, produce a word instead of recognising one, or read a whole
     sentence for its meaning. None of them speaks the answer before she gives
     it, because an exam that reads the word aloud is a listening test. */

  /* Three words share something and one does not. The only clue is the print,
     so there is no speaker here: reading them IS the question. */
  oddoneout(item){
    const opts=shuffle(item.words.slice());
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">Three of these belong together. Which one does not?</div></div>
      <div class="options">${opts.map(w=>`<button class="opt" onclick="Game.pickOdd(this,'${jsq(w)}','${jsq(item.odd)}',\`${jsb(item.why)}\`)">${w}</button>`).join('')}</div>
      <div class="feedback" id="fb"></div></div>`;},

  /* Hear the word, then tap its parts in order. Spare tiles keep it from being
     the answer shuffled, and a placed tile can be tapped again to take it back,
     so a slip of the thumb does not cost the question. */
  buildword(item,pool){
    const spare=pickUnique((pool.tiles||[]).filter(t=>!item.parts.includes(t)),t=>t,null,3).slice(0,3);
    Game.build={target:item.w, correct:item.parts.slice(), placed:[], tiles:shuffle(item.parts.concat(spare))};
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">Tap the parts in order to build the word you hear.</div>
      <div class="big-target"><button class="speak-btn" style="width:74px;height:74px;box-shadow:0 7px 0 #2f7ed8" onclick="speak('${jsq(item.w)}')" aria-label="hear word">${SPKR}</button></div></div>
      <div class="slot-row" id="slotRow"></div>
      <div class="tile-row" id="tileRow"></div>
      <div class="feedback" id="fb"></div></div>`;
    Game.renderBuild();speak(item.w);},

  /* A sentence with one word missing. Nothing else in Word Pond asks her to
     read for meaning, and a child can decode every word on a card and still
     not know what the sentence said. */
  sentence(item){
    const opts=shuffle(item.options.slice());
    const shown=item.text.replace('___','<span class="blank">?</span>');
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">Read the sentence. Which word belongs in the gap?</div>
      <div class="sentence">${shown}</div></div>
      <div class="options three">${opts.map(w=>`<button class="opt" onclick="Game.pickSentence(this,'${jsq(w)}','${jsq(item.answer)}',\`${jsb(item.text)}\`)">${w}</button>`).join('')}</div>
      <div class="feedback" id="fb"></div></div>`;},

  /* Does this word play fair? The Leap Word idea turned into a question she has
     to answer rather than a label the app hands her. */
  rulebreaker(item){
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">Does this word follow the rules, or break them?</div>
      <div class="big-target word-target">${item.w}
        <button class="speak-btn" onclick="speak('${jsq(item.say||item.w)}')" aria-label="hear ${item.w}">${SPKR}</button></div></div>
      <div class="bucket-row two rule">
        <div class="bucket" onclick="Game.pickRule(this,false,${item.breaker?'true':'false'},'${jsq(item.w)}',\`${jsb(item.why)}\`)">
          <div class="snd">Plays fair</div><div class="ex">it follows a rule you know</div></div>
        <div class="bucket" onclick="Game.pickRule(this,true,${item.breaker?'true':'false'},'${jsq(item.w)}',\`${jsb(item.why)}\`)">
          <div class="snd">Breaks the rules</div><div class="ex">a Leap Word</div></div></div>
      <div class="feedback" id="fb"></div></div>`;},

  /* Two syllables, joined the other way round: she is given the front of the
     word and picks the part that finishes it. Distractors are real syllables
     lifted from the other words, filtered so only one choice makes a word. */
  syllablebridge(item,pool){
    const spare=(item.wrong||[]).filter(t=>t!==item.tail).slice(0,2);
    const opts=shuffle([item.tail,...spare]);
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">Which part finishes the word?</div>
      <div class="big-target word-target"><span class="head-tile">${item.head}</span><span class="blank">?</span></div></div>
      <div class="options three">${opts.map(t=>`<button class="opt" onclick="Game.pickBridge(this,'${jsq(t)}','${jsq(item.tail)}','${jsq(item.w)}','${jsq(item.head)}')">${t}</button>`).join('')}</div>
      <div class="feedback" id="fb"></div></div>`;},
};

/* Games that drill until every word is known, rather than running 25 rounds.
   Both keep their own mastery set so progress in one never counts for the other. */
const MASTERY={
  sight:{pool:()=>SIGHTWORDS, set:()=>masteredWords, engine:'sightword', key:w=>w,      label:'sight words'},
  leap: {pool:()=>LEAPWORDS,  set:()=>masteredLeap,  engine:'leapword',  key:x=>x.w,    label:'Leap Words'}
};

/* ---------------- Game controller ---------------- */
const Game={
  deck:null,round:0,total:25,correct:0,locked:false,order:null,stageOrders:null,sightUsed:null,
  home(){if(SPEECH_OK)speechSynthesis.cancel();$('home').classList.add('active');
    $('game').classList.remove('active');$('lessonIntro').classList.remove('active');},
  buildOrders(){
    this.sightUsed=new Set();
    if(MASTERY[this.deck.id])return;
    if(this.deck.stages){this.stageOrders=buildStageOrders(this.deck.stages);this.order=null;}
    else{this.order=resolveOrder(this.deck.engine,this.deck.pool,this.total);this.stageOrders=null;}
  },
  launch(kind,id){
    this.deck = kind==='L' ? LESSONS.find(l=>l.id===id)
      : kind==='E' ? EXAMS.find(e=>e.id===id)
      : GAMES.find(g=>g.id===id);
    this.total = this.deck.stages ? this.deck.stages.reduce((a,s)=>a+s.rounds,0) : 25;
    this.round=0;this.correct=0;this.examLog=[];this.build=null;
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
    const m=MASTERY[this.deck.id];
    // A mastery game checks for the trophy BEFORE the round limit: clearing the
    // last word on round 25 used to end the sitting with an ordinary star count
    // and hide the trophy until the game was opened again.
    if(this.round>this.total&&!m){this.finish();return;}
    if(m){
      const pool=m.pool(), done=m.set();
      const unmastered=pool.filter(x=>!done.has(m.key(x)));
      if(unmastered.length===0){this.showAchievement(pool.length,m.label);return;}
      if(this.round>this.total){this.finish();return;}
      let avail=unmastered.filter(x=>!this.sightUsed.has(m.key(x)));
      if(avail.length===0){this.sightUsed.clear();avail=unmastered;}
      const x=rand(avail);this.sightUsed.add(m.key(x));
      $('progress').textContent=unmastered.length+' / '+pool.length+' left to master';
      ENGINES[m.engine](x);
      return;
    }
    const {stage,item}=this.currentStageInfo();
    $('progress').textContent=this.round+' / '+this.total+(stage.label?' · '+stage.label:'');
    ENGINES[stage.engine].call(ENGINES,item,stage.pool);},
  win(){this.correct++;addStar();},
  good(msg){$('fb').textContent=msg;$('fb').className='feedback good';},
  bad(msg){
    // An exam withholds the answer: she gets another go at the same question on
    // a retake, and the report card tells the grown-up what to reteach. Drop the
    // exam check here to turn reveals back on everywhere.
    if(this.deck&&this.deck.exam)msg='Not quite.';
    $('fb').textContent=msg;$('fb').className='feedback try';},

  pickWord(btn,word,correct,label){
    if(this.locked)return;this.locked=true;
    // The syllable-split game's answer is hyphenated for print ("pic-nic"); read it back as
    // the whole word so the child hears the real pronunciation, not two chopped pieces.
    const answer=correct.replace(/-/g,'');
    if(word===correct){btn.classList.add('correct');this.win();this.good('✓ Yes! '+correct);speak(answer);}
    else{btn.classList.add('wrong');
      // An exam holds the answer back in print and in speech, not just in words.
      if(!(this.deck&&this.deck.exam)){
        document.querySelectorAll('.opt').forEach(o=>{if(o.childNodes[0].textContent.trim()===correct)o.classList.add('correct');});
        speak(answer);
      }
      this.bad(label?('That’s not the '+label):('This one says '+correct));}
    this.answered(word===correct);
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
    if(picked===correct){btn.classList.add('correct');this.win();this.good('✓ '+correct+(correct===1?' clap!':' claps!'));}
    else{btn.classList.add('wrong');
      document.querySelectorAll('.opt').forEach(o=>{if(parseInt(o.childNodes[0].textContent)===correct)o.classList.add('correct');});
      this.bad('It has '+correct+(correct===1?' syllable':' syllables'));}
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
  pickMeaning(btn,picked,correct,word,note){
    if(this.locked)return;this.locked=true;
    const why='Here '+word+' means '+correct+' \u2014 '+note+'.';
    if(picked===correct){btn.classList.add('correct');this.win();this.good('\u2713 Yes! '+why);}
    else{btn.classList.add('wrong');
      document.querySelectorAll('.opt').forEach(o=>{if(o.textContent.trim()===correct)o.classList.add('correct');});
      this.bad(why);}
    this.showNext();
  },
  pickSound(btn,picked,correct,word,why){
    if(this.locked)return;this.locked=true;
    if(picked===correct){btn.classList.add('correct');this.win();this.good('\u2713 '+correct+'! '+word+' \u2014 '+why+'.');}
    else{btn.classList.add('wrong');
      document.querySelectorAll('.bucket').forEach(b=>{if(b.querySelector('.snd').textContent===correct)b.classList.add('correct');});
      this.bad(word+' is '+correct+' \u2014 '+why+'.');}
    speak(word);
    this.showNext();
  },
  pickTag(btn,picked,correct,word){
    if(this.locked)return;this.locked=true;
    const LABEL={closed:'Closed',open:'Open',name:'Name Game',team:'Vowel Team',bossy:'Bossy R'};
    const WHY={
      closed:word+' ends in a consonant, so the vowel stays short.',
      open:word+' ends in a vowel, so the vowel says its long sound.',
      name:word+' ends in Silent E, so the vowel says its name.',
      team:word+' gets its vowel sound from a team of letters working as one.',
      bossy:word+' has an r right after the vowel, and the r decides how it sounds.'};
    if(picked===correct){btn.classList.add('correct');this.win();this.good('\u2713 '+LABEL[correct]+'! '+WHY[correct]);}
    else{btn.classList.add('wrong');
      document.querySelectorAll('.opt').forEach(o=>{if(o.childNodes[0].textContent.trim()===LABEL[correct])o.classList.add('correct');});
      this.bad(LABEL[correct]+' \u2014 '+WHY[correct]);}
    this.showNext();
  },
  /* Minimal-pair feedback names the reason, not just the answer: the whole point
     of the round is that the vowel length is the ONLY difference between the two
     words, so the child should walk away knowing which one they heard and why. */
  pickHeard(btn,picked,correct){
    if(this.locked)return;this.locked=true;
    const why=correct.endsWith('e')?'Silent E made that vowel long.':'No Silent E, so that vowel stayed short.';
    if(picked===correct){btn.classList.add('correct');this.win();this.good('✓ Yes! You heard '+correct+'. '+why);}
    else{btn.classList.add('wrong');
      document.querySelectorAll('.opt').forEach(o=>{if(o.childNodes[0].textContent.trim()===correct)o.classList.add('correct');});
      this.bad('You heard '+correct+'. '+why);}
    speak(correct);
    this.showNext();
  },
  pickSplit(btn,picked,correct,other,type){
    if(this.locked)return;this.locked=true;
    const first=correct.split('-')[0];
    const why=type==='open'
      ? first+' ends in a vowel, so it’s open — long vowel sound.'
      : first+' ends in a consonant, so it’s closed — short vowel sound.';
    if(picked===correct){btn.classList.add('correct');this.win();this.good('✓ Yes! '+correct+' — '+why);}
    else{btn.classList.add('wrong');
      document.querySelectorAll('.opt').forEach(o=>{if(o.childNodes[0].textContent.trim()===correct)o.classList.add('correct');});
      this.bad('It’s '+correct+'. '+other+' isn’t a real word.');}
    speak(correct.replace(/-/g,''));
    this.showNext();
  },
  leapAnswer(knewIt,word){
    if(this.locked)return;this.locked=true;
    const item=LEAPWORDS.find(x=>x.w===word);
    const note=item?(' Lesson '+item.n+' \u2014 '+item.why+'. '+(item.breaker?'A real rule breaker.':'The rule that explains it comes later.')):'';
    if(knewIt){
      if(word&&!masteredLeap.has(word)){masteredLeap.add(word);persist();}
      this.win();this.good('\u2b50 Way to read it!'+note);
    }else{this.bad('Nice try, it will come back around.'+note);}
    this.showNext();
  },
  sightAnswer(knewIt,word){
    if(this.locked)return;this.locked=true;
    if(knewIt){
      if(word&&this.deck&&this.deck.id==='sight'&&!masteredWords.has(word)){masteredWords.add(word);persist();}
      this.win();this.good('⭐ Way to read it!');
    }else{this.bad('Nice try — that one will come back around.');}
    this.showNext();
  },
  showAchievement(total,label){
    $('progress').textContent='';
    $('gameArea').innerHTML=`<div class="card done-card achievement-card">
      <div class="done-mascot">${pipSVG(70)}</div>
      <div class="achievement-badge">🏆</div>
      <h2>Congratulations, ${childName}!</h2>
      <p>You've mastered all ${total} ${label}! Pip is so proud of you. 🐸✨</p>
      <button class="back" style="margin-top:6px" onclick="Game.home()">Back to menu</button>
    </div>`;
  },
  doMagic(shortW,longW,mean){
    if(this.locked)return;this.locked=true;
    const w=$('mword');w.classList.add('show-e');w.querySelector('.vowel').style.color='#9b6cf0';
    $('mmean').textContent=mean;$('addBtn').disabled=true;setTimeout(()=>speak(longW),350);
    this.good(shortW+' → '+longW+' ✨');this.win();this.showNext();
  },

  /* ---------------- Exam answers ----------------
     Every one of these ends in answered(), which is where an exam differs from
     a lesson: the score is logged against the stage's skill so the report card
     can be built, and a miss says only "not quite" rather than handing over the
     answer to a question she has just got wrong. */
  answered(ok){
    if(!this.deck||!this.deck.exam)return;
    const st=this.currentStageInfo().stage;
    (this.examLog=this.examLog||[]).push({skill:st.skill||st.label||'Other',lessons:st.lessons||[],ok:!!ok});
  },
  pickOdd(btn,picked,correct,why){
    if(this.locked)return;this.locked=true;
    if(picked===correct){btn.classList.add('correct');this.win();this.good('✓ Yes! '+why);}
    else{btn.classList.add('wrong');this.bad(correct+' is the odd one — '+why);}
    this.answered(picked===correct);this.showNext();
  },
  pickSentence(btn,picked,correct,text){
    if(this.locked)return;this.locked=true;
    const ok=picked===correct;
    if(ok){btn.classList.add('correct');this.win();this.good('✓ Yes! '+text.replace('___',correct));
      speak(text.replace('___',correct));}
    else{btn.classList.add('wrong');this.bad('It says '+text.replace('___',correct));}
    this.answered(ok);this.showNext();
  },
  pickRule(el,saidBreaker,isBreaker,word,why){
    if(this.locked)return;this.locked=true;
    const ok=(saidBreaker===isBreaker);
    if(ok){el.classList.add('correct');this.win();this.good('✓ Yes! '+why);}
    else{el.classList.add('wrong');this.bad(word+(isBreaker?' breaks the rules — ':' plays fair — ')+why);}
    this.answered(ok);this.showNext();
  },
  pickBridge(btn,picked,correct,word,head){
    if(this.locked)return;this.locked=true;
    const ok=picked===correct;
    if(ok){btn.classList.add('correct');this.win();this.good('✓ Yes! '+word);speak(word);}
    else{btn.classList.add('wrong');this.bad('It is '+word+'. '+head+picked+' is not a word.');}
    this.answered(ok);this.showNext();
  },

  /* Build the Word keeps its state on the controller because the round is built
     up over several taps rather than decided by one. */
  build:null,
  renderBuild(){
    const b=this.build;if(!b)return;
    const slots=b.correct.map((_,i)=>b.placed[i]!=null
      ? `<button class="slot filled" onclick="Game.unTile(${i})">${b.tiles[b.placed[i]]}</button>`
      : `<span class="slot"></span>`).join('');
    const tiles=b.tiles.map((t,i)=>{
      const spent=b.placed.indexOf(i)>=0;
      return `<button class="tile${spent?' spent':''}"${spent?' disabled':''} onclick="Game.tapTile(${i})">${t}</button>`;
    }).join('');
    $('slotRow').innerHTML=slots;
    $('tileRow').innerHTML=tiles;
  },
  tapTile(i){
    const b=this.build;if(!b||this.locked)return;
    if(b.placed.length>=b.correct.length||b.placed.indexOf(i)>=0)return;
    b.placed.push(i);this.renderBuild();
    if(b.placed.length===b.correct.length){
      this.locked=true;
      const built=b.placed.map(k=>b.tiles[k]).join('');
      const ok=built===b.target;
      if(ok){this.win();this.good('✓ Yes! '+b.target);speak(b.target);}
      else{this.bad('It is '+b.correct.join(' - ')+'.');}
      this.answered(ok);this.showNext();
    }
  },
  unTile(i){
    const b=this.build;if(!b||this.locked)return;
    b.placed.splice(i,1);this.renderBuild();
  },

  /* ---------------- Exam report ----------------
     The score is for her; this is for the grown-up. A skill she got most of is
     named and left alone. One she struggled with names the lessons behind it,
     so a wrong answer turns into next week's practice rather than a number. */
  examReport(){
    const log=this.examLog||[],by=[];
    log.forEach(e=>{
      let row=by.find(r=>r.skill===e.skill);
      if(!row){row={skill:e.skill,lessons:e.lessons,ok:0,n:0};by.push(row);}
      row.n++;if(e.ok)row.ok++;
    });
    const pct=Math.round(this.correct/this.total*100);
    const msg=pct>=90?'Outstanding, '+childName+'! 🏆'
      :pct>=70?'Well done, '+childName+'! 🐸'
      :'Good effort, '+childName+'. Every one of these comes back around. 💪';
    const rows=by.map(r=>{
      const p=Math.round(r.ok/r.n*100);
      const tone=p>=80?'strong':p>=50?'okay':'weak';
      const revisit=p<70&&r.lessons.length
        ? `<div class="revisit">Worth another look: ${r.lessons.length>6
            ? 'Lessons '+r.lessons.slice(0,6).join(', ')+' and on'
            : (r.lessons.length===1?'Lesson '+r.lessons[0]:'Lessons '+r.lessons.slice(0,-1).join(', ')+' and '+r.lessons[r.lessons.length-1])}</div>`
        : '';
      return `<div class="rc-row ${tone}">
        <div class="rc-head"><span class="rc-skill">${r.skill}</span><span class="rc-score">${r.ok} / ${r.n}</span></div>
        <div class="rc-bar"><span style="width:${p}%"></span></div>${revisit}</div>`;
    }).join('');
    saveExamResult(this.deck.id,{t:Date.now(),correct:this.correct,total:this.total,
      bySkill:by.map(r=>({skill:r.skill,ok:r.ok,n:r.n}))});
    const past=examHistory(this.deck.id).slice(0,-1).slice(-3).reverse();
    const history=past.length?`<div class="rc-past"><b>Earlier attempts</b>${past.map(p=>
      `<span>${p.correct} / ${p.total} · ${new Date(p.t).toLocaleDateString()}</span>`).join('')}</div>`:'';
    $('gameArea').innerHTML=`<div class="card done-card">
      <div class="done-mascot">${pipSVG(56)}</div>
      <h2>${this.deck.title} — all done!</h2>
      <div class="score-caption" style="font-size:26px">${this.correct} out of ${this.total}</div>
      <p>${msg}</p>
      <div class="report-card">
        <h3>For your grown-up</h3>
        ${rows}
      </div>
      ${history}
      <button class="next-btn" onclick="Game.replay()">Take it again</button>
      <button class="back" style="margin-top:12px" onclick="Game.home()">Back to menu</button></div>`;
    if(pct>=90)addStar(3);
  },
  finish(){
    if(this.deck&&this.deck.exam){this.examReport();return;}
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
  replay(){this.round=0;this.correct=0;this.examLog=[];this.build=null;this.buildOrders();this.next();},
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
