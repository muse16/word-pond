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
const BLENDS=['bland','slump','grunt','trust','cramp','branch','slept','frost','grand','plant','print','spend','craft'];
const WORDCHANGE=[
  {from:'plan',to:'plant',note:'add t at the end → nt blend'},
  {from:'plum',to:'plump',note:'add p before the end → mp blend'},
  {from:'ban',to:'band',note:'add d at the end → nd blend'},
  {from:'win',to:'wind',note:'add d at the end → nd blend'},
  {from:'ten',to:'tent',note:'add t at the end → nt blend'},
  {from:'top',to:'stop',note:'add s at the start → st blend'},
  {from:'ramp',to:'cramp',note:'add c at the start → cr blend'},
  {from:'rip',to:'trip',note:'add t at the start → tr blend'}];
const YWORDS=['my','cry','try','dry','by','sky','fly','shy'];
const YCHANGE=[
  {from:'dry',to:'pry'},
  {from:'pry',to:'fry'},
  {from:'fry',to:'try'},
  {from:'try',to:'cry'},
  {from:'sky',to:'shy'},
  {from:'by',to:'my'}];
const SPLIT=[
  {w:'picnic', parts:['pic','nic']},
  {w:'insect', parts:['in','sect']},
  {w:'kitten', parts:['kit','ten']},
  {w:'magnet', parts:['mag','net']},
  {w:'napkin', parts:['nap','kin']},
  {w:'rabbit', parts:['rab','bit']},
  {w:'contest', parts:['con','test']},
  {w:'suntan', parts:['sun','tan']}];
const GUESSWORDS=[
  {from:'pup...pet', to:'puppet'},
  {from:'pil...grim', to:'pilgrim'},
  {from:'rab...bit', to:'rabbit'},
  {from:'hap...pen', to:'happen'},
  {from:'mag...net', to:'magnet'}];
const THREEBLENDS=['split','strong','string','scrap','spring','scrub','stress','splash','scram',
  'scratch','splat','sprout','strap'];
/* High-frequency "heart words" — many don't follow regular phonics rules, so they're
   practiced by sight rather than sounded out. This is the standard Dolch pre-primer +
   primer + first-grade word lists (133 words, the widely used baseline for "first
   grade sight words"), plus 4 commonly-taught harder/irregular words (been, does,
   should, would) that many first-grade programs introduce early even though Dolch
   classifies them a level up. 137 words total. */
const SIGHTWORDS=[
  // Dolch pre-primer (40)
  'a','and','away','big','blue','can','come','down','find','for','funny','go','help',
  'here','i','in','is','it','jump','little','look','make','me','my','not','one','play',
  'red','run','said','see','the','three','to','two','up','we','where','yellow','you',
  // Dolch primer (52)
  'all','am','are','at','ate','be','black','brown','but','came','did','do','eat','four',
  'get','good','have','he','into','like','must','new','no','now','on','our','out',
  'please','pretty','ran','ride','saw','say','she','so','soon','that','there','they',
  'this','too','under','want','was','well','went','what','white','who','will','with','yes',
  // Dolch first grade (41)
  'after','again','an','any','as','ask','by','could','every','fly','from','give','going',
  'had','has','her','him','his','how','just','know','let','live','may','of','old','once',
  'open','over','put','round','some','stop','take','thank','them','then','think','walk',
  'were','when',
  // extra harder/irregular words commonly taught in first grade
  'been','does','should','would'];
const GUESS10=[
  {from:'o...pen', to:'open'},
  {from:'pre...tend', to:'pretend'},
  {from:'be...gan', to:'began'},
  {from:'e...ven', to:'even'},
  {from:'be...gin', to:'begin'},
  {from:'be...long', to:'belong'},
  {from:'si...lent', to:'silent'},
  {from:'bro...ken', to:'broken'},
  {from:'stu...dent', to:'student'},
  {from:'ze...ro', to:'zero'},
  {from:'ro...bot', to:'robot'},
  {from:'fro...zen', to:'frozen'},
  {from:'de...mand', to:'demand'}];

