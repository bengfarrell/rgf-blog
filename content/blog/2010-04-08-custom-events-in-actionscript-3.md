---
title: "Custom Events in Actionscript 3"
date: "2010-04-08"
categories: 
  - "flashflex"
tags: 
  - "actionscript"
  - "as3"
  - "events"
  - "flash"
  - "flex"
---

A friend of mine recently tweeted that found that he could create custom events for his project, but he found it rather mysterious - and he didn't really understand what he was doing even though he followed the instructions and was able to make them work in his project.

Since I use nothing but custom events in my projects, I thought they'd be a good blog post subject.

So.....custom events.  Why do you want them?

Well, first lets think about the everyday Flash events. I use flash.events.Event and flash.events.MouseEvent all the time. There are the obvious uses, like when you click on something - you listen for the "click" event type by saying addEventListener("click", onClick).

But, how do you know it's "click"? It could be anything. I hate looking at the docs for every little thing. So, it's much easier to type "MouseEvent." into my code editor and watch it auto suggest stuff for me. You can look through and see MOUSE\_DOWN, MOUSE\_UP, CLICK, etc, all as options.

So I end up with addEventListener(MouseEvent.CLICK, onClick). It's easy, there's no chance I mistyped it because I didn't type it - my code editor did.

But then you might be moving on to creating your own events. Say you're loading a file. Whether the file loads, fails, the user cancels, you want to know when it's done - so you might dispatchEvent(new Event(Event.Complete)) to let other parts of your project know that the operation is complete regardless of how it completes, just so those other parts know the file loading is done and they can move on with whatever they're doing. Event.COMPLETE is handy for whenever you want to wire up completion events - just like Event.CLOSE is great for when you have stuff that's closing and Event.INIT is great when you have stuff that you're finished initializing.

What about other types of events? What about events that are specific to your project? For example, say I'm making a game. In the game, I have a rubber ball that the user can interact with. The user can bounce the ball, roll the ball, throw the ball, and spin the ball. The logistics of the user interaction to the ball doesn't matter here, we're just worried about the events that get dispatched.

Let's name our events:

1\. "bounceBall" 2. "rollBall" 3. "throwBall" 4. "spinBall"

Now, I could simply just use a normal Flash event. My ball dispatches events in the fashion of "dispatchEvent(new Event("bounceBall"));"

...and I listen to my ball bouncing by adding an event listener: "ball.addEventListener("bounceBall", onBounceBall);"

That would work OK, but I'd have to keep looking up what I named the different events, and make sure they match in all parts of my project. God forbid I make a typo - I could be stuck for hours with a "bounceeBall" event not knowing that I accidentally typed an extra "e" in my dispatcher.

No - I like to name my events in static constants, and put them inside the event. That way I can start typing "BallEvent...", and my code editor will autofill the rest.

So the first step is to make a BallEvent by overriding the Flash Event class:

```
package events
{
	import flash.events.Event;

	public class BallEvent extends Event
	{
		public static const BOUNCE_BALL:String = "bounceBall";
		public static const THROW_BALL:String = "throwBall";
		public static const ROLL_BALL:String = "rollBall";
		public static const SPIN_BALL:String = "spinBall";

		public function BallEvent(type:String, bubbles:Boolean=false, cancelable:Boolean=false)
		{
			super(type, bubbles, cancelable);
		}
	}
```

So I have a nice little BallEvent class. Now there's no chance of typos. I can dispatchEvent(new BallEvent(BallEvent.ROLL\_BALL)) and addEventListener(BallEvent.ROLL\_BALL, onRollBall)); and if I DO make a typo, my code compiler will complain and tell me where I went wrong before my SWF ever gets created.

One thing worth mentioning is the "public static const". If you aren't aware of this syntax - a static is a variable that is accessed as a singleton. That is, you don't need to create a new BallEvent object in memory to use it - just say BallEvent.ROLL\_BALL, and you'll get the value: "rollBall". Also, a "const" is a constant value - it's something that never changes and you hardcode it ahead of time and don't set it at runtime.

So that's one advantage of custom events - and a good one. Things are readable and typos don't exist. Furthermore, things can be grouped pretty well. My BallEvent class can have all my BallEvents whereas my FrisbeeEvent class can have all my Frisbee events.... it just leads to good organized code.

Now that's all well and good - but maybe you said to yourself "Self, it's great I know that my Ball is bouncing, but what time did it bounce, and at what angle, and at what velocity?

Well, I could receive the Ball bounce event, and say: var bounceAngle = ball.bounceAngle;

But what good is that? The angle of the bounce is a snapshot of a moment in time. Maybe the angle has changed in the time between when I got the event and when I'm asking the ball what the angle is. All these things can change - ESPECIALLY when you change them yourself. What if you had special code to increase the velocity of the ball when it bounces off something? Well, guess what? You could increase the velocity on the ball bounce event, but then later on in your code, you could try to get the velocity. These order of event things can get confusing. Are you getting the velocity before the you changed it? Or is it after you changed it? It can get downright undependable and muddled.

However, if you included these values in your event, you can insure that you are grabbing these properties at the moment in time that they happened, whenever you want rather than relying on guesswork.

