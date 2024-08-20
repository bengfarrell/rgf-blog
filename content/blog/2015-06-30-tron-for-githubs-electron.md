---
title: "Tron (for Github's Electron)"
date: "2015-06-30"
categories: 
  - "atom-shell"
  - "electron"
  - "html5"
  - "javascript"
  - "nodejs"
---

I'm a big fan of Github's [Electron](http://electron.atom.io/) lately. Electron is the underlying tech behind Github's Atom Editor, which they have kindly made open source....YAY!

Electron marries Google's open source browser Chromium, with IO.js (the fork of Node.js). What you end up having here is a desktop wrapper that lets you do all sorts of HTML5 goodness with the power of Node.js which lets you access your local system, run C++, and everything else Node/IO.js does.

To get started in Electron, you'd need to do several things:

- Grab the Electron binaries
- Create some code to run your application and HTML window
- Find some way to run the app (through the terminal targeting the binaries, or by dragging your files into the released package

None of these are that bad, but like any other ecosystem, you need to know how things work and figure out what pieces of the puzzle need to be in place.

Even for me, who is pretty good with how to scaffold an Electron app, I prefer not having to do the same things over and over again - so my needs are similar to those of a beginner, in that I just want a quick way to create and run an Electron project.

I'm also a big fan of [Polymer](https://www.polymer-project.org). The main thing I love about Polymer is how it enforces everything to be a Web Component. You can read all about it's encapsulation model with the Shadow or Shady DOM elsewhere, but I like the fact that Polymer strongly suggests that each component you have is self-runnable. Of course, this isn't exclusive to Polymer, but it's the first time I've really seen self-running components en masse.

So, I've taken some inspiration from Polymer...

What if you can not only run your main project in Electron, but also run any components you want as standalone Electron applications?

With that, let me tell you about my new CLI tool call ["Tron-CLI"](https://github.com/bengfarrell/tron-cli). Tron is a tool that you'd install globally under node like so:

> npm install -g tron-cli

Once installed, go ahead into a new project directory and type the following into the terminal:

> tron create

Tron will download the Electron binaries and create an application folder for you with a fully working dummy application.

To run, you'd typically need to target the Electron executable hidden in the binaries folder and pass in the app folder. I've played around with popping these shell commands into a grunt or gulp file (which is a fine way to go). However, with Tron, you'd simply type:

> tron run

The Application Javascript I provide also accepts arguments via the Tron CLI. So if you wanted to pop open the Chromium developer tools when you run your app, you'd do this:

> tron run -d

And like I said, I'm a fan of self running components. So if you have those, and especially if you've created them with the Yeoman Polymer Generator where the demo files are placed in your <yourcomponent>/demo/index.html, you can demo your component in Electron by doing this:

> tron comp <yourcomponent>

Of course, if your component structure doesn't adhere to this scheme, go ahead and tweak the tron.json file.

Yes, your application may quickly grow into something pretty big and you might outgrow Tron. I am to add more features to the application JS as I need them, but for now this is a good quick way to start an app that you can throwaway or mold as you need.

Tron does a few more good things, but the above is mainly what I'm using it for now in combo with my Polymer projects. To deep dive, go ahead and checkout my [readme](https://github.com/bengfarrell/tron-cli/blob/master/README.md), but in the meantime...it's super easy to get an Electron project up and running with "tron create" and "tron run"!

ALSO...

I did just recently become aware of [Electron-Prebuilt](https://www.npmjs.com/package/electron-prebuilt). Great project - it looks like it installs Electron as a global dependency and allows you to use the CLI tool "electron" to run your app. It will assume nothing about your app and lets you author it however you want. My Tron-CLI is more opinionated with how things are setup and scaffolds and app and dev environment for you based on these opinions. Because of these opinions and application code, it does a fair bit more.

Also, Tron lets you have an Electron install per project, whereas Electron-Prebuilt uses a common one. I wouldn't say that either is right or wrong, just a matter of preference.

Please by all means ignore Tron if it's not right for you!
