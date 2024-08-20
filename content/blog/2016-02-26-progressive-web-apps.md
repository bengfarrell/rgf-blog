---
title: "Progressive Web Apps"
date: "2016-02-26"
categories: 
  - "android"
  - "development"
  - "ios"
  - "javascript"
  - "web"
---

Last Friday, the SFHTML5 Meetup group [met to discuss something called "Progressive Web Apps."](http://www.meetup.com/sfhtml5/events/227789480/) I had some preconceived notions that the topic would be pretty cool, but actually, it got me more excited about the state of mobile/web/desktop in 2016 than I could have imagined.

This might sound a bit dramatic, especially given the negative tone that Alex Russel (@slightlylate), the speaker, started off with on the mobile web. Despite being negative, he was spot on, and the talk was a real eye-opener for us who have been working on the mobile web for so long that we forget how much it sucks.

And yes, it does suck. A good point was made that every other mobile platform started out mobile. No vendor has ever really proposed, "OK, let's take this UI platform, along with everything that's ever been built with it that works on the desktop with mouse and keyboard, and dump it on mobile." Nobody did that until it came to web browsers. It's amazing that things work as well as they do right now.

Alex then took us through an exercise of asking for hands up on who used a web-based email client on the desktop. Around 95% of our hands raised. When the question was reversed, "Who uses a web-based email client on their mobile device?" the result was exactly the opposite.

Why does the mobile web suck so much? The folks that have given "Responsive Web Design" (RWD) a shot can't be blamed for this problem. The rest of the web community...if you want your stuff to work on mobile, it's time for a redesign.

Even with RWD, some mobile redesign love, and the MOBILE FIRST! mantras we shout, the fundamental user experience with the mobile web, as it is now, will never compete with those for mobile apps. It's probably not because HTML/JS/CSS is slow. Yeah, native can be faster, but if you think about it, most apps you use really don't need speed. If you don't agree with me, tell that to all the app developers using Phonegap, Cordova, or even just a plain WebView for their entire products.

So speed isn't the issue for most apps. Touch, screen orientation, and size don't need to be an issue if the web team cares enough to address them. No, to compete with your typical mobile app, design comes down to how the browser itself runs and loads the page.

Real, installed apps have two pretty big advantages over mobile apps:

- Once installed, the user can jump to the app from the home screen.
- Even with no network connectivity, the app can still work or at least pretend to work.

There's a 3rd advantage, and that's push notifications: messages from the app that appear in the notification area even when the app isn't running. I think that functionality is big-ish, but unless you have a significant base of users addicted to your app (think Facebook), it isn't as big of a deal. Smaller guys and gals are just trying to develop a neat app.

Progressive Web Apps attempt to solve all of that missing functionality, and they do so in a way that doesn't _necessarily_ interfere with the current way we develop for the web.

## Step #1: Invade the Home Screen and look like an app

Tackling the first issue of putting your page on the mobile home screen is pretty important. How the application is displayed, both on the home screen and when it loads, is part of that experience. To solve it, use the "Web App Manifest"! It's a JSON file linked from your HTML head that allows you to define things like app icons, fullscreen display, splash screen, and more.

This is the point when I should confess that I haven't worked with Progressive Web Apps yet. Luckily for me, this isn't a "how-to" article. So for great details on how-to do this stuff, run an easy search, or for your convenience, read this [nice technical article via MobiForge](https://mobiforge.com/design-development/web-app-manifests-usher-new-wave-progressive-apps-to-your-homescreen).

Either way, the idea is that if a user visits your page often enough within a certain time frame, the browser will ask the user if he or she would like to place the page on their home screen. Or, the user can simply add it to the home screen from the options menu in the mobile browser. That's light-years better than having to open the browser, remember the URL, and load the page. I'm sure it's a huge reason apps are winning on mobile right now.

## Step #2: Be an app even when offline

Secondly, we have "Service Workers." They sound nerdy and boring, and maybe they are, but the potential they open up for appifying a webpage is huge. Basically, you'd use a Service Worker to intercept a specific set of resources as the webpage fetches them. Yes, if the user is offline that first time they want to access the page, they're outta luck. However, when they _do_ intercept these resources with a connection, they'll be cached. You, the developer, control which files get cached via a Javascript array in the code. On subsequent loads, even if the user is offline, the page can load with your cached assets, whether they are images, Javascript, JSON, styles, or whatever. [Here's a better technical description](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers) of how that works.

In fact, Google has published documentation and some tools on the similar notion of an ["Application Shell Architecture"](https://developers.google.com/web/updates/2015/11/app-shell?hl=en) wherein persistent assets that don't change can be cached, but dynamic content that isn't cached will update.

## What does this mean and will it all work?

Probably the most exciting thing about Progressive Web Apps is that both the Manifest and the Service Workers will not affect the web page negatively if the browser doesn't support the features. This means that the worst you can do is waste time and JS code on something that doesn't pan out as you hoped.

And there is some danger that it won't work. You may have noticed that Facebook today uses push notifications with Service Workers and that they _do_ increase engagement on their site. So that's a win! Unfortunately, Service Workers and the Web App Manifest aren't supported everywhere. Unsurprisingly, that means they're pretty much everywhere but iOS/Safari. Even worse, browser vendors on iOS can't use their own web engines to support the Progressive Web Apps -- under the hood, both Chrome and Firefox have to use Safari tech.

Apple seems tight-lipped about whether they intend to adopt Progressive Web Apps at all. I'm going to say that for now, it doesn't matter. If you've hung around the SF Bay Area enough, you may have noticed that many companies operate on an "iOS first, Android distant second" agenda. That doesn't make sense in that Android devices far surpass iOS devices in sales. But it _does_ make sense, in that iOS app sales are greater and it can be daunting to develop apps for the large ecosystem of Android devices on the market.

However you slice it, Android is second for developers, which is bad for consumers. Right now, many companies will adopt a Web + iOS + maybe Android strategy. If they can combine the Android + Web strategy with Progressive Web Apps AND not force folks through the Google App Store, it'll be a huge win for everyone. I'm guessing Google probably doesn't even care much about having an app store, save for the fact that it was necessary to maintain a mobile ecosystem.

Meanwhile, the point was made at this Meetup that with every additional step a user must go through to download an app, there's around a 20% dropoff rate. Think about how many steps there are in clicking an app link, going to the store, starting the download, waiting for the install, and finally opening the app -- many apps are losing out on users. And let's face it, the app gold rush is over. There are some lottery winners still, but most apps are too costly to make and market to justify what they bring in return.

Progressive Web Apps short circuit that whole process by eliminating app discovery and install. While Android users will enjoy a huge user experience win, Apple will most likely try to maintain their stranglehold on their app store and come kicking and screaming only once web devs demand these new features.

What's more, and what I'm really excited for, is our return to disposable digital experiences. Hate Adobe Flash or not, it really created a heyday for disposable experiences: Flash games to play a couple times and get bored with, nifty digital playgrounds, etc. It's way harder to convince someone to download an app than it is to go to a webpage and pop it on their homescreen until they get bored of it in a week.

To extend, I think Progressive Web Apps will also be a huge boon for web-based Virtual Reality. Immersive experiences will come from many different places and frankly, will not be wanted as a permanent app install. Already, we're seeing the rise of VR portals like MilkVR because smaller, one-off VR experiences need some kind of entry onto a device. When Progressive Web Apps make WebVR easier to get before eyes than an app portal, VR will win big.

To reiterate, I think Progressive Web Apps are the next big thing for mobile, potentially replace lots of simple apps, and will mark the return of fun, disposable experiences. I don't have the technical experience with these new tools to back me up yet, but I will soon. Don't take my word for it, though! Read up on it and try it yourself.

Here's another post from the aforementioned Alex Russel: [https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/)
