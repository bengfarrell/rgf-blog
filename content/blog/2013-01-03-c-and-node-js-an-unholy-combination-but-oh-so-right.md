---
title: "C++ and Node.js: An Unholy Combination....But Oh So Right"
date: "2013-01-03"
categories: 
  - "c"
  - "development"
  - "nodejs"
---

_**Update for May 2016: Please note that this article is now 2 1/2 years old and was done with Node v0.8. Unfortunately that means the methods I described our out of date!**_

I have more complicated plans in the works, but for now I'm taking a few giant leaps into Node.js plugin development to see if it's feasible for my master plans - and it not only looks feasible for a newcomer like me, but really easy in an unsettling way.

You make your first Node.js plugin and think to yourself: "Wow, that's all it was?! Why was I scared of C++ for so long?".  And then you sort of wondering if you just hit a big iceberg and you're only seeing the tip.  Well, what if I am?

I present to you guys the tip of the iceberg.

First, one needs to realize that Node.js is built on Google's V8 engine - the very same Javascript engine that runs in Chrome.  C++ (and NOT Javascript) is it's native language.  What's even odder to realize is that when you talk about making plugins for Node - I'm starting to think that I'm ALSO making plugins for Chrome or Chromium.  It's just crazy to think about all that power you're about to wield.

Also, Node.js is the PERFECT place to start.  I'd absolutely love to make awesome desktop applications in Chromium - with Adobe Brackets and Spotify being some pretty prominent examples of Chromium based applications.   But I can only imagine how much more complicated having to deal with a C++ application with a user interface is than just a plain old command line program.  Soo....I think Node.js will be pretty perfect here.

My reasons for attempting C++ in Node.js are basically the only reasons anyone ever introduces C++ into something else.

_It's fast._

_I have a C++ library that I'd like to use and I'm not smart enough or don't have the time to rewrite it._

Both of these reasons apply to what I'd like to do, but mostly the latter.  So given that, I shoved my C++ library aside and tried to figure out how to do the most trivial C++ module for Node.js.  It turns out that a lot of what's on the internet is wrong depending on whether you're running the latest version of Node (0.8) like I am.  Many articles you'll find on the internet delve deep explaining how to use the WAF tool to compile C++ to Node.js.

Unfortunately, for the two hours I wasted trying to get it working, WAF is deprecated in Node!  Node-waf is a Node wrapper for the WAF build tool, but going forward we'll be using GYP...or rather [node-gyp](https://github.com/TooTallNate/node-gyp).

 

## Getting Set-Up

To get node-gyp up and running, install from NPM:

```
npm install -g node-gyp
```

Simple right?  Just like you're installing any other node package.  Gyp reportedly depends on Python, Make, and a C++ compiler like GCC.  Doing this on Ubuntu, I don't think I had to worry about these dependencies - as they were already on my system.

