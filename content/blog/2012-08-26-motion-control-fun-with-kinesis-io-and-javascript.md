---
title: "Motion Control Fun with Kinesis.io and Javascript"
date: "2012-08-26"
categories:
  - "development"
  - "javascript"
  - "kinect"
  - "ui"
  - "web"
---

The Kinect is quite the contraption, I don't mean that in a negative way - I just mean that it's so full of hardware that works in tandem, it might be kind of hard to get a handle on what it fully does.

At a very basic level you have both a normal medium res (640x480) camera and an infrared depth camera.  Put these two things together and you have RGBD pictures!  That's red, green, blue, and depth.

Other notable harware in the Kinect are the motors that move the cameras, and an array of 4 microphones which can supposedly pinpoint where sounds come from as they work together.

Altogether its fantastic, and makes me giddy to play.  You can imagine (or look up) all the possibilities with this data.  There seem to be a plethora of open source drivers to work with the Kinect (check out [OpenNI](http://openni.org/)).  Though, what doesn't come with these open source solutions is the rocket science skeletal tracking developed by Microsoft that amazes me.

This skeleton tracking is the RGBD data taken to the next level - it's obtained through the composite picture and a heavy amount of image processing and recognition.  The Kinect SDK bundles these API methods so you can get any joint position you want.  The Kinect for Windows demo application gives a nice little skeleton tracking demo which looks like this:

![skeletons](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2012/08/skeletons.jpg)
*Skeletal Tracking*

You can get each joint position (x,y,z coordinates) through the Kinect SDK - MS simply connects the dots in these demos.

Now, I've recently been programming with a bit of C# (the language of choice for working with the Kinect), but as great as C# and MS Visual Studio is, developers who aren't really invested in MS tech - especially Javascript developers can feel a little left out.  The great news is that there are a few Javascript solutions to work with the Kinect!  I'm still evaluating the ways you can go, but one of them that looks great is [Kinesis.io](http://kinesis.io/) .

Kinesis immediately starts at a disadvantage for those that want to take advantage of skeleton tracking.  Since they are creating their own low level service that runs behind the scenes in Windows, I feel like they are probably rewriting all the rocket science work that MS did in their own SDK.  This means that joint position data isn't available in the beta build that's available for download right now.  They do however promise this and more in an upcoming build soon.

Now - what good is Kinesis if they don't offer skeletal data?  Well - it seems like the Kinesis goal is really to allow you use of natural gestures and a hand-tracked cursor which more easily fit into your web workflow.  Rather than allowing you to track full body joints - they are focusing on motion based useability that isn't so far off from what we do now with the mouse or touchscreen on a webpage.

This sounds a little underwhelming from a hardcore geeky perspective, but it's a great first step - not to mention a REALISTIC step.

#### Point and Click Interaction

What does this mean?  Well first of all let's take a look at how they handle a Kinect based cursor which you control with your hand.  By adding the Kinesis.io CSS file to your project and initializing the Kinesis Javascript, you get some basic functionality that comes super easy.

![imagebox-demo2](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2012/08/imagebox-demo21.jpg)
*Motion Cursor Interaction*

In the above screen shot you can see the Kinesis cursor (a hand) and a circle around the hand.  Basically since there is no mouse click or even a touchscreen tap - the Kinect way (established as a user interface guideline by MS on the Xbox) is to hold your hand in position while a countdown timer is enacted.

Kinesis.io gives you these elements in it's stylesheet.  All you need to do to enact the pointer is to embed the CSS and Javascript file and instantiate it by doing the following in Javascript:

`kinesis = new Kinesis;`

Interestingly enough, even this little bit of code presented a problem for me. I'll admit that I don't know what the new operator does in Javascript if you don't use the parenthesis as in "new Object()" - however it's easy enough to see that you should do things this way from the Kinesis docs. What threw me though, is that to use that "kinesis" object, you can't custom name the variable - you absolutely need to name it "kinesis". I had just assumed any old variable name and scope would work. This cost me a couple hours of swearing until I finally tried copying and pasting the example directly.

When this is done, you get everything you need for the cursor! Clicking on things is a matter of marking your DOM elements as "interactive". If the CSS class is marked as interactive, the PARENT element will fire off it's click or href handler. This is important to understand - so....again: the element marked interactive must be INSIDE the thing you want to click. I'm not exactly sure why this is - maybe it's better semantic HTML. It does force you into wrapping your interactive element with something like an "a" tag like so:

`  `

Once you have the Kinect instantiated and mark the correct elements as "interactive", you get some nice motion controlled interaction with your hand. If you recall I said you don't get skeletal data - you really don't, despite the fact that you have a cursor attached to your hand. Kinesis.io normalizes this data to a cursor without exposing you to the underlying joint data. In fact, either hand will control the cursor - you can switch off while you are interacting with your webpage.

### Cursor Position Data Stream

Though I did say Kinesis.io normalizes the joint/skeletal data to a cursor - that doesn't mean you can't get position updates from it. Rigging it up is easy!

`kinesis = new Kinesis; Kinesis.cursor = movement;`

function movement(position) { console.info(position.x); console.info(position.y); console.info(position.z); }

All we're doing here is supplying a callback function to the Kinesis cursor. Very simple! In fact, this is the basis for a few UI controls that Kinesis provides in [their demos on Github](https://github.com/Kinesis-io/examples)

#### The Cursor has a size! Who knew?

All in all, it's very easy to work with the cursor - I will say that I did have a little trouble with it on my page. See, my body content is set to be 100% height. It's not designed to scroll. The Kinesis cursor (the hand) lives in a div element with a real height and width. Moving the cursor down to the bottom of the page suddenly made the page bigger as the baseline of the cursor extended the height to 100+ %. This caused my page to suddenly have scrollbars. Of course making the body overflow hidden via CSS fixed this problem.

#### Swiping and Gestures

I won't eat up space here with copied content from the [Kinesis.io documentation](http://docs.kinesis.io/gestures). Needless to say, rigging up swipe up, down, left, and right gestures are super easy. Check the docs if you don't believe me! You have full control over which hand launches the event, too!

#### Simulation

What's really great about the Kinesis.io SDK is that it offers a nice simulation tool. While Kinesis sounds like OSX is on their roadmap, you can't work on the Mac right now with the real hardware. Fortunately, the simulator works on both Windows and Mac. On Windows the simulator is pretty great so you can sit down and develop without needing to repeatedly run back in front of your Kinect to test things out. With the simulator, you can control the cursor, and click one of many buttons to initiate a swipe gesture.

There are a few more buttons for gestures like leaning - unfortunately those are dimmed out and not available yet. Also, the speech detection UI on the simulator leads you to believe there's extra cool speech detection built into the SDK. Unfortunately going through the help forums, you find that it's not available yet.

![sim](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2012/08/sim.jpg)
*The Kinesis.io Simulator*

#### The Good

My first experience with the Kinect and Javascript was with [KinectJS](http://kinect.childnodes.com/). While KinectJS seemed freaking awesome, it was much more DIY than Kinesis.io seemed. Also, KinectJS runs through an AIR app, while Kinesis.io runs through an invisible background service. I'll cover KinectJS another time - but Kinesis.io just looked way more promising to me. KinectJS hasn't been updated since February, all the while Kinesis.io is actively tweeting, blogging and working on their product as a for profit business. So I was excited to see something that showed promise of being updated regularly.

Additionally, Kinesis seems to be working on their own UI components and really trying to standardize motion based interaction. For the Kinect to really latch on in the web standards world we live in, it needs to be easy to integrate with existing content on many different platforms. I really feel like Kinesis may succeed here - bringing motion control as a standard/common UI vehicle.

#### The Bad

I really didn't have much bad to say about the Kinesis SDK while using the simulator. I had a few frustrating moments with the SDK that I've mentioned here. The UI controls they have on Github didn't seem immediately useful to my project - but I was able to copy some key functionality out from the Javascript class they provided.

One example was the UIVerticalScroll component. How it was written didn't really apply to how I wanted to architect my app - but I was able to pull out code easily enough to do what they did. Unfortunately, I'm not exactly sure how useful this component is. At first glance - vertically scrolling via the position of your hand sounds natural. However - moving your hand back to a rested position will cause scrolling that you didn't intend. Likewise with raising your hand to then do a swipe gesture. These things should probably be thought out a little more! Not sure who the onus is on here....the developer (me) or Kinesis!

Once I started in with the actual hardware - it got a little disappointed (yet still promising). I had a really frustrating time trying to get it working at first. Using the C# demos that come with the Kinect SDK, I can see that my skeleton tracks extremely well in low light and from a pretty decent distance. When I was looking at the skeletal output in my dark basement from 12 feet away it worked WAY better than I expected. Close to perfect in fact.

With Kinesis, on the other hand, my basement seemed a little too dark, and it only seemed to work in a sweet spot of around 3-4 feet away from the device. Not only that but after running Kinesis for a little while, the cursor seemed jerky and gestures were almost impossible to pick up. I'm assuming there might be memory leaks in the beta, though I'm not sure.

I'm definitely looking forward to the new Kinesis drop right around the corner. Hopefully we'll have joint tracking, speech detection, and performance improvements. Despite the hardware + the SDK being a little unusable after awhile now, I'm still jazzed about Kinesis and what they are trying to accomplish. I'm highly psyched about their latest build and hope it comes soon! In the meantime however, I'll take another peek at KinectJS because I just don't know how long I can hold out for full skeletal tracking!
