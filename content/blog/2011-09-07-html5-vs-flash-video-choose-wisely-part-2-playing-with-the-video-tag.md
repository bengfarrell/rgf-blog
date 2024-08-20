---
title: "HTML5 vs Flash Video: Choose Wisely Part 2 - Playing with the Video Tag"
date: "2011-09-07"
categories: 
  - "development"
  - "flash"
  - "flashflex"
  - "html5"
  - "video"
  - "web"
---

**Simple playback**

Simple playback is just that!  Simple.  This can be a very good thing.  Offering a video up via the tag allows for easy playback.  Easy for the user, and easy for the page developer!

```
<video width="640" height="360" controls src="myvideo.mp4"></video>
```

See that?!  It's just like an image tag!  Put a source, height, and width on that tag, and you've got video!

 

**Native vs Custom Controls**

I avoided mentioning the part of that tag that reads "controls" when I was laying out the video tag above.  Basically the presence of this tag means that you're telling the browser: "Yes I would like you to displayo your standard video player controls".  Many times developers will write controls="controls", controls="true", etc.  All mean you want the browser's native video controls on your video.

Normally, these controls include play and pause buttons - as well as a volume slider and progress/seek slider.  These controls will look different as you bounce between Chrome, Safari, Firefox, IE, and devices.

So, if a consistent look/feel across devices and browsers is in your customers best interest, its time to ditch the native controls.  Likewise, if your customer has additional buttons that they would like to add to the control bar, such as an "information about this video" button, it might be time to ditch the native controls.

Basically, once ANY customization is required to the players control bar, you've crossed into building everything yourself.

What's involved in doing custom controls?  Well, now we're talking about creating individual buttons and sliders ourselves.  These buttons and sliders need to hook into the video tag's Javascript API.  After creating our controls, we'll need to stylize them with CSS to overlay them over the video and act like a real control bar.

This isn't necessarily a bad thing, the video tag has a pretty decent API.  It's a little bit of work, but you didn't think you were getting a custom skin for free right?

**Javascript API**

CSS is beyond the scope of this post - but needless to say, you'll most likely be relatively or absolutely positioning your control bar and making sure the z-order is higher than that of the video.  You'll also probably use some nice jQuery animation for when the user mouses over the video area to auto-show the control bar.

Once you've fleshed that out, you'll be wiring up your buttons!

Obviously your play button would call video.play();  Or would it?  What if the video was already playing - it might call video.pause() instead!  Play/pause buttons are usually grouped together in a playback toggle button.  You'll need to handle this logic yourself as well as update any buttons to show the appropriate icon.

Whether the video is playing or paused can be checked via the video.paused property.  You can check this boolean to determine the status.

Handling your volume control should be pretty easy if you just wanted to use a slider.  The value of the slider could effect the video.volume property.  The volume could be anything between 0.0 and 1.0.

Next up is the current time of the video and the ability to seek/scrub anywhere in the video.  Again, you could start with a simple slider.  You can get the duration by asking for the video.duration property, and the current playback time of the video by asking for the video.currentTime.

The video.currentTime is also a settable property.  Setting this to a specific number (in seconds) will cause the video to seek to that time.

Be careful though!  If your video is just beginning to load, it may not be seekable.  You can find out what parts of your video are seekable by using the video.seekable property.  You can test this by using the "TimeRange" object that the seekable property gives you back when you ask for it.  Testing if your desired seek time falls before video.seekable.end is a good indicator that your seek will work as advertised.  I actually like to test if the seekable object returns an object with a length over zero just to make sure it's not empty and not even initialized enough to tell me if it's seekable.

The video.buffered property will also return a "TimeRange" object and if you're doing anything advanced, knowing what video is buffered could be very useful info!

Next up we have events!  You may have thought that you can get the video.currentTime to find the time of the video and update the playback slider to the correct position.  But should you include a Javascript timer to poll the current time to see if it changes?  That's not necessary because you can add an event listener on the video object to listen for "ontimeupdate".

There are several other events you can listen for that will help you out...but first, I'd like to save you an hour of banging your head on the desk!

When placing the event inside the tag itself, you use "ontimeupdate", like so:

```
<video width="640" height="360" controls src="myvideo.mp4" ontimeupdate="myFunction()"></video>
```

However, when adding an event listener, the event type doesn't contain the "on", like so:

```
video.addEventListener("timeupdate", funtion() { my script } };
```

Like I said, there are a few other events you can listen for.  The event type of "onplaying" can alert other parts of your application when the video starts to play.  The event type of "oncanplay" will tell you when the video is ready to start playback.  The event type of "onloadeddata" is another good one - it indicates that the data for the current frame is loaded, just not necessarily that we can continue playback.  Another good event type is "onerror".  You can listen to this error when the video can't be played, and show something nice to the user to redirect them to something else.

**Some shortcomings**

As far as simple playback goes, the video tag is simple...and it works.  It's actually pretty decent and comprehensive for many situations.

Are there any problems?  Well, yes.

Using the tag as defined by the W3C is easy, but it's not reliable!  The W3C spec defines using a video file for playback - it talks about how you can interact with the video and what events you can listen to from the video.

Problem is, the spec doesn't actually indicate what TYPE of video the tag can play.  Browser makers are left to fend for themselves when it comes to implementing video playback for any given video format.

Flash popularized the h264 specification.  Many argue its the most compact and efficient.  Problem is that it's patented by MPEG-LA, a group of companies who all hold various patents on the standard.  The group is comprised of Apple, Microsoft, Panasonic, Sony, and 22 other patent holders.

To use h264 encoding or decoding, users must pay a license fee to the MPEG-LA group.  Since the Flash plugin has h264 decoding (and now encoding) built in, it's Adobe's responsibility to pay royalties on the specification.  Many speculate that the code to implement h264 encoding is the reason why Adobe can't release the whole flash player source code publicly.

Anyway, the point is, that each browser must pay up if they want to use h264.  Internet Explorer, Chrome, and Safari do.  Chrome was threatening to pull the plug on it any day now in favor of their VP8 codec that they open sourced such that anyone can use it.  Ogg is ALSO free and open source, which is why it's the only format that Firefox supports.

With Google backing VP8, and Adobe implementing it in Flash, it seems the most promising unless everyone just decides to continue paying MPEG-LA.

So now we have a problem - how do we tell our video tag to play multiple formats based on the browser/device?  Luckily, the video tag supports multiple source tags:

```
<video width="640" height="360" controls >
   <source src='video.mp4' type='video/mp4'>
   <source src='video.ogv' type='video/ogg'>
</video>
```

This solves the playback problem, but we still have to encode our videos twice over!  Or 3 times over if Google ever decides to drop h264 and go with VP8...then we're encoding h264, VP8, and ogg.

Additionally, we're stuck using only those browsers that support the video tag in the first place.  This issue is becoming less of a problem with IE being the real drag since only IE9 supports it.

Let's talk about the reality of this sticky situation in the next post!
