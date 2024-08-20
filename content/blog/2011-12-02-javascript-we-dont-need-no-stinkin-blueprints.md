---
title: "Javascript: We don't need no stinkin Blueprints"
date: "2011-12-02"
categories: 
  - "development"
  - "javascript"
---

So, at this point I feel like I'm a competent JS developer. Not pro, just competent. Since I can't just let things lie there, I'm reading "Secrets of the Javascript Ninja" and trying to get a handle on what Javascript, and even a functional language mean as you work with them.

One of the biggest complaints I have so far is the openness that the language allows. It sounds stupid I know, because why wouldn't it be a good thing to allow you to do anything you want?

Well, I like to learn by doing. After I "do", and finish one or two projects, I start to question the underlying ways of doing things, and I learn.

I'm not the type to read about the building blocks for several weeks, and say "Hmmmmm.....I understand these building blocks, now is the time to code".

Nope! I just plow through - it's OK I don't understand the fundamentals, if I'm following a best practice, then I can trust that the best practice is correct and learn as I go.

Coming from Actionscript, I obviously want to be more object oriented. I've finally grasped that there's no good way to emulate this without something like John Resig's Class construct: http://ejohn.org/blog/simple-javascript-inheritance.

That's fine, but it took me a while to accept this. After all, Javascript is pretty much object-oriented, why is it such a chore to make classes and extend them in an OO fashion?

I had to take a big step back to think about what languages like Java and AS3 do to make them what they are. The big difference, I found is NOT that Javascript lacks OO features, but that it lacks blueprints/definitions.

Blueprints are one of those things that have always been there for me, but I always took them for granted. Also known as definitions, they sit in around waiting to be spun up as an object in memory.

These blueprints basically serve as a model for how, once you instantiate the object, what it will look like and how it will function after you call new MyBlueprint().

You can let a blueprint know what properties and methods it's supposed to have. You can also say that BlueprintX extends BlueprintY (inheritance), and it implements the same type of methods as IBlueprint (an interface).

It's all very convenient, and gives a good model of how to structure your code. It also sits in the background, lying in wait to be spun up. I'm assuming that it doesn't cost anything at runtime besides the memory to store the text of the class.

Anyway, it seems that Javascript doesn't have the notion of a blueprint! The only thing close to a blueprint is the base Object. Apparently, the only blueprint in Javscript is stored in the Object.prototype property. You can't define any thing extra before your browser instantiates! Oh well. It's just something to accept and move on, but it really was a major mental block for me in how the language functions.

Instead, when you need to create a blueprint like thing, you create whatever you need at runtime. Javascript allows you to create a base object, set whatever properties you want on it, and then manually clone it to other types of things.

So you can certainly create something that you'd like to use as a blueprint, but you are instantiating this model at runtime as a normal everyday object. It resides in memory like any other object. It's just that YOU, the programmer decides to use it as a blueprint - so you make the decision to clone it, extend it, mix it with other inheritances, etc. All manually.

No big deal, but like I said, the lack of a formal blueprint model was a real head scratcher for me, and it made me think about what I was missing and was taking for granted in every other language I've ever used! My initial knee jerk reaction was to say "Javascript isn't OOP", but that's not true - it just doesn't need any stinkin blueprints.
