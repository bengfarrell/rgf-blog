---
title: "HTML5 vs Flash Video: Choose Wisely Part 3 - Extra Help with HTML5"
date: "2011-09-07"
categories: 
  - "html5"
  - "javascript"
  - "ui"
  - "video"
  - "web"
---

In part two we discussed a good deal of how to use the video tag and how (if we're ambitious) we can code up our own controls.  We also discussed the fact that the HTML5 video tag might not be an option if you're using an older browser.  And maybe Firefox/OGG video isn't part of your workflow.  In either case, you need to opt out of HTML5 and opt into Flash (or vice versa - whatever floats your boat).

Luckily there are a few projects to help out with that!

**Modernizr**

If simple feature checking is your game, [Modernizr](http://www.modernizr.com/) is a pretty big help.  Simply use Modernizr.video in your Javascript to detect if you can play video.  Modernizr.video.ogg, Modernizr.video.webm, Modernizr.video.h264 will do well to test if you can support the various formats.

**Not Modernizr**

If you'd rather not use Modernizr, you can easily instantiate a new, empty video tag in your document (attached to nothing).  If the video tag object you've created support the "canPlayType" method, then you have a legitimate video tag!

For example:

```
video = document.createElement('video');
video.canPlayType('video/mp4');

```

**No Javascript**

You can also take the no Javascript route.  Kroc Camen setup a nice bit of HTML that does "detection" in a Javascriptless way.  And then Jonathan Neal took it one step further and made a nice little "Video For Everybody Generator" application based on the "Video For Everybody" idea.

[http://sandbox.thewikies.com/vfe-generator/](http://sandbox.thewikies.com/vfe-generator/)

The basic idea is that you''ll hit the video source tags first, and if successful will start video playback on the given source.  If you make it to the Flash object/embed tag, you've failed all HTML5 tests and you get Flash playback!

**Video Frameworks**

The simple stuff leads into the heavyweights.  The Javascript frameworks.  The "Adobe Video Widget" is as good a place as any to start.  You can grab it from the Adobe Widget Browser and add it to Dreamweaver....drag and drop style!

This widget is indicative of quite a number of frameworks out there.  Depending on your preference, it will prioritize HTML5 and fall back to Flash.  Even though it's branded Adobe, the Javascript player and Flash player are both created by a company called Kaltura.

The interesting thing about a lot of these frameworks, including Kaltura, is that when you peruse the source code it seems obvious that they intend you to use these frameworks as sort of a slapdash HTML5 player which falls back to Flash.  In my opinion, many of these frameworks aren't friendly to you digging around and extending things in major ways.

I had previously scouted a few different player libraries for a project - here's my rundown of findings:

- [VideoJS](http://videojs.com/) - A free/open source player in active development.  It doesn't rely on any 3rd party libraries (like jQuery).  It has an easy to extend framework, and gives you several video event listeners that you can tap into.  It seems to work on all the major platforms (desktop and mobile).  Skinning is pure CSS which makes things easy for separation of functionality and design
- [Open Video Player](http://openvideoplayer.sourceforge.net/)   - Free and open source (must retain license info).  The framework is quite extensible, though I did find a bug that I was able to patch.  The project seems minimally active.  It relies on jQuery, and the for custom skinning it relies on Javascript and CSS.
- [Projekktor](http://www.projekktor.com) - Open source, but if you modify the project you are expected to submit your contributions back to the project.  The project relies on jQuery and skinning can be done via Javascript, CSS, and custom HTML tags.
- [MediaElement](http://mediaelementjs.com) - Open source, and it would be swell if you link back to the project if you use it.  It relies on jQuery and uses CSS for custom skins.  The only problem with this project was that I felt that the Javascript API was a little confusing and hard to extend.
- [JWPlayer](http://www.longtailvideo.com) - The JW Player is probably the most popular given it's VERY popular flash player.  Unfortunately it's not free if using commerically, and even worse the cost depends on how many sites you launch this on.  It does rely on jQuery, and you can create custom skins with CSS and also purchase skins.
- [Sublime Video Player](http://sublimevideo.net/) - Another pay player.  The price is based on overall pageviews as they appear to do all the player hosting on their site.  It doesn't seem to rely on a framework, and for custom skinning they do have a CMS.

Given all these options - VideoJS seemed the very best for my purposes.  I didn't want to fallback to Flash since I was doing an iPad site and this was easy to turn off.  I had a fair number of custom features I wanted to implement as well, and it was very easy to tap into it's underlying framework and add new features like advertising and reporting.

What I really dug was the easy of skinning.  It comes with a base video skin along with 3 skins which extend the base skin.  It was quite easy to skin how I wanted!

All in all thought, you probably won't need to go into the level of customization that I needed, so whatever works easiest for your purposes is best - but it seemed to me that VideoJS was helpful right out of the box!
