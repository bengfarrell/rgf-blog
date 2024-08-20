---
title: "Physics for Flash AS3"
date: "2008-09-19"
categories: 
  - "flashflex"
  - "projects"
---

I've been playing a bunch with physics engines for the last few weeks.  Physics engines basically serve to give your Flash Sprites some mass and body.  Your physics world can update your graphics so they can bounce off each other, bounce off walls, fall to the forces of gravity, and succumb to other forces all in a semi-realistic manner.

My exploration first took me from Papervision3D to WOWEngine.  Papervision3D is, of course, the popular realtime 3D engine for Flash.  It doesn't have anything to do with phyics - but WOWEngine seems to be the hot dicussion for bringing physics into your 3D world.

WOW works like this....

Imagine a 3D world that you never see.  Yep, thats it.  That's what the WOW does.  It's the 3D world that never gets visualized in any way shape or form.  Of course, the 3D world in question has complete information about all objects in the world and how they interact with their surroundings and forces surrounding them.

It's actually a nice little setup - you get to keep your Papervision3D or regular 2D world separate from your physics world.  So you have 2 different worlds - each operating independently of each other.  The way you tie them together is with a single handler ENTER\_FRAME handler where you cycle through all the physics bodies and update your display with the proper x, y, z, or rotational properties.  The 2 worlds make it easy because you could use any 3D engine, 2D engine, or whatever engine you want and glue them together - there's no dependencies, no skinning, no nothing - so it's pretty handy, and a quick concept to grasp.  2 worlds - gotcha!

The problem is that the WOWEngine isn't that great of a physics engine (yet!).  Another unfortunate problem is that its the only Actionscript Physics engine that handles 3D.  So if you use 3D, you're kind of stuck using this or writing your own.

WOWEngine is based off of another engine called APE (Actionscript Physics Engine).  APE is a 2D physics engine that seems to actually be pretty good.  The problem with WOW, is that it has such potential, and works pretty well, but hasn't implemented the richer features of APE yet.  The author definitely plans to, it's on the roadmap, but I'm impatient need it now!

The killer feature that makes a great physics engine in my opinion is Rigid Body Dynamics - which APE has and WOW lacks.  To explain rigid body dynamics a little bit, let me tell you a little bit about my initial experimentation.

My big "hello world" application was basically making a few balls drop from the sky and hit the ground.  I initially tested in 2D, and just ignored the Z axis.  So we're talking normal Flash Sprites here.  So the balls hit the ground, bounced off of each other, all pretty cool - and what you'd expect from a physics engine.

Next I tried the same thing with squares.  Still cool, but not quite right.  That's because I still had to treat each square as a generic ball particle.  With no Rigid Body Dynamics - I couldn't build a little fortress with my cubes!  That's because without being able to define a polygon or even a cube, whatever graphics you have.....just sort of act like balls and slide off each other.

So that's the my big problem.  Someday WOW will be awesome, but not yet for my purposes.

Next I checked out Foam.  Foam is a 2D Physics engine for Actionscript 3.  Foam is actually pretty sweet!  I didn't spend long on it, though.  The reason is that after I experimented with WOW, I didn't really like how Foam worked.  It seemed to handle Physics well - but it seemed to integrate the graphics and physics world too much for me.  I think I preferred them seperate - especially in a situation where maybe I want to use a different graphics engine.  I didn't get far into Foam, but it seemed more like that Foam would take over your stage and you'd skin the physical bodies.  Before I went into this physics thing, it's how I expected things to work - but I just couldn't dig in after playing with WOW.

So again I moved on...

Finally I hit Box2DAS3.  This is the one I settled on - it has it's problems, but if you can overcome it, then I do think it's the best.  Box2DAS3  is a Actionscript 3 port of Box 2D.  Box 2D is an opensource physics package for C++.  In fact, Box2D has evolved to become Bullet - a 3D version of the physics engine.  Hopefully we'll see Bullet 3D someday soon.

Box2DAS3 supports all the great features a good physics engine should....well OK OK, I'm not an expert - it supports all the great features I \*think\* a good physics engine should.  It also follows my beloved 2 worlds philosophy that I liked from WOW/APE.  For me it's perfect....

....well almost perfect.  I think it has one flaw.  The flaw is that it's a C++ port, and not really specific to Flash.  If I went back in time and warned myself of this, I would've been pretty dismissive and said "So what?  Code is code!".

Well first of all it seems like classes have the bare minimum of comments - so you just kind of get the picture what everything does.  And it's really not clear what each class or package does - unless you know....um...how to write a physics engine.  So it's a little bit of a catch-22.  Like a simple body is name b2Body.  To create a body you need to create a shape definition (b2ShapeDef), convert that to a shape, and then convert the shape to a body, and then add the body to the world.  And it seems there's only one way to add a body to a world, and that's through a reference to the world, even though when you create a body from scratch, there's a world parameter - but it doesn't seem to work.  Well, I'm rambling.  Needless to say it's confusing for a newbie - and on top of that there are things like manifolds and AABB - all things I don't understand but there to get in the way and hamper learning.

But, if you study the examples they give you - you start to get a feel for how things work.  And once I did that - I stumbled a little, especially on design patterns - but got things working pretty well.  My design pattern quandry was that the framework was very incompatible with an inheritance based design - it was really going against the grain when I tried to use inheritance in my design.  What you really need to realize, is that a Factory type of design pattern works much better.

I ended up creating a base class like you would in Papervision3D.  The base class extends the stage and creates a common physics world setup as part of that stage.  Your main class would inherit this "physical stage" and contain the main stuff you want to program (hopefully keeping references to b2bodies and b2worlds to minumum, just cause it's hard to understand!).

On the side - I have a physical object factory static class.  Here's I'd call createPhysicalBall or something like that, and poof, it'd create me a ball....passing back seperate references for the graphics and the phyiscal body.

So that's how I roll with the physics.  It adds some great realism to the boring old games.