Assuming everything is set on your system - the best next step is to check out the official Node.js documentation.  I was a little surprised by this, but Node.js seems to have excellent documentation.  Officially, these modules/plugins are called "addons" and can be seen in the [Addons section of Node's documentation](http://nodejs.org/api/addons.html).

 

## Building "Hello World"

Here's the "Hello World" example copied right from the docs:

```
#include <node.h>
#include <v8.h>

using namespace v8;

Handle<Value> Method(const Arguments& args) {
  HandleScope scope;
  return scope.Close(String::New("world"));
}

void init(Handle<Object> target) {
  target->Set(String::NewSymbol("hello"),
      FunctionTemplate::New(Method)->GetFunction());
}
NODE_MODULE(hello, init)
```

Breaking this down looks daunting, but once you figure out the rhyme and reason, it's not too shabby.  I think the includes at the top are fairly self explanatory - but lets start at the bottom.  Here we declare the NODE\_MODULE.  It's called "hello", and it's entry point is "init".  So when we call it from node, the module is actually being named "hello" here, and it will run the "init" method right when it loads.

This example is a bit confusing, as the NewSymbol is also called "hello".  Ignore this for now - first lets take a look at the "binding.gyp" file (the compiler build instructions):

```
{
  "targets": [
    {
      "target_name": "hello",
      "sources": [ "hello.cc" ]
    }
  ]
}
```

This target name "hello" has to match the NODE\_MODULE declaration "hello".  Basically, this "target" targets the NODE\_MODULE name, and this NODE\_MODULE needs to specify the main entry point of our little AddOn, which is the "init" function.  And lastly, we have to specify which file the target is in - and here it's "hello.cc".   It's actually a matter of preference in C++ land whether you choose to call your file \*.cc or \*.cpp (I tried it, either works!)

So, fantastic! We've got ourselves a Node.js AddOn!  To compile run:

```
node-gyp configure build
```

...from your command line.  It's actually two steps - configure prepares the various files that are needed to make the AddOn, while build actually does the compilation.  In the end, you'll have a "hello.node" file in your build/release folder.

To actually use it in Node, just do the normal require, declare, and call:

```
var myaddon = require("./libs/build/Release/hello.node");
console.log( myaddon.hello() );
```

## Breaking Down the Source

What we get out of this is your console printing: "world".  How does it actually get here from the init method?  Well, this is where it gets a little hairy and abstract.  THIS is where you get punished for learning C++ from Node.js.  It all seems to be a weird glue between Javascript and C++.

Remember our init method:

```
void init(Handle<Object> target) {
  target->Set(String::NewSymbol("hello"),
      FunctionTemplate::New(Method)->GetFunction());
}
```

Here, we take the target, which is presumably the Node.js binding, and set a property on it - as if it were a dictionary or hash.  Our hash key is "hello", and we use V8 to templatize and instantiate a new function that we've called "Method".  There seems to be some V8/Node formality here, above and beyond C++ really - but THIS is how we've made our Node AddOn come to have the "hello()" method.

There's a little more weird glue in the method itself:

```
Handle<Value> Method(const Arguments& args) {
  HandleScope scope;
  return scope.Close(String::New("world"));
}
```

I don't know how the scope is created here - it looks like something from nothing to me - but it looks like just by declaring scope, we've successfully created our Javascript/C++ glue - so when we close our scope we return our string of "world".  It's still a little incomprehensible to me what's actually happening here - but hey....we know how to return a value to JS!

 

## Dealing with Parameters

Parameters also seem a bit weird.  I wasn't able to explicitly say Method (int x, int y, etc), I think the parameters must come in as const Arguments& args....basically an array of arguments.  The documentation shows us how to deal with type checking them and converting them:

```
  if (args.Length() < 2) {
    ThrowException(Exception::TypeError(String::New("Wrong number of arguments")));
    return scope.Close(Undefined());
  }

  if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
    ThrowException(Exception::TypeError(String::New("Wrong arguments")));
    return scope.Close(Undefined());
  }

  Local<Number> num = Number::New(args[0]->NumberValue() +
      args[1]->NumberValue());
  return scope.Close(num);
}
```

Pay attention here how you ALWAYS are doing conversion.  Whether IsNumber() or NumberValue(), you are basically extracting a value from a memory reference.  This isn't Javascript anymore, where it will just type convert for you....this isn't even Java where it will just take your memory reference as a value.  You need to RECOGNIZE that these are memory references, and you need to extract and convert explicitly to even get the integer value!  And then to even get this number back to Javascript, you are throwing it into the Local<Number> space.  I assume that this puts it in the context of the V8 Javascript engine - going from that separate world of C++ over to Node.

 

## My Example

That's pretty much as far as I got, but I did create a more complicated example.  Basically, my end goal here is to get x,y,z (3D) coordinates from C++ and pass to node.  Since I don't have my fancy C++ library in place yet - I just make my AddOn generate random numbers and put them into a native JSON object and pass them on to Node.

[Here's a gist of my "randomcoords.node" AddOn](https://gist.github.com/4440739)

After I build it, I can use it like so:

```
var randCoords = require("./libs/build/Release/randomcoords.node");
var cursor = randCoords.getRandomCoords3D(600, 400, 100); // params are max values for random output
console.log('{ "x":' + cursor.x +  ', "y":' + cursor.y + ', "z":' + cursor.z + '}');
```

But of course - I don't log it, I send it on via a websocket to my browser to update the position of a sprite, but that's something for another day!

 

## Go, and create your unholy monster!

Hope that all explained things - I know I can't explain everything, but I feel like I know just enough to be dangerous, and I hope that you can be dangerous too!  I think this opens up a lot of power.  I'm quite confident that you can do similar things in Python, Ruby, or whatever - but we're messing with the V8 engine here, and this can hopefully be knowledge transferred to Chromium someday so we can build the next Adobe Brackets or Spotify...it's quite exciting!  My ultimate goal here is to use the [OpenNI project](http://www.openni.org/) within Node and transfer natural user interface data over to the browser via websockets.  So far so good!
