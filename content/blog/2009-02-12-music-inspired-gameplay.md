---
title: "Music Inspired Gameplay"
date: "2009-02-12"
categories: 
  - "music-video-games"
---

This is the last part of my recent musings.  Over the last two posts I've argued that digital storage has completely changed the way we listen to music, unfortunately in some ways for the worse.  We're less inclined to replay an album in whole, and more inclined to put it all on shuffle.  A friend of mine wondered how well Pink Floyd's Dark Side of the Moon would work today given our habits.

I wondered how we can increase replayability of music and get people to appreciate a song or collection of songs more and thought we can use games to achieve this.  After all 30 year olds like myself grew up on video games with soundtracks that repeat every time you play a level.  Why not use casual games to increase your band's audience - to get people to listen to your music over and over again and get the tune stuck in their heads?

Of course, its easy to slap a soundtrack on an online game - but how can we make the game and soundtrack work together for a great experience?  How can we create musical escapism in games, just like MTV or musical theater?  What is the gaming equivalent of breaking out into dance, or fast camera cuts timed to the rhythm?

As you can tell, I've been thinking a lot about this lately, and I've recently read [This is Your Brain on Music](http://www.amazon.com/This-Your-Brain-Music-Obsession/dp/0452288525/ref=pd_bbs_sr_1?ie=UTF8&s=books&qid=1233627942&sr=8-1) by Dr. Daniel J Levitin to better understand how our brains perceive music and how the various flavors of music appeal to us in different ways.

The most obvious way to tie a game to music is tempo or rhythm.  There are many rhythm based games on the market today - most noteably "Rock Band".  Music has many more attributes, obviously, like the tone, contour, timbre, loudness, meter, theme, key,  harmony and melody....not to mention that rhythm and tempo are two different things.

Relating any of these aspects to games can be challenging given where we are with mainstream realtime audio-processing technology.  But even putting technology aside, how can we relate these to a piece of music in a systematic way?

Let's start with tempo.  Tempo is the overall speed of the music.  It's fairly constant for long periods of time - but can be an excellent baseline metric for establishing a musical pulse and to possibly tie it up with a visual pulse in your game.  When people tap their toes, dance, or bop their heads - its generally to this tempo, or the beat of the song.  So tying visual elements to this beat is probably the most effective tool I can think of.

And this is good, because a beat can be measured in pop music by picking the range of frequencies that the bass drum is on and listening to the volume of this frequency over time.  So tying visual elements to a beat is a very real tool that can be done automatically in music game creation.

Tempo only goes so far though.  It's a very predictable musical trait.  Levitin argues that our musical tastes can somewhat be centered around complexity and predictability.  Children, for example, enjoy very simple and predictable music.  As we get older, and the more we listen to music, the more boring this simple and predictable music becomes.  So we listen to more complex music - but constantly strive for the right amount of predictability and the right amount of complexity.  As we listen to more and the level of complexity of our favorite music will probably go up to.  This is one of the reasons that the music of other cultures can be distasteful, or classical music, or jazz can be distasteful for people with pop only listening habits.  The more unfamiliar we are with music, the less predictable it is.  And if its not predictable at all - as another culture's music can be to us - then it can really be unpleasant.

So, going beyond the beat to capture other nuances of the musical piece should be very important in manipulating visuals or gameplay elements.  ONLY syncing a predictable visual beat with a complex soundtrack would be such a shame because you lose all that which makes the music meaningful - and you can lose the connection between the two.  Alternately - having lots of movement that has nothing to do with the flow of the piece but loosely tie to frequency at a particular time, can create a similar disconnect because you're picking up unpredictable parts of the piece to tie them together visually with the music.

So what types of musical nuances can we pick up and use?

Rhythm is another form of timing like tempo but it's how notes are grouped together into phrases.  Guitar Hero and Rock Band use rhythm effectively.  I believe Harmonix actually does this by transcribing the notes themselves for each instrument, and grouping them together to have you play out a phrase at a time.   They're not picking out random notes from the guitarists score and having you play them - no, they're taking  the most meaningful notes  that make sense to put together the phrase with the limited amount of notes you can play.

Tone and frequency for example are aspects that may be quite hard to integrate effectively.  Considering an overall musical piece, many instruments are playing at different pitches and frequencies all at once.  The bass guitar has a very low frequency, while a flute can have a very high frequency - even though both can be playing the same note or different notes.  Taken out of context, different frequencies/tones in music don't make us tap our toes.

Pitch, harmony, contour, key, and melody - taken together can be an entirely seperate but equal way to tie visuals to your music.  Unfortunately - it can be very difficult (if not impossible) with mainstream game technologies like Flash to take this into account in an automatic way.  I hope I'm wrong - and I hope somebody PROVES I'm wrong and lets me in on the secret, but consider this....

Using Fast Fourier Transform methods (FFT), I can grab the volume of any frequency at any time.  Can this provide me with what note is playing?  Well, maybe....but only if a single instrument is playing.  Unfortunately many instruments are playing at many different frequencies, and many can bleed into (if not use) another's frequency.  I know some smart computer scientists have developed pitch detection - but it hasn't made it's way into any code libraries I know of yet (though I should look beyond Flash to see what I can find).

Also, on a technical level, using MIDI files, if the music is transcribed correctly (or if it originated on a sequencer or a computer in the first place), we would have access to all the notes seperated out into the different instrumental tracks.

So what if all this technical stuff presented no barrier?  How could we use it?

One of the most interesting parts Dr. Levitins books for me was Appendix B: Chords and Harmony.  Music, if you look at it in a very dull light, is all about patterns and manipulating people's ears by breaking in and out of  the predictiability of those patterns.

Talking about pop music, there is a verse, a chorus, and a bridge.  A verse is normally a melody and tempo played over a few times.  At the end of the verse, we get into a similar thing with a chorus, which is generally shorter.  Going from chorus to verse breaks one pattern, but picks up another musical pattern which uses slightly different chords with a slightly different tempo.  So predictability is broken, but not very much.

Another way patterns are established is with long standing musical tradition.  The blues is somewhat defined by going from I Major to IV Major to I Major and then IV or V major, and then back to I Major - this happens to also be the basis for rock music as well.  Now, this is another established pattern - and when we break from this pattern, we're introducing unpredictability.

The most intersting pattern Levitin mentions is when a chord is either resolved or unresolved.  In Western music, our ears have been trained to consider a tritone or an augmented 4th, the most unresolved interval we could possibly hear.  In fact, as Levitin recounts, this interval was banned in the Catholic church and named "Diabolus in musica" citing this interval as the work of the devil.  On the other hand, a simple major chord is considered resolved.  So when if we play a chord containing a tritone, we expect, and almost demand that it be resolved by something like a major chord.

Why do I bring these up?  Well, this type of musical behavior can start to paint a more visual or motion based picture.  When music breaks expectations either by changing tempo or with different chords, or even moving the notes up or down an octave - likewise our gameplay elements should match this level of broken predictability.

Likewise, when a chord is left unresolved - so too should our visuals on screen.  You know something is going to happen, but you don't know what.

To spell it out more clearly, we can establish a visual and animated baseline in our games by listening to the beat of the music, and timing elements to this.  Assuming a pop song, our baseline is a song verse.

Deviating in minor ways while the verse is played, maybe be changing the tempo, going up an octave, or different instrumentation, will produce a minor change in the visuals or animations.

Going from verse to chorus however is a less subtle change, and often implies changing the tempo, chords, or otherwise quite drastically.  In this, the gameplay needs to change in the same fashion.

Hitting a chord that needs to be resolve creates musical suspense - and so too should it create visual or gameplay suspense.  Something on screen about to fall, or teetering from side to side.

Going back to technical implementation, however, assuming we had access to the entire score of notes in a musical piece, can we feel out these suspensful moments or feel out when a song is predictable and when it becomes unpredictable?

I believe the answer is yes, but it would take quite a bit of work to look for augmented fourths, or other unresolved intervals, or to run pattern matching algorithms on our melodies.

A more pragmatic approach might run a FFT analysis to find beats, and possiby even do some light pattern matching to seek out changes in tempo.  Meanwhile, do some manual markup of subtle changes in verse, and then manually mark where verse goes to chorus, chorus to verse, and where the bridge is.  We can also manually mark where we're creating suspense, and then where we resolve that suspense.

In this fashion, we could create a sort of music markup language to map a timeline of all these events and use this to create a musical gameplay experience.

I guess my work is cut out for me!
