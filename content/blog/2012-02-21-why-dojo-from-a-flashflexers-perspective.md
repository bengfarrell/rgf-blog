---
title: "Why Dojo?  From a Flash/Flexer's Perspective"
date: "2012-02-21"
categories: 
  - "development"
  - "dojo"
  - "flash"
  - "flashflex"
  - "flex"
  - "html5"
  - "javascript"
  - "ui"
---

Hey you guys...  Is your Twitter stream bombarded with Ted Patrick tweets and retweets about Sencha?  Do you get Sencha ads targeted at you when you visit websites, like EVERYWHERE you go?

I am.  It's kind of annoying since I'm not looking to learn Sencha.  Truthfully, though, you can hardly blame the current Sencha evangelist.  After Adobe abandoned Flex sending it off to Apache, Ted seems to be leading a HUUUUUUGE marketing push trying to turn former Flex devs into Sencha/ExtJS devs.  Ted is leading webinars, reaching out to people, posting on G+ threads, the whole deal.

I can hardly blame him because:

a) I follow him on Twitter, so it's mostly my own damn fault

b) This is the perfect time to grab a bunch of disillusioned and lost Flex devs, and Ted is doing it in a perfectly ethical (although a bit overzealous way).

I looked into going "beyond" jQuery because of a G+ post by Jesse Warden claiming that ExtJS is the perfect compliment to enterprise development.  He made the very apt analogy that Flash is to jQuery as Flex is to ExtJS/Sencha.  It really made me re-think things because it had been drilled into my brain that jQuery "won", and given the tide of developers ([84.8% of all websites using a library use jQuery](http://w3techs.com/technologies/cross/javascript_library/ranking)) it seemed like there was no reason to use anything else.

Turns out, there really is a use for the lesser used libraries/frameworks/toolkits.  We can see this because even if jQuery is and always will be your library of choice, as you build more advanced applications you might want some binding, templating, MVC, or other action.  AngularJS by Google is getting more widely used.  It gives you binding, declarative HTML markup for data, and other MVC goodies.  There's Backbone.JS, Underscore.JS, and tons of others.  A lot of folks seem to be combining all of these separate libraries together to custom fit their project.  And I'm sure that works fantastically - I was doing similar things for a time.

As these separate projects get more and more features, you may now have feature overlap between 3 different libraries you've used in your project.  It seems a LITTLE wasteful at best.  At worst, maybe your dev team does a very basic thing 3 different ways because binding is available 3 different ways given each of the libraries you're using.

Wouldn't it be better, or even just worth looking into, if you could find a cohesive library/framework that offered all of these things together? Maybe it could even do a little more and help you make a massive Javascript application that loaded in components and scripts AS YOU NEED THEM instead of all at once in the beginning.

It looked like Dojo and ExtJS were the most mature offerings in terms of what I describe.  I took a look at ExtJS by Sencha first.  At first glance, it looks pretty awesome.  You've got designer and animator tools.  They are a wee pricey, but considering my Flash background, spending $279 on Sencha Designer and $199 on Sencha Animator doesn't seem obscene.

What I can't get past is having to spend $329 for a Javascript library license!  When I'm doing Flash/Flex development, I use the Flash Builder IDE for coding and sometimes Flash Professional if I'm doing animations or graphics.  And that's cool.  I chose to buy into these tools.  I didn't have to pay to use Actionscript 3 though.  My fellow developers who may not do Flash all the time can crack open any text editor and edit my code.  They can check it back into SVN and contribute to the project.  They can launch the Flex SDK command line and build my project.  None of this costs a dime.

If and when they get more invested in Flash/Flex, they might then want to buy Flash Builder or even IntelliJ for the advanced featureset including debugging, profiling, etc.

Not so with ExtJS.  I'm buying a license to use the code base.  Kind icky in my mind.  If I start a project in ExtJS/Sencha and I pay my $329 for the seat, but then I want some more help on the project occasionally, each developer will then need to pay out $329 just to use/edit the code no matter what tools they use.  If you are starting a major project, and plan the ExtJS cost into the budget, then great.  But if you're a lone developer who wants to start something which blossoms into something bigger - the licensing can be a major roadblock.

Moreso, if I'm a consultant and I'm paid x dollars to develop a web application, I can easily choose and pay to use ExtJS.  After two months, I make a deliverable.  It might be the type of project where I do the major architecture and first phase, but then it gets shipped off internationally for maintenance mode or a lower cost second phase of the project.  Well, if you use ExtJS, you've just upped maintenance mode by $329 for every developer that needs to touch the project.  You've just cost your client lots of money.

This is why I discounted Sencha and ExtJS and moved on to exploring Dojo.  Dojo seems to offer MOST of what Sencha does.  They both have a rich set of components, offer lazy loading of scripts so that your massive enterprise application doesn't load several hundred scripts (or a huge 2MB block of script) before the application starts up.  Both have a build system - Dojo's runs on Rhino or Node, and is built on Closure or Shrinksafe.  ExtJS seems to be built off of a Yahoo builder.

In terms of scripting, both seem to nudge you in the direction of organizing your Javascript into classes which can be based on straight inheritance, or mixins.

Both seem to offer a visual tool for design.  Dojo's [Maqetta](http://maqetta.org/) is free and can be used for jQuery, YUI, or Dojo.  I don't see myself being very productive in it though - I can lay things out, but it wasn't obvious to me if I could wire in data or do anything extensive.  Though I haven't used Ext Designer, I have to imagine it's a better product than Maqetta.  But then I seriously question how much I'd use a good tool for this anyway.  It's like when everyone complains that design mode in Flex really sucks - but what if it didn't? Would you actually use it, or just code everything?  I think we'd use it only like 5% of the time.  But this is all personal preference - ExtJS wins here, but only if you feel like you need a good design tool, which I don't.

Dojo seems to offer one thing that ExtJS doesn't though - and that's declarative HTML markup.  This may be where my ExtJS ignorance comes in, so feel free to correct me if I'm wrong, but to mark up a component like you might do with Flex's MXML, you write a JSON object describing the component or layout you're introducing in ExtJS.  This is pretty cool - but with Dojo, you get to write REAL HTML.  I can tag existing divs or other elements as a Dojo component and they'll act like Dojo components.  Yes, Dojo does offer templating, but you can choose which to use...or even to use both.

The worst part of Dojo?  They don't have a MASSIVE marketing and tutorial push.  There is tons of ExtJS and Sencha material out there to learn from.  Yes, there is tons of Dojo material, but much of it is older and not up to date.  The material on the Dojo site is pretty technical and not very "quickstart-ish".  What quickstart material they do have, don't seem to be big picture enough to inform you what's really going on.  I always had bad luck copying and pasting code from tutorials and having it work without spending hours debugging.  Most of the trouble with Dojo material is the switch to new loading routines that happened with the 1.7 release in December 2011.  I feel like when they release 2.0 sometime this year, we'll have some better effort from the Dojo Foundation in terms of educating people on how to use the toolkit

All in all, Dojo and Sencha seem eerily similar from everything I read.  I feel so lucky that by learning Dojo, I'll probably feel right at home in ExtJS as well.  For me it really comes down to the licensing that drives me to Dojo.  If that wasn't an obstacle for me, there were more than a few times I've been frustrated by Dojo in the past couple weeks of learning it that I'd been open to abandoning ship if there was another choice.  I get the feeling though that there are similar frustrations with understanding ExtJS (helped in large part by their tutorials).

That's why I'm team Dojo right now!  However, I'll continue using jQuery for the smaller projects.  Dojo could easily replace jQuery, but for the smaller stuff when something minimal is all you need, there's no sense in going against the grain and using something that not many people have experience with.

I'll be posting more technical stuff on Dojo, but for now, this is how I got where I am!
