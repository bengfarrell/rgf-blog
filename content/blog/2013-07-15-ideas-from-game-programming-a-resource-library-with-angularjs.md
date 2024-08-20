---
title: "Ideas from Game Programming: A Resource Library with AngularJS"
date: "2013-07-15"
categories:
  - "angularjs"
  - "development"
  - "html5"
  - "web"
---

This is actually a pretty simple concept - but it might not be intuitive for everyday web applications. I didn't even think of doing this until I started making a game (of sorts) in AngularJS.

The concept is a "resource library". I've come across a few different game engines in Flash and elsewhere, and they seem to have this design pattern in common.

The raison d'etre of the library is as follows:

> You have a game. In that game you have a decent number assets: sprites, character animations, sounds, etc. You'll be dealing with a situation that you want to be certain that all assets that you need to play the game when you load it are actually available. Rather than load each thing individually in code, we create a structure called a library. You can set resources in that library, and get them later by name (or by any complicated syntax of your choosing).

 

## Caching DOM Elements

Now, compare this to a method that jQuery users know - caching an element so that it doesn't cost much to reference it repeatedly when we need it. Sorta similar, no? Add to that a nice little convenience method and structure for getting, setting, storage and retrieval.

How about a little flare on top of that?! Use an AngularJS directive!

Here's a simple Library object:

```
library = {};
library.elements = {};

library.setResource = function(name, elem) {
    library.elements[name] = elem;
}

library.getResource = function(name) {
    return library.elements[name]
}
```

Now, as you can see - we have a couple convenience methods for setting and getting a resource. The elements get popped right into the library.elements hash table - pretty simple stuff.

To get the element you want - just call library.getResource("myelement").

Now, originally, I had an initialization routine that ran through all of the elements I wanted by using DOM selection with the class chain, as you would do with jQuery or such things: $(".myelem")\[0\]. Note that the array index of \[0\] is to assume there is one and only one element found and break it out of that jQuery-like array structure and get the raw element we want.

In my initialization routine though, I'd make some syntax errors and make a mistake targeting the actual element I want. It's fine - but can be a pain when things don't work, or maybe you do some HTML/CSS class restructuring and break everything.

For example - maybe my resource was div.classA .classB. classC, but then I removed the outer layer that is .classA leaving .classB and .classC intact. Well, I just broke my library reference! Do I go back and edit - or maybe there's a more dynamic way?

 

## Oh, Hi there Angular Directives!

Angular directives are awesome. To review what they do, in short, is that they allow you to make your own HTML attributes for existing tags (I believe they do process more than just attributes, but that's how I use them).

So, I can write some HTML like so:

<div log="hi">blah blah blah</div>

And write a directive:

```
MyApp.directive('log', function () {
    return function (scope, element, attrs) {
       console.log(attrs.log);
    }
});
```

Well, what do I have there? Just something simple that logs a text message to the console, but does it from a freakin div tag! How cool is that?

Maybe you already know how directives work, that's cool....lets move on to our resource library. Lets make a directive that processes the following and adds the element to our library:

`<img src="assets/player.png" library="player" />`

So, in the above HTML, I have a simple little image tag showing a graphic. Later on, I'd like to reference it and do some CSS transforms on it. How can I reference it? Just by calling library.getResource("player")! This will return the element, already cached, so no traversing the DOM to look it up.

By adding that library="player" markup, I've created a custom attribute that adds THAT specific element to my library and allows you to retrieve it by the name "player".

Of course, it is custom - so we need to write the Angular directive ourselves:

```
App.directive('library', function () {
    return function (scope, element, attrs) {
        library.setResource([attrs.library], element[0]);
    }
});
```

So in our directive, we're simply taking the element (first in the array to get the raw element, assuming it's unique), and setting that resource in our library by whatever name our "library" attribute was given.

 

## Getting Fancier

I have no need to get fancier yet. My application/game/whatever is pretty small and there are only a limited number of resources I need. And, I want them all available when I load it up.

However, what if you had 10's or 100's of elements? Memory concerns aside - you might have some difficulty giving them all unique names and might want to introduce something like folders.

I think I recall a game engine using something like a dot syntax for resources -

Doing something like library.setResource("folder", "resourcename", element) or library.setResource("folder.resourcename", element) will create a structure like so:

library.elements\["folder"\]\["resourcename"\] = element;

It can really be as multidimensional and organized as you want to be.

Also - perhaps you'd like to attach elements dynamically, load resources on the fly at different points in your application. Additional logic can be added to your library object for such eventualities.

 

Anyway, the resource library is a pretty simple concept, but pretty handy! Not something I thought about introducing until I was in a game mindset.
