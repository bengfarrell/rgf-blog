---
title: "iOS Video is Cranky!"
date: "2012-01-28"
categories: 
  - "development"
  - "ios"
  - "video"
---

I'm close to wrapping up a decent sized iOS project, and my part was video playback.  Prior to this, I've done tons of work with Flash video.

I hate to be labeled biased, but I've never appreciated the level of detail put into the Flash API before working with both HTML5 and iOS.  Flash has tons of quality of service queries you can make, you have explicit control of bitrate on multibitrate streams, you have complete seek accuracy in streams.  Virtually anything you could ever want, you got it!

Compare that to the AVPlayerFramework API for iOS.  You can listen to status messages and put an observer on the current playhead time.  That's pretty much it.  And those status messages come in the form of ready to "play", "failed", "played to the end", "failed to play to the end" and "unknown".

The lack of features actually isn't too much of a problem for streaming playback.  Streaming content is handled like a champ by the framework.  A bad network connection might cause the stream to stutter, freeze, and stall - but as the connection gets better the video is recovered quite well automatically.

One of the complications presented by Apple's guidelines is that an application that streams must provide an audio only low-bitrate stream to compliment the higher bitrate video/audio streams.  The AVPlayer framework does a great job doing what it needs to do switching the user to the best available stream.  Unfortunately, if bandwidth gets really bad, the audio only stream is a valid option - and iOS WILL switch to it.

It presents an interesting conundrum.  Video looks broken to the user, and especially your clients who are footing the bill.  I'd almost rather have the video stammer and stutter than to switch to this audio only bitrate - at least then, most tech savvy users would know that they are having network connectivity issues.

The other problem is the ability to seek to exact positions in a stream using the AVPlayer in anything less than iOS 5.  A stream is broken up into chunks.  Those chunks are transport segment (.ts) files.  Typically those chunks will be around 7-10 seconds each.  Turns out that if you want to seek to a specific second of your stream, it better lie at the beginning of a segment, otherwise your seek accuracy is (at worst) 7-10 seconds off.

Past that, streams are pretty decent, like I said.  What got frustrating though, was simple progressive video!

Progressive is fairly easy to play.  You load, play and go.  After loading, you need to wait for the item ready status, and then tell the content to play.  By nature, progressive loads welllll....progressively.  You can start playing back the video before the entire thing finishes loading.

The limited API of AVPlayer seems to present some problems here.  Your video is only "ready" once.  What happens if you are progressively playing, but suddenly your connection drops low, and you can't quite finish playing the content because you've reached the end of whats been playing?  I'll tell you what happens....your video pauses.  While paused, the rest of the video will finish loading.  Unfortunately, there is no status message to inform you that the video is ready to play again.  So there it sits.  Paused.

Drastic shortcomings call for stupid hacks.   Such as setting up a timer to fire off every few seconds and tell the content to play.  If the content is currently playing, the call to play will do nothing.  However, if it's stalled and paused, we can keep the video moving along automatically.

Another shortcoming I ran across is an unfortunate reality with the AVQueuePlayer.  The AVQueuePlayer is like the AVPlayer, but you can playlist things.  I chose to use this type of player due to other requirements in my project.  For my work, I wasn't really using it as a queue.  Instead, I'd simply replace the current item in the queue to play a new asset.  Unfortunately this method of doing things didn't seem very reliable.  If an item failed in my queue, I could add further items and make them play, however I wouldn't get any status events about the item.  That means I'd never get told when it was ready to play, when it completed, when it failed.  It was really a showstopper.  Sometime, even if the item didn't fail to play, I'd see that subsequent items wouldn't produce status changes.

I ended up having to destroy the player and starting fresh each time - oh well.  Even though I wasn't using it as a queue before, now I REALLY wasn't using it as a queue.

So there it is.  I got through it, but video was  a little cranky!
