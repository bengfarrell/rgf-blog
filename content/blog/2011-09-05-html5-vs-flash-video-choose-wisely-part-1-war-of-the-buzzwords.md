---
title: "HTML5 vs Flash Video: Choose Wisely Part 1 - War of the Buzzwords"
date: "2011-09-05"
categories: 
  - "development"
  - "flash"
  - "flashflex"
  - "html5"
  - "video"
  - "web"
---

**A Little History of Web Video**

Let's go down memory lane a little bit.  RealPlayer, Quicktime, and Windows Media Player were the big web video players.  The problem with these options, though, was that you didn't really own the video as a site creator.  All of them seemed to impose their own UI on people, and video was in a box that you couldn't do well to brand or easily bring to the web.

Each technology didn't dominate the marketplace, so it was hard for someone that wanted to create video to know whether to create their content in wmv, mov, or....whatever realplayer was.

Back around 2000 or so, I personally saw RealPlayer as a trainwreck...always crashing, bad at buffering, installing extra spyware, etc.  Windows Media was decent, but since I was a cross platform CD-ROM developer at the time, Quicktime was the best to author in since there were players on Windows and Mac.

In March 2002, Macromedia's Flash Player 6 came out.  Suddenly web video was a reality in a big way - and not only that, but it didn't require any plugins beyond Flash itself.  Folks could even put video in a project and do whatever they wanted with it.  They could make their own controls, and use video itself in an interactive way.  We weren't limited to playing our video through someone else's player.

Flash Player version 5 at the time had 98% penetration numbers, so Macromedia was bringing video to a plugin that virtually everyone already had (they just needed to upgrade).  So, virtually overnight, us video creators had a ubiquitous platform that anyone could use.

Director had given us something similar earlier in the form of the Shockwave plugin, however that plugin never really had the install base of Flash, especially given that it was widely used for CD-ROM development and wasn't really able to shake it's place in life and get traction on the web.  The other problem with Shockwave was that it still required a plugin (plugin to the plugin) to play video.  We had options to play video in whatever format suited us, and in my experience, Quicktime was the most popular.  Video wasn't as moldable as Flash though.  If I remember correctly, it was still standard to see the controls on the player, and we weren't as free to do what we wanted.  Additionally, the video plugin didn't layer the video like Flash did.  It really just created a graphical hole in your browser, and the video would play in this rectangular hole, and things could not be overlaid on top of it.

**Yay Flash Video!**

In just 3 short years after Flash Player 6 was launched, a little company called YouTube was formed.  YouTube, though, is just a good example of what Flash 6 did to pave the way for a revolution of online video.  It enabled technology to get out of the way, and get brand owners to do what they wanted with their own video!

Macromedia rode the popularity surge and created more products around the Flash platform including media encoders and media servers.  Folks could now do actual streaming video with Flash Media Server released shortly after Flash Player 6.

An ability to stream on demand and live video led to an even bigger explosion of live events and long-form video content.  With several DRM offerings on top of this, folks could start to see popular movies and tv shows streamed on the web.

Despite any objections to Flash recently, I do think that it's hard to argue that Flash accelerated public consumption of online video in a big way.

**Enter the Video Tag**

You may have heard of several "Flash Killers" come along since 2002.  In this, I mean the ability to deliver rich media on the web (including video).  Microsoft's Silverlight released in 2007 was probably the most formidable competitor.  It's "Smooth Streaming" server side component was most likely the reason why the 2008 NBC coverage of the Olympic games used Silverlight, and why Netflix uses Silverlight today.

The reason Smooth Streaming was so awesome was for a few reasons.  First, streams would upgrade and downgrade depending on the user's bandwidth all on the server side, and was a completely smooth experience (not requiring client side logic to handle this).  Secondly (and this is big), streaming was done over HTTP, something that large organizations are better equipped to deal with over Flash Media Server's RTMP protocol.

Despite the fact that Netflix still uses Silverlight, the buzz has significantly died down - not least of which due to Microsoft's handling of it!

The buzz picked right back up in April 2010 with Steve Jobs' infamous "Thoughts about Flash" memo.  It launched a sort of web "arms race" gearing up for the still unfinished specification that was HTML5.

In the unfinished specification, was the notion of the video tag.  On the surface, a video tag sounds simple - just like putting an "img" tag in the browser to display an image.  Underneath though, the video tag is more complicated as folks fight out the underlying video codecs.

In 2010, we weren't NEARLY ready for the video tag.  A year later, we still have the same problems, but given recent browser support and all the hype, we've been rocketed into a position where the video tag is a viable solution in many ways - but still overhyped enough that people think it's as robust as the Flash ecosystem and ends up failing when people try to use it in these advanced ways.
