---
title: "Does Illustrator CS3 Render a Buggy SWF?"
date: "2008-01-15"
categories: 
  - "flashflex"
---

I 've been working with Flex 3 for a little while now, and started my first commercial Flex project in December. Luckily I got the CS3 Master Suite...whoo! So since it's more fun to draw in Illustrator, that's what I've been doing. In fact, on this latest project I've been doing, I've been having our artists deliver Illustrator files, then I just export SWF asset libraries. I take these files and embed them right into Flex! It's pretty nifty, and I've been loving the workflow.

Well, the project is going full steam, and I've got a bug on my plate. I have some scrolling lists full of graphics. These lists are styled with a background image using 9 Slice Scaling. At first glance it's fine, but I've been noticing some weird redraw issues in the project. It's pretty subtle, but the bounding box of these scrolling images will discolor the background image. More specifically, if I have a colored square layered over another colored square as my Illustrator artwork, the bug will take away parts of the square in the forefront revealing whats behind it.

I tried so many different export options, and nothing worked! Finally I copied and pasted this same art into Flash CS3 to produce the same SWF asset library, and guess what? No problems.

There must be some buggy SWF producing code in Illustrator CS3. I hope I'm doing something wrong, but I can't imagine what. But I guess I'll use Flash when stuff breaks on me, oh well.....the Illustrator high was fun while it lasted.

To see what I mean, [check out this Flex Application](http://www.yellow5labs.com/lab/IllustratorAssetRenderBug.swf). The Flash list on the left scrolls fine, but check out the Illustrator list. If you scroll and look at the bottom, you can see the redraw issue.
