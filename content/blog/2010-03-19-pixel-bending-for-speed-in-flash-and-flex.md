---
title: "Pixel Bending for Speed in Flash and Flex"
date: "2010-03-19"
categories:
  - "flashflex"
  - "music-video-games"
---

Lately, as I've been progressing with a Flex 4 based application which is largely an audio visualizer, I've felt the pain of slow response times from my UI.

The slow response is due to the fact that I'm loading a 3 minute MP3, extracting the audio to a byte array, and then processing the data in that byte array.  Consider a 180 second song with 44,100 samples per second.  That's 7.9 million numbers to process as fast as I can.

This has caused me to do some complicated things.  The best of my efforts entailed processing the audio in segments on every enterframe handler.  I'd tell flash to process a reasonable amount of data, stop, and then process more the next round until everything was finished.  If I remember correctly, this took around 20-25 seconds or so, and STILL made my UI very sluggish as I was processing the data.  And of course this was in my development environment - in real life, a user would be waiting even more time while an MP3 loads.

So, I had two basic problems.  The first was that data takes too long to process.  I can hide this potentially with a good user experience - after all people expect that loading a large file can take some time.  But this leads to my second problem - Actionscript runs on one thread.  Only one thing can happen at a time.  If I'm processing audio, I can't be updating/refreshing my UI.  And the whole application becomes unresponsive.  The more responsive I make my UI, the less data I process in a frame - but this just makes the whole darn thing take longer to process. Worse yet, if I process the whole thing in one go, Flash can timeout from inactivity at 15 seconds.

Basically it boils down to running it all at once, and potentially doing this:

![error1502](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2010/03/error1502.jpg)

or this....

![1476guy_asleep_computer](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2010/03/1476guy_asleep_computer.jpg)

Fortunately, there are two such Flash technologies that had the promise of helping me out.  First there's [Alchemy](http://labs.adobe.com/technologies/alchemy/ "Alchemy").  Alchemy is an Adobe research project that compiles C++ code to a Flash SWC.  Supposedly it can run code up to 10x faster than code compiled with Actionscript.

But, I haven't touched C++ in a while, and still had the problem of an unresponsive UI for the time it takes to process the audio (whatever that time is).  It was tempting, but I had my sites set on trying Pixel Bender.

Pixel Bender is a cross-product Adobe technology.  It runs in Flash, Photoshop, and After Effects.  Basically it allows developers to write their own image filters.  In Flash, you can apply this image filter to images, animations, video, components.....and well anything that displays on the stage.

The best part?  It can run in different threads, on different CPU cores, and on your GPU.  Well, actually, strike that last part....you can't run it in Flash on your GPU, but Photoshop and After Effects are cool.

This means that you can run a Pixel Bender shader on an image, and your UI doesn't slow down.  Maybe you wrote something insanely complicated, well...then your PxB shader will suffer performance, but your UI won't!

It doesn't stop there - you don't even have to have an image as your...erm...source image.  Yes, PxB assumes red, green, blue, and alpha channels.  But you can easily lie to PxB, and have it assume that your custom data is RGBA data.

This brings me full circle back to my problem.  I have something that supposedly processes data quickly, and on a different thread.  Hooray!  In fact, there's a few projects going on that use PxB for audio processing already.

Come to the [March RDAUG meeting](http://groups.adobe.com/posts/17db3726db) on Tuesday to find out more!  I'll be presenting, and quickly talking about what I covered here, but also diving into the nitty gritty.  You know....how to actually use this stuff in your work.

I'll also be following up this blog post with a second part next week covering what I went over in my presentation.
