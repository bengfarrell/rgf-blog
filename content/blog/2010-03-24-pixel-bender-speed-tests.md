---
title: "Pixel Bender Speed Tests"
date: "2010-03-24"
---

This is my last in a series of blog posts on Pixel Bender.  I'll probably be doing one more PxB post when I upgrade to Swiz 1.0 and we're talking about PxB processors with Swiz, but until then....

This post will be focusing mostly on speed in Pixel Bender and doing similar operations in normal Actionscript.

Pixel Bender is good on speed, pixel by pixel, but there are some operations that make PxB a little less efficient.  In my tests - these efficiency deficiencies are made worse with specific operations.

The worst is when you sample the nearest pixel.  In PxB, sampling one pixel is fine.  But the more pixels you sample as you evaluate one pixel, the worse this problem is exasperated.

Why sample more than one pixel?  Well, a blur effect is a great example.  When you blur, you're probably averaging the center pixel and the 8 surrounding pixels.  Or downsampling an image...you'd be sampling a whole mess of surrounding pixels and reducing to 1 pixel.  In my audio visualization application, I'm not reasonably going to view 2.5 million pixels.  No, I'm going to reduce down to something that can be displayed - maybe a few thousand, depending on how far I zoom.

In any of these scenarios, I'm sampling more than one pixel.  The more pixels I sample, the worse the performance gets.  In my experiments, it can get to the point where PxB is no better than just doing things in Actionscript.  In these cases, at least Pixel Bender has the whole multi-threaded feature going for it, so your UI performance won't suffer.

Another horrible aspect of sampling more than one pixel is that PxB for Flash doesn't support loops and functions.  So, if your kernel needs to sample 100 neighboring pixels, you have to write the 100 lines of code to go with it.

For audio processing, sampling surrounding pixels is the whole point.  The key is finding the right amount of pixels to sample where you get a good average, but still have your Pixel Bender shader running lean and mean.

With that said here's a sample application which demos performing math operations in Pixel Bender vs performing the same operation in Actionscript 3.

[Pixel Bender Speed Test Application](http://blastanova.com/labs/pxbspeedtests/bin-release/PixelBenderSpeedTest.html)

Keep in mind that we keep all the loading of the MP3, and the extraction of the byte array at the very start of the application.  These actually take a fairly long time (almost a full second to extract the audio), but are a necessary evil whether you use Pixel Bender or you don't use Pixel Bender.  Lets look at the results:

**Simple Copy Operation**

Take data, and return the same data (but make sure to copy each and every value to a byte array one at a time)

Flash AS3: 1.715 seconds

PxB: 0.475 seconds

**Power of 2 Operation (Square a Value)**

Take each value, square it, and copy into a new byte array

Flash AS3: 2.81 seconds

PxB: 0.825 seconds

**Multiply by 12.54 (a random number I picked for this test case)**

Multiply each number by a value and copy to a new byte array

Flash AS3: 1.747 seconds

PxB: 0.495 seconds

**Do a Complex Math Operation**

Take each value, multiply by 12.54, divide by 100, take the sin of that, and then take the square root of the result.

Flash As3: 3.53 seconds

PxB: 0.713 seconds

**Average 10, 20, 50, and 100 values**

This is where Pixel Bender should start getting less effective, as we are sampling more and more surrounding pixels.

Average 10 - Flash AS3: 3.727 seconds

Average 10 - PxB: 0.878 seconds

Average 20 - Flash AS3: 3.954 seconds

Average 20 - PxB: 1.153 seconds

Average 50 - Flash AS3: 3.613 seconds

Average 50 - PxB: 2.047 seconds

Average 100 - Flash AS3: 3.636 seconds

Average 100 - PxB: 3.469 seconds

As you can see, Pixel Bender does VERY well until you start sampling more and more neighbors.  As we reach 100 neighboring pixels sampled,  there really is no speed advantage to Pixel Bender.  Fortunately though, we're still talking about an operation on a different thread that won't slow down the UI.  So even if it does take 3 and a half seconds, its 3 and a half seconds of time that our UI is as snappy as ever.

Remember before when I talked about extracting your audio?  Well, you don't have to grab 60 seconds all at once and lock up your UI for a full second.  You could grab less, and process the audio in increments.  With PxB, you can just keep running shader job after shader job.  You'll have to determine what's best for your UI vs how fast you want the operation to complete.

Another thing that I've hidden (though I didn't mean to)  in this demo application is the time it takes to create the Shader.  I've found that it takes around one second to create a Shader.  This means that before you utilize a Pixel Bender kernel, you must take 1 second of unresponsive UI time to have a shader be created.  Creating a ShaderJob, on the other hand takes about a millisecond.  This means that you could spend 1 additional second at the beginning of your application to initialize the shader.  That's one second of time that you didn't have to spend running your AS3 only code.  However, the more ShaderJobs you have to split up the work, the more this 1 second becomes a moot point.

An additional note of interest is the shaderJob.start method.  By default, the parameter you pass in here is "false".  This boolean indicates whether to "waitForCompletion".  If you don't wait for completion, then you are using this event asynchronously - meaning you assign an event complete listener and wait for the operation to complete while your code does other things.  If you specify the "waitForCompletion" flag as true, then all Flash operations will halt until  your shader job finishes, and you don't have to set an event complete listener because the next line of your AS3 code will just execute after the job completes.  I've read that this can give you a slight speed increase, but I haven't had this experience.  Plus it will lock up your Flash code execution until it completes, meaning your UI will be unresponsive.

And that completes my series of posts on Pixel Bender for now.  Kevin Goldsmith at Adobe has been doing some pretty cool stuff as well.  He does audio processing live, or rather each time Flash reaches into the audio buffer to get the next sound samples.  So he actually uses Pixel Bender to alter audio AS YOU PLAY IT.  So that's very cool, [check it out here](http://blogs.adobe.com/kevin.goldsmith/2009/08/pixel_bender_au.html).

There is much more to this Pixel Bender stuff.  Find it online, and especially read up on the [Pixel Bender Twiiter](http://twitter.com/pixelbender) account.  For now though, I'm done.  Happy Bending!
