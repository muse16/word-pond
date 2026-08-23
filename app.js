/* ---------------- Speech ---------------- */
function speak(t){try{if(!('speechSynthesis' in window))return;speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(t);u.rate=0.82;u.pitch=1.05;u.lang='en-US';speechSynthesis.speak(u);}catch(e){}}
const SPKR='<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4zM14 3.2v2.1a7 7 0 010 13.4v2.1a9 9 0 000-17.6z"/></svg>';
const rand=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(v=>v[1]);
const $=id=>document.getElementById(id);

/* ---------------- Save / load ---------------- */
const SAVE_KEY='wordpond_v1';
let stars=0; const enabled={}; GAMES.forEach(g=>enabled[g.id]=g.on);
let storageOK=true;
function persist(){try{localStorage.setItem(SAVE_KEY,JSON.stringify({stars,enabled}));}catch(e){storageOK=false;}}
function loadSave(){try{const s=JSON.parse(localStorage.getItem(SAVE_KEY));if(s){if(typeof s.stars==='number')stars=s.stars;
  if(s.enabled)GAMES.forEach(g=>{if(g.id in s.enabled)enabled[g.id]=s.enabled[g.id];});}}catch(e){storageOK=false;}}
function resetProgress(){stars=0;GAMES.forEach(g=>enabled[g.id]=g.on);persist();$('starCount').textContent=0;renderMenu();renderSkillList();}

function addStar(n=1){stars+=n;$('starCount').textContent=stars;persist();
  const m=$('mascot');m.classList.remove('happy');void m.offsetWidth;m.classList.add('happy');}

/* ---------------- Menu render ---------------- */
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
function togglePanel(show){$('overlay').classList.toggle('active',show);if(show)renderSkillList();}

function renderIntro(deck){
  const intro=deck.intro;
  const wordChips=w=>`<button class="speak-btn" style="width:34px;height:34px;box-shadow:0 3px 0 #2f7ed8;margin:4px 6px 4px 0" onclick="speak('${w}')" aria-label="hear ${w}">${SPKR}</button>`;
  const words=(intro.words||[]).map(w=>`<span class="intro-word">${w}${wordChips(w)}</span>`).join('');
  const review=(intro.review||[]).length?`<p class="intro-review"><b>Words to review:</b> ${intro.review.join(', ')}</p>`:'';
  const trick=intro.trick?`<div class="trick-box"><div class="trick-title">🐸 ${intro.trick.title}</div>
    ${intro.trick.points.map(p=>`<div class="trick-point"><b>${p.w}</b> — ${p.note}</div>`).join('')}</div>`:'';
  $('introArea').innerHTML=`<div class="card">
    <div class="lesson-badge">Lesson ${deck.n}</div>
    <h2 class="intro-topic">${intro.topic}</h2>
    ${intro.lines.map(l=>`<p class="intro-line">${l}</p>`).join('')}
    <div class="intro-words">${words}</div>
    ${review}
    ${trick}
    <button class="next-btn" onclick="Game.begin()">Start Practice ▶</button>
  </div>`;
}

