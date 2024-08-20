---
title: "HTML5 vs Flash Video: Choose Wisely Part 7 – What's Happening on the Server Side"
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

So we talked about how Apple supports both progressive and streaming video with their HTML5 video tag.  We also briefly discussed how Flash Media Server serves up its OWN streams.  What about Apple's HTTP Live Streaming?  What kind of magic is that?

Turns out that its quite simple.  Take a video file, after encoding it for HLS you'll end up with a directory of files.  First off there is a table of contents file.  This table of contents files points to MORE table of contents files, and these point to video file segments.

The video segments are most likely h264 encoded segments.  Each one has a "ts" file extension (myfile.ts).  "TS" stands for transport segment.  Each segment will most likely be small, about a megabyte or so and contain several seconds worth of video (this is entirely left up to the encoder settings).

The table of contents files sound a little hacky, but they work well.  Apple has gone ahead and adopted m3u8 playlist files for streaming video.  What's that you ask?  What's m3u8?  Well, if you crack open Winamp or iTunes, you can create a music playlist.  Both m3u and pls files are pretty standard for holding playlists of songs.  The m3u8 spec is an enhanced version of this (and still used for music playlists!). It makes sense though, you're really just assembling a playlist of video segments.

I also mentioned playlists in playlists didn't I?  Well, the master m3u8 file will typically hold several different bitrate references (for if a user wants high definition, low definition, or anything in between).  This file will hold references to other m3u8 files and list what their bitrates are in bytes per second.

The reference m3u8 files will be the ones that actually list the segments, examples are listed below.

 

First is an m3u8 file referencing OTHER m3u8 files for the different bitrates:

#EXTM3U #EXT-X-STREAM-INF:PROGRAM-ID=1, BANDWIDTH=200000 http://ALPHA.mycompany.com/lo/prog\_index.m3u8 #EXT-X-STREAM-INF:PROGRAM-ID=1, BANDWIDTH=200000 http://BETA.mycompany.com/lo/prog\_index.m3u8 #EXT-X-STREAM-INF:PROGRAM-ID=1, BANDWIDTH=500000 http://ALPHA.mycompany.com/md/prog\_index.m3u8 #EXT-X-STREAM-INF:PROGRAM-ID=1, BANDWIDTH=500000

Next up is an example of the actual m3u8 file that holds all of our file references. #EXTM3U #EXT-X-TARGETDURATION:10 #EXT-X-MEDIA-SEQUENCE:0 #EXTINF:10, no desc fileSequence0.ts #EXTINF:10, no desc fileSequence1.ts #EXTINF:10, no desc fileSequence2.ts #EXTINF:10, no desc fileSequence3.ts #EXTINF:10, no desc fileSequence4.ts #EXTINF:10, no desc ..... #EXT-X-ENDLIST

**Live Playback Limits on HLS**

In the example above, notice the line #EXT-X-ENDLIST.  This command marks the end of the file.  This an important piece of info!  It tells Quicktime that there will be no more segments after this, and what we have in the file is the entire stream.

What if this line didn't exist?  Well, it turns out that the absence of this line indicates to Quicktime that the m3u8 file is a live stream.  In this regard, the file has no end.  With a VOD (video on demand) stream, Quicktime only needs to query this table of contents once, and the player is secure in it's knowledge that there is nothing else to load.  For a live stream, the m3u8 file is repeatedly queried to find out what the latest segments are so the player can keep up with the most recent segments.

This is a nifty little system -  but there's a problem.  Typically, a live event will allow the end user to watch in a 30 minute or so sliding window.  The user can't seek backwards more than 10 minutes or so.  These older segments are dropped from the m3u8 file such that the m3u8 file only contains a handful of segments.

The problem is if you need a long stream.  My last project had a need to run clips from a large 14 hour stream.  When playing through HTML5 on a web page, the stream broke down after it grew to 40 minutes or so.  The problem was that the growing number of entries referencing transport segments made the file grow exceptionally large after a while.  If I recall correctly, a 10 hour stream's m3u8 file was around 600kb for me. Multiply that by 3 for the other bitrates I had.  So eventually, Quicktime was constantly querying over a megabyte of playlist info - and it had trouble keeping up with playback!

I came up with the solution of having our encoding team put a fake end on the m3u8 file even though it was live.  This caused the file to only be loaded once even though the live stream was continually playing.  It doesn't work for a lot of situations since you're not able to play the most recent stuff since you loaded the file, but it worked for our specific needs with our site!

Miraculously, it seems that this is only a problem in HTML5, and not a problem if you're just running Quicktime natively or in an app.

**Other Streaming Services**

I don't have any experience with Silverlight, but IIS's Smooth Streaming functions pretty much the same way.  Instead of an m3u8 file, Smooth Streaming has an XML format for it's table of contents.

We discussed how Flash Media Server worked in a previous post in this series - but to recap, it can generate these segments on the fly and serve them over RTMP, HTTP and for Flash or iOS.

Playback in Flash doesn't have the same length issues that iOS HTML5 has for live streams.  It plays things back fairly well!  HLS and SmoothStreaming though, have a pretty important feature on Flash - bitrate switching happens automatically between the server and the player.  You don't need to program anything extra in your code to make bitrate switching work - and it does work very smoothly!  You'd be hard pressed to notice the transition.

Flash recently implemented a smooth stream switchover as well.  You as a developer, must measure bandwidth and make the switch yourself (though OSMF will do this automatically for you).  Once you call the "play2" command, it will START making the switch, but it will wait until the next video keyframe to make the switch so its as seamless as HLS and Smooth Streaming make it.
