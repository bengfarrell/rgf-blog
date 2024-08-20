---
title: "Morph your Media with Node.js Redux - Spawning Processes"
date: "2012-10-03"
categories: 
  - "development"
  - "nodejs"
  - "web"
---

Sometime in September, the [music discovery service I run](http://play.blastanova.com) stopped discovering YouTube music.  It was OK, because the playlist I offer is MP3 only - but I do like to discover new music videos to tweet out and play on my [Codebass Radio](http://codebassradio.net/) [show](http://sharkattack.blastanova.com/).

So, I started looking into it and found this on the Youtube-DL Github repo:

 

### ERROR: unable to download video

youtube requires an additional signature since September 2012 which is not supported by old versions of youtube-dl. You can update youtube-dl with `sudo youtube-dl --update`

 

Grumble, grumble - that explains it....YouTube changed their requests in some way, and now it's ALL BROKEN!  I'd be angry, but Youtube-DL enables something that YouTube doesn't really want, so you really have to expect this going in if you choose to take on a project that downloads videos like this.

I'm extremely impressed with [YouTube-DL](https://github.com/rg3/youtube-dl/) for fixing this so quickly though!  So OK - I thought I'd just do an update and things would be fine....NOPE.  See, while YouTube-DL works awesome now, the [Node.js wrapper](https://github.com/fent/node-youtube-dl) I was using does not work.  Something about it is broken, but checking that git repo again, led me to another project by the same author called ["node-ytdl"](https://github.com/fent/node-ytdl).  This one isn't a wrapper around the YouTube-DL python service...it's alllllll Javascript baby.  Pretty cool, but this one didn't work either.  It created a 0 byte file on my system, but that's about it.

I can't really blame the author of these tools for the brokenness, after all I see the last activity on the repo was about a month ago, and all this YouTube breaking went down sometime in September.  At best, I can only say again that the original YouTube-DL is freaking... way on top of their game.

So what can I do? Well it's time to get my hands dirty in Node.js and step away from the fancy wrappers.  It's time to spawn a damn service myself!  I pulled code heavily from the YouTube-DL wrapper (though I never did figure out why it was broken).

### Spawn a Service

We'll need a couple of requires to work with our external executable...

```
    var spawn = require('child_process').spawn
```

```
    var split = require('event-stream').split
```

Now, "event-stream" doesn't come free with Node.js, so do a "npm install event-stream" before working with it.

And then to launch our Python based YouTube-DL service:

```
    downloader = spawn("youtube-dl",[myyoutubeurl], { cwd: myoutputdirectory } );
```

Let's now add a listener for when it errors, and for when it completes:

```
    downloader.on('exit', function() { console.log("I'm done"); });
    downloader.stderr.on('data', function(err) { console.log("I have an error: " + err.toString()); });
```

And then lets spice it up a little more and add some logging from the service itself.  We need to create that event stream "split" object and pipe our output to it:

```
    downloader.stdout.setEncoding('utf8');
    var line = new split();
    downloader.stdout.pipe(line);
    line.on('data', onLineOutput);
    function onLineOutput(data) {
        if (data.indexOf("[download] Destination: ") != -1) {
             // found destination file
             myfilename = data.substr("[download] Destination: ".length, data.length);
        }
        console.log(data.toString();
    }
```

So in the above method, I'm just logging the line output to the console.  It'll tell me if the file is found, give me some percentage complete info, how big the file is, how long it will take, the file name etc.  I did a little string manipulation to find the filename as you can see about.  It will say "\[download\] Destination: ", and what follows is the name of the file it's creating.

Anyway, that's the new downloader process I created!  It's a little less sophisticated than my last one where I can choose the format I want (low quality, high quality, mp4, flv, or webm), but given that I got burned when YouTube changed their request model - I figure, keep it simple because it will change again...and I'll have to deal with the thing.
