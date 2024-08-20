---
title: "Painting with Chrome's WebSpeech API"
date: "2013-04-03"
categories:
  - "development"
  - "html5"
  - "nui"
  - "ui"
  - "web"
---

A while back, when Chrome 25 was still unreleased, I tried out the beta version.  I was directing my attention at the "WebSpeech API".  It failed MISERABLY.  I don't know if the ambient noise in my room was having a bad day or what, but I spoofed their "Writing your Dad a Message" video that Google put out.

[/blog/2013/01/31/i-wrote-my-dad-a-letter-with-the-webspeech-api/](/blog/2013/01/31/i-wrote-my-dad-a-letter-with-the-webspeech-api/)

But that's all in the past - I'm blown away with how it works now.  True - if you have a good deal of ambient noise in your room, it looks like Chrome has a hard time differentiating between you and the background noise.  Given a relatively quiet environment, or if you're up close to your microphone, it works magnificently.

I liked it so much, I created a little painting demo with it and a Kinect like depth camera.  You can still use your mouse to paint in my demo though - so even if you don't have a Kinect working over websockets or the like, it's still functional!

I set up several keywords that the WebSpeech API listens for: red, green, yellow, purple, blue, orange, and black.  These voice commands are to switch colors.  I also added a "start over" command to clear the canvas.  Lastly...invoke "Bob Ross" for a little surprise!

Chrome listens to your speech, chops it up, and sends requests over to its servers.  You'll get back "interim" speech and "final speech".  Interim speech doesn't make too much sense as you see it.  It's putting together it's best guess at phrasing as you go along, picking out the words it can without paying much intention to intended meaning.  The "final" speech comes delayed by a second or two.  Chrome things you're finished speaking, and it waits a tick to make sure.  Then it puts together it's thoughts and gives you something final.  It's probably going to be grammatically correct and nicely accurate.

Some of the shorter commands you'll need to enunciate.  It has a big problem when I say "green" sometimes, but honestly, when I'm making voice commands, there's really no context in my grammar to pick up on.

I went ahead and wrapped up the WebSpeech API for Chrome 25 in a little Javascript library.  I allow you to add commands to listen for along with callback methods to call when those commands are spoken.  I also allow it to "keepAlive", which means if Chrome thinks you've stopped talking for good, I go ahead and start the speech API right back up.   I also event out the surrounding words with a command if you care to make something like "search" a command and want the words that we spoken after it.

You can checkout the library I made here (its in a repo I made for motion/gesture control as a demo to add speech to the mix):

[https://github.com/bengfarrell/node-sweatintotheweb-examples/blob/master/activities/common/js/speechrecognition.js](https://github.com/bengfarrell/node-sweatintotheweb-examples/blob/master/activities/common/js/speechrecognition.js)

 

One annoying, but understandable thing is that to allow the Web Speech API to work, the user has to click to allow the microphone.  This needs to occur every time you start the API.  There could have been an error, or it could simply think you're done talking - then when you go to start it up again, the user needs to click to allow.  Bad for natural interaction if you'd like to keep it running and listening at all times on your page.  GOOD if you don't want web pages spying on you!

You can work around this by serving your page over HTTPS.  If you're secure, then Chrome allows you to always remember the option if the user so chooses.

It's a very cool feature that I hope the rest of the browsers adopt soon!  I wouldn't mind dropping the HTTPS requirement though in favor of something else!

For my horrible Bob Ross impression AND demo, [check out the video I made here](http://www.sweatintotheweb.com/?p=83)!
