---
title: "Sambaverse Alpha"
date: "2010-08-18"
categories:
  - "flashflex"
  - "music-video-games"
  - "projects"
---

Finally! I'm at the point where I have a demo-able application. Sambaverse is the first phase of my master plan for Blastanova.

![sambaverse_beats](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2010/08/sambaverse_beats.jpg)

Quite some time ago, I got interested in creating music based Flash games. I created a prototype, and it worked pretty well - but it was severely lacking in one aspect. That aspect was the ability to look ahead in music, to know what's coming up 5 seconds from now or even 5 milliseconds from now. Or to be able to look back at what happened in the music before. Or to be a little smarter about logical song breaks.

While Flash has some decent realtime audio processing capabilities, realtime just wasn't good enough - my music games needed mystical, physic powers...to be able to see into the future and know how the musician who composed the piece thinks.

In real terms, I needed a tool that was smart enough to load an MP3, take a good stab at automatically detecting beats, break, loud sections, and different sections of the song - like verses and choruses.

So, I set out to create Sambaverse. A person using this application loads up an MP3. Right away the gears start turning - an audio waveform and song navigator is brought up in a few seconds. You can browse around, and listen to snippets. You can properly visualize your song. That's not very special though....you can do that in any audio editor. This is why I made some music visualization modes...

**using the application** At the upper right of the application is the "Playback Visualization" menu. You can choose one or multiple options here. You have the ability to view the song beats, look where the quiet periods of the song are, where the most intense portions of the song are, and find logical breaks (sections) in the music like where a chorus ends and the bridge begins.

![sambaverse_viewmodemenu](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2010/08/sambaverse_viewmodemenu.jpg)

Unfortunately, automatically finding logical breaks in the song was a little tough, and it will never be perfect. I'd describe my break detection as a good start, I have quite a ways to go. This is why I've added two drop down options. The first is the "custom song sections". This mirrors the automatically detected segments, until you drag them around to place them where you want. You can fully customize and refine these segments.

Likewise, I added a song exclamation overlay. Using this mode will place little stars on the timeline. The purpose of these stars is to signify special musical events that occur very rarely. Like when that singer does that one scream in the song "YAHHHHHH!" or there's a sudden gong sound effect...just something wacky that occurs in the song against the norm.

So you have a few view modes at your disposal. Even more than that, pressing the orange "Analyzation Settings" button will bring up the settings window. Here you can change how quiet your quiet breaks need to be or how long they are in order for them to be identified as quiet breaks.

Theres a few settings for every view mode. I'll be tweaking these as I go along to see what works best, and probably change names and defaults.

![sambaverse_settings](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2010/08/sambaverse_settings.jpg)

Finally, you can save this data as XML. Actually - I'm not really saving it yet....just posting it to a webpage, and you can save it if you want. Whatever. I know I'm psyched to play around with my new app, tweak some songs, and make some cool games.

**Under the Hood**

I learned a lotta cool stuff making this. The biggest thing of course was how to manipulate and use audio for my bidding in Flash. I used Pixel Bender to get a huge speed increase when loading the sound initially. That was a lot of fun once I figured out how to get it working.

Although a little annoying at the time, I was using the latest releases of Flex and Swiz. As I've been working on this app for a little while, I had to go through and upgrade from Flex Gumbo to Beta 1 to Beta 2 to RC to Release. Stuff changed every time. Likewise, I had an annoying evening transitioning from Swiz 0.64 to 1.0.

But I'm happy I did this. Flex skinning is awesome. Swiz allowed some nice shortcuts and organization in my application. I even tapped into Flash Catalyst for the initial application design. Catalyst seemed a little limiting after the initial graphics dump. After that for quicky and dirty graphics, I just cracked open Illustrator and exported to FXG which I then copied as text into my MXML skins.

**future improvements**

I'm going to take a break from this application for a bit and focus on some games. I'm sure I'll tweak as I go along and I find limitations that I need to solve as I'm working on the games. One huge feature I'd like to add when I get back to this is to be able to run a Fast-Fourier Transform on the audio and drop frequencies I don't care about. This way, I can zero in on the drums or the bass guitar and only analyze those. In rock music especially, the frequencies are all over the place at different tempos and can make it a little hard to find a rhythm.

I'd also like to make it so you can load in a previously saved XML file to get all your work back for a particular song.

Lastly I'd like to get a sample game/animation you can preview as you work to visualize the beats better than the Flash lights I have.

[So that's Sambaverse! Check it out! (but be nice, it's only an alpha)](http://blastanova.com/bsides/sambaverse/Main.html) .

![sambaverse_main](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2010/08/sambaverse_main.jpg)
