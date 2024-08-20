---
title: "Live Instrumentation in Flash"
date: "2011-08-29"
categories:
  - "development"
  - "flash"
  - "flashflex"
  - "flex"
  - "music"
  - "ui"
  - "web"
---

This post covers another topic that I'll be covering at NCDevCon ([http://ncdevcon.com/](http://ncdevcon.com/)). Like my last post, I'm giving a general outline of series of points I'll be covering in both the presentation and the blog post and filling them in with links as I progress.

Live Instrumentation is a topic I'm an amateur in, but is terribly interesting to me. It makes me remember back in the 80's playing with synthesizers as a kid, and tweaking knobs to make different sounds. That is, until they got complicated and I sorta gave up. Also, samplers came along and made things a little less relevant.

Anyway - my Live Instrumentation series will cover how to create sounds dynamically in Flash. We'll explore how these sounds can be made into musical notes, chords, compositions, etc. We'll also explore some synthesizer basics - that is making our notes have different voices, or different sound qualities.

 

**[Basics of Dynamic Sound in Flash](/blog/2011/08/29/live-instrumentation-in-flash-part-1-basics-of-dynamic-sound/ "Live Instrumentation in Flash Part 1 – Basics of Dynamic Sound")**

- Creating byte arrays
- Writing file output
- Live buffer with Sample Data Event
- Generating White noise

**[The Flashamaphone Project](/blog/2011/08/29/live-instrumentation-in-flash-part-2-enter-flashamaphone/ "Live Instrumentation in Flash Part 2 – Enter Flashamaphone")**

- Live/Recorded Buffer
- Keyboard Controller

**[Generating a Tone](/blog/2011/08/30/live-instrumentation-in-flash-part-3-generating-a-tone/ "Live Instrumentation in Flash Part 3 – Generating a Tone")**

- Basic Sine Wave Generation
- Altering frequency and amplitude
- Some Different types of waves (stepped, sawtooth, square, sharkfin)

**[Turning a Tone into a Note](/blog/2011/09/01/live-instrumentation-in-flash-part-4-a-little-music-theory/ "Live Instrumentation in Flash Part 4 – A Little Music Theory")**

- Brief history of notes in man made instruments, settling on standard
- Relation of notes and octaves
- Chord structures, how Western music is different from others
- triads, 7ths, 9ths, major, minor, etc

**[Voice Synthesis](/blog/2011/09/03/live-instrumentation-in-flash-voice-synthesis/ "Live Instrumentation in Flash – Voice Synthesis")**

- Attack, Decay, Sustain, Release
- Shortening the sustain for sharper notes
- Enveloping
- Harmonic Overtones
- Frequency Modulation

**[Demos](/blog/2011/09/15/live-instrumentation-in-flash-part-6-some-demos/ "Live Instrumentation in Flash Part 6 – Some Demos")**

- [AS3 Particle Node Sequencer](http://blog.soulwire.co.uk/laboratory/flash/as3-tonfall-particle-node-sequencer)
- [ARP O Matic](http://plan8.se/work/the-arp-o-matic/)
- [Theramin with Tonfall](/labs/examples/tonfall/DemoTheremin.html)
- Image/Pixel translation with Flashamaphone (sorry it's in AIR, not on the web)
- [Tone Matrix with Tonfall](/labs/examples/tonfall/DemoToneMatrix.html)
- [Mobile piano with Flashamaphone](/labs/examples/impro)

**[Beyond Flash](/blog/2011/09/04/live-instrumentation-in-flash-part-7-beyond-flash/ "Live Instrumentation in Flash Part 7 – Beyond Flash")**

- Web Audio API in HTML
- iOS audio
