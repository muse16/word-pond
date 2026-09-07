/* ---------------- Word data ----------------
   All practice words below are original/generic phonics content
   (not copied from any curriculum). Safe to expand freely.
   Every pool below is sized to at least cover a 25-question, no-repeat
   session for whichever game/lesson draws from it (see README for how
   session round counts map to pool size requirements). */
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
const ED={'/t/':['jumped','chipped','walked','kissed','washed','picked','hoped','laughed','hopped','watched'],
  '/d/':['snowed','played','rained','cleaned','filled','buzzed','called','opened','loved','smiled'],
  '/id/':['wanted','needed','landed','painted','planted','hunted','melted','started','rested','lifted']};
const MAGIC=[{short:'cap',long:'cape',v:1,mean:'a hat → a cape you wear'},{short:'hop',long:'hope',v:1,mean:'to jump → to wish for'},
  {short:'kit',long:'kite',v:1,mean:'a set → a kite in the sky'},{short:'tub',long:'tube',v:1,mean:'a bath tub → a tube'},
  {short:'pin',long:'pine',v:1,mean:'a sharp pin → a pine tree'},{short:'cub',long:'cube',v:1,mean:'a baby bear → an ice cube'},
  {short:'tap',long:'tape',v:1,mean:'to tap → sticky tape'},{short:'rob',long:'robe',v:1,mean:'to rob → a cozy robe'},
  {short:'cut',long:'cute',v:1,mean:'to cut → very cute'},{short:'rip',long:'ripe',v:1,mean:'to rip → a ripe apple'},
  {short:'man',long:'mane',v:1,mean:'a man → a lion’s mane'},{short:'not',long:'note',v:1,mean:'not → a note you write'},
  {short:'fin',long:'fine',v:1,mean:'a fish’s fin → I feel fine'},{short:'hid',long:'hide',v:1,mean:'you hid it → now hide again'},
  {short:'dim',long:'dime',v:1,mean:'a dim light → a shiny dime'},{short:'plan',long:'plane',v:2,mean:'make a plan → fly on a plane'},
  {short:'shin',long:'shine',v:2,mean:'your shin bone → let it shine'},{short:'twin',long:'twine',v:2,mean:'a twin sister → wrap it in twine'},
  {short:'strip',long:'stripe',v:3,mean:'a strip of paper → a striped shirt'},{short:'slid',long:'slide',v:2,mean:'she slid → down the slide'},
  {short:'spin',long:'spine',v:2,mean:'spin around → your backbone is your spine'},{short:'pan',long:'pane',v:1,mean:'a frying pan → a window pane'},
  {short:'rid',long:'ride',v:1,mean:'get rid of it → take a ride'},{short:'bit',long:'bite',v:1,mean:'a little bit → take a bite'},
  {short:'glob',long:'globe',v:2,mean:'a glob of paint → a globe of the world'},{short:'quit',long:'quite',v:2,mean:'don’t quit → you’re quite good!'}];
const CONTRACTIONS=[{two:'do not',one:"don't"},{two:'I am',one:"I'm"},{two:'can not',one:"can't"},{two:'it is',one:"it's"},
  {two:'we are',one:"we're"},{two:'you are',one:"you're"},{two:'I will',one:"I'll"},{two:'is not',one:"isn't"},
  {two:'did not',one:"didn't"},{two:'let us',one:"let's"},{two:'they are',one:"they're"},{two:'we will',one:"we'll"},
  {two:'he is',one:"he's"},{two:'she is',one:"she's"},{two:'does not',one:"doesn't"},{two:'was not',one:"wasn't"},
  {two:'were not',one:"weren't"},{two:'has not',one:"hasn't"},{two:'have not',one:"haven't"},{two:'will not',one:"won't"},
  {two:'that is',one:"that's"},{two:'what is',one:"what's"},{two:'here is',one:"here's"},{two:'there is',one:"there's"},
  {two:'who is',one:"who's"},{two:'I have',one:"I've"},{two:'you have',one:"you've"}];
const OPENCLOSED=[
  {w:'me',t:'open'},{w:'go',t:'open'},{w:'hi',t:'open'},{w:'she',t:'open'},{w:'we',t:'open'},
  {w:'no',t:'open'},{w:'so',t:'open'},{w:'be',t:'open'},{w:'my',t:'open'},{w:'fly',t:'open'},
  {w:'sky',t:'open'},{w:'flu',t:'open'},
  {w:'cat',t:'closed'},{w:'dog',t:'closed'},{w:'sun',t:'closed'},{w:'hit',t:'closed'},{w:'red',t:'closed'},
  {w:'map',t:'closed'},{w:'big',t:'closed'},{w:'top',t:'closed'},{w:'bed',t:'closed'},{w:'run',t:'closed'},
  {w:'cup',t:'closed'},{w:'net',t:'closed'},{w:'pig',t:'closed'},{w:'hot',t:'closed'}];
const SYLLABLES=[{w:'rabbit',n:2},{w:'sunset',n:2},{w:'napkin',n:2},{w:'basket',n:2},{w:'picnic',n:2},{w:'muffin',n:2},
  {w:'kitten',n:2},{w:'magnet',n:2},{w:'cat',n:1},{w:'dog',n:1},{w:'ship',n:1},{w:'frog',n:1},
  {w:'umbrella',n:3},{w:'butterfly',n:3},{w:'fantastic',n:3},{w:'banana',n:3},
  {w:'bell',n:1},{w:'shoe',n:1},{w:'candle',n:2},{w:'pencil',n:2},{w:'monkey',n:2},{w:'tiger',n:2},
  {w:'garden',n:2},{w:'elephant',n:3},{w:'dinosaur',n:3}];
const BLENDS=['bland','slump','grunt','trust','cramp','branch','slept','frost','grand','plant','print','spend','craft',
  'twist','clamp','swept','blast','crisp','flask','grasp','stunt','blend','drift','stand','crust'];
const WORDCHANGE=[
  {from:'plan',to:'plant',note:'add t at the end → nt blend'},
  {from:'plum',to:'plump',note:'add p before the end → mp blend'},
  {from:'ban',to:'band',note:'add d at the end → nd blend'},
  {from:'win',to:'wind',note:'add d at the end → nd blend'},
  {from:'ten',to:'tent',note:'add t at the end → nt blend'},
  {from:'top',to:'stop',note:'add s at the start → st blend'},
  {from:'ramp',to:'cramp',note:'add c at the start → cr blend'},
  {from:'rip',to:'trip',note:'add t at the start → tr blend'},
  {from:'pin',to:'spin',note:'add s at the start → sp blend'},
  {from:'lap',to:'clap',note:'add c at the start → cl blend'},
  {from:'rust',to:'crust',note:'add c at the start → cr blend'},
  {from:'ran',to:'rant',note:'add t at the end → nt blend'},
  {from:'pan',to:'plan',note:'add l at the start → pl blend'},
  {from:'dip',to:'drip',note:'add r at the start → dr blend'},
  {from:'rag',to:'drag',note:'add d at the start → dr blend'},
  {from:'pot',to:'spot',note:'add s at the start → sp blend'},
  {from:'lot',to:'slot',note:'add s at the start → sl blend'},
  {from:'lid',to:'slid',note:'add s at the start → sl blend'},
  {from:'rack',to:'track',note:'add t at the start → tr blend'},
  {from:'rim',to:'trim',note:'add t at the start → tr blend'},
  {from:'lack',to:'black',note:'add b at the start → bl blend'},
  {from:'low',to:'slow',note:'add s at the start → sl blend'},
  {from:'an',to:'ant',note:'add t at the end → nt blend'},
  {from:'en',to:'end',note:'add d at the end → nd blend'},
  {from:'rot',to:'trot',note:'add t at the start → tr blend'},
  {from:'rick',to:'trick',note:'add t at the start → tr blend'}];
const YWORDS=['my','cry','try','dry','by','sky','fly','shy','fry','ply','pry','sly','spy','sty','why','guy'];
const YCHANGE=[
  {from:'dry',to:'pry'},{from:'pry',to:'fry'},{from:'fry',to:'try'},{from:'try',to:'cry'},
  {from:'sky',to:'shy'},{from:'by',to:'my'},{from:'cry',to:'fry'},{from:'fry',to:'fly'},
  {from:'fly',to:'ply'},{from:'ply',to:'pry'},{from:'spy',to:'sky'},{from:'sky',to:'sly'},
  {from:'sly',to:'shy'},{from:'shy',to:'sty'},{from:'sty',to:'spy'},{from:'why',to:'shy'},
  {from:'try',to:'fry'},{from:'my',to:'by'},{from:'dry',to:'try'},{from:'shy',to:'sky'}];
const SPLIT=[
  {w:'picnic', parts:['pic','nic']},
  {w:'insect', parts:['in','sect']},
  {w:'kitten', parts:['kit','ten']},
  {w:'magnet', parts:['mag','net']},
  {w:'napkin', parts:['nap','kin']},
  {w:'rabbit', parts:['rab','bit']},
  {w:'contest', parts:['con','test']},
  {w:'suntan', parts:['sun','tan']},
  {w:'basket', parts:['bas','ket']},
  {w:'muffin', parts:['muf','fin']},
  {w:'publish', parts:['pub','lish']},
  {w:'velvet', parts:['vel','vet']},
  {w:'goblin', parts:['gob','lin']},
  {w:'cactus', parts:['cac','tus']},
  {w:'tennis', parts:['ten','nis']},
  {w:'mitten', parts:['mit','ten']},
  {w:'dentist', parts:['den','tist']},
  {w:'combat', parts:['com','bat']},
  {w:'helmet', parts:['hel','met']},
  {w:'carpet', parts:['car','pet']},
  {w:'cobweb', parts:['cob','web']},
  {w:'pancake', parts:['pan','cake']},
  {w:'sandbox', parts:['sand','box']},
  {w:'catfish', parts:['cat','fish']},
  {w:'sunset', parts:['sun','set']}];
const GUESSWORDS=[
  {from:'pup...pet', to:'puppet'},
  {from:'pil...grim', to:'pilgrim'},
  {from:'rab...bit', to:'rabbit'},
  {from:'hap...pen', to:'happen'},
  {from:'mag...net', to:'magnet'},
  {from:'sud...den', to:'sudden'},
  {from:'but...ton', to:'button'},
  {from:'din...ner', to:'dinner'},
  {from:'hid...den', to:'hidden'},
  {from:'prob...lem', to:'problem'},
  {from:'sig...nal', to:'signal'},
  {from:'ob...ject', to:'object'},
  {from:'traf...fic', to:'traffic'},
  {from:'sis...ter', to:'sister'},
  {from:'win...ter', to:'winter'},
  {from:'af...ter', to:'after'},
  {from:'dol...lar', to:'dollar'},
  {from:'lad...der', to:'ladder'},
  {from:'ham...mer', to:'hammer'},
  {from:'hap...py', to:'happy', say:'hap, pee'},
  {from:'rock...et', to:'rocket', say:'rock, ett'},
  {from:'blan...ket', to:'blanket'},
  {from:'trum...pet', to:'trumpet'},
  {from:'pock...et', to:'pocket', say:'pock, ett'},
  {from:'jack...et', to:'jacket', say:'jack, ett'}];
const THREEBLENDS=['split','strong','string','scrap','spring','scrub','stress','splash','scram',
  'scratch','splat','sprout','strap','scream','screen','script','scrape','splinter','splotch',
  'sprint','spray','sprig','stream','stroll','strand'];
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
/* Two-syllable open+closed words for Lesson 10's "Guess What I'm Saying".
   `from` is what the CHILD SEES; `say` is what the BROWSER SPEAKS.
   They differ on purpose: browser text-to-speech runs letter-to-sound rules over a
   bare syllable, so an open syllable like "ro" comes out with a SHORT o ("rah-bot")
   -- the exact opposite of the long vowel this lesson teaches. Respelling each open
   syllable as a real word the voice already knows ("roe", "bee", "sigh", "stew")
   forces the correct long sound. The comma gives a short pause between the parts. */
const GUESS10=[
  {from:'o...pen',    to:'open',    say:'oh, pen'},
  {from:'pre...tend', to:'pretend', say:'pree, tend'},
  {from:'be...gan',   to:'began',   say:'bee, gan'},
  {from:'e...ven',    to:'even',    say:'ee, ven'},
  {from:'be...gin',   to:'begin',   say:'bee, ghin'},
  {from:'be...long',  to:'belong',  say:'bee, long'},
  {from:'si...lent',  to:'silent',  say:'sigh, lent'},
  {from:'bro...ken',  to:'broken',  say:'bro, ken'},
  {from:'stu...dent', to:'student', say:'stew, dent'},
  {from:'ze...ro',    to:'zero',    say:'zee, roe'},
  {from:'ro...bot',   to:'robot',   say:'roe, bot'},
  {from:'fro...zen',  to:'frozen',  say:'fro, zen'},
  {from:'de...mand',  to:'demand',  say:'dee, mand'},
  {from:'ba...sic',   to:'basic',   say:'bay, sick'},
  {from:'i...tem',    to:'item',    say:'eye, tem'},
  {from:'pi...lot',   to:'pilot',   say:'pie, lot'},
  {from:'mo...ment',  to:'moment',  say:'moe, ment'},
  {from:'pro...gram', to:'program', say:'pro, gram'},
  {from:'hu...mid',   to:'humid',   say:'hue, mid'},
  {from:'mu...sic',   to:'music',   say:'mew, sick'},
  {from:'ti...ger',   to:'tiger',   say:'tie, gurr'},
  {from:'pa...per',   to:'paper',   say:'pay, per'},
  {from:'mo...tel',   to:'motel',   say:'moe, tell'},
  {from:'to...tal',   to:'total',   say:'toe, tal'},
  {from:'fi...nal',   to:'final',   say:'fie, nal'}];

/* Lesson 12 -- Syllable Division Rule for One Consonant Tile, Part 2.
   Each entry holds BOTH plausible splits of a VCV word. `open` sends the single
   consonant (or consonant team) to the SECOND syllable, which leaves the first
   syllable open and its vowel long. `closed` slides that consonant back to the
   FIRST syllable, closing it and making the vowel short. `correct` names the one
   that is a real word -- which is exactly the test the child is taught to apply:
   split it, say it, and ask whether it sounds like a real word.
   Consonant teams (ck, nk) are never split, so for those words the `open` option
   is the precise mistake this lesson warns about ("po-cket"). The pool mixes both
   answers on purpose -- 18 closed, 13 open -- so neither becomes the safe guess. */
const VCV12=[
  {w:'robin',   open:'ro-bin',    closed:'rob-in',   correct:'closed'},
  {w:'cabin',   open:'ca-bin',    closed:'cab-in',   correct:'closed'},
  {w:'habit',   open:'ha-bit',    closed:'hab-it',   correct:'closed'},
  {w:'finish',  open:'fi-nish',   closed:'fin-ish',  correct:'closed'},
  {w:'limit',   open:'li-mit',    closed:'lim-it',   correct:'closed'},
  {w:'planet',  open:'pla-net',   closed:'plan-et',  correct:'closed'},
  {w:'visit',   open:'vi-sit',    closed:'vis-it',   correct:'closed'},
  {w:'seven',   open:'se-ven',    closed:'sev-en',   correct:'closed'},
  {w:'radish',  open:'ra-dish',   closed:'rad-ish',  correct:'closed'},
  {w:'lemon',   open:'le-mon',    closed:'lem-on',   correct:'closed'},
  {w:'panic',   open:'pa-nic',    closed:'pan-ic',   correct:'closed'},
  {w:'denim',   open:'de-nim',    closed:'den-im',   correct:'closed'},
  {w:'timid',   open:'ti-mid',    closed:'tim-id',   correct:'closed'},
  {w:'pocket',  open:'po-cket',   closed:'pock-et',  correct:'closed'},
  {w:'rocket',  open:'ro-cket',   closed:'rock-et',  correct:'closed'},
  {w:'jacket',  open:'ja-cket',   closed:'jack-et',  correct:'closed'},
  {w:'cricket', open:'cri-cket',  closed:'crick-et', correct:'closed'},
  {w:'blanket', open:'bla-nket',  closed:'blank-et', correct:'closed'},
  {w:'frozen',  open:'fro-zen',   closed:'froz-en',  correct:'open'},
  {w:'spoken',  open:'spo-ken',   closed:'spok-en',  correct:'open'},
  {w:'begin',   open:'be-gin',    closed:'beg-in',   correct:'open'},
  {w:'silent',  open:'si-lent',   closed:'sil-ent',  correct:'open'},
  {w:'hotel',   open:'ho-tel',    closed:'hot-el',   correct:'open'},
  {w:'relax',   open:'re-lax',    closed:'rel-ax',   correct:'open'},
  {w:'humid',   open:'hu-mid',    closed:'hum-id',   correct:'open'},
  {w:'hero',    open:'he-ro',     closed:'her-o',    correct:'open'},
  {w:'minus',   open:'mi-nus',    closed:'min-us',   correct:'open'},
  {w:'open',    open:'o-pen',     closed:'op-en',    correct:'open'},
  {w:'pilot',   open:'pi-lot',    closed:'pil-ot',   correct:'open'},
  {w:'music',   open:'mu-sic',    closed:'mus-ic',   correct:'open'},
  {w:'robot',   open:'ro-bot',    closed:'rob-ot',   correct:'open'}];
/* Lesson 12's blending stage. Same display/speech split as GUESS10: `from` is what
   the child SEES, `say` is what the browser SPEAKS. Browser text-to-speech runs
   letter-to-sound rules over a bare syllable, so open syllables are respelled as
   words the voice already knows ("hoe", "hee", "my", "hue") to force the long
   vowel, and an unstressed -et ending is doubled to "ett" so it isn't read as a
   long e. The comma gives a short pause between the two parts. */
