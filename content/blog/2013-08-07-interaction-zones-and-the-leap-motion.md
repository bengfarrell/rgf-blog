---
title: "Interaction Zones and the Leap Motion"
date: "2013-08-07"
categories:
  - "development"
  - "javascript"
  - "kinect"
  - "ui"
---

I finally got myself a [Leap Motion](https://www.leapmotion.com/)! It came in the mail around last week and I promptly plugged it in to play around. Prior to getting it in the mail, I read some great reviews of the hardware, but many frustrations around interaction.

After using it, I definitely agree, but I can also elaborate...

 

## Hardware

The Leap Motion controller is a little white bar - almost the size of a bulky pack of gum

![what1](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2013/08/what1_desktop-9ccf2bb953da97fb3e713dbd47338561-e1375897900508.jpg)

 

When I opened the box, I saw 2 USB cords. After my initial "why would they waste effort to ship two cords" thoughts and using it - it was much appreciated! One is short and one is long. When I place the Leap next to my laptop, I don't want a lot of extra cord hanging around, but on my desktop, it needed to reach floor level from my desk.

It just goes to show that I think the attention to detail they put into this hardware was pretty good! Loading up some sample interactive demos was also pretty impressive. You can watch all of your fingers track quite well - it's really impressive to see the each finger tracked in a very responsive way.

All in all - the hardware was super impressive, especially for such a tiny package.

 

## Interaction

Now - the interaction. Well, the out of box experience leaves much to be desired. Honestly, if you're not a developer with an imagination, I'm not sure what point I see to purchasing this yet. If you have little imagination and have just purchased this to be a mouse replacement - you're going to have an awful time. But, if you're a developer who wants to create unique interactions - it is definitely appealing. The "Cut the Rope" game, I thought was a pretty decent example of a unique interaction (swiping your fingers to cut a rope) that is immediately accessible to the user.

There are 2 shining examples of why this isn't a showcase device for mouse replacement - and it all comes down to a simple touchless sensing interaction mechanism.

 

## Touch Zones

It seems fairly obvious to use "touch zones". If your hand is far back, you "hover" - but if its moved farther forward you are "touching" or interacting with the screen.

The "Touchless" application provides a good screen to explain:

![slide2-1](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2013/08/slide2-1-e1375898666547.png)

At first, this seems perfectly reasonable. However, it becomes insanely difficult to use for many tasks.

I fired up Corel's beta application for painting. If you aren't familiar with Corel, they make a mean alternative to many Adobe tools like Photoshop, Illustrator, etc. I applaud Corel for trying something like this out!

Initially it was fun to use, but actually getting a feel for drawing was difficult. They had some gestures baked in that I haven't really had a chance to get acquainted with yet - and I think those will be key (I remember trying to pick a color and it wasn't VERY intuitive, but I thought it had potential). What I mainly focused on was drawing. Pen to paper.

Corel used the hover/touch zones as well - and it was just annoying. Firstly, you can put the Leap Motion anywhere you want on your desk. If it moves, you're constantly figuring out where that boundary between hover and touch is. Its nearly impossible to remember - especially because when we move our hands in and out, we're not doing it in a perfectly straight line. We're introducing a little arc as our hands rotate around our elbow.

I try to play a little keyboard/piano in my spare time. I'm not bad - and a basic thing when using this intricate and complex user interaction device is both tactile response and muscle memory. When I hit a key on my piano, I can feel it. My hand knows when to stop, and when to apply more pressure to make it louder. When I play a piece, my fingers remember where they were before if I practice enough. I don't have to keep reading the sheet music - instead my "muscle memory" takes over. This means that I know what the song feels like to my fingers when I play it, and I can learn how my muscles feel when things are going well...and repeat it.

Compare that with painting in air. Your Leap Motion might change position or you might shift in your seat and use a different hand position. There's really no muscle memory here to allow you to remember how you interacted with the device. And with no tactile response from the air, you don't get feedback of your pen hitting the paper. So for me, it was constant guess work on how to pull my pen up from the paper and not make tons of erroneous strokes.

The "Touchless" application was even worse. It runs as a background task, and allows you to replace your mouse with the Leap Motion. Again - we're using hover/touch zones. Still the same problems as painting, and as a result it's a little hard to click on things - and almost impossible to double click. Moving your finger straight in to click, moving it back out of the touch zone, and then moving it back into the same exact position to perform the double click is incredibly hard!

So - imaganitive games and experiences like "Cut the Rope" - WIN. Replacement for existing two dimensional interaction methods? I hate to say it, but fail.

## Can Anything Be Done?

I was a little sad honestly - the mouse and paintbrush seem the most obvious applications to go and replace. I started getting it in my head that we might never replace them with 3D sensing well, as they are inherently 2D interaction. In my past work playing around with the Kinect and other 3D sensing devices, I had a similar problem. They are quite similar things despite one being for your fingers and the other being for your whole body.

With whole body sensing, I had the idea to use the angle of your arm to figure out how far you've extended your arm. There is a somewhat tactile response as you feel your elbow lock straight, which aids in muscle memory for doing the action as well. Doing an action feels the same every time because it's relative to YOUR body.

Now, I don't think you can make similar things happen with your hands with the Leap. For one, I don't think that any of the joints are captured - only the finger tips. And from what I saw, your fingers have to be reasonably outstretched to be picked up (and not balled up in a fist).

But what about relative finger placement? When I do finally get around to using the API (Javascript and browser enabled, woo!) I'd love to try some interaction mechanisms like this. What's more obvious and natural than using your pointing finger to paint? Well, duh....we hold brushes and pencils with 2 fingers - our pointer finger and our thumb. Perhaps the proximity of these fingers could dictate if we are "touching" or "hovering". Can we click by tapping the pads of our fingers together? I think there might be some difficulty in sensing when fingers are so close like this, but definitely something to at least try!

 

Bottom line is, have fun developing for the Leap Motion. Its worth it for you if you want to make cool things -  we need to make it worth the common people to actually use!
