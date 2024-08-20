---
title: "Primesense purchased by Apple"
date: "2013-11-28"
categories: 
  - "kinect"
  - "nui"
---

Anyone who's met me over the past year knows that I've been giddy over 3D sensing...you know - like the Kinect. I spoke at conferences about it and blogged heavily about it as I was learning the tech. It's been a fun ride.

It was probably a year ago today when I first dug in to the OpenNI and NITE libraries from Primesense. Up until that point, I was experimenting with the Microsoft Kinect. The original Kinect was pretty awesome for it's time - but it just didn't sit right with me to have such a game changing technology in my hands and be tied so deeply to Windows. As someone who's career revolves around the web and multi-platform experiences it just felt like the wrong way to be.

There are some technologies that will start fairly proprietary and end up in the public space. It's fairly obvious with Microsoft's track record that the Kinect wouldn't end up open sourced, or even multi-platform. You can't fault them for creating something awesome and keeping it to themselves, but it certainly leads to whole factions of people being left out of an important user interface movement.

That's why I got so excited about Primesense. Historically, Israeli based Primesense was the original inventor of the 3D sensing technology and then sold usage rights to Microsoft to produce the Kinect. Primesense themselves created an open consortium/platform for 3D depth sensing software (OpenNI). Oddly, they kept the middleware (NITE) non-opensourced yet still downloadable. The middleware was the important bit that actually did the skeleton tracking, whereas the OpenNI project itself was really just a basic API to read 3D sensor data.

In any event, we now have a semi-open platform for 3D sensing and skeleton tracking. Hardware to do it is extremely limited though, and I had hoped the situation would improve. You could either use the Kinect (Windows only), the Asus Xtion (no longer for sale I believe), or the Primesense Carmine.

The Primesense Carmine was exciting, though. Here you had Primesense developing and selling the full Carmine as well as a mini version that was low powered and just poised to take over mobile. In fact, I had heard that Primesense was preparing batches of thousands (maybe even tens of thousands) for undisclosed device manufacturers. An open 3D sensing platform seemed likely to take over the world given a year or two.

That was, until this week. Apple [has just confirmed](http://www.engadget.com/2013/11/24/apple-confirms-primesense-buyout/) that it has purchased Primesense. It's no secret that I have no love for Apple, but hell, I wouldn't mind Apple getting a million or so orders of those awesome little Carmine units for upcoming iPhones. It woud be an awesome win for 3D sensing if that happened....

But no - Apple now owns the only cross platform 3D sensor in town. I would assume that now we're back to a proprietary platform that only runs on one OS. Only, this might be worse than the Microsoft situation. Apple, in lots of minds, is increasingly becoming a consumer tech company. You often read Apple users complaining about Macbook Pro neglect, focusing on the iPhone and iPad. So now, presumably, we have 3D sensing technology in the hands of a company that will probably only ever deploy it on an iPhone, iPad, or Apple TV.

So, going forward, I would assume that to make a Primesense 3D sensing UI experience we're going to need to develop in Xcode and deploy only to iOS which Apple will create ham-handed standards around and will block apps from the marketplace that don't conform. Again - great for consumers, but not for hobbyists, artists, and innovators - the very people that made this tech popular today.

You might say I'm being overly doom and gloom. Could Apple simply keep up OpenNI/NITE and still sell Carmine sensors? Well, signs are not good. Right now the [Primesense store](http://www.primesense.com/developers/get-your-sensor/) has been shut down. You can't buy a Carmine anymore (will this change after the company changes hands?). And NITE? The skeleton tracking middleware? That was always a little suspicious, because it was never open sourced like OpenNI was. Perhaps it was secretive intellectual property that could be leveraged for a buyout. I don't see Apple doing good for the community and opening it up if Primesense didn't already.

I'm already speculating a little what Apple's goals are with 3D sensing. If strictly consumer, it would be a bit odd - since 3D sensors, being infrared based, don't work in direct sunlight. If you think about that and Apple's extreme attention to design detail so that things "just work", I just can't see a product like this being released as an iPhone or iPad under the Apple name with such a huge restriction given that lots of folks use their devices outside.

That really just leaves the AppleTV, which is the perfect place for it - but an extremely limited market in comparison to Apple's mobile initiatives. It's sad when you think about it, because Primsense has featured tons of nifty companies and products that use their devices in all sorts of different environments and use cases. While some oddball tech company like Zenith or something will make an 80 inch flatscreen display with built in sensor, or someone else will come along and build a unique piece of hardware for a healthcare application - you'll never see Apple splintering it's product line like that. And of course, no other manufacturer is allowed to make these  under the Apple umbrella.

Contrast that with Windows. Small companies come in an make truly unique experiences. Many fail, but manufacturers try anyway. Natural User Interaction is still in it's infancy - and I truly believe that Apple won't allow it to grow naturally. They will lead and tell us what to do in regards to their own product line. Meanwhile, oddball, non-Apple like experiences be damned.

Hopefully I am doom and gloom. I really dug what Primesense was doing. If they get to continue, it would be awesome. If not - well...the Kinect v2 looks pretty sweet!
