---
title: "Anatomy of a Kinect Like Gesture"
date: "2013-03-20"
categories:
  - "c"
  - "kinect"
  - "nodejs"
  - "nui"
  - "ui"
---

As anybody who's stopped by my blog over the last few months knows, I've been experimenting a lot with depth cameras like the Kinect and making it work as a plugin in Node.js.  Happy to say that I'm moved the disorganized mess of experiments that I had in Github into what I hope would be a cohesive plugin.

I'd still like to test a bunch before I call it a release, but I think I have something going here to work a Kinect or Kinect like device through Node with the help of an open source library called OpenNI and not-so-open-source middleware called NiTE.

Sending skeleton data, or joints, or body tracking points to Node was relatively straightfoward.  I just needed to take the data and push it through, making it available to Javascript.

Unfortunately, though, one of the main things we associate with the Kinect isn't really included in the middleware I'm using, and you're left to your own devices.  I'm talking about the gesture.  Whether you're swiping your hand, waving, or any number of things we associate as "natural" interaction mechanisms to trigger something in our interactive experience to happen.

I actually didn't know where to start with this.  Do people REALLY do brute force tracking of your appendage at every stage and consider every possible outcome of where your appendage could be at any given moment?  From what I'd seen, the answer is yes.  I posed my question to a private Kinect G+ Community I'm a part of.  My question was basically..."How do you even start going about programming a gesture?".

Because this small knit group of people rock - I received C# source code almost immediately for a swipe gesture from a Turkish developer named Furkan Üzümcü (@furkanzmc).  I set out to convert it to C++ for my own purposes which I'll share in a bit.  It really opened up my eyes to the attention to detail about what you are doing with your body to register a gesture.

Here's the anatomy of a swipe right gesture (as performed with your left hand, swiping left to right):

- First, cancel any swipe right in progress if:
    - a) Left hand is above head - it doesn't seem natural of a person to try to perform a swipe like this
    - b) Left hand is below left elbow - it seems more natural to perform a swipe when the upper arm is relaxed and the forearm is raised, with the hand in this position above the elbow
    - c) Left hand is above hip - this I think is more subjective, but ideally - you are purposely creating a gesture if you've raised your hand above your mid-section
- Next, if the left hand's x position is to the left of the left shoulder, then we are on the left side of our body, and ready to start a swipe - so flag this, that we've started a gesture.  On the other hand - if the hand isn't far enough to the left, measured by horizontal distance between the left hand and shoulder being less than the horizontal distance between the torso and the shoulder, then cancel the flag and indicate that we have NOT started the gesture.
- Next, if the gesture is started and the timestamp hasn't been recorded then mark the start time of our gesture.
- Finally, if the horizontal position of the left hand is greater than the horizontal position of the torso AND the time it took is between the .1 seconds and 1 second, then we have a gesture!

So yeah, I'd call that brute force.  Not only are you defining an event flow based on MULTIPLE joints (your hand, elbow, shoulder, head, and torso), but you are approximating allowable "good distance" for things based on the distance between things like your shoulder and torso.

These are important things to realize.  This arm motion that sounds so easy, just became a whole body affair.  And global/world coordinates really aren't that great to use here since people can be closer to or farther away from the camera and people also come in all shapes and sizes.  So, we think of all of our distances as relative to the distance from one body part to the other.

When I was programming this, I started sitting there, and really watching my body motion.  I'd take my arm and start swinging it around...just thinking about how it moved.  I felt like Otto the Bus driver from the Simpsons.

!["they call them fingers but i never see them fing".... "ohh there they go"](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2013/03/otto.png) "they call them fingers but i never see them fing".... "ohh there they go"
So, for a swipe left, you can imagine how that works.  Just reverse the motion of the left swipe.

Up and down was a little harder.  With the horizontal swipes, we can imagine a user as needing to vertically center the gesture just above their torso.  But what of vertical swipes?  I could easily swipe up at the left, right, or dead center of my body.  Any of these are valid in my opinion, and no starting horizontal position of the swipe invalidates the gesture.

So, I took a page out of the relative distance between joints game.  I said: "OK - the distance between your left and right hip is the maximum amount of horizontal variance you're allowed to have in your vertical swipe".  So if your hand starts below your hip, and your hand is below your elbow, and continues up to where your hand is above your elbow in the right amount of time and with less than the maximum horizontal variance, then you have a swipe up!

Same with swipe down, but reverse of course.

Interesting thing when you listen for both events, though - if you want to do either a swipe up or swipe down, you make a conscious effort to put your hand into position.  To get it into this position, it seems like a lot of the time, you are causing an accidental swipe up!  I haven't resolved this issue yet, but it's an interesting one.

Lots of things to consider here.  I also did one on my own -  a wave gesture.  As in a greeting - "hello", "goodbye" - you know, a hand wave.  Here, I simply detected if the hand was above the hip, below the head, and above the elbow.  That's my starting position.  Then if the hand's horizontal position goes left then right in a cycle 6 times where each motion takes less than .2 seconds, we have a wave.

Overall, you're considering a lot of different things when designing a gesture.  How "natural" it is for your users becomes how intuitive you make it.  Have you considered how different people might interpret a swipe?  If a user thinks perhaps a swipe takes place above their head, will they become frustrated if you don't consider this fact?  If a user waves super slow, and each side to side motion takes .3 seconds instead of my .2 seconds as designed, is THAT OK?  Visual feedback can help greatly, but I think that considering all of the edge cases can greatly increase the natural feel and intuitiveness of any gestures you design even before thinking about visual feedback.

As I said, I'm funneling all this effort into my Node.js plugin.  It's probably in the alpha stage right now, so I'll just link you to my gesture scripts over on Github:

[https://github.com/bengfarrell/nuimotion/blob/master/src/gestures/Swipe.cpp](https://github.com/bengfarrell/nuimotion/blob/master/src/gestures/Swipe.cpp)

[https://github.com/bengfarrell/nuimotion/blob/master/src/gestures/Wave.cpp](https://github.com/bengfarrell/nuimotion/blob/master/src/gestures/Wave.cpp)

I think as my add-on gets more solid, I'll definitely be cleaning these up as well...organizing code better, removing redundancy, etc.  This should just give you a good idea of the logic behind the gesture.  Thanks again to Furkan Üzümcü for the C# Swipe code that my swipe is largely based on.
