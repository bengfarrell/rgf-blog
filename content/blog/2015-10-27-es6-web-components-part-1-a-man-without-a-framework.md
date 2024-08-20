---
title: "ES6 Web Components Part 1 - A Man Without a Framework"
date: "2015-10-27"
categories:
  - "angularjs"
  - "development"
  - "dojo"
  - "html5"
  - "polymer"
  - "web"
  - "web-components"
---

_Before I launch into this 5-part series of posts, I just want to give a high-level overview of it: I wrote a lot. Partially because I'm long overdue on a blog post on all the stuff I've been experimenting with for the past several months, but mostly because much of the web tech I've been looking into is Web Components and I'm truly excited about it and feel like it represents a pretty big chunk of the future for web devs. Best of all, I think whether you use Polymer, React, Angular, or anything else, we can all be happy together in the common ecosystem that Web Components give us. So this post isn't telling you what religion to pick; it's telling you there's something awesome happening we can all learn from._

You might not need all the information I'm writing here. So here are links and summaries to the individual segments of my 5-part ES6 Web Components Series.

**Part 1: A Man Without a Framework (this page)** An opinion piece on why and how I decided to give ES6 Web Components a shot with no help from frameworks or libraries.

**Part 2: [The Building Blocks](/blog/2015/10/26/es6-web-components-part-2-the-building-blocks)** A look at what I mean when I say _Web Components_ and all the pieces that make that up.

**Part 3: [Making an ES6 Component Class](/blog/2015/10/26/es6-web-components-part-3-making-an-es6-component-class)** How to make a real ES6 Class by extending HTMLElement and making a proper component.

**Part 4: [Project Setup and Opinions](/blog/2015/10/26/es6-web-components-part-4-project-setup-and-opinions)** Opinions I've formed on project setup as I experimented with rolling my own components. This covers repo setup as well as common methods in my class.

**Part 5: [Conclusion](/blog/2015/10/26/es6-web-components-part-5-wrapup)** An important look forward if you read and took the other 4 parts of this series to heart and are as excited as I am about them. The short of it: While Web Components is super promising, take it with a grain of salt and do your own due diligence. In other words, I'm very excited about ES6 Web Components, but I haven't been releasing production cross-platform code. Think about it before you do.

And so we begin:

_**Part 1: A Man Without a Framework**_

The web is a steaming mess of Javascript frameworks. It can feel impossible to keep up. You can learn something, love it, but then find a bunch of online hate for it. For me, as best as I can recall, my first legitimate love for a JS framework was Dojo. It was several years ago, so my memory is fuzzy, but it had a runtime, modular bits of code I could asynchronously load when I needed it (with AMD), and what seemed like an extensive UI widget set...well, it got me excited.

Dojo, might have been a little ahead of its time, though. In an age during which folks copied and pasted snippets of jQuery to make things go, Dojo was a hefty setup. It had a learning curve. Unless you were dedicated enough to get around the infuriating bits of that learning curve....wellllll....back to copy/pasting jQuery code.

I'm not against folks copying and pasting jQuery. It's so fantastic that people learn new things, and there's nowhere better to start. Throwing a bunch of code into a file, tweaking little bits here and there - that's how I learn a brand-new technique to this day.

At this point in my JS career, though, I want a good place to call home. A comfy cottage that has decent conveniences. Fun to live in, but with enough maintenance already done for me to carve time out for doing more fun things. I don't like doing dishes or handwashing laundry just like I don't care for managing script dependencies, doing DOM manipulation with cases for every browser, or a whole other host of things. I want to work on my app!

My last comfy cottage was Angular. Angular had an easier learning curve than Dojo...but it still had one. What Angular did better was allow me to create modular bits (directives) that could all work together to make some very cool apps. Lots of times, I could focus on my actual application, rather than on what made Angular work. But occasionally, I'd still have to dig into Angular's weird nuances to work something out. $Scope.digest anyone?

When I get that invested in a framework like Angular, I stretch my feet out toward the toasty fire and do some cool things with it I don't think others are doing. It starts to feel like home, even if it's a little messy. I invite some people over.

At its heart, though, it's still an Angular cottage. If I'd rented it out to someone for a week, they'd have felt a bit awkward and uncomfortable in it. They might have known Javascript pretty well, but Angular's a platform unto itself, so they wouldn't have been sure what was going on at first. It would've been a great little cottage that made them feel at home, too, but that's because I lived in it before them.

Then, of course, Angular 2 was announced. Lots of things I knew went out the window. What the hell!? Also, React was happening. Also, Polymer was happening.

So I thought to myself, well, if Angular 2 is no longer recognizable, why not reconsider this whole cottage thing. Leave all the options on the table and check out the new real estate.

React seems pretty awesome; I even played with it some. The whole virtual DOM thing is a cool paradigm. You update this DOM that's off to the side in memory, and it watches the changes, and if there _are_ things that change, the real DOM is updated. Clever. Lots of folks seem to love it and are building some pretty brilliant stuff with _and_ for it.

