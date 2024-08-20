---
title: "HTML5 vs Flash Video: Choose Wisely Part 10 – Other Options"
date: "2011-09-09"
categories: 
  - "development"
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

Lets face it, Apple really stuck us in a bad situation.  While HTML5 is really slick on the desktop (in supported browser with supported file types), its pretty clunky on iOS.  And Flash is ALSO really slick on the desktop, but doesn't work at all on iOS.

So what we are left with are 2 things that work really well on the desktop, but no common thing that works well on Android, iOS, and the desktop.

What can we do?

**Native iOS**

Simply the best option on iOS now is to sign up for a developer's license and make an app.  iOS offers two different video player frameworks MPMoviePlayer and AVPlayer.  MPMoviePlayer is the simplest to get started with, and offers you playback through the Quicktime UI.  AVPlayer is harder to get started with and you are forced to create your own UI, but you have more control over video playback.

**AIR for Mobile**

What may be the best solution is to build a Flash player with HLS streams on iOS and normal HTTP or RTMP streams on Android or the desktop.  While it's true that Flash isn't supported on iOS, Flash Builder 4.5 can compile your existing project out to iOS and Android applications.  All Flash video is supported in AIR, Mobile AIR and the web Flash player - except for iOS.  So you'll need the two different streams.

**Corona and other 3rd Party Packagers**

Corona seems to be a very popular way to create cross platform mobile apps these days.  There are other packagers as well like Titanium, Appcelerator and more.  Last I looked they don't handle video, or don't handle video very well.  Probably the best is Corona which does allow video to play, but it needs to launch the video in a modal window or fullscreen, and you have little control over it. As cool as these solutions are, I don't believe that they handle video all that well.