const GUESS12=[
  {from:'rob...in',   to:'robin',   say:'rob, in'},
  {from:'cab...in',   to:'cabin',   say:'cab, in'},
  {from:'hab...it',   to:'habit',   say:'hab, it'},
  {from:'fin...ish',  to:'finish',  say:'fin, ish'},
  {from:'plan...et',  to:'planet',  say:'plan, ett'},
  {from:'vis...it',   to:'visit',   say:'viz, it'},
  {from:'sev...en',   to:'seven',   say:'sev, en'},
  {from:'rad...ish',  to:'radish',  say:'rad, ish'},
  {from:'pock...et',  to:'pocket',  say:'pock, ett'},
  {from:'jack...et',  to:'jacket',  say:'jack, ett'},
  {from:'crick...et', to:'cricket', say:'krick, ett'},
  {from:'blank...et', to:'blanket', say:'blank, ett'},
  {from:'ho...tel',   to:'hotel',   say:'hoe, tell'},
  {from:'he...ro',    to:'hero',    say:'hee, roe'},
  {from:'mi...nus',   to:'minus',   say:'my, nuss'},
  {from:'hu...mid',   to:'humid',   say:'hue, mid'}];

/* Lesson 14 -- The First Job of Silent E (the vowel-consonant-e pattern).
   Silent E reaches back over one consonant and makes the vowel before it say its
   long sound; take the e away and the vowel snaps back to short. Same {short,
   long, v, mean} shape as MAGIC, where `v` is the index of the vowel inside the
   SHORT word. Every long form here is either one of the lesson's ten Word Cards
   or one of the words the manual builds with tiles (kite, robe, pine, cane). */
const MAGIC14=[
  {short:'at',  long:'ate',  v:0, mean:'look at me → I ate my lunch'},
  {short:'bit', long:'bite', v:1, mean:'a little bit → take a bite'},
  {short:'mad', long:'made', v:1, mean:'feeling mad → I made a robot'},
  {short:'tap', long:'tape', v:1, mean:'to tap → sticky tape'},
  {short:'hat', long:'hate', v:1, mean:'a sun hat → I hate mud'},
  {short:'not', long:'note', v:1, mean:'not now → a note you write'},
  {short:'hop', long:'hope', v:1, mean:'to hop → to wish for'},
  {short:'dim', long:'dime', v:1, mean:'a dim light → a shiny dime'},
  {short:'rid', long:'ride', v:1, mean:'get rid of it → take a ride'},
  {short:'kit', long:'kite', v:1, mean:'a set of tools → a kite in the sky'},
  {short:'rob', long:'robe', v:1, mean:'to rob → a cozy robe'},
  {short:'pin', long:'pine', v:1, mean:'a sharp pin → a pine tree'},
  {short:'can', long:'cane', v:1, mean:'a tin can → a walking cane'},
  {short:'cap', long:'cape', v:1, mean:'a baseball cap → a cape you wear'}];
/* "Kit or Kite?" -- the manual's listening activity, where the only difference
   between the two choices is whether Silent E is doing its job. `w` is the word
   spoken and the right answer; `other` is its minimal pair. Targets deliberately
   alternate between the long and the short member so "pick the one with the e"
   is never a winning strategy. */
const SILENTE14=[
  {w:'ate',  other:'at'},
  {w:'bite', other:'bit'},
  {w:'made', other:'mad'},
  {w:'tape', other:'tap'},
  {w:'hate', other:'hat'},
  {w:'note', other:'not'},
  {w:'hope', other:'hop'},
  {w:'dime', other:'dim'},
  {w:'ride', other:'rid'},
  {w:'kite', other:'kit'},
  {w:'tap',  other:'tape'},
  {w:'hop',  other:'hope'},
  {w:'kit',  other:'kite'},
  {w:'rob',  other:'robe'},
  {w:'pin',  other:'pine'},
  {w:'can',  other:'cane'}];
/* Word Cards 61-70 -- the lesson's Practice Reading Words, exactly as listed in
   the manual. The stage that uses this runs 10 rounds against a 10-word pool, so
   every card comes up once per sitting. Read aloud and self-reported, the way the
   cards are used at the table. */
const CARDS14=['ate','bite','made','tape','time','hate','note','hope','dime','ride'];

/* Lesson 15 -- Name Game Syllables, the third syllable type.
   Closed ends in a consonant (short vowel), open ends in a vowel (long vowel),
   and Name Game is vowel + one consonant + Silent E, where the vowel says its
   name. `t` is 'closed', 'open' or 'name'. Every word is single-syllable so the
   tag applies to the whole word, the way the manual's tags do.
   Deliberately left out: -are and -ore words like care and more. Silent E is
   doing its job there, but r bends the vowel enough that the manual itself flags
   them as regional and suggests teaching them as Leap Words. They still appear in
   the Word Card reading stage, where they are only read, never tagged. */
const SYLTAG15=[
  {w:'cake',  t:'name'},
  {w:'bike',  t:'name'},
  {w:'game',  t:'name'},
  {w:'home',  t:'name'},
  {w:'five',  t:'name'},
  {w:'size',  t:'name'},
  {w:'date',  t:'name'},
  {w:'like',  t:'name'},
  {w:'make',  t:'name'},
  {w:'hide',  t:'name'},
  {w:'joke',  t:'name'},
  {w:'step',  t:'closed'},
  {w:'glop',  t:'closed'},
  {w:'pop',   t:'closed'},
  {w:'thump', t:'closed'},
  {w:'gift',  t:'closed'},
  {w:'smash', t:'closed'},
  {w:'lick',  t:'closed'},
  {w:'went',  t:'closed'},
  {w:'milk',  t:'closed'},
  {w:'hand',  t:'closed'},
  {w:'we',    t:'open'},
  {w:'go',    t:'open'},
  {w:'me',    t:'open'},
  {w:'she',   t:'open'},
  {w:'hi',    t:'open'},
  {w:'so',    t:'open'},
  {w:'no',    t:'open'},
  {w:'my',    t:'open'},
  {w:'be',    t:'open'}];
/* Word Flippers -- the manual's activity where the ending stays put and you flip
   a new letter onto the front. Every pair carries a `hint` naming the exact letter
   to swap, because without it the question has several right answers: "change the
   first sound of cake" is satisfied by bake, lake, take and make alike, and the
   other options shown are drawn from this same list. The hint makes exactly one
   option correct. */
const WORDFLIP15=[
  {from:'cake', to:'bake', hint:'flip the c to a b'},
  {from:'bake', to:'lake', hint:'flip the b to an l'},
  {from:'lake', to:'take', hint:'flip the l to a t'},
  {from:'take', to:'make', hint:'flip the t to an m'},
  {from:'bike', to:'hike', hint:'flip the b to an h'},
  {from:'hike', to:'like', hint:'flip the h to an l'},
  {from:'like', to:'bike', hint:'flip the l to a b'},
  {from:'nine', to:'line', hint:'flip the n to an l'},
  {from:'line', to:'vine', hint:'flip the l to a v'},
  {from:'vine', to:'mine', hint:'flip the v to an m'},
  {from:'hide', to:'side', hint:'flip the h to an s'},
  {from:'side', to:'wide', hint:'flip the s to a w'},
  {from:'wide', to:'ride', hint:'flip the w to an r'},
  {from:'cave', to:'wave', hint:'flip the c to a w'},
  {from:'wave', to:'save', hint:'flip the w to an s'},
  {from:'save', to:'gave', hint:'flip the s to a g'},
  {from:'rope', to:'hope', hint:'flip the r to an h'},
  {from:'hole', to:'pole', hint:'flip the h to a p'},
  {from:'gate', to:'date', hint:'flip the g to a d'},
  {from:'date', to:'late', hint:'flip the d to an l'}];
/* Word Cards 71-79 -- Lesson 15's Practice Reading Words, exactly as listed.
   Nine cards against a nine-round stage, so every card comes up once per sitting. */
const CARDS15=['home','five','size','date','here','more','name','like','make'];

/* Lesson 17 -- Long U's two sounds, and S between two vowels.
   Both halves are the same shape of question ("which sound do you hear?"), so
   both use the `sortsound` engine: {instruction, buckets:[{key,ex,why}], items:
   [{w,k}]} where `k` is the key of the bucket the word belongs in.
   Long u splits into the sound that carries a /y/ (cute, music -- say the letter
   u's name) and the one that has dropped it (rule, June). There is no rule for
   which words do which; the manual's position is that a reader saying the word
   aloud lands on the right one, so this is deliberately an ear question. */
const LONGU17={
  instruction:'Listen to the u. Which long u sound do you hear?',
  buckets:[
    {key:'/\u016b/', ex:'cute', why:'you can hear a little y in it, like the letter u\u2019s name'},
    {key:'/oo/',     ex:'rule', why:'no y sound at all \u2014 the u just says oo'}],
  items:[
    {w:'cute',    k:'/\u016b/'},
    {w:'use',     k:'/\u016b/'},
    {w:'music',   k:'/\u016b/'},
    {w:'mule',    k:'/\u016b/'},
    {w:'unit',    k:'/\u016b/'},
    {w:'fume',    k:'/\u016b/'},
    {w:'uniform', k:'/\u016b/'},
    {w:'cube',    k:'/\u016b/'},
    {w:'huge',    k:'/\u016b/'},
    {w:'human',   k:'/\u016b/'},
    {w:'rule',    k:'/oo/'},
    {w:'rude',    k:'/oo/'},
    {w:'tuna',    k:'/oo/'},
    {w:'dude',    k:'/oo/'},
    {w:'June',    k:'/oo/'},
    {w:'tulip',   k:'/oo/'},
    {w:'flute',   k:'/oo/'},
    {w:'super',   k:'/oo/'},
    {w:'prune',   k:'/oo/'},
    {w:'ruby',    k:'/oo/'}]};
/* S between two vowels usually buzzes as /z/, but not always -- the manual names
   goose, case and house as words that keep the hiss. Weighted 12 to 6 toward /z/
   so the lesson's "most of the time" stays true while the exception still shows
   up often enough to be learned rather than guessed past.
   Every word here has s sitting between two vowels; words where s does anything
   else are not the question this stage is asking. */
const SSOUND17={
  instruction:'The s is between two vowels. Which sound is it making?',
  buckets:[
    {key:'/z/', ex:'nose',  why:'s between two vowels usually buzzes'},
    {key:'/s/', ex:'goose', why:'this one keeps the hissing s even between two vowels'}],
  items:[
    {w:'nose',  k:'/z/'},
    {w:'rose',  k:'/z/'},
    {w:'hose',  k:'/z/'},
    {w:'those', k:'/z/'},
    {w:'these', k:'/z/'},
    {w:'wise',  k:'/z/'},
    {w:'rise',  k:'/z/'},
    {w:'chose', k:'/z/'},
    {w:'use',   k:'/z/'},
    {w:'music', k:'/z/'},
    {w:'pose',  k:'/z/'},
    {w:'muse',  k:'/z/'},
    {w:'goose', k:'/s/'},
    {w:'case',  k:'/s/'},
    {w:'house', k:'/s/'},
    {w:'mouse', k:'/s/'},
    {w:'loose', k:'/s/'},
    {w:'chase', k:'/s/'}]};
/* Word Cards 80-89 -- Lesson 17's Practice Reading Words, exactly as listed.
   Ten cards against a ten-round stage, so every card comes up once per sitting. */
const CARDS17=['use','cute','wise','rule','these','those','nose','June','chose','hose'];

/* Lesson 19 -- phonogram WH, which says /hw/ at the start of a word.
   Every distractor in this stage is itself a wh word, so the round is decided by
   the sounds AFTER the team (whip vs whim vs whiff) rather than by spotting the
   only wh word on screen. That is the discrimination worth drilling here.
   Left out on purpose: who, whose and whole. Those are spelled with wh but the
   w is silent and they say /h/, which is a different phonogram sound this lesson
   does not teach -- including them would contradict the rule being learned. */
const WHWORDS19=['when','while','white','whale','which','why','whip','whim','whiff',
  'wheel','wheat','whisk','whack','whine','whirl','whisper'];
/* The manual's "Change the Word" chain, where one or two tiles move at a time and
   the wh team stays put. Hints are required for the same reason as Lesson 15's
   Word Flippers: the other options are drawn from this very list, so without a
   hint naming the change, several of them would answer the question equally well. */
const WHCHANGE19=[
  {from:'whip',  to:'whim',  hint:'change the p to an m'},
  {from:'whim',  to:'whip',  hint:'change the m to a p'},
  {from:'whip',  to:'whiff', hint:'change the p to a double f'},
  {from:'whiff', to:'whip',  hint:'change the double f to a p'},
  {from:'while', to:'white', hint:'change the l to a t'},
  {from:'white', to:'while', hint:'change the t to an l'},
  {from:'while', to:'whine', hint:'change the l to an n'},
  {from:'whine', to:'while', hint:'change the n to an l'},
  {from:'white', to:'whine', hint:'change the t to an n'},
  {from:'whine', to:'white', hint:'change the n to a t'},
  {from:'while', to:'whale', hint:'change the i to an a'},
  {from:'whale', to:'while', hint:'change the a to an i'}];
/* Word Cards 90-95 -- the Practice Reading Words, exactly as listed. Six cards
   against a six-round stage, so every card comes up once per sitting. */
const CARDS19=['when','while','white','whale','which','why'];
/* Word Cards 96-99 -- the lesson's four Leap Words, kept in their own stage
   because they are learned by sight rather than sounded out: some and come have
   an o saying /u/ with a silent e that does NOT stretch it, something is a
   compound of those, and what has an a saying /u/. Their explanations live in the
   lesson intro, since the reading stage only shows the word. */
const LEAP19=['some','something','come','what'];

/* Lesson 21 -- initial blends combined with the Name Game (silent-e) pattern.
   The manual's own Change the Word list, where a tile is added to the front of a
   word to build the blend. Hints name the exact letter and where it goes, for the
   same reason as Lessons 15 and 19: the other options come from this list. */
const BLENDE21=[
  {from:'side',  to:'slide', hint:'add an l after the s'},
  {from:'sale',  to:'stale', hint:'add a t after the s'},
  {from:'dive',  to:'drive', hint:'add an r after the d'},
  {from:'sore',  to:'snore', hint:'add an n after the s'},
  {from:'snore', to:'store', hint:'change the n to a t'},
  {from:'bake',  to:'brake', hint:'add an r after the b'},
  {from:'save',  to:'slave', hint:'add an l after the s'},
  {from:'sake',  to:'snake', hint:'add an n after the s'},
  {from:'fame',  to:'frame', hint:'add an r after the f'},
  {from:'frame', to:'flame', hint:'change the r to an l'},
  {from:'dove',  to:'drove', hint:'add an r after the d'}];
/* Heteronyms -- words spelled the same but pronounced differently, where only the
   sentence tells you which one you have. Word Card 100 introduces this with close.
   The child picks the MEANING rather than a pronunciation symbol, because the
   meaning is what the context actually settles and it is readable at this age.
   This is the one stage with no audio on purpose: speaking the sentence would
   hand over the answer, and browser text-to-speech guesses heteronyms in context
   unreliably anyway. `note` explains the sound difference in plain words.
   close, live, wind and tear are the manual's own examples; read is added as the
   heteronym a child meets most often. */
const HETERO21=[
  {sentence:'Please <b>close</b> the door.',            word:'close', right:'to shut it',
   wrong:'near to something',        note:'the s buzzes like a z'},
  {sentence:'Sit <b>close</b> to me on the rug.',       word:'close', right:'near to something',
   wrong:'to shut it',               note:'the s hisses like a snake'},
  {sentence:'We <b>live</b> in a red house.',           word:'live',  right:'to have your home there',
   wrong:'alive and moving',         note:'the i is short, like in big'},
  {sentence:'The pet shop has <b>live</b> fish.',       word:'live',  right:'alive and moving',
   wrong:'to have your home there',  note:'the i is long, like in five'},
  {sentence:'The <b>wind</b> blew my hat off.',         word:'wind',  right:'moving air',
   wrong:'to twist it around',       note:'the i is short, like in tin'},
  {sentence:'<b>Wind</b> the string around the stick.', word:'wind',  right:'to twist it around',
   wrong:'moving air',               note:'the i is long, like in kind'},
  {sentence:'I will <b>read</b> this book after lunch.',word:'read',  right:'reading it now or later',
   wrong:'already finished reading', note:'it sounds like reed'},
  {sentence:'I <b>read</b> that book last week.',       word:'read',  right:'already finished reading',
   wrong:'reading it now or later',  note:'it sounds like red'},
  {sentence:'A <b>tear</b> ran down her cheek.',        word:'tear',  right:'a drop from your eye',
   wrong:'to rip it',                note:'it sounds like deer'},
  {sentence:'Do not <b>tear</b> the paper.',            word:'tear',  right:'to rip it',
   wrong:'a drop from your eye',     note:'it sounds like bear'}];
/* Word Cards 101-109 -- the Practice Reading Words, exactly as listed. Nine cards
   against a nine-round stage, so every card comes up once per sitting. Word Card
   100 is close, which is taught in the heteronym stage rather than read here. */
const CARDS21=['drive','smile','store','frame','brave','trade','state','grape','square'];

/* Lesson 23 -- reading plural Silent E words.
   The manual's "One plate, two ____" exercise. No hints are needed here, unlike
   the other wordchange pools: only one option is ever the plural of the word
   shown, so the distractors drawn from this same list cannot also be right. */
