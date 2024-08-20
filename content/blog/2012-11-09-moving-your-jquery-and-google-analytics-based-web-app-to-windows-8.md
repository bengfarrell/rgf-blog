---
title: "Moving your jQuery and Google Analytics based Web App to Windows 8"
date: "2012-11-09"
categories: 
  - "development"
  - "html5"
  - "javascript"
  - "windows8"
---

There's a lot of Windows 8 hate out on my twitter stream.  Some folks might have problems with its useability, and that's fine.  Some people think the Surface RT will fail, and that's fine too.  I don't agree with any of that, but it certainly is subject to opinion and anyone's guess what the future will hold.

I do want to tell you one fact, and that is that Windows 8 development is a smooth ride.  After doing Flash, Android, iOS, web, and more - Windows 8 is my new favorite.  Maybe I like it because it's brand new and something shiny, but it's definitely a solid, thought out environment for making apps (or rather applications as MS would say).  Hopefully the ecosystem will grow and grow and compel me to make Windows 8 app after Windows 8 app.  But that's anyone's guess if that will truly happen.  Android successfully competes with iOS, but on the other side of things....well there's RIM.  Windows 8 will probably fall somewhere in that wide spectrum.

Given the tenuous nature of whether an ecosystem fails or succeeds, MS has to give us some hook to get us developing apps.  What makes it worth our while?  Well, first of all, it's Windows.  Windows is big....so just by the nature of them being the huge gorilla in the room, they will probably succeed to some degree that makes things worthwhile to developers in the short term.

The OTHER hook is that in addition to XAML/C# that the old Microsoft salts are used to, we also have the ability to develop our applications with HTML, Javascript, and CSS.  This is huge!  I have a music based web app up at [blastanova.com](blastanova.com) and was able to get the thing running in Windows 8 in a matter of hours.  Yes, its a couple weeks later and I'm still being fussy making it a fully fledge "metro" looking app - but the guts were done in a matter of hours by recycling my existing HTML/CSS/JS.

I think this is a big deal.  MS has given us a platform that may or may not be successful, but making applications for it is a pretty painless process.  There were some roadblocks though!  And given how common jQuery and Google Analytics are on our web apps today, its something that we'll all have to work through...so let's get started!

## jQuery

I'm ashamed to say that I don't use jQuery for much besides DOM manipulation/selection and loading data.  Yah, I could probably do this without jQuery, but I find myself finishing a project and jQuery is still there.  I throw up my shoulders and say...."ehhhh, I'd rather not rip this out".  Anyway jQuery works pretty well for this stuff, with just a one problem.

Setting innerHTML fails in Windows 8.  Getting the innerHTML of an element is fine, though.  The theory is that if you inject random HTML into a div, you're doing something unsafe and you better MEAN it.  That's why MS makes you do the following:

_WinJS.Utilities.setInnerHTMLUnsafe(myelement, my content);_

So, since you're using this WinJS specific thing, Microsoft says to itself...."You know, this guy actually means it.  If he's doing unsafe application development here, it's on him....but we tried to stop it." .  I do believe that there is another utility to set the inner HTML, but it doesn't work on dynamically loaded data, so I haven't had the pleasure since most of my work involves loading external JSON data and whatnot.

Anyway, we use the new utility function, but Visual Studio STILL complains at us!  Don't get me wrong, your application still runs, but there is a warning issued:

```
HTML1701: Unable to add dynamic content ' <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>'. A script attempted to inject dynamic content, or elements previously modified dynamically, that might be unsafe. For example, using the innerHTML property to add script or malformed HTML will generate this exception. Use the toStaticHTML method to filter dynamic content, or explicitly create elements and attributes with a method such as createElement. For more information, see http://go.microsoft.com/fwlink/?LinkID=247104
```

Why the warning if we don't use innerHTML?  Well, turns out that if you use jQuery, you are calling it simply by embedding the script.  Deep in the bowels of jQuery, we see this line:

_div.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";_

jQuery just runs this when you embed it.  So, what I've done is grabbed the unminified source, and commented out the line and all is well.  In jQuery 1.7.1, its at around line 1352.  I then saved this unminified source as my special modified version of jQuery and included it in my project.

I had other troubles with jQuery 1.8 - and I never did look into it properly.  1.7 seemed the easiest way to go.

Keep in mind, that there are other ways of updating your DOM that aren't cool either.  jQuery's "append" function uses the innerHTML function under the hood so it's not something that's available to you anymore.  And that's actually just a little annoying, since there doesn't seem to be an equivalent appendUnsafe function in WinJS, so you have to read out the element, do a string append or something similar, and reset the innerHTML using WinJS's utility function.

All in all, that was my only issue with jQuery - maybe there are others, but I didn't encounter them.  It DOES make sense to sandbox this unsafe behavior, so I don't think you can fault MS for this one really.

 