Angular 2 also seems great. I was skeptical, but I got good vibes when my friend, [Adrian Pomilio](http://pomil.io/adrian/), presented on it at [NCDevCon](http://ncdevcon.com/). Despite changing some stuff around, creating a slight learning curve, and making lots of Angular 1 developers angry, its early stage progress looks promising.

And then there's Polymer. I started learning Google's fancy Web Component framework at a very early stage (at 0.5). I took Polymer pretty seriously. Web Components just made sense. Yes, it's a set of emerging standards, all rolled up into one buzzword. But the modularity of it....well, it gives me real hope for a freaking awesome way to work and even share our work.

Now, the problem with Polymer started for me when the 0.5 release iterated to the 0.8 release. And then the 0.8 release iterated to the 1.0 release. I knew to expect breaking changes between these sub 1.0 releases, but it was too much change to call working with Polymer fun. During the slow times, I could get cool stuff done for my application, but then the next wave came and I had to refactor everything and re-learn stuff that was gelling in my mind. What's worse is I didn't know how to keep track of the Polymer component seed generators or the different components that had different version dependencies. They never seemed to work out in a major upgrade; I'd have to tweak bower files to pull in new versions or old versions, and the errors weren't clear on what was happening when something went wrong during this confusing time.

Everything became pretty stable with an awesome 1.0 release, but it was too late. I was already jaded enough to evaluate if I really loved Polymer...or perhaps it was simply Web Components that could build the cozy cottage of my dreams. When I thought about it, I liked some of Polymer's syntax, but they weren't really Javascript convention. Polymer also added a whole slew of methods for dealing with variable/method scope - but that was already custom Polymer. And if I thought about it, if I wasn't creating a Material designed application and wanted to customize how I wanted my application to look and act anyway, why import a paper-button that has a whole host of downstream dependencies? Especially when a custom, CSS-styled button tag would suffice?

So I got the brilliant idea to take on Web Components on my own. No help from a framework. I'd use HTML Imports, the Shadow DOM, and more with plain old Javascript. Except I wanted to learn ES6, too, so maybe I'd go a little fancier than plain old Javascript. And oh yeah, I'd need to polyfill for browsers that don't support Web Components, so maybe some help from webcomponents.js (the polyfill that spun off from Polymer).

The further I've built it up, the more I've settled into my current comfy cottage. Sure, I have to plug some holes other frameworks already fixed, but I can look to them for inspiration and guidance. What seems common to all of these frameworks is the convergence on some sort of Web Components. Whether it's true Web Components or not doesn't matter; I can pull ideas from a host of frameworks that all seem to agree on modularity and custom element creation. And of course, an added bonus is learning how everything works under the hood. There were some design decisions, especially in Polymer, that had me scratching my head until I learned how the browser actually dealt with components.

What's more, with modern browsers, lots of housekeeping problems have gone away. Cross-browser needs that jQuery answered have disappeared if the target browser is recent enough. The application lifecycle has become that of a component, and modularity can provide the foundation of an application structure. If that isn't good enough, I can sprinkle in libraries to help that aren't entire platforms of their own like Angular, React, and Polymer are.

Even better, since we're talking Web Components, we can hypothetically share components between React, Angular 2, and Polymer. That's a pretty great place to be.

In my next article, I'll talk coding specifics. But I wanted to explain how I landed here with this one, and impress on you that Web Components aren't just the next passing fad. You might say Angular, React, or Polymer aren't either. I certainly won't argue; they seem legitimately cool. But I find it much safer to rely on web standards and plain Javascript. You might say Web Components aren't a standard yet. Neither is ES6. You might say Chrome is the only browser supporting Web Components as the rest rely on polyfills. Yes, Web Components may sound riskier than the other so-called passing fads, but with the Google-supported polyfill that Polymer uses ([webcomponents.js](http://webcomponents.org/polyfills/)), I feel it's worth the risk right now to learn and play with something that has serious potential down the road. Go ahead, put the tea kettle on over that fire.

(And an exciting note: [Webkit just announced Shadow DOM support](https://www.webkit.org/blog/4096/introducing-shadow-dom-api/)!)

If this pans out, we'll know the underpinnings of how most future web technology works. Polymer works on Web Components. Both React and Angular have hinted at basing future tech on them, but they are smart enough to not bet the farm on it yet.

If it doesn't pan out, well, if you follow along with this series, you'll have custom built this technology with your own Javascript. We can both simply take the bits and pieces that do pan out and adapt.

Couldn't it be cool to be a man or woman without a framework?

_[Check out Part 2 in this monster 5-part series (cause I'm really excited about this stuff) on the building blocks of Web Components.](/blog/2015/10/26/es6-web-components-part-2-the-building-blocks)_
