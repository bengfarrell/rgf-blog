---
title: "The ADSR Envelope with Audiolib.js"
date: "2011-12-17"
categories:
  - "development"
  - "html5"
  - "javascript"
  - "music"
  - "ui"
  - "web"
---

So, let's talk envelopes. First what they are, and what they can do to the quality of a sound.

Demo here: [/labs/examples/envelopes-12-17/](/labs/examples/envelopes-12-17/), but read on for how it all works!

An envelope is a real simple concept actually. Take any signal, like a sound. Maybe that sound plays at a constant volume. When you apply an "envelope" to that sound, you are changing the volume of that sound while it's played. It might go up and down, back up again, whatever.

How it goes up and down, and the speed at which the volume is changed is up to the details of the envelope used.

You could create an envelope that takes 8 hours to complete. Maybe you want to go to sleep with some music, and then wake up in the morning with music. If you know it takes you 30 minutes to fall asleep, you'll start the music playing at a loud volume. Over the next 30 minutes, you envelope your sound from loud to quiet, to off. In the morning, 30 minutes before you wake up, the envelope makes the music go from off, to quiet, to loud again. It wakes you up!

While this 8 hours illustrates how an envelope works, it's a bit different when talking musical tones.

It's not that different, however. We're still talking about volume over time, but we're talking milliseconds instead of hours or even minutes or seconds.

The character or personality of a musical tone can be changed greatly by altering the envelope. While we talk about this in terms of 1/1000th of a second, you don't really notice the volume changing as you listen to the tone. Your ear doesn't necessarily detect that the volume is going up and down.

Instead, the sound just has a different tonal quality! A piano for example wouldn't sound as sharp if it didn't go from no sound to loud that quickly. An accordion though, has a longer time as it goes from quiet to loud. And that quality - the "attack" (amongst other factors) create the personality of the tone.

Let's talk specifics now. ADSR.

That's **A**ttack, **D**ecay, **S**ustain, **R**elease. The ADSR envelope is just one type of envelope, but it's a popular one that's been used in electronic music for decades.

- Attack is the period of time after the initial release, it's typically the loudest part of the sound
- Decay is the phase while you're going from the attack to the sustain - you're "decaying"  the volume from this sharp initial phase to the normal volume phase
- Sustain is the normal phase of the sound.  It is typically less volume than the attack, and go on for an indefinite period of time, or for a specific amount of time
- Release is the draw down from the sustain period to no sound.  A fade out

![M4C_intro.ADSR](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2011/12/M4C_intro.ADSR_.png)
*the attack, decay, sustain, and release phases*

I've talked about [Audiolib.js](https://github.com/jussi-kalliokoski/audiolib.js/) in previous posts.  Audiolib is the Javascript library that enables you to make these dynamic sounds in Chrome and Firefox.

Audio programming isn't easy though!  So while Audiolib helps out in awesome ways, it doesn't have concepts of notes and music theory.  You have to tell it what frequencies to play, and if playing a chord, which individual frequencies make up the chord - [which I explored and created my own helpers for](/blog/2011/12/13/chords-and-arpeggiators-with-audiolib-js/ "Chords and Arpeggiators with Audiolib.js").