const PLURAL23=[
  {from:'plate', to:'plates'},
  {from:'prize', to:'prizes'},
  {from:'grape', to:'grapes'},
  {from:'cake',  to:'cakes'},
  {from:'joke',  to:'jokes'},
  {from:'mile',  to:'miles'},
  {from:'note',  to:'notes'},
  {from:'hole',  to:'holes'},
  {from:'game',  to:'games'},
  {from:'gate',  to:'gates'},
  {from:'lake',  to:'lakes'},
  {from:'rope',  to:'ropes'},
  {from:'vine',  to:'vines'},
  {from:'kite',  to:'kites'},
  {from:'nose',  to:'noses'},
  {from:'rule',  to:'rules'},
  {from:'store', to:'stores'},
  {from:'bite',  to:'bites'},
  {from:'vote',  to:'votes'},
  {from:'size',  to:'sizes'}];
/* The insight the manual singles out: suffix s usually adds no syllable at all --
   ropes, vines and kites are each one clap -- but when the base word already ends
   in a hissing or buzzing sound, the s has to start a syllable of its own, so
   noses and prizes are two. Weighted 11 to 7 toward one-syllable so "most of the
   time" stays true while the exception comes up often enough to be learned.
   Uses the existing `syllable` engine, whose buttons offer 1, 2 or 3; nothing in
   this pool is three, which is fine -- no round is ever unanswerable. */
const CLAP23=[
  {w:'ropes',  n:1},
  {w:'vines',  n:1},
  {w:'kites',  n:1},
  {w:'cakes',  n:1},
  {w:'jokes',  n:1},
  {w:'miles',  n:1},
  {w:'notes',  n:1},
  {w:'holes',  n:1},
  {w:'games',  n:1},
  {w:'grapes', n:1},
  {w:'plates', n:1},
  {w:'noses',  n:2},
  {w:'prizes', n:2},
  {w:'roses',  n:2},
  {w:'hoses',  n:2},
  {w:'sizes',  n:2},
  {w:'faces',  n:2},
  {w:'places', n:2}];
/* Word Cards 110-117 -- the Practice Reading Words. Eight cards against an
   eight-round stage, so every card comes up once per sitting. */
const CARDS23=['miles','cakes','games','gates','notes','holes','jokes','lakes'];
/* Word Cards 118-119 -- the lesson's two Leap Words, in their own stage as in
   Lesson 19. pony has a y saying long e at the end of a two-syllable word, and
   sandwich splits by a rule not taught yet; both are read by sight for now. */
const LEAP23=['pony','sandwich'];

/* Lesson 25 -- phonogram ee and the Vowel Team syllable.
   The manual's Change the Word chain (weed to feed to need to seed to seem to
   seen to green), plus more ee words built the same way. Hints name the exact
   change, as in Lessons 15, 19 and 21, because the options come from this list. */
const EECHANGE25=[
  {from:'weed',  to:'feed',  hint:'change the w to an f'},
  {from:'feed',  to:'need',  hint:'change the f to an n'},
  {from:'need',  to:'seed',  hint:'change the n to an s'},
  {from:'seed',  to:'seem',  hint:'change the d to an m'},
  {from:'seem',  to:'seen',  hint:'change the m to an n'},
  {from:'seen',  to:'green', hint:'change the s to a g and an r'},
  {from:'feet',  to:'feed',  hint:'change the t to a d'},
  {from:'feed',  to:'feet',  hint:'change the d to a t'},
  {from:'keep',  to:'deep',  hint:'change the k to a d'},
  {from:'deep',  to:'sleep', hint:'change the d to an s and an l'},
  {from:'sleep', to:'sheep', hint:'change the l to an h'},
  {from:'sheep', to:'sheet', hint:'change the p to a t'},
  {from:'tree',  to:'free',  hint:'change the t to an f'},
  {from:'week',  to:'seek',  hint:'change the w to an s'}];
/* Party Monsters Form Teams -- now a FOUR-way sort, since this lesson adds the
   Vowel Team syllable to the closed, open and Name Game tags from Lesson 15.
   The `syllabletag` engine derives its buttons from the types present in the
   pool, so Lesson 15 still shows three and this one shows four.
   Seeded with the manual's own answer key (go/no/she, munch/plop/grunt,
   rule/scare/slime, seek/beep/teeth) and extended to fill a session. */
const SYLTAG25=[
  {w:'go',     t:'open'},
  {w:'no',     t:'open'},
  {w:'she',    t:'open'},
  {w:'we',     t:'open'},
  {w:'me',     t:'open'},
  {w:'hi',     t:'open'},
  {w:'munch',  t:'closed'},
  {w:'plop',   t:'closed'},
  {w:'grunt',  t:'closed'},
  {w:'step',   t:'closed'},
  {w:'gift',   t:'closed'},
  {w:'lick',   t:'closed'},
  {w:'milk',   t:'closed'},
  {w:'hand',   t:'closed'},
  {w:'rule',   t:'name'},
  {w:'scare',  t:'name'},
  {w:'slime',  t:'name'},
  {w:'cake',   t:'name'},
  {w:'bike',   t:'name'},
  {w:'home',   t:'name'},
  {w:'five',   t:'name'},
  {w:'seek',   t:'team'},
  {w:'beep',   t:'team'},
  {w:'teeth',  t:'team'},
  {w:'feet',   t:'team'},
  {w:'green',  t:'team'},
  {w:'tree',   t:'team'},
  {w:'street', t:'team'},
  {w:'sheep',  t:'team'}];
/* Word Cards 120-129 -- the nine Practice Reading Words plus been on card 129.
   been rides along in the reading stage rather than getting a Leap Word stage of
   its own the way Lessons 19 and 23 did, because there is only one of it; its
   explanation lives in the lesson intro instead. Ten cards against a ten-round
   stage, so every card comes up once per sitting. */
const CARDS25=['deep','green','feet','keep','need','street','tree','queen','speed','been'];

/* Lesson 27 -- contractions. Its own pool rather than the general CONTRACTIONS
   list, for one reason: won't and don't are deliberately absent. The manual holds
   both back until Lesson 29, where they arrive with the rule that explains them,
   and won't is also the single case where the FIRST word changes -- the exact
   thing this lesson teaches never happens. Seeded with the lesson's own list and
   the phrases it has you build with tiles (he will, she will, she is, she had). */
const CONTRACT27=[
  {two:'I am',      one:"I'm"},
  {two:'can not',   one:"can't"},
  {two:'are not',   one:"aren't"},
  {two:'she is',    one:"she's"},
  {two:'you will',  one:"you'll"},
  {two:'that is',   one:"that's"},
  {two:'is not',    one:"isn't"},
  {two:'let us',    one:"let's"},
  {two:'what is',   one:"what's"},
  {two:'it is',     one:"it's"},
  {two:'did not',   one:"didn't"},
  {two:'has not',   one:"hasn't"},
  {two:'was not',   one:"wasn't"},
  {two:'have not',  one:"haven't"},
  {two:'I will',    one:"I'll"},
  {two:'she will',  one:"she'll"},
  {two:'he will',   one:"he'll"},
  {two:'she had',   one:"she'd"},
  {two:'he is',     one:"he's"},
  {two:'we are',    one:"we're"},
  {two:'we will',   one:"we'll"},
  {two:'you are',   one:"you're"},
  {two:'you have',  one:"you've"},
  {two:'I have',    one:"I've"},
  {two:'here is',   one:"here's"}];
/* Word Cards 130-139 -- the Practice Reading Words, exactly as listed. Ten cards
   against a ten-round stage, so every card comes up once per sitting. */
const CARDS27=["I'm","can't","aren't","she's","you'll","that's","isn't","let's","what's","it's"];

/* Lesson 29 -- the Find Gold rule: in a one-syllable word, i or o followed by
   two consonants often says its long sound. Named for find and gold.
   The manual's Change the Word chains (gold to fold to cold to told, and child
   to wild to mild), extended across the rule's other families: -ind, -ost, -olt. */
const GOLDCHANGE29=[
  {from:'gold',  to:'fold',  hint:'change the g to an f'},
  {from:'fold',  to:'cold',  hint:'change the f to a c'},
  {from:'cold',  to:'told',  hint:'change the c to a t'},
  {from:'told',  to:'hold',  hint:'change the t to an h'},
  {from:'hold',  to:'bold',  hint:'change the h to a b'},
  {from:'bold',  to:'gold',  hint:'change the b to a g'},
  {from:'child', to:'wild',  hint:'change the ch to a w'},
  {from:'wild',  to:'mild',  hint:'change the w to an m'},
  {from:'mild',  to:'child', hint:'change the m to a ch'},
  {from:'find',  to:'mind',  hint:'change the f to an m'},
  {from:'mind',  to:'kind',  hint:'change the m to a k'},
  {from:'kind',  to:'bind',  hint:'change the k to a b'},
  {from:'most',  to:'post',  hint:'change the m to a p'},
  {from:'post',  to:'host',  hint:'change the p to an h'},
  {from:'colt',  to:'bolt',  hint:'change the c to a b'},
  {from:'bolt',  to:'jolt',  hint:'change the b to a j'}];
/* The heart of the lesson, and the part the manual is careful about: the rule
   says i and o MAY go long, not that they always do. Every word here has the
   Find Gold shape -- i or o followed by two consonants -- but only some take the
   long sound. lost, frost and cost are the manual's own counterexamples, and
   build is too; list, fist, gift, soft and doll are the same trap in commoner
   words. Weighted 13 to 9 toward long so "often" stays true while the exception
   comes up enough to be learned rather than guessed past.
   Deliberately an ear question: the spelling looks identical either way, so the
   word is spoken and the child decides by listening. */
const GOLDSORT29={
  instruction:'Two consonants after the vowel. Is that vowel long or short here?',
  buckets:[
    {key:'long',  ex:'gold', why:'the vowel says its name, the way it does in find and gold'},
    {key:'short', ex:'lost', why:'this one keeps its short sound even with two consonants after it'}],
  items:[
    {w:'find',   k:'long'},
    {w:'gold',   k:'long'},
    {w:'child',  k:'long'},
    {w:'mild',   k:'long'},
    {w:'wild',   k:'long'},
    {w:'bold',   k:'long'},
    {w:'cold',   k:'long'},
    {w:'told',   k:'long'},
    {w:'hold',   k:'long'},
    {w:'most',   k:'long'},
    {w:'colt',   k:'long'},
    {w:'roll',   k:'long'},
    {w:'behind', k:'long'},
    {w:'lost',   k:'short'},
    {w:'frost',  k:'short'},
    {w:'cost',   k:'short'},
    {w:'list',   k:'short'},
    {w:'fist',   k:'short'},
    {w:'gift',   k:'short'},
    {w:'soft',   k:'short'},
    {w:'doll',   k:'short'},
    {w:'build',  k:'short'}]};
/* Word Cards 140-149 -- the Practice Reading Words, exactly as listed. don't and
   won't ride along here rather than getting their own stage; the intro explains
   what makes them odd. Ten cards against a ten-round stage, so each comes up once. */
const CARDS29=['told','wild','both','child','hold','most','find','behind',"don't","won't"];
/* Word Cards 150-151 -- the two Leap Words. who breaks two expectations at once
   (wh saying /h/, and o saying /oo/), and move has an o that also says /oo/. */
const LEAP29=['who','move'];

/* Lesson 31 -- phonogram er and the Bossy R syllable, the fifth type.
   Dividing the multisyllable er words the manual works through with tiles: paper,
   better, river, ruler, winter. The er counts as the vowel of its syllable, which
   is the whole point -- a child who does not see that will try to split inside it.
   `syllablesplit` generates the wrong options from other letter positions, and for
   these words that lands on exactly the plausible mistakes (pap-er, be-tter). */
const ERSPLIT31=[
  {w:'paper',   parts:['pa','per']},
  {w:'better',  parts:['bet','ter']},
  {w:'river',   parts:['riv','er']},
  {w:'ruler',   parts:['ru','ler']},
  {w:'winter',  parts:['win','ter']},
  {w:'never',   parts:['nev','er']},
  {w:'summer',  parts:['sum','mer']},
  {w:'under',   parts:['un','der']},
  {w:'after',   parts:['af','ter']},
  {w:'over',    parts:['o','ver']},
  {w:'tender',  parts:['ten','der']},
  {w:'perfect', parts:['per','fect']},
  {w:'sister',  parts:['sis','ter']},
  {w:'ladder',  parts:['lad','der']},
  {w:'finger',  parts:['fin','ger']},
  {w:'number',  parts:['num','ber']}];
/* Party Monsters Make Dinner -- now a FIVE-way sort. Bossy R joins the closed,
   open and Name Game tags from Lesson 15 and the Vowel Team tag from Lesson 25.
   The `syllabletag` engine derives its buttons from the types present in the
   pool, so each of those lessons still asks its own narrower question.
   A Bossy R syllable is a vowel with an r right behind it: the r takes charge and
   changes what the vowel says, which is why herd and fern are NOT closed
   syllables with short vowels. All five types are represented so none is a safe
   guess, and every word is single-syllable so the tag describes the whole word. */
const SYLTAG31=[
  {w:'her',    t:'bossy'},
  {w:'fern',   t:'bossy'},
  {w:'herd',   t:'bossy'},
  {w:'stern',  t:'bossy'},
  {w:'verb',   t:'bossy'},
  {w:'term',   t:'bossy'},
  {w:'perch',  t:'bossy'},
  {w:'step',   t:'closed'},
  {w:'munch',  t:'closed'},
  {w:'gift',   t:'closed'},
  {w:'lick',   t:'closed'},
  {w:'milk',   t:'closed'},
  {w:'plop',   t:'closed'},
  {w:'go',     t:'open'},
  {w:'she',    t:'open'},
  {w:'we',     t:'open'},
  {w:'hi',     t:'open'},
  {w:'me',     t:'open'},
  {w:'cake',   t:'name'},
  {w:'bike',   t:'name'},
  {w:'five',   t:'name'},
  {w:'home',   t:'name'},
  {w:'rule',   t:'name'},
  {w:'seek',   t:'team'},
  {w:'teeth',  t:'team'},
  {w:'green',  t:'team'},
  {w:'sheep',  t:'team'},
  {w:'feet',   t:'team'}];
/* Word Cards 152-158 -- the Practice Reading Words, exactly as listed. Seven
   cards against a seven-round stage, so each comes up once per sitting. */
const CARDS31=['never','paper','after','summer','winter','over','under'];
/* Word Cards 159-161 -- three Leap Words that all rhyme. done and none take the
   fourth sound of o, and one says /wu/, which is odder still. In each, Silent E
   is there only to keep the word from being read as Don, non or on. */
const LEAP31=['done','none','one'];

/* Lesson 33 -- phonogram ar, and decoding three-syllable words.
   The manual's Change the Word chain (bark to dark to mark to park to spark to
   shark), extended through the other ar families. Hints name the exact change,
   as in Lessons 15, 19, 21, 25 and 29, because the options come from this list. */
const ARCHANGE33=[
  {from:'bark',  to:'dark',  hint:'change the b to a d'},
  {from:'dark',  to:'mark',  hint:'change the d to an m'},
  {from:'mark',  to:'park',  hint:'change the m to a p'},
  {from:'park',  to:'spark', hint:'add an s at the front'},
  {from:'spark', to:'shark', hint:'change the p to an h'},
  {from:'shark', to:'sharp', hint:'change the k to a p'},
  {from:'barn',  to:'bark',  hint:'change the n to a k'},
  {from:'bark',  to:'barn',  hint:'change the k to an n'},
  {from:'yarn',  to:'barn',  hint:'change the y to a b'},
  {from:'car',   to:'card',  hint:'add a d at the end'},
  {from:'card',  to:'cart',  hint:'change the d to a t'},
  {from:'cart',  to:'card',  hint:'change the t to a d'},
  {from:'hard',  to:'harm',  hint:'change the d to an m'},
  {from:'harm',  to:'farm',  hint:'change the h to an f'},
  {from:'farm',  to:'harm',  hint:'change the f to an h'},
  {from:'star',  to:'scar',  hint:'change the t to a c'}];
/* The lesson's real headline: a word you have never seen is readable if you split
   it twice instead of once. fantastic, different and cucumber are the three the
   manual walks through with tiles; the rest are the same shape.
   `syllablesplit3` builds its wrong options with TWO splits as well, at other
   positions -- otherwise a child could win by counting hyphens instead of
   thinking about where the syllables actually break. */
const THREESYL33=[
  {w:'fantastic',  parts:['fan','tas','tic']},
  {w:'different',  parts:['dif','fer','ent']},
  {w:'cucumber',   parts:['cu','cum','ber']},
  {w:'carpenter',  parts:['car','pen','ter']},
  {w:'hamburger',  parts:['ham','bur','ger']},
  {w:'butterfly',  parts:['but','ter','fly']},
  {w:'wonderful',  parts:['won','der','ful']},
  {w:'yesterday',  parts:['yes','ter','day']},
  {w:'basketball', parts:['bas','ket','ball']},
  {w:'understand', parts:['un','der','stand']},
  {w:'important',  parts:['im','por','tant']},
  {w:'suddenly',   parts:['sud','den','ly']}];
/* Word Cards 162-167 -- the Practice Reading Words, exactly as listed. Six cards
   against a six-round stage, so each comes up once per sitting. */
const CARDS33=['barn','sharp','hard','start','March','dark'];
/* Word Cards 168-171 -- four Leap Words. In warm the ar says /or/ rather than
   /ar/, though the manual notes some regions say it the regular way. Mr. and
   Mrs. are abbreviations, which is why they carry a capital and a period; the
   browser voice reads them as "mister" and "missus", which is what we want. */
const LEAP33=['warm','Mr.','Mrs.','too'];

/* Lesson 35 -- phonogram or, the third Bossy R spelling after ar and er.
   The manual's Change the Word chain (fort to short to port to sport), extended
   through the other or families. Hints name the exact change, since the options
   are drawn from this same list. */
