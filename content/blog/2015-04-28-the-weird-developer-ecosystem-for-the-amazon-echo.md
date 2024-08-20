---
title: "The Weird Developer Ecosystem for the Amazon Echo"
date: "2015-04-28"
---

**Update: @garethwatts tells me that we were told that your app doesn't have to be hosted on AWS, only that it must be publicly accessible. In my opinion, this is BETTER, but still not great for just serving off local host in your dev environment! Thanks Gareth!**

Before you read this article, I gotta warn you - this isn't a how-to. These are initial impressions of the ecosystem based on a short 45 minute presentation given at an ["Amazon Pop Up Loft Event"](http://aws.amazon.com/start-ups/loft/). There's not too much technical detail here - and honestly, it's cause there wasn't too much technical detail at the event.

That said, the Pop Up Loft did paint a rather disappointing picture of making "apps" for the Echo. For those of you who don't know - the Amazon Echo is approximately a one foot tall cylindrical device.  It functions like Apple's Siri, Google's voice input, or Microsoft's Cordova. The difference here is that you put it in a room, and it's always on. Simply call out "Alexa, play NPR", and the device will pop on the live streaming NPR station. It will respond to a wide set of questions like "What's the weather", or "How's my commute", and it will talk to you - delivering info in a friendly voice.

Different folks have different results with it. Personally, the types of questions I want to ask, it can never seem to answer. But, another developer friend of mine has said it's pretty useful for him.

I totally think it's fair to expect mixed results from a technology like this that is only released invite only right now. Amazon is rolling it out slowly. For me, however, I get some pretty good use out of it as a capable audio device with decent speakers that I can talk to and play radio stations and podcasts. For $100 (Amazon Prime Members get the $200 price tag slashed in half), I still think it's worth it - and I was excited about the upcoming developer possibilities with the SDK.

Well, after tonight's event - I've realized that the SDK isn't REALLY an SDK. I mean I guess in the strictest sense, it might be, but the Echo is not really a hacker's friend. It doesn't appear to be an open device that you can tinker and play around with. Instead, you are required to make "apps" for it.

So what does this mean? Well, the event tonight portrayed some architectural diagrams and showed some configuration settings through Amazon. Here's the low-down:

"Apps" are simply web services built on AWS. When you call upon Alexa to "use" a specific app (such as "Alexa, do <Action> with <App>), it will pass the converted speech as text to your app. The app must seemingly be deployed on some part of AWS and be an official Amazon app as registered through their services.

Amazon has an "intents" JSON configuration that you can edit via their admin console. You set up certain phrases, and swap in keywords to those phrases my marking them with curly braces and pipes. For example, you'd have a long list of phrases in the settings:

"What is my horoscope for {virgo | horoscope}"

"What's my horoscope for {virgo | horoscope}"

To be honest, these examples are to the best of my recollection, and I might have the syntax slightly wrong, especially around what it pipes to. Either way, elsewhere in the config, you'd list all the astrological signs, and listing "virgo" in the syntax here in the phrasing is a little auto-magical in that when you put "virgo" in context here, it just assumes you mean all the possible options you defined elsewhere. This rubbed me kind wrong, not very explicit at all - which I'd bet means not very flexible when it comes down to it.

Anyway, the implementation is a part of this, but given that it'll probably evolve AND I could be remembering things slightly wrong, I won't harp on it. What I will harp on, is the entire app model they are forcing here!

**Update: I'm probably wrong on needing to host your app on AWS - I have a note at the top of this post about this**

So, first of all - you gotta use AWS to deploy your app. So look, I'm not all that familiar with AWS. I mean, I know what it is, but I haven't used it to deploy an app. I've used other services, some in the cloud, some not - just not AWS. Here, you're forced into deploying on their cloud. For me, this means signing up and presumably paying for Amazon's ecosystem.

As good as AWS is, I'm not allowed to develop something locally on my own network. I'm definitely not opposed to delivering a production application on a solid infrastructure like AWS, but if I'm just playing around, I don't want to go to that hassle! Also if I'm an enterprise customer with my own locked down network, I can't deploy my app inside my firewall.

Once you get your app up and running you'll need to create an official Amazon marketplace app. This is the same channel you'd use for developing a Kindle App, a Fire App, anything they distribute on their marketplace. It needs to use https, so you'll need a certificate, though they do allow self signed ones for non-production/developer apps.

As a developer, supposedly whatever you create will be available on your Echo by default. Distribution to the wider populace is murkier. Amazon couldn't comment on how apps would be distributed in the future as its subject to change, and they didn't seem quite sure if you'd enable it on your phone or what. The speaker did mention that it was too difficult to allow "install" via voice commands.

OK so - you see my problem yet? Maybe I'm a front end developer or even a code proficient designer. I have an Echo and I want to design an experience around it. It seems simple enough. How hard could crafting some code around questions and responses be? Well not very - except I need to learn how to do freaking cloud deployment now! And guess what, just to play with this thing, I'll need to enter my credit card info, register for the service, and spin up an instance.

One thing that was a little disconcerting as well, was that the presenter made a point of showing us that the lag time if you only spin up ONE instance of your app might make the Echo time-out on a response, so he emphasized the need for 3 or more for reliable usage.

Like I said, I've not used AWS specifically, but I'm guessing this adds up to real money. Perhaps it's just pennies, but I've looked at their pricing structure before and been a wee bit confused on how much I'd be charged for doing anything. Again, I have no question that AWS provides a great service for your production infrastructure, and I'm quite sure it's worth the price. But as a developer who's just playing around, I don't know what I'm getting into.

The other aspect I have question with is the whole notion that these are "apps". Yes, I get the app ecosystem. It works for Apple. It trickled down from Apple and it works for a lot of different ecosystems now.

However, when you think about so called "micro-transactions" with these limited devices, how do you monetize? Why would a developer be inclined to actually make an app? I first heard the concept of a "micro-transaction" in reference to Google Glass. It's a quick 2 second look to catch information, and then you're done. This sounds a lot like the Android and Apple Watches that are coming into play.

I'd wager that most of the monetization of Watch apps aren't done for the watch at all. The Watch is an extension of the main app you'd purchase that lives on your phone. It's an extra compelling feature on an already good app. If you don't purchase the app, you might have some ads on your phone. I can't imagine users would take kindly to ads embedded in microtransactions - because it's a tiny stream of only the info you need for a limited few seconds. Extra info that you don't need like ads would just be too much.

I'd describe your interactions with the Echo in the same way. They are microtransactions. There isn't extra info, extra ad space, anything. You ask for what you need and you get it. The Echo DOES have a companion app, but aside from settings and setup, you don't really end up using it. So with microtransactions being the ONLY window into your app, how do you monetize? How do you embed ads? Will people pay purchase simple voice apps? And, given how unsure Amazon was on distribution, will Amazon even SELL simply voice apps?

It seems to me that the only way to make money here is to help existing brands extend their presence onto the Echo. The notion of developing a killer app here seems quite limited unless you do it for free. And even then, you're paying to use Amazon's infrastructure to do it!

In the end, I'd much prefer that the Echo uses the Amazon cloud to simply convert speech to text and vice versa. If the device itself provided an SDK that you could play around with on your local network to work with the plain text responses, it would be AMAZING!

I'd rather have a cool robot buddy in my living room, than an app store. Oh well. Either way, I'll probably give it a try once my developer invite comes in. But I'm not as psyched as I was.
