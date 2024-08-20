---
title: "Making an Audiolib.js Plugin"
date: "2011-12-05"
categories: 
  - "development"
  - "html5"
  - "javascript"
  - "music"
  - "ui"
  - "web"
---

I just started checking out [Audiolib.js](https://github.com/jussi-kalliokoski/audiolib.js/) this weekend.  Audiolib is a Javascript project to help you synthesize sounds and tones in JS.

Just recently, Google Chrome added the Web Audio API, while Firefox added the Audio Data API.  Both let you get low level with sound - you can add bytes to an audio buffer and manufacture sound in realtime.

The library is bundled with "sink.js" which handles the inconsistencies in the audio API between Firefox and Chrome to create a common API.  Once this is abstracted away, we can make some audio.

I've done the nitty gritty of writing bytes to the buffer in Flash, and from my limited playing Audiolib does a great job with this, and I'm ecstatic I don't have to rewrite my Flash stuff!

Audiolib provides "generators" for you to work with.  A "generator" is something that makes a sound, and defines a common API for anything that makes a noise to write that sound to the audio buffer.

In the generators namespace/package, we have an Oscillator, White/Pink/Brown Noise, and a Sampler.  White noise is cool and all, but I jumped right to the Oscillator to make a real tone.  The Oscillator takes a sample rate and a frequency.

You can define it thusly: `dev = audioLib.AudioDevice(audioCallback /* callback for the buffer fills */, 2 /* channelCount */); osc = audioLib.Oscillator(dev.sampleRate /* sampleRate */, 440 /* frequency */);`

So, first we defined the device to use - we told it what to use for the audio callback, and how many channels there are (we have 2 channels...left and right).

The audio callback is a pretty standard thing in the world of audio. When the sound card is starting to run out of audio to play, it signals Javascript and says "Hey I need more audio! Fill me up with some bytes". With our "audioCallback" function, we say "No problem sound card! I got your back! When you run low, please call our audio callback method - this will fill your audio buffer up"

Here's an example of the audio callback: `function audioCallback(buffer, channelCount){ osc.append(buffer, channelCount); }`

All that happens here, is that the buffer and channel count gets passed into the method, and we tell out Oscillator what this is, and this Oscillator generates the appropriate bytes and send them to the buffer.

But what is that generator...the Oscillator? Well, it creates a sound at a certain frequency. We pass in the frequency as we instantiate this "osc" object. When the audioCallback fires, it pulls this frequency from the osc object and plays a specific tone!

This is awesome! All the hard work is done for us - but one of the first things I wanted to tackle here was to make it easier for musicians to understand.

See, casual musicians don't know that a middle "A" on a piano oscillates at 440hz - they just know that they hit a middle "A" to play the tone. I want something that makes sense for casual musicians, so my first small task with audiolib is to override Oscillator to take a notation vs a frequency.

Audiolib provides a plugin spec, but it tripped me up a little to understand how a "Generator" worked. See, they have a js/generation folder which contains the Oscillator. It's all quite readable and self-documented.

However, the "append" method was not found in the Oscillator class at all! I was looking EVERYWHERE for it!

Eventually I found it in the "wrapper-end.js" script that's outside of all the folders.

Basically, you create a generator like Oscillator, and you write it to the audiolib.generators namespace. By virtue of being in this namespace, the "wrapper-end" script comes along to wrap things up. It takes all the things in the audiolib.generators namespace and adds the generator base functions. Basically it makes all the generators extend the generator base class after the fact.

Kinda confusing and sneaky if you ask me! Oh well.

Regardless, the plugins are well documented, so I copied the sample generator plugin:

`audioLib.generators('SemiClock', function (sampleRate){ this.sampleRate = sampleRate; }, { prevSample: 0.0, generate: function(sample){ this.phase = + !this.phase; }, getMix: function(){ return this.phase; }, phase: 0 });`

Cool, so we're naming a generator in the generator namespace, and defining some required methods, like "generate" and "getMix".

Well, all I want to do is make a copy of all the objects in Oscillator and add a function and initialization routine to accept a musical notation and instantiate an oscillator with the correct frequency.

So here's my take: `audioLib.generators('Note', function (sampleRate, notation, octave){ // extend Oscillator for ( var prop in audioLib.generators.Oscillator.prototype) { this[prop] = audioLib.generators.Oscillator.prototype[prop]; }  // do constructor routine for Note and Oscillator var self = this; self.octave = isNaN(octave) ? 4 : octave; self.setNotation(notation); self.waveTable = new Float32Array(1); self.sampleRate = sampleRate; self.waveShapes = self.waveShapes.slice(0); }, { /* incremental tones as sharp notation */ sharpNotations: ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"],  /* incremental tones as flat notation */ flatNotations: ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"],  /** * notation setter * @param notation (octave is optional) */ setNotation: function(nt) { this.notation = nt;  // does notation include the octave? if ( !isNaN( parseInt(nt.charAt(nt.length -1)) )) { this.octave = parseInt(nt.charAt(nt.length -1)); this.notation = nt.substr(0, nt.length-2); } this.frequency = this._getFrequencyForNotation(this.notation); },  /** * turn a notation into a frequency * @param notation * @return frequency */ _getFrequencyForNotation: function(nt) { var freq; var indx = this.sharpNotations.indexOf(nt);  if (indx == -1) { indx = this.flatNotations.indexOf(nt); }  if (indx != -1) { indx += (this.octave-4) * this.sharpNotations.length; freq = 440 * (Math.pow(2, indx/12)); } return freq; } });  `

Basically what I did here is extended the Oscillator class. I looped through all the properties of the Oscillator.prototype object and copying it onto the new class.

I then, went in to the Oscillator generator and copied the small initialization routine.

Then I injected my own methods! I replaced the frequency setting with a method to lookup the index of the musical notation in my preset arrays of notations. I also parsed out the octave (if it existed).

In the end, I have a "Note" class which is exactly the same as the Oscillator class - however, instead of passing in the frequency (ie 440hz), you pass in "A", or "A4" for the 4th octave.

To change the notation of the oscillator/note, simply call the setNotation again!

I'm definitely looking forward to exploring Audiolib.js more. It has a few concepts that I hadn't gotten around to implementing in my own Flash framework yet, so I'm excited to see how it's done.
