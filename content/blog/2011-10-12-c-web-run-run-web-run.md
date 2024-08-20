---
title: "C Web Run, Run Web Run"
date: "2011-10-12"
categories: 
  - "c"
  - "flashflex"
  - "html5"
  - "javascript"
  - "ui"
  - "web"
---

After a long vacation, i'm finally back from Adobe MAX and California.  Going to MAX certainly gave a lot of perspective on things.

Adobe's keynote around Flash and HTML5 seemed to be a hot button for some people.  Flex wasn't mentioned, and Flash was named "the console of the web".  This seemed to draw ire from people who know Flash is more than games.

I actually think the verbage is just fine.  Flash is the box in your living room that runs nifty stuff.  It does applications, video, games, and all the cool stuff that is net connected but isn't a "web page".

Obviously, Flash does RIA applications because it does everything else.  It's a little unfortunate that RIAs aren't part of the overall message, but to be realistic, when normal people talk RIAs, they are thinking of what the HTML/JS/CSS stack can do easily---and if you want to claim that Flex should be used where HTML/JS/CSS can be easily used, you are fighting a losing battle these days.

For the rest of us technically adept people, we know in which situations Flash can or can't be used.  It's unfortunate it's been reduced to "web standards" versus "the console," but Adobe had to put it in terms the world could understand.  I think they threw in the towel on a small battle to win the larger war to keep Flash going strong.

This is all interesting, but it's not my takeaway from MAX.  Adobe gives us a stack for the console: Flex/AIR/Flash. They also give us a stack for standards-based Web: JQuery/HTML/PhoneGap.  The untold story taking shape in the creative space is low level and close to the metal, as they say.  C++ is heading to the creative space and the Web. It is slowly taking shape as the technology that can be injected into the Web stack, the Flash stack, and the creative expression stack.

Prior to MAX, I had been looking into OpenFrameworks (OF). It's a C++ library that allows people to creatively express themselves using C++.  This is significant because C++, in the past, was seen as one of those daunting languages that nobody wanted to touch because it was too complicated and reserved for computer rocket scientists.  But OF aims to make C++ approachable for creative types and allows them to push graphics around and do some cool things like face tracking, object detection, and more. Basically, anything creative that Flash or Javascript is too slow to handle, C++ can do and OF is your path to get there.

Sure, OF is significant, but it's just part of the story.  Adobe has another project in labs called Alchemy.  They recently announced in a MAX session that it would be getting a lot more attention...official product support attention!  You may remember Alchemy as a MAX demo a few years back.  The source code for Quake was compiled from C++ through Alchemy and used as a Flash-compiled library.  The end result was that a Quake level was cross compiled and playable in Flash (and this was before Stage3D).

Alchemy is used to compile existing C++ libraries or just code you'd like to run that goes too damn slow in Flash/Actionscript.  This opens up a world of possibilities for near native performance.  In fact, remember that Photoshop Touch demo you saw in the Day 1 keynote? That was built with AIR.  Still, Actionscript is just a shade too slow to run Photoshop's advanced image manipulation algorithms.  Instead, the developers simply leveraged Photoshop's existing C++ libraries and plugged them into AIR/Flash.

That story was the same as the one I overheard from Ben Garney of PushButton Labs when talking about his game development work.  He coded up a library in C++, which could be targeted at normal native usage. When needed in Flash, the library can be simply compiled with Alchemy for usage in Flash.

The benefit is immense here---incredible performance boosts and the ability to leverage the same code everywhere that runs C++.

But the Flash story doesn't stop there.  AIR 3.0 allows native extensions on both Desktop or mobile applications.  Whether you use C++ to create a windows DLL or use the NDK to create an Android extension, it doesn't matter.  Objective-C for iOS might be a slighly different flavor...but Apple isn't known for playing nice.

The benefits of Flash are huge, but what about beyond Flash?

Google Chrome is part of the same story with their "Native Client."  Just recently, Google gave us the ability to leverage C++ code in their Web browser for more power and speed.  Meanwhile, projects like Emscripten will compile C++ to Javascript.  While Emscripten doesn't equate to a speed boost, you can leverage exisiting C++ libraries.  This is important because C++ has been around for decades, and someone before you may have already solved your problem.

Where is all of this going?  Well, I conjecture that we will end up doing the meaty bits of our apps/applications/Webpages with C++.  We'll share the same C++ libraries across Flash, AIR, Desktop, Mobile, and Web.  We'll then layer a thin client on top whether or not we write it in Javascript, MXML, Actionscript, Dart, HTML, etc.  This layer will be visual, with the bottom C++ layer used for perfomance. I may be completely wrong about this prediction.  Even if I am, the current creative ways to express ourselves with C++ give us normal folk a definite inroad into learning the most popular language on the planet.

In other words, if you take the opportunity now to learn C++, what could possibly go wrong?!
