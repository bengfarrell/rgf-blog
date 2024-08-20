---
title: "Fun with Geolocation and the FourSquare API"
date: "2013-08-08"
categories:
  - "angularjs"
  - "development"
  - "javascript"
  - "ui"
  - "web"
---

I'm on a race to get some blogging done before my lovely wife and I embark on a weeklong car trip to move to California. Sure I can do some on the road, but I definitely want some screenshots for this post, so here I go!

I'm been mixed up with 3D sensing all year - speaking at conferences, writing a Node.js plugin, and doing some interaction experiments. My weapon of choice has been my handy Asus Xtion Pro Live, and I just got a Leap Motion.

Net effect - I know where my fingers and body parts are at all times.

The thing is, we all have something similar in our pockets for body tracking - it's a little less exact, but it's also almost universally available to those of us with smartphones. Of course, I'm talking about the GPS. If you can imagine interaction on a much larger scale than in your living room, you can make some pretty fun interactions using  what is essentially a 3D sensing mechanism that tracks a single point...you!

## Javascript and your GPS

I had done some Android/Java based experiments previously - and in all honesty, they are much like what you get with your web browser and Javascript. That's probably because the hardware itself and hardware API has pretty specific set of touchpoints.

You'd think it were simpler, but the options are there to get as specific as you need while trying to conserve your user's precious battery. I had made the initial mistake in my application to use navigator.geolocation.getCurrentPosition() and running that on a timer not realizing that there is a navigator.geolocation.watchPosition(). The "getCurrentPosition" according to the [Firefox docs](https://developer.mozilla.org/en-US/docs/WebAPI/Using_geolocation) is quick and lazy. It is supposed to get you the current position as fast as possible without worrying too much about accuracy.

This is great for doing something quick to get a single location to tell where you are once when you load a map. Your phone PROBABLY has some reasonable approximation of where you are in the last several minutes from either your wifi or GPS - and it can pinpoint you on a map.

Both set and watch provide 3 parameters: the success callback, an error callback and options.

For me, I wanted to watch the user as they walk around with a high degree of accuracy. So I used watch.

 

```
    var geo_options = {
        enableHighAccuracy: true,
        maximumAge: 5000
    };

    navigator.geolocation.watchPosition(mysuccesscallback, myerrorcallback, geo_options);
```

The options were key as well - I'm asking for a high degree of accuracy, and I'm telling it to discount any location results greater than 5 seconds old. YES - this will suck up your battery, be forewarned.

 

## FourSquare

OK, so....we get a few things back in our "mysuccescallback". Most importantly, we get a coordinates object with latitude and longitude. We also get an accuracy number in our coordinates (to tell you how many meters your results might be fudged). I haven't worked with these numbers - but I do believe we get a heading and elevation number as well.

Now, latitude and longitude numbers are cool and all, but I'd like to know what's around me as well. Any interesting locations?

We can make a call to the FourSquare API with `https://api.foursquare.com/v2/venues/search?ll=<your latitude>,<your longitude>&oauth\_token=<your auth token>&v=<a version date>`

So, above, latitude and longitude are easy enough to surmise (we just talked about them)? What about an auth token? What about the version date?

Sadly enough, Foursquare isn't COMPLETELY open for everyone to just use willy-nilly. You need to sign into your account as a developer and make an app:

![foursquare](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2013/08/foursquare.jpg)

 

When you make an app, it will give you a client ID and secret (no you can't have my secret). Also, very important is to include any and all redirect URLs that your project will go to actually use the service for your app.

Basically, what you might do is to create a link that the user will click on:

https://foursquare.com/oauth2/authorize?client\_id=ES4I1GUG5B5JZ5JNMNVZYVOU0X3QX5TZNQV0W34VDREXXEKS&response\_type=token&redirect\_uri=http://localhost/projects/finalfoursquare-ui/src/game.html

When the user clicks the link, they will be taken to a FourSquare page that allows them to authorize this app to use their account on their behalf. If they accept, they will be redirected back to the page you specify. In my case it's game.html on my local server.

When they get authorized - they get an auth token. Finally we get back to the call we originally wanted to do:

`https://api.foursquare.com/v2/venues/search?ll=<your latitude>,<your longitude>&oauth\_token=**<your auth token>**&v=<a version date>`

Your auth token will appear in your address bar after your redirect page:

game.html#access\_token=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

I just pick it up with the following Javascript:

```
var my token = window.location.hash.substr(window.location.hash.indexOf("=")+1, window.location.hash.length);
```

The `<a version date>` thing I mentioned is so that FourSquare can change their API behavior, and it won't break your project. Supplying a version date will specify the date you made your code and use the FourSquare API as it appeared on that date. I started my project in June 2013, so I'm using "20130601".

Making this call will return a nice JSON response of nearby locations, what kinds of locations they are, their exact lat/long and much more. You can go ahead and parse this however you see fit. I did and here's what I'm starting to make:

 

## FinalFourSquare

Please note that FourSquare does NOT allow the name FourSquare in your app name, but nothing about this is final. Right now it's appropriately named because I've been playing a lot of Final Fantasy III on my Nintendo DS. I thought it would be awesome to make a similar style of game where you wander around in the real world instead of a virtual map.

![ffsq](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2013/08/ffsq.jpg)

 

Here I am wandering around the real/virtual world. Note that the accuracy in this screenshot is awful (within 43km) due to the fact that I'm on a desktop computer in a company's wired network. If I'm on my phone, my position can be detected within a few meters.

But hey, I can still fight a local bank (and win - in one blow)

![fight](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2013/08/fight.jpg)

The rough graphics here don't do it justice - I have a little spinny CSS3 transform as the characters fight. The hit points quickly rise and animate as the characters are struck.

Lots of nifty potential here, and I've been doing some play testing to see what works and what doesn't. This is just one of the interesting and interactive ways we can use our position and locations around us. I have a few more ideas as well. I should also note that I purposely left out my dealings with Google Maps. Frankly its awesome to work with, but its a fairly big subject, and I'm not nearly done exploring it yet!

From a tools perspective - I've built this prototype with Node.js and MongoDB for mapping data to game objects and saving the player state. On the UI I've used AngularJS to layout the game and do the application logic. I've also used GruntJS and LESS for doing builds and updating my website.

I won't open this up for demos yet though - too many changes coming as I play and figure what works and what doesn't.