/* =========================================================
   LESSONS — add one card here for each topic sent from the
   Teacher's Manual. Each lesson = {id, n, title, emoji, cls, engine, pool}
   for a single-activity lesson, OR {id, n, title, emoji, cls, stages:[...]}
   for a multi-activity lesson (each stage = {engine, pool, rounds, label}).
   Engines: 'review'(word array), 'phonogram'({focus:[keys],all:PHONOGRAMS}),
            'magic'(MAGIC subset), 'ed'(ED), 'contraction'(subset),
            'syllable'(subset), 'syllabletype'(OPENCLOSED subset),
            'wordchange'(array of {from,to,note}, OR {instruction, pairs:[{from,to}]}
              to customize the prompt text — see YCHANGE/L4 for an example),
            'syllablesplit'(array of {w, parts:[p1,p2]} — student picks the correctly
              hyphenated split, e.g. "pic-nic"; wrong-split distractors are generated
              automatically from other letter positions in the word),
            'sightword'(flat word array — no multiple choice; the word is shown, the
              child reads it aloud, and self-reports "I read it!" or "Still tricky")
   An optional `intro` object shows a teaching screen before practice starts:
   {topic, lines:[...], words:[...] (optional tap-to-hear list), trick:{title,points:[...]} (optional)}
   See README.md for the full guide on adding a lesson.
   ========================================================= */
let LESSONS=[
  {id:'L1', n:1, title:'Open & Closed Syllables', emoji:'🚪', cls:'c-review', engine:'syllabletype', pool:OPENCLOSED},
  {id:'L2', n:2, title:'Beginning & End Blends', emoji:'🧩', cls:'c-ed',
    intro:{
      topic:'Blends at the beginning AND the end',
      lines:[
        'Some words have two consonants that team up and blend their sounds together — sometimes right at the start, sometimes right at the end, and sometimes both! Say each one slow, then fast.',
        'Now watch what happens when we add a blend to a smaller word: <b>plan</b> → <b>plant</b> (add a t at the end). <b>plum</b> → <b>plump</b> (add a p before the end). In the practice, you\'ll change words just like this.'
      ],
      words:['bland','slump','grunt','trust','cramp'],
      review:['branch','slept','frost','grand','plant','print','spend','trust','craft'],
      trick:{
        title:'Two tricky words',
        points:[
          {w:'you', note:'the letters y and ou team up to say “oo”'},
          {w:'are', note:'ar says its own sound — the e at the end is silent'}
        ]
      }
    },
    stages:[
      {engine:'review', pool:BLENDS, rounds:6, label:'Find the Blend Word'},
      {engine:'wordchange', pool:WORDCHANGE, rounds:4, label:'Change the Word'}
    ]
  },
  {id:'L4', n:4, title:'The Four Sounds of Y', emoji:'🔤', cls:'c-magic',
    intro:{
      topic:'Phonogram Y — four sounds, one letter',
      lines:[
        'Y is a phonogram with four sounds: the consonant /y/ like in <b>yarn</b>, short i like in <b>gym</b>, long i like in <b>my</b>, and long e like in <b>happy</b>. Y is unusual because it can be a consonant sound or a vowel sound.',
        'Handy rule: at the end of a one-syllable word, y almost always says its long i sound. Say these slow, then fast — you\'ll hear the i.',
        'Now play Change the Word again: dry → pry → fry → try... keep the chain going!'
      ],
      words:['yarn','gym','my','happy'],
      review:['by','fly','try','cry','my','shy','dry','sky'],
      trick:{
        title:'Tricky word: from',
        points:[
          {w:'from', note:'the o says “uh” like in drum — not its usual short o sound'}
        ]
      }
    },
    stages:[
      {engine:'review', pool:YWORDS, rounds:6, label:'Find the Y Word'},
      {engine:'wordchange', pool:{instruction:'Change the word! Swap the beginning sound to make a new -y word.', pairs:YCHANGE}, rounds:4, label:'Change the Word'}
    ]
  },
  {id:'L6', n:6, title:'Splitting Words into Syllables', emoji:'✂️', cls:'c-syll',
    intro:{
      topic:'Two rules for splitting a word',
      lines:[
        'Rule 1 — compound words: split right between the two smaller words. <b>suntan</b> is sun + tan — two whole words stuck together.',
        'Rule 2 — two consonants between two vowels: split right between those two consonants. <b>napkin</b> becomes nap + kin.',
        'Try the pause trick with <b>problem</b>: say it slow — prob...lem. It splits right between the b and the l. Always pause between syllables when you practice.'
      ],
      words:['suntan','napkin','problem'],
      review:['picnic','insect','kitten','magnet','napkin','rabbit','contest'],
      trick:{
        title:'Tricky word: have',
        points:[
          {w:'have', note:'the e is silent, but it does NOT make the a say its long sound — say a short a, like “I have six fish.”'}
        ]
      }
    },
    stages:[
      {engine:'syllablesplit', pool:SPLIT, rounds:6, label:'Split the Word'},
      {engine:'wordchange', pool:{instruction:'Guess What I\'m Saying! Blend the parts into one word.', pairs:GUESSWORDS}, rounds:4, label:'Guess What I\'m Saying'}
    ]
  },
  {id:'L8', n:8, title:'Three-Letter Blends', emoji:'🔗', cls:'c-sound',
    intro:{
      topic:'Three-Letter Blends',
      lines:[
        'You already learned two-letter blends. This lesson zooms in on blends made of three consonants grouped together at the start of a word.',
        'There are only four common initial three-letter blends to start with: <b>scr</b> like in scrap, <b>spl</b> like in split, <b>spr</b> like in spring, <b>str</b> like in strong.'
      ],
      words:['scrap','split','spring','strong'],
      review:['scrub','scram','scratch','splash','splat','sprout','string','stress','strap'],
      trick:{
        title:'Leap word: her',
        points:[
          {w:'her', note:'the e and r work together to make the “er” sound — we haven’t studied this sound yet, so “her” is a leap word. Say it in a sentence: her dress is red.'}
        ]
      }
    },
    engine:'review', pool:THREEBLENDS
  },
  {id:'L10', n:10, title:'Multisyllable Words: Open + Closed', emoji:'🧲', cls:'c-contr',
    intro:{
      topic:'Two syllables, two syllable types',
      lines:[
        'Remember open and closed syllables from Lesson 1? Longer words are often built from one open syllable (ends in a vowel — long sound) and one closed syllable (ends in a consonant — short sound) stuck together.',
        'Play Guess What I\'m Saying: say each part slow with a pause, then blend them into the whole word. <b>o...pen</b> → open. <b>ze...ro</b> → zero.'
      ],
      words:['open','zero','robot'],
      review:['open','pretend','began','even','begin','belong','silent','broken','student','zero']
    },
    engine:'wordchange', pool:{instruction:'Guess What I\'m Saying! Blend the parts into one word.', pairs:GUESS10}
  }
];