const ORCHANGE35=[
  {from:'fort',  to:'short', hint:'change the f to an s and an h'},
  {from:'short', to:'port',  hint:'change the sh to a p'},
  {from:'port',  to:'sport', hint:'add an s at the front'},
  {from:'sport', to:'short', hint:'change the p to an h'},
  {from:'fork',  to:'fort',  hint:'change the k to a t'},
  {from:'fort',  to:'fork',  hint:'change the t to a k'},
  {from:'form',  to:'fort',  hint:'change the m to a t'},
  {from:'port',  to:'sort',  hint:'change the p to an s'},
  {from:'corn',  to:'cord',  hint:'change the n to a d'},
  {from:'cord',  to:'corn',  hint:'change the d to an n'},
  {from:'corn',  to:'born',  hint:'change the c to a b'},
  {from:'born',  to:'torn',  hint:'change the b to a t'},
  {from:'torn',  to:'horn',  hint:'change the t to an h'},
  {from:'horn',  to:'corn',  hint:'change the h to a c'},
  {from:'north', to:'forth', hint:'change the n to an f'},
  {from:'forth', to:'north', hint:'change the f to an n'}];
/* Dividing the two-syllable or words. The point the manual makes here is that a
   phonogram is not split apart: forest divides for-est, never fo-rest. The
   `syllablesplit` engine builds its wrong options from other letter positions,
   which for these words lands squarely on that mistake -- so the distractor is
   the misconception itself rather than filler.
   forever is a three-syllable word and belongs to the reading stage, not here. */
const ORSPLIT35=[
  {w:'forest',  parts:['for','est']},
  {w:'report',  parts:['re','port']},
  {w:'order',   parts:['or','der']},
  {w:'morning', parts:['morn','ing']},
  {w:'forget',  parts:['for','get']},
  {w:'corner',  parts:['cor','ner']},
  {w:'border',  parts:['bor','der']},
  {w:'orbit',   parts:['or','bit']},
  {w:'formal',  parts:['for','mal']},
  {w:'shorter', parts:['short','er']},
  {w:'torment', parts:['tor','ment']},
  {w:'normal',  parts:['nor','mal']}];
/* Word Cards 172-181 -- the Practice Reading Words, exactly as listed. Ten cards
   against a ten-round stage, so every card comes up once per sitting.
   This lesson has no Leap Words. */
const CARDS35=['north','short','order','fork','corn','forest','morning','forever','forget','storm'];

/* Lesson 37 -- the third sound of u, /oo/ as in put.
   The whole pool is six words, and that is not an oversight: the manual's point
   is that very few words use this sound, so learning this handful covers nearly
   all of them. Every pair here keeps u on its third sound, which rules out
   otherwise tempting swaps like put to but, where the u goes back to short. */
const UCHANGE37=[
  {from:'push', to:'bush', hint:'change the p to a b'},
  {from:'push', to:'pull', hint:'change the sh to a double l'},
  {from:'push', to:'put',  hint:'change the sh to a t'},
  {from:'bush', to:'push', hint:'change the b to a p'},
  {from:'bush', to:'bull', hint:'change the sh to a double l'},
  {from:'bull', to:'pull', hint:'change the b to a p'},
  {from:'bull', to:'full', hint:'change the b to an f'},
  {from:'bull', to:'bush', hint:'change the double l to an s and an h'},
  {from:'pull', to:'bull', hint:'change the p to a b'},
  {from:'pull', to:'full', hint:'change the p to an f'},
  {from:'pull', to:'push', hint:'change the double l to an s and an h'},
  {from:'pull', to:'put',  hint:'change the double l to a t'},
  {from:'full', to:'bull', hint:'change the f to a b'},
  {from:'full', to:'pull', hint:'change the f to a p'},
  {from:'put',  to:'pull', hint:'change the t to a double l'},
  {from:'put',  to:'push', hint:'change the t to an s and an h'}];
/* Guess What I'm Saying, with the muffled-o words. `from` is what the child SEES
   and `say` is what the browser SPEAKS -- here the spelling pronunciation the
   manual asks you to use, sounding the second syllable as it looks rather than
   as it is said at speed. Blending those parts lands close enough that normal
   talking speed does the rest, which is the lesson's actual point.
   bacon needs its first syllable respelled "bay": it is an open syllable, and a
   bare "ba" comes out of text-to-speech with a short a. */
const GUESS37=[
  {from:'lem...on',  to:'lemon',  say:'lem, on'},
  {from:'drag...on', to:'dragon', say:'drag, on'},
  {from:'wag...on',  to:'wagon',  say:'wag, on'},
  {from:'ba...con',  to:'bacon',  say:'bay, con'},
  {from:'rib...bon', to:'ribbon', say:'rib, bon'},
  {from:'but...ton', to:'button', say:'but, ton'},
  {from:'cot...ton', to:'cotton', say:'cot, ton'},
  {from:'les...son', to:'lesson', say:'less, on'},
  {from:'gal...lon', to:'gallon', say:'gal, lon'},
  {from:'mel...on',  to:'melon',  say:'mel, on'},
  {from:'car...ton', to:'carton', say:'car, ton'},
  {from:'can...non', to:'cannon', say:'can, non'}];
/* Word Cards 182-189 -- the Practice Reading Words, exactly as listed. Eight
   cards against an eight-round stage, so each comes up once per sitting. */
const CARDS37=['push','full','pull','put','bacon','wagon','dragon','lemon'];
/* Word Cards 190-191 -- two Leap Words that rhyme with each other. In both, the
   e-r-e refuses to say what the rules so far would predict. */
const LEAP37=['where','there'];

/* Lesson 39 -- soft c, and the second job of Silent E.
   Hammers and Feathers, the manual's sort, with its own answer key as the seed:
   carpet, cold, cake, creek, plastic, cry, craft and cart in the hammer pile;
   dance, force, fence, prince, since, glance and cent in the feather pile.
   Feedback names the rule every round rather than just the answer, since the rule
   is the whole point: c goes soft before e, i or y and stays hard before anything
   else. Words spelled with ch are kept out -- in chance the deciding c is the
   second one, and a child applying the rule to the first would get it backwards. */
const CSOUND39={
  instruction:'Find the c. Is it hard or soft here?',
  buckets:[
    {key:'hard', ex:'cake', why:'the c is followed by something other than e, i or y, so it says /k/'},
    {key:'soft', ex:'city', why:'the c is followed by an e, i or y, so it says /s/'}],
  items:[
    {w:'carpet',  k:'hard'},
    {w:'cold',    k:'hard'},
    {w:'cake',    k:'hard'},
    {w:'creek',   k:'hard'},
    {w:'plastic', k:'hard'},
    {w:'cry',     k:'hard'},
    {w:'craft',   k:'hard'},
    {w:'cart',    k:'hard'},
    {w:'cup',     k:'hard'},
    {w:'class',   k:'hard'},
    {w:'dance',   k:'soft'},
    {w:'force',   k:'soft'},
    {w:'fence',   k:'soft'},
    {w:'prince',  k:'soft'},
    {w:'since',   k:'soft'},
    {w:'glance',  k:'soft'},
    {w:'cent',    k:'soft'},
    {w:'city',    k:'soft'},
    {w:'pencil',  k:'soft'},
    {w:'center',  k:'soft'}]};
/* Silent E now has two jobs, and this stage asks which one it is doing. Job one
   is the Lesson 14 skill, stretching the vowel long. Job two is new: sitting
   behind a c to make it say /s/, while the vowel stays short.
   Deliberately left out: face, race, place, nice, ice, twice, space and their
   kin, where Silent E is doing BOTH at once. They are perfectly good words, and
   the manual even lists several, but a two-way question has no honest answer for
   them. Every word here does one job or the other, never both. */
const SILENTE39={
  instruction:'Silent E has two jobs. Which one is it doing here?',
  buckets:[
    {key:'long vowel', ex:'cake',  why:'there is no c to soften, so the e stretches the vowel long'},
    {key:'soft c',     ex:'fence', why:'the e sits behind the c to make it say /s/, and the vowel stays short'}],
  items:[
    {w:'cake',   k:'long vowel'},
    {w:'bike',   k:'long vowel'},
    {w:'home',   k:'long vowel'},
    {w:'five',   k:'long vowel'},
    {w:'name',   k:'long vowel'},
    {w:'rope',   k:'long vowel'},
    {w:'made',   k:'long vowel'},
    {w:'note',   k:'long vowel'},
    {w:'ride',   k:'long vowel'},
    {w:'hope',   k:'long vowel'},
    {w:'fence',  k:'soft c'},
    {w:'prince', k:'soft c'},
    {w:'dance',  k:'soft c'},
    {w:'since',  k:'soft c'},
    {w:'glance', k:'soft c'},
    {w:'chance', k:'soft c'},
    {w:'force',  k:'soft c'},
    {w:'wince',  k:'soft c'},
    {w:'prance', k:'soft c'},
    {w:'hence',  k:'soft c'}]};
/* Word Cards 192-201 -- the Practice Reading Words, exactly as listed. Ten cards
   against a ten-round stage, so each comes up once per sitting.
   This lesson has no Leap Words. */
const CARDS39=['cent','dance','fence','force','prince','chance','since','pencil','center','France'];

/* Lesson 40 -- Silent E can hold both jobs at once.
   This is the lesson that picks up exactly the words Lesson 39's two-way sort had
   to leave out: face, race, place, nice, ice, twice and space, where Silent E is
   stretching the vowel AND softening the c in the same breath. */
const CECHANGE40=[
  {from:'ice',   to:'mice',  hint:'add an m at the front'},
  {from:'ice',   to:'rice',  hint:'add an r at the front'},
  {from:'ice',   to:'nice',  hint:'add an n at the front'},
  {from:'mice',  to:'nice',  hint:'change the m to an n'},
  {from:'mice',  to:'rice',  hint:'change the m to an r'},
  {from:'nice',  to:'rice',  hint:'change the n to an r'},
  {from:'nice',  to:'mice',  hint:'change the n to an m'},
  {from:'rice',  to:'mice',  hint:'change the r to an m'},
  {from:'rice',  to:'price', hint:'add a p at the front'},
  {from:'price', to:'rice',  hint:'take the p off the front'},
  {from:'face',  to:'lace',  hint:'change the f to an l'},
  {from:'face',  to:'race',  hint:'change the f to an r'},
  {from:'lace',  to:'face',  hint:'change the l to an f'},
  {from:'lace',  to:'race',  hint:'change the l to an r'},
  {from:'race',  to:'face',  hint:'change the r to an f'},
  {from:'race',  to:'lace',  hint:'change the r to an l'},
  {from:'place', to:'space', hint:'change the pl to an sp'},
  {from:'space', to:'place', hint:'change the sp to a pl'}];
/* Detective Dog Breaks the Code -- how many jobs is Silent E doing here?
   The manual's own contrast is place against since, and the two buckets sit on a
   real structural difference rather than a memorised list. A "two jobs" word has
   ONE consonant between the vowel and the e (pla-c-e), so the vowel is free to go
   long. A "one job" word has TWO (sin-c-e), which closes the syllable and pins
   the vowel short, leaving the e with nothing to do but soften the c.
   Both buckets contain a soft c, so the round turns entirely on the vowel. */
const DETECTIVE40={
  instruction:'How many jobs is Silent E doing in this word?',
  buckets:[
    {key:'two jobs', ex:'place', why:'one consonant before the e, so it makes the vowel long AND the c soft'},
    {key:'one job',  ex:'since', why:'two consonants before the e, so the vowel stays short and the e only softens the c'}],
  items:[
    {w:'ice',    k:'two jobs'},
    {w:'face',   k:'two jobs'},
    {w:'nice',   k:'two jobs'},
    {w:'twice',  k:'two jobs'},
    {w:'space',  k:'two jobs'},
    {w:'place',  k:'two jobs'},
    {w:'price',  k:'two jobs'},
    {w:'lace',   k:'two jobs'},
    {w:'mice',   k:'two jobs'},
    {w:'rice',   k:'two jobs'},
    {w:'race',   k:'two jobs'},
    {w:'slice',  k:'two jobs'},
    {w:'since',  k:'one job'},
    {w:'fence',  k:'one job'},
    {w:'prince', k:'one job'},
    {w:'dance',  k:'one job'},
    {w:'chance', k:'one job'},
    {w:'glance', k:'one job'},
    {w:'wince',  k:'one job'},
    {w:'prance', k:'one job'},
    {w:'hence',  k:'one job'},
    {w:'mince',  k:'one job'}]};
/* Word Cards 202-211 -- the Practice Reading Words, exactly as listed. Ten cards
   against a ten-round stage, so each comes up once per sitting. Every one of them
   is a two-jobs word. This lesson has no Leap Words. */
const CARDS40=['ice','face','nice','twice','space','place','price','lace','mice','rice'];

/* Lesson 42 -- soft g. It looks like Lesson 39's soft c, and it deliberately
   is NOT as tidy. The manual is explicit about why: for the /k/ sound English has
   both c and k, so k covers hard-c duty before e, i and y. For /g/ there is only
   g, which has to do double duty, and a handful of very common words keep the
   hard sound before those same letters.
   So this pool carries three kinds of word on purpose -- soft g before e/i/y,
   ordinary hard g before other letters, and the stubborn exceptions (get, girl,
   gift, give, begin) that break the rule. A child cannot win it by applying the
   pattern blindly, which is precisely the manual's point.
   Weighted 14 to 10 toward soft, since soft g is by far the commoner case. */
const GSOUND42={
  instruction:'Find the g. Is it hard or soft here?',
  buckets:[
    {key:'soft', ex:'gem',  why:'g before an e, i or y usually goes soft and says /j/'},
    {key:'hard', ex:'goat', why:'g says /g/ here, either because nothing soft follows it or because this is one of the few words that stays hard anyway'}],
  items:[
    {w:'gem',    k:'soft'},
    {w:'germ',   k:'soft'},
    {w:'large',  k:'soft'},
    {w:'cage',   k:'soft'},
    {w:'page',   k:'soft'},
    {w:'age',    k:'soft'},
    {w:'huge',   k:'soft'},
    {w:'stage',  k:'soft'},
    {w:'orange', k:'soft'},
    {w:'danger', k:'soft'},
    {w:'change', k:'soft'},
    {w:'magic',  k:'soft'},
    {w:'hinge',  k:'soft'},
    {w:'gym',    k:'soft'},
    {w:'goat',   k:'hard'},
    {w:'game',   k:'hard'},
    {w:'gold',   k:'hard'},
    {w:'glad',   k:'hard'},
    {w:'flag',   k:'hard'},
    {w:'get',    k:'hard'},
    {w:'girl',   k:'hard'},
    {w:'gift',   k:'hard'},
    {w:'give',   k:'hard'},
    {w:'begin',  k:'hard'}]};
/* The same one-job-or-two question as Lesson 40, now with g instead of c, and it
   turns on the very same structural test: ONE consonant between the vowel and the
   e leaves the vowel free to go long (huge, stage, cage), while TWO closes the
   syllable and pins it short, leaving the e only the softening job (large, hinge).
   large and hinge are the manual's own one-job examples, huge and stage its
   two-job ones, so the rule and the examples agree. */
const SILENTEG42={
  instruction:'How many jobs is Silent E doing in this word?',
  buckets:[
    {key:'two jobs', ex:'huge',  why:'one consonant before the e, so it makes the vowel long AND the g soft'},
    {key:'one job',  ex:'large', why:'two consonants before the e, so the vowel cannot stretch and the e only softens the g'}],
  items:[
    {w:'age',    k:'two jobs'},
    {w:'cage',   k:'two jobs'},
    {w:'page',   k:'two jobs'},
    {w:'rage',   k:'two jobs'},
    {w:'sage',   k:'two jobs'},
    {w:'wage',   k:'two jobs'},
    {w:'huge',   k:'two jobs'},
    {w:'stage',  k:'two jobs'},
    {w:'large',  k:'one job'},
    {w:'hinge',  k:'one job'},
    {w:'change', k:'one job'},
    {w:'charge', k:'one job'},
    {w:'bulge',  k:'one job'},
    {w:'plunge', k:'one job'},
    {w:'sponge', k:'one job'},
    {w:'cringe', k:'one job'}]};
/* Word Cards 212-221 -- the nine Practice Reading Words plus pumpkin on card 221.
   pumpkin rides along here rather than getting a Leap Word stage of its own, as
   there is only one of it; the intro explains what makes it a Leap Word. Ten
   cards against a ten-round stage, so each comes up once per sitting. */
const CARDS42=['cage','huge','large','germ','age','page','change','danger','orange','pumpkin'];

/* Lesson 44 -- the third job of Silent E: keeping u and v off the end of a word.
   English words never end in v and hardly ever in u, so Silent E takes the last
   spot whether or not it is doing anything else.
   With all three jobs now taught, this sort asks which one is at work. Every word
   here does exactly ONE job, matching the manual's own "state the job of Silent E"
   activity -- words doing two at once belong to Lessons 40 and 42.
   Left out deliberately: live and dove. Both are heteronyms, and each reading
   picks a different answer (live as in reside is one job, live as in alive is
   two), so neither could be marked right or wrong honestly. live still appears
   among the Word Cards, where it is only read. */
