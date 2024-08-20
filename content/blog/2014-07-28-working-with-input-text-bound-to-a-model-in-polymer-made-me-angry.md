---
title: "Working with Input Text Bound to a Model in Polymer....made me angry"
date: "2014-07-28"
categories:
  - "polymer"
---

Gah! Ben smash. I wanted to do the simplest thing in Polymer, only to find it was RAGE INDUCING! But now, at least I have a good understanding of how filters work - yay!

OK so here's my problem. Given a JSON model...

```

     { "id": "somekindofstring",
      "maxAge": 289,
      "maxItems": 21,
      "maxDuration": 600,
     }
```

... I'd like to create a few text input fields that allow me to edit my values and two-way bind to my JSON model. For those that aren't up on binding terminology, two way binding means that when my input field appears on the screen, it picks up the value in my JSON data. Then, if I edit the field on my page, it automagically updates the data model.

My "id" field is super easy because it's a string. In Polymer, it's as simple as this:

```

<paper-input label="id" floatingLabel value="{{mymodel.id}}"></paper-input>
```

Excellent right? "Paper-input" is just an input field that has been snazzified as a component by Polymer to be made better. By putting what I'm binding to in double curly braces, the input field will immediately show "somekindofstring" as the value of the input field. What I haven't shown you is that I've already loaded my JSON data, and put this object in my Polymer scope so that it's easy to bind to. Something like this:

```

         Polymer('mycomponent', {
              mymodel: { "id": "somekindofstring",
                         "maxAge": 289,
                         "maxItems": 21,
                         "maxDuration": 600 }
      ....

```

I dumbed it down a lot. I actually load the JSON data from a separate file....and it's an array, but for the purposes of showing binding, I don't want to get too complicated.

Anyway it works! Let's try the same on one of my numeric values with a snazzy Polymer slider:

```

<paper-slider min="0" max="365" value="{{mymodel.maxAge}}" editable></paper-slider>
```

This also works! I have a slider that goes from 0 to 365, and binds to the "maxAge" property of my data. Perfect, right? Well not quite...check out my new data model after it's been updated:

```

     { "id": "somekindofstring",
      "maxAge": "289",
      "maxItems": 21,
      "maxDuration": 600,
     }
```

Oh no! My "maxAge" value is now a string! To figure things out, I turned to some [Polymer documentation on "Expressions"](http://www.polymer-project.org/docs/polymer/expressions.html). The first thing I tried was a unary operator. From the docs, it looks like you can use a + sign to convert something to a number. So I gave it a shot:

```

<paper-slider min="0" max="365" value="{{+mymodel.maxAge}}" editable></paper-slider>
```

Now, that sorta worked....I think. Seems to bind OK - but my slider goes a little crazy and my two-way binding breaks. I'm not so sure that this plus sign works well for two-way binding. So, let's try the next thing...a custom filter!

```
{% raw %}
<paper-slider min="0" max="365" value="{{mymodel.maxAge | toInteger}}" editable></paper-slider>
{% endraw %}
```

This is the part of Polymer that lets you define your own filter. To be clear..."toInteger" doesn't actually exist. I need to create it myself. From Polymer's documentation, I can do this:

```

toUpperCase: function(value) {
    return value.toUpperCase();
  },
```

Easy enough, right? I can adapt this filter (which is placed right on my current component's scope) to an integer filter like this:

```

toInteger: function(value) {
    return parseInt(value);
  },
```

Good? Unfortunately, no. Something ends up broken. I get the message **"Cannot find function or filter: toInteger"** when I move the slider, even though it's OK on the initial binding. So there are a few things going wrong here. The "toUpperCase" example in the Polymer docs isn't quite complete. It actually breaks when you try it!

Here's my implementation of their example:

```
{% raw %}
<div>{{mymodel.id | toUpperCase }}></div>

toUpperCase: function(value) {
   return value.toUpperCase();
},
{% endraw %}
```

The error I get says this: **"Uncaught TypeError: Cannot call method 'toUpperCase' of undefined"**. Thanks to a [helpful StackOverflow answer](http://stackoverflow.com/questions/23681366/polymer-custom-filters) I know now, that Polymer doesn't handle things well when the value is undefined or null. I'm guessing that when the initial component is loaded up, it doesn't have the data yet. Of course, since I'm loading my data from an external source it probably doesn't exist when the my binding requests it. So, we need to handle it:

```

        toUpperCase: function(value) {
            if (value) {
                return value.toString()
            } else { return "" }
        },
```

Cool? Yep...for the string based input field - but there is yet another aspect to string/integer conversion. Polymer offers a little more advanced functionality to define exactly how things render to the DOM and how they render to the model. So let's use this to tell Polymer to render the number from the data model as a string when going to the DOM, but render the string from the DOM as a number when going out to the data model:

```
{% raw %}
<paper-slider min="0" max="365" value="{{mymodel.maxAge | toInteger}}" editable></paper-slider>

        toInteger: {
            toDOM: function(value) {
                if (value) {
                    return value.toString();
                } else { return ""; }
            },
            toModel: function(value) {
                if (value) {
                    return parseInt(value);
                } else { return 0 }
            }
        },
{% endraw %}
```

And so there it is! Hopefully there are simpler ways to do this, but I couldn't find any. When you know how Polymer works - this DOES make sense, and it reveals a very expressive way to do custom filters. Secretly I'm hoping that the two-way binding using **{{+myvalue}}** is a bug and will be fixed someday. In the meantime, I have something that works!
