---
title: "Managing your Polymer Project with Git, Bower, and Yeoman"
date: "2014-07-22"
categories:
  - "javascript"
  - "polymer"
  - "web"
---

I've been working more and more with Polymer lately and trying to establish some workflows that make sense. For those that aren't familiar with [Polymer](http://www.polymer-project.org/), it's essentially a set of polyfills that enable you to work with those fancy things called Web Components even though browsers don't generally support them yet.

All the Javascript frameworks/tools/libraries I've used to date are fairly simple to manage. Your Javascript is over in one place, your CSS in another, and your HTML/templates in another place. This kind of setup enables you to structure each piece separately and exactly how you want. For example, in an Angular project, I like to have a "scripts" folder. In that folder we could have more subfolders: "controllers", "directives", "services", and more. If your project is particularly complex, maybe you'll have subfolders to organize your directives better. Regardless of how you organize things, you'll probably just concat/minify in some sort of build step - or play it loose and just have tons of script blocks in your HTML file.

![Screenshot from 2014-07-21 22:02:58](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2014/07/Screenshot-from-2014-07-21-220258-e1406005541236.png)

Above you can see a simple AngularJS application structure, with perfectly organized Javascript. I'd say my CSS styles are equally organized, but this project is fairly tiny, so I just have one medium sized CSS file in that styles folder.

This may be what you're used to, but think about the following:

Let's say I'd like to edit things relating to my game's scorecard. You can see the controller in scripts/controllers/scorecard.js. But what about the template it uses? Or the style? How would you locate related media? Well, it's not THAT difficult, but would involve you digging through some code to find out what CSS styles it uses, what HTML templates it uses, and what directives it uses. You could be reaching into a lot of different organizational structures to track down how to make edits to that single scorecard piece.

If you know Angular well enough you and your team might agree on some best practices, and what I outlined above isn't that difficult. But what if you've never seen Angular before? What if your team doesn't agree on a structure and goes off and does other things?

Any workflow can go badly - but consider Polymer/Web Components for a bit. Each "component" is a standalone piece that contains it's own HTML, it's own CSS, and it's own Javascript. Breaking each piece of your application down into a simple component means that you can easily see and group a chunk of functionality by a component folder. No more hunting for what CSS controls your style on your HTML view - it's right there in the same folder. A component can be as simple as a button, and get as complicated as a entire application. Both examples are simply components, though your application component might import and depend on your button component and lots of other things.

Lets take a good look at what a component is comprised of. This is a good time to bring in Yeoman and let that be your guide.

 

## Yeoman

Normally, I'm not much of a Yeoman user. On Angular projects it tends to give me lots of stuff I don't need and have to throw it out. It's like getting a Dell computer and having to get rid of all the awful garbage they pre-installed. I kinda feel the same way about Yeoman. When I first start with a tech like Angular or ThreeJS, Yeoman can give me a nice starter application to help the learning curve. However, once I feel competent, I tend to throw out Yeoman completely. Of course, Yeoman saves you some time when starting your project. Often times, it can be a little difficult to remember all the nuances you need to start something. But, me - I'll just rely on past projects and copy relevant bits over. If I started new projects ALL THE TIME, then yes, I might make my own little Yeoman generator.

Here's the thing with Polymer: You are starting tiny little projects ALL THE TIME. Every new component you make is like a tiny project! Thankfully, the Polymer Yeoman generator isn't like a Dell loaded with garbage. It produces a nice slim project full of only the bits I care about! Let's take a look at those bits to get a feel for what a component is:

![Screenshot from 2014-07-21 22:33:56](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2014/07/Screenshot-from-2014-07-21-223356-e1406007319451.png)

So, here's a component I made. But I didn't create a single file here! Just filled in code where I needed (mostly in my HTML file). First I created the folder, named it "sa-libraryview" (I'll discuss my naming in a bit), and then went into the folder and ran **"yo polymer"** from the command line. The generator saw the name of my folder and made my component have the same name. It also wired up all my HTML and CSS as a blank (but functional) component. The sa-libraryview CSS and HTML are obviously the functional pieces of my component. It's where I put the logic and styles.

The demo.html file is pretty sweet. Components are used by popping the component as a tag on a page. So, testing your component by loading up sa-libraryview in a browser probably won't work. The demo.html page, though, is auto-generated and includes your component tag on the page. So, right away...without doing anything...you get a free demo page! YAY. You might argue that a bower.json file, a gitignore, jshintrc, and others aren't STRICTLY necessary - but they are tiny and do more good than harm especially if you are doing a good job managing each component as a separate project. Please please please use your README file as well! It's great for documentation.

The only thing I couldn't figure out why it exists, is the index.html file. I was gonna cop-out and just say it's unnecessary. Each and every index.html file just includes one component...something called "core-component-page". I finally just decided to load up the file in my browser. It honestly never occurred to me to bother trying because I expected a blank page. BUT GUESS WHAT?!?!

![Screenshot from 2014-07-21 22:54:00](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2014/07/Screenshot-from-2014-07-21-2254002-e1406008608336.png)

A whole entire documentation page is generated on the fly from my component! It comes complete with a demo button that links to my demo page. If I had done a better job with code comments, I'd have all my attributes, properties, and methods inline here...alllll looking awesome.

Cool, so that's a component generated from Yeoman. Specifically, it uses the Polymer component seed that the Polymer team created.

So, where do all these components live?

 

## Git & Bower

So, here's the thing... I recall reading somewhere on the Polymer website that the Google engineers who work on Polymer don't actually use Bower all that often. I'm not certain what their workflow is like, but it could be symlinked/aliased component folders. That's certainly one way to do things, and probably one very friendly to working on a big component set that spans multiple projects. Me though? I'm just working on a single project that pulls from existing Polymer "Core" and "Paper" components that can be pulled down with Bower. I'm also creating my own components that are very specific to my project and I probably won't reuse.

Bower is weird though, right? It's a very flat structure. All of your bower dependencies are placed into a folder and not nested. Once you start working with a few Polymer components, the dependencies start to pile up. Your component folder becomes pretty lengthy. It would be nice to organize all my "paper" components in the paper folder, all my "core" components in a "core" folder. But, no - that's not how Bower works. In fact, it doesn't seem to be how Polymer wants to be! In each of those Polymer components, if there are dependencies, it will link to it's dependency one level up in a relative manner.

Here's an example:

Paper-Button depends on all of these things (they are links from the paper-button.html):

```

<link href="../polymer/polymer.html" rel="import">
<link href="../core-icon/core-icon.html" rel="import">
<link href="../paper-focusable/paper-focusable.html" rel="import">
<link href="../paper-ripple/paper-ripple.html" rel="import">
<link href="../paper-shadow/paper-shadow.html" rel="import">
```

So, unless you manually go in and alter the source - Polymer is always looking for it's dependencies in the same relative spot. If you use Bower, everything that gets pulled in will all go in the same folder - the components folder you list in your .bowerrc file. That's fine, I guess. Why fight it? Except for the fact that that I'm counting 41 Polymer components in my folder now! These are mostly UI elements that are handy to have in my project. To make things more manageable, most are prefixed with "core-" and "paper-".

The prefix makes working with your own components a little better. Given that I'm not going to register each of my project specific components with Bower, AND they need to live side by side with the Polymer components because of the linkage, I need a way to manage both my Bower managed components and my Github managed components in the same folder! This is where the prefix and our .gitignore comes in handy.

 

## Gitignoring the Bower stuff and checking in my stuff

Probably the best thing to do is pick a project prefix. My project is called SharkAttack, so the prefix is "sa-". Every single component I make is called "sa-this" or "sa-that". They all live side by side with the "core-" and the "paper-" components that Bower pulls in for me. I'd like to leave all my Bower components alone, and be able to commit any "sa-" components to Github. So....let's use our handy .gitignore file and ABUSE the wildcard.

My **.gitignore** file:

```

components/polymer
components/font-roboto
components/core-*
components/paper-*
components/platform

.idea
binaries
node_modules
```

Since most Polymer component are prefixed, I can simply use the wildcard and Gitignore all components that start with "core" and all that start with "paper". I have 3 other miscellaneous ones, but it's not bad to have a few extra lines. Of course I ignore my WebStorm IDE files, my node\_modules, and my Atom-Shell binary files (but that's specific to my project).

Yep, so here we have a solution to our bower components and out custom components living side by side. Woot! This is just one possible workflow. If you have a better one, go ahead and leave a comment!
