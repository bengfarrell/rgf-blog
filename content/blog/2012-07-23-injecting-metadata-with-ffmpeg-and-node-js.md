---
title: "Injecting Metadata with FFMpeg and Node.js"
date: "2012-07-23"
categories:
  - "development"
  - "nodejs"
  - "video"
  - "web"
---

In a previous [post](/blog/2012/06/14/morph-your-media-with-node-js/), I told you guys how awesome FFMpeg was.  I shared how to use it to convert video files using the [Node.js FFMpeg wrapper](https://github.com/xonecas/ffmpeg-node).

Given all of the awesome things that FFMpeg does, injecting metadata into a file doesn't sound that impressive - but it's an important task...and one that I struggled with a bit!  Why the struggle?  Well, its the syntax!

Using FFMpeg on the command line for this actually is a piece of cake:

`ffmpeg -i in.mp3 -metadata title="my title" out.mp3`

What's happening here isn't hard to see - we're taking an mp3 called "in.mp3", setting the title field in our metadata, and writing our "out.mp3" file.  Really easy, right?

Well, let's put this in Node.js terms.  Previously, to transcode/convert my mp4 video to mp3 audio, I simply executed the following in Node.js:

`ffmpeg.exec(["-i", infile, outfile], callback);`

Simple right? Well it's pretty easy to add a flag to make it do something extra:

`ffmpeg.exec(["-i", infile, "-myflagtodosomething", outfile], callback);`

Indeed it is easy - flags go between the infile and outfile array elements. You can have as many flags as you want. So lets revisit our metadata flag. We see that the flag is called "-metadata". But there's more to this flag of course - there's a secondary option called "title" AND I have to use this as a key, and set the value of this key to be the actual title I want.

How to do this? Well documentation calls everything you put in that array a "flag". So I'm thinking, either non flags belong outside, or everything goes in one flag as a big string or something....like "-metadata title="my title". Turns out no. The way to do it is to treat the options like a separate flag, like so:

`ffmpeg.exec(["-i", infile, "-metadata", "title=mytitle", outfile], callback);`

So this works great! Though, I have another problem - it seems like it's processing a fair bit and running the whole file. My formerly 128kbps MP3 file has been reduced to 64kbps in my output! Lots of lost quality here unfortunately. However, we can tell it to not process the audio and leave as is - just simply copy the audio data to the new file:

`ffmpeg.exec(["-i", infile, "-acodec", "copy", "-metadata", "title=mytitle", outfile], callback);`

Perfect! Audio is intact. Our "acodec" flag specifically targets our audio track. I'm not worried about video here since it's an MP3 audio file.

Last thing...since I'm simply adding metadata to an existing file, can't we just use the same file? Can't our in.mp3 be the same as our out.mp3? Yes, but it's tricky. If you simply execute the command line FFMpeg option, you can use the same file for in and out. However, partway through this process, FFMpeg will ask if you'd like to overwrite the file. You hit "Y", and it continues. Try to do the same thing in Node.js - well it hangs. The process locks up waiting for you to hit "Y", with no way to continue. Bad news....

Good news is that you can use a "-y" flag!

`ffmpeg.exec(["-i", "myfile.mp3", "-y", "-acodec", "copy", "-metadata", "title=mytitle", "myfile.mp3"], callback);`

The "-y" flag forces the process into choosing yes to overwrite the file.

So there it is - adding metadata with Node.js/FFMpeg. And since it's simply a process that's spawned, I imagine this applies equally well to any other language - be it Python, PHP, Ruby, whatever.

Good luck with your metadata!
