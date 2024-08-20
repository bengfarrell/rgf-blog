---
title: "A Week at the Hololens Academy"
date: "2016-06-17"
categories:
  - "design"
  - "development"
  - "kinect"
  - "ui"
  - "user-experience"
  - "vr"
tags:
  - "ar"
  - "hololens"
  - "microsoft"
  - "vr"
coverImage: "5704f8ff4ea9a.jpg"
---

Ahhhhh the Hololens. I finally get to check it off my list. When I express my disappointment with not being able to try it out to my friends and co-workers that are interested in VR, it's kinda like talking about going to Hawaii. "Ohhhh, you haven't been? You really should, it's an enjoyable experience." (said, of course, with a knowing smirk and possibly a wink).

There's a good reason for that knowing wink. Its a massively cool device, and despite being publicly available now to early adopters, there's a waiting list and it's $3k. Someone mentioned to me that they are in the "5th Wave" of wait list. So, right now, it's hard to get your hands on it. And that's IF you're willing to shell out the money.

Should you buy it if you get the chance? Maybe. For me, there's lots of parallels to Google Glass from a few years ago, but also lots of reasons it might break free from technological oddity into the mainstream.

In terms of sheer impressiveness in hardware, hell yes it's worth $3k. Though it can be tethered via USB for the purposes of big deployments of your project, it's completely wireless and independent. The computer to run it is built right into the device. It packs Wifi, 64GB of memory, a camera (both RGB and depth), and other sensors for headtracking (probably an accelerometer and gyroscope). Even the casing of the device is impressive. It looks slick, true, but the rotatable expandable band that makes every effort to custom fit your head is practically perfect. I originally didn't put it on my head completely correct at first, and the display was resting on my nose a bit which would have been uncomfortable after awhile. Turns out, if you balance it on your head correctly, it barely touches your nose and almost floats on your face.

