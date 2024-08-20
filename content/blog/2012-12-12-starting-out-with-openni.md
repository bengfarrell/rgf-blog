---
title: "Starting out with OpenNI"
date: "2012-12-12"
categories:
  - "development"
  - "kinect"
---

I've been digging on the Kinect for a little while now.  I first started toying around with it last year, and gave a presentation at [NCDevCon](http://ncdevcon.com/) on using it with the web stack.  [Here's my write-up and slides](/blog/2012/09/28/sweatin-to-the-web-nui-presentation-at-ncdevcon/) from it

It's been a few months - and unfortunately I haven't seen anything from [Kinesis.io](http://kinesis.io/).  I was really pulling for them to pull off this AMAZING Kinect/Web integration and sell it.  I would buy it like 10x over!  I ended up doing demos using [KinectJS](http://kinect.childnodes.com/).

Now, KinectJS is pretty amazing itself, but it has a few dependencies that I'm not so much OK with.  It requires Adobe AIR - which is almost OK.  I used to do some AIR development and it's a pretty slick tech.  Unfortunately, they stopped support for Linux, which I tend to use now if I'm working on web pages.  It also requires Windows.  See previous comment.  It also uses the Microsoft Kinect SDK, which while amazing, again...requires Windows.

My problems basically boil down to several layers of tech, of which NONE are cross-platform.  So there's really just no hope there for anything to come up my way, really.  I don't mind Windows, I really don't.  I even have Windows 8, and despite what they tell you, it's a nice OS.  I'd just prefer not to be locked in, especially with web technology, which I REALLLLLLY want to use with the Kinect and show all my friends who use Mac or Windows.

Anyway, that's where OpenNI comes in.  It's LIKE the Kinect SDK, but it's cross platform.  OpenNI is actually a non-profit founded by a few companies including PrimeSense.  Primesense is the original inventor of the Kinect and SDK which later got sold to Microsoft.

Main takeaway - I'm RUNNING IT RIGHT NOW ON UBUNTU!  Can't you just feel my excitement?  You can see OSX, Ubuntu, and Windows downloads all on OpenNI's [download page](http://openni.org/Downloads/OpenNIModules.aspx).  I initially had some trouble getting Linux to work.  I was using the Mint distribution before, and it looked like some of the graphics libraries weren't quite up to par with what OpenNI needed.

To get everything working, I followed the [instructions from this webpage](http://igorbarbosa.com/articles/how-to-install-kin-in-linux-mint-12-ubuntu/) on Ubuntu.  Oddly, they do mention it works in Mint...guess they are just smarter than I, or more likely, I just didn't find these great instructions before I decided to switch to Ubuntu (probably both).  Main takeaway is to use the "Unstable" downloads of the OpenNI binaries, the sensor drivers, and NITE.  This applies to you Mac folks as well - you can't even access the downloads unless you choose "Unstable" - don't worry, it seems to work great.  The main OpenNI binaries are like the heart of OpenNI, NITE is the middleware - the brain that reads and interprets the data, and the sensor drivers....well they are hardware drivers.

Once you've installed all of this stuff, go on in to the OpenNI->Samples->Bin-x64-Release and crack open "NiViewer".  You'll see a yellow depth view to one side and a RGB camera view on the other side and some info down below.

![sampleviewer](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2012/12/sampleviewer.png)
*NI Viewer Application*

Now, hopefully you have Java installed or this won't work.  Double points if you have the JDK (that's Java Developers Kit) installed instead of the JRE (Java Runtime Engine).  Because, while this will work on the JRE, we can't hack/code our own without the JDK.

But we also need an IDE!  Or at least I do.  I barely know Java, so I'm not going to be editing with a text editor and compiling with command line utilities.  A lot of folks will go for Eclipse.  I don't blame you, it's popular.  I've been actually digging [JetBrains Intellij Community Edition](http://www.jetbrains.com/idea/download/) (community edition is free!)

It was actually pretty simple from here on in, once I worked out the quirks.  In Intellij, I imported the entire OpenNI->Samples folder as an existing project.  Originally, I had tried importing each sample individually, but there were a fair amount of syntax errors and unknown references from messed up paths - so importing the whole thing was way easier.

The first experiment I tried was running SimpleViewer.java.  If you open to Samples->SimpleViewer.java->org->OpenNI->Samples->SimpleViewer,  make the SimpleViewerApplication.java run.  You may get a runtime error - I did.  Mine was caused by the "node configuration" file.  Basically, this configuration file tells you which "Production Nodes" are running.  Right now, I just understand that there is a depth camera node and an RGB camera node.  There are probably much more.

Anyway,  the SimpleViewer.java class has a private var (Line 45) which says that the config is here: "../../Config/SamplesConfig.xml".  For me, it wasn't - it was at "Config/SamplesConfig.xml".  So that fixed my issue, and then running the sample produced a nice, fancy depth mapped video feed.

![depth](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2012/12/depth.png)

 

So, I thought that was pretty cool!  That's just the depth camera - there's also the RGB camera on the Kinect.  Both cameras are accessible PRETTY much the same way.  The depth camera is driven by the "DepthGenerator" object, while the RGB camera is driven by the ImageGenerator object.  Then, there is a whole MESS of issues which involve reading a different number of bytes per pixel if you're posting a greyscale pixel or a RGB pixel - hint....each color is another 8 bytes.

In the end, getting the color image to work involved some research and stealing from the web... again I'm not a Java expert.  I'll post a final Gist after I do some more magic, but here's my RGB video feed working:

![rgb](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2012/12/rgb.png)

 

Now, the depth camera is mildly interesting.  It's not something you see everyday.  And despite the RGB camera being tricky because of bytes and such things, it's definitely a "meh".

What if though, I could combine the depth sensing data WITH the RGB live video feed????  Awesomeness, I tell you!

So I went in to the spot where I create each pixel, and said - "Hey you pixel, if the depth data in the EXACT SAME spot is greater than 1600, then you will just be red."  Basically here's my block of code:

```
         while(depth.remaining() > 0)
            {
                int pos = depth.position();
                short pixel = depth.get();
                if (pixel > 1600) {
                    pixel = 0;
                    img.get(); img.get(); img.get();
                    clrbytes[pos*3 + 0] = 127;
                    clrbytes[pos*3 + 1] = 0;
                    clrbytes[pos*3 + 2] = 0;
                } else {
                    clrbytes[pos*3 + 0] = img.get();
                    clrbytes[pos*3 + 1] = img.get();
                    clrbytes[pos*3 + 2] = img.get();
                }
            }
```

So this leads to a situation where anything close enough up to the camera has full RGB pixels.   Anything far enough away is reduced to a red, flat background - like so:

![backgroundreplace](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2012/12/backgroundreplace.png)

Obviously not perfect, but hey I'm just learning and feeling it out.  One MAJOR problem I had early on was that my outline was bigger and kinda distorted from the shape of my body.  It turned out to be a pretty obvious thing that you'd never think of.  The problem is that both the RGB camera and the depth camera are in two different physical locations on the Kinect hardware.  So you have 2 completely different perspectives of the image you're trying to capture.

I'm going to use a word at the start of the next sentence, and I'm not exaggerating.  MAGICALLY, you can transpose the depth data to the perspective of your RGB camera.  If you think about it, the depth data is an array of geo,metric points.  So OpenNI (or the Kinect, I'm not sure) can shift those mathematically to the perspective of the RGB camera.  It, of course, doesn't work the other way around (transposing RGB pixels to the perspective of the depth data).  It's all done simply by saying:

```
depthGen = DepthGenerator.create(context); // initial creation of depth camera
imageGen = ImageGenerator.create(context); // initial creation of RGB camera
depthGen.getAlternativeViewpointCapability().setViewpoint(imageGen); // transposing the view
```

So, once I got all that working, I made my first art installation dubbed "Ghost Hands":

![ghosthands](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2012/12/ghosthands.png)

Not perfect, but we're just having fun and seeing what we can do here.  But again, this was just accomplished by restricting how far the camera can see depth wise and replacing what's too far away with red pixels.  I step out of range, and put my hands in range.

We're BARELY scratching the surface of what the Kinect and OpenNI can do here.  It can do MUCH cooler things, I promise you.  Gestures, skeletal tracking, better background removal (I would assume), and more.  I'm just getting started with my rudimentary experiments and lack of formal Java knowledge.

Point is - this is really a lot of fun, and now that we've covered the simple stuff, it'll hopefully fly from here!

[Here's a Gist](https://gist.github.com/4264238) of the final hacked "SimpleViewer.java" class of the SimpleViewer application.  Please note that I renamed MY class to SimpleViewerCustom so I could keep the original pristine SimpleViewer.java class.  So be sure to note that and change your class constructor to match!
