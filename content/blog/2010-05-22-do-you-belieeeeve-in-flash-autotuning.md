---
title: "Do You Belieeeeve in Flash Autotuning"
date: "2010-05-22"
categories: 
  - "flashflex"
  - "music-video-games"
  - "projects"
---

No, I didn't accomplish the mythical Flash autotune in time for my "Audio Manipulation in Flash and Flex" presentation for NCDevCon this Sunday.  But I don't see why it's not possible in the least

I didn't accomplish it, not because of Flash, but because of my lack of digital audio experience.

About a month ago, I was thinking what effect I could dazzle my attendees with, and ONE thought popped into my head:  AUTOTUNE!!!  This led me down the rabbit hole of crazy amounts of math, signal processing theory, code optimization, and more.  I even started reading a free PDF 600 page book by Stephen Smith [http://www.dspguide.com/](http://www.dspguide.com/).

I've learned about what Fourier Transforms REALLY are, that they are really useful beyond getting frequency data, how to do low pass filters, and tons of other stuff.

I really didn't think it would be this involved.  This is like an entire field of expertise.  I honestly thought I could steal some algorithm online and be good to go.  Nope, I'm swimming with using the FFT, then back with an iFFT, convolving signals together, and all this crazy stuff.  It's pretty awesome though, the things you can do and learn from audio signals, and any signal in general.  I'll definitely be finishing that 600 page book (probably 3-4 times over so I understand it).

Anyway, I was able to accomplish pitch shifting in a couple different ways, and riding a voice on top of another tone (which sounds really close to autotune if you could just get rid of that damn tone!)

I didn't even think that one of the things that autotuning did was to detect the frequency of a sung note, and step it up or down to the correct frequency.  I thought at the beginning that when T-Pain did his thing, he just sung whatever, and the software would push the voice to whatever the producer wanted.

With Flash, I've seen the Audio Processing Library for Flash detect notes in a sound, and as I've said, I can now pitch shift!  In truth, the real Autotune by Antares Audio Technologies is said to use a "phase vocoder", which I'm still not up on my theory enough to know what it is.  It's probably a combination of smart pitch-shifting coupled with a flange like effect to go all robot sounding.

I finally downloaded 10.1 and got my microphone working - I recorded in from the microphone, and played back via the sound buffer (all through the sample data event).  I pitchshifted first by just speeding up the tempo so things got all high pitched and fast.  But then I grabbed a PitchShifting class by Stephan M. Bernsee  that was ported to Actionscript from C# by Arnaud Gatouillat.  Using this was VERY processor intensive.  In fact, in debug mode, my entire computer was overheating, and it was a crapshoot whether the sound would actually come out right.  And then of course the Windows sound buffer kept doing weird snapping/popping noises every so often until I restarted.  However, running as a release build seems to work just fine.  I now know why Andre Michelle's [AudioTool](http://www.audiotool.com) has a warning against using the debug player.

But all in all, it was a great learning experience.  I'm embedding the demo I'll be showing at [NCDevCo](http://www.ncdevcon.com)n on Sunday.  And of course I'll keep learning to become a DSP master, and someday get my Autotune working (hopefully someone beats me to it, and shares the code).

[Autotune Attempt - You Need Flash 10.1 and a Microphone](http://blastanova.com/labs/SadAttemptsAtAutoTune/RockTheMic.swf)