/* ---------------- Engines ---------------- */
const ENGINES={
  review(pool){const target=rand(pool);
    const opts=shuffle([target,...shuffle(pool.filter(w=>w!==target)).slice(0,2)]);
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">Tap the speaker, then find the word you heard.</div>
      <button class="speak-btn" style="width:74px;height:74px;box-shadow:0 7px 0 #2f7ed8" onclick="speak('${target}')" aria-label="hear word">${SPKR}</button></div>
      <div class="options three">${opts.map(w=>`<button class="opt" onclick="Game.pickWord(this,'${w}','${target}')">${w}</button>`).join('')}</div>
      <div class="feedback" id="fb"></div></div>`;speak(target);},

  phonogram(pool){const all=pool.all||pool;const focus=pool.focus||Object.keys(all);
    const phon=rand(focus);const correctWord=rand(all[phon]);
    const others=shuffle(Object.keys(all).filter(p=>p!==phon)).slice(0,3);
    const opts=shuffle([correctWord,...others.map(p=>rand(all[p]))]);
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">Which word has this sound?</div>
      <div class="big-target"><span class="phon-chip">${phon}</span>
        <button class="speak-btn" onclick="speak('${phon}')" aria-label="hear sound">${SPKR}</button></div></div>
      <div class="options">${opts.map(w=>`<button class="opt" onclick="Game.pickWord(this,'${w}','${correctWord}','${phon} sound')">${w}
        <button class="speak-btn" style="width:34px;height:34px;box-shadow:0 3px 0 #2f7ed8;margin-top:8px" onclick="event.stopPropagation();speak('${w}')" aria-label="hear ${w}">${SPKR}</button></button>`).join('')}</div>
      <div class="feedback" id="fb"></div></div>`;speak(phon);},

  ed(pool){const sound=rand(Object.keys(pool));const word=rand(pool[sound]);
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">Listen — which -ed sound do you hear?</div>
      <div class="big-target word-target">${word.slice(0,-2)}<span class="hl">ed</span>
        <button class="speak-btn" onclick="speak('${word}')" aria-label="hear ${word}">${SPKR}</button></div></div>
      <div class="bucket-row">
        <div class="bucket" onclick="Game.pickBucket(this,'/t/','${sound}')"><div class="snd">/t/</div><div class="ex">like <b>jumped</b></div></div>
        <div class="bucket" onclick="Game.pickBucket(this,'/d/','${sound}')"><div class="snd">/d/</div><div class="ex">like <b>snowed</b></div></div>
        <div class="bucket" onclick="Game.pickBucket(this,'/id/','${sound}')"><div class="snd">/id/</div><div class="ex">like <b>wanted</b></div></div>
      </div><div class="feedback" id="fb"></div></div>`;speak(word);},

  magic(pool){const p=rand(pool);const s=p.short,vowel=s[p.v];
    const before=s.slice(0,p.v),after=s.slice(p.v+1);
    $('gameArea').innerHTML=`<div class="card magic-stage">
      <div class="instruction" style="color:#5a6b82;font-family:Lexend;margin-bottom:6px">Add the magic <b>e</b> and watch the vowel change its sound!</div>
      <div class="magic-word" id="mword">${before}<span class="vowel">${vowel}</span>${after}<span class="adde">e</span></div>
      <div class="magic-meaning" id="mmean"></div>
      <div class="magic-controls">
        <button class="speak-btn" onclick="speak('${s}')" style="box-shadow:0 6px 0 #2f7ed8">${SPKR}</button>
        <button class="btn-grape" id="addBtn" onclick="Game.doMagic('${s}','${p.long}',\`${p.mean}\`)">✨ Add Magic E</button>
      </div><div class="feedback" id="fb"></div></div>`;speak(s);},

  contraction(pool){const c=rand(pool);
    const distract=shuffle(pool.filter(x=>x.one!==c.one)).slice(0,2);
    const opts=shuffle([c,...distract]);
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">Squish these two words into one!</div>
      <div class="big-target">${c.two}<button class="speak-btn" onclick="speak('${c.two}')" aria-label="hear">${SPKR}</button></div></div>
      <div class="options three">${opts.map(o=>`<button class="opt" onclick="Game.pickWord(this,'${o.one.replace(/'/g,"\\'")}','${c.one.replace(/'/g,"\\'")}')">${o.one}</button>`).join('')}</div>
      <div class="feedback" id="fb"></div></div>`;speak(c.two);},

  syllabletype(pool){const item=rand(pool);
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">Open or closed? Say the word and listen to the vowel.</div>
      <div class="big-target word-target">${item.w}<button class="speak-btn" onclick="speak('${item.w}')" aria-label="hear ${item.w}">${SPKR}</button></div></div>
      <div class="options">
        <button class="opt" onclick="Game.pickType(this,'open','${item.t}','${item.w}')">Open<small>ends in a vowel · long sound</small></button>
        <button class="opt" onclick="Game.pickType(this,'closed','${item.t}','${item.w}')">Closed<small>ends in a consonant · short sound</small></button>
      </div><div class="feedback" id="fb"></div></div>`;speak(item.w);},

  wordchange(pool){const arr=Array.isArray(pool)?pool:pool.pairs;
    const instruction=Array.isArray(pool)?'Change the word! Add a blend to make a new word.':(pool.instruction||'Change the word!');
    const pair=rand(arr);
    const others=shuffle(arr.filter(p=>p.to!==pair.to)).slice(0,2).map(p=>p.to);
    const opts=shuffle([pair.to,...others]);
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">${instruction}</div>
      <div class="big-target word-target">${pair.from}
        <button class="speak-btn" onclick="speak('${pair.from}')" aria-label="hear ${pair.from}">${SPKR}</button></div></div>
      <div class="options three">${opts.map(w=>`<button class="opt" onclick="Game.pickWord(this,'${w}','${pair.to}')">${w}</button>`).join('')}</div>
      <div class="feedback" id="fb"></div></div>`;speak(pair.from);},

  syllable(pool){const s=rand(pool);
    $('gameArea').innerHTML=`<div class="card"><div class="prompt">
      <div class="instruction">Say it and clap. How many syllables?</div>
      <div class="big-target word-target">${s.w}<button class="speak-btn" onclick="speak('${s.w}')" aria-label="hear ${s.w}">${SPKR}</button></div></div>
      <div class="options three">${[1,2,3].map(n=>`<button class="opt" onclick="Game.pickNumber(this,${n},${s.n})">${n}<small>${'👏'.repeat(n)}</small></button>`).join('')}</div>
      <div class="feedback" id="fb"></div></div>`;speak(s.w);}
};

/* ---------------- Game controller ---------------- */
const Game={
  deck:null,round:0,total:10,correct:0,locked:false,
  home(){speechSynthesis&&speechSynthesis.cancel();$('home').classList.add('active');
    $('game').classList.remove('active');$('lessonIntro').classList.remove('active');},
  launch(kind,id){
    this.deck = kind==='L' ? LESSONS.find(l=>l.id===id) : GAMES.find(g=>g.id===id);
    this.total = this.deck.stages ? this.deck.stages.reduce((a,s)=>a+s.rounds,0) : 10;
    this.round=0;this.correct=0;
    if(this.deck.intro){$('home').classList.remove('active');$('lessonIntro').classList.add('active');renderIntro(this.deck);return;}
    $('home').classList.remove('active');$('game').classList.add('active');this.next();
  },
  begin(){$('lessonIntro').classList.remove('active');$('game').classList.add('active');this.next();},
  currentStage(){
    if(!this.deck.stages)return{engine:this.deck.engine,pool:this.deck.pool,label:null};
    let acc=0;for(const s of this.deck.stages){acc+=s.rounds;if(this.round<=acc)return s;}
    return this.deck.stages[this.deck.stages.length-1];
  },
  next(){this.locked=false;this.round++;
    if(this.round>this.total){this.finish();return;}
    const stage=this.currentStage();
    $('progress').textContent=this.round+' / '+this.total+(stage.label?' · '+stage.label:'');
    ENGINES[stage.engine].call(ENGINES,stage.pool);},
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
  doMagic(shortW,longW,mean){
    if(this.locked)return;this.locked=true;
    const w=$('mword');w.classList.add('show-e');w.querySelector('.vowel').style.color='#9b6cf0';
    $('mmean').textContent=mean;$('addBtn').disabled=true;setTimeout(()=>speak(longW),350);
    this.good(shortW+' → '+longW+' ✨');this.win();this.showNext();
  },
  finish(){
    const pct=Math.round(this.correct/this.total*100);
    const msg=pct===100?'Perfect! You’re a Word Pond champion! 🏆':pct>=70?'Great job! Keep leaping! 🐸':'Nice try — practice makes it easier! 💪';
    const P='M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z';
    let row='';
    for(let i=1;i<=this.total;i++){
      row += i<=this.correct
        ? `<svg class="rs earned" style="animation-delay:${(i-1)*90}ms" viewBox="0 0 24 24" fill="#ffc93c"><path d="${P}"/></svg>`
        : `<svg class="rs" viewBox="0 0 24 24" fill="none" stroke="#d9cfae" stroke-width="1.7"><path d="${P}"/></svg>`;
    }
    $('gameArea').innerHTML=`<div class="card done-card"><h2>All done!</h2>
      <div class="star-row">${row}</div>
      <div class="score-caption">${this.correct} out of ${this.total} stars</div>
      <p>${msg}</p>
      <button class="next-btn" onclick="Game.replay()">Play again</button>
      <button class="back" style="margin-top:12px" onclick="Game.home()">Back to menu</button></div>`;
    if(pct===100)addStar(2);
  },
  replay(){this.round=0;this.correct=0;this.next();},
  showNext(){const label=this.round>=this.total?'See my stars →':'Next →';
    $('gameArea').querySelector('.card').insertAdjacentHTML('beforeend',`<button class="next-btn" onclick="Game.next()">${label}</button>`);}
};

loadSave();
$('starCount').textContent=stars;
renderMenu();