const EJOBS44={
  instruction:'Which job is Silent E doing in this word?',
  buckets:[
    {key:'long vowel',  ex:'cake',  why:'nothing to soften and no u or v to rescue, so the e just stretches the vowel'},
    {key:'soft c or g', ex:'fence', why:'two consonants keep the vowel short, so the e is only there to soften the c or g'},
    {key:'saves u or v', ex:'give', why:'English words cannot end in v and hardly ever in u, so the e takes the last spot'}],
  items:[
    {w:'cake',    k:'long vowel'},
    {w:'bike',    k:'long vowel'},
    {w:'home',    k:'long vowel'},
    {w:'note',    k:'long vowel'},
    {w:'rope',    k:'long vowel'},
    {w:'made',    k:'long vowel'},
    {w:'ride',    k:'long vowel'},
    {w:'hope',    k:'long vowel'},
    {w:'name',    k:'long vowel'},
    {w:'bone',    k:'long vowel'},
    {w:'fence',   k:'soft c or g'},
    {w:'since',   k:'soft c or g'},
    {w:'dance',   k:'soft c or g'},
    {w:'prince',  k:'soft c or g'},
    {w:'chance',  k:'soft c or g'},
    {w:'glance',  k:'soft c or g'},
    {w:'large',   k:'soft c or g'},
    {w:'hinge',   k:'soft c or g'},
    {w:'change',  k:'soft c or g'},
    {w:'plunge',  k:'soft c or g'},
    {w:'give',    k:'saves u or v'},
    {w:'have',    k:'saves u or v'},
    {w:'solve',   k:'saves u or v'},
    {w:'carve',   k:'saves u or v'},
    {w:'twelve',  k:'saves u or v'},
    {w:'forgive', k:'saves u or v'},
    {w:'glove',   k:'saves u or v'},
    {w:'shove',   k:'saves u or v'},
    {w:'glue',    k:'saves u or v'},
    {w:'blue',    k:'saves u or v'},
    {w:'true',    k:'saves u or v'},
    {w:'clue',    k:'saves u or v'}]};
/* The manual's give-to-gave demonstration, extended through the other u and v
   families. give and gave are spelled to the same shape yet the vowels differ,
   which is the lesson's real point: a v-word's Silent E is compulsory, so it
   tells you nothing about the vowel and you have to know the word. */
const UVCHANGE44=[
  {from:'give',  to:'gave',  hint:'change the i to an a'},
  {from:'gave',  to:'give',  hint:'change the a to an i'},
  {from:'gave',  to:'cave',  hint:'change the g to a c'},
  {from:'cave',  to:'wave',  hint:'change the c to a w'},
  {from:'wave',  to:'have',  hint:'change the w to an h'},
  {from:'have',  to:'cave',  hint:'change the h to a c'},
  {from:'five',  to:'hive',  hint:'change the f to an h'},
  {from:'hive',  to:'dive',  hint:'change the h to a d'},
  {from:'dive',  to:'five',  hint:'change the d to an f'},
  {from:'blue',  to:'glue',  hint:'change the b to a g'},
  {from:'glue',  to:'clue',  hint:'change the g to a c'},
  {from:'clue',  to:'true',  hint:'change the cl to a tr'},
  {from:'true',  to:'blue',  hint:'change the tr to a bl'},
  {from:'carve', to:'curve', hint:'change the a to a u'}];
/* Word Cards 222-231 -- the Practice Reading Words, exactly as listed. Ten cards
   against a ten-round stage, so each comes up once per sitting. Sue keeps its
   capital, being a name. This lesson has no Leap Words. */
const CARDS44=['blue','give','forgive','glue','carve','true','live','twelve','Sue','clue'];

/* Lesson 46 -- the fourth sound of o, and the fourth job of Silent E.
   The fourth sound of o is /u/ as in love and mother. It is a clear vowel in an
   accented syllable, not a schwa, which is why front and won belong here while a
   muffled unaccented o does not.
   Sorted against short o rather than all four sounds at once: short o is the one
   a reader actually reaches for first and gets wrong, so that is the contrast
   worth drilling. Weighted 14 to 10 toward the new sound. */
const OSOUND46={
  instruction:'Listen to the o. Which sound is it making?',
  buckets:[
    {key:'/u/', ex:'love', why:'this is the fourth sound of o, the one you hear in love and mother'},
    {key:'/o/', ex:'hot',  why:'this is the plain short o you already knew'}],
  items:[
    {w:'love',    k:'/u/'},
    {w:'mother',  k:'/u/'},
    {w:'brother', k:'/u/'},
    {w:'other',   k:'/u/'},
    {w:'front',   k:'/u/'},
    {w:'won',     k:'/u/'},
    {w:'nothing', k:'/u/'},
    {w:'month',   k:'/u/'},
    {w:'glove',   k:'/u/'},
    {w:'shove',   k:'/u/'},
    {w:'cover',   k:'/u/'},
    {w:'some',    k:'/u/'},
    {w:'come',    k:'/u/'},
    {w:'done',    k:'/u/'},
    {w:'hot',     k:'/o/'},
    {w:'stop',    k:'/o/'},
    {w:'lock',    k:'/o/'},
    {w:'frog',    k:'/o/'},
    {w:'pond',    k:'/o/'},
    {w:'sock',    k:'/o/'},
    {w:'box',     k:'/o/'},
    {w:'clock',   k:'/o/'},
    {w:'shop',    k:'/o/'},
    {w:'rock',    k:'/o/'}]};
/* All four jobs of Silent E, now that the fourth is taught. Job four is the
   subtle one: strip the e off rinse and you get rins, which reads like a plural
   of some word rin, so the e is there purely to settle that.
   As in Lesson 44, every word does exactly ONE job. Job-four words all take their
   vowel sound from somewhere else -- a short vowel before a cluster (rinse,
   glimpse), a vowel team (cheese, goose, noise) or a bossy r (horse, sparse) --
   so the e is not stretching anything. Words like case and nose are left out:
   there the e is doing job one as well. */
const EJOBS46={
  instruction:'Which job is Silent E doing in this word?',
  buckets:[
    {key:'long vowel',   ex:'cake',  why:'nothing to soften, no u or v to rescue and no plural to rule out, so the e just stretches the vowel'},
    {key:'soft c or g',  ex:'fence', why:'the e is there to soften the c or g, and the vowel stays short'},
    {key:'saves u or v', ex:'give',  why:'English words cannot end in v and hardly ever in u, so the e takes the last spot'},
    {key:'not a plural', ex:'rinse', why:'without the e that s would read like a plural ending, so the e settles it'}],
  items:[
    {w:'cake',    k:'long vowel'},
    {w:'bike',    k:'long vowel'},
    {w:'home',    k:'long vowel'},
    {w:'note',    k:'long vowel'},
    {w:'rope',    k:'long vowel'},
    {w:'made',    k:'long vowel'},
    {w:'ride',    k:'long vowel'},
    {w:'name',    k:'long vowel'},
    {w:'fence',   k:'soft c or g'},
    {w:'since',   k:'soft c or g'},
    {w:'dance',   k:'soft c or g'},
    {w:'prince',  k:'soft c or g'},
    {w:'large',   k:'soft c or g'},
    {w:'hinge',   k:'soft c or g'},
    {w:'change',  k:'soft c or g'},
    {w:'glance',  k:'soft c or g'},
    {w:'give',    k:'saves u or v'},
    {w:'have',    k:'saves u or v'},
    {w:'solve',   k:'saves u or v'},
    {w:'carve',   k:'saves u or v'},
    {w:'glove',   k:'saves u or v'},
    {w:'glue',    k:'saves u or v'},
    {w:'blue',    k:'saves u or v'},
    {w:'true',    k:'saves u or v'},
    {w:'rinse',   k:'not a plural'},
    {w:'cheese',  k:'not a plural'},
    {w:'horse',   k:'not a plural'},
    {w:'mouse',   k:'not a plural'},
    {w:'goose',   k:'not a plural'},
    {w:'noise',   k:'not a plural'},
    {w:'pause',   k:'not a plural'},
    {w:'false',   k:'not a plural'},
    {w:'sparse',  k:'not a plural'},
    {w:'glimpse', k:'not a plural'}]};
/* Word Cards 232-242 -- the ten Practice Reading Words plus oh on card 242.
   Eleven cards against an eleven-round stage, so each comes up once per sitting.
   oh is a Leap Word because its h is silent; the intro says so. */
const CARDS46=['brother','mother','other','love','glove','shove','won','front','rinse','cheese','oh'];

/* Lesson 48 -- phonogram ed, past tense, and the three sounds of the ending.
   The manual's central technique: cover the ed, read the base word, then say the
   whole thing as if it happened yesterday. So this stage runs backwards from a
   past-tense word to its base, which is the step a reader actually has to take.
   Three kinds of base word are mixed in on purpose -- plain (folded, jumped), a
   doubled consonant (stopped, planned) and a dropped Silent E (smiled, raced) --
   because those two spelling changes are exactly what make the base hard to see. */
const BASE48=[
  {from:'folded',  to:'fold'},
  {from:'printed', to:'print'},
  {from:'tested',  to:'test'},
  {from:'jumped',  to:'jump'},
  {from:'mixed',   to:'mix'},
  {from:'barked',  to:'bark'},
  {from:'locked',  to:'lock'},
  {from:'bumped',  to:'bump'},
  {from:'twisted', to:'twist'},
  {from:'covered', to:'cover'},
  {from:'spilled', to:'spill'},
  {from:'planted', to:'plant'},
  {from:'stopped', to:'stop'},
  {from:'stepped', to:'step'},
  {from:'tapped',  to:'tap'},
  {from:'robbed',  to:'rob'},
  {from:'planned', to:'plan'},
  {from:'hopped',  to:'hop'},
  {from:'hiked',   to:'hike'},
  {from:'smiled',  to:'smile'},
  {from:'raced',   to:'race'},
  {from:'saved',   to:'save'},
  {from:'danced',  to:'dance'},
  {from:'shaped',  to:'shape'},
  {from:'liked',   to:'like'},
  {from:'stared',  to:'stare'},
  {from:'skated',  to:'skate'}];
/* Sound Sorting for Phonogram ED, the manual's own three-column activity.
   The rule behind it is about the sound just before the ending: a base ending in
   t or d forces ed into a syllable of its own, a voiced sound takes /d/, and an
   unvoiced one takes /t/. The manual's position is that a native speaker already
   does this without being told, so the word is spoken and the child answers by
   ear; the explanations are there to confirm rather than to be applied. */
const EDSOUND48={
  instruction:'Say the word. What does the ed ending sound like?',
  buckets:[
    {key:'/ed/', ex:'wanted', why:'the base word ends in t or d, so ed becomes a whole extra beat'},
    {key:'/d/',  ex:'snowed', why:'no extra beat here, and the ending simply buzzes'},
    {key:'/t/',  ex:'jumped', why:'no extra beat here, and the ending is a crisp t'}],
  items:[
    {w:'wanted',  k:'/ed/'},
    {w:'printed', k:'/ed/'},
    {w:'folded',  k:'/ed/'},
    {w:'tested',  k:'/ed/'},
    {w:'landed',  k:'/ed/'},
    {w:'planted', k:'/ed/'},
    {w:'needed',  k:'/ed/'},
    {w:'painted', k:'/ed/'},
    {w:'twisted', k:'/ed/'},
    {w:'started', k:'/ed/'},
    {w:'snowed',  k:'/d/'},
    {w:'smiled',  k:'/d/'},
    {w:'saved',   k:'/d/'},
    {w:'filled',  k:'/d/'},
    {w:'played',  k:'/d/'},
    {w:'rained',  k:'/d/'},
    {w:'cleaned', k:'/d/'},
    {w:'called',  k:'/d/'},
    {w:'covered', k:'/d/'},
    {w:'formed',  k:'/d/'},
    {w:'dropped', k:'/t/'},
    {w:'baked',   k:'/t/'},
    {w:'jumped',  k:'/t/'},
    {w:'stopped', k:'/t/'},
    {w:'mixed',   k:'/t/'},
    {w:'danced',  k:'/t/'},
    {w:'raced',   k:'/t/'},
    {w:'walked',  k:'/t/'},
    {w:'picked',  k:'/t/'},
    {w:'barked',  k:'/t/'}]};
/* Word Cards 243-252 -- the nine Practice Reading Words plus they on card 252.
   Ten cards against a ten-round stage, so each comes up once per sitting. they is
   a Leap Word because its ey says long a, a spelling not taught yet. */
const CARDS48=['printed','covered','raced','stopped','tested','smiled','saved','jumped','mixed','they'];

/* Lesson 50 -- the third sound of a, /ah/ as in father.
   The manual's Change the Word chain (ball to call to fall to mall to wall to
   tall to stall to small), extended a little so the -all family can be walked in
   either direction. */
const ACHANGE50=[
  {from:'ball',  to:'call',  hint:'change the b to a c'},
  {from:'call',  to:'fall',  hint:'change the c to an f'},
  {from:'call',  to:'ball',  hint:'change the c to a b'},
  {from:'fall',  to:'mall',  hint:'change the f to an m'},
  {from:'fall',  to:'hall',  hint:'change the f to an h'},
  {from:'mall',  to:'wall',  hint:'change the m to a w'},
  {from:'mall',  to:'call',  hint:'change the m to a c'},
  {from:'wall',  to:'tall',  hint:'change the w to a t'},
  {from:'wall',  to:'ball',  hint:'change the w to a b'},
  {from:'tall',  to:'stall', hint:'add an s at the front'},
  {from:'tall',  to:'fall',  hint:'change the t to an f'},
  {from:'hall',  to:'tall',  hint:'change the h to a t'},
  {from:'stall', to:'small', hint:'change the t to an m'},
  {from:'small', to:'stall', hint:'change the m to a t'}];
/* Two things pull a into its third sound, and the manual names both: an l right
   after it (ball, salt) or a /w/ sound right before it (want, water, squash --
   the qu in squash counts, since it carries a w sound).
   Sorted against plain short a, because that is what a reader tries first and
   gets wrong. Watch the short-a words: flag, plant and glad all contain an l, but
   it sits BEFORE the a and so changes nothing, which is exactly the trap.
   father is the manual's headline example of the sound but fits neither trigger,
   so it stays out of the sort and is quoted in the intro instead. */
const ASOUND50={
  instruction:'Listen to the a. Which sound is it making?',
  buckets:[
    {key:'/ah/', ex:'ball', why:'an l right after the a, or a w sound right before it, pulls a to its third sound'},
    {key:'/a/',  ex:'cat',  why:'nothing here tugs at it, so a keeps its plain short sound'}],
  items:[
    {w:'ball',   k:'/ah/'},
    {w:'call',   k:'/ah/'},
    {w:'fall',   k:'/ah/'},
    {w:'tall',   k:'/ah/'},
    {w:'wall',   k:'/ah/'},
    {w:'small',  k:'/ah/'},
    {w:'stall',  k:'/ah/'},
    {w:'salt',   k:'/ah/'},
    {w:'walk',   k:'/ah/'},
    {w:'want',   k:'/ah/'},
    {w:'water',  k:'/ah/'},
    {w:'wash',   k:'/ah/'},
    {w:'swamp',  k:'/ah/'},
    {w:'watch',  k:'/ah/'},
    {w:'squash', k:'/ah/'},
    {w:'cat',    k:'/a/'},
    {w:'hat',    k:'/a/'},
    {w:'map',    k:'/a/'},
    {w:'bag',    k:'/a/'},
    {w:'ran',    k:'/a/'},
    {w:'flag',   k:'/a/'},
    {w:'hand',   k:'/a/'},
    {w:'stamp',  k:'/a/'},
    {w:'plant',  k:'/a/'},
    {w:'camp',   k:'/a/'}]};
/* Word Cards 253-262 -- the nine Practice Reading Words plus two on card 262.
   Ten cards against a ten-round stage, so each comes up once per sitting. two is
   a Leap Word because its w is silent; the o says the third sound of o. */
const CARDS50=['tall','swamp','ball','fall','wall','want','water','wash','small','two'];

/* Lesson 52 -- phonograms oy and oi, two spellings of one sound.
   Both of the manual's Change the Word chains, run in both directions: the oi
   chain (join to coin to coil to boil to soil to spoil) and the oy chain (toy to
   joy to soy to coy to ploy). */
const OYCHANGE52=[
  {from:'join',  to:'coin',  hint:'change the j to a c'},
  {from:'coin',  to:'coil',  hint:'change the n to an l'},
  {from:'coin',  to:'join',  hint:'change the c to a j'},
  {from:'coil',  to:'boil',  hint:'change the c to a b'},
  {from:'coil',  to:'coin',  hint:'change the l to an n'},
  {from:'boil',  to:'soil',  hint:'change the b to an s'},
  {from:'boil',  to:'coil',  hint:'change the b to a c'},
  {from:'soil',  to:'spoil', hint:'add a p after the s'},
  {from:'soil',  to:'boil',  hint:'change the s to a b'},
  {from:'spoil', to:'soil',  hint:'take the p out'},
  {from:'toy',   to:'joy',   hint:'change the t to a j'},
  {from:'toy',   to:'boy',   hint:'change the t to a b'},
  {from:'joy',   to:'soy',   hint:'change the j to an s'},
  {from:'joy',   to:'toy',   hint:'change the j to a t'},
  {from:'soy',   to:'coy',   hint:'change the s to a c'},
  {from:'soy',   to:'joy',   hint:'change the s to a j'},
  {from:'coy',   to:'ploy',  hint:'change the c to a p and an l'},
  {from:'coy',   to:'toy',   hint:'change the c to a t'},
  {from:'boy',   to:'toy',   hint:'change the b to a t'}];
/* Find the /oy/ word. Both spellings sit in one pool on purpose, because the
   reading insight of this lesson is simply that oy and oi make the same sound --
   the manual says as much: for reading, that is all the student needs.
   Distractors come from this same list, so a round often pits boy against toy or
   soil against coin, which is real discrimination rather than spotting the only
   /oy/ word on screen. Notice that nothing here ends in oi: English words do not
   end in i, which is exactly why the end of a word always takes oy. */
const OYWORDS52=['boy','toy','joy','soy','enjoy','oyster','royal',
  'oil','point','join','soil','coin','boil','voice','choice','noise'];
