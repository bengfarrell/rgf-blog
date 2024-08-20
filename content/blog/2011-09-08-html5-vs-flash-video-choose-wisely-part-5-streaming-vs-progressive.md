---
title: "HTML5 vs Flash Video: Choose Wisely Part 5 - Streaming vs Progressive"
date: "2011-09-08"
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

We've discussed in part 4 of this series that Flash can get a little complicated.  It's true, but it mostly boils down to the different video formats you can play.  Let's talk about those formats.

**Progressive Video**

If you are clueless about what the difference is between streaming and progressive video - chances are the video you know and love is said to be "progressive".  What does this mean?

Well, if you hit a single video file on a server somewhere and start downloading it, you can actually watch the video before it finishes downloading.  You are using it "progressively" in that you are watching it while download is in progress.  This happens in much the same way as if you had an image loading on a slow connection and you see it start at the top and fill in as it gets loaded.

One of the problems I've seen from progressive video files (at least when playing from Flash) is when the MOOV Atom is placed at the end of the file by the video encoder.  Think of the MOOV Atom as a block of data in the file that holds info about your video...like duration, bitrate, frame rate, encoding specs, etc.   If this is place at the end of the file, the player doesn't know the details of your video file, and won't play it UNTIL it gets this block of data.  Since it's at the end of the file, users need to wait until the entire video file is downloaded so that the video player knows exactly what it's playing.

**Streaming Video**

So, speaking progressively, video is one large video file that you download and cache to your computer (or at least that's whats happening behind the scenes in your browser) for playback.

On the other side of the coin, we have streaming playback.  Typically a streaming file will be served from some sort of media playback server as a lightweight container file that serves as a table of contents for many smaller video segment files.  The lightweight container file will be loaded once up front (or continually if it is often updated like when you are connected to a live stream).  Your player will then be smart enough to know what segment files are needed to playback video.  It will go out and grab these segments, and then throw them away when you're done.  A player will keep a "buffer" that may or may not be able to be set by the player of how many seconds of video to keep (and therefore how many video segments).  If you have video buffered, you can easily seek back and forth to these points instantaneously.  If on the other hand, you seek outside the buffer, the player will have to read the table of contents container and lookup which video segments to fetch and buffer for you.

The Flash Media Server will hide all the complexities from you, though.  Usually, you'll just connect to a path that starts with rtmp:// and ends with myfile.mp4.  For all YOU know it's just a file, not chunked up into tiny segments.  And actually it sort of IS one big file.  Flash Media Server will just tranform this file into a stream for you on demand, so its easy to manage and still works like a stream.

Flash Media Server, in recent days,  has actually started supporting streams over HTTP for Flash and iOS.   This means that if your company doesn't want to deal with serving stuff over RTMP, you can just use HTTP streams and Flash 10.1 (and OSMF if you don't want to program support yourself).  You can use your same server and files to send a stream to iOS!  Kind of a timesaver if you need to support both, instead of managing all 2 separate servers/encoders.

**Use Cases for Each**

Why use streaming vs progressive?  Well the major reason is what we in the business call "long-form video".  Long form video is typically 20 minutes to a few hours long, while  "short-form video" is under a minute or a few minutes long.  YouTube clips are perfect examples of short form video.  And they are also decent examples of why the overhead of having a streaming service and player is completely unnecessary.  If it's only a few megabytes, then it really doesn't take long to load and cache the whole video does it?  And in the end, when you close your browser you'll only have a few MB from it in your cache or in your memory.

Long-form, on the other hand, can be several hundred megabytes or even a couple of gigabytes depending how long the video is and what quality it was encoded at.  Not only will you be left with a behemoth of a file in your RAM or cache, but it you can't seek forward to skip over pieces until that much has been downloaded.

Another benefit of streaming is the ability to switch between bitrates or cameras.  If your video player thought that it was having difficulty keeping up with your HD file, ideally, you'll switch to a lower resolution video.  It's REALLY difficult and pointless to do this on a progressive file.  You'd have to latch on to a different file, and then seek to the position you left off at....which means you'd have to progressively download the file up to the point where you left off which could take several minutes!  With a stream, all you have to do is tell the server to start sending you different file segments.  It will do so, and the player will never be the wiser, cause all it sees is new segments coming in - it doesn't really matter if they are from a different source file.

So that coupled with a server's ability to offer DRM is a huge reason why TV shows and movies are all streaming.  While there are many DRM solutions available, one fact is that when you segment all your files like this (even without DRM), its a pain in the butt to download and assemble them all if you were so inclined to steal content.  Flash Media Server obfuscates the stream even more by serving it over RTMP.  Since it's an entirely different protocol than HTTP, most standard web dev tools won't even see the files come through and its even more difficult to steal!

Contrast this with YouTube.  Most of the time, I can go in and open up my Chrome developer tools, watch a big file come in, and copy the source URL.  I can then download the file and rename to a mp4 or flv file and then play it on my desktop.  BAM!  I just stole content and it took 30 seconds.

**Something in between (pseudo-streaming)**

You may have noticed recently in YouTube, where it shows you a red line in your progress bar to indicate your downloaded buffer.  In years past, you couldn't seek beyond this.  Well, now you can!  How is this possible?

It's what we call "pseudo-streaming".  Basically it acts like a progressive download, but with trickery it can have the main benefit of streaming which is to seek anywhere you want in the file regardless of how much downloaded.

It's do-able because many servers (even if just a simple Apache server running PHP) allow the browser request to specify a byte range.  Typically when you make a file request from your browser you ask for the file, and it ASSUMES you want all the bytes of the file starting at the beginning of the file.  What pseudo streaming does is to ask for the file, but ask for the bytes at a certain position in the file and not to start at the beginning.

**What's Possible in HTML5 vs Flash**

Pseudo Streaming is actually very popular these days because the HTML5 video tag supports it natively.  To use it, you as a developer don't have to do a thing beyond allowing your user to seek (as well as having a server that supports byte ranges).  Contrast this with Flash - where you'd need to jump through hoops to get this working.  Flash doesn't support byte ranges with video or audio, which means you'd have to load the bytes MANUALLY, and then append the bytes onto the active video stream.  Not only does this suck to code, but appending bytes to a stream wasn't even supported until Flash Player 10.1.

Of course, progressive is supported in both HTML5 and Flash.  Flash supports a few different encoding types including mp4/h264 just like HTML5 normally does (depending on the browser).

Here's the bombshell though...HTML5 does not support actual streaming, and there is no official proposed spec for it!  I bet you don't believe me because of a certain large, fruity corporation.  It's true though!  More on that in the next part.  But the long story short here, is that I can't imagine recommending HTML5 for long form content, doing 2 hour movies with a progressive download would be beastly (note that there may be clever ways, I just don't know what they would be beyond artificially breaking up the video files and leaving gaping holes in playback while loading the next segment).
