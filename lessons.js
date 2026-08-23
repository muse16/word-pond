/* ---------------- Word data ----------------
   All practice words below are original/generic phonics content
   (not copied from any curriculum). Safe to expand freely. */
const REVIEW=['cat','dog','run','big','hen','map','sit','fox','bug','net','pig','cup','red','top','sun','bat',
  'stop','frog','clap','hand','jump','milk','desk','lamp','sled','flag','drum','nest','swim','crab','grin','spot'];
const PHONOGRAMS={
  'ee':['bee','tree','sheep','green','feet','sweet','queen','three'],
  'ar':['car','farm','star','arm','park','shark','hard','yard'],
  'or':['fork','corn','horse','storm','north','born','torch','porch'],
  'oy':['boy','toy','joy','enjoy','royal','loyal'],
  'oi':['oil','coin','boil','soil','point','join','spoil'],
  'aw':['saw','paw','draw','claw','lawn','straw','crawl','dawn'],
  'ow':['cow','how','owl','town','brown','flower','clown','crown'],
  'ou':['out','loud','cloud','round','mouth','house','sound','found'],
  'wh':['when','what','wheel','white','whale','which','wheat','whisk'],
  'er':['her','fern','herd','water','sister','under','winter','ladder']};
const CONSPHON={
  'nk':['bank','pink','sink','junk','wink','honk','dunk','tank','rink','bunk'],
  'ng':['ring','sing','king','song','wing','long','rung','hang','bang','bring'],
  'ck':['back','duck','sock','rock','kick','lock','pick','sack','truck','clock'],
  'ch':['chin','chip','chop','much','rich','chat','chest','chomp','munch','chill'],
  'th':['this','that','then','bath','math','with','moth','path','thin','cloth'],
  'qu':['quit','quiz','quilt','quill','quest','queen','quiet','squid','quip','squint']};
const ED={'/t/':['jumped','chipped','walked','kissed','washed','picked','hoped','laughed'],
  '/d/':['snowed','played','rained','cleaned','filled','buzzed','called','opened'],
  '/id/':['wanted','needed','landed','painted','planted','hunted','melted','started']};
const MAGIC=[{short:'cap',long:'cape',v:1,mean:'a hat → a cape you wear'},{short:'hop',long:'hope',v:1,mean:'to jump → to wish for'},
  {short:'kit',long:'kite',v:1,mean:'a set → a kite in the sky'},{short:'tub',long:'tube',v:1,mean:'a bath tub → a tube'},
  {short:'pin',long:'pine',v:1,mean:'a sharp pin → a pine tree'},{short:'cub',long:'cube',v:1,mean:'a baby bear → an ice cube'},
  {short:'tap',long:'tape',v:1,mean:'to tap → sticky tape'},{short:'rob',long:'robe',v:1,mean:'to rob → a cozy robe'},
  {short:'cut',long:'cute',v:1,mean:'to cut → very cute'},{short:'rip',long:'ripe',v:1,mean:'to rip → a ripe apple'},
  {short:'man',long:'mane',v:1,mean:'a man → a lion’s mane'},{short:'not',long:'note',v:1,mean:'not → a note you write'}];
const CONTRACTIONS=[{two:'do not',one:"don't"},{two:'I am',one:"I'm"},{two:'can not',one:"can't"},{two:'it is',one:"it's"},
  {two:'we are',one:"we're"},{two:'you are',one:"you're"},{two:'I will',one:"I'll"},{two:'is not',one:"isn't"},
  {two:'did not',one:"didn't"},{two:'let us',one:"let's"},{two:'they are',one:"they're"},{two:'we will',one:"we'll"}];
const OPENCLOSED=[
  {w:'me',t:'open'},{w:'go',t:'open'},{w:'hi',t:'open'},{w:'she',t:'open'},{w:'we',t:'open'},
  {w:'no',t:'open'},{w:'so',t:'open'},{w:'be',t:'open'},{w:'my',t:'open'},{w:'fly',t:'open'},
  {w:'sky',t:'open'},{w:'flu',t:'open'},
  {w:'cat',t:'closed'},{w:'dog',t:'closed'},{w:'sun',t:'closed'},{w:'hit',t:'closed'},{w:'red',t:'closed'},
  {w:'map',t:'closed'},{w:'big',t:'closed'},{w:'top',t:'closed'},{w:'bed',t:'closed'},{w:'run',t:'closed'},
  {w:'cup',t:'closed'},{w:'net',t:'closed'},{w:'pig',t:'closed'},{w:'hot',t:'closed'}];
const SYLLABLES=[{w:'rabbit',n:2},{w:'sunset',n:2},{w:'napkin',n:2},{w:'basket',n:2},{w:'picnic',n:2},{w:'muffin',n:2},
  {w:'kitten',n:2},{w:'magnet',n:2},{w:'cat',n:1},{w:'dog',n:1},{w:'ship',n:1},{w:'frog',n:1},
  {w:'umbrella',n:3},{w:'butterfly',n:3},{w:'fantastic',n:3},{w:'banana',n:3}];

/* =========================================================
   LESSONS — add one card here for each topic sent from the
   Teacher's Manual. Each lesson = {id, n, title, emoji, cls, engine, pool}.
   Engines: 'review'(word array), 'phonogram'({focus:[keys],all:PHONOGRAMS}),
            'magic'(MAGIC subset), 'ed'(ED), 'contraction'(subset),
            'syllable'(subset), 'syllabletype'(OPENCLOSED subset)
   See README.md for the full guide on adding a lesson.
   ========================================================= */
let LESSONS=[
  {id:'L1', n:1, title:'Open & Closed Syllables', emoji:'🚪', cls:'c-review', engine:'syllabletype', pool:OPENCLOSED}
];

/* Extra-practice general games (toggle in panel) */
const GAMES=[
  {id:'syllable', name:'Clap It Out', emoji:'👏', cls:'c-syll', sub:'How many syllables?', engine:'syllable', pool:SYLLABLES, on:true,  hint:'Counting syllables. — Early lessons'},
  {id:'phonics',  name:'Phonogram Find', emoji:'🐸', cls:'c-phon', sub:'Which word has the sound?', engine:'phonogram', pool:{all:CONSPHON}, on:true, hint:'Consonant phonograms: nk, ng, ck, ch, th, qu. — Lesson 1 review'},
  {id:'sound',    name:'Sound Match', emoji:'🔊', cls:'c-sound', sub:'Find the word with the sound.', engine:'phonogram', pool:{all:PHONOGRAMS}, on:false, hint:'Vowel phonograms (ee, ar, or, oy, oi, aw, ow, ou, wh, er). — Later lessons'},
  {id:'magic',    name:'Magic E', emoji:'✨', cls:'c-magic', sub:'Add an E, change the word!', engine:'magic', pool:MAGIC, on:false, hint:'Silent E makes a short vowel say its long sound.'},
  {id:'ed',       name:'-ed Endings', emoji:'🏁', cls:'c-ed', sub:'Sort by the -ed sound.', engine:'ed', pool:ED, on:false, hint:'The three sounds of -ed: /t/, /d/, /id/.'},
  {id:'contraction', name:'Squish It', emoji:'🤝', cls:'c-contr', sub:'Two words into one.', engine:'contraction', pool:CONTRACTIONS, on:false, hint:'Contractions like do not → don’t.'}
];
