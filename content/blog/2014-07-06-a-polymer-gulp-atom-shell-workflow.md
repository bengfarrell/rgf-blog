---
title: "A Polymer + Gulp + Atom-Shell Workflow"
date: "2014-07-06"
categories: 
  - "atom-shell"
  - "gulp"
  - "javascript"
  - "polymer"
tags: 
  - "atom-shell"
  - "gulp"
  - "polymer"
  - "web-components"
---

Polymer has been on my mind for a while. I've been quite happy plugging away with AngularJS, however a co-worker of mine mentioned to me that AngularJS just wasn't present at Google I/O with some uncomfortable looks from Polymer presenters when asked about Angular. Given the recent social media blitz of Polymer and Material from Google with a strong set of components and documentation at http://www.polymer-project.org, I thought it was time to give it a strong and serious look.

At this point, I couldn't even call myself an early adopter - more like a late-early adopter. I think we'll see a strong showing from AngularJS for at least another couple of years, but certainly Google seems to be putting its money on Polymer right now to build the platform at a pretty fast clip. As web developers, we should probably expect to be happy with Angular for another good year or so until the next-gen Polymer vs Angular battles force us to make a hard choice at where to take our skills next.

Certainly, you can't bet on Polymer taking over - Google has a number of projects that just failed to take off. However, Polymer isn't just about useless buzzwords, it actually seems to have some nice structure behind it. So, I thought it would be nice to give it a shot!

 

### Polymer

