---
title: "HTML5 vs Flash Video: Choose Wisely Part 6 – Apple's HTML5 vs Normal HTML5"
date: "2011-09-09"
categories: 
  - "html5"
  - "ios"
  - "javascript"
  - "ui"
  - "video"
  - "web"
---

If you are interested in pursuing HTML5, I imagine the reason why you are doing so is to support iOS.  As we all know, iOS doesn't support Flash, so to play video we'll need to take advantage of HTML5 video.

HTML5 is fairly normal via Safari on OSX.  Safari is just another browser, however the video tag is handled by Quicktime.  It looks like we're trading one plugin for the other here!

There's probably nothing wrong with using Quicktime here in OSX.  If Apple chooses to use one of their oldest video technologies to playback video in their browser on their OS, no big deal!  It really probably a matter of semantics anyway - could you consider the h264 decoder in Chrome a plugin?  Yes and no - its a fine line.

On Windows, however, if you use Safari, you'll need the Quicktime plugin installed!  So, here we're REALLY talking about a plugin.  In this situation its both a plugin AND HTML5 at the same time.

As it is Quicktime, we can use the video tag to play whatever Apple can normally play with Quicktime.  In fact, we can play Apple's HTTP Live Streaming (HLS).  I think this leads to a great deal of confusion and is a pretty big bait and switch on Apple's part.

First they tell us "who needs Flash?!  Its slow, buggy, and HTML5 can replace it!".  Then they live stream their developer event in HTML5, but surprise!  Only Apple's brand of HTML5 can stream it, because it's really Quicktime under the hood.  Even more than that, streaming video isn't even part of the HTML5 spec!  So, it should be quite awhile before we'll see streaming content come to browsers natively.

**Some Apple playback quirkiness**

I really haven't seen much in terms of weirdness on Safari OSX.  I haven't had to play with it much, but the video tag works pretty much as advertised here (since it's webkit, it's just like using Chrome in fact).

But that's not really what matters - on OSX you have the option of Flash too.  On iOS, you either need to go HTML5, or write an app.  There's no other option!

So, how does the video tag fare?  There are some major things here to be aware of.  Apple has decided that we can't be trusted with the autoplay feature of the video tag, so they have disabled it.  This means that you cannot automatically play a video after a page loads.  There needs to be some sort of user intervention here to kick off the video.  This will usually involve a play button overlaid on top of the video that the user clicks to start playback.  It's a little heavy handed in my opinion, but the reasoning behind this is to not let malicious people use your data for things that you don't want - like ads.

Unfortunately, this prevents some major barriers for advanced video applications. Something as simple as playing midroll ads (ads that appear in the middle of content at a specified ad break) is made complicated.

**Midroll Ads**

See, one problem with midroll ads is that you must stop your content, flip over to the ad, and then after the ad, resume content again.  I've done this in Flash and am currently doing this in iOS/Objective-C.  In my experience, the best way to do this is to use two separate video objects.  With your main content in one video object, when an ad comes on, you can pause this and spawn a new video object overlaying it on top of your main content.  Play your ad in the new video object, and then when you're done, kill the object and resume your main video.

With this game plan, you don't need to suffer through a rebuffer of your main video content after your ad.  If using the same video object, you'd need to not only load the video again, but automatically seek to the spot right after the ad break.

Using two video objects like this isn't really feasible.  For each video tag you use, you'd need to tell the user to manually click play on each one.  When playing an ad - you're adding insult to injury like this!

Furthermore, another quirk I've seen is when you hide a video tag on iOS using CSS and either hidden or display:none.  This consistently crashed my iPad browser when I attempted this.  So maintaining 2 video tags, but hiding one isn't an option!

In essence, midroll ads seem to be stretching the capabilities of HTML5 on iOS!

**Automatically Seeking**

Yet another quirk I've seen is attempting to automatically seek into a stream a certain number of seconds (which you'd need to do when returning from an ad, or just playing a clip of a larger video).  The problem is that when you initially load a video resource, it can take some time before you can interact with it and tell it to seek.

The initial run up to playback includes the video object becoming ready, the asset being loaded enough to start playback, and finally as more of the asset is loaded, and finally it becomes seekable.  The problem is that this process can take a second or so.  In the MEANTIME you can't interact with the video and tell it to seek.  You just have to sit there and watch it playback a second or half second of video.  What should be an automatic seek becomes an automatic seek with a small video glitch at the beginning.

**Player Chrome**

Your customers like customization don't they?  Some would like some nifty custom graphics to show up wouldn't they?  A custom lime-green playback button to match their brand maybe?  It's completely possible on the desktop with HTML5 - simply hide the controls and create your own, positioning them over the video with CSS.  The problem is that this is a bit problematic in iOS.  See - in my experience, you can't overlay things on top of a playing video.  Well actually you can - but the video window will suck in all your mouseclicks.  This means that while you can overlay your own controls on iOS, they probably won't function.  Nothing can obscure the video and be perfectly functional!

Furthermore, you always get the same UI when you run either on an iPhone or an iPad in fullscreen mode.  You get Quicktime's native controls - your page is gone (in the background) and you are left with nothing but the video playing in the Quicktime application.  Fortunately enough, Javascript can still operate in the background and control your video.

**Video API Events**

I've also noticed that events can be a little unreliable on iOS, like listening for "onCanPlay" or when the player is ready.  I've had to setup a timer that fires every half second or so to check for readiness and playback state in my own project to accommodate this problem.
