---
title: "Mozilla DeepSpeech vs Batman"
date: "2017-12-01"
---

No, I'm not a "Machine Learning" developer, but I am having fun feeling out what it can do. All that's to say, this isn't an article about the gory technical details of Mozilla's DeepSpeech. Rather I'm writing my experience after spending a couple hours with it and being decently impressed and finding myself eagerly anticipating this project improving over time.

I've been peripherally aware of voice input tech for a while. Calling Google's Web Speech API "first" does a disservice to many others before it, but it was the first one I played with, and it's likely the first one many web developers like myself have used. It's also insanely good right now.

Part of why it's insanely good, is the fact that it can translate speech to text in essentially real time. Not only that, but to ensure results that make sense, it listens...but before it gives final results, it uses some natural language processing to figure out if what it heard actually makes sense...and then improves it. Using the Web Speech API, you as a developer can even see the results rated and scored.

Google is constantly improving. And it should. Their speech recognition is used on the web, on Android phones, and even on Amazon Echo competitor Google Home. They absolutely need it to be as perfect as possible so you, the user, can interact with experiences using only your voice.

Of course, Google isn't the only one in the game. IBM's Watson also does an exceptional job at this. Even better, their demo recognizes different speakers on the fly and labels them as such in the text back.

![watson](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2017/12/watson.png)

Multiple speakers? An option to get word timings? Fantastic! Watson is positioned as a really good service for voice recognition for a variety of applications. Watson, of course, does tons of other things. It's actually used in ["Star Trek Bridge Crew"](http://store.steampowered.com/app/527100/Star_Trek_Bridge_Crew/) to fill in some AI when you just want to play a mission and don't have a real life crew waiting in their VR headsets to play with you.

I'm also fairly confident that if I looked at Microsoft's Azure services I'd see the same, and in recent days you can see a similar cloud offering from [Google](https://cloud.google.com/speech/)

As far as I'm concerned, these companies are doing good. Cloud services are obviously popular, and speech recognition that works is a great service. There's a problem, though.

Early on, before Google had their paid cloud service in place, when their browser Chrome first started offering the Web Speech API, you could watch network traffic in your browser and see the endpoints they were using. For any application you wanted voice in that wasn't browser based - you could kinda sorta mock a service to their endpoint and shoot over chunks of audio data. It would do the same thing. I remember playing around with transcription of audio files via Node.js.

Honestly, this wasn't kosher. It was Google's service, and this is not what they intended it for. They even put a flag in their browser traffic to ensure it was coming from Chrome. Yes (sheepishly), I faked that too in my Node.js requests so I could continue playing.