/* Word Cards 263-272 -- the nine Practice Reading Words plus were on card 272.
   Ten cards against a ten-round stage, so each comes up once per sitting. were is
   a Leap Word because its Silent E has no job at all. */
const CARDS52=['boy','point','soil','toy','choice','noise','join','voice','enjoy','were'];

/* Lesson 54 -- phonograms aw and au, two spellings of one sound. The same shape
   as Lesson 52's oy and oi, and for the same reason: English words do not end in
   u, so au never lands at the end and aw takes that spot.
   Both of the manual's Change the Word chains, run in both directions: the aw
   chain (paw to jaw to raw to law to claw to thaw to draw) and the au one
   (pause to cause, which the manual then grows into because).
   No pair ever crosses between the two spellings, since the chains are built on a
   fixed vowel team with only the consonants moving. */
const AWCHANGE54=[
  {from:'paw',   to:'jaw',   hint:'change the p to a j'},
  {from:'paw',   to:'saw',   hint:'change the p to an s'},
  {from:'jaw',   to:'raw',   hint:'change the j to an r'},
  {from:'jaw',   to:'paw',   hint:'change the j to a p'},
  {from:'raw',   to:'law',   hint:'change the r to an l'},
  {from:'raw',   to:'jaw',   hint:'change the r to a j'},
  {from:'law',   to:'claw',  hint:'add a c at the front'},
  {from:'law',   to:'paw',   hint:'change the l to a p'},
  {from:'law',   to:'raw',   hint:'change the l to an r'},
  {from:'claw',  to:'thaw',  hint:'change the cl to a t and an h'},
  {from:'claw',  to:'draw',  hint:'change the cl to a d and an r'},
  {from:'thaw',  to:'draw',  hint:'change the th to a d and an r'},
  {from:'draw',  to:'claw',  hint:'change the dr to a c and an l'},
  {from:'saw',   to:'paw',   hint:'change the s to a p'},
  {from:'pause', to:'cause', hint:'change the p to a c'},
  {from:'cause', to:'pause', hint:'change the c to a p'},
  {from:'haul',  to:'maul',  hint:'change the h to an m'},
  {from:'maul',  to:'haul',  hint:'change the m to an h'},
  {from:'fault', to:'vault', hint:'change the f to a v'},
  {from:'vault', to:'fault', hint:'change the v to an f'}];
/* Find the /aw/ word. Both spellings share one pool, because the reading insight
   is simply that aw and au make the same sound -- the manual says the student
   need know no more than that. Distractors come from this same list, so rounds
   pit saw against law or pause against cause.
   Nothing here ends in au, which is the whole reason two spellings exist. */
const AWWORDS54=['saw','law','draw','claw','lawn','yawn','hawk','straw',
  'haul','pause','cause','because','August','launch','sauce','fault'];
/* Word Cards 273-282 -- the nine Practice Reading Words plus aunt on card 282.
   Ten cards against a ten-round stage, so each comes up once per sitting. aunt is
   a Leap Word because its au does not say /aw/; most of us say it like ant. */
const CARDS54=['saw','law','yawn','hawk','draw','haul','pause','August','because','aunt'];

/* Lesson 56 -- phonograms ow and ou. The third pair of this shape after oy/oi
   and aw/au, split by the same rule: English words do not end in u, so ou stays
   inside a word and ow takes the end.
   What is new here, and the intro says so, is that both of these carry OTHER
   sounds as well -- ow can say long o as in low, and ou has three more besides.
   Those belong to later levels, so every word in this lesson uses /ow/ only.
   Both of the manual's Change the Word chains, run in both directions. */
const OWCHANGE56=[
  {from:'down',   to:'town',   hint:'change the d to a t'},
  {from:'town',   to:'down',   hint:'change the t to a d'},
  {from:'town',   to:'clown',  hint:'change the t to a c and an l'},
  {from:'clown',  to:'crown',  hint:'change the l to an r'},
  {from:'crown',  to:'clown',  hint:'change the r to an l'},
  {from:'crown',  to:'brown',  hint:'change the c to a b'},
  {from:'brown',  to:'frown',  hint:'change the b to an f'},
  {from:'frown',  to:'brown',  hint:'change the f to a b'},
  {from:'cow',    to:'now',    hint:'change the c to an n'},
  {from:'now',    to:'cow',    hint:'change the n to a c'},
  {from:'now',    to:'how',    hint:'change the n to an h'},
  {from:'how',    to:'now',    hint:'change the h to an n'},
  {from:'found',  to:'pound',  hint:'change the f to a p'},
  {from:'pound',  to:'sound',  hint:'change the p to an s'},
  {from:'pound',  to:'found',  hint:'change the p to an f'},
  {from:'sound',  to:'round',  hint:'change the s to an r'},
  {from:'round',  to:'ground', hint:'change the r to a g and an r'},
  {from:'round',  to:'found',  hint:'change the r to an f'},
  {from:'ground', to:'round',  hint:'take the g off the front'},
  {from:'out',    to:'shout',  hint:'add an s and an h at the front'},
  {from:'shout',  to:'out',    hint:'take the sh off the front'},
  {from:'ouch',   to:'couch',  hint:'add a c at the front'},
  {from:'couch',  to:'ouch',   hint:'take the c off the front'},
  {from:'house',  to:'mouse',  hint:'change the h to an m'},
  {from:'mouse',  to:'house',  hint:'change the m to an h'}];
/* Find the /ow/ word. Both spellings share one pool, since the reading insight is
   that ow and ou make the same sound here. Distractors come from the same list,
   so rounds pit down against town or found against cloud.
   Nothing ends in ou, which is the whole reason the two spellings exist. */
const OWWORDS56=['cow','now','down','town','brown','clown','owl','flower',
  'out','house','mouse','mouth','found','cloud','round','shout'];
/* Word Cards 283-292 -- the eight Practice Reading Words plus any and many on
   cards 291 and 292. Ten cards against a ten-round stage, so each comes up once
   per sitting. any and many rhyme and are both Leap Words: neither the a nor the
   y says what the rules so far would predict. */
