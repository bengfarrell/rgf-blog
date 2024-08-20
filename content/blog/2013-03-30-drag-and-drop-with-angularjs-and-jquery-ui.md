---
title: "Drag and Drop with AngularJS and jQuery UI"
date: "2013-03-30"
categories: 
  - "javascript"
  - "ui"
  - "web"
---

I actually haven't used jQuery UI much, and been just tooling around with AngularJS.  That's why when a recent project came up at work which had the typical ASAP schedule, I thought: "Let's put AngularJS to work!"  Also, the application I was building was an internal tool, so it could be a little rough around the edges and customers/clients wouldn't make fun of me if something wasn't quite right.

So....low risk, let's dive right into Angular!  I also had the assumption that if Angular was all I thought it was cracked up to be, it would save me lots of time, and allow me and others very nice visibility to how my project worked so they could make updates very simply, right in the HTML.

Boy was I right.  I felt like Angular sped things up and gave me what I wanted, with a nice easy, predictable structure.

What I didn't expect was that I'd be mixing jQuery UI in.  What I REALLY didn't expect was how SLICK Angular makes it to mix things like jQuery UI in.

 

## The Problem: I want to drag something to a drop zone

Pretty simple right?  Of course, of course I can write this from scratch in Javascript.  And if I wrote it from scratch, I'd probably cut corners and.....not necessarily make it all fancy with tags and attributes for my Angular setup.  No, I'd probably loop through all the elements in my list that I'd like to drag, attach onmouseout, onmouseover, and onmousemove listeners.  And then keep a separate list of all my drop zones and check positions of things while they are being dragged.

PAIN IN THE BUTT.  I don't mind doing cool things by hand, but things that are readily available elsewhere? Boring. So I turn to Google and type in "AngularJS drag and drop".  I came across this gist:

[https://gist.github.com/codef0rmer/3975207](https://gist.github.com/codef0rmer/3975207)

Given what AngularJS is supposed to do, I didn't expect to find any functionality in Angular to support drag and drop.  Indeed I didn't, but what this gist shows is the ability to declare your own attributes in HTML and have Angular process them, adding your own logic to what those things do.  THAT IS SLICK!

 

## Angular Directives

So let's take "draggable" and "droppable" as our primary examples for an Angular directive.

In our HTML, create a div with your own custom attribute on it:

**<html ng-app="App">**

**<div class="something" draggable></div>**

**<div class="somethingelse" droppable></div>**

**</html>**

Obviously these two attributes mean nothing to HTML, so we want to process them with Angular.  Luckily we've declared our Angular App as "App".  We can then process our directives:

```
var App = angular.module('App', []);
App.directive('draggable', function() {
    return {
        // A = attribute, E = Element, C = Class and M = HTML Comment
        restrict:'A',
        link: function(scope, element, attrs) {
        }
}
```

So, above, we've made a reference out of our "App" module (our HTML page/app).  Then we'll add a directive - which is simply saying, anything labeled "draggable" - return an object that does something.

I haven't tried anything except "restrict:'A'" yet, however this is pretty fancy.  We filter this behavior by attributes, elements, classes, or comments.  For our example, we're restricting by our attribute.

Then the link process.  Here you define what you'd like to when Angular finds the attribute.  We'd like to hook up the jQuery UI drag behavior:

```
      element.draggable({
        revert:true
      });
```

Right! So all we do here, is take the element that the Angular directive gives us and call the jQuery UI method "draggable" on it.  I left the gist author's revert:true in there, cause it's pretty nice.  If the drag isn't accepted, its animates back over to where it started.

Similar deal with droppable:

```
App.directive('droppable', function($compile) {
    return {
        restrict: 'A',
        link: function(scope,element,attrs){
            element.droppable({
                accept: ".itemHeader",
                hoverClass: "drop-hover",
                drop:function(event,ui) {}
    }
}
```

We process the directive, filter by attribute, and on link call the "droppable" jQuery UI method.

jQuery UI has some nice options here for droppable.  It can be set to only accept items of a certain class or ID (comma delimited lists inside the quotes are cool here).  You can specify a hoverClass as well.  In my case,  the "drop-hover" CSS adds a white border to the element.  When you drag your draggable over a dropzone, then the dropzone will light up with a white border.

And then the drop functionality.  What happens when you drop it?  I have my own logic, you'll certainly have your own.  An important note is how to get the drag or drop elements using these parameters that you get:

```
dragged = angular.element(ui.draggable).parent();
dropped = angular.element(this);
```

This, of course is in the "droppable" method. If you were in the other "draggable" method, angular.element(this) would be the draggable.

Wait theres more! I had to do a little trickery in my application. See, it turned out that not everything could be dragged to everything else. If you picked up a draggable, you can only drop it's related dropzones. Other draggables have other dropzones.

I needed a good way to NOT let the user drag something where they shouldn't depending on what they picked up, but also make them SEE what they can or can't drop on!

 

## Start/Stop Drag Listeners

Luckily, JQuery UI gives us a few more draggable options:

```
App.directive('draggable', function() {
    return {
        // A = attribute, E = Element, C = Class and M = HTML Comment
        restrict:'A',
        link: function(scope, element, attrs) {
            element.draggable({
                revert:true,
                start: function(event, ui) {}
                stop: function(event, ui) {}
```

So, we can have something happen when the user starts to drag something AND when they stop.  So for me, when "start" is fired, I loop through my list of dropzones.  If it's determined that the drag is not allowed on a given dropzone, I'll add a "reject" class to the dropzone.  In my CSS, I fade the background and the text and everything so it looks dim.  And then in my element.droppable.drop function, I check to see if the "reject" class is present - and don't do anything if so.

In my stop function here, I simple go through and remove all the reject classes from everything, since the user has stopped dragging.

 

Lots of options here for doing drag and drop!  And a pretty nice way of Angular opening the door to other tools as we add non-Angular functionality.
