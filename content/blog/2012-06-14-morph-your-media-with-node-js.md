---
title: "Morph your Media with Node.js"
date: "2012-06-14"
categories: 
  - "development"
  - "javascript"
  - "nodejs"
  - "video"
  - "web"
---

I've been loving me some Node.js lately!

One of the most recent things I've done in Node was download and convert video while getting info about the video. All of this is possible in Node, though frankly, the credit ultimately goes to a mix of C++ and Python. There are some handy wrappers written in Node for these utilities.

Let's start where I needed to start:

**YouTube-DL**

So, [YouTube-DL](http://rg3.github.com/youtube-dl/) is a utility written in Python [and wrapped up in Node.JS](https://github.com/fent/node-youtube-dl).  It allows you to give it a YouTube , Yahoo, Vimeo, or other video and either download it or get information about it.  Why is this so hard?  Well, sites have gotten pretty smart about protecting their content online.  Though they typically use just a progressive/single video file served over HTTP, which is therefore publicly available, there are some protective measures in place.  First, they obscure it.  The YouTube ID you normally see gets translated to another unique ID for a completely different download site, probably on a content delivery network of some kind.

More importantly, it looks like access to this content delivery network is time restricted.  So say you actually use the YouTube site.  You follow a link for a video, and that link is translated on the fly to a secret location in the Google vault.  Also, the time at which you attempted to grab the video is encoded into some sort of hash.  It might be good for an hour, a day--I'm not sure.  The important thing is that I can't send you a link to the raw video file that you could open up on your machine later that week.  So, the sharing of links is USELESS!

This is the type of stuff that YouTube-DL deals with for you.  They may be going through some sort of YouTube API or maybe not. I'm not sure.  What I _do_ know is that in Node.js I can write

`youtubedl.info(url, callback);`

function callback(error, info) { }

My callback will give me an error or info. If it's info, my info object will have a few things available by dot syntax like info.title, info.filename, info.thumbnail, and info.description.

That's pretty cool. I can use it to build up metadata about what I'm downloading, but really, I ultimately want to download.

`dl = youtubedl.download(url, outputDir, ["--format=18"]); dl.on('download', onDownloadBegin); dl.on('progress', onDownloadProgress); dl.on('error', onDownloadError); dl.on('end', onDownloadComplete);`

And we're downloading! Note that the "format" flag isn't required. For my purposes, however, I actually do want to specify. See, I want to convert to MP3 (audio only). So I want the worst quality video but the highest quality audio. I have to be pretty specific in my demands. I did find the different [format codes online](http://en.wikipedia.org/wiki/YouTube#Quality_and_codecs).  But I also put together a prioritized list of what I want:

- 18 - MP4/H264, 360p, AAC Audio at 44.1khz
- 34 - FLV/H264. 360p,  AAC Audio at 44.1khz
- 22 - MP4/H264, 720p, AAC Audio at 44.1khz
- 37 - MP4/H264. 1080p,  AAC Audio at 44.1khz
- 35 - FLV/H264. 480p,  AAC Audio at 44.1khz
- 5 - FLV/Sorenson H263, 240p, MP3 Audio at 22khz
- 6 - FLV/Sorenson H263, 270p, MP3 Audio at 22khz

Here, I prioritized the lowest video bitrates with the highest audio bitrates coming  first. This should give me the worst video quality with the highest audio output.  Pretty perfect for my needs.  The problem, though, is that I can only request one format at a time.  If the first one I request isn't available and I get an error, I just have to try again for each one in my list.  If you don't specify the format, it's a little less painful, but you don't get to pick your priorities.

**FFMpeg**

[FFMpeg](http://ffmpeg.org/) is the bad-ass in your video toolbox. EVERYONE uses FFMpeg, and you should too. It converts,records, and streams audio and video of almost any type you can think of. The fact that I only want to scrape audio off a video file in my project is pretty much an insult to its awesome power. Yet, that's what I want to do.

When I originally tried to convert to MP3, it was a no-go. It turned out that I needed the MP3/LAME codecs installed. FFMpeg doesn't originally come with this stuff, because it is itself free and open source. MP3 isn't; it's proprietary. So rather than mix and match this stuff making FFMpeg a little tainted, we have to grab the libavcodec-extra-53 ourselves. I did it by doing an apt-get install on Linux:

sudo apt-get install ffmpeg libavcodec-extra-53

After that, I was free to use the [FFMpeg/Node.js wrapper](https://github.com/xonecas/ffmpeg-node).

Using FFMpeg is actually a pretty big topic, as there are tons of flags and settings you can use. In my case, it was really simple, though. I was a little confused on syntax within Node.js, but here's what I came up with that eventually worked:

`ffmpeg.exec(["-i", "myvideo.mp4", "myaudio.mp3"], callback);  function callback(error, info) { }`

Anyway, here we run FFMpeg, set the source as our video, and the destination as our mp3 file. Works pretty well!

**MediaInfo**

Lastly, we have [MediaInfo](http://mediainfo.sourceforge.net/en) and [its matching Node.js wrapper](http://github.com/deoxxa/node-mediainfo). MediaInfo gets information about the file you pass in. This includes TONS of metadata properties and file properties.

Here's how I used it:

`mediainfo(fileref, callback);  function callback(error, info) { }`

There are WAAAYYYY too many properties that come back on that info object. Here are some that I use, but your mileage will vary. Just dig into the object and figure it out!  It's actually nested in an array as well, so I'm including indices in my list:

- info\[0\].album
- info\[0\].track\_name
- info\[0\].performer
- info\[0\].recorded\_date
- info\[0\].duration
- info\[0\].overall\_bit\_rate

So there you go!  We've gone from downloading a file through YouTube, converted the video to MP3, and then checked the file for duration and other metadata.