const CARDS56=['brown','cloud','down','out','flower','found','mouth','now','any','many'];

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

   A single-activity lesson/game plays 25 rounds by default; a multi-stage lesson's
   stage `rounds` should sum to 25. Every pool above is sized to have at least as
   many unique items as the rounds drawn from it, since the game controller now
   draws WITHOUT replacement (no repeated questions in one sitting) — see README.md.
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
      {engine:'review', pool:BLENDS, rounds:15, label:'Find the Blend Word'},
      {engine:'wordchange', pool:WORDCHANGE, rounds:10, label:'Change the Word'}
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
      {engine:'review', pool:YWORDS, rounds:15, label:'Find the Y Word'},
      {engine:'wordchange', pool:{instruction:'Change the word! Swap the beginning sound to make a new -y word.', pairs:YCHANGE}, rounds:10, label:'Change the Word'}
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
      {engine:'syllablesplit', pool:SPLIT, rounds:15, label:'Split the Word'},
      {engine:'wordchange', pool:{instruction:'Guess What I\'m Saying! Blend the parts into one word.', pairs:GUESSWORDS}, rounds:10, label:'Guess What I\'m Saying'}
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
  },
  {id:'L12', n:12, title:'One Consonant Between Two Vowels', emoji:'↔️', cls:'c-phon',
    intro:{
      topic:'Which syllable does the consonant join?',
      lines:[
        'Last lesson you learned that when one consonant sits between two vowels, it usually hops over to the second syllable. That leaves the first syllable <b>open</b>, so its vowel says its long name: <b>fro-zen</b>, <b>si-lent</b>, <b>ho-tel</b>.',
        'But that doesn\'t always work. Try it on <b>robin</b>. Splitting it ro-bin gives the o its long sound, and /roe-bin/ isn\'t a real word. So slide the consonant back one spot: <b>rob-in</b>. Now the first syllable is <b>closed</b> and the o says its short sound.',
        'The test is always the same. Split it the first way, say it out loud, and ask yourself whether that is a real word. If it isn\'t, slide the consonant back and say it again.',
        'One more thing to watch for: consonant teams like <b>ck</b> and <b>nk</b> stick together on one tile and never get split apart. That\'s why <b>pocket</b> divides as pock-et, never po-cket.'
      ],
      words:['frozen','robin','pocket'],
      review:['cricket','planet','pocket','habit','seven','finish','jacket','visit','radish','blanket'],
      trick:{
        title:'Just remember',
        points:[
          {w:'Try open first', note:'the consonant usually goes with the second syllable — fro-zen, ho-tel'},
          {w:'Not a real word?', note:'slide the consonant back so the first syllable is closed — rob-in, hab-it'},
          {w:'Teams stay together', note:'ck and nk never split apart — pock-et, blank-et'}
        ]
      }
    },
    stages:[
      {engine:'vcvsplit', pool:VCV12, rounds:15, label:'Split the Word'},
      {engine:'wordchange', pool:{instruction:'Guess What I\'m Saying! Blend the parts into one word.', pairs:GUESS12}, rounds:10, label:'Guess What I\'m Saying'}
    ]
  },
  {id:'L14', n:14, title:'The First Job of Silent E', emoji:'🪄', cls:'c-magic',
    intro:{
      topic:'Silent E and its very first job',
      lines:[
        'When <b>e</b> lands at the end of a word it almost always stays quiet, so we call it <b>Silent E</b>. It makes no sound of its own — but it still changes the word.',
        'Its first and most common job is to reach back over one consonant and make the vowel in front of it say its <b>long</b> sound, which is just the vowel\'s name. <b>mad</b> turns into <b>made</b>. <b>hop</b> turns into <b>hope</b>. <b>kit</b> turns into <b>kite</b>.',
        'Take the e away again and the vowel snaps right back to its short sound. That is the whole trick: <b>tap</b> and <b>tape</b> are the same letters until Silent E shows up.',
        'So when you meet a word that ends in e, look at the vowel earlier in the word and expect it to be long. Sound it out that way first — d-i-m-e says dime.'
      ],
      words:['made','hope','kite'],
      review:['ate','bite','made','tape','time','hate','note','hope','dime','ride'],
      trick:{
        title:'Just remember',
        points:[
          {w:'Silent E is quiet', note:'it never makes a sound of its own'},
          {w:'It works backwards', note:'it reaches back over one consonant to the vowel — hop, hope'},
          {w:'Long means its name', note:'the vowel says its alphabet name — made, note, dime'}
        ]
      }
    },
    stages:[
      {engine:'magic', pool:MAGIC14, rounds:8, label:'Add Silent E'},
      {engine:'minimalpair', pool:SILENTE14, rounds:7, label:'Kit or Kite?'},
      {engine:'sightword', pool:CARDS14, rounds:10, label:'Read the Word Cards'}
    ]
  },
  {id:'L15', n:15, title:'Name Game Syllables', emoji:'🎉', cls:'c-syll',
    intro:{
      topic:'The third syllable type: Name Game',
      lines:[
        'You already know two syllable types. A <b>closed</b> syllable ends in a consonant and its vowel stays short, like <b>step</b>. An <b>open</b> syllable ends in a vowel and its vowel goes long, like <b>we</b>.',
        'Here is the third one. When Silent E gets in line at the end, after a consonant, you have a <b>Name Game</b> syllable. Silent E asks the vowel what its name is, and the vowel answers by saying it: <b>cake</b>, <b>bike</b>, <b>game</b>.',
        'Picture the vowels at a party wearing a party hat. The hat is how you spot this type — a vowel, then one consonant, then Silent E on the end.',
        'Making the vowel long is Silent E\'s most common job, but it is not the only one. You will meet its other jobs in later lessons.'
      ],
      words:['cake','bike','game'],
      review:['home','five','size','date','here','more','name','like','make'],
      trick:{
        title:'The three tags',
        points:[
          {w:'Closed', note:'ends in a consonant — step, gift, lick'},
          {w:'Open', note:'ends in a vowel — we, go, she'},
          {w:'Name Game', note:'vowel, one consonant, then Silent E — cake, bike, five'}
        ]
      }
    },
    stages:[
      {engine:'syllabletag', pool:SYLTAG15, rounds:10, label:'Tag the Syllable'},
      {engine:'wordchange', pool:{instruction:'Word Flipper! Read the hint, then pick the new word.', pairs:WORDFLIP15}, rounds:6, label:'Word Flippers'},
      {engine:'sightword', pool:CARDS15, rounds:9, label:'Read the Word Cards'}
    ]
  },
  {id:'L17', n:17, title:'Long U and the Sound of S', emoji:'🎧', cls:'c-sound',
    intro:{
      topic:'Two sounds for u, and a job for s',
      lines:[
        'Say the name of the letter <b>u</b> out loud. Hear how it starts with a little <b>y</b>? That is one of long u\'s two sounds, and it is the one in <b>cute</b>, <b>use</b> and <b>music</b>.',
        'In plenty of other words that little y gets dropped and long u just says <b>oo</b>. Listen to <b>rule</b>, <b>June</b> and <b>tuna</b>. There is no rule for which words do which, so say the word out loud and let your mouth pick.',
        'Now the second half. You already know s can say /s/ or /z/. Here is the pattern: when s sits <b>between two vowels</b>, it usually says /z/. That is why <b>nose</b> buzzes at the end, and so do <b>these</b> and <b>chose</b>.',
        'Usually, though, is not always. A few words keep the hissing s in that very same spot — <b>goose</b>, <b>case</b> and <b>house</b>. Your ear is the judge.'
      ],
      words:['cute','rule','nose'],
      review:['use','cute','wise','rule','these','those','nose','June','chose','hose'],
      trick:{
        title:'Two things to listen for',
        points:[
          {w:'Long u, two ways', note:'one has a little y in it — cute, music. The other does not — rule, June'},
          {w:'S between two vowels', note:'usually buzzes as /z/ — nose, these, chose'},
          {w:'But not always', note:'goose, case and house keep the hissing s'}
        ]
      }
    },
    stages:[
      {engine:'sortsound', pool:LONGU17, rounds:8, label:'Two Sounds of U'},
      {engine:'sortsound', pool:SSOUND17, rounds:7, label:'The Sound of S'},
      {engine:'sightword', pool:CARDS17, rounds:10, label:'Read the Word Cards'}
    ]
  },
  {id:'L19', n:19, title:'Phonogram WH', emoji:'🐋', cls:'c-contr',
    intro:{
      topic:'Two letters, one sound',
      lines:[
        'When <b>w</b> and <b>h</b> team up at the front of a word they make one sound together, /hw/. You hear it in <b>white</b>, <b>when</b> and <b>whale</b>.',
        'Here is how to feel it. Hold your hand in front of your mouth and say <b>when</b>. That little puff of breath on your palm is the h doing its part. Now try plain w in <b>wet</b> and notice how much less breath there is.',
        'In a lot of places the difference between wh and w is very small, so do not worry if the two sound nearly the same when you say them. What matters for reading is seeing the two letters together and knowing they work as one team.',
        'This lesson also brings four <b>Leap Words</b>. Those are words that break the rules you have learned so far, so instead of sounding them out you leap right over and just know them.'
      ],
      words:['white','when','whale'],
      review:['when','while','white','whale','which','why'],
      trick:{
        title:'The four Leap Words',
        points:[
          {w:'some', note:'the o says /u/ like in up, and the silent e does not stretch it'},
          {w:'come', note:'the very same trick as some'},
          {w:'something', note:'a compound word — some and thing stuck together'},
          {w:'what', note:'the a says /u/, not the sound you would expect'}
        ]
      }
    },
    stages:[
      {engine:'review', pool:WHWORDS19, rounds:9, label:'Find the WH Word'},
      {engine:'wordchange', pool:{instruction:'Change the Word! Read the hint, then pick the new word.', pairs:WHCHANGE19}, rounds:6, label:'Change the Word'},
      {engine:'sightword', pool:CARDS19, rounds:6, label:'Read the Word Cards'},
      {engine:'sightword', pool:LEAP19, rounds:4, label:'Leap Words'}
    ]
  },
  {id:'L21', n:21, title:'Blends with Silent E', emoji:'🍇', cls:'c-review',
    intro:{
      topic:'Two things you know, stuck together',
      lines:[
        'You can already read a word that starts with a <b>blend</b>, like <b>slide</b> and <b>frame</b>. You can already read a <b>Name Game</b> word, where Silent E makes the vowel say its name. This lesson puts both in the same word.',
        'Watch it get built. Start with <b>side</b>, slip an l in after the s, and you have <b>slide</b>. Start with <b>sale</b>, add a t after the s, and you have <b>stale</b>. The Silent E keeps doing its job the whole time.',
        'Then something new. A <b>heteronym</b> is a word spelled one way but said two ways, and the sentence around it is the only thing that tells you which. Look at <b>close</b>: you <b>close</b> the door, but you also sit <b>close</b> to someone.',
        'So when a word looks familiar but sounds wrong in the sentence, try it the other way. Read the whole sentence and let it tell you.'
      ],
      words:['slide','frame','grape'],
      review:['drive','smile','store','frame','brave','trade','state','grape','square'],
      trick:{
        title:'Heteronyms to know',
        points:[
          {w:'close', note:'shut the door, or sit close by — the s buzzes, then it hisses'},
          {w:'live', note:'where you live, or a live fish — short i, then long i'},
          {w:'wind', note:'the wind blows, or you wind a string — short i, then long i'},
          {w:'read', note:'read it today, or read it last week — reed, then red'}
        ]
      }
    },
    stages:[
      {engine:'wordchange', pool:{instruction:'Change the Word! Read the hint, then pick the new word.', pairs:BLENDE21}, rounds:8, label:'Change the Word'},
      {engine:'heteronym', pool:HETERO21, rounds:8, label:'Same Word, Two Ways'},
      {engine:'sightword', pool:CARDS21, rounds:9, label:'Read the Word Cards'}
    ]
  },
  {id:'L23', n:23, title:'Plural Silent E Words', emoji:'🐛', cls:'c-ed',
    intro:{
      topic:'More than one, with Silent E still working',
      lines:[
        'Adding an <b>s</b> to the end of a word makes it mean more than one. One <b>cake</b>, two <b>cakes</b>. One <b>joke</b>, two <b>jokes</b>.',
        'Here is the trap to dodge. When you meet <b>cakes</b>, do not read it as <b>cak</b> plus <b>es</b>. Cover the s with your finger and read the base word <b>cake</b>, with Silent E still doing its job. Then uncover the s and say <b>cakes</b>.',
        'Most of the time that s does not add a syllable at all. <b>ropes</b>, <b>vines</b> and <b>kites</b> are each just one clap.',
        'But when the base word already ends in a hissing or buzzing sound, the s has to start a whole new syllable. <b>noses</b> is two claps, and so is <b>prizes</b>. Say them slowly and you will hear the extra beat.'
      ],
      words:['cakes','ropes','prizes'],
      review:['miles','cakes','games','gates','notes','holes','jokes','lakes'],
      trick:{
        title:'Handy to remember',
        points:[
          {w:'Stuck on a plural?', note:'cover the s, read the base word, then put the s back on'},
          {w:'pony', note:'a Leap Word — the y at the end says long e, which you have not studied yet'},
          {w:'sandwich', note:'a Leap Word — sand plus wich, split by a rule you have not learned yet'}
        ]
      }
    },
    stages:[
      {engine:'wordchange', pool:{instruction:'You have one of these. Now pick the word that means more than one.', pairs:PLURAL23}, rounds:8, label:'Make It Plural'},
      {engine:'syllable', pool:CLAP23, rounds:7, label:'Clap the Plural'},
      {engine:'sightword', pool:CARDS23, rounds:8, label:'Read the Word Cards'},
      {engine:'sightword', pool:LEAP23, rounds:2, label:'Leap Words'}
    ]
  },
  {id:'L25', n:25, title:'EE and Vowel Teams', emoji:'🐑', cls:'c-phon',
    intro:{
      topic:'The EE team, and a fourth kind of syllable',
      lines:[
        'Two <b>e</b>s side by side make one single sound, and that sound is long e. You hear it in <b>need</b>, <b>green</b> and <b>queen</b>. Because the two letters work together as one, we call them a <b>vowel team</b>.',
        'A vowel team rides on one tile, so when you sound out <b>feet</b> you say f, then ee, then t. Three sounds, even though there are four letters.',
        'That gives you a fourth kind of syllable. You already know <b>closed</b>, <b>open</b> and <b>Name Game</b>. Now add <b>Vowel Team</b>, for any syllable that gets its vowel sound from a team of letters — <b>seek</b>, <b>beep</b>, <b>teeth</b>.',
        'When you split a longer word, treat the whole team as one vowel. In <b>fifteen</b> the vowels are the i and the ee, with two consonants between them, so it splits <b>fif-teen</b>. Closed first, then Vowel Team.'
      ],
      words:['feet','green','fifteen'],
      review:['deep','green','feet','keep','need','street','tree','queen','speed','been'],
      trick:{
        title:'Worth remembering',
        points:[
          {w:'Four tags now', note:'Closed, Open, Name Game, and Vowel Team'},
          {w:'Splitting a word?', note:'a vowel team counts as one vowel — fif-teen, week-end'},
          {w:'been', note:'ee says long e everywhere except here — most of us say it like bin, so it is a Leap Word'}
        ]
      }
    },
    stages:[
      {engine:'wordchange', pool:{instruction:'Change the Word! Read the hint, then pick the new word.', pairs:EECHANGE25}, rounds:7, label:'Change the Word'},
      {engine:'syllabletag', pool:SYLTAG25, rounds:8, label:'Form Teams'},
      {engine:'sightword', pool:CARDS25, rounds:10, label:'Read the Word Cards'}
    ]
  },
  {id:'L27', n:27, title:'Contractions', emoji:'🤏', cls:'c-contr',
    intro:{
      topic:'Two words squeezed into one',
      lines:[
        'A <b>contraction</b> is a shorter way of saying something. You take two words, squeeze them together into one, and drop an <b>apostrophe</b> in where the missing letters used to be.',
        'Think of a rubber band. Stretch it and it <b>expands</b>. Let go and it <b>contracts</b>, getting smaller. That is exactly what these words do.',
        'Watch it happen. Put <b>we</b> and <b>will</b> side by side. Take the w and the i out of <b>will</b>, stand an apostrophe in their place, and you have <b>we\'ll</b>.',
        'Here is the handy part. The first word never changes. The letters that vanish always come out of the second word, and the apostrophe marks the exact spot where they were.'
      ],
      words:["we'll","she's","can't"],
      review:["I'm","can't","aren't","she's","you'll","that's","isn't","let's","what's","it's"],
      trick:{
        title:'Two things to remember',
        points:[
          {w:'The first word never changes', note:'she is becomes she\'s, and the she stays exactly as it was'},
          {w:'The apostrophe marks the gap', note:'it stands right where the missing letters used to be'},
          {w:'One word breaks the rule', note:'will not becomes won\'t, where even the first word changes \u2014 that one comes in a later lesson'}
        ]
      }
    },
    stages:[
      {engine:'contraction', pool:CONTRACT27, rounds:8, label:'Contract It'},
      {engine:'expand', pool:CONTRACT27, rounds:7, label:'Expand It'},
      {engine:'sightword', pool:CARDS27, rounds:10, label:'Read the Word Cards'}
    ]
  },
  {id:'L29', n:29, title:'The Find Gold Rule', emoji:'🪙', cls:'c-syll',
    intro:{
      topic:'A fourth way a vowel goes long',
      lines:[
        'You already know three ways a vowel can go long. It can sit at the end of an open syllable like <b>be</b>, it can wear a Silent E like <b>bone</b>, or it can join a team like the ee in <b>sheep</b>. Here is the fourth.',
        'In a one-syllable word, when <b>i</b> or <b>o</b> is followed by <b>two consonants</b>, it often says its long sound. That is why <b>find</b> and <b>gold</b> sound the way they do. We call it the <b>Find Gold</b> rule, after exactly those two words.',
        'Once you know the shape you will spot it everywhere: ch<b>ild</b>, beh<b>ind</b>, r<b>oll</b>, h<b>old</b>, c<b>olt</b>, m<b>ost</b>.',
        'One catch, and it matters. The rule says the vowel <b>may</b> go long, not that it always does. Plenty of words with that very same shape keep the short sound, like <b>lost</b>, <b>cost</b> and <b>gift</b>. So say the word out loud and let your ear settle it.'
      ],
      words:['find','gold','child'],
      review:['told','wild','both','child','hold','most','find','behind',"don't","won't"],
      trick:{
        title:'Two contractions worth a look',
        points:[
          {w:'don\'t', note:'do plus not \u2014 and the o goes long, because now two consonants follow it'},
          {w:'won\'t', note:'will plus not \u2014 the one contraction where even the first word changes'},
          {w:'Rule of thumb', note:'i or o, then two consonants, often means long \u2014 but say it aloud to be sure'}
        ]
      }
    },
    stages:[
      {engine:'wordchange', pool:{instruction:'Change the Word! Read the hint, then pick the new word.', pairs:GOLDCHANGE29}, rounds:6, label:'Change the Word'},
      {engine:'sortsound', pool:GOLDSORT29, rounds:7, label:'Long or Short?'},
      {engine:'sightword', pool:CARDS29, rounds:10, label:'Read the Word Cards'},
      {engine:'sightword', pool:LEAP29, rounds:2, label:'Leap Words'}
    ]
  },
  {id:'L31', n:31, title:'ER and Bossy R', emoji:'👑', cls:'c-magic',
    intro:{
      topic:'The fifth syllable type',
      lines:[
        'Two letters, one sound, again. <b>e</b> and <b>r</b> together say <b>/er/</b>, the sound you hear at the end of <b>her</b>. You will meet it everywhere, because thousands of longer words finish with it \u2014 <b>winter</b>, <b>paper</b>, <b>summer</b>, <b>under</b>.',
        'Here is what makes it special. When a vowel has an <b>r</b> right behind it, the r takes charge and changes what that vowel says. We pretend the r is <b>bossy</b>, telling the vowel what to do.',
        'That gives you the fifth syllable type: <b>Bossy R</b>. It is why <b>herd</b> and <b>fern</b> are not Closed syllables. Do not go looking for a short vowel in them, because the r has already decided.',
        'And when you split a longer word, the er counts as the vowel of its syllable. <b>paper</b> has one consonant sitting between its two vowels, so it divides <b>pa-per</b> \u2014 Open first, then Bossy R.'
      ],
      words:['her','fern','paper'],
      review:['never','paper','after','summer','winter','over','under'],
      trick:{
        title:'Three Leap Words that rhyme',
        points:[
          {w:'done', note:'the o says /u/ like in up, and the silent e is there only so it is not read as Don'},
          {w:'none', note:'rhymes with done, same o \u2014 the e keeps it from looking like non'},
          {w:'one', note:'the o says /wu/, which is unusual \u2014 stop and remember this one'}
        ]
      }
    },
    stages:[
      {engine:'syllablesplit', pool:ERSPLIT31, rounds:8, label:'Split the Word'},
      {engine:'syllabletag', pool:SYLTAG31, rounds:7, label:'Form Teams'},
      {engine:'sightword', pool:CARDS31, rounds:7, label:'Read the Word Cards'},
      {engine:'sightword', pool:LEAP31, rounds:3, label:'Leap Words'}
    ]
  },
  {id:'L33', n:33, title:'AR and Long Words', emoji:'⭐', cls:'c-sound',
    intro:{
      topic:'AR, and reading really long words',
      lines:[
        '<b>a</b> and <b>r</b> together say <b>/ar/</b>, the sound sitting in the middle of <b>car</b> and <b>barn</b>. Just like er, it is a vowel with an r right behind it, so any syllable holding it is a <b>Bossy R</b> syllable.',
        'That makes <b>shark</b> and <b>start</b> Bossy R syllables from end to end, and it means <b>garden</b> divides into <b>gar-den</b> \u2014 Bossy R first, then Closed.',
        'Now for the big one. You can read a word you have never laid eyes on before, however long it looks, by splitting it into syllables and taking them one at a time.',
        'Try <b>fantastic</b>. Find the first two vowels, notice two consonants between them, and split: <b>fan</b>. Then do the very same thing again to what is left: <b>tas</b>, then <b>tic</b>. Three syllables, three easy pieces, and the word almost reads itself.'
      ],
      words:['car','barn','fantastic'],
      review:['barn','sharp','hard','start','March','dark'],
      trick:{
        title:'Four Leap Words',
        points:[
          {w:'warm', note:'the ar says /or/ here instead of /ar/ \u2014 unless your part of the country says it the regular way'},
          {w:'Mr. and Mrs.', note:'short forms of mister and missus, each with a capital letter and a period'},
          {w:'too', note:'the pair of o letters works together to say /oo/'}
        ]
      }
    },
    stages:[
      {engine:'wordchange', pool:{instruction:'Change the Word! Read the hint, then pick the new word.', pairs:ARCHANGE33}, rounds:8, label:'Change the Word'},
      {engine:'syllablesplit3', pool:THREESYL33, rounds:7, label:'Three Syllables'},
      {engine:'sightword', pool:CARDS33, rounds:6, label:'Read the Word Cards'},
      {engine:'sightword', pool:LEAP33, rounds:4, label:'Leap Words'}
    ]
  },
  {id:'L35', n:35, title:'Phonogram OR', emoji:'🌽', cls:'c-ed',
    intro:{
      topic:'The third Bossy R spelling',
      lines:[
        '<b>o</b> and <b>r</b> together say <b>/or/</b>, the sound sitting in <b>corn</b> and <b>fork</b>. It is another vowel with an r right behind it, so any syllable holding it is a <b>Bossy R</b> syllable, exactly like the ones with ar and er.',
        'Listen for it: <b>storm</b>, <b>north</b>, <b>morning</b>, <b>short</b>. Once your ear has caught it, you will start hearing it everywhere.',
        'When you split a longer word, keep the or together. <b>forest</b> divides <b>for-est</b>, never fo-rest, because we almost never break a phonogram in half. And <b>order</b> divides <b>or-der</b> \u2014 two Bossy R syllables in a row.',
        'One thing to tuck away for later. or actually has a <b>second</b> sound, the /er/ you hear in <b>work</b>. You will meet that one further along in your books. Everything in this lesson uses the first sound.'
      ],
      words:['corn','fork','forest'],
      review:['north','short','order','fork','corn','forest','morning','forever','forget','storm'],
      trick:{
        title:'Handy to remember',
        points:[
          {w:'Bossy R again', note:'ar, then er, and now or \u2014 a vowel with an r behind it, and the r decides the sound'},
          {w:'Keep it together', note:'never split a phonogram in half \u2014 for-est, not fo-rest'},
          {w:'Two in a row', note:'order divides or-der, and both halves are Bossy R syllables'}
        ]
      }
    },
    stages:[
      {engine:'wordchange', pool:{instruction:'Change the Word! Read the hint, then pick the new word.', pairs:ORCHANGE35}, rounds:8, label:'Change the Word'},
      {engine:'syllablesplit', pool:ORSPLIT35, rounds:7, label:'Split the Word'},
      {engine:'sightword', pool:CARDS35, rounds:10, label:'Read the Word Cards'}
    ]
  },
  {id:'L37', n:37, title:'The Third Sound of U', emoji:'🐉', cls:'c-phon',
    intro:{
      topic:'U has a third sound',
      lines:[
        'The letter <b>u</b> has three sounds. You already know the short one in <b>up</b> and the long one in <b>unit</b>. Here is the third: <b>/oo/</b>, the sound sitting in <b>put</b>.',
        'Hardly any words use it, and that is the good news. Learn this small handful and you have very nearly all of them: <b>put</b>, <b>push</b>, <b>pull</b>, <b>full</b>, <b>bull</b>, <b>bush</b>.',
        'If you meet a u and are not sure which sound it wants, just try them in order. Short first, then long, then this one. One of the three will make a real word.',
        'This lesson also has a listening game. Say <b>lem...on</b> slowly, sounding the second part exactly as it is spelled, then say the whole thing fast. Out comes <b>lemon</b>. That second syllable gets muffled when we talk quickly, so sounding it out gets you close and normal speed finishes the job.'
      ],
      words:['put','push','pull'],
      review:['push','full','pull','put','bacon','wagon','dragon','lemon'],
      trick:{
        title:'Worth remembering',
        points:[
          {w:'Not sure which u?', note:'try short, then long, then /oo/ \u2014 stop when you get a real word'},
          {w:'where', note:'a Leap Word \u2014 the e-r-e does not say what you would expect'},
          {w:'there', note:'the very same odd e-r-e, and yes, it rhymes with where'}
        ]
      }
    },
    stages:[
      {engine:'wordchange', pool:{instruction:'Change the Word! Read the hint, then pick the new word.', pairs:UCHANGE37}, rounds:8, label:'Change the Word'},
      {engine:'wordchange', pool:{instruction:'Guess What I\'m Saying! Blend the parts into one word.', pairs:GUESS37}, rounds:7, label:'Guess What I\'m Saying'},
      {engine:'sightword', pool:CARDS37, rounds:8, label:'Read the Word Cards'},
      {engine:'sightword', pool:LEAP37, rounds:2, label:'Leap Words'}
    ]
  },
  {id:'L39', n:39, title:'Soft C and Silent E', emoji:'🪶', cls:'c-review',
    intro:{
      topic:'Soft C, and Silent E takes a second job',
      lines:[
        'The letter <b>c</b> has two sounds. The hard one is /k/, the sound in <b>cake</b>. The soft one is /s/, the sound in <b>city</b>.',
        'Here is how to tell which one you are looking at, and it works very nearly every time. If the c is followed by <b>e</b>, <b>i</b> or <b>y</b>, it goes soft and says /s/. In front of any other letter it stays hard and says /k/.',
        'Try it yourself. <b>cent</b>, <b>city</b> and <b>pencil</b> are all soft. <b>cat</b>, <b>cold</b>, <b>cup</b> and <b>cry</b> are all hard.',
        'And that hands Silent E a <b>second job</b>. You already know the first one, stretching a vowel out long the way it does in <b>cake</b>. But in <b>fence</b> and <b>prince</b> it is not doing that at all \u2014 those vowels stay short. That e is there purely to sit behind the c and make it say /s/.'
      ],
      words:['cake','city','fence'],
      review:['cent','dance','fence','force','prince','chance','since','pencil','center','France'],
      trick:{
        title:'Two jobs for one quiet letter',
        points:[
          {w:'Job one', note:'Silent E makes the vowel long \u2014 cake, bike, home'},
          {w:'Job two', note:'Silent E makes the c soft \u2014 fence, prince, dance'},
          {w:'The soft c rule', note:'c before e, i or y says /s/; before anything else it says /k/'}
        ]
      }
    },
    stages:[
      {engine:'sortsound', pool:CSOUND39, rounds:8, label:'Hammers and Feathers'},
      {engine:'sortsound', pool:SILENTE39, rounds:7, label:'Which Job?'},
      {engine:'sightword', pool:CARDS39, rounds:10, label:'Read the Word Cards'}
    ]
  },
  {id:'L40', n:40, title:'Silent E Has Two Jobs', emoji:'🕵️', cls:'c-magic',
    intro:{
      topic:'One quiet letter, two jobs at once',
      lines:[
        'You know both of Silent E\'s jobs now. Job one is making the vowel say its name, the way it does in <b>cake</b>. Job two is making the c go soft, the way it does in <b>fence</b>.',
        'Here is the twist. Sometimes Silent E does <b>both at the same time</b>. Look at <b>mice</b>. That one little e makes the i say its name and makes the c say /s/. Two jobs, one quiet letter.',
        'Now hold <b>place</b> next to <b>since</b>. In <b>place</b> the e is working twice over, long a and soft c. In <b>since</b> it has only the one job, softening the c, because that i stays short.',
        'So whenever you meet a word ending in <b>ce</b>, put on your detective hat and ask how hard that little e is working. One job, or two?'
      ],
      words:['mice','place','since'],
      review:['ice','face','nice','twice','space','place','price','lace','mice','rice'],
      trick:{
        title:'How to tell them apart',
        points:[
          {w:'Two jobs', note:'one consonant before the e \u2014 place, mice, ice. Long vowel and soft c'},
          {w:'One job', note:'two consonants before the e \u2014 since, fence, dance. Short vowel, soft c only'},
          {w:'Why that works', note:'the extra consonant closes the syllable, so the vowel cannot stretch out long'}
        ]
      }
    },
    stages:[
      {engine:'wordchange', pool:{instruction:'Change the Word! Read the hint, then pick the new word.', pairs:CECHANGE40}, rounds:7, label:'Change the Word'},
      {engine:'sortsound', pool:DETECTIVE40, rounds:8, label:'Detective Dog'},
      {engine:'sightword', pool:CARDS40, rounds:10, label:'Read the Word Cards'}
    ]
  },
  {id:'L42', n:42, title:'Soft G', emoji:'💎', cls:'c-syll',
    intro:{
      topic:'Soft G, and why it is trickier than soft C',
      lines:[
        'Just like c, the letter <b>g</b> has a hard sound and a soft one. Hard g is /g/, the sound in <b>goat</b>. Soft g is /j/, the sound in <b>gem</b>.',
        'The pattern will look familiar. G before <b>e</b>, <b>i</b> or <b>y</b> usually goes soft: <b>gem</b>, <b>germ</b>, <b>giant</b>, <b>gym</b>.',
        'But notice that word <b>usually</b>, because this is where g parts company with c. A handful of very common words keep the hard sound even before those letters \u2014 <b>get</b>, <b>girl</b>, <b>gift</b>, <b>give</b>, <b>begin</b>. So if a word sounds wrong with one sound, simply try the other.',
        'Silent E turns up here too, doing the same work it did with c. In <b>large</b> its only job is softening the g. In <b>huge</b> it manages both jobs at once, long u and soft g. Same question as last lesson, just with a g this time.'
      ],
      words:['gem','goat','huge'],
      review:['cage','huge','large','germ','age','page','change','danger','orange','pumpkin'],
      trick:{
        title:'Worth knowing',
        points:[
          {w:'Soft wins most of the time', note:'g is soft in hundreds of words and hard in only about forty'},
          {w:'The stubborn few', note:'get, girl, gift, give and begin keep their hard g \u2014 try the other sound if one comes out wrong'},
          {w:'pumpkin', note:'a Leap Word \u2014 pump plus kin, split by a rule you have not learned yet'}
        ]
      }
    },
    stages:[
      {engine:'sortsound', pool:GSOUND42, rounds:8, label:'Hard or Soft G'},
      {engine:'sortsound', pool:SILENTEG42, rounds:7, label:'How Many Jobs?'},
      {engine:'sightword', pool:CARDS42, rounds:10, label:'Read the Word Cards'}
    ]
  },
  {id:'L44', n:44, title:'The Third Job of Silent E', emoji:'💙', cls:'c-contr',
    intro:{
      topic:'Silent E takes on a third job',
      lines:[
        'Two jobs so far. Silent E can make a vowel long, and it can soften a c or a g. Here is the third, and this one is a rule about English spelling itself.',
        'English words <b>never</b> end in <b>v</b>, and hardly ever end in <b>u</b>. So when a word would otherwise finish on one of those letters, Silent E steps in and takes the last spot instead \u2014 <b>give</b>, <b>have</b>, <b>blue</b>, <b>clue</b>.',
        'That is why a v-word will not tell you about its own vowel. <b>give</b> and <b>gave</b> are built to exactly the same shape, yet the i in give stays short while the a in gave goes long. In <b>give</b> the e has only the one job. In <b>gave</b> it has two.',
        'So Silent E now has three jobs it can do. Stretch a vowel, soften a c or g, or simply keep u and v off the end of a word. And sometimes, as you have seen, it manages more than one at a time.'
      ],
      words:['give','blue','carve'],
      review:['blue','give','forgive','glue','carve','true','live','twelve','Sue','clue'],
      trick:{
        title:'All three jobs',
        points:[
          {w:'Job one', note:'make the vowel long \u2014 cake, home, ride'},
          {w:'Job two', note:'soften the c or g \u2014 fence, large, hinge'},
          {w:'Job three', note:'keep u or v off the end \u2014 give, have, blue, clue'}
        ]
      }
    },
    stages:[
      {engine:'sortsound', pool:EJOBS44, rounds:8, label:'Which Job?'},
      {engine:'wordchange', pool:{instruction:'Change the Word! Read the hint, then pick the new word.', pairs:UVCHANGE44}, rounds:7, label:'Change the Word'},
      {engine:'sightword', pool:CARDS44, rounds:10, label:'Read the Word Cards'}
    ]
  },
  {id:'L46', n:46, title:'Fourth Sound, Fourth Job', emoji:'🦢', cls:'c-sound',
    intro:{
      topic:'A fourth sound for O, and a fourth job for Silent E',
      lines:[
        'The letter <b>o</b> has four sounds and you have already met three. Short o in <b>otter</b>, long o in <b>open</b>, and the /oo/ in <b>to</b>. Here is the fourth: <b>/uh/</b>, the sound sitting in <b>love</b> and <b>mother</b>.',
        'Listen for it in <b>front</b>, <b>won</b>, <b>nothing</b>, <b>month</b>, <b>brother</b>. If you meet an o and are not sure which sound it wants, try them in order until one makes a real word.',
        'Now Silent E picks up a fourth job, and this one is clever. Look at <b>rinse</b>. Take the e away and you are left with <b>rins</b>, which looks like it might mean more than one <b>rin</b>. That e is there to show the word is <b>not a plural</b>.',
        'The same goes for <b>cheese</b>, <b>horse</b>, <b>mouse</b> and <b>goose</b>. Drop the e off any of them and the s starts to look like a plural ending. So Silent E steps in and settles the matter.'
      ],
      words:['love','front','rinse'],
      review:['brother','mother','other','love','glove','shove','won','front','rinse','cheese','oh'],
      trick:{
        title:'All four jobs of Silent E',
        points:[
          {w:'Job one', note:'make the vowel long \u2014 cake, home, ride'},
          {w:'Job two', note:'soften the c or g \u2014 fence, large, hinge'},
          {w:'Job three', note:'keep u or v off the end \u2014 give, have, blue'},
          {w:'Job four', note:'show the word is not a plural \u2014 rinse, cheese, goose'},
          {w:'oh', note:'a Leap Word \u2014 the h is silent'}
        ]
      }
    },
    stages:[
      {engine:'sortsound', pool:OSOUND46, rounds:7, label:'Which Sound of O'},
      {engine:'sortsound', pool:EJOBS46, rounds:7, label:'Which Job?'},
      {engine:'sightword', pool:CARDS46, rounds:11, label:'Read the Word Cards'}
    ]
  },
  {id:'L48', n:48, title:'ED and the Past Tense', emoji:'🍕', cls:'c-ed',
    intro:{
      topic:'ED, and talking about the past',
      lines:[
        'Add <b>ed</b> to the end of a word and it means the thing already happened. Today I <b>jump</b>. Yesterday I <b>jumped</b>. That is what we call the <b>past tense</b>.',
        'Here is the surprise. That little <b>ed</b> makes three different sounds. It can say <b>/ed/</b> as in <b>wanted</b>, <b>/d/</b> as in <b>snowed</b>, or <b>/t/</b> as in <b>jumped</b>. You already pick the right one whenever you talk, so trust your ear.',
        'To read a long ed word, cover the <b>ed</b> with your finger and read the base word first. <b>folded</b> becomes <b>fold</b>. Then uncover it and say the whole word as if it happened yesterday.',
        'Two things to watch for. Sometimes a letter gets <b>doubled</b> first, so <b>stop</b> becomes <b>stopped</b> and the o stays short. And when a word ends in Silent E, that <b>e drops off</b>, so <b>smile</b> becomes <b>smiled</b> rather than smileed.'
      ],
      words:['jumped','wanted','snowed'],
      review:['printed','covered','raced','stopped','tested','smiled','saved','jumped','mixed','they'],
      trick:{
        title:'Three sounds, one ending',
        points:[
          {w:'/ed/ like wanted', note:'the base word ends in t or d, so ed adds a whole extra beat'},
          {w:'/d/ like snowed', note:'no extra beat, and the ending just buzzes'},
          {w:'/t/ like jumped', note:'no extra beat, and the ending is a crisp t'},
          {w:'they', note:'a Leap Word \u2014 the ey says long a, which you have not studied yet'}
        ]
      }
    },
    stages:[
      {engine:'wordchange', pool:{instruction:'Cover the ed with your finger. What is the base word?', pairs:BASE48}, rounds:8, label:'Find the Base Word'},
      {engine:'sortsound', pool:EDSOUND48, rounds:7, label:'Sound Sorting'},
      {engine:'sightword', pool:CARDS48, rounds:10, label:'Read the Word Cards'}
    ]
  },
  {id:'L50', n:50, title:'The Third Sound of A', emoji:'🍬', cls:'c-phon',
    intro:{
      topic:'A has a third sound',
      lines:[
        'The letter <b>a</b> has three sounds. You already know short a in <b>apple</b> and long a in <b>acorn</b>. Here is the third: <b>/ah/</b>, the sound sitting in <b>father</b>.',
        'Two things pull a into that third sound. The first is an <b>l</b> right after it. Listen for it: <b>ball</b>, <b>call</b>, <b>tall</b>, <b>small</b>, <b>salt</b>.',
        'The second is a <b>w</b> sound right before it: <b>want</b>, <b>water</b>, <b>wash</b>, <b>swamp</b>, <b>squash</b>. Even in <b>water</b>, where the a sits in an open syllable and by rights ought to go long, that w wins.',
        'One honest note. This particular sound shifts quite a bit from place to place. Some people say <b>all</b> so it rhymes with <b>father</b>, others closer to <b>yawn</b>. Say it whichever way comes naturally to you, because both are right.'
      ],
      words:['ball','water','father'],
      review:['tall','swamp','ball','fall','wall','want','water','wash','small','two'],
      trick:{
        title:'When a says /ah/',
        points:[
          {w:'An l right after it', note:'ball, call, tall, small, salt'},
          {w:'A w sound right before it', note:'want, water, wash, swamp, squash'},
          {w:'Careful', note:'in flag and plant the l comes BEFORE the a, so it changes nothing'},
          {w:'two', note:'a Leap Word \u2014 the w is silent, and the o says its third sound'}
        ]
      }
    },
    stages:[
      {engine:'wordchange', pool:{instruction:'Change the Word! Read the hint, then pick the new word.', pairs:ACHANGE50}, rounds:8, label:'Change the Word'},
      {engine:'sortsound', pool:ASOUND50, rounds:7, label:'Which Sound of A'},
      {engine:'sightword', pool:CARDS50, rounds:10, label:'Read the Word Cards'}
    ]
  },
  {id:'L52', n:52, title:'OY and OI', emoji:'🦪', cls:'c-review',
    intro:{
      topic:'Two spellings, one sound',
      lines:[
        'Here are two phonograms that make exactly the same sound, <b>/oy/</b>. One is spelled <b>oy</b>, as in <b>boy</b>. The other is spelled <b>oi</b>, as in <b>oil</b>. Same sound, two different ways to write it.',
        'For reading, that is honestly the whole story. Whenever you meet either one, say <b>/oy/</b> and carry straight on.',
        'If you are curious why English keeps two of them, here it is. <b>oi</b> never sits at the end of a word, because English words do not end in i. So the end of a word always takes <b>oy</b> \u2014 <b>boy</b>, <b>toy</b>, <b>joy</b>, <b>enjoy</b>.',
        'Inside a word you will usually meet <b>oi</b> instead: <b>point</b>, <b>join</b>, <b>soil</b>, <b>voice</b>. A handful of words like <b>oyster</b> and <b>royal</b> use oy in the middle as well, so let your ear lead the way.'
      ],
      words:['boy','oil','point'],
      review:['boy','point','soil','toy','choice','noise','join','voice','enjoy','were'],
      trick:{
        title:'Worth knowing',
        points:[
          {w:'Both say /oy/', note:'for reading, that is all you actually need'},
          {w:'oy goes on the end', note:'boy, toy, joy, enjoy \u2014 English words do not end in i'},
          {w:'oi goes inside', note:'point, join, soil, voice, noise'},
          {w:'were', note:'a Leap Word \u2014 its Silent E has no job at all'}
        ]
      }
    },
    stages:[
      {engine:'wordchange', pool:{instruction:'Change the Word! Read the hint, then pick the new word.', pairs:OYCHANGE52}, rounds:8, label:'Change the Word'},
      {engine:'review', pool:OYWORDS52, rounds:7, label:'Find the Word'},
      {engine:'sightword', pool:CARDS52, rounds:10, label:'Read the Word Cards'}
    ]
  },
  {id:'L54', n:54, title:'AW and AU', emoji:'🦅', cls:'c-syll',
    intro:{
      topic:'Two more spellings, one more sound',
      lines:[
        'This one will feel familiar. Two phonograms sharing a single sound, just like oy and oi did. <b>aw</b> and <b>au</b> both say <b>/aw/</b>, the sound in <b>saw</b> and in <b>haul</b>.',
        'For reading, that is genuinely all you need. Meet either one and say <b>/aw/</b>.',
        'The reason English keeps two of them is the same tidy reason as last time. <b>au</b> never ends a word, because English words do not end in u. So the end of a word always takes <b>aw</b> \u2014 <b>saw</b>, <b>law</b>, <b>draw</b>, <b>paw</b>.',
        'Inside a word you will meet both. <b>aw</b> likes to sit just before an l, n or k, as in <b>lawn</b>, <b>yawn</b> and <b>hawk</b>. Almost everywhere else inside a word, expect <b>au</b>: <b>haul</b>, <b>pause</b>, <b>August</b>, <b>because</b>.'
      ],
      words:['saw','haul','hawk'],
      review:['saw','law','yawn','hawk','draw','haul','pause','August','because','aunt'],
      trick:{
        title:'Worth knowing',
        points:[
          {w:'Both say /aw/', note:'for reading, that really is the whole story'},
          {w:'aw goes on the end', note:'saw, law, draw \u2014 English words do not end in u'},
          {w:'aw also sits before l, n and k', note:'lawn, yawn, hawk, crawl'},
          {w:'aunt', note:'a Leap Word \u2014 the au does not say /aw/ here, and most of us say it like ant'}
        ]
      }
    },
    stages:[
      {engine:'wordchange', pool:{instruction:'Change the Word! Read the hint, then pick the new word.', pairs:AWCHANGE54}, rounds:8, label:'Change the Word'},
      {engine:'review', pool:AWWORDS54, rounds:7, label:'Find the Word'},
      {engine:'sightword', pool:CARDS54, rounds:10, label:'Read the Word Cards'}
    ]
  },
  {id:'L56', n:56, title:'OW and OU', emoji:'🐄', cls:'c-sound',
    intro:{
      topic:'One more pair, with a twist',
      lines:[
        'One more pair sharing a sound. <b>ow</b> and <b>ou</b> can both say <b>/ow/</b>, the sound in <b>cow</b> and in <b>mouse</b>. That sound is what this whole lesson is about.',
        'The same familiar reason keeps them apart. <b>ou</b> is only found inside a word, because English words do not end in u. So the end of a word takes <b>ow</b> \u2014 <b>cow</b>, <b>now</b>, <b>how</b>, <b>plow</b>.',
        'Inside a word, <b>ow</b> likes to sit before an l, n or d, as in <b>owl</b>, <b>brown</b> and <b>crowd</b>. Nearly everywhere else inside a word you will meet <b>ou</b>: <b>house</b>, <b>found</b>, <b>cloud</b>, <b>mouth</b>.',
        'Here is what is different this time. Both of these have <b>other sounds</b> as well. <b>ow</b> can say long o, as in <b>low</b>, and <b>ou</b> has several more besides. You will meet those further along in your books. Everything in this lesson uses <b>/ow/</b>.'
      ],
      words:['cow','mouse','brown'],
      review:['brown','cloud','down','out','flower','found','mouth','now','any','many'],
      trick:{
        title:'Worth knowing',
        points:[
          {w:'Both can say /ow/', note:'that is the one sound this lesson is about'},
          {w:'ow goes on the end', note:'cow, now, how \u2014 English words do not end in u'},
          {w:'ow also sits before l, n and d', note:'owl, brown, crowd'},
          {w:'any and many', note:'Leap Words that rhyme \u2014 neither the a nor the y says what you would expect'}
        ]
      }
    },
    stages:[
      {engine:'wordchange', pool:{instruction:'Change the Word! Read the hint, then pick the new word.', pairs:OWCHANGE56}, rounds:8, label:'Change the Word'},
      {engine:'review', pool:OWWORDS56, rounds:7, label:'Find the Word'},
      {engine:'sightword', pool:CARDS56, rounds:10, label:'Read the Word Cards'}
    ]
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
