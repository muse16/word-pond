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
