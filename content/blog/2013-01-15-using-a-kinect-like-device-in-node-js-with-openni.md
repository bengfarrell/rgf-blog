---
title: "Using a Kinect-like Device in Node.js with OpenNI"
date: "2013-01-15"
categories:
  - "c"
  - "development"
  - "javascript"
  - "kinect"
  - "nodejs"
  - "web"
---

Back in December, [I started playing](/blog/2012/12/12/starting-out-with-openni/) with [OpenNI](http://www.openni.org/).  Later in the month, after I posted that first blog post about getting my feet wet, OpenNI launched version 2.0 of their software.  This meant a few huge things, but first I'll recap what I'm trying to accomplish!

I've been OBSESSED with bringing motion detection to the web.  Websockets are probably the best way to bring it to the browser right now - with some kind of backend that deals with the depth camera.  I've explored projects like [KinectJS](http://kinect.childnodes.com/) which do it this way and do it well.  But, the problem is that despite KinectJS being the best tool for the job so far, it relies on both Adobe AIR, Windows, and a Microsoft Kinect.

While none of those are BAD things - I'd prefer to open it up a bit, especially since I'm running Ubuntu.

All this is old news though - and I wrote about it already.  I was already using the OpenNI Java SDK to ooooh and aaaah over my live depth camera.  When OpenNI 2.0 dropped in mid-december I had my Kinect clutched in my hot hands and ready to hack!

There were a couple problems with this, though!

 

## What Changed in OpenNI

The first thing is that the Kinect is no longer supported where Microsoft doesn't officially support it.  This means no Ubuntu and no OSX.  If you're using a Kinect, OpenNI uses the Kinect SDK as the device driver.  It makes sense, though - you're actually not LEGALLY allowed to use  the Kinect SDK unless you have the official Kinect for Windows device which costs over $200.

Previously, I had been using a cheap XBox Kinect with the Kinect SDK on my non-Windows system through OpenNI.  It was great while it lasted, but it really wasn't the right thing for OpenNI to do - they were stepping on MS's toes a little bit allowing this to happen.

So, now that OpenNI is doing the right thing, I had to face facts that I could no longer use my cheapo XBox Kinect.  Instead, I hopped on to [NewEgg.com and bought an Asus Xtion Pro Live](http://www.newegg.com/Product/Product.aspx?Item=N82E16826785030&nm_mc=KNC-GoogleAdwords&cm_mmc=KNC-GoogleAdwords-_-pla-_-Web+Cams-_-N82E16826785030&gclid=COXWjdOo6bQCFQY5nAodnxEAFw).  This thing is pretty cool - it seems equivalent in every way to the Kinect, except it doesn't have a motor so that it's head can move around and track you.  It's smaller too!

![My new Asus Xtion Pro Live](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2013/01/IMG_20130104_174634.jpg)

 

I should note that I found out later that it may be possible to use the Kinect with OpenNI on OSX and Ubuntu with a separate project called [Freenect](https://github.com/piedar/OpenNI2/tree/FreenectDriver).  But you know what?  I'm happy being on the up and up now!

OpenNI turned out to be super easy to install.  I felt like I had to jump through a few hoops and went through a few frustrations trying to get OpenNI 1.x working.  But with 2.0, I had the samples running in a matter of minutes.  Woot!

They divided OpenNI up into two pieces with clear definitions.  OpenNI is for freely available device drivers and low level depth camera info. So if you load up the OpenNI samples, you can see a depth stream like so:

![NI Viewer Application](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2013/01/sampleviewer.png) NI Viewer Application

So, if OpenNI is the "heart", a project called "NiTE" is the "brains".  NiTE is middleware - its a library that takes the depth data from OpenNI and does what you'd normally think a Kinect would do and recognize user gestures, posture, skeletal/motion data, and more.  I don't believe the source code is release for NiTE like it is for OpenNI - you can find [OpenNI on Github](https://github.com/OpenNI/OpenNI2).  For those familiar with OpenNI/NiTE 1.x - the separation of tasks that these two provided have definitely been more segmented and defined in 2.0.  Now there's really no question what each does, functionality-wise.

 

## No Java, No Problem

But, when I was all done playing with the samples, I wanted to hack some code - lo and behold, there were NO JAVA FILES!  Only these strange .cpp files.  Luckily, I at least knew enough that this was C++.  But my heart sank - I could vaguely work my way around Java due to my Android hacking, but C++ is something I never really tried.  Luckily, I pulled enough out of my subconscious to recognize that I could just run "make" on my command prompt in the folder to build the project from scratch.

This was OK - but then it hit me....

I really wanted to use Node.js in the FIRST place for this and not Java.  Socket based communication is quite popular in Node.js.  So now my hand is forced - it's time to write a C++ Node.js AddOn that lets you use OpenNI right in Node and broadcast the Node data over websockets to my page.  I was quite giddy at the prospect of all of this being in Javascript, so I set to work.

First I learned how to make [Node.js AddOns](/blog/2013/01/03/c-and-node-js-an-unholy-combination-but-oh-so-right/).  Once I learned how to do that, I struggled GREATLY with the Node.js build system ([node-gyp](https://github.com/TooTallNate/node-gyp)) to include the files in OpenNI shared library files the proper way.  After stupid mistakes festered in my brain for days - I finally got it building! And now it was a matter of building things the RIGHT way - with OpenNI AND the NiTE middleware so I could recognize a few gestures.

 

## Not Your Average Node AddOn

Actually - I don't know what the average Node.js AddOn looks like - but frankly, I think that when you take into account how OpenNI works you need to get a little advanced with your plugin.

Why?  Well, the OpenNI/NiTE examples run in a massive while loop that locks up the entire main thread.  This is OK in the example, because it's a self contained system.  We don't need to event out, accept input, etc.  Basically, in the examples, for each iteration of the while loop, a "frame" is read.  In OpenNI terms, a "frame" is what you'd think it is - it's a frame of video - only here's it's a frame of DEPTH video!  Each pixel is represented as depth data.

With NiTE, though, each "frame" contains a list of body part/joint positions, gesture data, and whatever you listen to.

So - how do we incorporate these while loops if they are going to block the entire Node.js process?!  I had actually tried having Node.js Javascript code call in every 50 or so milliseconds to query the frames.  This seemed to have the effect of doing everything fast enough that it caught my gestures - but it seemed a bad solution to my problem.

Instead, I learned how to create a separate thread in C++, and using the Node.js C++ thread utilities, I spin up the thread which my while loop runs and processes the frames.  If a gesture is found, it messages out to the main Node.js thread to report the event - which I then pass on to my Javascript.

 

## My First AddOn

So, in the end, my first Node.js AddOn to enable OpenNI/NiTE is a simple one.  If you start the plugin, you can wave to the camera or make a clicking motion with your hand.  Node.js, with the power of OpenNI/NiTE will send you a string that indicates which gesture you just did!  It's a small step, I know, but one I'm super excited about.

Best of all, you can either use my stuff as I go along, or use it as a template or learning tool so you don't have to hit your head against the wall as hard as I have trying to get this working!  I'd like to get more features very soon, and pipe this stuff through websockets to my page.

Right now though, I have a super simple, but WORKING Node.js motion capture AddOn. YEAAAAAH!

 

## Going Forward

Next I DEFINITELY want to add support for more gestures and skeletal data.  Unfortunately, I see that NiTE only seems to support 3 gestures.  So, I'm not exactly sure how to continue with that - though I do believe the skeletal data will be pretty straightforward.

On the plus side, middleware is interchangable.  A company called [Covii](http://www.covii.pt/) has another middleware solution called Viim - and from the looks of things, gestures are VERY thoroughly supported.  Only problem is that the solution costs a couple hundred dollars.  I'm sure it's QUITE worth it - but I really wanted to show you guys something more approachable (technology-wise and wallet-wise).   Anyway, I'll figure something out, even if it means having to plunk down a couple hundred for an awesome piece of middleware.

## Try it!

All of this is well and good, but many probably don't care how the AddOn works, how I made it, or anything else.  You might be scared of C++ (I know I was!) and just want to try things out in Node.js.  In that case, I do have a github repo for you.  For now, you'll have to follow the readme, and make the file yourself using the provided instructions.  I'm calling this project "Sweatin' to the Web" and you can grab it [here](https://github.com/bengfarrell/node-sweatintotheweb).

Like I said, it doesn't do much yet!  But, I do think that the frustrating part is over, and the fun begins as I can dive deep into what OpenNI/NiTE and more can do!
