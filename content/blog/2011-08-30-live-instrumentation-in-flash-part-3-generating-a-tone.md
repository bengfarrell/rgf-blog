---
title: "Live Instrumentation in Flash Part 3 - Generating a Tone"
date: "2011-08-30"
categories:
  - "flash"
  - "flashflex"
  - "flex"
  - "music"
  - "ui"
  - "web"
---

**Basic Sine Wave Generation**

OK!  Lets step into the wayback machine and go back to part 1 of this series.  We were talking about building audio samples with a byte array

`var bytes:ByteArray = new ByteArray(); for (var c:int = 0; c < 8192; c++) { bytes.readFloat(number); bytes.readFloat(number); }`

I never DID tell you guys what goes in number, did I?

Well, that's where we can start making something listenable (and not the white noise we made before).

Lets make some changes:

`for(var c:int = 0; c < durationinseconds*44100; c++) { var number:Number = Math.sin(c * 2*Math.PI/44100 * 440); bytes.readFloat(number); bytes.readFloat(number); }`

OK, so what's going on here? We've introduced, first of all, "durationinseconds". We multiply by 44100. Since there are 44,100 samples per second, all we need to do is multiply by the number of seconds we want to produce, and generate that many samples.

Next up is to generate a sine wave. Why a sine wave? Well, think about your high school algebra class. There are all sorts of mathematic equations, and you can graph any of them. Most basic is a simple line.

![linear](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2011/08/linear1.jpg)
*a line - it starts infinitely low, and ends infinitely high, never repeating*

The problem with a line, is that it keeps going up and up and up and up. That's really not what we want here. What we want is something that goes high, comes back down, goes up again, and can do that forever.

We COULD utilize a little programming, and make a line, but at a set high point, reset and make it start at the low point again.

![sawtooth](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2011/08/sawtooth.jpg)
*a line that cycles from going up and up, but resetting at 0 again*

This is actually a good way to produce a sound, but lets talk sine waves for now.

The sine function to produce wave cycles is fantastic. The line can go up and down all day as you continually increment, but not only that, it's curvy! So it goes up and down in a very smooth way.

![sinwave](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2011/08/sinwave.jpg)
*Goes up and down repeatedly (forever) and is curvy*

The thing about sine waves is that since they repeat themselves, they can ALSO be measured like a circle - in degrees. If you go 360 degrees, you're right back where you started from. The bummer about trigonometry though, is that everything is measured in radians.

So 360 actually is equal to 2 Pi. 180 is Pi, and 90 is Pi/2. So above, we took 2 Pi and divided by 44100. We're basically making a baseline here and saying that one full revolution through a sine wave is equivalent to one second. We multiply this by our iterator (c), to make the individual samples for each data point.

This would actually produce a SUPER low tone (I doubt you'd be able to hear it). I'm going to go ahead and ALSO multiply by 440 to produce something listenable.

**Frequency and Amplitude**

So let's talk about what we did when we multiplied by 440. The effect we had was to take that super low tone (the one that takes a whole second to go a complete cycle) and make it go 440 cycles in one second.

How often something cycles is known as frequency. And that's the thing about frequency in sound. If the frequency is too low, that is it doesn't cycle fast enough, our brain doesn't put together that its a repeating pattern, and it can't latch on to the fact that its an audible tone. If too high, our ears can't actually discern the signals either.

440 cycles is pretty much smack in the middle of what we are comfortable hearing. There's a LITTLE more to this, and I'll tell you more in part 4.

Anyway, all those cycles going so fast come together sounding like one tone. The more cycles per second, the higher the tone.

When you've heard about frequency, you've also heard about amplitude. In terms of audio, amplitude is just volume. It's pretty easy. If you want a volume that's 1/4 as loud, just multiply that "number" variable by .25 (OK I'm lying, volume is actually logarithmic, but I don't feel like getting into that whole thing right now).

[Here's a nice little demo to allow you to play around with frequency and amplitude on a sin wave.](/labs/examples/sinwavedemo/ "Sine Wave Demo")

**Different Types of Cycles**

Like we discussed, sine waves are curvy... When we generate the tone, its sounds nice (if not a little whiny). There are other ways to go. I eluded to this before (with the line that we keep resetting in a cycle). You can make things sound edgy too! Like you could make a square wave. I'm going to start giving examples now, and copy over some of what I have in the Flashamaphone project.

First of all though, lets simplify things and pop a bunch of math into a phase variable, like so:

`var phase = c * 2*Math.PI/44100 * 440;`

There! Now we don't have to write all that stuff out each time. So let's revisit how to do a sine wave:

`// loop number = Math.sin(phase); // end loop`

![sinwave](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2011/08/sinwave.jpg)
*Goes up and down repeatedly (forever) and is curvy*

Next, lets try a square wave

`// loop number = Math.floor(Math.sin(phase)); // end loop`

![squarewave](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2011/08/squarewave.jpg)

It sounds very 8-bit and harsh.

At this point, I can start making up my own terminology - and I came up with a stepped wave. It's half-way between harsh and smooth, between a sine wave and a square wave.

`// loop number = Math.floor(Math.sin(phase)*4)/8 - Math.floor(Math.cos(phase)*4)/8; // end loop`

![steppedsinewave](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2011/08/steppedsinewave.jpg)

I have more!

A Step wave? `// loop number = Math.floor(Math.sin(phase)) - Math.floor(Math.cos(phase)); // end loop`

![stepwave](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2011/08/stepwave.jpg)

Shark fin? `// loop number = Math.cos(phase) - Math.floor(Math.sin(phase)); // end loop`

![sharkfin](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2011/08/sharkfin.jpg)

Saw tooth? `// loop number = phase - Math.floor(phase); // end loop`

![sawtooth](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2011/08/sawtooth.jpg)
*a line that cycles from going up and up, but resetting at 0 again*

Saw Sine? `// loop number = Math.sin(phase) - Math.floor(Math.sin(phase)); // end loop`

![sawsine](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2011/08/sawsine.jpg)

[To listen to these examples, check out this demo!](/labs/examples/wavefactories/)

That's all I have in the Flashamaphone project.  We'll see soon in part 5 of this series that there is much more to producing different types of sound than just the math to generate the cycle.  First though, jump on over to part 4, and we'll talk music theory!
