---
title: "I wrote MY dad a letter with the WebSpeech API"
date: "2013-02-01"
categories: 
  - "development"
  - "javascript"
  - "ui"
  - "web"
---

Sometimes technology can be so exciting, but then turn out so....meh.

I was extremely excited to checkout the brand new WebSpeech API in Chrome 25 Beta.  The promise of talking to your computer on a webpage sounds freaking awesome - especially after I saw this demo:

 

 

Pretty cool, right?  So I decided to send my own dad a letter.

The demo didn't turn out...the best. I've actually never downloaded a Chrome beta before, and thought I needed to download Chrome Canary (v26) to try out this upcoming feature. That ALSO didn't work the best - plus the browser crashed after I finished most recordings.

Before recording the letter to my dad though, I spent some time actually working with the speech API, and despite how well it DIDN'T work, it was quite easy to use.

First you initialize and set a couple of parameters:

```
var spx = new webkitSpeechRecognition();
spx.continuous = true;
spx.interimResults = true;

```

The continuous value basically seems to mean that as you speak more, it continually corrects the output based on context.  And interim results mean that it will give you spur of the moment "What we think you said" even though you haven't finished speaking yet.

I then set up some event handlers, and start...

```

spx.onstart = function() {
console.log("Start");
final_transcript = "";
interim_transcript = "";
}

spx.onresult = function(event) {
for (var i = event.resultIndex; i < event.results.length; ++i) {
if (event.results[i].isFinal) {
final_transcript += event.results[i][0].transcript;
} else {
interim_transcript += event.results[i][0].transcript;
}
}

}

spx.onerror = function(event) {
console.log(event)
}

spx.onend = function() {
console.log("End");
console.log(final_transcript);
console.log(interim_transcript);
}

spx.start();


```

 

It functioned quite well in theory.  I'd start it up, as I was speaking, it would send out my interim result and final results via a JSON object (which was kinda complex to look at, but I can understand the complexity if they are giving all of this info).

But the results were...again....meh.   It only understood me 10% of the time, and of those times I had to speak verrrrry slowly.  The other times it seemed to have results that rhymed or skipped words or just plain didn't even come close.

Google Chrome's implementation doesn't even do anything locally - instead it sends out info about your speech over the web, processes it on their servers, and sends it right back to you.  One would assume that it works the same way as the AWESOME MAGIC that is Google Now on Android phones/tablets.  Seriously, THAT speech input rocks my world.  I wouldn't have had such high hopes for Chrome 25 if Android didn't work so crazy well.

Perhaps it's a microphone difference?  I had mine cranked and test levels prior to calling it a day.  Maybe it's noise/echo cancellation on the phone?  I don't know - but on my Windows 8 box with the built in Lenova Ideapad mic (which sounds fine to me), it just didn't work out.

My dad's response, BTW, was only one word:

_Huh???

\-----Original Message----- From: Benjamin Farrell To: My dad Sent: Thu, Jan 31, 2013 8:40 pm Subject: hi dad

Keeps getting better hi dad email area now I have no excuse to not raining Solis_

I was hoping for a stronger close to this little gag, but I guess that will suffice.  Another "meh", just like the WebSpeech API.
