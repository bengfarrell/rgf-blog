---
title: "Did HTML5 and Mobile Kill the Volume Slider?"
date: "2012-10-24"
categories:
  - "design"
  - "development"
  - "html5"
  - "ios"
  - "javascript"
  - "ui"
  - "web"
---

Seems so simple and obvious doesn't it? If you make a media player, whether audio or video, you should include a volume slider.....right?

Now that I'm developing web apps that extend onto the mobile screen, I got the feeling that a volume slider wasn't needed.  I couldn't quite articulate why - but it was along the lines of the fact that you have a physical volume switch in your hands already as you hold the device, so you get tactile control.  I also had in the back of my mind that I wasn't seeing so many volume sliders anymore, especially on mobile - but couldn't back that up with actual facts.

But, as I'm working on my daily music playlist web app at [http://play.blastanova.com](http://play.blastanova.com), I do like to get user feedback.  I took an informal twitter poll asking people if they think volume sliders in their media players are necessary, or if they clutter things up too much.

Two people responded, both saying that volume sliders are better than no volume sliders.  So OK, I know when I'm beat!  It wasn't my opinion, but I would certainly give it a shot and see how it worked.  I could always throw them away if it's horrible!

So, I set off to work.  Interestingly enough, I wasn't quite sure how to begin.  I had a few options that I knew of.  The first was to use a plugin like jQuery UI.  Problem is, I was only using jQuery - not the bloat that is jQuery UI yet.  To be fair, it was only bloat because the proposition is to include a ton of extra crap in my code JUST to get a slider to work.  Luckily I can pare down what I need in my custom jQuery UI library through the [builder](http://jqueryui.com/download/).  That's just what I did - for a time.  I got a slider working, even custom styled it chopping away block after block of unnecessary CSS from my style.  Eventually I got something a little bloated, but not horribly so.

Then I thought to myself - "Damn, you're basically doubling the size of your project to include a UI element that you aren't even sure you need!".   OK, lets think second option - writing a slider from scratch....ummmmm....no.  While I do enjoy UI challenges, I don't enjoy creating commonplace UI components from scratch.  If I needed to invest the time and effort, that would be one thing, I'd suck it up and dive in.

Last option - the range slider!  OK I actually forgot about this one.  As far as I'm concerned, the only new HTML5 elements worth talking about are the canvas, video, and audio tags.  So, its easy to forget something this unsexy.  Fine though, let's look into this and see how it works.

It turned out quite easy to pop in - though I did want it to be vertical.  After Googling for some time, I could see no other option than doing a CSS rotation transform on the slider.  Using CSS3 seems pretty overkill and weird for this.  I had some trouble positioning it with the rotation rules applied, but eventually got it where I wanted it.  Of course, after i did that, I decided a horizontal slider in a different spot on my page would work better visually after all.

Last stop was styling the slider.  Eventually I got something with a round thumbnail with a trough that looked something like this:

![volume](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2012/10/volume.jpg)

The HTML was pretty simple:

```
<input id="volume" type="range" value="80">
```

And the CSS used a webkit vendor prefix:

```css
input::-webkit-slider-thumb {

       -webkit-appearance:none;

       width:30px;

       height:30px;

       -webkit-border-radius:30px;

       border-style: solid;

       border-color: #1a1a1a;

       border-width: 1px;

       background-image: url("../images/vol.png");

}
```

Fine, now how about Firefox? Does that work?  Lets test in that.... BOOM!  Nope, doesn't work.  Well, that's PROBABLY because I have a Webkit vendor prefix on the thumb and it's just breaking down entirely.  OK, to Google in search of customizing our range slider for Firefox!

Well, after some searching, not only does Firefox not support range slider customization, but it doesn't support the stupid HTML5 range slider at ALL.  Great, well, I did all this work...let's just add in the volume slider, hide it in Firefox, and see how I live with it on the page.  Let's see if I like it at least in Chrome.

I sat with it for a few days.  I never really found myself reaching for it.  Usually, I'd just reach for my computer volume (hardware or software) to turn my entire system down.  But eventually, I was on a mobile device, and wanted to test it out and see if it worked.

So....the slider worked, but it had NO EFFECT ON THE VOLUME!!!  I swear, every time I turn around, something annoying pops up with this.  I went full on "TAKE COMMAND MODE", and went and installed the Android development tools on my system for the first time.  I rigged up Chrome debugging over USB so I could view my console log, DOM tree, and all the Chrome goodies I could get right on my desktop.  I expected some red text in my console indicating a Javascript error.  NOPE, completely silent.

Fine...let's Google "HTML5" and "set volume mobile" (which I should have done in the first place).

Turns out....well [this](http://stackoverflow.com/questions/9752983/setvolume-for-html5-audio-doesnt-work-on-mobile-android-or-safari-any-workaro).

Both iOS and Android's version of HTML5 don't support setting the volume on video or audio elements.  The iOS page specifies that you may use the hardware switch to decrease and increase the audio of the system.

.....And we're back to square one.  It would seem as if I had the right inclination all along on mobile.  It's expected that users will adjust audio physically on web pages.  Of course there is the unfortunate side-effect that you are controlling all applications on your device at once.

Now, if I am making a similar experience on the desktop, do I include audio adjustment?  Well, it might be a good idea to match the user experience from one to the other.  So a easily recognized feature like audio that is usually placed next to your main playback controls is hard to miss when it's there on some experiences but not others.  It would be one thing if we just NEEDED TO HAVE IT.  But we don't.  As a feature that is on the chopping block already, keeping a consistent user interface is a good reason to leave it out on the desktop.

And then there's the ease of implementation.  Holy crap, it's like you're either doubling your project size with jQuery UI or taking on a second job to do it from scratch.  Or you know, just make it work on webkit only.

After all this, you start to wonder if it's really that important - and i'm beginning to think it's just not worth it....to anyone.  Maybe I should just kill it from my project.  I might imagine folks are doing similar things and finding it's better to leave it out.  So is it dead yet?  Did workflow and capabilities kill the volume slider on the web?

As a last note...the slider seems alive and well in native apps.  I'm watching Netflix right now on my Galaxy Tab 10.1.  I typically leave it charging when I'm watching Netflix.  So, while it's in landscape mode and charging (with the charger sticking out the top), the device itself actually rests on the side where the physical power button and volume are.  As such, when I watch Netflix, the physical volume is completely inaccessible.  I'm not sure about the iPad, as I don't have a fancy case for it yet.

And wouldn't you know it - Netflix has a nice little horizontal volume slider :)
