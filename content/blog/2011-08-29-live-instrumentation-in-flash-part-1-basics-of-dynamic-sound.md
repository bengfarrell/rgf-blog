---
title: "Live Instrumentation in Flash Part 1 - Basics of Dynamic Sound"
date: "2011-08-29"
categories:
  - "development"
  - "flash"
  - "flashflex"
  - "flex"
  - "music"
---

Lets start with the basics.  We need to create sound from thin air and write that sound somewhere so we can hear it.  This could be live as you press a button, or into a file so you can play it later.

 

**Don't Be Afraid of the Byte Array!**

In Flash, or most platforms in fact, there are a lot of different data types.  You have integers, floats, strings, etc.  I can make a sentence by putting strings together, and I can make an array by putting various types of data together.  A byte array is like an array, but it's a long concatenation of binary data.

Unfortunately byteArrays are hard to debug! You can't really just trace stuff out to your console like with a string, since it's not in a readable format anymore.

How do you make binary data?  Well it's easy with the Flash APIs.  You can read a string into a byte array - or more appropriate to us for sound: copy and paste bytes into a byte array or read a floating point number into a byte array.

When specifically talking about creating sound, we'll mostly be dealing with reading floats into a byte array many times over in a loop.

For example, if you wanted to create a 4 second sound, there is some math to figure out.  Lets start with a loop:

`var bytes:ByteArray = new ByteArray(); for (var c:int = 0; c < len; c++) { bytes.writeFloat(number); }`

So what is "len"? How many times should we iterate and add floats into our byte array? Well typically, we're dealing with 44,100 samples per second. That means for every second of audio we're using 44,100 data points if you picture our sound like a line graph.

Our code snippet becomes:

`var bytes:ByteArray = new ByteArray(); for (var c:int = 0; c < 4 * 44100; c++) { bytes.writeFloat(number); }`

One more thing, though. The code above assumes mono, or one channel sound. If we want stereo sound, we need to do this loop twice over. Unless you're trying to accomplish different effects on the left and right side, it's usually fair to say that the float you read in each loop iteration will be the same number. This is why you'll usually see the readFloat line repeated instead of the iteration count going up to 88,200:

`var bytes:ByteArray = new ByteArray(); for (var c:int = 0; c < 4 * 44100; c++) { bytes.writeFloat(number); bytes.writeFloat(number); }`

What "number" are we writing? Well....thats where the magic happens, and is a bit more complicated. Don't worry, we'll get to that later.

**Writing File Output** Having a byte array in memory is all well and good, but how can we use this. In terms of audio, we can dump it to a file, or play it live.

