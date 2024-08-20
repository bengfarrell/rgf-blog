---
title: "Node.js with Jenkins"
date: "2012-05-26"
categories: 
  - "development"
  - "javascript"
  - "jenkins"
  - "nodejs"
---

I've been messing around a lot with Node.js lately. The project I'm working on finally reached the point of being useful. As such, I need a stable build to work with and do my bidding.

I've gone ahead and made a release branch of my work in Git. And yes, it's easy enough to switch to my release branch on my dev machine and make a build - but all the same, I already have a copy of Jenkins up on my home server, so why not use it!?

But using Node was uncharted territory for me in Jenkins - plus I'm not making a "build", I'm just running my Node.js script to read some RSS feeds and download content (OK it's more complicated than that, but that's the gist).

Luckily, there is a [Node.js plugin](https://wiki.jenkins-ci.org/display/JENKINS/NodeJS+Plugin) for Jenkins. It's easy to find and install from the Jenkins management page.

Once it's in there, how can we use it?

EASILY! Under "Add build step", you can choose "Execute Node.js script". Once you select this, you have a text area to type whatever Javascript you'd like to execute. Go ahead! Type console.log("hello world"); and give it a whirl. The build will execute, finish, and output "hello world" in the Jenkins log.

Waaaaaaaaait a second. I can do whatever I want? What about file system stuff? Yep....all your fs.whatever commands work. I was taken back a little by this - I had been sort of planning to use [Apache ANT](http://ant.apache.org/) to kickoff a Node.js task all along, but what's the point? I can bypass ANT altogether and directly have Node do my work.

Thinking about the implications of this, maybe I don't use ANT anymore for anything? Maybe I write a Node.js script to do the leg work of my build even if it's not a Node.js project. I like ANT, but markup can get a little unweildly sometimes, and I might rather script.

Anyway, back to what I was doing - my Node.js project. Like I said, my project reads some RSS feeds and downloads files. Now, how do I kick this off? Well it's as easy as requiring my file. My main Node.js file starts all the tasks I need, so requiring this file starts the job.

So, in my Node.js/Jenkins text area I can type: `discovery = require(process.cwd() + "/BuildAssetLibrary.js");`

Now, apparently there's a ["process" object](http://nodejs.org/api/process.html) in Node.js. I didn't know that going in, but it sure did help getting the current working directory of the process. This does the trick for pointing to my Jenkins workspace and running my JS files.

Another thing to note when running a Jenkins task is to make sure you kill the process when you've done what you need to do. Normally in my dev environment, my task finished on its own, but I'd been noticing recently that it left itself running and doing nothing. Maybe that's my fault, maybe it's just a fact of life running a Node.js task. In the end, I found it helpful to run:

`process.exit(code=0);`

...and end the process. It's pretty important to make the task end, otherwise Jenkins will always be running it and never let you know when what you really want to do is done!

Now, here's the other thing - I have some Node package dependencies in my project. [Node Package Manager](http://npmjs.org/) (NPM) is sweet for grabbing all of these dependencies. Once it's installed on your Jenkins machine, you can use it to grab your project dependencies based on your needs that you've outlined in your package.json file.

Here's mine: `{ "name": "SharkAttack", "description": "music feed aggregator", "author": "Ben Farrell ", "version": "0.1.0", "dependencies": { "feedparser": "0.9.x", "jsftp": "0.2.x", "request": "2.9.x", "sax": "0.3.x", "http-get": "0.3.x", "xml2js": "0.1.x", "youtube-dl": "1.2.x" }, "engine": "node >= 0.6.x" }`

So, with this package file, all I have to do is run "npm install" and this package is read and the dependencies are fetched. I can do this by adding a build step in Jenkins right before my Node.js build step. My build step will be "Execute Shell". And the command I give it is simply "npm install".

So, in order:

1. Grab my files from Git and build my workspace
2. Build step "Execute Shell" - run "npm install"
3. Build step "Execute NodeJS Script" - run any Javascript here in the text area

One last thing - I build a static config.js in my project. It's been helpful to centralize some major setting in my project like output folders. Since my build machine is different than my dev machine, it's even MORE helpful to have this configuration file. I can require the config.js file, alter any settings, and then run my Node.js project with the new settings.

Here's my complete Node.js build step in Jenkins:

`config = require(process.cwd() + "/config.js"); config.directories.output = "/media/blastanova"; config.directories.assets = "/media/blastanova/assets"; config.directories.shows = "/media/blastanova/shows"; config.directories.show = "/media/blastanova/shows/SA001";  discovery = require(process.cwd() + "/BuildAssetLibrary.js");`

Awesome right!? Needless to say, I'm happy to have Node.js in my Jenkins arsenal and it may turn out to be a handy ANT replacement if I have a need that arises!
