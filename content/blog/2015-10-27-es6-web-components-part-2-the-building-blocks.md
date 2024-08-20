---
title: "ES6 Web Components  Part 2 - The Building Blocks"
date: "2015-10-27"
---

_This post is the second of five. [Click here to read the first](/blog/2015/10/26/es6-web-components-part-1-a-man-without-a-framework/) which covers why I came to Web Components in the first place._

Let's dig in. In part one, I covered WHY I wanted to write ES6 Web Components, but didn't show any code. Let's change this! Since Web Components are a collection of several seemingly unrelated techniques, bear with me as I cover one at a time and then we'll combine them all.

## Custom HTML Tags

You're most likely familiar with tons of tags/elements in HTML. You can make a div, a span, an h1, a strong tag, but did you know you make up your own tag?

To make sure I'm not steering you all wrong in my explanations, I went over to [HTML5Rocks](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/) to get more basic details than I need. I did learn some cool things like the fact that if you create your own tag without a dash in the name, it inherits from HTMLUnknownElement. There's lots of cool facts to drill deeper on there if you want to be a custom tag nerd, but for our purposes, lets just talk about what we need to get up and running.

Every custom element you make needs to have at least one dash in it. I like this limitation, because it's an opportunity to namespace our work. My name is Ben, so if I had a set of elements I was making, I might call a button: <bens-button>. This is great to immediately know where these elements came from when you scan the code. If I made a terrible button, you might not trust the other "bens-" elements on the page.

To make my button, I can just do something like this:

```

document.registerElement('bens-button');
```

That's great (and valid), but Ben's Button doesn't do anything that a DIV tag doesn't do. It extends from something called "HTMLElement", which is just a generic sort of tag.

You can pass in a second parameter here as well. Maybe you don't want it to extend from "HTMLElement", but the "HTMLButtonElement" to make it act more like a button.

```

document.registerElement('bens-button', HTMLButtonElement);
```

You could even use JS to clone a base element like this, and make it act very custom. That's our ultimate plan, but I'm going to do this with ES6, so lets wait a bit before we dig in.