Dumping to a file is pretty easy if you find a good encoder. MP3 is compact, but processor intensive. It's also kinda hard to figure out if you're starting from scratch. Long story short, you're writing chunks of data (frames) and giving each frame a header describing the contents of each data frame. You're also compacting the data somehow. It's a little beyond me, which is why if I ever need to do it, I'd grab a fast, ready made library like Shine ([http://code.google.com/p/flash-kikko/](http://code.google.com/p/flash-kikko/)). Shine is made in Alchemy - which means someone wrote it in C++ and compiled the library to a Flash SWC file. Doing it this way can result in much faster number crunching!

But, I like to be a little more basic - and write to a WAV file. WAV files are a format that contains raw audio data. For the most part we can take our generated audio data, and write it as is! Just dump all those bytes into a file!

Unfortunately, even writing audio to a WAV format takes some know how. You need to construct a file header which includes the number of channels, sampling rate, and a whole bunch of other things. Once all that stuff gets written to the file, you can just dump your actual audio data.

I'm not a WAV file format scholar, or do I really even understand whats going on in the header. This is why I'm using the WAV audio encoder from the Tonfall project by Andre Michelle ([http://code.google.com/p/tonfall/](http://code.google.com/p/tonfall/)).

Here's an example of writing to a file on my desktop with AIR, but passing it through Tonfall's WAV encoder first.

`var we:WAVEncoder = new WAVEncoder(WAV16BitStereo44Khz.INSTANCE); we.write32BitStereo44KHz(myaudiobytes.bytes, myaudiobytes.bytes.length/8); var file:File = File.desktopDirectory.resolvePath("output/song.wav"); var stream:FileStream = new FileStream(); stream.open(file, FileMode.WRITE); stream.writeBytes(we.bytes); stream.close();`

Did you notice the line where we're passing myaudiobytes.bytes.length/8? Well this parameter is how many "samples" we're passing. It leads to an important fun fact. A floating point number is 4 bytes. If we're talking a mono file, a sample would be one floating point number or the 4 bytes.

Since we're talking about a STEREO file, it's 4 times 2, or 8 bytes. So to figure out how many stereo samples are in a byte array, we'd just take the length of the array and divide by 8.

What if we wanted to know how many SECONDS of audio are in our byte array? Well, first we'd find the number of samples, but then divide THAT by the sample rate (44,100 samples per second).

**Live Playback with an Audio Buffer**

I'm glad we talked about dumping stuff into a file first, because basically using an audio buffer is just like that, but you do it in smaller chunks.

To get the ball rolling, what you'd do is start up a blank sound in Flash. Usually you give it a source to play, but not here! Here, just a blank sound. Next, add an event listener to the sound "SAMPLE\_DATA". Whenever the audio buffer runs out of stuff to play, it will fire off the sample data event. Your code will pick up the event and run a function. Ideally, in this function, you'd be putting stuff into the audio buffer.

After adding the callback, play the sound to get things started:

`sound = new Sound(); sound.addEventListener(SampleDataEvent.SAMPLE_DATA, onSampleData, false, 0, true); sound.play();`

What does our callback method look like? Well, for the most part, its what we discussed when popping stuff into a file. Just in smaller chunks.

`function onSampleData(event):void { var bytes:ByteArray = new ByteArray(); for (var c:int = 0; c < 8192; c++) { bytes.writeFloat(number); bytes.writeFloat(number); } event.data.writeBytes(bytes); }`

OK, so there's not much difference here! We're iterating over the same type of loop - writing stereo audio. We're writing 8192 samples though. This IS a magic number. It's the upper limit of what Flash allows you to write in the buffer. The lower limit is 2048. Now, why use one or the other (or in-between).

So, if you use the lower limit of 2048, audio will be sampled more frequently. It will tax your processor more often - and it might not be able to keep up properly. This means that when you listen to the audio being generated there may be some clicks or pops in your headphones as audio drops out and comes back in.

If you use the maximum limit of 8192, your processor is hit less often - and when it is hit, it can almost always handle the sample data generation. So thats good! Problem is that all this data, all 8192 samples represent a good quarter of a second or so of audio. This means that your audio could be lagging by a quarter of a second. I don't mean that audio won't play back smoothly. What I DO mean is that if you press a button, it could take you 1/4 of a second to hear the result of that button press. This is a little slow to make something like a virtual piano that feels reactive!

At the very end though, you're writing to the event.data byte array. In fact, you don't even have to generate your own sound. You could just be reading slowly from a byte array of a raw audio file you already read in. In fact, you could run some mathematical filter on it, and alter the values. Folks have done this before by loading an MP3 file into the sound object, using sound.extract to load it into a byte array, and THEN dropping every other sample as it gets sent to the buffer to do something like increasing the speed by 2x.

**White Noise** I told you we'd get into what the number value is when we read the float into the byte array. That time is not yet - it'll come in part 3. However, lets just put some random values in there!

`function onSampleData(event):void { var bytes:ByteArray = new ByteArray(); for (var c:int = 0; c < 8192; c++) { var number:Number = Math.random(); bytes.writeFloat(number); bytes.writeFloat(number); } event.data.writeBytes(bytes); }`

By adding random values, we've just added random samples....at no real discernable frequency. This means there's tons of noise, but no way to hear one strong tone from the noise. It results in white noise - like TV snow, or waves at the beach.

Let's take a peek at what this looks like when we visualize it:

![whitenoise](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2011/08/whitenoise.jpg)

*2024 Update: Boo! Flash doesn't work anymore on the web. Sorry for the empty link!*

[And lets listen to what it sounds like (Flash Example)](/labs/examples/whitenoise/)
