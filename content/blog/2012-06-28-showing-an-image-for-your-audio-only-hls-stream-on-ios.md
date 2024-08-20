---
title: "Showing an Image for your Audio Only HLS Stream on iOS"
date: "2012-06-28"
categories: 
  - "ios"
  - "video"
---

Now that I have a handle on this, it seemed like a sick joke how many false paths I was led down with this task.

So what am I trying to do here, what's the use case?

Well - one of the unique things about the Apple marketplace is their restrictions on streaming network video. If I have an Apple HTTP Live Stream that I host on my site and I'd like my iOS device to stream/play it Apple has some restrictions. If I don't follow these restrictions, they will reject my app!

One of these restrictions is to have an audio only component to my stream that is 64kbps or less. In the world of streaming, you'd typically switch back and forth between different quality streams depending on your bandwidth. And in this case, Apple forces you to have a low quality, no video stream. The reasoning is that if the user has a bad connection, they'll sit through this instead of a video that keeps pausing to buffer.

This presents an interesting user experience problem. Does my app feel broken if my stream keeps stuttering and buffering, or does my app feel broken if I see no video, but a black screen and just hear audio. Personally, as someone who is tech savvy I know a bad connection when I see it, so I'd rather have it pause to buffer, but ANYWAY....

One of the ways to enhance this unfortunate user experience is to show some sort of text to indicate to the user that "No this app isn't broken, we're just not showing you video because your connection sucks". How to do that though? Well it was suggested to me on the Apple forums to embed an image into the audio only stream, so that when it switches over the user is presented with the messaging.

How to embed it in the stream isn't so hard and outlined [here](http://developer.apple.com/library/ios/#documentation/networkinginternet/conceptual/streamingmediaguide/UsingHTTPLiveStreaming/UsingHTTPLiveStreaming.html#//apple_ref/doc/uid/TP40008332-CH102-SW1).  Basically you set a couple flags to indicate that your metadata is a "picture" and where the file is that you'd like to embed.  Just be careful though, because the image is embedded into every segment and contributes to your 64kbps allotment.

Showing the image is the thing that I had a hard time with.  The first thing that led me astray is this line from the HTTP Live Streaming Overview:

> _If an audio-only stream includes an image as metadata, the Apple client software automatically displays it. Currently, the only metadata that is automatically displayed by the Apple-supplied client software is a still image accompanying an audio-only stream._

Well FANTASTIC right?  So if I included an image in my stream as metadata, it will display automatically!  Um no.  And let me tell you, it was pure hell trying to find this out.  I was trying to test my newly minted stream outside of my app.  I used Safari, Quicktime, and VLC to try to see my awesome image - no luck.  I even opened the AAC file in Adobe Audition - it wasn't there either in the metadata section.

Then I started my online hunt for example streams online with this image.  No luck - either my Google-Fu isn't strong enough, or nobody does this (or advertises doing it).  A co-worker pointed out that he DID see the image data in the stream, and yes, my AAC  audio segments were the right size to have the image in them, so what gives?

Turns out that this magical image only works using the video tag in HTML on iOS Safari and in your own iOS app.  So there's no hope in verifying it on the desktop.  But wait, it gets worse!

In your own iOS app, it will only display automatically if you are using the older MPMoviePlayer framework.  I checked it out, and yup it worked (finally)!  The problem is that I was using the newer AVPlayer framework.  And from here on in, it's COMPLETELY manual.  What's manual mean?  Well, you're in charge of all your metadata.  This means that if you'd like to show that image you embedded, you need to grab the raw binary data, convert it to an image, and display it your DAMN self.

Fine, then - we have a "timedMetadata" property, let's use it:

`for (AVMetadataItem* metadata in [self._avplayer currentItem].timedMetadata) { if ([[metadata commonKey] isEqualToString:@"artwork"]) { self._overlayImage = [UIImage imageWithData:metadata.dataValue]; self._overlayImageView = [[UIImageView alloc] initWithFrame:CGRectMake(self.frame.origin.x, self.frame.origin.y, self._overlayImage.size.width, self._overlayImage.size.height)]; [self._overlayImageView setImage:self._overlayImage]; [self addSubview:self._overlayImageView]; } }`

That's actually not too bad right? That timedMetadata property is pretty handy. There's one mind-boggling catch though. You must add a AVPlayerItem observer for timedMetadata, like so: (where item is a AVPlayerItem)

`[item addObserver:self forKeyPath:@"timedMetadata" options:0 context:nil];`

If you don't do this, your timedMetadata will be null. So it's like that old riddle - if a tree falls in the woods and nobody is around to observe it, did it really fall? Apple says no. Actually they didn't say no - they just assume that you'll arrive to that conclusion.

When you do add that observer, you'd think that you would have an event to trigger showing this image. That would be true.....if you don't care that it won't go away when your stream switches back to video+audio. It's kind of maddening.

So, when you get the timedMetadata event, all seems well. You have the image data available to show the image, and you can go ahead and do it. After around 10 seconds pass and you get to your next segment you'll get another timedMetadata event. If the stream switched to video+audio, this will be the last one you get. It's kind of late to let us know that "for this past segment we should have not been showing the poster image".

"But don't worry", you might say - we'll just check the timedMetadata property of the AVPlayerItem. And I would say you're smart to try that, but no - metadata will always persist for this AVPlayerItem whether it's on the active segment or not. This means that with the timedMetadata property or timedMetadata events there seems to be absolutely no way to tell if the segment that you are currently playing has metadata on it and if it is an audio only segment.

Ick. Well, what the hell is the point of the image metadata on an audio only stream if it's all manual and this hard to control. But I needed to persist to get this task done...how can we know when to show this image and when not to?

I tried with AVPlayerItem.tracks. This will expose a track listing for the asset. Seemed pretty good at first - I was noticing that it was showing me I had video, audio, and metadata. Occasionally video would be dropped, and this seemed to coincide with the audio only stream - however this wasn't always the case. It seemed very flaky - so in the end I couldn't base things off of the tracks listing.

FINALLY I found the AVPlayerItem.presentationSize. When the stream was audio only, it would indicate that the presentationSize.width and presentationSize.height were 0. And I can use this and ping my video every second to figure out if I should be showing my image to the user that the stream at this very moment is audio only.

What an experience. We've gone from the documentation indicating that the feature was automatic to having to wrangle our own bytes, manage everything ourselves, and deal with several weird quirks of iOS. I'm glad I'm drinking tonight.

The worst part of it is, I got no help from Google searches and some limited\* help from the Apple dev forums. So I hope this helps YOU!

\*My limited help from the Apple dev forums consisted of a very nice developer hailing from Cupertino and another from Maryland saying he was having a hard time too. The Cupertino dev helped out immensely, but not enough because I don't think I was asking the right questions to get to my inevitable conclusion of suckiness.
