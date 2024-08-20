---
title: "Interstitial VO Creation with Text to Speech and FFMPEG"
date: "2015-05-05"
categories:
  - "development"
  - "javascript"
  - "music"
  - "nodejs"
  - "projects"
---

Wasn't I playing with virtual reality lately? Yes, but I got distracted. I'll blog on that later, but for now - I've been looking to do cool things with my music discovery library called "the Shark Attack".

One of those cool things is a longstanding problem I've wanted to solve but never got around to it. See, I deliver a weekly radio show to my good friend Vicky Ryder who runs [Codebass Radio](http://codebassradio.net/). I use my Node.js (and soon to be Electron based) SharkAttack to discover all new music from various blogs and feeds and webpages and then package up a playlist. It gets zipped up and passed on as a full 3 hour show she can run in my Wednesday 1pm EST timeslot.

It's fully automatic, which is great. I push a button, and seconds later (after downloading various new music), I get a radio show! The bad: well it's radio...how does anyone know what I'm playing if I only generate the music files? Typically in radio, you'll have a DJ announcing what's been played every few songs. In the spirit of automatically generating a radio show, lets see if we can automatically generate some voice overs!

Bonus challenge: VO's aren't terribly interesting without a music bed!

So let's tackle TTS (text to speech) first.

## Text to Speech with Google's APIs

