# Word Pond

A kids' phonics practice web app — a companion for a homeschool reading program. Pip the pond frog hosts 25-round games; kids tap a speaker to hear a word, then answer, and earn stars saved in the browser (localStorage). The reader's name (shown in the greeting and end screens) is editable in the grown-ups settings panel.

## No-repeat sessions

The game controller draws each round's question **without replacement** from a shuffled copy of the pool, built fresh every time a lesson/game launches or "Play again" is tapped — so a single sitting never asks the same question twice. Multiple-choice distractors are also deduped so the 3 options shown in any one round are always distinct from each other (they can still recur across *different* rounds — that's normal). Because of this, every pool in `lessons.js` needs at least as many unique items as the rounds drawn from it: 25 for a single-stage lesson/game, or at least each stage's `rounds` count for a multi-stage lesson. `resolveOrder()` in `app.js` handles the shuffling; if a pool you add is smaller than the rounds needed, that stage will just quietly loop through fewer unique questions rather than crash — grow the pool if you want a full 25.

`Sight Word Flash` works differently — see the `sightword` row below.

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
| `sightword`    | flat word array — no multiple choice; the word is shown, the child reads it aloud, and self-reports "I read it!" or "Still tricky" (only the former earns a star) | `SIGHTWORDS` |

`sightword` is special-cased in the game controller (by the `sight` game id) to track long-term mastery rather than just session rounds: every word marked "I read it!" is saved to `localStorage` permanently, the header shows "N / total left to master" instead of a round counter, and mastered words drop out of the rotation so practice always focuses on what's left. Marking the last word triggers a full-screen congratulations achievement. "Reset stars & progress" in settings clears mastery too.

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

`stages` round counts should add up to 25 to keep pacing and the star-reward math (a perfect run earns 2 bonus stars) consistent with every other lesson and game. `intro` is optional — omit it and use `engine`/`pool` directly (like `L1`) for a lesson that jumps straight into practice.

To add brand-new words, either extend an existing data array at the top of `lessons.js`, or declare a new `const` and point a lesson's `pool` at it (for `phonogram`, wrap it as `{all: YOUR_NEW_OBJECT}`).

All practice words are original/generic phonics content — do not paste in copyrighted curriculum text. If you're matching a Teacher's Manual lesson, describe the skill and words in your own words/list, not verbatim text from the manual.

### Extra-practice games

The `GAMES` array (also in `lessons.js`) is the "Extra Practice" section — general skill-practice games a grown-up can toggle on/off from the settings panel. Same shape as `LESSONS` plus `sub` (subtitle), `on` (default enabled), and `hint` (shown in settings).

## Personalization & Pip

The reader's name is stored in `childName` (`app.js`), defaults to `'Mckenna'`, and is editable via the "Reader's name" field in the grown-ups settings panel — it persists to `localStorage` and appears in the home greeting, the end-of-session screen, and the sight-word mastery achievement screen.

Pip the frog (`pipSVG(size)` in `app.js`) appears in the header (always visible), the lesson-intro screen, the game screen's top bar, the settings panel header, the end-of-session screen, and the achievement screen. Every Pip on screen bounces together whenever a star is earned (`addStar()` targets every `.mascot` element, not just one).

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
