---
title: "Live Instrumentation in Flash Part 5 - Voice Synthesis"
date: "2011-09-03"
categories:
  - "development"
  - "flashflex"
  - "flex"
  - "music"
  - "ui"
---

So far, we've discussed how to create tones, notes, and chords.  We've also gone into several different algorithms to change how a digital instrument sounds.  Changing how our digital instrument sounds is a lot more than simply changing the algorithm that defines your sound wave!  You may have noticed that given the several algorithms we covered in part 2 of this series, the sounds didn't change all that much.

What can we do to create some more variety?

**Attack, Decay, Sustain, Release**

In electronic synthesizers, there are the concepts of "attack", "decay", "sustain", and "release" (commonly abbreviated ADSR).  The easiest way to explain this is to imagine yourself hitting a key on a piano.

The moment you hit the key, the string is hit by the hammer by the piano.  This initially creates a loud tone.  The initial tone is much louder than anything that happens moments after.  This initial loudness is called the "attack".  As the initial loudness wears off, the sound draws down to the normal volume as you hold the piano key.  This drawdown is known as the "decay", and for the rest of the duration that you're holding the key is known as the sustain.

Once you release that piano key (on a real piano), there would be a small amount of sound coming out as the string is still vibrating.  This will eventually fade away - but this period is known as the "release" period.

![ADSR_inverted_parameter](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2011/09/ADSR_inverted_parameter.png)

**Envelopes**

Attack, Decay, Sustain, Release is a type of envelope.  At a basic level, an envelope is controls volume on a waveform as the cycles continue.  There are more types of envelopes, but the ADSR envelope is the most commonly known.

Some synthesizers break up the phases even more.  Consider the DAHDSR envelope.  This starts with a delay phase.  This is the phase before the attack - a phase where you don't hear any audio, or much at all, in the initial lead up to the loudness that is the attack phase.

Then comes the "hold" phase.  This is meant to prolong the time between the attack and release.  It keeps the volume high!

And then the rest continues with the decay, sustain, and release.

Different types of synthesizers take different envelope approaches.  Some even let you create your own - however it seems that the simple ADSR is the most common.

**Shortening the Sustain**

One thing I've found is that a sustain that keeps going and going and going while you press a key, sounds kind of unnatural.  It might be appropriate for something like a pipe organ, but if you're trying to replicate the percussiveness of a piano or a bass guitar pluck, you don't want something that goes on forever.

Keeping it short and sweet is the perfect key to making something sound natural!  I'm still experimenting with envelopes to try to accomplish this effect without just cutting off the waveform.  Overall though, I've found that limiting a sustain to a few hundred milliseconds is the perfect solution to making a more natural sounding instrument - especially if you want something percussive like a bass pluck or piano key.

**Harmonic Overtones and other Imperfections**

Imperfections in the note quality are a good way to make a computer generated note sound more natural.  Perhaps the tone could be off a couple steps in the frequency, however there are other ways!

One such way is to give a note a harmonic overtone.  Remember back in part 4 when we went into note relations?  We talked about octaves, where an octave higher will produce the same key/tone, but is at a higher pitch.  An octave higher or lower is in perfect harmony with the root note.

With harmonic overtones, we layer several octaves on top of the note.  This gives a more natural sound.  Many instruments in the real world will have the first 2 overtones be in perfect harmony.  In this regard, starting at middle A of 440hz, we'd have overtones of 880hz, 1320hz, and 1760hz.  All these notes playing at the same time to produce something more natural!

Another factor in real world instruments is that these overtones (especially the third and fourth) may not be exactly the same key in an octave, not in absolute harmony.  These higher overtones might be a little sharp or a little flat.  These nuances contribute to the instruments unique sound.  In fact, if you've ever seen the flare on the end of the trumpet, it's not to get more volume, but to correct the harmonic overtones to be closer to absolute harmony.

We can absolutely replicate this in our digital instruments!  We can mix harmonic overtones together when playing a single note, and even make variations to avoid absolute harmony and give our instruments some character.

**Filters, Modulations, and more**

We've only scratched the surface of creating new and exciting voices for our instruments.  We can pass our tone through a filter, do frequency modulation, and more.  I'm still exploring, so this is best left for another time!
