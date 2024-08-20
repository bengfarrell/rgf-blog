---
title: "Further Adventures in OpenNI and Node.js - Making it Crossplatform"
date: "2013-01-30"
categories:
  - "c"
  - "kinect"
  - "nodejs"
---

I hate to do things twice, but sometimes it just needs to be done twice, three times, or more.  Luckily after the first time of faking things through, you become a bit of an expert at the many things that can go wrong!

And so it goes with building out our Node.js OpenNI plugin.

Just a couple weeks back, I posted on building a Node.js plugin to use gesture and joint data provided by the ever fantastic OpenNI project.  For those that aren't familiar, well, it's LIKE the Kinect, but crossplatform and open.  I [posted my experiences building a couple simple gesture/motion controlled plugins as an Ubuntu user](/blog/2013/01/14/using-a-kinect-like-device-in-node-js-with-openni/).

There are a couple experiments I'd love to do, but I can't QUITE do them on Ubuntu yet.  The first is to check out Viim, a more robust middleware than NiTE.  The middleware, in OpenNI land, bridges the gap between the depth and RGB data and the actual gestures and skeletal data.

Like I said, [Viim](http://www.covii.pt/viim/) seems MUCH more robust than NiTE offering a full suite of gestures and other goodies compared to NiTE's lowly three gestures - though NiTE DOES offer skeletal data.   It seems that Viim is on the cusp of being released for Ubuntu, but for now, we must make do with Windows and OSX.

Another little thing I wanted available in my experiments is speech interaction.  The OpenNI project doesn't seem to offer this like Microsoft's Kinect SDK.  Nevertheless speech interaction is important to anyone studying in the Natural User Interface dojo.  Luckily, new to Chrome 25 is the Speech API!   v25 isn't quite out yet, but we can grab the Chrome Canary build - which DAMMIT, isn't available on Ubuntu side by side with the production version of Chrome.

Oh well - it's probably time to try things out on Windows.  Even if these things are released tomorrow, I'm not wasting my time.  It's good to make sure all my experiments work cross-platform.  I want YOU to try this stuff out, whether it be on Windows, Linux, or whatever!

Being the noob that I am - C++ compilation on Linux was brand new to me.  So GCC and G++ were new and scary.  But using Make wrapped things up into a nice little command line package.  It was easy to just type "make" on the command line and have everything just......go.  Likewise, with Node.js' build tool: node-gyp.   Once I had my build.gyp file setup correctly, it was easy to just run "node-gyp configure build".

Gyp would create the appropriate Make files with the configure command - and then use G++ to build the stuff that the "configure" command spits out.

Turns out that Windows was surprisingly similar, with one curveball!  Node-gyp on Windows spits out "vcxproj" files (and friends).  These files are actually Microsoft Visual Studio project files.  So, you COULD open these right up in Visual Studio if you wanted to.  I wanted to see if we could still run these on the command prompt - the same "node-gyp configure build" routine, you know?

Well, aside from making sure we have Node-gyp installed from the Node Package Manager (npm) and Python installed to complement Node-gyp, we'll need some Windows tools:

1. [Microsoft Visual Studio for Dekstop (I used Express 2012)](http://www.microsoft.com/visualstudio/eng/products/visual-studio-express-products)
2. [Visual Studio SDK](http://www.microsoft.com/en-us/download/details.aspx?id=30668)

Please note that I'm using Windows 8, so 2012 works for me!  Your mileage may vary.  And because I'm using Windows 8, I had trouble with my next dependency: OpenNI and NiTE!

With my old copy of my OpenNI 2.0, I actually couldn't get things compiling on Windows 8.  One of the header files complained that my C++ compiler was too new.  Luckily I didn't have to put too much brainpower in here, because [OpenNI 2.1 was just released](http://www.openni.org/openni-sdk/), and that solves the problem.  Visual Studio 2012 happily updated the project files provided by the samples, and I could create executables, so all was quite well there.  [Downloading and installing NiTE](http://www.openni.org/files/nite/) appeared not to have similar problems.

After some trial and error, I was able to figure out the secret sauce.  I've included full instructions in my [Readme file on Github](https://github.com/bengfarrell/node-sweatintotheweb/blob/master/README.md).  But, what I ended up doing, was taking the files from "C:/Program Files/OpenNI2/Redist and dropping them at the root of my module.  This included some DLL's, lib files, and more.  Basically you just need the libs and DLLs, though.  I also copied NiTE2.dll from my "C:/Program Files/Primesense/NiTE2/Redist/" folder to get the NiTE middleware working.

I also ended up changing the link paths and ditching one of the compile options on Windows.  While the "-Wl,-rpath ./" was the secret code to add to our Gyp file to make it build on Linux, this flag doesn't work at all on Windows - we'll just leave it in and Windows warns us and moves on.  It seems that all Windows needs is the correct path in the "-l" flag.  Linux needed a little love with those other extra options, but Windows performs like a champ with just -l./pathto/OpenNI.   So, in [my Gyp file](https://github.com/bengfarrell/node-sweatintotheweb/blob/master/src/binding.gyp), I just created some variables that are set depending on which OS you have, to point to the correct path.

Last step was compiling!  Don't use the normal DOS command prompt though - load up the Visual Studio SDK command prompt.  Navigate to the source of the project and do "node-gyp configure build".

Voila!  You've built an OpenNI/Node.js plugin - on Windows this time!

My source for this module is [here](https://github.com/bengfarrell/node-sweatintotheweb), and a simple usage [example](https://github.com/bengfarrell/node-sweatintotheweb-examples) (which I describe in depth on my first post) [is here](https://github.com/bengfarrell/node-sweatintotheweb-examples).

Good luck and happy gesturing!
