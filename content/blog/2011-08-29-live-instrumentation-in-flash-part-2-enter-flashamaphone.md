---
title: "Live Instrumentation in Flash Part 2 - Enter Flashamaphone"
date: "2011-08-29"
categories: 
  - "development"
  - "flash"
  - "flashflex"
  - "flex"
  - "music"
  - "web"
---

As I said in part 1 of this Live Instrumentation series, working with byte arrays can be hard, and take some getting used to.  I still stand by the statement that you shouldn't be afraid though!  One of the best ways to get cracking is to get your hands on an existing project and start changing stuff.  See what works and what doesn't work.

I don't know of too many projects that deal with audio generation.  Probably the best one out there is called Tonfall ([http://code.google.com/p/tonfall/](http://code.google.com/p/tonfall/)).  Tonfall brands itself as a Tiny AS3 Audio Framework.  It has lots of cool stuff to get you going playing with audio.  What I didn't like about it for my purposes was the learning curve, especially if you don't know much about audio already.  They have some cool demos - but when I was getting started in this stuff, the first thing that popped into my mind was a piano keyboard.  With Tonfall, I didn't see a way to easily play a specific note like an A sharp.  Instead, I'd have to know the frequency of the note.

So that's where I went when I started up my own project called Flashamaphone!  I wanted a way to easily make notes and chords and play them live.  I wanted a way to get started if you only new a tiny bit of Flex/AS3 and a tiny bit of music knowledge (only knowing your way around piano keys a bit).

Lets rehash a little bit of what we already covered as it relates to Flashamaphone.  First off, I've included the concept of a buffer in Flashamaphone.  Currently there are two types of audio buffers in the project

**Recorded Buffer**

This is the simplest of the buffers.  Its only does a few things.  You can add bytes to the buffer with "addToBuffer", you can get the buffer bytes with "get buffer", clear the buffer with "clearBuffer", or activate or pull from a controller.  We'll get into the controller in a bit....

So what you end up with here, is basically an audio file in memory that you can write to and read from.  Pretty simple!

**Live Buffer**

The live buffer is a little bit more complicated, but same concepts.  You can add bytes to the buffer, but that's not really the point here.  The real point is to pull from a controller (wait one more second for that explanation!).  The real mechanical stuff going on here is a sound object with a sample data event.  Every time the audi0 buffer reaches out and needs more data, we'll pull a certain number of samples from our controller.  If a controller doesn't exist, we'll pull it from a queue of audio bytes.

Pulling data when we need it (and only when we need it), means that we are creating a sort of live audio playback scenario.

**Keyboard Controller**

So far, there's just one type of controller in the Flashamaphone project.  Its the keyboard controller.  The keyboard controller allows you to "press" a key and "release".  With each press and release, you pass in the tone or note that you're pressing.  In the end, all this controller does is keep track of what keys are currently being pressed, and what keys are in a "released" mode as the sound fades away after it's been released.

Now, when we attach a controller to the buffer (whether live or recorded), the buffer can pull from the controller.  The act of pulling from the controller means that the buffer will ask for the bytes of a specific number of samples from the controller.  If the "A", "D", and "D#" keys are pressed on the controller, the controller will send back a mix of those bytes.  The buffer doesn't care what keys are pressed, it just wants whatever the bytes are.

**You've been Caught Up**

Right, so you've been caught up on the "engine" behind Flashamaphone.  That's all it really is behind the scenes.  A couple buffers and a controller.  It's not very fun to just push bytes back and forth, but it needed to be done to get to the real cool stuff.  Next we'll be making some actual recognizable tones!

First, let me hit you with a Flex code sample of our white noise using the keycontroller and live buffer using Flashamaphone:

The code above simply creates both a live buffer and a keyboard controller. It assigns the live buffer to the keyboard controller. Now, all we need to figure out is how to send some actual notes to our keyboard controller, and not just white noise!
