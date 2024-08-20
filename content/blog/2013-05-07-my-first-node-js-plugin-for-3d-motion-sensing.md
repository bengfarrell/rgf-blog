---
title: "My first Node.js plugin for 3D motion sensing"
date: "2013-05-07"
categories: 
  - "c"
  - "development"
  - "html5"
  - "javascript"
  - "kinect"
  - "nodejs"
  - "nui"
  - "ui"
  - "web"
---

Well that's a little bit of an awkward title - its not ONLY my first Node.js plugin I've released on NPM but it ALSO does 3D motion sensing! So brand new on both counts - I'm no Node.js plugin/addon veteran by any means!

You can grab my NuiMotion project version 0.1 on [NPM](https://npmjs.org/package/nuimotion) and [Github](https://github.com/bengfarrell/nuimotion). You can read why I did it, and about how I'm on a crusade for letting your interfaces move your body on the [project page](http://www.sweatintotheweb.com/nuimotion-for-node-js/).

That said, I learned a lot of stuff. I think the project serves as a shining example of how one guy accomplished some rather difficult and not so ordinary things you'd need to do with Node.js. I won't claim it's necessarily the right way - just one way. I was a little scared of C++ before all of this, but I jumped in because I had a need that I wanted to fill, and C++ was the only way to get it done.

The C++/Javascript bridge is pretty cool to see how it works. There are all sorts of problems you run into with type conversion - your C++ variables to those loose Javascript variables.

The hugest hurdle was breaking down the architecture to something that wouldn't block the entire Node.js main process. In all of the OpenNI examples, they would run a big old while loop that will grab frames of video/depth and pull out the features we need like gestures and skeleton data.

This is SO not cool for Node.js, so I needed to delve into how to achieve threading in the V8 engine with "lib\_uv". I still don't understand everything about the final lib\_uv code I used (why some things are declared as they are), but I successfully broke it out into a new thread that runs as fast as your machine will let it. We reach in and grab our joints using a custom defined interval to poll at, and we event out when gestures and other events are encountered.

Of course, all of this NEEDS to be threadsafe. If you access the wrong thing inside a thread, you crash your entire process.

You can checkout the main logic of all of this, completely with C++/JS communication and threading here:

[https://github.com/bengfarrell/nuimotion/blob/master/src/Main.cpp](https://github.com/bengfarrell/nuimotion/blob/master/src/Main.cpp)

I didn't do this alone, either. I asked a couple questions to the extremely awesome Node.js Google Groups. One was around the threads question, and the other was around C++ compiling. To demonstrate how much of a noob I was, my compiling question was that I didn't realize you had to include ALL your \*.cpp files in your sources target. I thought since the main.cpp references other things, they would be automatically included. NOPE! Live and learn.

Anyway - I'm of the opinion that this project probably represents some of the most difficult things you could ever need to know how to do in a Node.js addon (without getting into domain specific C++ code which could be infinitely complex for sure). So feel free to have a gander and learn!
