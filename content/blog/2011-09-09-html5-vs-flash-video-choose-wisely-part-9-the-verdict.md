---
title: "HTML5 vs Flash Video: Choose Wisely Part 9 – The Verdict"
date: "2011-09-09"
categories: 
  - "flash"
  - "flashflex"
  - "flex"
  - "html5"
  - "ios"
  - "javascript"
  - "ui"
  - "video"
  - "web"
---

So what wins?  HTML5 video or Flash?  What should you use, what's better?

The answer to this is that it depends on your project and what platforms you are targeting.

**Use HTML5 video for simple playback**

For short form video that contains no in-stream advertisements (that's fancy talk for pre, post, and midrolls) its extremely easy to use HTML5 now.  If your content is at most a few minutes long and you want it to work on any browser and any device you should use HTML5 with a Flash fallback (or vice versa).

Your content should be MP4/h264 so that it will work on iOS, Flash, Chrome, and IE9.  If you feel feisty, you can make a copy of your content as OGG to play in Firefox, but you can easily handle Firefox with Flash video.

**Use Flash for in-depth Ad and Tracking support**

Adding ads can be a little trickier. It's much easier to do this with Flash, but if your content is short, all you'll most likely need is a short pre-roll.  If doing this with HTML5, the experience may be a bit clunky, but at least it will work on the iPad.

It stinks a little more as you add tracking (or other features).  Do you want to duplicate your programming efforts in both Flash and Javascript?

One suggestion might be to implement a Flash player with no control bar and to only handle simple playback of video.  Do all your graphics, reporting and ad logic in Javascript, and just use the Flash player in the same way you'd use a video tag.  In this way, you're using two things that are pretty interchangable.

All in all, you'll be most successful if you implement these features in Flash as Flash has the most support for this type of thing.  HTML5 is certainly possible, but hard - you'll need to power through it, especially if you need it to work on iOS.

**Use HTML5 for iOS** If your only options are Flash or HTML5, obviously you should use HTML5 for playback since Flash isn't supported!

**Use Flash for Long-Form Streaming Content**

This is a hard truth - HTML5 can't do streaming.  As such, it can't do long-form content without completely bogging down end user's browsers.

For playback on Android devices, you can use your same Flash player for long-form streaming playback (just make sure to make it mobile and touch friendly).

For iOS, you're pretty much out of luck.  You can run streaming long form content through iOS, but unfortunately that same content won't work on normal browsers.  If you want playback on both desktop browsers and iOS devices, you'll need to double your efforts and develop players for each scenario.
