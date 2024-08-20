---
title: "Live Instrumentation in Flash Part 4 - A Little Music Theory"
date: "2011-09-01"
categories: 
  - "development"
  - "flash"
  - "flashflex"
  - "flex"
  - "music"
---

In the last post, I threw a number at you: 440.  This was the frequency I put in my code to make the resulting audio sample listenable.

Well, it was no accident.  440 cycles is actually a middle A.

**A Brief History**

It wasn't always 440hz (hertz actually denotes cycles per second), but not for lack of trying!  Remember that we haven't gone digital until the past 30 years or so, and industrial manufacturing is only 70-80 years old.  People have been making instruments and playing music on them for thousands of years.  Beethoven was playing the piano in the late 18th century.

When you hear Beethoven's music recreated, you're not hearing it exactly as he played it.  Yes, all the music is transcribed and is probably fairly true to the original.  However, tuning a piano in the 18th century wasn't an exact science.  Beethoven's middle A might not have exactly been 440hz.

While Beethoven was a German composer, Chopin was Polish.  Being in different countries, so far apart, Chopin probably had a different tuning than Beethoven.  If you were in the German audience listening to Beethoven, you might be accustomed to a middle A tuned around 338hz.  Whereas, if you traveled to Poland, and heard the 445hz middle A, you might think something was a bit off.  You weren't used to the different tuning.

Recorded music and touring artists changed all this.  As records were being sold and artists toured, someone in Japan could listen to a record produced in Spain.  As folks started getting together from all over the world, a sort of standard tuning was made out of all of this.  When digital music and exact measurements of frequencies came along, we could finally settle on a specific standard that everyone could agree on.

 

**The Math of Notes and Octaves**

So far, we've only talked about middle A, or "A4".  Since A4 is basically the center of it all, we can go from there.  First off, we can talk octaves.  Take our middle A, for example.  If you go down an octave, you land on another A....A3.  Basically, its the same tone but a lower frequency.

How, do we figure out the frequency?  Well this time its easy - no fancy trigonometry!  Just half the 440.  So A3 is 220.  A2 is 110.  A5, on the other hand, is double 440 (880hz).

Now, what's between A4 and A5?  What's between an octave?  Well, there are 12 notes between the two.  In music terminology going up 1 note is called a "half step".  Going up 2 notes is called a "whole step".

Starting at A4 (or any A):

- A
- A sharp/B flat
- B
- C
- C sharp/D flat
- D
- D sharp/E flat
- E
- F
- F sharp/G flat
- G
- G sharp/A flat

If we assume that we're starting at A4, and going up 1/12 of an octave for each half step, there's actually a mathematical formula to calculate the frequency!

That formula is: frequency = 440 \* (Math.pow(2, indx/12));

You should ALSO note that the relation between half-steps.  If note X is a half step below note Y, note X is said to be Y "flat".  Note Y is said to be X sharp.  This applies to any key (not just the black keys on the piano are sharps and flats, though it makes total sense to name them that way given their positions).

So in the Flashamaphone framework, I've gone ahead and started at middle A.  I've put each of the twelve notes into an array.  Whichever index we're trying to access in represented by "indx" in the above formula. We subtract 12 from index for each octave below 4, and add twelve for each octave above 4. What we have here, is a simple way to calculate frequency for a given note!  Pretty cool!

**How Western music is different from others**

Jjust like how Beethoven's piano was tuned differently from Chopin's, different cultures have different connotations for chords.  The most basic example is major vs minor.  In our western culture, we associate major keys with a happy sound, but minor keys are sad.  In other cultures, this doesn't necessarily hold true.  In fact, Indian music has no concept of major vs minor....and so, no similar connotations.

What we'll cover next with chord structures will be accurate for any culture.  However, what each chord construct invokes for a person in western civilization is completely different for other cultures.    We've already discussed that major vs minor doesn't mean anything important for Indian music - but that doesn't mean the construct doesn't exist!  It's all just different ways of describing the ways notes can make up a chord.

**Chords Structures**

Starting from the root, you can get all the notes in a "key signature" the same way from any root note.  A key signature groups notes together - and typically if you play only the notes in the key, your music won't sound off-putting.

A major key is always comprised of the first, third, fifth, seventh, ninth, and eleventh half tones up from your root.

A minor key is used in western culture to make something sound sad or similar.  Likewise, its always comprised of the first, third, fourth, sixth, eighth, ninth, and eleventh half tones up from the root.

I take care of this in Flashamaphone by making the following arrays for you:

`// major key notesInKey.push( notesToIndex[0] ); notesInKey.push( notesToIndex[2] ); notesInKey.push( notesToIndex[4] ); notesInKey.push( notesToIndex[5] ); notesInKey.push( notesToIndex[7] ); notesInKey.push( notesToIndex[9] ); notesInKey.push( notesToIndex[11] )`

`// minor key notesInKey.push( notesToIndex[0] ); notesInKey.push( notesToIndex[2] ); notesInKey.push( notesToIndex[3] ); notesInKey.push( notesToIndex[5] ); notesInKey.push( notesToIndex[7] ); notesInKey.push( notesToIndex[8] ); notesInKey.push( notesToIndex[10] );`

The most common chord structure is a triad - this means that there are 3 notes in a chord.  The first note is a chord is the "root".  A "C" chord will always have the "C" note as the root, in other words.

A typical triad would consist of the 1st, 3rd, and 5th notes in the key signature. There's lots more chord types, which you can use Flashamaphone to generate for you, but that's the basics!
