---
title: "ES6 Web Components Part 5 - Wrap-Up"
date: "2015-10-27"
categories:
  - "development"
  - "html5"
  - "javascript"
  - "ui"
  - "web"
  - "web-components"
---

_In Part 4 of my 5-part write-up, [Project Setup and Opinions](/blog/2015/10/26/es6-web-components-part-4-project-setup-and-opinions/), I talked about lessons I took away from experimenting with ES6 Web Components. Lastly, is my wrap-up post..._

This was a monster write-up! In my four previous parts, I've shown you the basics on Web Components, what features make up a Web Component, how ES6 can help, and some coding conventions I've stumbled on through my experimentation.

That last sentence is my big caveat - it's trial and error for me. I'm constantly experimenting and improving my workflow where it needs to be improved. Some pieces I've presented here, but I may come up with an even better way. Or worse, I may discover I showed you folks a really bad way to do something.

One particular thing to be cautious of is recognizing I'm not talking about cross-browser compatibility here. I have done a bit of research to show that, theoretically, things should work cross-browser, especially if you use the WebComponents.js polyfill. I _have_ done a little testing in Firefox, but that's it. I really haven't tested in IE, Edge, Safari, et cetera. I'm lucky enough to be in a position right now at my job and in my personal experiments where I'm focusing on building in Chrome, Chromium, or Electron (built on Chromium). I'm trying to keep compatibility in mind; however, without a real effort to test in various browsers, you may run into issues I haven't encountered.

It isn't all doom and gloom, though. WebComponents.js is used as _the_ Google Polymer polyfill. Its why Polymer claims to have the cross-platform reach it has. See the [support grid here](https://github.com/webcomponents/webcomponentsjs) for supported browsers.

Even better, as I complete this series, [Webkit has just announced support for the Shadow DOM](https://www.webkit.org/blog/4096/introducing-shadow-dom-api/). This is fantastic, because the Shadow DOM is the hardest piece to polyfill. A while back, Polymer/WebComponents.js had removed polyfilled Shadow DOM support for CSS because it wasn't very performant. Microsoft announced a while back that it's working on the Shadow DOM, while Firefox has it hidden behind a flag.

All this is to say, if you take anything away from this series of blog posts on ES6 Web Components, takeaway _ideas_. Treat them as such. Don't take this to your team and say "Ben Farrell has solved it all; we're all in on Web Components." I truly hope everything I've said is accurate and a fantastic idea for you to implement, but don't risk your production project on it.

With all that said, aside from the implementation details, I do think Web Components are a huge leap forward in web development. It's been encouraging me to use pure vanilla Javascript everywhere. I haven't needed jQuery, syntactic sugar provided by a framework, nontraditional markup for binding - it's all pure JS. I have been using JS techniques like addEventListener, querySelector, cloneNode, et cetera. Those are all core JS, CSS, and HTML concepts. When you understand them, you understand what every JS framework and library is built on. They transcend Angular, React, jQuery, Polymer, everything. They will help you learn why your favorite tool is built the way it is and why it has the shortcomings it does.

Not only am I building pure JS here, but I'm organizing my code into reusable and modular components - what every JS framework tries to give you.

For these reasons, I think there is huge potential in Web Components and I think it most likely represents what we'll be doing as a community years from now, especially when (hopefully not if) all features of Web Components and ES6 are implemented in browsers everywhere.

As I said in my first post, I do like Google's Polymer a lot. But again, I strive to do less application-like things and more creative-like things. Therefore, MY components are fairly custom and don't need a library of Google's Material-designed elements. I've started a Github Org called [Creative Code Web Components](https://github.com/creativecode-webcomponents) that contains a [video player](https://github.com/creativecode-webcomponents/ccwc-videoplayer) and [camera](https://github.com/creativecode-webcomponents/ccwc-videocamera) that draw to the canvas and effects can be created for them on the pixels. I've created a [speech-input component](https://github.com/creativecode-webcomponents/ccwc-speechrecognition) as well, along with a pure ES6 Web Component [slide deck viewer](https://github.com/creativecode-webcomponents/ccwc-slideshow).

Those components are all in early stages, but for fabricating various creative projects, I feel like this the right way forward for me. Thus far, I have a real modular set of pieces for creating a neat prototype or project.

Perhaps if you _are_ doing a real business application, Polymer is great for you. Or React. Or Angular. Regardless, I think what I've been learning is great info for anyone in web dev today to have. I wouldn't have written 10,000 words about it otherwise!

This has been my big 5-part post about creating Web Components with ES6. To view the entire thing, check out my [first article](/blog/2015/10/26/es6-web-components-part-1-a-man-without-a-framework/).