## Google Analytics

Surprise, surprise, another security issue.  So, here's the deal - under normal conditions, you can include JS files in your DOM however you wish.  This isn't a surpise....it just means you deal with Javascript the normal ways that you would on the web.  Include in your HTML, attach programmatically, whatever.

The unfortunate bit is that you can't load an external Javascript file from the web into your project.  Only local JS files built into your application may be run.  This is problematic, because that's the only documented way to load Google Analytics.  To use GA, you include the script http://www.google-analytics.com/ga.js on your page.

There IS a workaround, but it's not incredibly pretty.  Ok, it sucks - but it works.  The WinJS security model is such that you CAN load external scripts if you do it in an iframe.  The iframe is outside the security sandbox, and in theory can't wreak havoc on your application when stuff loads in.

You might be saying, OK smart guy - I'm gonna make an HTML page in my project that hosts Google Analytics, and then have that as an iframe in my application.  Sorry, that doesn't work either.  It turns out that local iframes aren't allowed - they MUST be fetched online with the security sandbox model they have set up.

DAMMMIT.  OK, this is where the workaround starts sucking.  I made my iframe page, put my Google Analytics integration on it, but then hosted it on my website.  So again, to actually use GA, you need to host a remote webpage as an iframe within your locally run application.  But, once you got that in your head, it's pretty straightforward.

Here's my remote file's Javascript (iframe source):

```
            console.log("iFrame GA Initialized");
            var _gaq = _gaq || [];
            var ga = document.createElement('script'); ga.type = 'text/javascript';
            ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);

            function track(event) {
                console.log("iFrame GA Event: " + event.data.join(" | "));
                _gaq.push(event.data);
            }

            window.addEventListener('message', track);
```

So, the HTML file is completely empty, except I put this script in a script tag in the head element of the page.  Now, those familiar with Google Analytics know that there are a few methods to track.  I've chosen the "\_gaq" method especially because it works well with custom events.  In my application, I can do all the setup, initialization work, pageviews, and tracking.  All this script does is take incoming iframe messages, and posts the data to the "track" method.  The data then gets "pushed" onto the \_gaq object.

Again, we don't care about what that data is - the script is pretty dumb and doesn't know about our account, setup, nothing.  In our application on the other hand, we run "postMessage" on our iframe to actually run the nitty gritty of the GA implementation.

In my iframe, used as:

<iframe id="googleTracker" src="http://mydomain.com/gaframe.html" height="0" width="0" onload="WinJS.Application.onGoogleAnalyticsInitialized()"></iframe> ...

...I use the following Javascript (after of course the "onGoogleAnalyticsInitialized" callback handler is fired):

```
            document.frames['googleTracker'].postMessage(['_setDetectFlash', false], "http://blastanova.com");
            document.frames['googleTracker'].postMessage(['_setAccount', self.analyticsID], "http://blastanova.com");
            document.frames['googleTracker'].postMessage(['_setDomainName', 'none'], "http://blastanova.com");
            document.frames['googleTracker'].postMessage(['_trackPageview', "/" + self.appName + "/home"], "http://blastanova.com");
```

Now, a couple important things to call out here...

The "http://blastanova.com" is not something that's important to our Google Analytics implementation, but it IS imperative to our iframe implementation.  This needs to be an http(s) URL or the iframe postMessage will not follow through.  And no, your WinJS document.location will not work here because it's not an http(s) URL.  You will get a DOM Error 12 or something similar.

Secondly, you've probably never heard of "\_setDetectFlash".  This doesn't seem to be widely documented.  But if we take this out, we will get a warning from Visual Studio that we've tried to create an ActiveX object and it was blocked.  The application still seems to run fine, but I wanted to get to the bottom of this.

It turns out, that FOR SOME UNKNOWN REASON, Google Analytics puts a Flash embed on your page.  Who knows why.  The important thing is that Google gives you the power to turn this off.  Do this as the first thing when you interact with your iframe.

Once this stuff is in place, all the Google Analytics calls work fine.  Go ahead use "\_trackEvent", everything will be OK!

 

## But I don't like your Hacky Workarounds

That's OK, me neither.  There are actually other ways to do Google Analytics on Win8.  Unfortunately, they seem to all work only for XAML/C#.  It looks like right now, WinJS is sort of a second class citizen, with the packaged DLL's seeming to come out for XAML/C# as the first priority.  It takes library developers a little extra effort to package this stuff up for WinJS, and sometimes they just haven't done it yet.

[This solution](http://w8ga.codeplex.com/) on MS's open source hub, for example, seems like a perfectly acceptable non-hacky solution.  But, I just couldn't see anything about getting it working on WinJS, so I assume they haven't gotten around to wrapping it that way yet.

 

Anyway, hopefully now you can get these major tools (jQuery and Google Analytics) working for you instead of against you in your Windows 8 application.  Good luck!
