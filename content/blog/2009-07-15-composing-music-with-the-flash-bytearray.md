---
title: "Composing Music with the Flash ByteArray"
date: "2009-07-15"
categories:
  - "flashflex"
  - "music-video-games"
---

[Demo here, view source for code](http://www.yellow5labs.com/lab/composingdemo/SongComposer.html "Song Composer Demo")

(view source for code, and who knows what bugs there are)

I'm getting into unfamiliar territory these days with exploring sound in Flash.

Flash 10 gives you the ability to take a sound object, and extract the entire thing into the raw data....a byte array.  How do you interpret this data? How can you process it into something meaningful?  Well I don't know.

What I do know is that to get a firmer grasp on how I can utilize this, I need to understand what the sound object is at a basic level.  Probably the worst way to understand it is to take an entire song (mp3) file and let my eyes glaze over at the stream of numbers coming from the sound.extract feature.

No - the best way, I thought, would be to compose my own notes and chords, and work up from there.  To do this, I needed to understand what a note is, and what a sound is at a basic level.

My first thought was to picture sound as the nifty looking sound visualization that comes with music players these days...you know, those dancing bars:

![equalizer](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2009/07/eq1_inline.jpg)

Turns out that this is the worst way to imagine sound for this purpose.  My first question was...."OK, how do I get the value of the low frequency?", "how about something in the midrange?", "what about the highend?".

Yes you can imagine sound this way, but only after processing your sound data with a Fourier Transform.  If you know how to do this, stop reading this right now, cause you're way smarter than I am at this point in my sound exploration.

The BEST way to imagine sound is to picture a sine wave:

![sine wave](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2009/07/sinewave.gif)

If you look at how tall the wave is, that is how loud the sound is, or the amplitude.   How close the peaks and valleys are in this picture is the frequency.

Frequency, at this very basic level can't be thought of as high pitched, low pitched, etc - it's only how far apart these peaks and valleys are.  Now think of this as a side-scrolling wave that goes on forever.  If you were to scroll at a constant speed, each peak would hit that vertical center line at a constant rate.  This rate would be the frequency.  If it goes faster, the frequency is higher - slower, the frequency is lower.  And, of course, this directly relates to how you hear it.  The more peaks and valleys at a given time, the higher the tone you hear.

Now think about how this relates to our Flash sound object's byte array.  We could actually draw a sine wave with numbers.  This is nothing new to programmers.  Folks use trigonometry all the time.  But, I personally, never thought to use it for sound.

Try this AS3 code:

for (var i:int=0; i < 100; i++ ) { var sample:Number; sample = Math.sin(i \* 2 \* Math.PI) \* 50; }

This will basically plot a picture like the one above - a sinewave.

If we made this into a sound, it almost, but not quite be a tone.  However, if we pop over to google, we can actually look up the frequency, of say.....a middle C note, or a middle A.

[http://www.phy.mtu.edu/~suits/notefreqs.html](http://www.phy.mtu.edu/~suits/notefreqs.html)

There's one more piece to this puzzle though, and that's sampling rate.  A digital audio file could have all the sinewaves, peaks and valleys in the world, but if your audio playback is super slow, it's gonna sound like garbage.  That's why we tell our audio software to read our sound at a certain speed.

If you've heard the term 44.1 kbps when folks talk about sample rate - you can look back at our little for loop that drew the sine wave, and realize that you need more than the 100 points of data as we drew, you need 44.1k, or 44,100 PER SECOND.

So let's rewrite that code:

for (var i:int=0; i < durationinseconds \* 44100; i++ ) { var sample:Number; sample = Math.sin((i) \* 2\*Math.PI/44100 \* 440) \* volume; }

OK!  So now, we're creating a one second middle A (4th octave).  Our sample rate in Flash is always going to be 44100 if coming from a flash sound object (though that's not true for any audio file).  We learned from our handy/note frequency chart when looking on google that 440hz is a middle A.

As a side note, lets say we want a different octave.  To go lower, half the frequency to get 220.  To go lower, half that.  Higher?  Double it.

Let's think about the voice now.  The nice sine wave will give a nice, round tone.  For a dirtier tone that sounds like it has sharp edges....well our sine wave needs to have sharp edges - which is actually a square wave.  Our nice round peaks and valleys would be just straight corners.

To change the tone in the code, try this:

sample = Math.sin((i) \* 44100 \* 2 \* Math.PI \* frequency) > 0 ? volume : -volume;

As for more voices, well, I haven't tried it, but a real world instrument would have a hard strike and then some falloff.  So our nice sine wave would be less round at the start of each peak, but comes back down way slower.

Here's my final code (and keep in mind that I'm writing the sample 2 times, one for the left channel and one for the right):

returnBytes:ByteArray = new ByteArray(); for (var i:int=0; i < \_duration \* 44100; i++ ) { var sample:Number; if (\_voice==VOICE\_SQUARE) { sample = Math.sin((i) \* 44100 \* 2 \* Math.PI \* this.frequency) > 0 ? \_amplitude : -\_amplitude; } else { sample = Math.sin((i) \* 44100 \* 2 \* Math.PI \* this.frequency) \* \_amplitude; } returnBytes.writeFloat(sample); returnBytes.writeFloat(sample); }

Now, what do we do with that byte array?  Well, as of Flash 10, our sound object, has a sample data event.  When this event is called, when it needs new bytes, it'll call out to your custom sample data method.

What I do - and what you may choose to do, or not choose to do, is make my whole byte array first, and then read sequential amounts of data into the byte array each time it's called:

soundBytes.position = 0; dynamicSound = new Sound(); dynamicSound.addEventListener(SampleDataEvent.SAMPLE\_DATA, addSoundBytesToSound, false, 0, true); soundchannel = dynamicSound.play();

private function addSoundBytesToSound(event:SampleDataEvent):void { var bytes:ByteArray = new ByteArray(); soundBytes.readBytes(bytes, 0, Math.min(soundBytes.bytesAvailable, 8 \* 8192)); event.data.writeBytes(bytes, 0, bytes.length); }

To explain, about the 8 \* 8192....

8192 is the maximum amount of samples you can use for each sample data event.  However....each sample is a left and a right 4 byte float.  So that's 8.....time 8192.

There's tons of cool stuff you can do with this.  If you don't believe me, look up Andre Michelle - he's THE MAN when it comes to this stuff.
