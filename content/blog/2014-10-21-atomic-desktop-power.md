---
title: "Atomic Desktop Power"
date: "2014-10-21"
---

Hey everyone! I just got back from [HTML5DevConf](http://html5devconf.com/) in San Francisco where I gave my talk "Atomic Desktop Power with Node.js". I had also given the same talk on the east coast last month at [NCDevCon](http://ncdevcon.com/).

As promised, I want to share some links with you. Like I said in the talk, I made my own slide show display all in Atom-Shell itself using Polymer. Here's the source: [https://github.com/bengfarrell/atomicdesktoppower](https://github.com/bengfarrell/atomicdesktoppower).

Though, the slide deck ITSELF was an Atom-Shell demo, I did have some more targeted C++/Node.js addons demoed. The first was a simple "hello world" addon, followed by a library that generated random 2d/3d coordinates to make a red div box move in my HTML page. The third was a performance test showing how fast we can count to a billion with Node.js vs a Node.js C++ addon. All of these demos can be installed using apm/npm inside my slide deck, but they are also part of a separate standalone repo here: [https://github.com/bengfarrell/genericnodeaddon](https://github.com/bengfarrell/genericnodeaddon).

I also used/mentioned NAN, or [Native Abstractions for Node.js](https://www.npmjs.org/package/nan)" to deal with the changeover happening from Node v0.10 to v0.11 when you write C++ addons. And of course, since Atom-Shell uses v0.11, it was important to my talk!

I also briefly mentioned [OpenCV](http://opencv.org/) for Node. I showed a quick facial recognition demo working from my Atom-Shell based slide deck. You can install this over NPM or grab it from Peter Braden's github repo: [https://github.com/peterbraden/node-opencv](https://github.com/peterbraden/node-opencv). Also, while OpenCV is cool, it's a bit more difficult to install on Windows, so I documented it all here: [https://github.com/bengfarrell/installing-node-opencv](https://github.com/bengfarrell/installing-node-opencv).

Lastly, if you're still confused what Atom-Shell is (I hope you're not!), you can check out the Atom-Shell page and documentation here: [https://github.com/atom/atom-shell/tree/master/docs](https://github.com/atom/atom-shell/tree/master/docs). Downloadable releases can be found on this page: [https://github.com/atom/atom-shell/releases](https://github.com/atom/atom-shell/releases). Differences to Node-Webkit came up, and you can see the documentation that Github wrote talking about that: [https://github.com/atom/atom-shell/blob/master/docs/development/atom-shell-vs-node-webkit.md](https://github.com/atom/atom-shell/blob/master/docs/development/atom-shell-vs-node-webkit.md).

That should do it! If you came to my talk, thanks so much for coming. It was tons o fun, and I was quite happy to meet and talk with everyone that came up to ask questions afterward.