Before moving on, I should warn you that this is not a Web Standard. It is only officially supported in Chrome and Opera. You can enable it in Firefox with a configuration flag. Luckily, WebComponents.js offers a [polyfill for it](http://webcomponents.org/polyfills/custom-elements/).

## HTML Imports

Strictly speaking, and depending how far you want to go with Web Components, HTML Imports are fairly optional. Maybe I just need simple markup in my custom element and I'm happy to create it all in Javascript. Maybe I don't care to use CSS either and I can just tweak all my style properties with JS as well.

For more complex custom components OR for the simple purpose of keeping things readable by JS, CSS, and HTML devs alike, I like to use HTML imports. These imports can suck in an HTML file onto your page. The HTML file can include Javascript and CSS to make your component whole.

So for example, in your application you can do this to include the component:

```

<link rel="import" href="bens-button.html">
```

Of course that's not the whole picture. What's in that HTML file?

Well, it could be as simple as just a script reference for Javascript that extends the HTMLButtonElement and does fancy things to it:

```

<script src="src/bens-button.js"></script>
```

To go all the way though, we can include HTML and CSS:

```
<script src="bens-button.js"></script>
<template>
    <span>A Button</span><button>Click Me</button>
    <style>
       :host button {
           width: 100px;
           height: 100px;
       }
    </style>
</template>
```

Before I break this down, allow me to first say that there are tons of different ways to go about this. What I'm presenting here is a way that I found works great for me. The bad thing about going without a framework is that you have to invent the best way to solve things. Since I'm giving you ONE way to solve things, hopefully this takes most of the badness out of a no framework solution and allows you to explore the GOOD part about not using a framework: You have complete control to tweak my ways and inject your own creative problem solving!

So the first thing we're doing is simply embedding a script tag. This script tag would contain some script to register a new DOM element and customize the hell out of it so that it truly is "bens-button".

In the next line, we have a <template> tag. Templates are cool - they allow us to mark up some HTML, but I doesn't get rendered! It just sits there for us to pull it wherever we want. It would be the equivalent of writing some sort of HTML string in Javascript and use/render it later. But here, it is HTML so we can copy/paste and test elsewhere.

How I write the CSS has been an ongoing battle, and a little bit fuzzy in my mind. First off, I've not been successful at including external CSS files. Unless the CSS is directly included in the template inline, I've been running into issues where it works in some browsers but not others - very much likely due to my use of the Shadow DOM which we'll cover next. If I remember correctly, linked stylesheets might work in Firefox, because it doesn't support the Shadow DOM, so styles can reach into anywhere. In Chrome where I DO use the Shadow DOM, styles cannot reach inside a component, and it looks like linking a stylesheet might be considered "piercing the Shadow DOM".

Either way, I'm pretty fuzzy on the logistics here, but again - the above example works for me. The other interesting thing you might notice here, is ":host". I think the most concise explanation of :host comes again from [HTML5Rocks](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/): "The `:host` allows you to select and style the element hosting a shadow tree".

So since I plan to use the Shadow DOM feature, ":host" allows me to target the component's world that I'm working with. Got a DIV with a class of ".mydiv" in my component's Shadow DOM? Well target it with

```
 :host .mydiv {
...
}
```

":host" is pretty useful, but so would "::shadow" or "/deep/" if they weren't being deprecated. "/deep/" allows you to pierce into another component and change style properties. "::shadow" seems a lot like ":host". But again: deprecated, I can't recommend using them.

Hope that makes sense! To cap this all off, remember I said that <template> doesn't actually render anything? It just sits there in your DOM? Well, let me show you a snippet of Javascript to actually pull it in:

```

var template = mydocument.querySelector('template');
var clone = document.importNode(template.content, true);
elementtoppendtemplateto.appendChild(clone);
```

In the above code, I'm skirting around a couple things. What is "mydocument"? Well, it could be a bunch of things depending on if you are actually using Web Components, the Shadow DOM, or if you are introducing any other nuances in your custom work. I promise to get back to this in part 3 when I tie it all together. Same with "elementtoappendtemplateto". Either way, the gist is that we're first selecting the template from our HTML import, then cloning it. You may ask why I didn't use "cloneNode" instead. For the life of me, I can't remember. I remember that cloneNode didn't work in this context for a very subtle reason (possibly cross browser or because of the ShadowDOM or because the node isn't active in this template), and that importNode is the thing that saved the day. Either way, once I have a clone, I simply append that clone as a child to wherever I want.

And last but not least...the thing that EVERYBODY thinks of when talking about Web Components is:

## The Shadow DOM

Ironically, the Shadow DOM is probably the least important aspect of Web Components. Don't get me wrong, I think it's brilliant - you get to create a shielded space where your CSS and Javascript can't reach outside your component except in very controlled ways. Other folks can't reach in with their crazy jQuery selectors and accidentally change stuff inside the component.

Unfortunately, though, we're a ways off from this awesome panacea. Chrome and Opera are the only ones supporting the Shadow DOM. Firefox only supports it behind a configuration flag, and Safari had it, but then pulled it out, but just this week [Webkit announced support](https://www.webkit.org/blog/4096/introducing-shadow-dom-api/).

Luckily our [webcomponents.js polyfill](http://webcomponents.org/polyfills/) allows us to use the Shadow DOM. Unfortunately, due to performance reasons, using the polyfill doesn't provide your CSS with a Shadow DOM! So your JS might be protected, but CSS properties can still bleed through in browser that don't support the Shadow DOM. In the end, it's best not to rely on the Shadow DOM right now for style unless you are exclusively targeting Chrome. Tread carefully with this! To be honest, I haven't done my due diligence yet to see how this impacts a larger project and have no horror stories yet - though I'm sure I will have them!

If that scares you enough...feel free to just opt out of the Shadow DOM! Mozilla's X-Tags project has a great Web Components project going.

Its fairly easy to opt in OR opt out. It's simply another layer of DOM that you're adding on between your component and the outside world:

```

myroot = this.createShadowRoot();
```

After that point, any elements you add, including templates (like we talked about above) can be appended directly onto that "myroot" var. We'll call "myroot" something else soon when we string all of these concepts together.

So there are the basic concepts of Web Components! Lots of folks including HTML5Rocks go into some good detail as well, so if you didn't understand it here, or simply want more info - there is tons of info you can find!

[Up next in part #3, I'll be taking all of these concepts and bringing them together under ES6!](/blog/2015/10/26/es6-web-components-part-3-making-an-es6-component-class/)