Also, check out this Watson pricing [page](https://www.ibm.com/blogs/bluemix/2017/05/ibm-watson-speech-text-api-pricing-updates/). It's 2 cents per minute of audio uploaded. Yes, that seems super cheap. But it's 2017 and we're talking to our devices more than ever. Also, I have an idea for a project where I want to grab transcriptions for the entire Batman '66 run.

![MV5BMTkzNDY5NTg5MF5BMl5BanBnXkFtZTgwNzI4NzM1MjE@._V1_UY268_CR13,0,182,268_AL_](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2017/12/MV5BMTkzNDY5NTg5MF5BMl5BanBnXkFtZTgwNzI4NzM1MjE@._V1_UY268_CR130182268_AL_.jpg)

 

Yeah, the show only ran for 3 seasons, but it was on basically every single night of the week. It clocks in at 120 episodes of around 25 minutes a pop. That's 6000 minutes, or $60 for my stupid project idea assuming I don't make make mistakes. My stupid project idea might not even be all that stupid - I want to catalog and time speech. Video editors can spend a long time cataloging footage, or just searching for the right thing for the right cut. What if we could throw those 50 hours of footage at a speech and face recognizer overnight and have it ready for search in the morning?

Price aside, there are data costs. Yes, I have unlimited internet at home, but what if I wanted to make a mobile application? Or a non or barely connected Raspberry Pi project? Voice is just one of those things that's becoming super necessary especially as we enter the new age of VR/AR. As inexpensive as Watson is with 2 cents per minute, its also potentially a bit cost prohibitive in large scale use cases.

That's why I'm excited about [Mozilla's DeepSpeech project](https://github.com/mozilla/DeepSpeech). DeepSpeech is speech transcription service that runs locally using machine learning. The model they released is trained by way of [Mozilla's Common Voice Project](https://voice.mozilla.org/), essentially crowd sourcing the training for their model.

Mozilla states that a Raspberry Pi and/or mobile isn't in the cards yet (unless you'd like to fork the open source project and figure it out yourself), but it is on their roadmap. I'm guessing that to make it more mobile ready, the model and associated data files will need to be cut down from the 2GB that it is.

I did have some trouble getting started, but I'll walk you through and show some results. Coming off of trying to get other ML libraries installed, this was a walk in the park and extremely straightforward. But, like i said, it's new and I had a bit of trouble.

First of all - I had Python 3 installed. Nope. Get yourself Python 2. It'll probably work someday on 3, but not today. Next their instructions to get started are super easy - run the Python package manager: PIP and do "pip install deepspeech".

Unfortunately, PIP couldn't find the package! Turns out Mozilla doesn't offer the package for Windows yet, and in fact looking over the docs Windows might not really be tested or supported at all. With my Mac at work, I figured I was out of luck - but then remembered that Windows 10 comes with Ubuntu now! Even though I was giving it a shot, I thought it'd be futile.

Nope, worked like a charm! DeepSpeech installed quickly and easily. Next, I wanted to jump right in and give it a go. On their README, they list the command:

```
deepspeech output_model.pb my_audio_file.wav alphabet.txt lm.binary trie
```

This begs the question of....Where are those files? That model file, the binary, the txt? Not at all obvious from the README, but you can find the on the [Releases](https://github.com/mozilla/DeepSpeech/releases) part of their repo.

Once I had these in place, my first attempt threw an error. It was vague....something about having 2 dimensions.

```
TypeError: Array must have 1 dimensions.  Given array has 2 dimensions
```

All it meant was that it doesn't support stereo WAV files, just mono ones. Somehow dimensions == tracks.

I used a YouTube downloader site to grab a few samples, then had them converted with FFMPEG. On a couple occasions, I used Adobe Audition to chop things shorter so things would only be a few seconds. You've got to be very careful here because your result can range from audio processing errors in your console or garbled nonsensical output!

Some tips:

- Use 16 bit, 16khz, Mono Audio
- Make sure to not include metadata in the file (Adobe Audition defaults on, but in the export settings you can uncheck the box for "markers and metadata")
- Expect a bit over double the processing time for the duration of the clip

My very first try was a random example WAV file I found online:

\[audio mp3="https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2017/12/bush\_01.mp3"\]\[/audio\]

It was pretty good! The result was "A tree has given us a you net opportunity to defend freedom and were going to seize the moment and do it". The mistakes were "a tree" instead of "history" and "you net" instead of "unique". Honestly, I wonder if these methods would exist if we applied some Natural Language Processing as a filter like the cloud services do...and since we run it local, we can easily insert this step and many others. It took 10 seconds to process this 4 second audio file.

Now the real test, a two minute clip from Batman. Again, I ran this video through a downloader service. It saved to WAV, but I had to run it through Audition to make sure the bit rate and sample rate were correct.

https://www.youtube.com/watch?v=tgCkmUS1IYI

The output was impressive, but there were long garbled stretches:

_"o dascmissiur mister freeze wants what hello ill see if i can get a chief o here a moment commissoerdutchepfoherothisisbrusewiyistfreezeontswhatcommissionergardenisonlaealo with bat man mister wan and perhaps if we put the two force together and you could talk to him yourself all right chief i dont have much time oh that man yes mister wine i you heard mister freesesscirless demands just briefly if raidand i have is gobetweensare you prepared to make the telocacacminnightandpaytherensomisterwayei have no choice bad men that may i suggest you take the broadcaster the commissioners office in an hour earlier and we will have a dome package money a to me ackageyoumoney this sons risky risk is our business mister wine of course but an i have the same faginkyou that all of gottemcityaskihoperobinandi are deserving of that faith ill make the necessary arrangements a meetyouwithtaeconmster's office at eleven in it you can altakrmisuerindeed i did that man will usunup take telltecastanlavethedammypackageemoneywaitingsewateleventoliktohsofindmensodissimilaringbatyrisbenganyooensosimilaranoherh"_

What's weird is that these garbled stretches look almost correct if they were spaced out.

So yes, it has a little way to go, but it's impressive for launch. It'll will also only get better as Mozilla and the community improve the models, maybe create some NLP wrappers (or otherwise), and shrink it down for mobile. Congrats Mozilla, I'm impressed - this project is needed!
