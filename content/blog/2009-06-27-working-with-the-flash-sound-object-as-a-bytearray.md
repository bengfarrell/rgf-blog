---
title: "Working with the Flash Sound Object as a ByteArray"
date: "2009-06-27"
categories: 
  - "flashflex"
---

Last year I was experimenting quite a bit with Flash's computeSpectrum functionality.   With computeSpectrum, I could take a snapshot of a playing sound and get volumes for various frequencies of the snapshot so I can visualize the sound.

Now, I wanted to take it a step further and visualize the sound before it's even played.  Of course doing this with computeSpectrum is impossible because the sound has to be played first.

Luckily, in Flash Player 10, Adobe introduced sound.extract();  This can take the sound object and turn it into a byteArray.  I came across [an example by Thibault Imbert](http://www.bytearray.org/?p=329 "an example by Thibault Imbert") and of course the example worked very well to visualize a sound spectrum from a byte array - though I still wasn't sure what each byte represented in the Flash Sound object.  And even though, the spectrum looked OK,  a comment from Schell explained that this is a false waveform and to look at his [blog post](http://blog.efnx.com/plotting-a-sound-wave-in-flash-as3/ "http://blog.efnx.com/plotting-a-sound-wave-in-flash-as3/").

The blog post provides some great working code - but there was quite a bit I didn't understand yet.

So, I attacked the problem from another angle today.  I thought - OK, I don't really understand the bytes that are coming OUT of the sound object, but maybe if I play with shoving bytes INTO a sound object to create dynamic sounds, I can get a better handle on tings.

The real struggle came because I used [Christopher Martin-Sperry's code](http://audiofx.org "http://audiofx.org") to create a sound object from the raw byte array provided by an MP3 file.  I used this before really looking into how all this stuff works.  The code works fantastically - but put my brain on the wrong track.

I was on the wrong track because MP3's and Flash's sound Object work a wee bit differently from each other.  In an MP3 file, there is a header to give some info about the file.  Also, the MP3 file is broken into "frames".  Each frame has a header to give information about the frame (bitrate and other things).

This doesn't map so well to Flash's sound object.  First of all, the bitrate of a Flash sound object looks like it doesn't vary.  It seems to be 44.1 kilobytes per second all the time.  And it's always in stereo.  It looks like the source of the audio will always get upconverted or downconverted to this 44.1KBps stereo format.

Not only that, but there's no concept of frames.  I thought I'd need to know how to read a frame header, or at least know how long each frame is to know what type of data I'm getting.

But that doesn't appear to be the case.  The byteArray extracted from a sound object appears to be an alternating left/right channel stream.

How does the stream relate to time? I felt a little dumb when I figured this one out - because it's a little obvious.  It generated a few tones before having this little gem of an epiphany.

Well, if the Flash sound object is 44.1KBps, that's 44,100 bytes per second.  So when reading the stream, we read 44,100 bytes before a second is up. Right?

Well, not so right it would seem.  You have to consider both channels.  You'd read each channel 44,100 times to make up a second, making one second 88,200....something.

What is that something?  Well my computer sciece teaching has failed me, but I can speculate.  Adobe provides a morse code [generation sample](http://www.adobe.com/devnet/flash/articles/dynamic_sound_generation/ "http://www.adobe.com/devnet/flash/articles/dynamic_sound_generation/") on their developer network.

In it, there is a comment when they are writing the samples to the sound stream that they are writing 8192 samples to the stream.  However, the length of the byte array they are actually writing is 8192 x 8, explaining that each sample is two 4-byte floating point numbers.

So perhaps when reading floats with ByteArray.readFloat, you're actually reading both left and right floats from the same byte.  If I'm right, then you're still using 44,100 bytes per second, but each byte represents two floating point numbers.

However, it works out, I've noticed that when creating six 1 second tones, by writing two floats at a time, 44,100 times,  it clocks in at 6 seconds.  So infer whatever you wish from that - I know I have.

My next step is to figure out how to pull frequency data at a particular point in time.
