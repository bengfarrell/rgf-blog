---
title: "Intro to Pixel Bender"
date: "2010-03-24"
categories:
  - "flashflex"
  - "music-video-games"
tags:
  - "flash"
  - "flex"
  - "image"
  - "pixel-bender"
---

So this is my intro to using Pixel Bender - if you don't know what it is or why to use it check out the documentation or my [first post](http://www.blastanova.com/blog/2010/03/19/pixel-bending-for-speed-in-flash-and-flex/).

Actually the documentation is a good place to start.  Go to [http://www.adobe.com/devnet/pixelbender/](http://www.adobe.com/devnet/pixelbender/) before you begin.  Go on....I'll wait...

Once there you'll want to download the Pixel Bender Toolkit.  It's a simple and light program - not subject to the lengthy installs of other Adobe software.  Don't bother downloading the PDF documentation, there are links in the help menu to these documents once you run the toolkit.

The best part of the documentation - which actually turns into the most depressing part once you learn it, is that you ignore around half of it if you're developing Flash shaders.  Most of the more advanced functionality only applies to Photoshop and After Effects shaders.

So crack open the toolkit!  What to do now?  Well first, go to the file menu and choose "new kernel".  Kernels are basically the "programs" you're creating that compile to shaders.  A new kernel will look like this:

```
kernel NewFilter
<   namespace : "Your Namespace";     vendor : "Your Vendor";     version : 1;     description : "your description"; >
{
    input image4 src;
    output pixel4 dst;

    void
    evaluatePixel()
    {
        dst = sampleNearest(src,outCoord());
    }
}
```

Don't worry about that top part - it's just noting the author of the script.

So the first thing to worry about are the two variables at the top. There's "image4 src" and "pixel4 dst". You might guess that you're defining a source image and a destination image. But what's up with the funny syntax?

Well, first of all, Pixel Bender is one of those languages where the data type is in front of the variable. So you have a variable "src" of type image4, and a variable "dst" of type pixel4. Image and pixel datatypes might make sense, but the "4" is what threw me off at first, but don't worry it makes sense.

PxB mainly deals in floating point numbers. And no automatic type conversion! Doing float var = 2 is no good, but doing float var = 2.0 is OK. There are basically 4 types of floating point numbers: float, float2, float3, and float4. A float4 is basically an array of 4 floating point numbers. Example: float4 myfloat = float4(2.0, 2.0, 2.0, 2.0);

It only goes up to 4. Once you realize that the main point of PxB is to manipulate pixels, you being to see why. Red + Blue + Green + Alpha = 4 channels and an array of 4 floating point numbers.

I've found that I can use pixels and floats interchangeably (maybe I'm wrong). Images are reserved for an entire image comprised of pixel 4's/float 4's. Pixel Bender also supports integers and booleans (each with 4 or less values).

OK that was my rant on variables. Lets move onto "evaluatePixels". This is THE method that everything PxB revolves around. In fact, in Flash, you can't even create other methods in your kernel (PS and AE allow this though).

Every PxB kernel is designed to do one thing and one thing only. Take in a source image, go pixel by pixel, and create an output image pixel by pixel from the "evaluatePixels" method.

That's easy enough to understand - but what about that wonky syntax they start you off with?

dst = sampleNearest(src,outCoord());

So, lets work from the inner to the outer. Starting with outCoord(). This method gets the current coordinates that pixel bender is analyzing at that moment. Hint: it's a float2, containing both X and Y values.

That was the easy part - the hard part is "sampleNearest()". For us Flash folks, this introduces you to the wholly confusing notion of sampling on half pixels and pixel ratios and other such nonsense. But then you realize that its Flash, and all pixels are square, and sampling a pixel samples the entirety of the pixel. At this point you realize that sampleNearest is just how PxB works - but it's entirely unnecessary for Flash.

