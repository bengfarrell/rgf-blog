---
title: "The Upright Spass - A Javascript Instrument in Thin Air"
date: "2013-02-20"
categories:
  - "c"
  - "development"
  - "html5"
  - "kinect"
  - "music"
  - "nodejs"
  - "ui"
  - "web"
tags:
  - "html"
  - "javascript"
  - "kinect"
  - "nodejs"
  - "openni"
coverImage: "performance.png"
---

Well, well, well....

All my talk of OpenNI, C++, NodeJS, etc in recent months was pretty much all boring until you put it into practice and make something cool.

I did just that....well, I think it's cool.  And just plain weird, really.  Here's a motion controlled instrument I made that's Javascript through and through.  It's Node.js at the heart, with a HTML/Javascript display.  And yah - I snuck in some C++ to wrap the ever awesome [OpenNI SDK](http://www.openni.org/).

I present to you....the "Upright Spass":

I've played around several months ago with the Kinect SDK playing a keyboard in thin air.  What I was playing with then was Windows only, Kinect only, and need Adobe AIR to route things to websockets for the browser.

So using my new found powers over the past few months with:

- OpenNI/NiTE
- My Asus Xtion Pro Live depth camera
- C++ Addons in NodeJS

....I now have a nice little [handtracking utility](https://github.com/bengfarrell/node-sweatintotheweb) that runs in Node.js using OpenNI and NiTE to power my skeleton tracking.

I didn't care for the horizontal layout of my old virtual piano - so I inverted the axis, and made the instrument control upright.  Hence - "Upright Spass"....the anti-bass, the bass that is not a bass, just empty space.

What was also crazy hard was producing decent sound with Javascript.  I don't care what language you do this in, creating sounds from scratch is hard.  You could go years studying and tweaking new sounds to match what already exists in the world.

So to solve this?  MIDI.  Hell yes, MIDI!  I found a nice robust [Node.js MIDI addon](https://npmjs.org/package/midi).  So instead of making my own sounds banks, I send it out over my [E-MU MIDI USB](http://www.amazon.com/EMU-XMIDI-1X1-MIDI-Interface/dp/B000JLU26W/ref=sr_1_3?s=musical-instruments&ie=UTF8&qid=1361337149&sr=1-3&keywords=e-mu) controller to my Korg X3 keyboard

![x3](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2013/02/x3.jpg)

 

And wow....the site I grabbed this image from is calling this keyboard (made in 1993) "vintage".  I feel old, damn.

Anyway - I'm running Ubuntu for this whole operation, so to route the MIDI from Node.js to my keyboard, I used [Jack](http://jackaudio.org/).  Jack offers you a nice little audio server.  You can patch in your MIDI through out to the E-MU MIDI USB device in.  Voila, start make the link and start the Jack server.

So, I got this motion controlled midi thing all rigged up, and it's REALLY hard to play.  There were  a few problems:

1. Playing straight notes with 2 hands in an unfamiliar environment can lead to disharmony.  Seriously, on top of being hard to play, it's way too easy to play the wrong notes.  So, I restricted the instrument space to only be able to play notes in a certain key signature.  I randomly chose A# Minor.
2. The coordinates of your 3D world will vary based on where you stand and where the camera is positioned.  So, on top of sending the hand coordinates from my Node.js AddOn, I also sent the torso position.  That way, all the hand positions can be calculated outward from the center of your body - and your vertical instrument is always in your center.  Muscle memory is a major factor in learning to play an instrument, and you can't learn to play if your instrument keeps shifting around on you.  Ideally, I should get the user's height and make calculations on where the instrument notes are from there as well, but I haven't done so yet.
3. No feedback in thin air.  Yah....that's a problem.  Usually with an instrument, you have tactile feedback to tell you how you are playing it - but lacking that, I went with visual feedback.  I rigged up an HTML/Javascript page.  The page listened for hand positions events over websockets from Node.js.  It offers the user feedback on where their hands are in relation to the instrument - in the center of the screen and the center of your body.

Even after solving a few of these problems, the Upright Spass is really hard to play.  My performance was pretty much a disaster - but maybe I can tweak and practice and get passable at it.

My code for this is up on github.   I mentioned the link for my Node.js AddOn previously - that's here:

[https://github.com/bengfarrell/node-sweatintotheweb](https://github.com/bengfarrell/node-sweatintotheweb)

and this particular project, the Upright Spass, is here:

[https://github.com/bengfarrell/uprightSpass](https://github.com/bengfarrell/uprightSpass)