So Chrome has a pretty nice [text to speech API](http://updates.html5rocks.com/2014/01/Web-apps-that-talk---Introduction-to-the-Speech-Synthesis-API). Rather, its the "Speech Synthesis API". Unfortunately, this has two problems. The first is that it's not really browser functionality. It takes your requests and passes it through to Google's servers and THEY do all the work. So really, most of the cool stuff isn't really in your browser, Chrome is just a nice pass through.

Secondly, even though I plan to end up in desktop wrapper Electron (which uses Chromium), I really want a Node.js solution (or at least a plain vanilla JS solution) because I want ultimate control over my bits. Seriously, I want to cache responses, write them to files, and mix audio. The Speech Synthesis API doesn't do that AFAIK - it just talks through your browser as you command it.

Luckily, there are some Node.js libraries like ["node-google-text-to-speech"](https://www.npmjs.com/package/node-google-text-to-speech) that directly use the Big G's TTS endpoints....like so:

```
http://translate.google.com/translate_tts?tl=en&q=<your spoken text here>
```

The "tl=en" param is fun to play around with, because it's the locale of the text. I've played around with French, Australian, and British. What happens is that the text you get back just cops different sounding accents. Honestly though, plain old "en" seems the best for me.

The resulting response body that comes back contains the binary data (in MP3 format) of your spoken text. It sounds slightly robotic, but better than nothing! You can actually try it right in your browser. Seriously. Try this [link](http://translate.google.com/translate_tts?tl=en&q=Ben%20says hi).

An interesting limitation is the character limit of the text you'd like to have spoken. I think it's 100 characters, but I'm using 80 just to be safe. If you play your cards right, you can use this limitation to your advantage.

To get around it - break your text into separate requests. I've gone ahead and split my text string with the Javascript String.prototype.split() method. I split on spaces: .split(' '). What this does is make an array of words. Keep adding word after word onto your request string until you meet your limit! Overflow goes on the next request. And the next request. And the next request.

How can you use this to your advantage? Well, sometimes words can blur together. Google isn't the smartest in terms of speech pacing and word separation. If I'm calling out a song, I don't want to say "andnextupisMySongbyMyArtist"! You really want to pace out that sentence better. There's no way better than to cause Google to lose sentence context by breaking up the sentence text parts in different requests. This results in something more like: "andnextupis.....My Song....by....My Artist".

To do this, I've introduced a loose tag that looks like this: <speechbreak>. So when my text parser sees <speechbreak>, it stops the request there, and follows the remaining text with a new server request. So my input text looks something like this:

"And next up is <speechbreak> My Song <speechbreak> by <speechbreak> My Artist".

Of course lots of string parsing ensues! Here's a [gist](https://gist.github.com/bengfarrell/1bc05577bf32e19492dd) based on the current state of my code. A couple of notes here - I pass on the response to another piece of code that listens and write it to a file. Be sure to write the file with base64 encoding. Second note: the maximum character limitation is because I'm not paying for Google's services. This makes me a little nervous, so, I'm caching speech data on my local filesystem. If a duplicate request is made, I query the file system to see if the data exists. If it does, I don't make the request, but instead load the file data in its place.

Anyway, subsequent request data accumulates and accumulates. I concatenate all the data to form the very text that was requested (maximum character limit be damned!)

So next up....I have a voice over. But it's pretty bland. There's no audio backing to it. No music. This isn't very radio show like, is it?

## Adding an audio bed with FFMPEG

So FFMPEG is awesome. I've said so in previous posts. I've used it to simply convert a video file to an audio file (MP3). But it's SO MUCH MORE!

It took me a while to get there, but here's what I want:

- Take 2 audio files (MP3) and mix them together
- Fade in the music bed
- Fade out the music bed
- delay the start of the voice over text to speech file so there's a little delay for the music intro
- pad the end of the voice over text to speech file so there's some music trailing it

Anyway here's the FFMPEG command I figured out:

**ffmpeg -i vo-block-1.mp3 -i VO\_musicbed.mp3 -filter\_complex "\[1:0\]afade=t=in:d=5,afade=t=out:st=30:d=5\[BED\];\[0:0\]adelay=7000,a** **pad=pad\_len=40000\[VO\];\[VO\]\[BED\]amix=inputs=2:duration=shortest" -ar 44100 out.mp3**

So there's a few fairly obvious features here. The first are the "-i <file>" These are just the input files. And of course, the output file is at the end.

The second easiest to explain is the audio bitrate. The -ar flag is set to 44100, or 44.1khz. I had to explicitly set this because Google's Text to Speech bitrate is super low. It doesn't NEED to be high, but guess what? When we mix this and the music bed together, the whole mix cops the super low bitrate! My nice audio bed that I composed myself (thank-you-very-much) sounds like crap! So I tell FFMPEG to force this bitrate. The text to speech gets upconverted, but my music remains mostly the same. Whatever....it sounds good.

Ok, next we're gonna talk about the whole "-filter\_complex" deal. Basically what we have here is a complex filter. We're doing lotsa stuff.

From the [FFMPEG docs](https://www.ffmpeg.org/ffmpeg.html), we're talking "filter graphs" and "filter chains". Filter chains are the easiest to wrap your head around. They take an input, and runs various filters on it (in order).

So, for example, I have my fade in/fade out filter chain:
**afade=t=in:d=5,afade=t=out:st=30:d=5**

The input (which I'll get to later, when talking filtergraphs), fades in with a duration of 5. The next filter that accepts this faded-in input, then takes the same audio and fades it out. The start time is 30 seconds, and the duration of the fade out is 5 seconds. We know this takes place sequentially because it's a chain - it's separated by commas.

Likewise with the speech delay and end padding:
**adelay=7000,a****pad=pad\_len=40000**

Here, we have a filter chain (again separated by commas) where we delay playback of the voice over by 7 seconds and pad the end of the voice over with 40,000 samples. The 40,000 here is fairly arbitrary as I played around with it. We can calculate it based on the samplerate of the audio. For example if it was 44.1khz (or 44,100 hz) these 40,000 samples would be 4,100 samples short of a second. It's kinda unfortunate that the pad length needs to be in samples.....but here we are.

The next filterchain is the mixing of the audio sources:
**amix=inputs=2:duration=shortest**

So this is easy...we're mixing 2 inputs, and the resulting mix duration is the length of the shortest input.

Now what about filter GRAPHS? Well these are semi-colon separated. They are chunks of work to be done with a specified audio input and audio output. They don't really need to be specified in a particular order. Unlike filter chains, with their in-order comma separated commands.

A so called "input pad" and "output pad" are written with brackets: \[myinputoroutput\].

In the case of our fade in/out:
**\[1:0\]afade=t=in:d=5,afade=t=out:st=30:d=5\[BED\]**

Here we're taking input 1:0 (one of the inputs which I found the label for by looking at FFMPEG output in the console), running the filter chain, and outputting that to an "output pad" that I have personally named "BED".

And then with the delay and padding:
**\[0:0\]adelay=7000,a****pad=pad\_len=40000\[VO\]**

Here I'm taking the other input (the VO which is labeled 0:0), running my filter chain on it, and then outputting that to another "output pad" that I've personally named "VO".

And then the mixing:
**\[VO\]\[BED\]amix=inputs=2:duration=shortest**

This is easy. I'm just taking my two custom named outputs from the other filter chains, and mixing them! Normally, if you didn't specify the "input pads" it would pull from your two input files, but I wanted to process them first.

So that's that. Between the text to speech, and the FFMPEG, I wind up with something like this:

\[audio mp3="https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2015/05/vo-block-8.mp3"\]\[/audio\]