The ADSR envelope is another example of something that Audiolib.js [provides](https://github.com/jussi-kalliokoski/audiolib.js/blob/master/js/controls/adsr.js), however, it doesn't provide any obvious usage for it.

There's actually a VERY good reason for this.  While, we're talking about envelopes on musical tones, the 8 hour sleepy-time envelope is another good usage example.  And that's restricting envelopes to the volume of a sound.  There are tons more examples in audio synthesis that envelopes can be applied.  Like effects - you can apply a distortion effect to a sound (like a rock guitar).  But you can envelope the amount of distortion which is applied to the guitar.  This has nothing to do with volume, and everything to do with just how much of something is applied to something else.

So, I'd like to create a usage of our ADSR envelope that is limited to producing a musical tone - especially in the example of producing live sound by using a trigger (here it will be your computer/laptop keyboard).

Let's start with our previous example where we extend the Audiolib.js Oscillator via a plugin.  We extended it to simply take a musical notation, like an "A" and set the correct frequency:

`audioLib.generators('Note', function (sampleRate, notation, octave){ // extend Oscillator for ( var prop in audioLib.generators.Oscillator.prototype) { this[prop] = audioLib.generators.Oscillator.prototype[prop]; } // do constructor routine for Note and Oscillator var that = this;  // are we defining the octave separately? If so add it if (octave) { notation += octave; } that.frequency = Note.getFrequencyForNotation(notation); that.waveTable = new Float32Array(1); that.sampleRate = sampleRate; that.waveShapes = that.waveShapes.slice(0); }, {});`

So let's figure out how to work in an ADSR envelope. The usage for the Audiolib.js version is like so:

**myEnvelope = audioLib.ADSREnvelope(sampleRate, attack, decay, sustain, release, sustainTime, releaseTime);**

The parameters work like so:

1. Sample Rate:  The sample rate of the audio - I won't go into it here, as it's a basic setting for audiolib
2. attack - the amount of time (in milliseconds) that the attack phase takes to complete
3. decay - the amount of time (in milliseconds) that the decay phase takes to complete
4. sustain - the level of volume during the sustain phase (from 0 to 1)  - the default is 1
5. release - the amount of time it takes for the release phase to complete (in milliseconds)
6. sustainTime - the amount of time it takes for the sustain phase to complete (in milliseconds).  This param is pretty important though, because if you pass in null, the sustain period is indefinite.  Unless you call into the envelope with a trigger, it will continue being in the sustain phase forever
7. releaseTime - the amount of time between the release phase and the envelope looping around to the attack phase again

The envelope has 6 states of being (0-indexed inside the code):

1. Attack Phase
2. Decay Phase
3. Sustain Phase
4. Release Phase
5. Timed Sustain Phase
6. Timed Release Phase

To kick off our envelope, you trigger it:

**myEnvelope.triggerGate(true);**

Now we can start using our envelope.  The usage is a little weird to me, as the Audiolib.js library treats it like a "generator" which seems a bit complicated for what it does.  I just want a stream of numbers, but OK I'll bite.  I'll use it with the byte arrays and whatnot, as if it's an Oscillator.

**var buffer = new Float32Array(1);** **myEnvelope.append(buffer, 1);**

So, I'm just pulling one value at a time from the envelope, and putting it into my "buffer".  But my buffer only has one value in it at any time.  Like I said, I feel like I'm being forced into using it in more complicated of a way than I need!  Maybe there's something I'm missing.

Now, every time, I get create an audio data point in my sound, I can multiply the data point by my envelope.  Thus my envelope is applied!

**this\[this.waveShape\]() \* buffer\[0\];**

To do this, I overrode the "getMix" function in the Audiolib Oscillator.  But I needed to do other things too.

Since I trigger the envelope with triggerGate, it will cycle through the attack and release to the sustain phase as the envelope is used, automatically.

It gets complicated at the release phase though.  After your computer/laptop keyboard is released, we need to enter the release phase.  But we're still grabbing sound, because the release phase still produces sound as it fades.  So our Oscillator needs to track that it's in the release phase (it knows by keeping track of the envelope.state, which is 3 or 5 here for release or timed release).

Then finally when it gets back to state 0, or the cycle begins again, we mark this note as "released", so our buffer knows that it doesn't need to pull from it anymore.  We have to be very careful of note pulling from more notes than we need, cause all this music stuff is hard work, and too many notes slows down your CPU and breaks the audio processing.

The above is if the sustain phase goes on as long as you hold the key!  What if it's a timed sustain - then we need the logic in there to release the key when the envelope is done, rather than when our user releases the key.

Here's our final [Note.js code](/labs/examples/envelopes-12-17/js/generation/note.js).  And [here's a controller for keeping track of keys being pressed](/labs/examples/envelopes-12-17/js/controllers/keyboard.js).

It all comes together in my (Chrome only) demo:

[/labs/examples/envelopes-12-17/](/labs/examples/envelopes-12-17/)

The demo starts out by not using an envelope at all.  You'll hear some clicky-ness when you press and release a key.  That's because you're hearing the transition between no sound and the abrupt start in the phase of the waveform.  It's EXACTLY one of the reasons why envelopes are useful - to ease these transitions in and out.

When you turn on the envelope, you can start adjusting parameters to see how the different properties of attack, decay, sustain, and release affect the overall personality of the tone.
