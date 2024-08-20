---
title: "Android MediaPlayer, You are too Co-Dependent!"
date: "2013-01-31"
categories: 
  - "android"
  - "development"
  - "java"
  - "ui"
  - "video"
tags: 
  - "android"
  - "java"
---

I actually really do enjoy Android development - it's pretty smooth.  Got me some [Intellij IDEA](http://www.jetbrains.com/idea/) as my work environment and I feel like a damn Viking Captain....or an astronaut....or something else really cool.  I like Java as well.  It's very reminiscent of my old Flash career, and the XML based layout markup is ever so much like Flex.  And HOLY HELL, the design mode of these layout editors actually work great in Intellij IDEA.  I could never say the same for Flex!

Contrast that to iOS, which is still nice, but you're using visual editors, can't edit the underlying stuff, and Objective C where I don't have garbage collection....

Anyway, I digress - I came here to complain.

And what I complain about doesn't seem to be any one platform or technology or language, it's about how messed up video playback is in that one platform, technology, or language.  I've been through it with Flash (which is pretty nice actually), iOS, HTML5, and lately: Android.

What's messed up in Android isn't the missing documentation or needed API's to get things working - it's that they throw everything at you and it only works sometime on various devices!  Some would say the F-word (f-r-a-g-m-e-n-t-a-t-i-on).  I dare not speak it here because I don't buy into the end of the world nay-sayers that say "Android is sooooooo fragmented, use a different platform".  Unfortunately though, in regards to video, it seems to be that way.

It's fragmented in a big way from Gingerbread to Honeycomb to Ice Cream Sandwich in regards to native streaming video via HLS.  Gingerbread doesn't support it at all - Honeycomb, it probably will, and yes it's there in ICS.  So Apple's streaming video tech that it has successfully pushed across our entire industry may or may not be available on your device...natively that is.   Some smart folks though, have made C++ libraries to handle it across all versions, and I'm sure they get paid handsomely for it (by you, the developer).

That's cool, though, maybe you don't need to stream - maybe you just want to play a short 5 minute or so piece of progressive content.  That's actually FINE, but be careful how you do it.

 

## MediaPlayer

At the very base level of media playback in Android, we have the MediaPlayer.  This little guy plays video, audio, whatever.  Interesting thing, though, is that it doesn't SHOW you the video.  To actually see what's playing you need to call mymediaplayer.setDisplay(mysurface).  So I've been using a "SurfaceView".  You can probably imagine what normal views are - they hold graphics and stuff for display.   You could use a Layout (like a FrameLayout or a LinearLayout) to bring order to your chaotic mess of graphics on your view - but that's really what a view does, it holds graphics.

A SurfaceView is weird, though.  Sometimes you need hardware accelerated graphics power at your disposal.  So what SurfaceView does, is it punches a hole in your device right down to the GPU and uses that area to accelerate your graphics - instead of the normal layering that usually happens.  It looks like graphics that are layered with it are handled pretty nicely - I'd chalk that up to Android/Google engineering attention to detail (or something).

Anyway, that's what the SurfaceView is - its a hole punched through your graphic layers right down to the GPU.  Its commonly used for 3D and video.  Since we want our videos running smooth as butter, we are strongarmed into using the SurfaceView.

So, there it is - you need to set your video path or URL, attach it to the SurfaceView with setDisplay, set the audio stream with mymediaplayer.setAudioStreamType(AudioManager.STREAM\_MUSIC), then prepare.

Actually, don't do prepare - do mymediaplayer.prepareASync().  Prepare locks up the graphics thread until your media starts playing.  You can then listen for the MediaPlayer onPrepare event and run mymediaplayer.start() to kick off playback.

Meanwhile, there's a WHOLE other situation going on with being EXTREMELY CAREFUL what you do with the MediaPlayer.   So complicated, Google has apparently given us a [state diagram](http://developer.android.com/reference/android/media/MediaPlayer.html)....

