---
title: "Hey Idiot, Check Out D3.js"
date: "2012-11-27"
categories:
  - "development"
  - "html5"
  - "javascript"
  - "projects"
  - "ui"
  - "web"
---

Sorry, of course I don't really mean you're an idiot.  I personally was always the type to turn down the "For Dummies" books when I was learning web technology years and years ago.  My thinking was something along the lines that I am:

1. Not a dummy
2. Not a person that wants other people thinking I'm a dummy
3. Not a person that wants a watered down version of something I'm passionate to learn about.

![tumblr_mdfhbwDAxb1qd7xzbo1_500](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2012/11/tumblr_mdfhbwDAxb1qd7xzbo1_500.gif)

Hey Jerk, I'm not a dummy!

But then came along my immediate and burning need for a bar graph on my webpage.  It was then I saw the light.  Nowwwwwwww, I WANT to be a dummy.  Why? Bar graphs are god awful boring.  I didn't want to do it.  I had a need to visualize some data, but the prospect of actually doing it sounded DUUUULLLLLLL.

![cats14](https://d2ypg8o05lff0b.cloudfront.net/wp-content/uploads/2012/11/cats14.jpg)

Initially, I tried to get some free slave labor, but the only warm bodies in the room were either visually handicapped or just too lazy.


So I went over my options

1. Draw the JSON loaded data in a canvas element
2. Draw it using divs
3. Kill me now
4. Ohhhh wait....didn't I hear about this thing called D3.js?

Indeed I did hear about [D3](http://d3js.org/).  I heard about it because while I was giving my Javascript Powered Kinect presentation at [NCDevCon](http://ncdevcon.com/), a very smart gentleman in another room named [Ben Clinkenbeard](http://benclinkinbeard.com/) was giving a presentation on it.

Now, while I wasn't able to see the presentation, that was enough for me.  I figured I'd give it a shot.  But I had a severely bad attitude going in.  "Grumble grumble bar graph"....."grumble grumble every other JS framework I've tried takes at least a few days to get up to speed with with".

OK fine....clear my mind, "I'm a dummy.....I'm a dummy.  Copy a bunch of code from the samples and move on."

I found a decent sample after a short time looking: [http://www.recursion.org/d3-for-mere-mortals/](http://www.recursion.org/d3-for-mere-mortals/) I copied the bar graph code.  And found it INCREDIBLY simple to run with it.  It was easy to read and understand.

First, we'd need to create the d3 instance:

```
var svg = d3.select("body").append("svg").attr("width", w).attr("height", h).attr("id", "myid");
```

Then, each element in the bar graph had a block of code with it.  Like the actual bar itself:

```
svg.selectAll("rect").data(dataset).enter().append("rect")
                        .attr("x", function(d, i) {
                            return i * (w / dataset.length);
                        })
                        .attr("y", function(d) {
                            return h - (d * 4) - 20;
                        })
                        .attr("width", w / dataset.length - barPadding)
                        .attr("height", function(d) {
                            return d * 4;
                        })
                        .attr("fill", function(d) {
                            return "rgb(0, 0, 255)";
                        });
```

You can see here that we're creating (appending) a rectangle with a specific color at the specific x-axis position of the data (dataset).  The height is the actual value of the data at the x-axis index.

Our copied example also put a numeric display of the count about the bar:

```
                    svg.selectAll("counttext")
                        .data(dataset)
                        .enter()
                        .append("text")
                        .text(function(d) {
                            return d;
                        })
                        .attr("text-anchor", "middle")
                        .attr("x", function(d, i) {
                            return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
                        })
                        .attr("y", function(d) {
                            return h - (d * 4) - 44;
                        })
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "12px")
                        .attr("fill", "black");
```

I then thought that, maybe I should put a date label below each bar to indicate how many hits on that day (the nature of what I wanted to show).

```
               svg.selectAll("labeltext")
                        .data(labels)
                        .enter()
                        .append("text")
                        .text(function(d) {
                            return d;
                        })
                        .attr("text-anchor", "middle")
                        .attr("x", function(d, i) {
                            return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
                        })
                        .attr("y", function(d) {
                            return h;
                        })
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "11px")
                        .attr("fill", "black");
```

You'll notice that to stick this text at the base along the x-axis - I make it set the "y" attribute to "h", the height of the entire display. And above, I made the "y" value of each bar "h-20", to give a 20 pixel buffer for text to show.

I added even more stuff too! The final result stacks a count of video hits and audio hits on a single bar, and displays each day for the past 30 days how many of each (and total hits) there are.

I also stacked the counts below the x-axis label, so I padded the bottom of the graph even more than my simple examples above.

You can see my results here: [http://blastanova.com/play-trunk/dailyreports.html](http://blastanova.com/play-trunk/dailyreports.html)

Probably the hardest part was organizing the JSON data I wanted to drive the graph and slicing it a few different ways. As far as I could tell, each of your bar graph attributes need a one-dimensional array driving the attribute. it makes sense, but my situation in particular was a bit more complicated!

No problem though, it all worked out. And I got a bar graph and an education in D3.js in a night!

On a side note, it uses SVG (scalable vector graphics)! How cool is that! I noticed some blurriness on the sides of a few bars as it tried to anti-alias, but that's probably solvable (and maybe I shouldn't have overlaid my bars when I could've stacked them).

So right! My suggestion to you? Use what I write to inspire you to try out D3 and copy from better examples than mine. In the meantime, bar graphs don't suck anymore....I'm kinda interested to know more!
