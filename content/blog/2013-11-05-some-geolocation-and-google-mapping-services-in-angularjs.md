---
title: "Some Geolocation and Google Mapping services in AngularJS"
date: "2013-11-05"
categories:
  - "angularjs"
  - "development"
  - "html5"
  - "javascript"
---

I've been having some fun with maps lately. It's been a little more involved than popping a marker on a map and showing a user where they are in a static way.

Instead - I need to do a fair bit of geo-math, animate a marker, and more. I picked AngularJS as my weapon of choice - so making some Angular services seemed to be the way to go!

For reference, I'm working on a geolocation enabled virtual golf game I call "Geolf".

 

## Geotracker

I won't go too far into detail on this first one - basically, I made a wrapper around the geolocation services provided in your browser. Beyond the "navigator.geolocation.watchPosition" which [I've blogged about before](/blog/2013/08/08/fun-with-geolocation-and-the-foursquare-api/), I added a subscription API. This was inspired a little by Java or C# (I can't remember which now) - basically instead of passing one and only one callback into the service, I keep a list of subscribers and fire off events to each one of those callbacks.

AngularJS has watch and observe methods, but I wasn't entirely sure if I could use them inside of services without an Angular "scope" to latch on to. Seemed more straightforward to write this myself just using callback arrays - and other services could tap into this service without a controller in the way. For example, my "mapping" service will want to know where you are, so it will subscribe to the "geotracker" service.

There might be better ways to do this, [but this worked for me](https://github.com/bengfarrell/geolf/blob/master/app/scripts/services/geotracker.js) - and it's really boring architectural stuff, and I'd rather talk about some awesome GEOMATH!

 

## GeoMath

So doing geolocation math is a little bit beyond me, so I turned to the [internet](http://www.movable-type.co.uk/scripts/latlong.html) which pointed me to the Haversine formula. The aforementioned page even has this stuff written in Javascript. Lazy me says "Yay!". What's a bit interesting, not having worked with geolocation math before, is that the latitute and longitude measurements need to be converted into radians. I guess it's unsurprising from a trigonometry standpoint, but for me, not even knowing what latitude and longitude REALLY represent - I was clueless.

Also interesting is the fact that you need to take into consideration a constant which represents the earth's radius. At 6,371 kilometers, when I write this up as meters - I'll of course use  6,371,000 meters.

Here's an example of using the Haversine formula to calculate the distance (in meters) between two lat/long pairs:

```
this.calculateDistance = function(geo1, geo2) {
self.convertFromGoogle([geo1, geo2]);
var dLat = self.toRad(geo1.latitude - geo2.latitude);
var dLon = self.toRad(geo1.longitude - geo2.longitude);
var lat1 = self.toRad(geo2.latitude);
var lat2 = self.toRad(geo1.latitude);
var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
return parseInt(R * c);
}
```

There are two convenience functions here that I have elsewhere in my service. One is to convert to radians, and the other to convert a Google Location object to latitude and longitude. Google has a fair bit of structure around their lat and long, and we're just pulling out what we need.

Luckily, the nice rundown of the Haversine formula contains all the explanation I need to get some other methods up and running like getting the bearing between two locations, and getting the location when you project out from a location at a certain distance and bearing.

I've wrapped them all up into a nice Angular service [here](https://github.com/bengfarrell/geolf/blob/master/app/scripts/services/geomath.js).

 

## Google Maps

[A Google Maps AngularJS service](https://github.com/bengfarrell/geolf/blob/master/app/scripts/services/mapping.js)? For my application purposes, yes. Though it is fairly "singleton", so it might not work best for you. It works for me because I can have one map per application page and do some stuff to it. Some things I wanted to do was add custom markers (one that even uses an SVG path!), move the markers on the screen, move the view/camera, and even animate all of those.

The animation of the camera and markers were pretty interesting. I initially used the browser's "requestAnimationFrame" to iterate my frames and move the marker frame by frame. However, I also wanted this to work in Phonegap/Cordova. Little did I know that "requestAnimationFrame" isn't supported there, so I also implemented an alternate setInterval animation routine.  I offloaded the [animation to a service of it's own](https://github.com/bengfarrell/geolf/blob/master/app/scripts/services/animation.js) and had each frame callback to my mapping service to cause something to happen on the map, whether it's changing the position or size of the marker.

 

## Orientation

One of the last things I'll mention is orientation - but only because it was so hard to spin a compass in my Google map. Here I'm using Phonegap/Cordova to send me the magnetic heading of the compass. The call itself is pretty similar to getting your location - [so the service](https://github.com/bengfarrell/geolf/blob/master/app/scripts/services/orientation.js) is very similar to my geotracker service. I've only really added the ability to set the heading manually so I can test this on my laptop instead of my Phonegap/Cordova app.

Anyway - the tricky part to this all was updating my SVG drawn compass needle in Google maps. When creating a marker in Google Maps like this, you can set the rotation along with the rest of the properties like so:

```
new google.maps.Marker({
                    map: self.map,
                    position: latlng,
                    flat: true,
                    rotation: 24
                    icon: {
                        anchor: new google.maps.Point(168, 900),
                        path: "M 337.14285,951.79076 C 336.85134,1085.9601 1.8926143,1088.4865 -5.7142858e-6,951.79076 -5.7142858e-6,827.13221 169.31441,188.15081 168.57142,198.07649 c 0,0 168.57143,629.05572 168.57143,753.71427 z",
                        fillColor: '#333',
                        fillOpacity: 1,
                        strokeColor: '',
                        strokeWeight: 0,
                        scale:.035
                    }
                });
```

Note that "rotation" property. Easy right? Now what about updating the rotation of the marker inside Google Maps as we get new orientation events when we point our phone south instead of west? Well, not so easy.

There actually doesn't seem to be a way to do "setRotation" on Google maps for a marker or icon. You can drill into the object itself, and set the rotation property, but that doesn't update the graphic. So you end up having to almost create a brand new icon, but not quite like so:

```
var ico = $scope.player.marker.getIcon();
ico.rotation = heading.magneticHeading;
$scope.player.marker.setIcon(ico);
```

As you can see here, we're getting the icon, setting the rotation, and then setting the marker icon again with the new rotation. Not the direct most approach - but seems to work!

 

## Conclusion

Yah, I know - lots of pretty specific problems to my game/application. So maybe this code isn't super portable for you. But there is a lot of neat tidbits in here that I learned along the way. I thought that the geo math would be more difficult, but the Haversine formula seems pretty well established and easy to Google.

Google Maps are a world of their own - the API seems very geared towards Java devs using GWT, but at the same time pretty well documented until you hit some weird use case like wanting to rotate your marker.

The big takeaway for me is that Angular services seemed a really good pattern to follow for this mostly-sorta-generic stuff I was doing. I can unload from my controller, and so long as it fits a "singleton" design pattern, it really works. One more notch in the Angular belt - I maybe went a little crazy on services here, but they fit what I needed in my application.
