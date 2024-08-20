---
title: "Vacation from Flash"
date: "2010-02-09"
categories: 
  - "flashflex"
---

I just came back from a long weekend trip to Orlando, Florida.  Just prior to that I had been working to launch this website - complete with a jQuery driven photo album, Joomla based CMS, and WordPress based blog.

This past weekend, waiting in the long Disney World lines, I had plenty of time to read the tweets coming in as the Adobe development teams and the Flash developers I know responded to Flash bashing and HTML 5 superiority in the wake of the Apple iPad announcement and the impending release of Flash Player 10.1, which Adobe is pushing for mobile devices.

I'm not going to add anything to this argument, but my current opinion stands that everything has it's time and place.  People use Flash horribly just like they'll use Javascript and HTML 5 horribly, and likewise each will produce some great things.

While most folks are comparing the end result when you create with the different technologies, what was eye opening in creating my website is the comparison in the development process between Flash, Flex, HTML, CSS, and Javascript.

Javascript and Actionscript are the most obvious comparisons.  Both have pretty much the same syntaxes.  Both are ECMA based, however Javascript has a few less features, that to me....can slow development and can lead to poorly written and badly maintained code.  Please note that I said CAN slow and CAN lead to!

Let's go back in time a little.  Flash 5 and 6 were great at the time,  but didn't encourage any good programming standards.  Basically you'd write scripts on each frame of your animation.  You could also (and many people did) go into each object and animation and write scripts on those as well.  In the end, you could have a huge unorganized mess which was impossible to comprehend or troubleshoot.

If Flash was your first development environment, over time, you'd start to see that you've created big unorganized messes and start to think about how to better maintain your projects.  However, there was absolutely nothing in Flash that encouraged this behavior.

Flash 6 and Actionscript 2 started rolling out with new enhancements to the ECMA standards.  This included the ability to organize your code in classes, and really rounded out an object oriented approach to development.  You still weren't forced to acknowledge OO practices in your work, but the option was definitely there and some of the more experienced programmers could utilize them.

With Flash 9 and Actionscript 3, developers who tried to do anything substantial were forced to start acknowledging OO practices.  This approach led to Adobe facing some complaints from the casual Flash developer, but also led to the larger community adopting some good (or better) practices around object oriented development.

I think this very much relates to the state of Javascript today.  Someone coming from a more robust language like Java or C++ could pick up both Flash 5 or Javascript today.  They could absolutely introduce a code structure to mimic  an organized object-oriented approach.  However, the reason they can do this is because they have the experience to know how to better organize code, and they know right off the bat what features are missing, and can concoct ways around them.

Contrast this to someone just learning Javascript or Flash 5 as their first development language.  They just wouldn't know any better than to create lots of inline code, not realizing that classes or methods even exist.  As this person gets more and more experience under their belts, they would see how their approach lacks maintainability and strive for something better.  In the interim however, this leads to horrible, mangled, and unmaintainable scripts.

Actionscript has increased by leaps and bounds over the years, but Javascript still has not.  Great code can and will be developed in each environment - but I just don't think that Javascript encourages any good practices.

Keep in mind that I'm well aware that the exact same thing can be said about Java/C++ versus Actionscript with Actionscript on the low end of the totem pole here.

The other thing to point out is variable typing.  Having to call a variable a string, number, etc when first declaring it seemed like a nuisance, but turned out to speed up development quite a bit.  This is an important thing that Javascript lacks.

Someone, a year back, turned me onto Aptana for use when developing with HTML/CSS/Javascript.  Aptana is fabulous.  I get to use my experience with Eclipse and Flex/Flash, and just switch to something that looks exactly the same to develop my non-Flash web pages with.  Code hinting is huge for me.  I don't constantly have to look up syntax, and can start typing and have Aptana suggest what to do next.  This is incredibly helpful for CSS, since I don't remember all the properties and need constant help.

With Javascript, on the other hand, code hinting is hindered a great deal.  If I don't declare a variable type, Aptana can't suggest what properties and methods I can use on an object very accurately.  It actually does a great job guessing (especially with jQuery), but it can only go so far if it doesn't know what kinds of objects you're working with.

I suppose you could call CSS a win on the non-Flash side.  CSS, to me, is simply a joy to work with given the right tools.  Aptana, as I said before, does well with code-hinting for CSS.  As a Flex developer who knew enough CSS to style text in HTML and style my Flex components, really getting into CSS was a little daunting.  It's a lot more powerful and robust than I would have thought.   Flex doesn't give you the ability to control layout and positioning with CSS, nor does Flex 3 allow inheritance and chaining styles together (Flex 4 does though!).  It can also be a little confusing in Flex to know which properties to set for what you want to do.

All in all, I think I enjoy style and layout in HTML/CSS more.  I'm still a newbie, but it's my shiny new toy.  Unfortunately, my shiny new toy is very tarnished by having to maintain compatibility in Internet Explorer.  I recently tried and failed to use a glow effect for some text that looked great in Firefox and Chrome, but looked awful because of IE's clear type.  And then of course, there's no real practical way to use vector graphics (IE doesn't natively support them).

For pure programming power, I'll choose Flex and Flash any day of the week.

I look forward to getting more experience with Javascript and CSS.  It'll definitely help when I'm evaluating a project.  I'm sure I lean too far on the Flash side right now, and I look forward to being able to better approach a project from any perspective.
