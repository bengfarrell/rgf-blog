---
title: "WTF HTML5 Video?"
date: "2012-09-11"
categories: 
  - "development"
  - "html5"
  - "video"
  - "web"
---

Just thought I'd put up a quick little post this morning as we talked a little bit about one of our HTML5 video projects in our morning meeting.

HTML5 video is pretty rad, it's not all that though. Microsoft's Smooth Streaming + Silverlight and Adobe Flash's Media Server + AS3 give you the ultimate control (despite maybe being a little too complex for beginners). The AVPlayer framework in iOS is pretty nice too, but out of the box it doesn't give you nearly the same control as MS or Adobe.

Android is pretty weird.  Its similar to iOS, but the HUGE catch is that you can only play one video at a time with it's native media player.  Lets say you start up a stream, then pause it.  You then try to start up another stream while that first one is playing.  All is well.  Go back to the first and unpause.....BOMB.  It's broken and won't really explain why.  Boo.  It's because you can't have two media players running on Android at the same time.  Something that any other platform lets you do.

HTML5 video looks fairly straightforward as you first get into it.  On mobile it gets pretty funky - you'd pretty much assume it gets WTF.  One such example?

 

### It will steal your taps on iOS!

So you're humming along doing your awesome HTML5 video experience.  Out of laziness or whatever, you don't CSSify your own player controls.  You justify saying "I want that native experience on any platform - if it's on Android it needs to look like Android dammit, and god forbid I tweak Steve Job's master vision and override the Quicktime look and feel".  So you're using the native player controls - quite easy to do by adding the controls="controls" attribute to your video tag.

The day your project is due, some idiot marketer comes along and says "Hey, lets launch a little survey after they complete the video!  We'll put a popup box over the video, and they have to click something to continue to the next".  Your response, "Yah, ummm, whatever...sounds craptastic, but I'm not paying the bills".  So you make a nice little CSS popup box, give it some absolute positioning  and pop it right over the video.

Your marketing friend is all happy until they get out the corporate iPad.  They finish the video, watch the popup, try to click a button.....and nothing.  Your buttons don't work.  "You must be mistaken you say...for this works in Chrome".

They aren't mistaken - HTML5 video on iOS WILL STEAL YOUR DAMN TOUCH EVENTS.   Anything intersecting with the video, whether it's under or over will not be tappable.

Let's rewind back to the beginning of our story - if you hadn't used the native controls and made your own CSS controls in the first place, this problem wouldn't exist.  _WTF HTML5 video?_

 

There is of course some more wonkiness on mobile, but surely not on our last bastion of browser freedom Chrome?  Yes even Chrome.

 

### Yes Even Chrome

Its a little unfair to blame Chrome yet, since it's like the only freaking browser capable of playing video.  "But but but Firefox and OGG" you say.   To that I say, find me an OGG file and I'll try it out, until then we're talking about Chrome.  And oh yeah, IE9 and Safari I guess.....whatevs.

Unlike it's Android bretheren Chrome on the desktop can play 2 videos at the same time. Rock!  However this just leads to extreme confusion when it can't.  And your confusion is extremely likely when you're a developer.  See Chrome CAN play 2 videos at the same time, just not 2 of the SAME videos at the same time.

You can imagine this can lead to extremely confusing times as a developer, when you leave one tab open with your video loaded, and then try to launch another tab thinking you closed the first.  You get nothing....a black screen.  After pulling your hair out for 10 minutes trying to wrestle file paths in your code, you find the open tab and close it.  Wheeeeeeeeeeeeeee it works again.  **WTF HTML5 Video?**

 

### No Sound No Worky

Lots of us work in an office, usually this means being kind to your cubical neighbors.  So, either you wear headphones or you just develop without sound until you actually need to test it.  I do this, and occasionally this means long stretches of time where I don't have headphones plugged into my desktop.  I'm occasionally burned by this.

Guess what, if your machine doesn't have audio output setup in some fashion - the damn video won't even play.  Seriously.  I just tried this again in Chrome 21.  If you want to play video, at least leave your headphones plugged in with the volume down.  I haven't had this problem on my laptop since the speakers are built in and always there.  But on a desktop, it can be pretty likely that you won't have any hardware audio device at the time.

**WTF HTML5 Video?**

 

There are lots more WTFs, but I will leave you to wrap your mind around these.
