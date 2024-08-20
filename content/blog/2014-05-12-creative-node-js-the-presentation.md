---
title: "Creative Node.js : The Presentation"
date: "2014-05-12"
categories:
  - "nodejs"
---

In a couple days, I'll be giving the first stop on my "Creative Node.js" presentation tour! I'm speaking at [cfObjective](http://www.cfobjective.com/) in Minneapolis on Wednesday May 14th. After that I'll be speaking at [HTML5DevConf](http://html5devconf.com/) in San Francisco on Thursday May 22nd. I'm giving a talk about how folks can and should use Node.js for visual and creative work even though it's widely regarded as just another server side tech.

The purpose of this blog post is to give some links you may see in my presentation. I'm also posting my [slide deck](blog/creativenodejs) as well for those of you who couldn't make it. The [deck is checked into Github](https://github.com/bengfarrell/creativenodejs-preso), and to see some simple code behind my examples, you can look [here](https://github.com/bengfarrell/creativenodejs-preso/tree/master/examples). Be careful with the OpenCV library, it's especially difficult to get installed, especially on Windows! NPM install doesn't cut it, and you need to manually build with nw-gyp, and add the required DLL's right inside the release folder.

A web hosted slide deck link really won't do it justice, though. As I worked on my presentation, it really became more of a desktop application than a slide deck. The presentation itself is powered by [RevealJS](http://lab.hakim.se/reveal-js/#/). I've found that using Reveal, you can't place working script examples inside the page (presumably because of security concerns), so I have some links denoted by +'s to launch an example in a new windows. Some of these examples are [AngularJS](https://angularjs.org/) based, which is really nothing new.

What IS a little new, is that all of my examples except one require Node.js to run. I've actually put these examples directly inside my presentation by making the entire slide deck run by way of [Node Webkit](https://github.com/rogerwang/node-webkit). I've [written](http://flippinawesome.org/2014/02/10/build-desktop-apps-with-javascript-and-node-webkit/) more about Node Webkit on a great site called Flippin' Awesome. So, what we have hear is a RevealJS slide deck running Node.js powered examples with some running with help from AngularJS, all running inside a desktop application powered by Node Webkit.

This is why I love this platform - because we can put all of these technologies together and pull directly from the fabulous HTML/CSS/JS/Node community.

Leading up to Node.js, I mentioned  Adobe Director, Adobe Flash, and a couple things you may have not heard of: [OpenFrameworks](http://www.openframeworks.cc/) and [Cinder](http://libcinder.org/).

I also talk about a few of my projects. One, a music aggregator, playlist and radio show creator called [SharkAttack](https://github.com/bengfarrell/sharkattack). This project relies on an awesome video utility library called [FFMPEG](http://www.ffmpeg.org/).

Second project, was a Node.js based speech recognition library that uses either Google or AT&T services to translate text to speech. I called it ["Make it So"](https://github.com/bengfarrell/makeitso), because in my demos you pretend to be Captain Picard and tail each command with "Make it So".

I also listed a bunch of projects to give Node some kind of windowed view:

- [Node-GLFW](https://www.npmjs.org/package/node-glfw) provides platform-independent access to windowing system and input devices
- [Node-OpenVG](https://www.npmjs.org/package/node-glfw) OpenVG bindings for node.js
- [Node-SDL](https://github.com/creationix/node-sdl) Simple DirectMedia Layer bindings for node.js
- [TopCube](https://www.npmjs.org/package/topcube) a webkit window that node can control
- [Node-GUI](https://github.com/zcbenz/node-gui) binds GTK+2.0 to node.js
- [Node-QT](https://github.com/arturadib/node-qt) native bindings to the Qt library
- [Node-WebGL](https://www.npmjs.org/package/node-webgl) port of WebGL for desktops
- [Ogre + Node](http://techny.tumblr.com/post/39685843785/node-js-ogre3d-materials-and-lighting)

I really hadn't tried any of these in depth. I attempted Node-WebGL breifly, but had DLL and include file troubles, so shelved it in favor of Node Webkit and A[tom-Shell](https://github.com/atom/atom-shell) which give you the whole webkit package. I talk about a quick sample Atom shell application called ["WorkIt"](https://github.com/bengfarrell/workit) for time tracking.

I also get into Bluetooth a little bit with a great Node.js addon from Sandeep Mistry called [Noble](https://github.com/sandeepmistry/noble). I also wrote a little Bluetooth library on top of that called ["I Heart Node"](https://github.com/bengfarrell/iheartnode) to give a little easier and more understandable way to work with the [TI Sensor Tag](http://www.ti.com/tool/cc2541dk-sensor).

Expanding on devices, I talk about my Node.js/Midi/3D Sensor instrument called the [Upright Spass](https://github.com/bengfarrell/uprightSpass) powered by my 3D Sensor library called [NuiMotion](https://github.com/bengfarrell/nuimotion). And, with 3D sensing in mind, I also talk a bit about [OpenCV](https://www.npmjs.org/package/opencv) for computer visualization.

After talking about all of these , I talk about making your own add on with an [example gist](https://gist.github.com/bengfarrell/4440739). Even better, check out my [old post](/blog/2013/01/03/c-and-node-js-an-unholy-combination-but-oh-so-right/) on Node.js addon development.

Lastly, I talk a little more about hardware with [Johnny 5](https://github.com/rwaldron/johnny-five)/Arduino, [Node Bots](http://nodebots.io/), [Node Copters](http://nodecopter.com/), and [running Node on a Raspberry Pi](http://joshondesign.com/2013/10/23/noderpi).

If you missed my web/email addresses for working at GE Software in San Ramon, you can [email here](mailto:uxjobs@ge.com) for jobs in our fantastic UX group. You can also look into our software center as a whole [here](http://gesoftware.com).
