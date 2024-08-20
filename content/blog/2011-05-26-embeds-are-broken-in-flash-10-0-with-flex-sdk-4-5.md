---
title: "Embeds are broken in Flash 10.0 with Flex SDK 4.5"
date: "2011-05-26"
---

I had a big problem today with backwards compatibility and the Flex 4.5 SDK today.

I know....GASP!

But, next let me say that it didn't have anything to do with the Flex framework, it was an Actionscript 3 project. THAT surprised me.

So what was it? Well, the crux of the issue is that if you use the embed directive to compile in a visual element in your project, said project will completely fail in Flash 10.0.

Here's what I mean:

Create a new AS3 project. Don't make it do anything - just embed a graphic.

`package { import flash.display.Sprite; public class TestEmbed extends Sprite { [Embed(source="myimg.jpg")] public var myGraphic:Class; public function TestEmbed(){} } }`

No - this code doesn't actually do anything. It just creates an empty flash project with your graphic compiled in. And it works just fine if you test it on your machine.

Now, take that SWF somewhere that you haven't upgraded to Flash 10.1 yet.

Guess what? The constructor doesn't even run - instead you get this error:

`VerifyError: Error #1053: Illegal override of z in mx.core.BitmapAsset.`

I tried the same with library graphics from a SWF - this time I get a problem with mx.core.SpriteAsset.

What is actually happening here?

Well, when you use the embed directive, your source file is actually cast to a BitmapAsset for use in your project. Likewise, your SWF symbol is cast to a SpriteAsset.

These are the trouble classes. Its worth noting that if your project just calls new BitmapAsset(), you'll get the same problem.

A SoundAsset isn't a visual element. Lo and behold, instantiating one of those works just fine.

Eventually I narrowed the problem down to playerglobal.swc. Swapping out the 10.0 playerglobal with the 10.2 playerglobal produces the same error.

Lets add this up. It's a problem with display assets, and the actual error says there's an illegal override of Z. I'm guessing that the faux 3D that Adobe added in 10.0 where you can set the Z had an API change from the 10.0 player to the 10.2 player.

When you load up your 10.2 SWF in a 10.0 player, that Z getter/setter is so drastically different, Flash just can't continue.

So - there it is. If you use the embed directive and compile in the 4.5 SDK, your SWF won't function in anything less than Flash 10.1
