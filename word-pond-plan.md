# Why code is better now

Word Pond has grown past the "one big HTML file I paste around" stage. You're going to add Lesson 2, Lesson 3, and beyond for a while. Each time, the current process makes me regenerate or hand-edit a 33KB file and pass it through a fragile deploy — which is exactly what kept corrupting on the last two Vercel attempts. In a proper repo:

* Lessons live in a small, readable data file — adding Lesson 2 is a few lines, not a full-file rewrite.
* Vercel auto-deploys on every push, so "add a lesson" → commit → live in ~30 seconds, no manual file transfer, no corruption.
* You get version history, so nothing gets lost.

The tradeoff: a little one-time setup (a GitHub repo + connecting it to Vercel). After that, updates are much smoother.

What I'd suggest structurally — split the one file into:

```
word-pond/
  index.html          ← page shell + <link> to the two below
  styles.css          ← all the CSS that's currently in <style>
  app.js              ← the engines + game controller
  lessons.js          ← JUST the word data + LESSONS/GAMES arrays  ← you/I edit this
  README.md           ← how to add a lesson
```

`lessons.js` is the important one: it's where every lesson's topic and word list lives. To add Lesson 2, you only ever touch that file.

## The prompt to hand to Claude Code (in a new session, in an empty `word-pond` folder)

I'm building a kids' phonics practice web app called "Word Pond" — a companion for a homeschool reading program. I have a working single-file version I'll paste/attach. Please refactor it into a clean multi-file static site: `index.html`, `styles.css`, `app.js`, and `lessons.js`. Put ALL the word data and the LESSONS and GAMES arrays in `lessons.js` so new lessons can be added by editing only that file. Keep every game and behavior identical (open/closed syllables, phonogram find, magic-e, -ed sorter, contractions, syllable count, star saving via localStorage, the Pip frog mascot). Add a README explaining how to add a new lesson: give it an id, a title, an engine name, and a word pool, following the existing pattern. Then help me push it to GitHub and connect it to Vercel for auto-deploy. Do not include any copyrighted curriculum text — all practice words are original/generic phonics.

Then attach the current `word-pond.html` (I can hand you the file to save and drop in).

## For the recurring "add a lesson" job after that, the prompt is tiny

In lessons.js, add Lesson 2. Topic: [topic]. Words: [any specific words you want, or "generate appropriate ones"]. Use the [engine] pattern. Then commit and push.

## One thing to know honestly

Setting up GitHub + Vercel is a handful of steps if you haven't before (making an account, a repo, authorizing Vercel). Claude Code walks you through it, but it's more moving parts than what we've been doing. If you'd rather keep it simple, the Netlify Drop route (drag the file, get a link) stays perfectly viable — you'd just re-drop an updated file each time I revise it.

## Two quick things from you so I can keep momentum either way

1. Which path — set up the code repo (better long-term), or keep having me build the file and you deploy it (simpler now)?
2. Lesson 2 and 3 topics — send them whenever. If they're in your manual like Lesson 1 was, a photo or a one-line topic each ("Lesson 2: [skill]") is all I need, and I'll build the games to match.
