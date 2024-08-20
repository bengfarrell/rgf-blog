---
title: "The Slow March of Web Component Progress"
date: "2017-09-24"
categories:
  - "html5"
  - "javascript"
  - "ui"
  - "web"
  - "web-components"
coverImage: "Web-Components.png"
---

Almost two years ago, I made a hefty series of posts on the [promise of Web Components](/blog/2015/10/26/es6-web-components-part-5-wrapup/). Things have changed and promises were broken, but on the whole, I don't think MUCH has changed from an implementation perspective. These days, I've been sucked into the awesome world of the 3D web and WebVR and soon WebAR, but often I need some 2D UI around my 3D scene/canvas. When I do, it's STILL all Web Component based HTML, CSS, and pure vanilla Javascript.

## API Changes

You'd think the biggest change might be version 1 of the Web Components API, but actually not much has changed from an implementation perspective. Really, some method names have changed, but the API is pretty much accomplishing the same thing.

Here's version 0:

```
class MyCustomClass extends HTMLElement {
    // Fires when an instance was removed from the document.
    detachedCallback() {};

    // Fires when an attribute was added, removed, or updated.
    attributeChangedCallback(attr, oldVal, newVal) {};

    // Fires when an instance was inserted into the document.
    attachedCallback() {};

    // Fires when an instance of the element is created.
    createdCallback() {};
}

```

Now, compare that to version 1:

```
class MyCustomClass extends HTMLElement {
    static get observedAttributes() { return [] }
    constructor() {
        super();
    }
    // Fires when an instance of the element is created.
    connectedCallback() {}

    // Fires when an instance was removed from the document.
    disconnectedCallback() {}

    // Fires when an attribute was added, removed, or updated.
    attributeChangedCallback(attributeName, oldValue, newValue, namespace) {}

    // Fires when an instance was inserted into the document.
    adoptedCallback(oldDocument, newDocument) {}
}
```

So pay attention, here...what actually changed? The method names, for sure, but once you change the method names, the use is exactly the same. Bonus, we have a constructor! We didn't before, and its just plain nice to have something here to use as a callback when this component is first instantiated. Prior to this everything needed to be done when the element component is created or attached to the document. To be fair, component creation vs class instantiation seems essentially the same from a usage standpoint, but it WAS weird not being able to have a constructor on a class in version zero.

Another small change is the observedAttributes getter. Previously in version zero, the attributeChangedCallback handler worked on any attribute of your component. Changing <my-component someattribute="hi"></my-component> to <my-component someattribute="bye"></my-component> at runtime would trigger this handler and allow you to take action. Now, though, a developer needs to be more deliberate. If your code needs to watch for these changes from "someattribute", this value needs to be added to the observedAttributes:

```
static get observedAttributes() { return ['someattribute'] }
```

Sure, it's something extra to do, and yes, before I knew what this did, I spent several minutes trying to figure out why my attribute change method wasn't being called, but it's pretty minor and requires more deliberate intention. I can't really complain, the change seems good overall.

From a class implementation perspective, this is all that changed! There is one other change outside the class, though. It used to be that the class would be attached to the HTML tag like this:

```
document.registerElement('my-component', MyCustomClass)
```

Now, in v1, it's done like this:

```
customElements.define('my-component', MyCustomClass);
```

