---
title: "ES6 Web Components Part 4 - Project Setup and Opinions"
date: "2015-10-27"
categories:
  - "development"
  - "gulp"
  - "html5"
  - "javascript"
  - "polymer"
  - "ui"
  - "web"
  - "web-components"
---

_This article continues my ES6 Web Components series. The last article was the third in the series: [Making an ES6 Component Class](/blog/2015/10/26/es6-web-components-part-3-making-an-es6-component-class/)._

So far, the basics have been pretty....basic. I hope I've given some ideas on how to create ES6 Web Components - but these basics only go so far. I do have some opinions on how to take this further, but they are only opinions that have made sense to me. The beauty of this is that you can hear me out and decide for yourself if these ideas are good for you.

## Project and File Setup

Lets start with dependencies. I like Babel to compile the ES6 and Gulp to do the tasks. Source maps are also a must in my book for debugging the compiled ES6 as Javascript! Also, given that WebComponents.js has been so instrumental in providing cross platform functionality, lets use that too.

Here's a sample package.json file:

```
{
  "name": "ccwc-slideshow",
  "version": "0.1.0",
  "dependencies": {
    "webcomponents.js": "^0.7.2"
  },
  "devDependencies": {
    "babel": "^5.8.21",
    "gulp": "^3.9.0",
    "gulp-babel": "^5.2.0",
    "gulp-sourcemaps": "^1.5.2"
  }
}
```

Next up is Gulp. I have nothing against Grunt...but I use Gulp. Frankly I stopped caring about the battle of the task runners and landed on the last one that I tried and liked. There probably won't be too many tasks - I just need to compile the ES6 to Javascript. However, I may have multiple components in my repo. As a result, I'll have a compile task per component. Here's a sample Gulpfile:

```
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

gulp.task('slide', function () {
  return gulp.src('src/ccwc-slide.es6')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('ccwc-slide.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./src'));
});

gulp.task('slideshow', function () {
  return gulp.src('src/ccwc-slideshow.es6')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('ccwc-slideshow.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./src'));
});

gulp.task('default', ['slide', 'slideshow']);
```

One last Javascript note: I like to have an ES6 extension on my ES6 files, and those to live in a "src" older. Some folks seem to be using .js, and then compiling them to "mycomponent-compiled.js". I don't like this for a couple of reasons. First, its not obvious that your source JS file is ES6, and secondly I kinda think it's silly to force devs to use a non-obvious naming convention when including a script. When you make your script tag, you should link to "mycomponent.js". Not "mycomponent dot, ummm...what was my naming convention last week?".

Your Web Component HTML files should live in your project root. When you link to a Web Component, you shouldn't need to remember what folder you put your stuff in...it should be a simple and easy to remember "mycomponent/mycomponent.html".

Lastly, your demo is important! A Web Component should demonstrate use! When I started out, I was making a "demo" folder in my component root, and putting an index.html or demo.html file in there. There's a problem with this though: if you use images (or other assets), the relative path to your image will be different from the demo folder than what it is during actual use of your component. Bummer. So I like to put a "demo.html" usage example in my component root. I still have a demo folder, but this folder would contain any assets to support running the demo that aren't really part of your component (like JSON data).

Actually - one more. This is the last one for real. Documentation for your component. I didn't think about it here, because I didn't even think of doing it for my components yet. My bad. My horrible horrible bad. Google's Polymer actually has a very nice self documenting structure which is very sweet. Maybe someday, I'll base whatever I plan to do about docs on that.

Here's a sample project structure of a component I made for showing a slide deck. You'll notice 2 components here. One is the slide deck viewer, and one is a component to show a single slide. The first uses the second inside it and it all works together. I have some sample slide deck contents in my demo folder:

![componentstructure](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2015/10/componentstructure.png) You'll notice that I have the compiled .js.map files and the .js files here, too. I check these in to source control. I always feel a little icky about checking in compiled files. For one, they don't NEED to be in source control since they are generated and don't need to be diffed. Secondly, you don't want to allow people to edit these files instead of editing the ES6 files. Lastly, I am occasionally forgetful of building then checking in! Sometimes only the ES6 files get checked in, and I'm left doing another commit of the compiled files when I remember that I didn't build.

All that said, I DO check these compiled files in. For my workflow, I want these file instantly useable after NPM installing my component. Forcing a compile step for an NPM module and requiring dev dependencies seem like an unnecessary burden on the end user. I'm always trying to think of ideas to make myself happy here on all counts, but I haven't yet.

## Component Class and Method Conventions

I've already documented the bare minimum of methods in your Web Component class. These include: "attachedCallback", "createdCallback", "detachedCallback", and "attributeChangedCallback". These, however, are just HTMLElement lifecycle callbacks. I have some other methods of my own I like to consistently use (all invented by me, of course, and not part of any spec).

