---
title: "HTML5 vs Flash Video: Choose Wisely Part 4 – How to: Basic Flash Playback"
date: "2011-09-08"
categories: 
  - "development"
  - "flash"
  - "flashflex"
  - "ui"
  - "video"
  - "web"
---

The interesting thing about Flash is that before some recent projects, it was much harder to get a basic player going.  Video playback is composed of three basic elements: the NetStream, the NetConnection, and the Video object.

To start playback, you'd need to create a NetConnection, connect to a server if streaming or null if a normal progressive file, start a new NetStream with the NetConnection, and finally attach a the NetStream to a video object.

```
connection = new NetConnection();
connection.connect(null);
stream = new NetStream(connection);
stream.client = this;
video = new Video();
video.attachNetStream(stream);
stream.play("myfile.mp4");
addChild(video);
```

Not only that, but you'll need to add the video to the stage, and manage the aspect ratio of the video properly.  You'll also need to publish a SWF, and embed it on the page.

It's a heck of a lot more complicated than a simple HTML video tag, isn't it?

 

**Adobe's Open Source Media Framework**

A couple of years ago, Adobe set out to make things less complicated - to create a framework that can simplify video playback as well as provide an easy plugin architecture for ads, reporting, and more.  This framework can handle any video type that Flash can handle without you needing to worry about what type of video you're playing.

Let's check out how to get a simple video up and running:

```
playerSprite = new MediaPlayerSprite();
playerSprite.media = new VideoElement( new URLResource( "myvideo.mp4" ) );
addChild( playerSprite );
```

You'll still need to compile and embed on a page as well.  This is only 3 lines of code as opposed to the 8 without OSMF.  Its not necessarily the amount of lines of code I'm concerned with, it's that to really know what's going on, you need to know what the NetStream, NetConnection, and Video objects all do.  It can take a bit of research to put all those pieces together!  In other words, OSMF is more intuitive to me - you create a playback sprite, and then assign some media to it

The extra good thing is that we can handle most file types.  We'll get back to this in a bit, but as you use streaming media, worry about hooking up a control bar, things get exponentially more difficult.  OSMF makes this nice and tidy for you.  I must warn you though, as you start doing weird things with your video playback, you'll need to learn the language and architecture of this framework.  Normally though, things are quite simple to use through the framework's API.

**Strobe and Flash Media Playback**

Can it get easier maybe?  Answer is yes!  All levels of ease seem to be taken care of - from the insanely detailed and comprehensive to having a ready made SWF pre-compiled for you and ready to use!

The next level here is the [Strobe Media Playback](http://osmf.org/strobe_mediaplayback.html) project.  This project is already compiled and ready to go...ready to be embedded on a page.  It comes with some external configuration and external skinning options if you need to change anything around.  In addition to the compiled SWF, it comes with all the source code to the player as well - so if there's anything you need to change with code, you're welcome to make the change and compile again!

Can it get easier?  Yes!  There's [Flash Media Playback](http://www.adobe.com/products/flashmediaplayback/).  If you follow the link, Adobe brands it as "Instant Video Playback on your Website".  Flash Media Playback is an extension of Strobe Media Playback - however, you don't download any files.  Adobe hosts the player, you simply grab the embed code and perhaps make your own configuration file that you point it too to handle the customization aspects you need.  Adobe offers a configuration and test playback page for you to get started.

**Other 3rd Party Players**

There are plenty of players out there in the same vein as Flash Media Playback, and most have probably been around longer!  The most popular ones that I'm aware of are [JWPlayer](http://www.longtailvideo.com/players), [FlowPlayer](http://flowplayer.org/), and the [BrightCove](http://www.brightcove.com) (which has an entire video publishing platform)!

Typically you'll embed these on your page and pass in one or several "flashvars" to tell it what video to play.  I don't have much experience with these 3rd party players, but most cost money if you'd like to use them commercially.

 

As you can see, using video in Flash can range from drop dead simple to mind boggingly complex.  More on why this is in the next part of this series.  What's good is that there are several projects you can take advantage of to get simple playback on your website with no or minimal Flash experience....without even having to buy or touch a compiler even!