So let's add a couple properties to the BallEvent. I want to track velocity, time, and angle.

public static const SPIN\_BALL:String = "spinBall";

```
                public var time:int;
                public var velocity:int;
                public var angle:int;

		public function BallEvent(type:String, eventTime:int, eventVelocity:int, eventAngle:int, bubbles:Boolean=false, cancelable:Boolean=false)
		{
                        time = eventTime;
                        velocity = eventVelocity;
                        angle = eventAngle;
			super(type, bubbles, cancelable);
		}
	}
```

So here, I just added the properties I want to the event. When I dispatch the event, I pass them in: dispatchEvent(new BallEvent(BallEvent.ROLL\_BALL, 50, 21, 90));

And then when I get receive the event, I can get all the properties I need!

public function onBallRoll(event:BallEvent):void { var myAngle:int = event.angle; }

That's the basics of the custom event - but there are some best practices that folks like to follow....

The first one is to implement a "clone" method. Let's say that you listened and caught the event, but you really just want to pass it on to another class by dispatching the event from the class that caught it. Well you can call event.clone(), and you'll get a copied event. Unfortunately, those extra properties you added won't be cloned. So let's look at a sample overridden clone method:

```
	public override function clone():Event {
		var event:BallEvent = new BallEvent(this.type, this.time, this.velocity, this.angle, this.bubbles, this.cancellable);
		return event;
	}
```

So here you're actually creating a new BallEvent in this method and returning it when you clone. You're using your public properties that you set when you originally made the event, and just rolling them into this new event. The only thing a little unintuitive here is that the return type is a normal Flash Event. Well.. it needs to be, because you're overriding the Flash Event's clone function (Flash will complain otherwise), but don't worry - when you receive the event it will be cast as the BallEvent with all the properties you need.

For example, in:

public function onBallRoll(event:BallEvent):void

The event, if it originally started off as a BallEvent (even if it got casted to Event through cloning or otherwise), will still come through here as a proper BallEvent.

Honestly, sometimes I get lazy and don't implement a clone event. Then several weeks later I need to clone the event and I curse my laziness. But sometimes that never happens. So it's up to you if you think you need it.

Another "pro-tip" is to use getters and setters. Remember the concept of your properties, and how they represent a snapshot in time of the Ball? Well, some people feel that this isn't good enough. Say I'm an evil programmer, intent to sabotage you and your events. I could listen for your event, program a line that says

event.time = 9999;

....and then clone and dispatch your event. You'd never catch on to my evil attempts. I've changed a property on the event - and then I passed the event on like nothing happened. It no longer represents a true snapshot in time - more like a doctored snapshot in time.

So, some folks try to stop this. They create getters but no setters. That way if an external class tries to change the property, it will cause your compiler to throw errors, thus saving you from malicious programming.

Let's take a peek at a prim and proper finished BallEvent:

```
package events
{
	import flash.events.Event;

	public class BallEvent extends Event
	{
		public static const BOUNCE_BALL:String = "bounceBall";
		public static const THROW_BALL:String = "throwBall";
		public static const ROLL_BALL:String = "rollBall";
		public static const SPIN_BALL:String = "spinBall";

                protected var _time:int;
                protected var _velocity:int;
                protected var _angle:int;

                public function get time():int {
                    return _time;
                }

                public function get velocity():int {
                    return _velocity;
                }

                public function get angle():int {
                    return _angle;
                }
		public function BallEvent(type:String, eventTime:int, eventVelocity:int, eventAngle:int, bubbles:Boolean=false, cancelable:Boolean=false)
		{
                        _time = eventTime;
                        _velocity = eventVelocity;
                        _angle = eventAngle;
			super(type, bubbles, cancelable);
		}

	        public override function clone():Event {
		     var event:BallEvent = new BallEvent(this.type, _time, _velocity, _angle, _bubbles, _cancellable);
		     return event;
	        }
	}
```

Well, OK maybe if I was being all proper, I'd throw some ASDoc or some other type of comments in there - but you get the picture.

But my last point here is that I've set all my variables as protected (and I usually put an underscore in front of my protected variables because of a habit I have). The protected variables can't be get or set except by the BallEvent class or anything that extends it (like a RubberBallEvent class or a BaseBallEvent class). So these properties are completely locked in and can't be changed by other classes. But I make them accessible through my getters.

There are other little tricks I sometimes do too. Like in a current project I have a dashboard full of buttons. When I click my dashboard, I dispatch a Dashboard.CLICK event type. But then the actual button clicked is a property called ID, or maybe it's a reference to the actual button.

This saves me a step. Instead of adding an event listener for each and every button in my dashboard, I can simply add one event listener to my dashboard for clicking an event. And then I can have logic in my event handler for deciding what to do based on what event was clicked.

Events are usually pretty simple too, but sometimes you can make them more complex. Like say you could dispatch an event with a time property, but then have several methods to format that time property however you like. Maybe your time is originally a huge number like 22531245665.

Getting this time might be useless to display to normal people. Maybe you want to include a formattedTime function in your event. Instead of getting event.time, you could get event.formattedTime and get "April 17, 2010 2:03PM".

So that's how to do custom events! Hope it helps.