**setProperties**

In ES6, there is no attaching properties directly to the class inline. Properties can only be set on the class from within a method. So I made my own convention that I consistently use. My "setProperties" method initializes all of the variables that would be used for the class. In other languages, public/private variables would be used at the top of a class. In ES6, I use my "setProperties" method for this and give my variables a little extra documentation/commenting.

**parseAttributes**

Once the component is created or attached, you may want to look at the attributes on your component tag to read in some initial component parameters. You could potentially scatter these all over your code. I like to read them all in one spot: "parseAttributes".

**registerElements and the "dom" object**

I really dug Polymer's "$" syntax. Anything in your component's HTML that had an ID, you could access with "this.$.myelement". Well, in my DIY Web Component world, I can't just magically expect to access this. I COULD querySelector('#myelement') everytime, but its more performant to save these references to a variable if you're using them often. And it also creates more readable code to save your important element references in well named variables. At the same time, though, it might be confusing to mix elements on your root "this" scope with other variables that aren't elements.

So here's what I do...

When I have a bunch of stuff that I want to reference in the imported HTML template at the very start, like buttons, text fields, whatever, I'll run my custom method "registerElements" in the attachedCallback after appending the template to my Shadow Root.

In "registerElements", I'll create a new Object called "dom" on my root scope "this" (this.dom = {};). I'll then querySelect any elements I want, grab the reference, and populate "this.dom.myelement" with the references. Then elsewhere in my code, I can just reference the property like a normal variable (but I know it's a DOM element since its in my "this.dom" object).

**root**

One last thing I do consistently....and this is not a method, but a property...is using a custom variable "root" to represent the Shadow DOM. So when I want to use querySelector on an element, I use "this.root.querySelector('myelement')". I COULD just call it "shadow". However, there's been a couple times I've been a bit wishy-washy about using the Shadow DOM, and I can just set "this.root" to the host content, or even the document if I wanted. In this fashion I can keep swapping around what "root" is to whatever I choose and keep my code pretty much the same.

## An Example

I'll leave you with a complete example of my Web Component that functions as a Slide Deck viewer. Remember, the slide inside is a web component on its own! In my next post, I'll wrap this whole thing up and link you all to my real components.

```

class CCWCSlideShow extends HTMLElement {
  setProperties() {
    /**
     * slides deck
     *
     * @property deck
     * @type string
     */
    this.deck = '';

    /**
     * next slide key mapping
     *
     * @property nextSlideKey
     * @type integer
     */
    this.nextSlideKey = 39; // right arrow key

    /**
     * previous slide key mapping
     *
     * @property previousSlideKey
     * @type integer
     */
    this.previousSlideKey = 37; // left arrow key

    /**
     * toggle timer key mapping
     *
     * @property toggleTimerKey
     * @type integer
     */
    this.toggleTimerKey = 84; // "t" key

    /**
     * timer start time
     *
     * @property timer start time
     * @type Number
     */
    this.timerStartTime = 0;

    /**
     * current slide/chapter
     *
     * @property current slide/chapter
     * @type object
     */
    this.current = { chapter: 0, slide: 0 };

    /**
     * running
     * is slide deck running (being timed)
     * @property running
     * @type boolean
     */
    this.running = false;

    /**
     * slides
     *
     * @property slides
     * @type array
     */
    this.slides = [];
  };

  /**
   * register dom elements
   */
  registerElements() {
    this.dom = {};
    this.dom.slideviewer = this.root.querySelector('#slideviewer');
    this.dom.slideinfo = this.root.querySelector('.infobar .slides');
    this.dom.runtime = this.root.querySelector('.infobar .runtime');
  };


  /**
   * ready
   *
   * @method ready
   */
   init() {
    this.loadDeck('./deck/manifest.json');
    document.addEventListener('keyup', event => this.onKeyPress(event) );

    setInterval( () => {
      if (this.running) {
        var duration = Math.floor((new Date().getTime() - this.timerStartTime) / 1000);
        var totalSeconds = duration;
        var hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = totalSeconds % 60;
        if (seconds.toString().length == 1) {
          seconds = "0" + seconds;
        }
        if (minutes.toString().length == 1) {
          minutes = "0" + minutes;
        }
        this.dom.runtime.innerText = hours + ":" + minutes + ":" + seconds;
      }
    }, 1000);
  };

  /**
   * toggle timer
   *
   * @method toggleTimer
   */
  toggleTimer() {
    this.running = !this.running;
    if (this.timerStartTime === 0) {
      this.timerStartTime = new Date().getTime();
    }
  };

  /**
   * on keypress
   * @param event
   */
  onKeyPress(event) {
    switch(event.keyCode) {
      case this.nextSlideKey:
            this.nextSlide();
            break;

      case this.previousSlideKey:
            this.previousSlide();
            break;

      case this.toggleTimerKey:
            this.toggleTimer();
            break;
    }
  }

  /**
   * load chapter in slide deck
   * @param index
   * @param uri
   */
  loadChapter(index, name, uri) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          var chapter = JSON.parse(xmlhttp.responseText);
          chapter.index = index;
          chapter.name = name;
          this.chapters.push(chapter);
          this.chapters.sort(function(a, b) {
            if (a.index > b.index) { return 1; } else { return -1; }
          });
          this.manifest.slideCount += chapter.slides.length;
          this.goSlide(0, 0);
        }
      }
    };
    xmlhttp.open("GET", uri, true);
    xmlhttp.send();
  };

  /**
   * load deck
   * @param uri of manifest
   */
  loadDeck(uri) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          this.manifest = JSON.parse(xmlhttp.responseText);
          this.manifest.slideCount = 0;
          this.dom.slideviewer.imgpath = this.manifest.baseImagePath;
          this.dom.slideviewer.htmltemplatepath = this.manifest.baseHTMLTemplatePath;

          this.chapters = [];
          for (var c = 0; c = this.chapters[this.current.chapter].slides.length) {
      this.current.slide = 0;
      this.current.chapter ++;

      if (this.current.chapter >= this.chapters.length) {
        this.current.chapter = 0;
      }
    }
    this.goSlide(this.current.chapter, this.current.slide);
  };

  /**
   * previous slide
   */
  previousSlide() {
    this.current.slide --;
    if (this.current.slide < 0) {
      this.current.chapter --;

      if (this.current.chapter < 0) {
        this.current.chapter = this.chapters.length - 1;
      }
      this.current.slide = this.chapters[this.current.chapter].slides.length - 1;
    }
    this.goSlide(this.current.chapter, this.current.slide);
  };

  /**
   * go to slide
   * @param {int} index of chapter
   * @param {int} index of slide
   */
  goSlide(chapter, slide) {
    this.current.chapter = chapter;
    this.current.slide = slide;

    var slidecount = slide;
    for (var c = 0; c  {
        this.dom.slideviewer.setText(item.html, item.region);
      });
    }

    if (sld.images) {
      sld.images.forEach( item => {
        this.dom.slideviewer.setImage(item.image, item.region);
      });
    }

    if (sld.background) {
      this.dom.slideviewer.setBackgroundImage(sld.background, sld.backgroundProperties);
    }
  };

  /**
   * getter for slide element
   *
   * @return slide element
   */
  getSlideComponent(id) {
    return this.dom.slideviewer;
  };

  /**
   * getter for slide element
   *
   * @param {string} class name
   * @return {array}
   */
  getHTMLIncludeElementsByClass(clazz) {
    return this.getSlideComponent().getHTMLIncludeElementsByClass(clazz);
  };

  // Fires when an instance was removed from the document.
  detachedCallback() {};

  // Fires when an attribute was added, removed, or updated.
  attributeChangedCallback(attr, oldVal, newVal) {};

  /**
   * parse attributes on element
   */
  parseAttributes() {
    if (this.hasAttribute('deck')) {
      this.deck = this.getAttribute('deck');
    }

    if (this.hasAttribute('nextSlideKey')) {
      this.nextSlideKey = parseInt(this.getAttribute('nextSlideKey'));
    }

    if (this.hasAttribute('previousSlideKey')) {
      this.previousSlideKey = parseInt(this.getAttribute('previousSlideKey'));
    }

    if (this.hasAttribute('toggleTimerKey')) {
      this.toggleTimerKey = parseInt(this.getAttribute('toggleTimerKey'));
    }
  };


  // Fires when an instance of the element is created.
  createdCallback() {
    this.setProperties();
    this.parseAttributes();
  };

  // Fires when an instance was inserted into the document.
  attachedCallback() {
    let template = this.owner.querySelector('template');
    let clone = document.importNode(template.content, true);
    this.root = this.createShadowRoot();
    this.root.appendChild(clone);
    this.registerElements();
    this.init();
  };
}

if (document.createElement('ccwc-slideshow').constructor !== CCWCSlideShow) {
  CCWCSlideShow.prototype.owner = (document._currentScript || document.currentScript).ownerDocument;
  document.registerElement('ccwc-slideshow', CCWCSlideShow);
}

```

_[Continue on to the conclusion of my ES6 Web Component Series](/blog/2015/10/26/es6-web-components-part-5-wrapup/)_