Compare the hardware to something like the Oculus Rift or the HTC Vive which are just display and you supply your own computer to tether to (and aren't augmented reality). They run $600-800 plus at least a $1k desktop computer. I can't recall who, but someone with me made the almost cruel observation of the size of an NVIDIA GTX970 graphics card compared to the size of the entire Hololens headset.

[![nvidiavshololens](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2016/06/nvidiavshololens.jpg)The display is another massively cool hardware piece and makes the entire system come together as one. It has it's problems which I'll get into (cough cough field of view), but I'll talk about that in a second when I get to usability. And make no mistake....usability is why or why you should not run right out and purchase one of these devices. The Hololens isn't so much a tool as it is an experience. It's not a hammer and nail. It's more of a workbench. A beautiful workbench can be amazing, but if you can't open the drawer to get to your hammer and nails and you want to create something, it's worthless.

 

## Training at Microsoft HQ

Awful analogies aside, and usablility aside, let me say a quick word about the training. Microsoft calls it "The Hololens Academy". It occurs to me just now, that this might be a thinly veiled StarTrek reference. In fact, ALL of the training assets were space themed. From a floating astronaut, to a virtual futuristic tabletop projector, to a mid-air representation of our Solar System.

My company, Adobe, was kind enough to send me last minute to Redmond and do some learning. I honestly didn't know what to expect because it was so last minute. Was it super secret stuff? No...but considering I hadn't seen the not secret stuff yet, it really didn't make too much difference. In fact it was SO not secret that our class followed along with [well developed training material that MS has published online.](https://developer.microsoft.com/en-us/windows/holographic/academy)

In fact, in a testament to how well developed it is...I was weirded out a bit on the first day to be honest. It had that theme park feel. Or that historical city tour feel. You know, where every word and joke your guide says is rehearsed and feels forced? But I got over that real fast, you know why? Because the sessions went like clockwork. The instructors kept exact time to an eerie degree, and the assistants WERE psychic. Virtually every time I had trouble, an instructor was behind me within a few seconds helping me out. I didn't raise my hand, look confused, nothing. And there wasn't a single time where I felt like they were annoyingly hovering. They just showed up out of the blue being insanely helpful.

The room itself was laid out extremely well for training. An open workspace with large screen TV's on the wall facing every which way with the instructor in the center on a headset made a very great training space. The instructor didn't even drive the software. He or she (they changed out every 3 hours), would have someone else driving the presentation machine while they spoke. This kind of coordination takes practice, no doubt.

The walls and tables were decorated for the event too, along with coffee tables specifically for placing your virtual assets on (holograms). The room is probably a permanent fixture specifically for this.

This all means one thing to me. We've got publicly available training materials, with tons of care put into creating them, extremely well staffed and smart trainers, and a training room just for the Hololens. Add to this the hundreds of engineers working on Hololens, adding the fact that MS is just now offering developer support for it... and the message is loud and clear. Microsoft is placing a HUGE bet on the Hololens. They aren't half assing this like a lot of companies in their position might for a product that is so different and hard to predict how well it's adopted.

Training style aside - I found another thing extremely interesting about the training. It's all about [Unity](www.unity3d.com).

 

## Authoring with Unity

Unity seems like kind of an underdog at the moment. It's essentially a 3D authoring environment/player. It doesn't nearly have the reach of something like Flash or Quicktime which at one point or another has been ubiquitous. Yet, its a favorite of 3D creators (designers and devs) who have the desire to easily make 3D interactive experiences. The reach of Unity alone (browser plugin, WebGL, Android, iOS, desktop application, Oculus, Vive, Gear, and now Hololens as well as others) puts it right in the middle of being THE tool for creating VR/AR/Mixed Reality content.

I was naive to not expect MS using Unity for experience creation. But, the fact is, it's one of the ONLY tools for easy interactive 3D scene creation. I honestly expected Microsoft to push us into code only experience creation. Instead, they steered us into a combo of 3D scene building with Unity and code editing (C#) with Visual Studio. To be honest I'm a little resistant of Unity. Its not that its not an excellent tool, but I've gone through too many authoring tools that have fallen out of favor. This training is a wakeup call, though. If Oculus, Gear, HTC Vive weren't enough to knock me over the head - a major company like MS (who has a great history of building dev tools) using a third party tool like this....well consider me knocked over the head and kicked in the shins.

The exercises themselves, were a mix of wiring things up in Unity and copying/pasting/pretending to code in Visual Studio. Its a hard thing to build a course around especially when offering this to everyone with no prerequisites, but MS certainly did a good job. I struggled a bit with C# syntax, not having used it in years, but easily fell back to the published online material when I couldn't get something.

 

## Usability and VR/AR Comparisons

OK so, the Hololens has the sweet sweet hardware. It has the training and developer support. All good right? Well no, there's another huge consideration. The hugest consideration of all. How useable is it, and what can end users do with it?

You might guess that what end users do with it is up to you as a developer, and that's partially right. Everything has limitations that enable or inhibit potential. Here's the thing, though - take the iPhone or iPad for example. When it came out it WAS groundbreaking. But it wasn't SO different that you had to experience it to imagine what it could do. Steve Jobs could simple show you a picture of it. Yep it had a screen. Jobs could show you interaction through a video: Yep you can swipe and tap and stuff. People were imaginitive enough to put 2 and 2 together and imagine the types of things you could do based on never having used the device. Sure, people are doing amazing things with touch devices that would have never been imagined without using it - but the simplest of interactions you can certainly get the gist when seeing it used without using it yourself.

VR is somewhat harder to pin down, but again, its somewhat easy to imagine. The promise is that you are thrown into another world. With VR, your imagination can certainly get ahead of itself. You might believe, without donning a headset that you can be teleported to another world and feel like you're there.

Well, yes and no, and it's all due to current limitations. VR can have a bit of a screen door effect meaning if you focus hard enough you feel like you're in front of a screen. With VR, you are currently body-less. When you look down you'll probably see no body, no hands, or even if it's a great experience, it won't look like YOUR body. This is a bit of a disconcerting experience. Also, you DEFINITELY feel like you're wearing a headset. So yes...with VR, you ARE transported to a different and immersive space, however you need to suspend disbelief a bit (as amazing as it is).

AR is similar but a little worse. I can only comment on the Hololens, but its not the magical mixed reality fairly tale you might be led to believe. Even worse MS's published videos and photos show the user being completely immersed in holograms. I can't really fault them for this, because how do you sell and show a device like this that really must be worn to experience?

 

## Field of View and other Visual Oddities

The biggest roadblock to achieving this vision is field of view. From what I've heard, its the one biggest complaint of the Hololens. I heard this going in and it was in the back of my head before I put the device on, but it took me an embarassingly long time to realize what was happening. A limited field of view means that the virtual objects or Holograms only take up a limited portion of the "screen". Obviously. But in practice, this looks totally weird especially without some design trick to sweep it under the rug and integrate the limitation into the experience.

When you start viewing a 3D scene, if things are far away, they look fantastic! Well integrated with your environment and even interacting with it. Get closer though, and things start falling out of your field of view. Its as if you're holding a mobile screen up fairly close to your face, but the screen has no edges and it doesn't require your hand to hold it up. Well, what happens to things off screen? They simple disappear, or worse they are partially on screen but clipped to the window.

I took this image from a winbeta.com article about the field of view, [here's their take on it](http://www.winbeta.org/news/field-of-view-heres-what-youll-see-when-you-put-on-a-hololens), but for our sake right now, here's a great approximation of what you would see:

![hololens-fov-2-29](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2016/06/hololens-fov-2-29.jpg)

People also use peripheral vision to find things in a large space, but unfortunately in this scenario you have no periphery - so it can be easy to not have a good understanding of the space you're in right away.

There are a couple other visual limitations that make your holograms a bit less believable. For one, you can certainly see your headset. The best way to describe it is that you can certainly see when you're wearing sunglasses and a baseball cap (though the Hololens certainly doesn't protrude as far as a cap rim). You can also see the tinted projection area and some of the contours of that area in your periphery. It easy to ignore to an extent, but definitely still there. Also, you can see through the Holograms for sure. They're pretty darn opaque, but they come across as a layer with maybe 90% transparency.

Another point is that in all the demo materials, if you get suspiciously close, the object starts disappearing or occluding. This is directly due to a camera setting in Unity. You can certainly decrease this value, however even the lowest setting is still a bit far and does occlude, and even then, the Hololens makes you go a bit crosseyed at something so close. You might say this is unfair because its simply a casualty of 3D scenes. To that, I say to check out the Oculus Rift Dreamdeck and use the cartoony city demo. You can put your head right up next to a virtual object, EXTREMELY close, and just feel like you can touch it with your cheek.

Lastly, overhead lights can cause some light separation and occasionaly push some rainbow streaks through your view especially on bright white objects like the Unity splash screen. This point, I can directly compare this to the flare of white objects on the Oculus Rift due to longer eyelashes.

For these above reasons - I don't think the Hololens can be considered an immersive device yet like VR is. VR is really good at transporting you to a different place. I thought the Hololens would be similar in that it would convincingly augment your real world. But it doesn't for me. It's not believable. And thats why for now (at least 10-15 years), I'm convinced that AR is NOT the next generation after VR. They will happily live together.

If VR is the immersion vehicle - something that transports you, what's AR? Or more specifically, the Hololens? Well, just because something isn't immersive, doesn't mean it can't be incredibly useful. And I think that's where the Hololens lies for the near term. It's a productivity tool. I'm not sure I think games or storytelling or anything like that will catch on with the hardware as it is now (as cool as they are demo-wise until the immersion factor improves). No - I think it can extend your physical screen and digital world to an exceptional degree. Creating art, making music, even just reviewing documents can all be augmented. Your creation or productivity process doesn't have to be immersive, just the content you create.

I think this point is where AR really shines over VR. In VR, we're clumsily bringing our physical world into the virtual world so we can assist in creation using things modeled after both our real tools and 2D GUI tools. And usually this doesn't work out. We have to remove our headset constantly to properly do a job. With AR, the physical world is already there. Do you have a task that needs to be done on your computer or tablet? Don't even worry about removing your Hololens. Interact with both simultaneously...whatever. In fact, I think one HUGE area for the Hololens to venture into is the creation of immersive VR content itself. One for the immersive, one for the productive.

That's not to say I don't think casual consumers or others will eventually adopt it. It certainly could be useful for training, aid in hands free industrial work, anything that augments your world but doesn't require suspension of disbelief.

 

## Spatial Awareness

Hololens immersion isn't all doom and gloom though. Spatial awareness is, in fact, AMAZING. The 3D sensor is constantly scanning your environment and mapping everything as a (not fantastically accurate but damn good) mesh. Since it uses infrared light like the Kinect to sense depth, it does have its limitations. It can't see too far away, nor super close. The sun's infrared light can also flood the sensor leaving it blind. One fun fact that I've learned is that leather seems to not reflect the light too well, so leather couches are completely invisible!

We did a really simple demo of spatial mapping. It looked amazing how we lined the real walls with a custom texture with blue lines. My Adobe colleague decided to make the lines flash and animate which was super mesmerizing. Unfortunately, I didn't find the mixed reality video capture feature until after that, so here's a nice demo I found on YouTube of something similar (though a bit more exceptional and interactive)

https://www.youtube.com/watch?v=JPMUuaeyy0g

As scattered IR light tends to be sort of...well...scattered, meshes certainly don't scan perfectly. That's fine because MS has built some pre-packaged DLLs for smoothing the meshes out to flat planes and even offers advice on wall, ceiling, floor, and table finding.

Of course, once you've found the floor or surfaces to ineract with, you can place objects, introduce physics to make your Hologram interact with real surfaces (thanks Unity for simply collision and rigid bodies!), and even have your Holograms hidden behind real things. The trainers seemed most eager to show us punching holes in real objects like walls and tables to show incredible and expansive virtual worlds underneath. Again...though...the incredible and expansive can't be immersive with the field of view the way it is.

Here's a good time to show our group lobbing pellets at each other and hitting our real world bodies. The hole at the end SHOULD have been on the table, but I somehow screwed up the transformation of the 3D object in Unity, so it didn't appear in the right spot. It does show some great spatial mapping, avatars that followed us around, and punching a hole through reality!

https://youtu.be/meH96gNPxCw

 

## Spatial Audio

Spatial audio is another thing I'm on the fence about. It's a bit weird on the Hololens. I give Microsoft major props for making the audio hardware AUGMENTED but not immersive. In VR systems, especially the Oculus Rift, you'd likely have over the ear headphones. Simple spatial audio (and not crazy advanced rocket science spatial audio) is limited to your vertical plane. Meaning, it matches your home stereo. Maybe a few front sources (left, right, and center), and a couple back source on your left and right. With these sources, you fade the audio between the sources and get some pretty awesome positional sounds.

On the Hololens, however, the hardware speakers are positioned above your ears on the headband. They aren't covering your ear like headphones.

 

[![0e9693c5-78a1-4c51-9331-d66542e5fee9](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2016/06/0e9693c5-78a1-4c51-9331-d66542e5fee9.jpg)So yes, you can hear the real world as easily as you could without the headband on, but being positioned above your ears make it sound like the audio is always coming from above. One of our exercises included a Hologram astronaut. You'd click on the astronaut, and he'd disappear, but he'd talk to you and you were supposed to find him. Myself and everyone near me kept looking up to find him, but he was never up high - and I'm sure this is a direct result of the Hololens speaker placement. I asked the instructor about positional audio that included vertical orientation as well, and he said it was hard computationally. I know there are some cool solutions for VR (very mathy), but I'm skeptical on the Hololens. The instructors did say to make sure that objects you'd expect higher up (like birds) appear higher up in your world. I personally think this was a design cop-out to overcome the hardware.

 

## Input

Last thing I want to cover is input. Frankly I'm disappointed with EVERYONE here (except for the HTC Vive). It seems mighty trendy for AR and VR headsets to make everyone do gaze input, but I hate it and it needs to die. The Hololens is no exception here, it's included in all the training material and all of the OS interactions. Same goes for casual interactions on the Oculus Rift (gaming interactions use an XBOX controller, still dumb IMO) and Google Cardboard. The HTC Vive and soon the Oculus Rift will have touch controllers. Google Cardboard will soon be supplanted by Daydream which features a more expressive controller (though not positional). I've heard the Hololens might have some kind of pointer like Daydream, but I've only heard that offhand.

Gaze input is simply using the direction of your eyes to control a cursor on screen. Actually, it's not even your eyes since your eyes can look around....Gaze input is using the center of your forehead as a cursor. The experience feels super rigid to me, I'd really prefer it be more natural and allow you to point at something you aren't looking at. With the Oculus Rift, despite having gaze input, you also have a remote control. So to interact with something, gaze at it and click the remote.

The Hololens on the other hand, well it SEEMS cool, but it's a bit clunky. You're supposed to make an L with your thumb and index finger and drop the index finger in front of you (don't bend your finger, or it may not recognize the action). You also have to do this in front of the 3D sensor, which doesn't sound bad, but it would be way more comfortable to do it casually on your side or have your hand pointed down. And to be fair, spoken keywords like "select" can be used instead. We did also play with exercises that tracked your hands position to move and rotate a Hologram. All the same, I really think AR/VR requires something more expressive, more tactile, and less clunky for input.

 

## Conclusion

All that said, the Hololens is an amazing device with enormous potential. Given that Microsoft's CEO claims it is a ["5 year journey"](http://winbeta.org/news/satya-nadella-reiterates-hololens-five-year-journey), what we have right now is really a developer preview of the device. For hardware, software, and support that feels so polished despite interaction roadblocks, it will be most likely be amazing what consumers get in their hands 5 years from now. So should you shove wads of cash at MS to get a device? Well, me...I'm excited about what's to come, but I do see more potential for VR growth right now. I'm interested in not just new interaction patterns with AR/VR, but also about exploring how immersiveness makes you feel and react to your surroundings. The Hololens just doesn't feel immersive yet. Additionally, it seems like the AR/VR community are really converging on the same tools, so lessons learned in VR can be easily translated to AR (adjusting for the real world aspect). The trainers made sure to point this out - the experiences you build with Unity should be easily built for other platforms. It will also be interesting to see in the next 5 years where Google takes Tango (AR without the head mounted display) and potentially pairs it with their Daydream project.

All that said, it's all about use cases and ideas and making prototypes. If a killer idea comes along that makes sound business sense and specifically requires AR, the Hololens is pretty much the only game in town right now, so if that happens I'll be sure to run out and (try to) get one. But in terms of adopting the Hololens because of perceived inevitability and coolness factor? I might wait.

But if you don't own any AR/VR devices, cant wait to put something in the Windows store, can live with the limitations, and are already an MS junkie - maybe the Hololens is for you!

I'd like to give a big thanks to Microsoft for having us in their HQ and having such fantastic trainers and training material. I expect big things from this platform, and their level of commitment to developers for such a new paradigm is practically unheard of.