[Polymer's](http://www.polymer-project.org/) biggest win for me is the idea of loosely connected components (web components). Web Components don't have to be tied to Polymer, but for the purposes of this post (and my lack of exploring outside of Polymer) I'll call them one and the same.

Components can take the form of anything from a simple button, to a scrolling area, to a layout, to an entire application. In fact, for ease of use in the Polymer platform - you really should make everything into a component, no matter how large (your larger components will likely have lots of component dependencies). It enables some nice HTML hooks (like creating your own custom click handlers on elements). In addition to using some nice Polymer features, having everything be a component means that you can test things individually very nicely.

In fact, if you use Yeoman, you can scaffold out new Polymer components very nicely. Using **yo polymer** inside a new component directory will use the Polymer component seed to make your blank component as well as a demo harness to test out your new awesome component! Normally I never use Yeoman, but in the context of Polymer, I now use it all the time.

So yah, web components are pretty awesome. Testing individual components? Also awesome. When you are able to test each component individually instead of having to click through your end application to test the thing you want to test, it speeds development up a lot.

 

### Gulp

[Gulp](http://gulpjs.com/) is another tool I'm definitely not an early adopter on, but I figured I'd give it a shot! I'm not unhappy with Grunt as a task runner, but everyone seems to think highly of Gulp. So I figured I'd give it a shot while I learn a few other techs. Yet another co-worker says the speed of Less compilation with Gulp is enough to make him a convert , so I say "YES, I WANT TO TRY IT PLEASE!". For the purposes of this post, however, you could easily do the exact same things in Grunt, just with a slightly different syntax.

 

### Atom-Shell

Ok, as much as I'm not an early adopter of those other two, I jumped on [Atom-Shell](https://github.com/atom/atom-shell) as quickly as I heard it was open-sourced. Atom-Shell is a desktop wrapper for your HTML/JS/CSS based applications, offering a seamless way to inject Node.js code right into your application. Technically it's Chromium Embedded Framework with a bridge to Node.js. This means, as a very base-level example, I can do direct file-manipulation using Node's "fs" module. It's as easy as requiring the package in your front-end code and using it, just the same way as you would in your NodeJS application. You can mix browser based code with NodeJS code, and obviously it doesn't stop at file manipulation. In theory, most everything you can do in Node can now be done in Atom-Shell. In this way, it's similar to Node-Webkit.

 

### Workflow

Does Polymer work in Atom-Shell? Yes. Seems to work quite well so far. However, Atom-Shell has a main entry point: main.js. Inside this Javascript entry point, you will likely tell it to launch an HTML page for your application:

```

app.on('ready', function() {
// Create the browser window.
mainWindow = new BrowserWindow({width: 800, height: 800});
mainWindow.loadUrl('file://' + __dirname + '/index.html' );
```

Meanwhile, Gulp can be set up to launch Atom-shell and hit this entry point to launch your application. First, you can setup a Gulp task to download Atom-shell for you:

```

var downloadatomshell = require('gulp-download-atom-shell');

gulp.task('downloadatomshell', function(cb){
    downloadatomshell({
        version: '0.13.3',
        outputDir: 'binaries'
    }, cb);
});
```

Of course this requires you to install gulp-download-atom-shell via NPM first. But once that's set up, you can run the task with gulp, and an instance of Atom-Shell will appear in your project under a "binaries" folder.

From there, we can set up another Gulp task to launch an instance of your Atom-Shell application. For this, we'll just use the Gulp "shell" command, which you need to use NPM to install "**gulp-shell**". This command will vary from OS to OS. What I'm showing is something that works on Linux and will most likely work on OSX. The shell command will vary on Windows, where you'll need to reverse the slash and point to an atom.exe instead of just atom.

```

var gulp = require('gulp');
var shell = require('gulp-shell');
var downloadatomshell = require('gulp-download-atom-shell');

gulp.task('downloadatomshell', function(cb){
    downloadatomshell({
        version: '0.13.3',
        outputDir: 'binaries'
    }, cb);
});

gulp.task('demo', shell.task([
    'binaries/atom default_app'
]));

```

So here, we can launch our atom shell application using "**gulp demo**". This assumes your Atom-Shell app resides in a folder called **default\_app**, but you can change this to anything.

Now, the problem here is that we are using a single entry point! Remember how awesome I said Polymer was for pretty much forcing you to have loosely connected components all with their own demo pages? It would be a shame to lose this! Originally, I thought that maybe I should just leave the components to be tested in browser while the entire app itself would be tested as an Atom-Shell app. This doesn't work out to well as we scatter NodeJS code that doesn't work in a browser throughout our components. So, I wanted to figure out a way to test each component inside Atom-Shell.

To accomplish this, I start with Gulp, and pass an additional argument to Atom-Shell:

```

var gulp = require('gulp');
var shell = require('gulp-shell');
var downloadatomshell = require('gulp-download-atom-shell');

gulp.task('downloadatomshell', function(cb){
    downloadatomshell({
        version: '0.13.3',
        outputDir: 'binaries'
    }, cb);
});

gulp.task('demo', shell.task([
    'binaries/atom default_app'
]));

gulp.task('democ', shell.task([
    'binaries/atom default_app components/' + gulp.env.comp + '/demo.html'
]));

```

So here, I've added a "**democ**" gulp task - shorthand for "demo my components". I pick up an argument from the command line and pass it through to Atom-Shell. Here's how I launch it from the CLI: "**gulp democ --comp myawesomecomponent**". When the argument value "**myawesomecomponent**" is passed, you can probably see that Atom-Shell is launched with an additional argument: **components/myawesomecomponent/demo.html**. Assuming you've been using bower or generally following Polymer's best practice component organization, this is the path to your component's demo file!

Next, we have to go inside our main.js file (Atom-Shell's entry point) and use some basic NodeJS code (nothing to do with Atom-Shell, really) to accept the argument and launch the appropriate page:

```


    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 800});

    // and load the index.html of the app.

    var startpage = 'index.html';
    if (process.argv.length == 3) {
        startpage = process.argv[2];
    }
    mainWindow.loadUrl('file://' + __dirname + '/' + startpage );

```

So here, we have some simple routing of our "startpage". If that argument is present, Atom-Shell will load a different HTML file that's not our application. In context with our Gulp task, we see that Atom-Shell loads our custom component demo page!

### One problem, but hopefully one of few

It would appear that Atom-Shell works a bit differently than a browser. I'm not sure whether the fault lies on Polymer or Atom-Shell or what. In one instance in my application, I have "paper-tabs": basically just a tabbed navigation. Each tab can fire a click event. When receiving that click event in Chrome, I can look at the event.toElement.id to figure out which DOM element the click event is coming from.

```


                <paper-tabs selected="0" flex style="max-width: 600px;" bottom indent noink>

                    <paper-tab id="play_tab" on-click="{{onTabClick}}">Play</paper-tab>
                    <paper-tab id="library_tab" on-click="{{onTabClick}}">Library</paper-tab>
                    <paper-tab id="sources_tab" on-click="{{onTabClick}}">Sources</paper-tab>
                    <paper-tab id="tasks_tab" on-click="{{onTabClick}}">Tasks</paper-tab>

                </paper-tabs>

...the Javascript:

        onTabClick: function(event) {
            // note that parentElement is necessary for Atom-Shell, but is not used for web (dunno why)
            this.fire('tabclick', {id: event.toElement.parentElement.id});
        },
```

So what's odd here, is that in the browser, event.toElement.id will give me back an element ID of "play\_tab" or any one of the other 3 tabs. In Atom-Shell, it will return "tabContainer" which is a child of my paper-tab and hidden inside the shadow dom. So in Atom-Shell, I need to look at the parent element, and get that ID.

Not too much trouble, but what other weirdness will Polymer bring to Atom-Shell? I don't know but so far, it's pretty awesome, and I'm glad I have a workflow down!

### Edit:

In my haste, I neglected to remember that my "One Problem" above is not really a problem. I had completely forgotten that toElement is an obscure IE property. I had thought that it might be something new in Polymer. Instead, using event.currentTarget.id in my example works just fine. Interesting difference in behavior, but not one to worry about. Even better, even though it was a stupid issue, the Polymer team tracked it and closed it very quickly: [https://github.com/Polymer/paper-tabs/issues/9#issuecomment-48226899](https://github.com/Polymer/paper-tabs/issues/9#issuecomment-48226899)
