---
title: "ES6 Web Components Part 3 - Making an ES6 Component Class"
date: "2015-10-27"
categories:
  - "development"
  - "javascript"
  - "ui"
  - "web"
  - "web-components"
---

One thing I didn't cover in [my last post (#2 in the series)](/blog/2015/10/26/es6-web-components-part-2-the-building-blocks/) about all the pieces that bring Web Components together is actually using ES6! It's not a feature of Web Components, but its some seriously nice glue that lets you tie your Web Component structure together.

To be honest, I'm not using it to it's full capacity. In fact, I'm only using 2 or 3 features to make my life easier!

## Classes

There are some strong opinions NOT to use classes especially from [one prominent person in the JS community](https://news.ycombinator.com/item?id=8999372). Even if Crockford had all the best intentions, I doubt he had Web Components in mind - because to me, Web Components are the perfect place to use Classes. Components are fairly OO by nature. I want to take an HTMLElement and extend it to my own custom component. One thing I didn't get into when talking about creating my own elements before was the methods that you get when extending HTMLElement. Now is as good a time as any to bring them up:

```

class MyCustomClass extends HTMLElement {
    // Fires when an instance was removed from the document.
    detachedCallback() {};

    // Fires when an attribute was added, removed, or updated.
    attributeChangedCallback(attr, oldVal, newVal) {};

    // Fires when an instance was inserted into the document.
    attachedCallback() {
        // Remember this? We're cloning the template tag and dropping it
        // onto our page in our newly created Shadow Root
        var template = this.owner.querySelector('template');
        var clone = document.importNode(template.content, true);
        this.root = this.createShadowRoot();
        this.root.appendChild(clone);
    };

    // Fires when an instance of the element is created.
    createdCallback() {};
}
if (document.createElement('my-customclass').constructor !== MyCustomClass) {
MyCustomClass.prototype.owner = (document._currentScript || document.currentScript).ownerDocument;
    document.registerElement('my-customclass', MyCustomClass);
}
```

So the above code are all the methods you get when you extend an HTMLElement AND what an empty ES6 Class might look like. The methods inline with the comments seem pretty self explanatory, but I will mention this...pay VERY close attention to "attachedCallback" vs "createdCallback". Yes, its obvious that one fires when the element is created vs added to the DOM, however - make sure you consider that difference especially when you create an instance of your element at runtime with Javascript. If you did a bunch of cool stuff with "attached", but then did document.createElement('my-customclass') to create your element using JS....it hasn't been added to the DOM yet! So whatever you have in "attachedCallback" hasn't been run yet and your component might not act like you expect!

And now the non-obvious stuff...that weird "if" statement I have outside of my component. Well, this is all to register your custom element with the browser.

First, we try to create the custom element. If this is the second time you've used the component, it stands to reason that it's all been registered before and we'd be writing over the original element! So, we create our custom element, and if it's constructor is our class (MyCustomClass), then it's already been created and we shouldn't so it again.

Next, I'm using a little known feature: document.currentScript.ownerDocument. Unfortunately, document.currentScript is not present in all browsers. Yet again, [WebComponent.js](http://webcomponents.org/polyfills/) is there to save our bacon. In this scenario, with a polyfill though, \_currentScript appears with an underscore, so you have to handle the logic.

In any event, this "ownerDocument" tells us the "document" owned by our script. In this context, document is our component's local DOM! So, super useful, right? If you want to append any children, you do it to this ownerDocument. Create a ShadowDOM? Do it on this ownerDocument. Clone your <template> content? Do it on this ownerDocument. Here, I've taken this "ownerDocument" and assigned it to the class's prototype so we can reference it on any instantiation of the class.

After all that, we can simply register the tag to the document, providing our custom class for how it should act.

In the end, we have a custom class with a few component lifecycle methods provided for us, as well as a way to create a brand new CUSTOM tag using that class for our custom features.

## Fat Arrows

Kind of a silly name. But it's easy to remember, because it literally is a fat arrow: => (as opposed to a skinny arrow (->).

Anyway, Fat Arrows help you manage scope. Scope can be a huge pain in the butt in Javascript. Before I got into this workflow with ES6 and Web Components, I was using a little trick when you instantiate your JS object, you can create a variable called "self". Since when you first instantiate your object, the variable "this" always refers to the newly instantiated object, by just assigning "var self = this;", you can always refer back to "self" even if you're in a completely different scope because you're off on a click handler or a timer.

I'd go into this more, but it's irrelevant. it's all out the window when you assign methods and properties to the underlying Object prototype and not the instance. And that's exactly what ES6 classes do. So how do we get around this, and control our scope?

That's where fat arrows come in to play. By using them, you're passing your outer "this" scope to whatever your arrow points at. Take an event listener for example:

```

this.myawesomeelement.addEventListener('click', event => this.onClick(event) );
```

With this, you can make a method on your class called "onClick" and when it's called, the scope of "this" is STILL the scope of your class. Without the fat arrow, when you tried to refer to "this" in "onClick", it would be in the scope of the event. There would be no way to refer back to your class!

To be honest, I like this a whole lot more than "var self = this" because it always felt like a weird kludge. Yay for ES6! The syntax of the fat arrow can be a little confusing as you try to apply it to different scenarios - expect to look up examples online for your use case as you get used to the syntax.

_[Next up in part 4: Some opinions, workflows, and project setup for ES6 Web Components...](/blog/2015/10/26/es6-web-components-part-4-project-setup-and-opinions/)_
