---
title: "Ideas from Flex: Visual Application States in AngularJS"
date: "2013-07-22"
categories: 
  - "angularjs"
  - "development"
  - "flex"
  - "javascript"
  - "ui"
  - "web"
---

Macrodopache Flex. That's what I'll call it - because during it's different incarnations it was managed by Macromedia, then Adobe, and now Apache. This brief intro is for all the Flash haters out there.

Flex is a "Rich Internet Application" framework built on top of Flash. That's fancy talk saying it was Flash for banks and enterprises and big intranets. I got into Flex at version 3 - at the point where it was reasonably priced and not server side.

I didn't work for a bank, I got into it because, as a Flash developer, I was sick and tired of creating buttons and dropdowns and other common UI components from scratch. Flex had a way for me to sweep the boring repetitive bits under the rug and work on my unique snowflake of an application/game/interactive.

What was frustrating about Flex 3.0 was it's ability to be skinned at any sort of deep level using any asset you wanted. I went deep down the rabbit hole in making Flex compiled libraries out of Flash to import them and use the assets. Overall, it wasn't pleasant.

Then came Flex 4.0. Lots of folks complained how different it was, but for me it was awesome. Most of the awesomeness was the ability to use "states" and design add any custom elements - vector shapes, bitmap graphics, or whatever to your states.

The simplest example of this was the button. A button has an "up", "over", and "down" state. "Up" being the normal look of the button, "over" is what it looks like when the mouse is hovering over it, and "down" is the state when the user is in the process of clicking it. You can add more states of course - like selected for a toggle style button. The main point of this is to say that there are visual states.

In reality - what is happening here is that all of these states exist, and a "state" variable dictates which of the 3 visual layouts/designs to show. It didn't really care what the contents of your visual state was - you simply defined the look of each state and what kind of component it was, and Flex would handle the rest.

Sometimes your component might have some bound piece of information inside. Like a labeled button: you might create a button labeled "click me".  This label needed to be identified in a common way and bound to the component available in all states you wanted the text to show.

Bigger than that even - was the concept of "Application state". Really - take the concept of a button, and scale it up, defining whatever states you want.

Say I have an application that allows a user to log in, list people, select a person to edit, and then log out. My states might be  "login", "list", "edit", and "logout". In HTML/JS/CSS world, we might have those on separate pages? How about a single page app?

Yes, there are numerous ways to do it - but how about states? Take this concept in Flex (and yes it's common to any number of platforms - I believe I've seen it in MS Silverlight and Android) and adapt to Angular.

First - how to mange if one visual state is shown or hidden? Well - how about creating <div> tags to hold the contents of each state?

```
<div> class="state login_container">....
<div> class="state list_container">....
<div> class="state edit_container">....
<div> class="state logout_container">....

```

And then in our CSS - the default style for each state would be:

```
div.State {
  display:none;
}

```

There! Now all states are hidden by setting the display to none. They aren't even in the DOM's render tree affecting the layout - fantastic! This means, I can show one or the other, and they will appear in place - right where they should be, not affected by the others.

How to show them now? Well, first we need to have some sort of "state" variable to indicate which state we should currently show. Since we're in Angular, we can put this in our controller to enable binding:

```
function AppController($scope) {
    $scope.state = "login";
....

```

Now that we have something to bind to - lets do that in or Angular markup/HTML:

```
<div> class="state login_container {{state}}">....
<div> class="state list_container {{state}}">....
<div> class="state edit_container {{state}}">....
<div> class="state logout_container {{state}}">....

```

And then, pop over to CSS:

```
div.State {
  display:none;
}

div.state.login_container.login,
div.state.list_container.list,
div.state.edit_container.edit,
div.state.logout_container.logout {
  display:block;
}

```

So as you see - we include each state we want in the selector that says we should display as block. We select those elements that are div.state.someState\_container, and only use this style when the proper state is paired up with the proper container in the div tag.

For example - div.state.login\_container will select login regardless of the state, but with the state variable bound to the class - div.state.login\_container can be div.state.login\_container.login or div.state.login\_container.edit or div.state.login\_container.list, etc.

Only when it is bound with Angular and can be selected by div.state.login\_container.login do we set the display to block.

In this regard, we are showing and hiding application states based on Angular binding!

Like my last post, there's really nothing magical - it's pretty simple, but a potentially nice way to manage visual elements if it is right for your project.

A word of warning, though - the contents of your states, while removed from the DOM should still be active in memory. Worse - I'll bet that any Angular bindings on your inner content will remain firing and active. So take heed to not pack your states too full of things. You can't see them, but they are there and working.

Personally, I've only done this for application states, but I do wonder if one could create some nice components here based on this (or maybe if someone already did!)