It's not that I think diagrams are too complicated - but this one is just really important.  If you call getCurrentPosition, or pause, or resume on the player and it's in the wrong state......wellllllll your app crashes.  Even worse, the media player won't actually tell you what state its in.  There's no "getState" method or property.  Nope...how do you know?  Well, Google suggests you keep track of it your DAMN self with the appropriate listeners.

 

## VideoView

Think the above is complicated?  Well, good thing there's VideoView.  This View is a MediaPlayer wrapped in a SurfaceView for the ultimate convenience.  It passes on some of the more important MediaPlayer events like onPrepared, onComplete, and more.  And then if you want more - well, grab a reference to the MediaPlayer from the onPrepared callback.  It's the first parameter.   But again, be very careful to not call something on your player when it's not in the correct state!

Anyway, it's pretty simple to use - use the setVideoURI() and start() methods to get things going.  Just like any other view, it'll size nice and dynamically along with your layout.  You can even setMediaController() on it to attach a native Android UI media controller.

So, yah - MediaPlayer is pretty co-dependent.  But that's in a good way, right?  Why bother with MediaPlayer when we can just use VideoView?

 

## No Tweakin the View

So, we actually had a use case in our app, where we need to hide the video momentarily before bringing it up again.  You can do some pretty sweet things with the SurfaceHolder callbacks - and listen for when the SurfaceView is created, destroyed or changed.  Unfortunately, those seem to do NOTHING in the VideoView.  Yah, you still get the events, and you can listen for whatever you want - but your video always seems to shut down when the VideoView is made to go away.

Also unfortunately, is when looking at the source code, methods are mostly private.  So there's not even any hope of overriding something and doing your own thing.

OK - well, I need to hide and bring the video back.  VideoView can't do that.  Well, let's rip that co-dependent bastard called MediaPlayer right out of there and implement it ourselves.

Yah - I had problems with that too.  To play multiple videos sequentially with my custom View, I had to set the view to gone before loading the video, and then set it to visible on prepare.  Without this, I'd get some pretty crazy errors most of the time.

I'd get the same crazy errors rarely when running my video, removing its view, then reattaching again.  Most of the time it worked perfectly - I just listened for surfaceCreated, then attach the running media player again with setDisplay.  Other times, it would error out when I did that and I'd get that crazy error.

What's the crazy error?  The error is 1, which means it's unknown, and the extra is - 2147483648.  I can't find any information whatsoever on that error online that makes sense.  Some folks on stack overflow say the file has a corrupted header size on the server, others claim its an invalid format, and more.  None of them complain about this happening in the freaking middle of playback.

Ok, well, whatever, it happens rarely, and we can catch it and move on.  Fun fact: if you catch the error, you can return false from your custom error handler to have the MediaPlayer mark itself complete and have the onComplete handler called.

So I have a custom media player that seems to work well MOST of the time on my two Honeycomb tablets.  When it fails, it's rare, and we can move on....PROBLEM SOLVED!

....that is until I try it on my Kindle Fire.  I can hear the audio but not see it, while on the other devices it works perfectly.  Seriously, what the hell?  I spend mucho amounts of time comparing my code to the Android VideoView source and don't see anything different - yet still, here we are.   And now, I'm willing to bet why VideoView doesn't give you much option to keep this alive in the background - because it's just a quirky mess on some devices.

 

## Just Use the VideoView, it's Safer

I never did figure out my problem.  In the end, I figured we'd better just use the VideoView and not have it removed from the screen in mid-playback.  Don't do anything fancy with your surfaces because it'll probably fail on some device somewhere.  Perhaps someone who is smarter than I knows where I fell short.  Or perhaps, this is an insurmountable problem.  It sure seems quirky as hell to me, though!

Other issues included playback of some mp4's at all on some devices.   Read up on the [supported media formats](http://developer.android.com/guide/appendix/media-formats.html).  Most devices seem to be very forgiving allowing you to encode a bit differently as long as it's in wide practice, but some older Android models don't like some of these encodings - so it's safer to stick to the speck.

And so, that is why the MediaPlayer is way too co-dependent on the VideoView.  Cause you think MediaPlayer can operate without its buddy like that.  It tricks you....lulls you into a false security, but always bites you in the end!
