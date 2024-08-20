---
title: "The CoffeeScript Dilemma"
date: "2012-04-24"
categories: 
  - "development"
  - "javascript"
  - "web"
---

So, CoffeeScript is pretty darn interesting.  A couple years back when I made a concerted effort to take Javascript more seriously as Flash's stranglehold grip on the UI industry was nearing an end, I didn't like Javascript.

It felt quirky and weird, and messed with my OO view of the world.  Contrast that to Java, which I've been picking up a bit lately for Android development - and I feel right at home with that.  I think a lot of people feel this way when it comes to Javascript.  To me, it was an acquired taste.

I do dig JS now, and there's tons of little helpers you can use to make it fit whatever workflow you choose.  I'm really digging on both Dojo and Google Closure now.  There's tons of stuff out there.

Before I liked Javascript, and it was still a bit frustrating, I strongly felt that JS would go away in 7-10 years - it would simply be a compiler target.  Both Google Dart and Coffeescript were available, so it made sense.  JS would be the "assembly language" of the web.

I don't know that I feel much different now about Javascript - except now that I use it, and feel it's not frustrating anymore, I do feel like the language will survive more than I gave it credit for.  As in, maybe for lots of application, Javascript may be phased out in favor of things like Google Web Toolkit (Java), Dart, and possibly Coffeescript.

Meanwhile for other small projects and various snippets on your web page, JS will be in full effect.

**The Implementation Phase**

What I didn't daydream on, was the implementation phase as these various languages see the light of day and gain more traction.  I said hey, "We're using Javascript now - and in 10 years something else will be popular" (though still compiling to Javascript).  I didn't even think about what happens in between.

I think we're starting to see this answer in the form of a dilemma in regards to CoffeeScript.

**I Don't Really Like CoffeeScript**

There I said it!  It's probably no surprise to those that know me that I don't really care for it.  But I did go ahead and learn a little about it, and why someone would use it.  The best pro-CoffeeScript argument was this 44 minute video from 37Signals Sam Stephenson called ["Better JS Through CoffeeScript"](http://vimeo.com/35258313).

The arguments presented in the video were largely "Look at how sexy this code is",  "You save so much typing", etc etc.  The underlying argument was that it's more readable.

Well, it's not....to me anyway - it was pretty hard to read, even as Sam was explaining it.  I can definitely see if you have a Ruby background that it IS much more readable.  From my perspective we're bringing JS into the Ruby comfort zone.  I think, for me personally, Google's Dart would bring JS more into MY comfort zone.

Anyway, just keep that in mind.  There is no "best" language in the world.  There's just the best language for you and/or your job.  And that's totally cool.

One VERY compelling reason for CoffeeScript, on the other hand, was the whole compilation thing.  Think about jQuery.  If you do a jQuery "each" method, you're using the underlying framework to do something for you.  It adds computational overhead.

Contrast this with CoffeeScript - it will write better code out for you, and that's what your browser will be running.   So that's a great thing in my mind - no framework overhead, and you get to write things that are easier for you to read and understand as a developer.

But, again, to each his own.  Maybe someday I'll get around to using Coffeescript and it will be another acquired taste.

**The Dilemma**

I cracked open Twitter before lunch today and I see a comment thread on an Ember.js related blog post:

[http://www.thesoftwaresimpleton.com/blog/2012/04/22/ember-js-routemanager/#comment-507972544](http://www.thesoftwaresimpleton.com/blog/2012/04/22/ember-js-routemanager/#comment-507972544)

The blog post itself was independently written (important for this conversation), and contained some how-tos for using the Ember.js framework,.

Unfortunately for me and @commadelimited (Andy Matthews), the examples were written in CoffeeScript, so they were pretty hard to read (for me anway).

This might be where you expect me to rail on the author for using CoffeeScript....but no, that would be silly.  This was written by a blogger in his spare time - we should be supporting him and appreciative regardless of if he wrote the example in Objective J.

On the other hand, it really throws off my game!  Part of me goes all American Redneck complaining why I have to press #1 on my phone for English.

Using other languages both detract from and make Javascript awesome at the same time.  Its so troubling that if I met this blogger in a bar and said "I will buy you a beer if you follow this advice"....I don't know what that advice would be.  Obviously the dude likes CoffeeScript, why nay say?

Did we have these problems before?  Usually, in my experience, we started at the language, and built frameworks on top of those languages).  Now anything goes!  And we need to mix and match.

I guess the best advice would be for me personally to learn CoffeeScript even though I don't plan to do things with it.  It's a hard pill to swallow because learning has always equaled productivity for me.  Now, it's learning for the sake of understanding our foreign language friends, who have something important to say.