/* Extra-practice general games (toggle in panel) */
const GAMES=[
  {id:'syllable', name:'Clap It Out', emoji:'👏', cls:'c-syll', sub:'How many syllables?', engine:'syllable', pool:SYLLABLES, on:true,  hint:'Counting syllables. — Early lessons'},
  {id:'phonics',  name:'Phonogram Find', emoji:'🐸', cls:'c-phon', sub:'Which word has the sound?', engine:'phonogram', pool:{all:CONSPHON}, on:true, hint:'Consonant phonograms: nk, ng, ck, ch, th, qu. — Lesson 1 review'},
  {id:'sound',    name:'Sound Match', emoji:'🔊', cls:'c-sound', sub:'Find the word with the sound.', engine:'phonogram', pool:{all:PHONOGRAMS}, on:false, hint:'Vowel phonograms (ee, ar, or, oy, oi, aw, ow, ou, wh, er). — Later lessons'},
  {id:'magic',    name:'Magic E', emoji:'✨', cls:'c-magic', sub:'Add an E, change the word!', engine:'magic', pool:MAGIC, on:false, hint:'Silent E makes a short vowel say its long sound.'},
  {id:'ed',       name:'-ed Endings', emoji:'🏁', cls:'c-ed', sub:'Sort by the -ed sound.', engine:'ed', pool:ED, on:false, hint:'The three sounds of -ed: /t/, /d/, /id/.'},
  {id:'contraction', name:'Squish It', emoji:'🤝', cls:'c-contr', sub:'Two words into one.', engine:'contraction', pool:CONTRACTIONS, on:false, hint:'Contractions like do not → don’t.'},
  {id:'sight', name:'Sight Word Flash', emoji:'⚡', cls:'c-review', sub:'Read it out loud!', engine:'sightword', pool:SIGHTWORDS, on:true, hint:'High-frequency "heart words" that don\'t follow regular phonics rules — read by sight, not by sounding out.'}
];
