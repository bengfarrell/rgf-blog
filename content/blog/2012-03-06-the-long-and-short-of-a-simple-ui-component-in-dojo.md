---
title: "The long and short of a simple UI Component in Dojo"
date: "2012-03-06"
categories:
  - "development"
  - "dojo"
  - "javascript"
  - "ui"
---

Understanding Dojo is sorta like understanding Star Wars...you need the entire backstory to be able to figure out what's going on.

On the surface, using Dojo elements are as simple as using HTML.  You sprinkle a little bit of Dojo-ness in the div tag and it works.  Pretty straightforward!

On the same token, Star Wars seems like a pretty simple story of good guy fighting the bad guy to get the girl.  It's only when you get the backstory, you understand why Luke and Leia kissing is kinda gross, and why Vader doesn't want to outright murder Luke.

With Dojo, it's the same deal - if you don't understand the backstory, you're only going to get things working by sheer dumb luck.

Say I Google how to do a simple progress bar in Dojo.  My first hit is this [page](http://dojotoolkit.org/reference-guide/dijit/ProgressBar.html).  I even have code I can copy and paste that looks like HTML!

```
<div data-dojo-type="dijit.ProgressBar" style="width:300px"
     data-dojo-id="jsProgress" id="downloadProgress" data-dojo-props="maximum:10"></div>
```

Unfortunately, if I put this on my page, it doesn't work.  No I'm not dumb, I went to the Dojo [download](www.dojotoolkit.org/downloads) page and copied the script tag they provide in my HTML header:

<script src="//ajax.googleapis.com/ajax/libs/dojo/1.7.2/dojo/dojo.js"></script>

By all accounts, I've done what needs to be done, right?

Not exactly.

First of all, I might be thrown off by Googling "dojo progress bar" and coming up with dijit.ProgressBar.  That's lesson the first!

Dojo is divided up into 3 separate projects: Dojo, Dijit, and Dojox.  Dojo is the center of it all.  In it's (almost) 90kb core, it offers a lot of the same stuff something like jQuery would offer.  The rest of the Dojo namespace has extra things which we can pull in as we need them (more on this in a bit).

Dijits, or "Dojo Widgets", are the UI components to the Dojo team.  ProgressBar, being a UI component, lives here in this namespace.

Dojox features are the more experimental features.  What's here might not be central to the Dojo vision, but pretty close - close enough to be shipped with the rest of Dojo.

What you should understand, is that all of these features put together weigh in at 5.3MB when you grab the zip.  You might say that's too large to include in your project.  You'd be right.

Fortunately you don't have to force this on your users all at once (nor should you).  The 90kb Dojo core is all you need at the start, but as you need the other features of Dojo, you can pull them in realtime.

In other languages this might be an "include" or "import".  In Dojo, it's a "require".  So now the next piece of this puzzle, is to require the progress bar:

```
<script type="text/javascript">
        require(["dijit.ProgressBar"]);
</script>
```

Fortunately for us, we can require the progress bar and anything the progress bar depends on is pulled in automatically because the Progress bar has its own include directives in the component.

So now, we've written the HTML/Dojo markup to include the progress bar, and we've required the necessary classes to support it.  But it still doesn't work!

There's one last piece to this puzzle - the script tag.  If you recall, I did say I wasn't an idiot - I did include Dojo.js here...something like this in my head tag:

```
<script src="//ajax.googleapis.com/ajax/libs/dojo/1.7.2/dojo/dojo.js"></script>
```

If we were simply using Dojo programmatically, this is all we'd need for basic functionality of a component...but we aren't! We're using some nifty declarative HTML markup, so there's one last step.  We need to tell Dojo to scan the tags on the page and look for Dijit components.  We do this by altering our script tag to be:

```
<script src="//ajax.googleapis.com/ajax/libs/dojo/1.7.2/dojo/dojo.js"
   data-dojo-config="parseOnLoad: true">
</script>
```

Telling our script to parse on load, means that when Dojo is loaded, it will scan and register all of our tags.

Fantastic!  Here's what we have so far:

```
<html>
    <head>
        <script src="//ajax.googleapis.com/ajax/libs/dojo/1.7.2/dojo/dojo.js"
                data-dojo-config="parseOnLoad: true">
        </script>

        <script type="text/javascript">
            require(["dijit/ProgressBar"]);
        </script>
    </head>

    <body>
        <div data-dojo-type="dijit.ProgressBar"
             style="width: 300px;"
             id="discoveryProgress"></div>
    </body>
</html>
```

Unfortunately, while our progress bar exists, and it technically works, it's looking kinda silly.  That's because we haven't bothered to load our themes in yet.  Without a theme picked, we get a barebones component which kind of looks like a broken wireframe.

At this point, I'm going to go to my handy [Dojo Theme Tester](http://archive.dojotoolkit.org/nightly/dojotoolkit/dijit/themes/themeTester.html) and pick the Dojo theme that suits me best for the immediate future.  Claro looks good, so I'll use that.  Not only do I need to include the Claro CSS and the Document CSS, but I also need to assign my body tag with a Claro class so that my entire document uses this theme.

```
<html>
    <head>
        <script src="//ajax.googleapis.com/ajax/libs/dojo/1.7.2/dojo/dojo.js"
                data-dojo-config="parseOnLoad: true">
        </script>

        <script type="text/javascript">
            require(["dijit/ProgressBar"]);
        </script>
        <link rel="stylesheet" type="text/css" href="http://ajax.googleapis.com/ajax/libs/dojo/1.7/dijit/themes/claro/document.css">
        <link rel="stylesheet" type="text/css" href="http://ajax.googleapis.com/ajax/libs/dojo/1.7/dijit/themes/claro/claro.css">
    </head>

    <body class="claro">
        <div data-dojo-type="dijit.ProgressBar"
             style="width: 300px;"
             id="discoveryProgress"></div>
    </body>
</html>
```

Now we're rocking! We have a Dijit Progress bar functioning on our webpage. Even though the point of this post is to simply get a UI component onto the page, I really can't leave it hanging at 0%. Let's go ahead and crank it to 80%.

For this, we'll need a bit of script. For the sake of ease, I'm going to ignore all good sense and just put it in action in my HTML script tag.

We're going to change our Javascript slightly - instead of a simple "require" directive, we're going to have it do something after the required thing has loaded.

The simplest form of this is to write the following:

```
 <script type="text/javascript">
    require(["dijit/ProgressBar"], function() {
       console.log("ready");
    });
 </script>
```

There are a couple of cool variations to this require script. First of all, you'll notice that we're requiring an array of Dojo components.  Typically, we'll just want to listen for "dojo/ready" and perhaps a custom script  and start our application from there.

Secondly, you'll notice that we didn't pass in any parameters through our function.  Each index in our require list corresponds to each function parameter.  So I could do the following:

```
    require(["dijit/ProgressBar"], function(ProgressBar) {
```

See, when you require something, the parameter that comes through in the function is the constructor for that component.  We can instantiate this object from this parameter!

However, what we REALLY want to do is tweak the progress bar we already have.  So we need to find the existing progress bar on the page.  You'll see two references in the Dojo docs to "byID".  One is dijit.byId, the other is dojo.byId.  The rule of thumb here is that if you want a reference to the DOM element, you would use dojo.byId, and if you want a component reference use dijit.byId.

Unfortunately, this is allllll old news in Dojo 1.7!  It's very confusing - but this way of selection is in lots of basic documentation!  Now, we use the "dom" object to find something in the DOM, and the "registry" object to find something in Dojo's component registry.

We're going to need to step up our game here, and require the "dom", the "ProgressBar", and the "ready" component.  In this way, it's kind of a lot to ask and checklist for basic setup, however once you get rolling, I PROMISE it gets easier.

Our new script tag reads:

```
        <script type="text/javascript">
            require(["dojo/ready", "dijit/registry", "dijit/ProgressBar"], function(ready, registry){
                ready(function() {
                    var myWidget = registry.byId("discoveryProgress");
                    myWidget.update({ maximum: 100, progress: 80});
                });
            });
        </script>
```

Here, we require all these necessary components.  We then hinge the usage of our script on when dojo is "ready" and has loaded all that we required.  We get a reference to the HTML declared component through the registry.  From there we can update the progress bar as we want!

A full working example is here:

```
<html>

    <head>
        <script src="//ajax.googleapis.com/ajax/libs/dojo/1.7.2/dojo/dojo.js"
                data-dojo-config="parseOnLoad: true">
        </script>

        <script type="text/javascript">
            require(["dojo/ready", "dijit/registry", "dijit/ProgressBar"], function(ready, registry){
                ready(function() {
                    var myWidget = registry.byId("discoveryProgress");
                    myWidget.update({ maximum: 100, progress: 80});
                });
            });
        </script>
        <link rel="stylesheet" type="text/css" href="http://ajax.googleapis.com/ajax/libs/dojo/1.7/dijit/themes/claro/document.css">
        <link rel="stylesheet" type="text/css" href="http://ajax.googleapis.com/ajax/libs/dojo/1.7/dijit/themes/claro/claro.css">
    </head>

    <body class="claro">
        <div data-dojo-type="dijit.ProgressBar"
             style="width: 300px;"
             id="discoveryProgress"></div>
    </body>

</html>
```

So there you go!  A functional progress bar.

![progbar](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2012/03/progbar.png)

It's unfortunate we had to go through such a long journey and learn so much to get to such a basic state - and that, I think, is Dojo's biggest weakness.  If you choose to power through this initial learning and setup phase I really think you'll find Dojo to be absolutely fantastic.

There will be the moments when you bang your head on the desk because you missed something really stupid or the Dojo docs weren't clear enough, however once you get into the rhythm of writing the code, it's a fun and productive toolkit to work with.

I hope this post and future ones will help with that!
