---
title: "A-Bad attitude about A-Frame (I was wrong)"
date: "2017-07-14"
categories: 
  - "design"
  - "development"
  - "html5"
  - "vr"
  - "web"
  - "web-components"
---

I haven't written many posts lately, especially tech related. The reason why is that I've been chasing the mixed reality train and learning. 3D development in general has had a number of false starts with me, and I never went in the deep end until now. This past year or so, I've been using both Unity and WebVR.

## My failed 3D career

Prior to this, I went through a Shockwave 3D phase in the early 2000's. People forgot about that REALLLLLLL quick. Likewise when I got all excited about Flash's CPU based 3D engine Papervision (not Macromedia made, but for Flash), I remember learning it and then the hype died down to 0 within a few months. And then of course, there was Adobe Flash's Stage3D. But as you might recall, that was about the time that Steve Jobs took the wind out of Flash's sails and it was knocked down several pegs in the public eyes.

Whatever your opinion on Director or Flash, it doesn't matter. Approachable 3D development never felt like it had a fair shot (sorry, OpenGL/C++ just isn't approachable to me or lots of people). In my opinion, there were two prime reasons for this. The first is that GPU's are really just now standard on everyone's machine. I remember having to worry about how spectacularly crappy things would look with CPU rendering as a fallback. Secondly, and this is huge: visual tooling.

Don't believe me? I think the huge success of Unity proves my point. Yes, C# is approachable, but also, being able to place objects in a 3D viewport and wire up behaviors via a visual property panel is huge. Maybe seasoned developers will eventually lay of this approach, but it introduces a learning curve that isn't a 50ft high rock face in front of you.

Unity is fantastic, for sure, but after being a Flash developer in 2010 and my career seemed to be crumbling around me, I'm not going to be super quick to sign up for the same situation with a different company.

## Hello, WebVR

