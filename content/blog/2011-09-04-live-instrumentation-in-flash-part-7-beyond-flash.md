---
title: "Live Instrumentation in Flash Part 7 - Beyond Flash"
date: "2011-09-04"
categories: 
  - "development"
  - "flash"
  - "flashflex"
  - "javascript"
  - "music"
  - "web"
---

At the heart of all our audio generation lies one simple Flash feature - the sample data event.

Can we find things outside of Flash that will let us do similar things?

The answer is....of course!  People have been writing desktop audio and music synthesizer software for years.  Flash and AIR offers some decent functionality on the desktop, but writing something in C++ would blow Flash away of course.

The reason is that Flash has only been in the generative audio game for a few years, while people writing C++ have been at this for decades.  As such, they have access to ready made filters, libraries, etc.

Take, for example, Node Beat - written with OpenFrameworks

[http://forum.openframeworks.cc/index.php?topic=6070.0](http://forum.openframeworks.cc/index.php?topic=6070.0)

 

Objective-C for doing iPhone development has the nice benefit of access to core libraries that Apple OSX Cocoa developers have had access to for years.  The basic AudioUnit in Cocoa or Objective-C gives you the low level access you need to make things like Mobile Synth:

[http://code.google.com/p/mobilesynth/](http://code.google.com/p/mobilesynth/)

Or even a simple tone generator:

[http://cocoawithlove.com/2010/10/ios-tone-generator-introduction-to.html](http://cocoawithlove.com/2010/10/ios-tone-generator-introduction-to.html)

Basically though, you'll find that anything that gives you low-level audio access will give you what you need.  Speed is the key here, number crunching needs to be done in an instant.  Flash can keep up OK, and gives you the bare minimum of what you'd need to generate sound.

What about Javascript?  Well, sort of!  The Web Audio API has been defined and implemented on the developer version of Chrome and there's also a Audio Data API draft in Firefox.  The basics are the same as Flash, but many more goodies are offered to help you along.

 

So, in the end we need speed and some basic API hooks.  On the web, Flash seems the most reliable, but it sounds like Chrome and Firefox are nipping at Flash's heels with some very cool stuff coming up!

And in the mobile world, just like the desktop world, it seems this sort of base level audio access is standard as well.
