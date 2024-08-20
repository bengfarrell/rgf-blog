---
title: "Angular + Backbone + Dojo: A Fundown"
date: "2013-03-22"
categories: 
  - "development"
  - "dojo"
  - "javascript"
  - "ui"
  - "web"
---

I'm trying to avoid internet negativity at all costs lately.  It's so passe.  But I was having such a rockin time working with AngularJS today, I just had to tweet that it was my absolute flavor of the moment.  Right after I did that, though, I had a reality check...will this turn into one of those boring old internet flame wars where my framework is better than your framework?

I got a reply right away.  Luckily @jwaltonmedia was just being friendly.  See, his flavor of the moment is BackboneJS.  We traded some kind words and left it at that - each sharing some awesomeness.

Got me thinking though, there's too many articles out there about MY FRAMEWORK VS YOUR FRAMEWORK:  THE ULTIMATE THROWDOWN.  The winner rocks and we should push it on everyone whether they want it or not.  The loser suffers in shame for eternity.

Well, I was inspired to compare a few of these frameworks, but I don't want to use negativity or competitive language.  Because, in all honestly we are in a moment where there are a metric crapton of Javascript frameworks that are ALL GOOD.

Thusly, I've named this article "fundown" instead of "throwdown", because the only winner here is you when you try all this good software.  And instead of "versus", we're going to use "plus", because while it's not necessarily ideal to use 2 or more of these frameworks together, you should use all and more separately as you rock out your badass web app.

I've tried just around 3 frameworks/libraries heavily at one point or another - and I truly believe that each is the best tool for some job.  My learning process was pretty unscientific and involved me copying and pasting tutorials and code from the web - so my opinion here will be equally unscientific.

## What's good in all

It's pretty easy to see that the 3 I've looked at are pretty mature at this point - Backbone.js JUST reached a 1.0 milestone and been around since October 2010.  Angular is ALSO at 1.0+ and dates back to January 2010.  Dojo is the grandaddy of them all, REACHING 1.0 in 2008.  So, I think it's safe to say all mature, and all are well loved by their communities.

All 3 are geared towards helping you get going to mainly build web applications vs web pages.  Many times this will be single page apps, other times there will be lots of event driven data loading and interaction on the page....very AJAX-ey, or whatever it is the cool kids are calling it these days (especially since the cool kids are using JSON and not XML).

 

## What's bad in all

So, by virtue of just being Javascript, if you screw up something (and you will because you're learning), it will silently fail on you.  All of these are relatively complex systems someone set up.  You have to initialize and use it.  Each come with their own dependencies, and somewhere along the line, you'll want to use one of those dependencies, and it will fail on you.  It's up to you to figure out how you screwed up the initialization of the framework/library.  More often than not, you'll get something like "X doesn't exist", and you have to figure out what you did wrong in the setup such that X doesn't exist.  Errors aren't the most helpful here.

 

## Dojo

Dojo was probably the worst of the pack in terms of unknown setups screwing you further down the line.  However, that's a testament to how damn powerful this package is.  It probably packs the most power out of any JS toolkit I've used, and it comes at the price of complexity.

I would recommend not using Dojo for your one off web app.  Use it for your enterprise! Many libraries are moving towards modular loading, but I think it's safe to say that Dojo had it first.  And as well it should, because it comes with a crazy amount of components and tools.  You definitely wouldn't want to load them all up front.  I believe that most frameworks today will do modular loading, but they seem to make you realize that you are relying on [Require.js](http://requirejs.org/) as opposed to Dojo who advertises AMD, but doesn't really tell you it's Require.js - they seem to kind of brand it as a Dojo thing.

Anyway - Dojo....large amounts of skinnable modular components.  Back when I was trying it out, they were just getting around to a proper MVC implementation.

 

## Backbone.js

Speaking of MVC...holy hell, MVC is like Backbone's mantra.  You're actually extending Backbone's Model, View, and Collection base classes.  So everything, at least the beginner stuff, you see online is really going to push this way at you.  And that's fine - but it's also why I've found that it was hard to get past the concept of a todo app really.

I'm not going to be stupid here and tell you that a todo app is the only thing you can do in Backbone.  Backbone is plenty powerful and can do wonderful things - it's just my opinion that the beginner's material you see when researching seems to not really help you get beyond this simple "list my data" type of web app.

I didn't really care for the lack of HTML or otherwise markup used in the framework.  It largely looks like you're encouraged to work with code and append to the DOM that way.  Let's be honest though, on a large app, after you're settled in, doesn't it end up that way anyway?  I mean, yah, it's nice starting out in HTML - but it starts to get lengthy and messy, and you just wish you modularized your stuff and programmatically did it at the end.  One exception I've found here with Backbone is that people use a <script type="text/template"> tag to contain an "item renderer" for their lists.  Basic idea is that, you load your data into Backbone, and you reference this tag, feeding it to Backbone to render each item in the list.

It's a nice little hybrid of HTML and programmatically adding to your DOM.  Plus if you get bored with it, and want to go all JS, it's easy to break it out.

 

## Angular

Yet, as much as we say it's all gonna be programmatic in the end - I just love markup.  HTML and CSS is the true visual layer in your web app, why pretend and muddy it with Javascript?  Yah....right.....any number of reasons, but none of those you really want to care about when you're starting a project.

That's why Angular rocks for me.  You put a magic ng-app attribute on your HTML or div tag, and you suddenly have an Angular application - one that you can attach a Javascript "controller" script to.   Your views are your HTML views with some extra Angular tags that are understood by the system.  I did forget to mention that this is one of the things I dig about Dojo as well!

So lets say that your ng-app="MyApplication".   Well, write up a "MyApplication" controller.  Other nested controllers and models that you define in HTML are class variables in your controller that you can access.  The scope is just magic here the way it intermixes your HTML and JS variables to one controller scope.  Using the double-curly braces will output a variable to be rendered on your HTML: {{myvar}}.

And yah, it does list rendering with a repeater.  An list item can be repeated over a Javascript array in your scope by saying:

<li ng-repeat="item in mylist">{{item.name}}</li>

So, doing the above will loop through your list and pump out the name property of each item in your list.  Pretty sweet!

And this strikes to the heart of why AngularJS is my flavor of the month.  I wasn't told I needed MVC.  Angular tutorials just give me the tiny pieces I need, and it's up to me to put them together.

Contrast that with Backbone - every tutorial I come across is how to hook up the Model, View,  and Collection to render your data.

Can you do other things?  Obviously, because Backbone rocks.  However, Angular presents "other things" so much better in the material I come across.  Plus, I'm just a sucker for doing my views with markup when I'm starting out a project.

 

## Conclusion

In conclusion, all of this means nothing.  If I did anything for you, I gave you a sales pitch to try each of these things out.  You should try Ember too!  You should find frameworks I haven't tried and try them as well.  Let's just feel good about trying new things, and if you have a favorite, that's cool - but don't think of it is the knockout champion of everything.  Keep your noggin open to all things.