So, enter WebVR. It's Javascript and WebGL based, so I can continue being a web developer and using existing skills. It's also bleeding edge, so it's not like I have to worry about IE (hint: VR will never work on IE, though [Edge's Mixed Reality support](http://caniuse.com/#feat=webvr)  is now the only publicly released version of WebVR (FF and Chrome WebVR are in experimental builds)! Point being, is that all those new ES6 features I dig, I can use them freely without worrying about polyfills (I do [polyfill for import](https://github.com/ModuleLoader/es-module-loader), though....but that's another article for another time).

Those of us who were excited about WebVR early on, probably used [Three.js](https://threejs.org/) with some extensions. As excitement picked up steam, folks started packaging up Three.js with polyfills to support everything from regular desktop mouse interaction, to Google Cardboard, to the Oculus Rift and Vive, all with the same experience with little effort from the developer.

I found that object oriented development with ES6 classes driving Three.js made a lot of sense. If you take a peek at any of the examples in Three.js, they are short, but the code is kind of an unorganized mess. This is certainly forgivable for small examples, but not for big efforts that I might want to try.

So, I was pretty happy here for a while. Having a nice workflow that you ironed out doesn't necessarily make you the most receptive to even newer ways, especially those that are super early and rough around the edges.

## Enter A-Frame

I believe early last year (2016), when I was attending some meetups and conference sessions for WebVR and [Mozilla made a splash with A-Frame](https://aframe.io/). Showing such an early release of A-Frame was a double edged sword. On the plus side, Mozilla was showing leadership in the WebVR space and getting web devs and designers interested in the promises of approachable, tag based 3D and VR. The down side was that people like me who were ALREADY interested in WebVR and already had a decent approach for prototyping were shown an alpha quality release with a barely functional inspection and visual editing tool that didn't seem to offer anything better than the [Three.js editor](https://threejs.org/editor/).

As I wasn't excited about it at all, I also reasoned that the whole premise of A-Frame was silly. Why would a sane person find value in HTML tags for 3D elements?

Months passed, and I was happy doing my own thing without A-Frame. I even made a little prototyping library based on existing WebVR polyfills with an ES6 class based approach for 3D object and lifecycle management. It was fairly lightweight, but it worked for a couple prototypes I was working on.

## A-Frame Round 2

Right around when A-Frame released 0.4 or 0.5, the San Francisco HTML5 meetup group invited them on for another session in another WebVR event. The A-Frame community had grown. There were a crazy number of components that their community built because...hey A-Frame is extensible now (I didn't know that!). The A-Frame visual inspector/editor is now the really nice and accessible as a debug tool from any A-Frame scene as you develop it. Based on the community momentum alone, I knew I had to take a second look.

To overcome my bad A-Frame attitude, I carved out a weekend to accomplish two goals:

- Reason an organized and scalable workflow that doesn't look like something someone did in 2007 with jQuery
- Have a workflow where tags are completely optional

I actually thought these might be unreasonable goals and I was just going to prove failure.

## A-Scene

As I mentioned briefly, I had my own library I was using for prototyping. Like I said it was basically a package of some polyfills that had already been created for WebVR with some nice ES6 class based organization around it.

I knew that A-Frame was built much the same way - on top of Three.js with the same polyfills (though slightly modified). What I didn't count on was that our approach to everything was so similar that it took me just a few hours to completely swap my entire foundational scene out for their <a-scene> tag, and.... it...worked.

This blew my mind, because I had my own 3D objects and groups created with Three.js and the only tag I put on my HTML page was that <a-scene> tag.

Actually, there were a few hiccups along the way, but given that I was shoving what I thought was a square peg into a round hole, two minor code changes are nothing.

My approach is like so:

Have a "BaseApplication" ES6 class. This class would be extended for your application. It used to be that I'd create the underlying Three.js scene here in the class, but with A-Frame, I simply pass the <a-scene> element to the constructor and go from there. One important application or 3D object lifecycle event is to get a render call every frame so you can take action and do animation, interaction, etc. Prior to A-Frame, I just picked this event up from Three.js.

Like I said, two hiccups. First, my application wasn't rendering it's children and I didn't know how to pickup the render event every frame. Easy. First pretend it's an element by assigning an "el" property to the class and set it to playing:

```
this.el = { isPlaying: true };
```

Next, simply register this class with the A-Frame scene behaviors like this:

```
this._ascene.addBehavior(this);
```

Once this behavior is added, if your class has a "tick" method, it will be fired:

```
/**
* a-frame tick
* @param time
*/
tick(time) {
...
}

```

Likewise, any objects you add to the scene, whom you want to have these tick methods, simply add them to the behavior system in the same way.

In the end my hefty BaseApplication.js class that instantiated a 3D scene, plugins, and polyfills, was chopped down to something 50 lines long (and I DO use block comments)

```
export default class BaseApplication {
    constructor(ascene, cfg) {
        if (!cfg) {
            cfg = {};
        }
        this._ascene = ascene;
        this._ascene.appConfig = cfg;
        this._ascene.addBehavior(this);
        this.el = { isPlaying: true };
        this.onCreate(ascene);
    }

    get config() {
        return this._ascene.appConfig;
    }

    /**
     * a-frame tick
     * @param time
     */
    tick(time) {
        this.onRender(time)
    }

    /**
     * add objects to scene
     * @param grouplist
     */
    add(grouplist) {
        if (grouplist.length === undefined) {
            grouplist = [grouplist];
        }
        for (var c in grouplist) {
            grouplist[c].addedToScene(this._ascene);

            if (grouplist[c].group) {
                this._ascene.appendChild(grouplist[c].group);
                this._ascene.addBehavior(grouplist[c]);
            } else {
                this._ascene.appendChild(grouplist[c]);
            }
        }
    }
 // meant to be overridden with your app
 onCreate(ascene) {}
 onRender(time) {}
}

```

As you might be able to tell, the only verbose part is the method to add children where I determine what kind of children they are: A-Frame elements, or my custom ES6 class based Object Groups.

## How I learned to Love Markup

So, at this point I said to myself..."Great! I still really think markup is silly, but A-Frame has a team of people that will keep up with WebVR and will update the basics as browsers and the spec evolves, and I should just use their <a-scene> and ignore most everything else.

Then, I hit ctrl-alt-i.

For those that don't know, this loads the A-Frame visual inspector and editor. Though, of course, it won't save your changes into your code. Let me say first, the inspector got reallllllly nice and is imperative for debugging your scene. The A-Frame team is forging ahead with more amazing features like recording your interactions in VR so you can replay them at your desk and do development without constantly running around.

So, when I loaded that inspector for the first time, I was disappointed that I didn't see any of my objects. I can't fault A-Frame for this, I completely bypassed their tags.

That alone roped me in. We have this perfectly nice visual inspector, and I'm not going to deny my use of it because I can't be convinced to write some HTML.

## Using Tags with Code

At this point, me and A-Frame are BFF's. But I still want to avoid a 2008 era jQuery mess. Well, turns out, 3D object instantiation is about as easy in A-Frame as it is with code. It's easier actually because tags are concise, where as instantiating materials, primitives, textures, etc, can get pretty verbose.

My whole perspective has been flipped now.

- Step 1: Create that element, just set that innerHTML to whatever or createElement and set attributes individually
- Step 2: appendChild to the scene (or another A-Frame element)

That's it. I'm actually amazed how responsive the 3D scene is for appending and removing elements. There's no "refresh" call, nothing. It just works.

I actually created a little utility method to parse JSON into an element that you could append to your scene:

```
sceneElement.appendChild(AFrameGroup.utils.createNode('a-entity', {
    'scale': '3 3 3',
    'obj_model': 'obj: ./assets/flag/model.obj; mtl: ./assets/flag/materials.mtl',
    'position': '0 -13 0'
}));

AFrameGroup.utils.createNode(tagname, attributes) {
```

```
    var el = document.createElement(tagname);
    for (var c in attributes) {
        var key = c.replace(/_/g, '-'); // hyphens not cool in JSON, use underscore, and we convert to hyphen here
        el.setAttribute(key, attributes[c]);
    }
    return el;
}
```

Yah, there's some stuff I don't like all that much, like if I want to change the position of an object, I have to go through element.setAttribute('position', '0 50 0'). Seems bit verbose, but I'll take it.

## A-Happy Prototyper

Overall, the markup aspect, early versions, and lack of organization/cleanliness in the code examples made me sad. But examples are just examples. I can't fault them for highlighting simple examples that don't scale well as an application when they intend to showcase quick experiences. A-Frame wants to be approachable, and if I yammer on to people about my ES6 class based approach with extendable BaseApplication and BaseGroup/Object classes, yes, I might appeal to some folks, but the real draw of A-Frame right now is for newcomers to fall in love with markup that easily gets them running and experience their own VR creations.

All that said, I did want to share my experience for the more seasoned web dev crowd because if you peel back the layers in A-Frame you'll find an extremely well made library that proves to be very flexible for however you might choose to use it.

I'm not sure whether I want to link you folks to my library that's in progress yet, but I'll do it anyway. It's majorly in flux, and I keep tearing out stuff as I see better ways in A-Frame to do things. But it's helping me prototype and create clear distinction of helper code from my prototype logic, [so maybe it'll help you](https://github.com/bengfarrell/macgyvr) (just don't rely on it!)
