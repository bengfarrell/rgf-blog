---
title: "Where the *#$%! are my Windows 8 UI Button Graphics?"
date: "2012-11-16"
categories:
  - "design"
  - "development"
  - "html5"
  - "javascript"
  - "ui"
  - "windows8"
---

THIS is the question I was asking myself.  I was in the middle of porting my web app over to Windows 8, and said to myself - "Self, this looks good, but I think it could be a little more metro-ish".

Of course Metro isn't the term anymore, now it's Windows 8 UI - but the point is the same: Windows 8 has a pretty distinctive look, and if you're going to develop apps for it, you might want to follow suit.  Do as the Romans do....in Romantown....so to speak.

Windows 8 makes this fairly easy for you - from the VS Express home screen, you can elect to do a blank app or a grid app or several others.  It will auto-populate a fair amount of templating into your brand new project to make it look all Win8-ish.  I've noticed a few areas of the basic template that makes the look Win8's own.

**Animation**

If you elect to use the page navigation model, pages will slide in.  Its a nice subtle navigation effect.  It's also completely exposed in Javascript, so you can muck with it if you wish.  It's all in the navigation.js file that Visual Studio copies over for you.  It's also cool that there is a specific hook that you can include on a page definition.  If you define the function _getAnimationElements_ on your page JS like so:

```
WinJS.UI.Pages.define("/pages/about/about.html", {
        ready: function (element, options) {
        },

        getAnimationElements: function() {
           return myelement;
        }
```

...it will let you define which DOM element you'd like to animate.  You can pass back null as well if you don't want animation on that page.  I never did figure out why my animations for pages were freaking out and stuttering when I messed with things heavily on the HTML side, but by blindly putting things back in the code, I see that the section element seems pretty important here:

<section aria-label="Main content" role="main">

So leave that in unless you've cracked the mystery and can explain what happens better than I.

 

**Font**

Next up is the choice of font.  MS seems to LOOOOOOOVE their own font Segoe UI.  So, you should probably use that, especially on big headers and menu navigation groups and grids.  They make it pretty easy to use as well.  I've always used explicit ems or pixels in my CSS properties, but you can see values like "x-large", "xx-large", "medium", and "small" all over the place.  I didn't know this was actually valid in CSS, but briefly looking it up, I see that it's not just limited to Win8!

For things in an ```<h1>``` tag, this will be the standard header that most Win8 apps will use, so specifying any sort of font here is unnecessary.  Also cool is the "win-type-ellipsis" class that you can put on elements.  This class will truncate any text that's too wide and add a "..." to the end.  Very cool, especially in a fluid layout design when you can drop into snapped mode and things are very narrow.

 

**Buttons**

Lastly are the #$%#$% buttons I couldn't find.  Or at least it took me like an hour to figure out what was going on.  When doing page navigation on a typical page navigation demo app, they have a nice looking back button.  If you traverse to a page, click the back button that appears to go back in history.

![backbutton](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2012/11/backbutton.jpg) To me, this back button, the spacing, and the fonts around it just SCREAMS Windows Modern UI.  So if you want your application to look like a Windows 8 app, you should probably not fight the templates and use something similar.

Making your very own back button is easy, simply do this:

```<button aria-label="Back" type="button"></button>```

I've seen other similar looking buttons on media player controls in Windows as well, so it's best to duplicate that look on your buttons as well if you can.

How do you do that?  Well, it was a pain to track down.  I was on the wrong path looking for png image references in the WinJS source CSS files.  I even scanned through the Javascript trying to find some reference to how this worked!

The images are nowhere to be found, and that's because images aren't used!  Instead, WinJS uses the Segoe UI Symbol font.  It's like Wingdings except it looks better.  This font by MS is full of little icons.  Through the magic of CSS and border radii, a thin circle is drawn around the DOM element.  The contents of that element are the Segoe UI Symbol character itself.

Not typically doing anything funky with CSS on a normal basis myself, I was surprised to see the following CSS selector and definition:

```css
mybutton::before {

        _content: "\\E102";

}
```
That backslash is an escape character that lets you escape from the traditional tedium of entering real text and lets you enter unicode MADNESS.  What you'd do is load up the Windows Character Map program, select the Segoe UI Font, and select the character you want, and copy the code for it.  Here's me checking out the code for an alarm clock:

![charactermap](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2012/11/charactermap.jpg)

So here, I'd put backslash 23F0 into my CSS to make an alarm clock.   My alarm clock CSS button might look a little something like this:

```
.alarm {
    display: inline-block;
    min-width: 0;
    min-height: 0;
    background-clip: border-box;
    box-sizing: border-box;
    border-radius: 50%;
    border-width: 2px;
    border-style: solid;
    padding: 0;
    padding-top: 3px;
    margin-top:10px;
    margin-bottom:10px;
    text-align: center;
    width: 60px;
    height: 60px;
    font-size: 21pt;
}
.alarm:hover, .alarm:hover:active {
    border-width: 2px;
    border-style: solid;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
}
.alarm.play::before {
    font-family: "Segoe UI Symbol";
    font-weight: normal;
    font-size: 24pt;
    content: "\E102";
    vertical-align: middle;
}
```

And so, there you go - a few different Window 8 UI type touches that you can use on your application!  Including the one that inspired this post, that I swore under my breath for a good hour while trying to find.
