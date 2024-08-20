---
title: "Untold stories of web-dev-server"
date: "2020-11-23"
categories: 
  - "web"
  - "web-components"
---

It's been a while since I've written a blog post. And even then it was a constant barrage of Web Components posts from me, leading up to a book I published with Manning called [Web Components in Action](https://www.manning.com/books/web-components-in-action). It's all because I believed in Web Components, but until recently (right around the time my book was released in September of last year), I knew they weren't quite ready, and I love to go on and on about new, rough around the edges technology.

Then something happened for me. Web Components became a bit boring. And I mean that in the best possible way. I use Web Components to build apps, and it's really just using the standard web toolkit in your browser (HTML/JS/CSS). I've adopted [LitElement](https://lit-element.polymer-project.org/) into my workflow, but even that isn't terribly exciting. There's a slight learning curve, but it helps a heck of a lot more than it hurts.

Why is all of this boring technology good? Because I can focus on my REAL problems - those that exist in the projects that I'm building. I LOVE not giving a second thought to how to do something in a framework or front end tooling that has sixteen layers of abstractions that fight you at every turn.

Also neat is rejecting complex systems (although when I say this as a 20 year software veteran, I feel a bit curmudgeonly). But now, it seems we have a new buzzword to describe this: "buildless".

At its heart, "buildless" just means using an (almost) dead simple server for your dev workflow, relying on ES imports to load your Javascript (and maybe some other things). This all happens without any sort of bundling step - just code, save your changes and reload!

It sounds great, right? It usually is, but there's some stuff to know that isn't so easy to look up in my experience.

## When your basic dev server isn't good enough

I think it was LitElement and [Spectrum Web Components](https://opensource.adobe.com/spectrum-web-components/) that made me finally graduate to needing a bit more than a simple web server. As dependencies grow in a library you're using, especially if that library supports Typescript, the imports won't actually be pointing to Javascript files per se. Instead, best practices dictate that you leave the extension off such that your tooling can decide how to resolve the file. Moreso, "bare imports" are a thing we need to worry about for the same reasons.

To use LitElement as an example, it's common to say:

`import { LitElement } from 'lit-element';`

Where is the 'lit-element' package? Your JS doesn't know. And it's probably better off this way. It COULD come from your node\_modules folder. You might want it to come from somewhere else depending on your project structure. Also, remember that these are relative paths. It could be 'lit-element.js', '../../lit-element.js', or '../../../../../lit-element.js' depending which folder you are importing from in your project. Having this as a "bare import" makes referencing something common like this headache free in your code.

Of course, that's just in your code. _Something_ has to transform that path for your code to work. Ideally it would be something called ["import maps"](https://github.com/WICG/import-maps), but these haven't landed in any browsers yet (except for behind a flag in Chrome). If you're making a bundle with Webpack, Rollup, or the like, those tools will transform your paths - but we're going "buildless", which means that something has to transform your path in real time when requested from the server.

And that's where [web-dev-server](https://modern-web.dev/guides/going-buildless/serving/) comes in. If you happen to be familiar with "es-dev-server" already from [OpenWC](https://open-wc.org/) then it may be news to you that "es-dev-server" migrated to [https://modern-web.dev](https://modern-web.dev/). This would be, of course, on the realization that going buildless isn't just a Web Components thing, it's for everyone!

The [documentation](https://modern-web.dev/docs/dev-server/overview/) for getting started with web-dev-server is pretty thorough for basic use cases. If you weren't familiar with going buildless, you are now. There's also the matter of "Well, how does the server know how to resolve the files?". If you're using an existing library that has ES module support with a proper ESM endpoint defined as it's main entry point, then it happens automatically when you use the `node-resolve` flag. There are more complex situations touched on here: [here](https://modern-web.dev/guides/going-buildless/es-modules/#import-paths), but of course, it's not comprehensive.

So with that said, I'll tell you that the simple stuff, the stuff that's well documented isn't why I'm writing this blog post. It's when you have some more advanced use cases and need to use options you didn't quite know exist, or why they exist. Even worse is when an option that you need doesn't really exist in the standard `web-dev-server.config`.

Those are the situations that inspired this blog post. Like I hinted at the top of this post, I like technology choices that don't hide what's underneath. Unfortunately, to make something that's drop dead easy to use and install like web-dev-server, you DO have to hide a lot of complexity. And this makes it all the more difficult to piece together how you support something odd in your project.

## Unmasking Web-Dev

[Modern Web](https://modern-web.dev/) did not pull a Scooby-Doo. There's no evil mastermind revealed when you pull off it's mask. Instead, the server is built on [Koa.js](https://koajs.com/). Honestly, I'd never heard of this project, but it looks to be an extremely well built and easily configurable server that runs on Node.js. On its surface it looks so good, I'm not sure if I should be embarrassed for not hearing about it earlier!

Anyway, with just the "web-dev-server.config", you'd really never know that Koa was lurking underneath as the heart of the server. You'd likely not care either, that is until you need middleware!

Here's what happened...

In one of my projects, I was using the normal  element. As part of the HTML5 Video API, you should be able to set the time by saying `myVideoElement.currentTime = 10`. Unfortunately, if your server doesn't support a feature called "partial range requests", video scrubbing doesn't work! Partial range requests are just an elaborate way of saying "I have a big file (like a video) - and I want to only get some bytes from the middle of this big file". Without this, your video file is downloaded in order, from the first bytes to the last.

Luckily Koa supports "middleware", and web-dev-server offers an easy "middlewares" field in the config file to pass through to Koa.

```
// the koa-range plugin is installed straight from NPM

const range = require('koa-range');

module.exports = {
     port: 8080,
     watch: true,
     nodeResolve: true,
     http2: true,
     preserveSymlinks: true,
     moduleDirs: ['node_modules', 'bundles'],
     middlewares: [ range ]
};

```

  
  

## Rollup Plugins

In addition to Koa middleware, your everyday web-dev-server.config supports a "plugin" field as well. This is well documented on [modern-web.dev](https://modern-web.dev/docs/dev-server/plugins/overview/). Also well documented, but maybe a little surprising until you know it's there, is that plugins for [Rollup](https://rollupjs.org/) may be [supported in web-dev-server](https://modern-web.dev/docs/dev-server/plugins/rollup/) as well!

One of the easier use cases is something I just came across as I was moving a project from Babel/Webpack to buildless. Despite future web standards that could allow us to import CSS and other types as ES modules, we have nothing now.

Normally, as I work with LitElement, I just wrap my CSS as something that can be consumed by LitElement.

```
import {css} from "lit-element";

export const style = css`
     :host {
         height: 100%;
         width: 100%;
         display: inline-block;
}`;

```

  
  

However, this doesn't work so well if you didn't write the CSS yourself and are just importing from somewhere. I admit, there has been a rare moment I just wanted something to work, so I copied and pasted a small amount of CSS from my node\_modules into a JS file.

Instead, we can use the amazing [rollup-plugin-lit-css](https://www.npmjs.com/package/rollup-plugin-lit-css) plugin wrapped in the Rollup adapter for using in our web-dev-server.

```
const rollupLitCSS = require('rollup-plugin-lit-css');
const fromRollup = require('@web/dev-server-rollup').fromRollup;

const pluginLitCSS = fromRollup(rollupLitCSS);

module.exports = {
     mimeTypes: {
         '**/*.css': 'js',
     },
     plugins: [
         pluginLitCSS({
            include: ['./src/**/*.css'],
         }),
     ],
...

```

  
  
Obviously this is pretty specific to Web Components and LitElement, but all the same, it showcases a nice, simple adapted Rollup plugin. Also note the "mimeTypes" property - I stumbled on that the hard way, when my CSS files just weren't loading because they just weren't being accepted as files.

## CommonJS: The scourge of going buildless

Another _very_ useful Rollup adapted plugin is [@rollup/plugin-alias](https://www.npmjs.com/package/@rollup/plugin-alias).

Picture this: You're happily churning away on a buildless project, but you come across a situation where you need some help from a project you found on NPM. You install it and try to import it in your project, but you get the error I've cursed at more than once "require is not defined".

Boooo. This is simply a package that cannot be consumed via ES modules. Or maybe, the `package.json` main field hides that fact that it DOES have some ESM goodies in there, instead pointing to the CommonJS entry point.

What do you do? Well, again, [modern-web.dev has some good documentation](https://modern-web.dev/guides/going-buildless/es-modules/) on just that. In my work, however, I took a slightly different approach. Instead of doing it in realtime with the [Rollup CommonJS plugin](https://www.npmjs.com/package/@rollup/plugin-commonjs) as they do, I use this same plugin to pre-bundle as CommonJS. So I end up with a "my-npm-library.bundle.js" file that I toss in a "lib" folder in my project's source.

Normally I can just stop there and import this JS. But this particular project that I'm doing at work, it was important to leave the bare imports intact. This means I don't want to `import { some-import } from 'libs/my-npm-library.bundle.js'`, because I want this code to still work in other front end tooling situations such as Webpack (where I was moving away from).

That's why I need my import to stand as `import { some-import } from 'my-npm-library'`.

And THIS is where the Rollup Alias plugin comes into play:

```
const fromRollup = require('@web/dev-server-rollup').fromRollup;
const Alias = require('@rollup/plugin-alias');

const pluginAlias = fromRollup(Alias);

module.exports = {
    plugins: [
        pluginAlias({
            entries: [
                {
                    find: 'my-npm-library',
                    replacement: `${process.cwd()}/libs/my-npm-library.bundle.js`,
                },
            ],
        }),
    ],
...
```

So you see here, it finds "my-npm-library" and replaces with the path (and file) I actually want. Notice the very Node.js specific `process.cwd()` piece of my string that just provides me with the path to where I'm running this server on (for me, the root of my project).

One piece of additional trouble with some of my bundled CommonJS files is that you have to go through a "default" object to get to the good stuff. For example:

`import { some_import } from 'my-npm-library'` doesn't work because the Rollup bundling process produced an object that looks like `Module.default.some-import`. This leaves me with potentially writing code to say:

```
import * as MyLib from 'my-npm-library';

MyLib.default.some_import 

```

So this doesn't work for me, because for starters, it doesn't preserve my code as is for other tooling environments. But also, if you're using Typescript (especially external libraries), you've just changed the definition of how to consume this library - and Typescript has NO idea you'd need to go through "default" to get things done.

And this is why I end up creating adapter files for these situations. I can import my JS bundle, and make my exports work exactly like they did before.

```
import * as MyLib from './my-npm-library.bundle.js';

export default MyLib.default;
export const some_import = MyLib.default.some_import;

```

 

## Typescript and I had a bit of a misunderstanding...

As a brief sidebar, I'll say that I'm rather new to Typescript. I had a misconception that I could configure TS to bake my new resolved paths in when it transpiles. For me, it was an easy mistake to make given that I my project was previously in Webpack/Babel, and it was hard to know who was responsible for what.

When I started going down this path to buildless, I really did think that one of my options was not to worry about bare import resolving, or imports with no extensions. I figured Typescript would handle all that stuff when I transpiled (if only I could find the right options).

Nope nope nope. Typescript is not designed to do that and there's been at least one [issue on their Github repo](https://github.com/microsoft/TypeScript/issues/10866) where they've refused to do it!

Again, maybe it's just me - but when you go down this path to buildless, it really helps to have clear boundaries of which technologies are responsible for which roles.

## Hiding a plugin in plain sight

One last thing I'll touch is the [Rollup Node Resolve](https://www.npmjs.com/package/@rollup/plugin-node-resolve) plugin. This plugin handles the core functionality I'm talking about throughout this post: resolving your modules, whether they be bare modules or extensionless files. By setting the `nodeResolve` flag to true in your config file, or simply specifying `--node-resolve` in your command to start web-dev-server, you're using it.

This simple flag covers most situations you'll come across. But of course, there are always exceptions. Enter my use case:

I'd been using [Spectrum Web Components](https://opensource.adobe.com/spectrum-web-components/) in my project, but just know that this will apply to any situation where you have an import in your main app's node\_modules folder, but another thing in your node\_modules folder has the same dependency and it reaches into it's OWN node\_modules folder.

To be more specific on my case. I was importing a Web Component. It imports `sp-button` to register a button component with the  tag. This works great in my application, but this same application had a super complex component that I kept in a separate repo. That component ALSO imported `sp-button` from it's own dependencies.

We're now importing `sp-button` from "myapp/node\_modules/@spectrum\_web\_components" AND "myapp/node\_modules/mycomponent/node\_modules/@spectrum\_web\_components". I was actually in a monorepo using PNPM, so these were the exact same files in my setup (just hidden under different aliases), but my application sees them coming from two different paths, and thinks they are different files.

This means that those side-effects (the stuff that happens when you load an import but don't necessarily call anything yet) happen twice, when they should only happen a single time.

In my use-case, this meant my app broke because my Web Component was trying to register an already registered component tag and threw an error. What I needed was a way to make sure that Spectrum button only looks in my main node\_modules folder (and because of that, the file only gets loaded and processed once).

After what I can only describe as an embarrassing amount of research, I saw that the Rollup Node Resolve plugin's "dedupe" option was the thing I need. But how are you supposed to use it?

There's a couple of things that aren't obvious here in terms of the "nodeResolve" option in your web-dev-server.

First, that "nodeResolve" option is to activate Rollup Node Resolve as a plugin in web-dev-server. This top-level flag is essentially a shortcut (likely because it's a main use-case for the server) to adopting Node Resolve into your plugin list.

Secondly, in your config file, this "nodeResolve" param is a boolean OR an entire "nodeResolve" configuration! This is what I mean when I say that this level of (necessary) simplicity hides complexity in a negative way. To be clear, I wouldn't change this behavior, it just hides a bit in obscurity!

```
nodeResolve: {
    // Do not automatically resolve our bundles, instead use Alias
    // Regex here says to resolve everything automatically except the embedded strings
    resolveOnly: [
        /^(?!.*(my_npm_library|different_npm_library))/,
    ],

    // Resolve these in the root node_modules folder and not in child ones
    dedupe: [
        '@spectrum-web-components/button',
...

```

  
  
In the above configuration snippet, we're configuring "nodeResolve" to "dedupe", or just use the top-level project node\_modules only for the listed modules.

I should also mention, that depending on the load order in some situations I've had (as far as I can figure it), my "nodeResolve" was trying to handle those JS bundles I intended for my Alias plugin. So I've included some Regex here in the "resolveOnly" object to tell it not to handle the "my\_npm\_library" or another fictitious "different\_npm\_library" module in this plugin.

## Just my personal experience

To close out, I'll just say that this is by no means a comprehensive guide. In fact, not really a guide at all. This post is just meant to share my personal experiences with having to change out a large Rush/Webpack/Babel/Typescript project to drop the Babel and Webpack and go buildless.

Until now, I've been using es-dev-server and now web-dev-server in a drop dead simple way, and it's been working magnificently! But as you've seen in this post, I found a handful of things that just weren't obvious as we get into more complicated territory.

Even though these are just some use-cases I've come across, I think the fundamental concepts behind them just weren't quite obvious for the average user, so I hope this post helps. In other words, even if you don't share my specific problems, maybe you'll have similar ones that can be solved in similar ways.

I'd like to thanks [Ben Delarre](https://twitter.com/BenDelarre) and [Westbrook Johnson](https://twitter.com/WestbrookJ) for helping steer me in the right direction in a couple places in my exploration.

I should also add that this [buildless choice works rather well for testing](https://modern-web.dev/docs/test-runner/overview/) too! In fact you're largely using the same config options. And then of course, when you DO bundle for production, you can use those same config options further with a standard Rollup task.