So in other image editing software (and apparently this holds true especially for video), pixels don't have to be square. Pixels can have a different height and width, giving them an aspect ratio, which you can actually check for in PxB. ![pxbworldcoordinate](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2010/03/pxbworldcoordinate.jpg)

But then there's PxB...it will scan each pixel in the image as IF THEY WERE square. So you end up with coordinates that could be x:4.56, y:1.567. When you do "sampleNearest", you're sampling the nearest pixel to these fractional values to end up with nice locked-in PxB world coordinates like x:4, y:2. You can also call "sampleLinear" which takes the average of the surrounding pixels when you ask for something on a half pixel.

Betcha feel smart now, don't you? Well forget everything you just learned. If you are doing things in Flash, all pixels are square, and all pixels match to the PxB world coordinate system perfectly. So "sampleNearest" is just something you have to do to get the red, green, blue, and alpha values of the pixel.

So - in the end...you're just taking the pixel you've come to, evaluating the 4 channels, and dumping those right back into the destination pixels. In other words, you're doing nothing.

At this point though, it becomes easy to start manipulating an image. Go to the file menu again, and load an image. PxB has some sample ones to use, like this one:

![Untitled-1](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2010/03/Untitled-1.jpg)

Now change dst = sampleNearest(src,outCoord()); to:

dst = sampleNearest(src,outCoord()) \* float4(0.25, 1.0, 1.0, 1.0);

Now click "run"

![reducered](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2010/03/reducered.jpg)

Congratulations! You just went into every pixel and turned the red down to 25%.

How bout a weird cross-hatch type effect?

dst = sampleNearest(src,outCoord()) \* float4(sin(outCoord()\[0\] \* 4.0), cos(outCoord()\[1\] \* 4.0), sin(outCoord()\[0\] \* 4.0), 1.0);

![crosshatch](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2010/03/crosshatch.jpg)

Play around, try different things. If you break anything, Pixel Bender will give you red error messages of varying usefulness on the right side.

The hardest thing to get used to is always typing numbers with decimals and usually performing operations not with one set of numbers but with a set of 4. If you run into any trouble, keep asking yourself these two questions:

1. Am I performing a mathematical operation on two different data types?  Float2 \* Float4 = Error!
2. Am I performing a mathematical operation on a float using a number with no "point zero" on the end?  Float \* 2 = Error!  Float \* 2.0 = Good!

So that's the basics of PxB!  You can manipulate surrounding pixels if you like by performing operations on surrounding pixels.  Just add or subtract X and/or Y to your outCoord(), and sample that pixel.  Combine and average surrounding pixels to get a blur effect for example.

Here's an example of taking a big image, and downsampling the image to a tiny corner in the upper left of the destination:

```
        float4 colorAccumulator = float4(0.0,0.0,0.0,0.0);
        float4 avg;
        colorAccumulator += sampleNearest(src, outCoord() * float2(9.0, 9.0) + float2(-1.0, -1.0));
        colorAccumulator += sampleNearest(src, outCoord() * float2(9.0, 9.0) + float2(0.0, -1.0));
        colorAccumulator += sampleNearest(src, outCoord() * float2(9.0, 9.0) + float2(1.0, -1.0));
        colorAccumulator += sampleNearest(src, outCoord() * float2(9.0, 9.0) + float2(-1.0, 0.0));
        colorAccumulator += sampleNearest(src, outCoord() * float2(9.0, 9.0));
        colorAccumulator += sampleNearest(src, outCoord() * float2(9.0, 9.0) + float2(1.0, 0.0));
        colorAccumulator += sampleNearest(src, outCoord() * float2(9.0, 9.0) + float2(-1.0, 1.0));
        colorAccumulator += sampleNearest(src, outCoord() * float2(9.0, 9.0) + float2(0.0, 1.0));
        colorAccumulator += sampleNearest(src, outCoord() * float2(9.0, 9.0) + float2(1.0, 1.0));

        dst = colorAccumulator/9.0;
```

My next post will be about taking Pixel Bender and using it for non-image data processing. Stay tuned!
