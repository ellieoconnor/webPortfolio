# Legend Of Imposters: How a Beginner Project Helped Me Battle Shame
  There are two wolves that live in Ellie – one with an endless desire to improve, learn, get really good at what I do, and put myself out there. The other - shame. 
  
_Why don't I know this stuff better?_

_This project is lame._

_People will think "how the heck does she have a job?"_ 

The truth is, I really enjoyed my latest project. I learned a ton, and yeah, I'm a little embarrassed that this didn't click earlier for me. I'm here regardless because I'm excited that I learned something. Months from now, I'll look back and see how far I've come. Even if you've been at this for years, put yourself out there and ask the questions. Do the "lame beginner project." The only time you lose is when you don't try.

I have often heard people talk about imposter syndrome, and I've often thought, "Okay, but with me, if they _really_ knew...It's not imposter syndrome if I'm really an imposter!" That fear kept me from posting about my journey, asking questions, and celebrating my wins. I'm taking a step forward now. Reflection and feedback are part of how I learn, so here we are.

## Why I Went Back to the Basics
I LOVE _The Legend of Zelda: Breath of the Wild_. It's easily in my top 5 games I've ever played. So when I wanted a small, low-stakes project to understand API and frontend interactions better and stumbled on a free API for the game...I was stoked.

The purpose of the project was twofold. First: get more at ease with APIs – how to read them, accessing properties, and transforming data into something users can actually interact with. I do this all the time at work, but I often feel like I understand too little. I know what works, but not *why*.\
What happens if I try doing a, b, c like x, y, z instead? This project gave me the safety and creative space to explore that.  
Second: practice some CSS because… why not have fun with it?

I learned a lot! Most of it wasn't even what I was aiming to learn. I thought I’d deepen my basics and turn APIs from “dev magic” into “a puzzle I can solve.” Instead, I discovered how much architecture, naming, and structure affect my ability to reason about a project. And apparently, DOM manipulation can absolutely humble you after years of living inside frameworks.

This year I've had a huge emphasis on learning architecture and design principles. So imagine my surprise when I discovered that even in a small free-API project requires architectural thinking.

## Mapping the World: Mental Models & APIs
This was a fun, easy-to-read API. Hats off to the maintainer because they did a great job. It's an API I would recommend for anyone who wants to explore projects with BOTW data.\
As I started poking around the data, something I’d only heard about in recent months finally made sense: “mental models.” I first heard the term on a podcast and Googled it, but it didn’t click. Only after working with the API and reflecting later did I realize I’d been building those internal maps all along — picturing how the data flows, how pieces connect, and how the UI should act. When I used Postman to explore the endpoints, I was actively building mental models.

I originally imagined something much more complex, but after actually interacting with the data, I pivoted. A straightforward compendium — where I could easily look up items and their locations in the game — ended up being perfect. No need for back buttons or multiple views.

## The Combat: Async Tracks and DOM Manipulation
I was honestly shocked at how quickly I lost track of data and responses. I intentionally used `.fetch().then().then().catch()` chains instead of modern syntax to force myself to understand the Promises that power the `async/await` world we live in.

At one point I spent half an evening wondering why my data looked perfect in a console log inside the fetch… but never made it to the UI. Turns out I never returned the Promise in one of my `.then()` chains. Console showed the right thing — but my UI literally had nothing to work with.

Tracking where data was lost became a theme in my project. I learned very quickly that when classes are grouped properly, debugging becomes so much easier. Clean structure helped me follow the data from start to finish. Most of the bugs I hit boiled down to losing track of data flow. This project showed me clearly where I need to improve: Tracking data from fetch to frontend. 

DOM manipulation also kicked my butt. Adding elements dynamically felt foreign after working in Angular all day. But I walked away with a dozen new Anki cards and a better grasp of built-in method quirks. My go-to pattern was: find a working solution (hello, StackOverflow), understand why it works, compare it to my broken version, and then use AI as a rubber duck. I always told it not to give me answers, just to ask questions, so I had to think more deeply.

## New Game Plus: Lessons in Architecture
Now that I actually know what mental models are and have a little more experience with designing and architecting, I’d do a few things differently.
I’d start by writing out 1–3 interactive user flows—what the user is trying to do and what alternatives they might take. That alone would have shaped my UI choices and my expectations for the data.

I’d also stop throwing everything into a class. Learning that classes should represent _behavior plus state_ helped me untangle a lot of the mess I created early on. It also showed me how much cleaner my code can be when helpers live separately from the things that actually manage data.

## The Loot: What I Actually Learned
This project unlocked understanding in so many places I didn’t expect—architecture, async flow, DOM manipulation, and honestly, confidence. I walked away feeling like I finally “get” Promises in a way that’s not just theoretical.

More than that, it reminded me that tiny, low-stakes projects can level up a whole range of skills at once. I’m already building my next little experiment, and I’m excited to share that one too.

And the next time those two wolves start arguing about whether my project is lame or whether I should post it anyway… well, I’ve got a little more evidence that feeding the curious one pays off.
