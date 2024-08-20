---
title: "It's the Open Sourced SharkAttack, yeah!"
date: "2013-10-15"
categories: 
  - "angularjs"
  - "development"
  - "html5"
  - "javascript"
  - "nodejs"
  - "web"
---

I've been working on my project called ["SharkAttack"](https://github.com/bengfarrell/sharkattack) for awhile. It started out as a simple little Adobe AIR app to download new music from RSS feeds. Soon after, I rewrote the whole thing as a service with Node.js. And then, just lately I rewrote some of THAT to use Grunt.js.

Anyway, the aim of SharkAttack is to start with a list of your favorite music news feeds that will occasionally offer free music. The service will then dive into these rough seas and download the latest tunes a few times a day. It will deal with RSS feeds, webpages, YouTube, Soundcloud, Vimeo, and plain old MP3.

SharkAttack will convert, transcode, and track the songs. It publishes a playlist for both my personal website http://play.blastanova.com and for my radio show every Wednesday at 1pm EST on the awesome http://www.codebassradio.net under the leadership of the even awesomer Vicky Ryder.

In the past few weeks, I authored some admin pages to add/remove/edit your sources, review logs, and edit my weekly show script. Additionally, I added some personal radio functionality - meaning that you open up a page on your local network and the server will stream a personal radio station based on the songs that SharkAttack has for you at that moment.

I'm at version 1.9 right now. As I approach 2.0, I'd like to get the streaming solid (right now it's a bit iffy) and get some really personal stuff in there like reading of your Twitter/Facebook messages as "radio ads" between songs.

It's great to take a project like this all the way to something I enjoy using (or listening to). It never would have happened without my weekly radio slot on Codebass to keep making the SharkAttack better. And now I think it's got a few additional purposes as I keep adding functionality.

Here's a rundown of the tech I used:

- Based on Node.js
- Express.js for radio streaming and administration
- MongoDB for maintaining data (I use MongoHQ)
- Twitter Bootstrap and AngularJS for administration and radio pages
- D3.js for daily download charts
- GruntJS for media library and playlist building tasks (run as cron jobs)
- FFMPEG and Youtube-DL for video conversion

Anyway - it's out there on GitHub land now. It's pretty fine tuned for my purposes, but maybe it'll help someone else, either as a whole or with the code torn apart in bits.

[https://github.com/bengfarrell/sharkattack](https://github.com/bengfarrell/sharkattack)
