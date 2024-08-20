---
title: "Using Pixel Bender to Process Lots of Data"
date: "2010-03-24"
tags:
  - "as3"
  - "bytearray"
  - "flash"
  - "flex"
  - "pixel-bender"
  - "sound"
---

In my previous post, I talked about using Pixel Bender in the way it was intended.  By this, I mean to input an image, change the pixels in some way, and output an image.  As you might be aware, this can happen very quickly and be used to create some great run time visual effects in Flash and Flex.

What piqued MY interest in PxB though, was the fact that the you didn't have to send it an image to process.  It could be any ByteArray object.  My interest was a little bit more specific - a ByteArray extracted from a flash.media.Sound object.  At 44,100 samples per second, with typical MP3 files being 180-200 seconds, we're talking about pushing 10 million samples.

My project involves visualizing the waveform of a song, so I want to process all of these samples at once, and as quickly as I can.

So, lets look at how you would normally apply a PxB shader.  The following [example is taken from Mike Chamber's blog](http://www.mikechambers.com/blog/2008/09/08/using-pixel-bender-filters-within-flex/):

```
import flash.filters.*;
import flash.utils.ByteArray;

//the file that contains the binary bytes of the PixelBender filter
[Embed("testfilter.pbj", mimeType="application/octet-stream")]
private var TestFilter:Class;

private function onApplicationComplete():void {
//Pass the loaded filter to the Shader as a ByteArray
var shader:Shader = new Shader(new TestFilter() as ByteArray);
shader.data.amount.value = [100];
var filter:ShaderFilter = new ShaderFilter(shader);

//add the filter to the image
im.filters = [filter];
}
```

So, Mike's got the right idea here. He creates a shader, makes a shader filter out of it, and then applies it as a filter to the image.

We're going to be doing something slightly different. Instead of a ShaderFilter, we'll be creating a ShaderJob. And we'll also need to tell our ShaderJob certain things that our ShaderFilter knew automatically. Specifically, we're talking about the height, width, and input source of the image. After setting these properties you add an event listener to the job, and tell it to start.

```
var output:ByteArray = new ByteArray();
data.position = 0;

var channels:int = 4;
var width:int = 2000;
var height:int = data.length / width / (channels*channels);

shader.data.src.width = width;
shader.data.src.height = height;
shader.data.src.input = data;

var shaderJob:ShaderJob = new ShaderJob(shader, output, width, height);
shaderJob.addEventListener(Event.COMPLETE, onComplete, false, 0, true);
shaderJob.start();
```

OK, I'll back up...it's a lot to start with. Let's talk about the input data first - our byte array.  Because I'm talking specifically here about a byte array extracted from sound, I know that my byte array is a long list of 4 byte floating point numbers.  This particular list of numbers alternate from left channel to right channel, but that's neither here nor there until we get into the Pixel Bender kernel.

So, now we're talking the language of Pixel Bender - a byte array of 4 byte floats.  Now, we're typically we're dealing with 4 of these 4 byte floats (formerly known as red, green, blue, and alpha).  I believe that PxB is SUPPOSED to accept image1, image2, image3, or image4 type inputs, however I've read there are bugs associated with doing anything less than image3 as the input.  Even if we wanted to take advantage of an image2 - think about it.  PxB is designed to process a pixel as fast as it can,  Why not take advantage and create the largest pixel we can?  Little decisions like this multiply in big ways when you start talking about your entire data set, and you could be talking about saving hundreds of milliseconds for these little decisions.

So, each pixel is 16 bytes.  In my sample code, I'm calling out 4 "channels".  This is an important variable when thinking about our height and width.

Let's talk a little about height and width now.  As you know, an image has a height and width.  But how does this apply to a one dimensional list of items for PxB?

It all comes down to speed and optimization.  You could certainly give your data input a height of 1 and a width of 8192 (the height and width limit) and treat your data as a one-dimensional list.  It's certainly easier to picture that way, but then you wouldn't be taking advantage of PxB's built in speed and optimization.

Pixel Bender is multi-threaded, multi-core, and GPU enabled.  While that last part doesn't hold true for Flash, the first two parts are important.  Not only can PxB itself operate on a different thread and CPU core, so can each row of data.  So, PxB can be processing many rows of pixels all at the same time.  If you only do one row per job (a height of 1), you're throwing away most of the speed benefits of Pixel Bender!  The data itself will wrap around to the next row, just like a text field wraps text to the next row.

How does you know what width and height to give your data?  Well, with a possible width and height of 8,192, you're giving yourself a possible 67 million pixels to work with in one job.  Each one of these pixels holds 4 channels.  Which means, in one job you can process 268 million floating point numbers.

![pxb](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2010/03/pxb1.jpg)

Earlier I had talked about each MP3 file being around 10 million samples.  I'm personally conducting my own speed tests, but I've found that processing 60 seconds of an MP3 file at a time is a little better overall for speed.  So we're only talking about 2.5 million samples that I would personally process at a time.  So, now the question becomes: How can we reasonably distribute our data as an image.  Well, if we max out our width, we may not be producing many rows.  As  a result, speed may be reduced because we're not utilizing multiple threads as efficiently as we could.  Based on my input data, I've found that a width of 2000 works well for me based on the specifics of my application.  Your mileage may vary, so feel free to try different things.  Just remember, you'll want to take advantage of many rows for PxB optimization.

And then of course, to get the height, you can work that out by calculating this from your width and the overall length of your byte array.

After all has been said and done, you start the job, set the event listener and wait for the job to complete.

Next up, I'll be posting some speed tests!