Unfortunately, while Chrome, Safari, and Opera support "customElements", [Firefox and Edge](http://caniuse.com/#feat=custom-elementsv1) do not yet. Given that Firefox is listed as "under development", and in Edge it's "under consideration", I'm OK with this. We'll get there, but in the meantime, [a polyfill works](https://github.com/webcomponents/custom-elements).

## Undelivered promises

One of the biggest points of excitement for Web Components for me was the elegance of working with three separate things in combination to create a component: Javascript, CSS, and HTML. If you asked me 2 years ago what the biggest risk to this vision was, it was getting browsers to implement the Shadow DOM. To remind you, the Shadow DOM was a protective wall around your component. Components could have their own CSS associated with them, and this Shadow DOM protected CSS rules from the outside seeping in and wrecking your rules. Likewise, your components internal DOM couldn't be manipulated from the outside.

Unfortunately, browsers were slow to adopt this, and even worse, it was harder to polyfill. The Polymer project even invented this notion of a "Shady DOM". Given this confusion, churn, and uncertainty, I never really adopted using the Shadow DOM. In all honestly, I personally don't really need it. I can see bigger applications and teams using it as a layer of protection against themselves like how other languages might use private/protected/public variables in their classes as a way of allowing team members to use and call on only what's been exposed.

But this is the web! When this layer of protection isn't offered to us, we just use conventions instead. Biggest and easiest convention is to just never tweak component DOM from the outside. If you need to do something like this, you're doing it wrong...just make a method as part of your component's API to do what you need.

CSS is a bit trickier, but we've had the tools we've needed since the earliest days of CSS. Instead of relying on the Shadow DOM to stem off outsiders from mucking with your component's style, simply namespace every single CSS rule relating to your component with the component's name like so:

```
my-component .an-Inner-Class {
  background-color: black;
}
```

All that said, it appears there is a [new version of the Shadow DOM](http://caniuse.com/#search=shadow%20dom) shaping up. I haven't followed the latest here at all, but I think I might wait until there's a strong indication things will settle down before I bother with it.

Given than the Shadow DOM, for me, is so easy to ignore until I have more confidence, I'm not really bothered. What I AM bothered by is how "HTML Imports" have dropped from favor. To be fair, we've always been able to polyfill HTML Imports fairly easily. At the same time, though, when [Webkit/Safari has no interest and Firefox has no plans](http://caniuse.com/#feat=imports) to implement, the whole notion seems dead in the water. I've seen some conversation that the web community doesn't want to adopt HTML Imports in favor of the Javascript "import" mechanism, but I'm not aware that this works in a meaningful way yet for HTML, nor is "import" supported in any browser except the most recent version of [Chrome and Safari](http://caniuse.com/#feat=es6-module).

This leaves us with a bit of a challenge. I really don't want to create my component's DOM entirely with code - every single tag created with "document.createElement('div')" and then assigning classes, innerText, and then appending the child to a parent.

Fortunately, I've found that for me at least, inlining HTML into my Javascript is not as bad as I thought it might be. Components themselves should be fairly small - if you want major complexity, you may want to architect your big component into smaller ones that work together. Therefore, the HTML that you inline shouldn't be that complicated either. By convention, I can also use the constructor for my component as a decent place to put my HTML, because there isn't much else I need to add here.

```

    constructor() {
        super();
        this.template = '
            <h4>Objects\<select class="fileselector">\
                <option value="default">box primitive</option>\
                </select>\
            </h4>\
            <ul></ul>';
    }

    connectedCallback() { this.innerHTML = this.template; }
```

The above component represents a simple list (ul tag) which has a header above containing some text and a file selection menu. Honestly, the example I pulled isn't the prettiest thing in the world right now, and once I flesh out this simple component, I expect to have double or triple the lines of HTML potentially. But, all the same, it's pretty manageable to inline this. It also introduces a couple simple things in the way I format my HTML. I properly indent and new-line everything here just like you would see it in an HTML document. The mechanism to accomplish this readability is simply with a backslash after every continuing line.

I've also been exposed to the concept of backticks: \`. Backticks are another way to wrap your strings in Javascript that allow you to inject variables. This is more commonly known as ["template literals"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). It's not a new concept by far. Though I haven't really done anything with string templating in the past, I believe the practice is extremely common in React, Backbone, and Underscore. I haven't favored the usage of this for HTML because I like to keep my markup and JS separate, but I think I'm caving now to get a decent flow for components.

One problem with templated HTML in this case, though. It's easy enough to inject a var like so:

```

   var inject = 'hi';
   var template = `<div>${inject}</div>`;
```

The problem is that in the simple example above, the "inject" variable is in the same scope as the template! Typically when I want to use this type of pattern, I prefer to store the template as a sort of variable I can access from elsewhere rather than having it inside my code logic when I'm constructing these elements.

Here's a fake example to explain:

```

for (let c = 0; c < data.length; c++) {
   let myitem = document.createElement('li');
   myitem.innerHTML = `<div>${data[c]}</div>`;
   mylist.appendChild(myitem);
}
```

In this example, I'm appending new list items (li elements) to a unordered list (ul element). Right inside my loop here, I'm declaring what my template looks like. Personally, I think this is some bad code smell! Ideally, I want to break out any HTML I have into a separate variable so that if I AM going to inline my HTML (which I still think is kinda smelly on its own), I should at least have it separated out so I can easily track it down and change it. Putting it inside my application logic especially inside a loop like this just feels terrible.

Unfortunately, it's not possible to save a template with literal like this as a variable. Instead, we can create a method that accommodates both this and the creation of the element:

```

    itemTemplate(data) {
        var template = document.createElement('template');
        template.innerHTML = `<li class="mesh">${data}</li>`;
        return template.content.firstChild;
    }
```

I use the "template" tag here so I don't have to decide upfront which type of tag to create, and my tag (including the outer tag) can live entirely in this template string. Otherwise, for my outer tag I'd also have to have additional JS calls to set any attributes, classes, or IDs on it.

## Custom Events

Custom events haven't changed, but there's a little trick I like to use that's worth mentioning. Here's the creation and triggering of a custom event:

```

        let ce = new CustomEvent('onCustomThing', { detail: { data: data }});
        this.dispatchEvent(ce);
```

The above code is pretty simple, but there is one thing I don't like about it, and that is the string 'onCustomThing'. If you think about it, whoever consumes this event outside this class needs to spell 'onCustomThing' correctly AND use the correct capitalization. If we change this over the course of our project, we could break things and not know it.

That's why I like to assign a sort of a static constant to the web component class. In practice I haven't been using any JS language features that dictate it is a static constant (though I probably could copying how observedAttributes is declared). Here's how I do it:

```

MyComponent extends HTMLElement {
    ...
    disconnectedCallback() {}
    attributeChangedCallback(attributeName, oldValue, newValue, namespace) {}
    adoptedCallback(oldDocument, newDocument) {}
}
MyComponent.CUSTOM_THING = 'onCustomThing';
customElements.define('my-component', MyComponent);
```

So now, elsewhere, I can listen for the event like so: mycomponent.addEventListener(MyComponent.CUSTOM\_THING, e => this.onCustomThing(e)); Yesssssss, you could bungle the syntax here as well making it as bad as a string, but it's easier for an IDE to refactor and predictively type as you code.

## What's missing

This last bullet point of what's missing is a minor one, and I think it's slowly being corrected. Web Components aside, I've been developing most of my projects using Javascript modules by way of the "import" command. Chrome's latest version supports it, though I haven't properly tried it out yet. Instead, I've been relying on the ["browser-es-module-loader" polyfill](https://github.com/ModuleLoader/browser-es-module-loader). It works amazingly well and I use it as a way to give my application a class based "controller" that can import modules as it needs to.

So you can import a "main entry point" Javascript file as a controller, and anything downstream can also import modules. It's pretty awesome, but any Web Components you use in your application are NOT downstream of this controller and as a result cannot use imports. I haven't put in any serious brainpower to overcome this, but instead when I run into this issue, I take it as a hint that my component could be getting a bit too complex, and I work around it. Honestly, though, once this polyfill is not needed anymore, I'll be happy!

## Final Thoughts

As a whole, I'm still happy with writing web components after 2 years. I still have no desire to change. I think things are getting better and better, just a bit more slowly than I originally anticipated. I'm also a bit surprised at HTML imports being on its last legs. As a workflow and architecture, I still think it holds up really well, even if we have to shuffle around some of the pieces that make it up.

Everybody is different, though, and there are many different tools for many different jobs. I still haven't touched React or Angular 2-4 yet. I'm happy, but if you use those frameworks, you might be perfectly happy too! Consider this another tool to add to your belt (without all the bells and whistles of course).
