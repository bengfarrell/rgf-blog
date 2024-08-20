---
title: "Javascript Continuous Integration with Google Closure"
date: "2012-05-14"
categories:
  - "dojo"
  - "html5"
  - "javascript"
  - "web"
---

In less than a week, I'll be speaking at [cfObjective](http://www.cfobjective.com/)!  Why am I psyched about this, when in fact I don't use Adobe's server side tech Coldfusion at all?  Well - see, cfObjective features a whole track dedicated to Javascript...they dub it [jsObjective](http://www.cfobjective.com/schedule/jsobjective/).  Looks like I'm up there with some fantastic speakers!

If you're short on time, already saw my preso, or whatever... here's some demos I showed:

[Using Type Enforcement with Google Closure and JSDoc style comments](https://github.com/bengfarrell/cfo-typeenforce)

[Using a Two-Pass Compilation Process to heavily compact your code but leave things like jQuery intact](https://github.com/bengfarrell/cfo-typeenforce)

Lastly, here's my [presentation slides](https://docs.google.com/presentation/d/1_tEFa7CU1Dgt52H73jDmAOc6WxJBELukQzMKo9xgSNQ/edit)

What is this that I'm speaking about? Well I'm talking about a workflow I adopted when working on some fairly large or fairly complex applications.  I'm used to workflows where I can create a project with many files - all organized to work towards a company library.  This works great when you compile everything down to a binary - but not so well with Javascript when we aren't in the practice of doing so.

With Javascript, you write it and run it.  While it can be pretty easy to tweak and then refresh the page to view your work, it's not the best for my workflow because when I complete a project I might have 10, 30, 50, or even more Javascript files that are in use in my project.

Without any sort of compilation process, we're talking about tons of separate file requests, a large bloated `<head>` tag full of `<script>` tags, and a fairly decent thrashing on our browser and server.

So, why not compile our JS?!

### Spacebag

Have you ever heard of [Spacebag](http://www.spacebag.com)?  Basically it's a product that features a clear plastic air-tight bag.  You put your clothes in there, suck out all the air, and your left with a flattened bag that takes up much less space.  It's easy to carry, organize, store, etc!

To me that's just like Google's Closure!  It takes your Javascript... all the different files you have...puts them together, and compresses it all down to be one tiny, organized, packaged file.  You can easily email it, send it to a friend, and use it on multiple projects or websites.

### Google Closure

What exactly IS Google Closure?  It's rather unfortunately named actually, but only because there's two other Clo(j/s)ures in our web development world.  First there's the concept of a [Closure](http://en.wikipedia.org/wiki/Closure_(computer_science)).  It's commonly described as a function in a function, but there's more to it than that.  Worse, Closures are very core to the Javascript language, which makes working with Google Closure a little confusing.

Then of course there's [Clojure](http://clojure.org/) - a language that runs on top of Java.  Lots of people love the functional syntax of Clojure, and it seems to be the new hotness in the same vein as Python, Scala, and Ruby.  Clojure even has a [Javascript port](https://github.com/clojure/clojurescript) which even further muddies up the Clo(s/j)ure waters.

Google Closure is a set of tools used internally on many of Google's project which have been open sourced to the wider world.  In my presentation, I focus on one particular aspect - but to cover it all, here goes:

- [Closure is a Library](https://developers.google.com/closure/library/) - Much like jQuery, Dojo, Sencha, Backbone, Angular, etc...the Closure Library is a set of widgets, UI components, and utilities to help you create an awesome web application.
- [Closure is a Templating Engine](https://developers.google.com/closure/templates/) - These templates can work on the client or server, in Javascript or Java.  The idea is that you create a template, it gets consumed by the templating engine, and this enables you to create reusable UI widgets.  Not having used it, I can't say for certain, but it does look like an attractive alternative to tweaking/styling currently existing UI widgets that something like Dojo or Sencha would give you.
- [Closure can do Stylesheets](http://code.google.com/p/closure-stylesheets/) - I'm not a big fan of LESS or SASS, but there seems to be a movement in our web development world to create stylesheets with logic.  That is, you take your existing CSS, and add conditional logic, variables, loops and more.  Google can take these logic laden GSS files and compile them out to CSS for use on your site
- [Closure is a Linter](https://developers.google.com/closure/utilities/) \- Linters are pretty cool.  Javascript lets you do a lot of things - good or bad.  They might break your application or not.  Some browsers might forgive these things, others might not.  You can even add some comments that dictate what your variable types are, and the Linter will listen.  Linters look at all of this stuff, and warn you about your mistakes.  You can choose to ignore if you want, but it's usually a good idea to not ignore!
- [Closure is a Compiler](https://developers.google.com/closure/compiler/) - The compiler is the thing I want to use, and the compiler can encompass all of the above.  Basically I want to take my 50 files, make them into one, and shrink things down (minify).  Yes, I want to run the Linter in the process, please!  The compiler will work with the Library and Templating Engine....hell, it would probably work with most ANY library and ANY templating engine!

### Lets Compile!

Let's look at some of the different ways to compile your JS via Google Closure:

- **Whitespace Only** - This is the least complex, safest way to go.  When you do whitespace only, you're essentially just minifying your Javascript. This means that your many files get compiled into one file.  Also, all unnecessary whitespace is removed.   This creates a lean, mean, easy to load file for your web application.  It's only one file so you aren't blocking tons of images from loading while you wait for your 50 js files to load.  It also shaves your filesize down.  That 15kb file you have that used to be 80kb, might not SEEM like that much savings, but it can save you and your users precious bandwidth.  It also makes your code unreadable.  This is good if you'd rather not have people stealing your intellectual property (unless they figure out that [JS Beautifiers](http://jsbeautifier.org/) exist), and can be bad if you're trying to debug code on that website you launched.
- **Simple Mode** - This is "Whitespace only" mode PLUS some.  So it does everything that whitespace mode does, but it also starts renaming your variables!  This sounds worse than it is - but it can still be a little terrifying to trust.  In this case, Closure will analyze your code.  If it sees local variables and methods (those that can't be accessed outside of the scope), it will rename them.  Your variable named "reallyAwesomeVariableThatTellsMeIfSomethingIsTrue" will be renamed and shortened to "a".  This is pretty cool because it encourages you to use expressive and clear variable names (hopefully not as expressive as my example), but also gives you the benefit of a small compiled file.  Again, it can get harder to debug your code in production if your variables have had their names changed!
- **Advanced Mode** - So this is the MOST terrifying of all the modes.  This mode will do "Whitespace only" + "Simple mode" + MORE!  It will get rid of your whitespace and rename your local variables.  It will in fact, rename ALL your variables.  And it will cut unused code - reducing your code to it's bare minimum logical essence.  I don't prefer to use this mode because in addition to going farther with things than I really need, I prefer to create Javascript libraries.  These standalone packages, when they get compiled, my page will not be using most of the code - or maybe even all of the code.  So, like you might expect, I'd end up with nothing.  There are things that you can do to enforce the parts you want to stay - but that's overkill to me.  I want simplicity especially for my smaller projects.

To see the compilation in action, go ahead and try out the [Compiler Service web page](http://closure-compiler.appspot.com/home).  Even just using the example they have setup on the page is illuminating!

### Linting and Documentation

A side effect of the Linting is the warnings that the compiler will output for you.  You can choose to ignore them if you like, but they can be pretty useful.  I left a semi-colon out once that would have made IE fail, and the Linting caught it saving me from hours of frustration.

You can go further though.  Using JSDoc markup lets you type your variables, methods, and parameters.  As you probably know, Javascript is not a typed language.  This means that I can have a variable "var myVar = something" and put whatever I want in there...a string, a number, an object, whatever.  Javascript won't complain.  Compare this to a typed language where "var myVar:int = something" is used.  Here, if you set "myVar" to a string and it's expecting an integer, your code will likely produce an error.

It can feel a little freer to be able to put whatever we want in, and it is!  However, a lot of the time you're using one variable as one type of thing.  If you accidentally pass another type of thing to that variable you might get unexpected behavior even though it doesn't crash.

For example x = y + z where y=1 and z=1 would make x = 2...right?  Well what if y="1" and z="1" (strings)?  This would concatenate the strings and make x="11" - Not what you were probably looking for!  Javascript wouldn't alert you that you were doing something funny here, but you can use JSDoc to make some comments that y is an integer, and so is z:

```
/** @type {number} */
```

```
var y = 1;
```

```
/** @type {number} */
```

```
var z = 1;
```

This type of notation wouldn't be picked up by Javascript, so wouldn't affect your code performance at all (it's just a comment after all).  It WOULD get picked up by the Linter.  If you passed one variable of type number to a method that only accepted strings, you'd get an error!

Check out this [GitHub repo](https://github.com/bengfarrell/cfo-typeenforce) for a demo

Here's a little bit about the different types of comments you can use:

[https://developers.google.com/closure/compiler/docs/js-for-compiler#types](https://developers.google.com/closure/compiler/docs/js-for-compiler#types)

Another side effect of using JSDoc is that you can also use the JSDoc Toolkit.  This is a separate process which is outside of the Google Compiler, however since you've already done the work of marking your code with JSDoc, you can automatically use the toolkit.  Basically, this is another "compilation" process.  It doesn't change your code - but it does read it, and create some nice HTML based documentation for you that describes how your code works.

The Google Compiler strives to follow the JSDoc Toolkit specs exactly, so you can be sure that what you comment will work in both the Google Compiler and the toolkit at all times.

Go ahead and check out my examples on Github - they all generate JSDocs!

 

### Running the Compiler

This theory is all well and good, but how to we actually run the compiler?  The Closure Compiler is a Java JAR, so you can use the compiler commands against the JAR file, but I'm not one for memorizing commands and constantly typing.

Instead, I like to start with an ANT file.  Apache ANT is a Java based build tool.  It automates our process.  We tell things how we'd like to build using an XML like syntax, and then run the ANT build file.

My very first Closure Compiler project was a [music synthesizer](https://github.com/bengfarrell/synth.js) that builds some music theory off of the awesome [Audiolib.js project](https://github.com/jussi-kalliokoski/audiolib.js/).

Anyway, here's my ANT build file that both compiles my project and builds documentation around it using JSDoc Toolkit:

[https://github.com/bengfarrell/synth.js/blob/master/build.xml](https://github.com/bengfarrell/synth.js/blob/master/build.xml)

Why stop there though!?  We have a decent build script in place.  To use it, just type "ant" into your command shell in the project directory.  ANT assumes you mean to use "build.xml" as your build script and goes on it's merry way creating your build.

What if I don't want to use the command shell, but wanted to use a nice web interface to build my project?  Well that's where [Jenkins](http://jenkins-ci.org/) comes in.  Jenkins is a "Continuous Integration" system that runs task from a web application shell.  What's so "continuous" about it?  Well that's the cool part!  Jenkins, in addition to offering a simple one-click button to run your build, can integrate with SVN, GIT, and other source control management tools.  We can tell it to run our Javascript project every time somebody checks in new code.  If the Google Linter fails, it will produce an error, marking the build as broken.  The person who broke the build, and anyone subscribed, will be notified immediately what actually happen.  It's pretty sweet!

![Screenshot at 2012-05-13 21:47:40](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2012/05/Screenshot-at-2012-05-13-214740.png)
*Output from a Successful Jenkins Build*

### Beyond Simple Compilation

One thing I started getting into after getting a handle on Google Closure was [Dojo](http://dojotoolkit.org/).  Dojo is interesting because it's an awesome toolkit, but makes the compilation process a little bit complicated.  Some of the more modern and grandiose frameworks like Dojo are based on [Require.js](http://requirejs.org/) or something like it.  What Require aims to solve is code dependency on the fly.

Say I have some code which automatically launches a pop-up panel.  My panel will have a bazillion dependencies - and I don't want to include them as separate script tags in my HTML header.  I also probably don't want to compile it into a huge Javascript file that I load at the start of my project.  What if I don't use this panel right away?  Why not load the Javascript when I need it?

Require.js does just that - when you require a dependency, it will check if it's loaded.  If it's not loaded, it will load it then use it.  Dojo is heavily based on Require.js so we can talk about both at the same time here.

So you can leave things alone here, and not use a compiler at all.  Tons of scripts will just load on demand, and I'm sure many projects are done this way.  You can be smarter though!  Dojo has it's own build process to handle smarter loading.  You can group Javascript files and functionality together into what's called "layers".  You would then load these layers on demand as you need them.

For example, if you had an address book in your application and also a stock widget - you might group all of your address book Javascript files and widgets into an "addressbook" layer.  Likewise with the stock widget.   Since you don't use the stock widget at the same time as the address book (and you might never use the address book at all) it makes since not to load these modules until you need to use them.

Require.js will function the same way - it will load up the dependencies.  However, now, the dependencies just happened to be packaged up differently.  Require.js and Dojo still knows where to look though!

But wouldn't it be a nightmare to have to know which files have which dependencies?  If those dependencies have other dependencies, and so on and so on?  The Google Closure compilation process requires you to know which files to package - but with Require.js you just don't know the files you need unless you spend hours and hours researching every little bit of your code and framework you use.

That's why Dojo has it's own builder.  You tell the build profile which files you want in which layers, but the good thing is that you don't have to worry about dependencies - thank goodness.  The Dojo builder will figure out all of that for you.

But it all comes back full circle!  The Dojo builder uses either the [Mozilla Rhino compiler](http://www.mozilla.org/rhino/) or the Google Closure compiler (whichever you choose).

It gets a little complicated when you get into Require.js, but the Google Closure stuff is pretty easy when you keep it simple.  Check out my examples on github to gander at my build scripts and setup!

[https://github.com/bengfarrell](https://github.com/bengfarrell)
