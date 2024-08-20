---
title: "Windows for Front End Web Development"
date: "2014-01-16"
categories: 
  - "development"
---

I've been using Ubuntu as my development environment for around 2 years now. Getting to know Linux has been surprisingly enjoyable - I had tried both Mint and Ubuntu, both of which were stellar OS's. I didn't switch from Windows back then because I expected a better OS, really. I did it because the web development world as we know it was using Apple's OSX en masse. To me, Apple has always been a little pricey for what it is. I also had a little bit of attitude at the time against Apple - it seemed to be taking over the world while creating it's own walled garden, and I wanted no part of that. Regardless of whether you have Apple hate, there was one thing that OSX had that was a big part of modern web development: the command line terminal.

Not having used the command line much since DOS days, I wanted to know what I was missing. To know the web dev world, I needed to immerse myself in the Linux command prompt that OSX had. And with my dislike of Apple, plus already owning a Windows laptop - I went the dual boot Windows/Ubuntu route. It was an awesome learning experience. With all of my dev work on the Ubuntu partition, I almost stopped using Windows entirely.

Despite how good Ubuntu is, I had a couple of nagging problems. The first was that my battery life was significantly shorter on Ubuntu. I have the feeling that it was because of the pre-installed Lenovo/Windows power management tools that were pre-installed on the Windows side of things. Second, and most important - was the lack of the Adobe Creative Suite. As much as I'd love to stop relying on our expensive industry standard tools, it was REALLY inconvenient to boot over to Windows every time I wanted to tweak a graphic.

I tried to get used to Gimp and Inkscape, but I really just couldn't. Graphics were a pretty big sticking point that disrupted my flow.

Past that, Ubuntu proved a pretty awesome environment for not only doing real work, but a good baseline to see what was REALLY cross platform. All of the tools we know and love in the web dev world work cross platform: WebStorm, Node.js, Git, Grunt, Bower, Yeoman, Sublime Text, Chrome, Firefox, etc. More significantly, while I was learning the Unix command line syntax - I was also learning some syntax that doesn't change from Windows to Linux to OSX. If you learn Git or Grunt on Linux, you've learned it on Windows as well.

That was the key. If all we're doing is using cross platform command line utilities, then when it comes to OS choice, what's the diff? One of the main differences for people accustomed to Windows was that it really doesn't seem worth it to give the command line a chance. It seems counter to our nice GUI progress. I was certainly inclined to find visual based tools so as not to EVER touch the command line.

But, after adopting Linux, the command line became second nature...it just felt like the right way to do certain things. So, when I got a new machine this past December - I was faced with a choice. Keep the copy of Windows 8.1 that it shipped with? Or dual boot Ubuntu again? Ultimately, I decided to see how much effort it was to rebuild my dev environment in Windows.

All the usual suspects work as expected. WebStorm, Sublime, Node, Git....they all work great. Of course, as every Windows person can attest, the "command prompt" sucks. Luckily there are alternatives!

First I grabbed [Console2](http://sourceforge.net/projects/console/). This is a great little replacement for the normal Windows Command prompt. Everything is configurable, just as good as the terminal from OSX or Linux. Though, what you type in the command line will be DOS based - so it takes some getting used to. No more "ls" to list directory contents - now it's "dir". But guess what? Install [GOW (Gnu on Windows)](http://blogs.msdn.com/b/matt-harrington/archive/2012/06/03/run-gnu-commands-on-windows-with-gow.aspx)! GOW will give you loads of the more commonly used Linux commands to use on Windows instead of the DOS syntax.

Lots of stuff is covered now! My command prompt with Console2 and GOW is as nice as it ever was on Linux/OSX. I briefly installed Cygwin which has it's own command prompt and covers much more in the way of Linux, but unfortunately Node.js didn't like the unholy combo of running a virtual Linux on Windows (I think it was all line-ending characters that screwed it up).

My favorite IDE looks just like it did before - except the terminal is now Windows based. But with GOW installed, it works pretty much the same.

All in all, fantastic. My Windows setup seems just about as good as my Ubuntu setup was. Now, however, I can just boot up Photoshop for quick graphical edits. And when I want to play around with WebGL, the browser/OS support will be better.

What about just getting a Mac? Still a little overpriced for my taste. At my dayjob, I was given a MacBook Air. It's a nice machine - very tiny and comfortable in your lap. The battery turned out to be atrocious though. Barely lasts me 1.5 hours! The form factor did give me a taste for more with my Windows machine, though. That's why I bought a [Lenovo Yoga 2](http://shop.lenovo.com/us/en/laptops/ideapad/yoga/yoga-2-pro/). At around $1k, its close to the price of the Air. It's pretty much the same size, too. Some of the nice extras turned out to be a better battery life, and a screen that flips around back to be a tablet.

What really sets it apart for me, though, is the crazy good display resolution (3200x1800) and the fact that the screen is a touch screen. How handy is it if I'm working on a mobile version of my web application, and I can develop/test my touch events right on my dev machine itself?

Anyway, its quite nice to take my fear from 2 years ago that you really need a specific OS to do web development and debunk it. I've learned that if you use Windows, just make sure to TRY working outside of your comfort zone and get into the command line way of doing things. It really is worth it, and you'll set yourself up for some expertise that the rest of the community is already on to.

This also proves one of the PC's main strengths over Apple - the fact that there are many companies trying out many different form factors. I don't need to wait for Apple to make me a Macbook Air with a Retina touchscreen - I can simply buy one from another manufacturer.

I should also disclose that now that I've been using Windows, OSX, and Ubuntu constantly - I like them all. Windows 8 has quirks, sure. I don't like how I keep accidentally swiping the edge of my trackpad and loading the Metro view. But then I have similar complaints for OSX and Ubuntu. That's the beauty of doing web development. I can just switch my OS again if I get sick of my current one.

Hope that helps someone who might feel "stuck" on their PC and is wondering if they need to switch to Apple. Of course the answer is no, it's not necessary - but there's also certainly no reason not to give OSX or Ubuntu a chance. Try it all, and see what sticks for your personal taste!
