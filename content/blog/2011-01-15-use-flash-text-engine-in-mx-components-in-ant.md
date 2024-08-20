---
title: "Use Flash Text Engine in MX Components in ANT"
date: "2011-01-15"
---

The title of this post is what I googled endlessly for like 2 hours trying to figure out how to do this.

Hopefully you'll come here when you google this and get the answer you need. For you fine folks, I'll save you some time. Add this to your compiler options:

For the rest of you - maybe you'd like to know what this is or get a little more background.

"Use Flash Text Engine in MX Components" is a setting you can check in the Flash Builder compiler options for a project. Old style Halo (MX) components from Flex 3 use the old text engine.

As of Flex 4, we have a brand new text engine. Unfortunately, Adobe hasn't completely written all the new components yet for Flex 4 (Spark). This means that your Flex 4 project will probably have a mix of Spark and Halo (MX) components.

One of the most frustrating things about this mix for me is working with fonts. For Spark components, you need to embed your fonts in the Compact Font Format (embedAsCFF=true). For MX components, you need to embed your fonts as non CFF (embedAsCFF=false). This could potentially mean embedding one set of fonts for your MX components and another set for your Spark Components.

Not only does this increase your application size, but it can get really hairy trying to work with styles. You need to identify all components that use Halo/MX components and tell them to use the correct font. If you go low level like label, you need to recognize that things like Alerts are MX components and they use MX labels, while if you just make a Spark label, you'll be using Spark. So this means creating separate styles for s|Label and mx|Label.

Fortunately, Adobe made a workaround in our MX components. They allow you to use the new text engine in your MX components by checking the "Use Flash Text Engine in MX Components" option in Flash Builder.

![useFTEinMX](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2011/useFTEinMX.jpg)

While that's great in Flash Builder, what if you want to use this option outside of Flash Builder? What if you want to do a command line compile, or better yet create an ANT build file.

For the command line option, information is relatively easy to find: http://help.adobe.com/en\_US/flex/using/WSda78ed3a750d6b8f-26a13bbf123c441239d-8000.html

Basically just use the theme argument and add a theme to the compiler options -theme+=myflexhome/frameworks/projects/spark/MXFTEText.css

This is a special CSS file that Adobe made just for this purpose.

I was a little stumped on how to put it in an ANT build script, though. I tried:

Unfortunately, this completely replaces the theme, and doesn't add a CSS file to your themes. It worked decently enough for my project (save all the warnings I got).

Luckily another guy on my project, TJ Downes figured out that if you use the "append=true" ANT tag option, you can make this property additive, so you end up with:

So there you have it. I couldn't find this anywhere, so hope this helps you!
