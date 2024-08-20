---
title: "A Supervisor for Node.js"
date: "2013-09-30"
categories: 
  - "development"
  - "javascript"
  - "nodejs"
---

So, I'm writing this blog post because, despite how simple a concept the "Supervisor" is - I feel like I could have easily missed this super handy tool. In fact, I might go so far as to say that if I hadn't had co-workers push the Python supervisor on me - I would have had a problem I just wouldn't quite know how to solve.

Last February, I started learning Python because I had some downtime at work (front end dev wise) and I had an interest to get into the server side tool all of our devs were using. It was a fair bit to take in...Python was a new and fairly different language than what I was used to. It turned out fairly enjoyable.

Anyway - there was lots of stuff thrown at me, making CentOS VMs, administering Unix, all that stuff. You know, that stuff that doesn't have much to do with programming - but the environment/platform itself. In the midst of running learning how we have our own package manager in company for locking down Python Eggs, the "Supervisor" was thrown at me out of the blue.

At first I thought it was some half cocked idea our developers put together in-house. What is this thing? Why do I need it? I just want to code some Python! I truly wanted to ignore it, because I never had a good idea what it was setting out to accomplish - plus it had some separate config files...just ick.

In the end though - I finally understood it. Once I got past the code, and got things into production - only then was the time it was really needed. See...a supervisor process will run alongside your code or server. If it goes down, due to an error you didn't forsee, supervisor keeps tabs on it, and will just start it up again. Just log the error for viewing later - with the important thing being that your server or your process stays up.

Months later, I found myself with my first Node.js/Express webserver project that I wanted to make sure it stayed up. Yes - I could make DAMN sure to test, test, and test. Make sure no errors happened to bring down the server. Despite my resolution of no fatal errors (yeah, right) - I looked into the Python equivalent of supervisor for Node.js. Yep - I found one. It's called [Node-Supervisor](https://github.com/isaacs/node-supervisor).

Simply do a global NPM install and then start your project with it:

```
npm install supervisor -g
supervisor myapp.js
```

From that, we have a nice little process that monitors your Node.js app. If it goes down due to fatal errors, your script will get started right back up. The HUGE bonus to this is that I'm always iterating my project. My version number will keep going up as I add more to my project. That's the other benefit here....If I do a git pull, then a checkout of my latest branch/tag, supervisor will restart my Node app with the latest version.  No hunting and killing the process, no restarting manually. Just pull and checkout, and the latest is instantly running.

All thanks to Supervisor.

Again - feels simple. Feels like everyone in the world already probably knows this. But me, not being a fully focused server side dev - well I might have easily missed this. A problem I might not have known I had, with a solution I wasn't really looking for. But there it is...Supervisor is pretty sweet!
