---
title: "The 3D Sensing Apocalypse &amp; My Node.js plugin"
date: "2014-03-01"
categories: 
  - "c"
  - "javascript"
  - "kinect"
  - "nodejs"
  - "nui"
---

Dire straits are ahead for 3D sensing. I commented about it back in November - that I hoped Apple wouldn't kill open source 3D sensing library OpenNI from Primesense after the buyout.

If you visit [http://www.openni.org](http://www.openni.org/) you'll notice that the entire website will shut down on April 23rd. Also unfortunate is that you'll no longer be able to download the OpenNI and NiTE package with drivers.

Worse, they are seem to be liquidating their stock of Carmine sensors. Emptying their warehouse means they probably will never make another one. Also, Asus seems to be no longer making 3D sensors. I can only guess that Microsoft will stop making the old-style Kinect soon when the new one for Windows dev comes out.

What does this mean?

Well...no more cross platform 3D sensor hardware and no more software to run it. Creative makes the Senz 3D which is powered by the Intel SDK and MS will be making the new Kinect for Windows. Both are Windows only.

The cross platform market seems dead. Apple hasn't disclosed yet what they will do with Primesense, while Google has announced Project Tango: a device with a 3D sensor built in. Everyone seems to be going their separate ways with this tech.

Probably the best way forward is to get a used XBOX Kinect, download OpenNI/NiTE to a safe place before April 23rd, and try to get things installed with Freenect if you use Mac or Linux.

Luckily, I received a nice contribution to my Node.js OpenNI wrapper. Gordon Turner added some great documentation around making my Node plugin NuiMotion work on Ubuntu and OSX with the Kinect and Freenect. This gave me the kick in the pants to update the project to have a better build process and test/fix integration with the new OpenNI/NiTE binaries on OSX, Windows, and Ubuntu. I've also added an API to get raw depth or RGB data.

With the right pre-install steps in place, all you'd have to do from any platform is a simple "npm install nuimotion".

So, even though the crossplatform 3D sensing dream seems dead for now, we can stock up for the apocalypse and have fun until the next generation springs up. You can find NuiMotion at [https://github.com/bengfarrell/nuimotion](https://github.com/bengfarrell/nuimotion)
