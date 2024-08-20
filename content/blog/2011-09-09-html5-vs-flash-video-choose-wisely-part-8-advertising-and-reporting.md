---
title: "HTML5 vs Flash Video: Choose Wisely Part 8 – Advertising and Reporting"
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

Before we conclude this series, I should mention something nobody likes - but they are an absolute necessity if content producers are going to put their video online in the first place.

Those things are ads and reporting.

Content owners want to monetize their video, and be able to track many aspects of it's usage to make better decisions about video you're watching.

With Hulu, Netflix, and many networks putting first run television online it seems that web video is gaining on what we watch on cable TV, and we may see a day soon when the web is significant enough to eat into cable tv's revenue model such that we'll networks and content producers who want to thrive can't afford to just be on one or the other.

As ad revenue from cable tv and network broadcasts are shifted, owners will want to make sure this money is JUST shifted and not lessened.  So even today, folks are experimenting with longer ad breaks to see if they can get away with the same video experience you see on TV.

To accomplish this, we need some good 3rd party libraries from ad companies and reporting companies, as well as decent support on the actual device, browser, or plugin to facilitate these advanced needs.  If we can't come up with creative solutions to accommodate ads and reporting, companies will simply not come - and this can make or break a platform's usefulness for serving video.

**3rd Party Library maturity**

I've been working with Flash video extensively for a few years now, and in that time I've seen 3rd party frameworks and libraries delivered to us from various ad and reporting companies (many revisions in fact).  Flash seems to have a lock on maturity of 3rd party libraries for handling these things.  Flash has almost maniacal support for every aspect of playing video - something you won't see from HTML5, or even iOS (from what I've seen so far).  In truth, this is why Flash is difficult to work with for video newcomers.  But, at the same time it offers extreme control to allow almost anything we need.  We can offer midrolls, prerolls, postrolls, companions, overlays and more.  We can also track video buffering events, stream transitions, and many more minute details.

HTML5 video, on the other hand doesn't have this level of control - especially in iOS given the playback obstacles we've discussed.  Given this - many 3rd party libraries are still figuring out how to offer the same level of ads and reporting we can obtain from Flash players.

One company I work with just recently started offering midroll ads, where before their Javascript/HTML5 video solution wasn't mature enough to do this.  They seem to be coming along just fine, but won't be caught up to Flash anytime soon!  See [part 6](/blog/2011/09/09/html5-vs-flash-video-choose-wisely-part-6-apples-html5-vs-normal-html5/ "HTML5 vs Flash Video: Choose Wisely Part 6 – Apple’s HTML5 vs Normal HTML5") for my experiences working with mid roll ads.

**Advertising with MP4 - At Least that's Easy!**

I've talked about iOS streaming for long-form content.  It uses Apple's HLS, and is pretty much incompatible with Flash or Silverlight.  As a result, content owners will need to completely re-encode their streams for Apple devices - that is IF they want it to be streaming.

Many advertisers these days, however, will serve up their ad creatives as mp4 files encoded with h264.  This works on Flash, and it ALSO works on iOS, Chrome, and IE.  This means that if these advertisers wanted to use their same ads on iOS, they're free to do so without have to re-encode the files!

**Companion Ads and Banners**

The same can't be said for companion ads, however.  Companion ads are static or animated images that you see outside the video player area (usually in another div on the page).  The problem is that these ads, in my experience, aren't static images and usually animated Flash.  This means that advertisers and content producers need to work together to create new companion creatives and serve them up appropriately for Flash or iOS.
