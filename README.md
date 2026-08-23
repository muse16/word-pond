# Word Pond

A kids' phonics practice web app — a companion for a homeschool reading program. Pip the pond frog hosts short 10-round games; kids tap a speaker to hear a word, then answer, and earn stars saved in the browser (localStorage).

## Files

```
word-pond/
  index.html   ← page shell, links styles.css, loads lessons.js then app.js
  styles.css   ← all visual styling
  app.js       ← speech helper, save/load, menu rendering, game engines, game controller
  lessons.js   ← word data + LESSONS and GAMES arrays  ← edit THIS to add content
  README.md    ← this file
```

Everything is a static site — no build step, no server required. Open `index.html` directly, or deploy it anywhere that serves static files (Vercel, Netlify, GitHub Pages, etc.).

## How to add a new lesson

Open [`lessons.js`](lessons.js). At the bottom of the word-data section there's a `LESSONS` array. Add one object per lesson:

```js
let LESSONS=[
  {id:'L1', n:1, title:'Open & Closed Syllables', emoji:'🚪', cls:'c-review', engine:'syllabletype', pool:OPENCLOSED},
  {id:'L2', n:2, title:'Your New Topic', emoji:'✨', cls:'c-magic', engine:'magic', pool:MAGIC}
];
```

Fields:

| Field    | What it is                                                                 |
|----------|------------------------------------------------------------------------------|
| `id`     | Unique string, e.g. `'L2'`                                                  |
| `n`      | Lesson number shown on the card (`Lesson 2`)                                |
| `title`  | Title shown on the card                                                     |
| `emoji`  | One emoji shown on the card                                                 |
| `cls`    | Card color class — reuse one of: `c-review`, `c-syll`, `c-sound`, `c-ed`, `c-magic`, `c-contr`, `c-phon` |
| `engine` | Which game engine runs this lesson (see below)                              |
| `pool`   | The word data the engine draws from                                         |

### Choosing an engine and pool shape

| Engine         | Pool shape                                                                 | Example |
|----------------|------------------------------------------------------------------------------|---------|
| `review`       | flat array of words, e.g. `['cat','dog','run']`                              | `REVIEW` |
| `phonogram`    | `{focus:['ee','ar'], all: PHONOGRAMS}` — `focus` limits which sounds are quizzed; omit `focus` to use every key in `all` | `PHONOGRAMS`, `CONSPHON` |
| `magic`        | array of `{short, long, v, mean}` (silent-e word pairs)                      | `MAGIC` |
| `ed`           | object keyed by sound, e.g. `{'/t/':[...], '/d/':[...], '/id/':[...]}`       | `ED` |
| `contraction`  | array of `{two, one}` pairs                                                  | `CONTRACTIONS` |
| `syllabletype` | array of `{w, t}` where `t` is `'open'` or `'closed'`                        | `OPENCLOSED` |
| `syllable`     | array of `{w, n}` where `n` is syllable count                                | `SYLLABLES` |
| `wordchange`   | array of `{from, to}` pairs, OR `{instruction, pairs:[{from,to}]}` to customize the prompt text | `WORDCHANGE`, `YCHANGE`, `GUESSWORDS` |
| `syllablesplit`| array of `{w, parts:[p1,p2]}` — student picks the correctly hyphenated split (e.g. "pic-nic"); wrong-split distractors are generated automatically | `SPLIT` |

### Multi-stage lessons and the intro screen

A lesson can also run more than one activity back to back, and show a teaching screen before practice starts. Use `stages` instead of `engine`/`pool`:

```js
{id:'L4', n:4, title:'The Four Sounds of Y', emoji:'🔤', cls:'c-magic',
  intro:{
    topic:'Phonogram Y — four sounds, one letter',
    lines:['One or more paragraphs of teaching text. <b>Bold</b> is allowed.'],
    words:['yarn','gym','my','happy'],       // optional tap-to-hear example chips
    review:['by','fly','try','cry'],          // optional plain-text word list
    trick:{title:'Tricky word: from', points:[{w:'from', note:'the o says "uh", not its usual short o sound'}]} // optional callout
  },
  stages:[
    {engine:'review', pool:YWORDS, rounds:6, label:'Find the Y Word'},
    {engine:'wordchange', pool:{instruction:'Custom prompt text', pairs:YCHANGE}, rounds:4, label:'Change the Word'}
  ]
}
```

`stages` round counts should add up to 10 to keep pacing and the star-reward math (a perfect run earns 2 bonus stars) consistent with every other lesson and game. `intro` is optional — omit it and use `engine`/`pool` directly (like `L1`) for a lesson that jumps straight into practice.

To add brand-new words, either extend an existing data array at the top of `lessons.js`, or declare a new `const` and point a lesson's `pool` at it (for `phonogram`, wrap it as `{all: YOUR_NEW_OBJECT}`).

All practice words are original/generic phonics content — do not paste in copyrighted curriculum text. If you're matching a Teacher's Manual lesson, describe the skill and words in your own words/list, not verbatim text from the manual.

### Extra-practice games

The `GAMES` array (also in `lessons.js`) is the "Extra Practice" section — general skill-practice games a grown-up can toggle on/off from the settings panel. Same shape as `LESSONS` plus `sub` (subtitle), `on` (default enabled), and `hint` (shown in settings).

## Local preview

Just open `index.html` in a browser — no build step needed. Note: some browsers block `localStorage` when a file is opened directly (`file://`) instead of served over `http(s)://`; stars still work during the session but won't persist. To test persistence locally, serve the folder, e.g.:

```bash
npx serve .
```

## Deploying

This repo auto-deploys to Vercel on every push to `main`. To add Lesson 2 or 3:

1. Edit `lessons.js` — add the lesson object and any new word data.
2. Commit and push.
3. Vercel picks up the push and the new lesson is live in under a minute.
