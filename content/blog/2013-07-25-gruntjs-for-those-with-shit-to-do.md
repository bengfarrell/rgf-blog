---
title: "GruntJS for those with shit to do"
date: "2013-07-25"
categories: 
  - "development"
  - "nodejs"
  - "web"
---

Look man, I just want to use Grunt. I got shit to do. I don't want this to be a big thing - I just want to get in, set up my tasks, get them running, and get out and continue on with the REAL work in my project.

Unfortunately - [the GruntJS project page](http://gruntjs.com/) does not help those with my mindset. It gives a quick overview then points you to a painfully slow step by step process. That's great for some folks. Maybe i'd like to spend an afternoon meticulously following along and playing connect the dots. It can really help some people.

Not me, I got shit to do.

To be clear, I'm really not bashing on the project or the documentation. Its a fantastic project, and the documentation I'm sure is great. It's just not for me (the docs).

Let me lay down what GruntJS is first. They call it a "task runner". In lay terms - it means it will run a series of tasks for you when you type "grunt" into the command line. These tasks could be anything from minifying Javascript or CSS, or even copying or FTPing some files somewhere. People are writing Grunt modules for most everything you could want. Most web development things you'd probably want are most likely already written. And guess what - if you're a JS developer, you can write your own to fill in the missing pieces.

When I learn something like this because I want to get in and get out - I have a logical set of questions in my head.

 

## Why does typing Grunt into the command line do stuff?

Grunt is actually a Node.js project. We grab the Grunt project from the Node Package Manager (NPM). We install it globally by specifying the -g option when doing the npm install.

```
npm install -g grunt-cli
```

If you have no clue what I was just talking about and don't have Node.js installed or NPM - look into that. I won't cover that here - but it is a fact of life that you'll need both of those installed to continue. Don't worry - it's not difficult!

So after we install it, we can run it in any directory we want by simply typing "grunt" on the command line.  But will it do anything? Next question!

 

## When using Grunt, how does it know what to run?

When you run Grunt, it assumes there is a "GruntFile.js" file in the directory where you are when you typed "grunt". Don't have one? Make it! Right now. Here's some good docs on the GruntJS project page on how to make one: [http://gruntjs.com/sample-gruntfile](http://gruntjs.com/sample-gruntfile).

Here's my sample which minifies some JS, runs LESS, copies my files to a build directory, and FTPs them to my site:

```
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            my_target: {
                files: {
                    'build/<%= pkg.name %>.min.js': [
                        'src/js/angular.min.js',
                        'src/js/directives.js',
                        'src/js/services/Library.js',
                        'src/js/services/WebServices.js',
                        'src/js/services/AnimationServices.js',
                        'src/js/services/Formatting.js',
                        'src/js/game/Characters.js',
                        'src/js/game/CharacterUtils.js',
                        'src/js/game/Fight.js',
                        'src/js/game/Items.js',
                        'src/js/services/GeoService.js',
                        'src/js/controllers/GameController.js',
                        'src/js/prod_cfg.js']
                }
            }
        },
        less: {
            development: {
                options: {
                    paths: ["style"]
                },
                files: {
                    "build/<%= pkg.name %>.css": "src/main.less"
                }
            },
            production: {
                options: {
                    paths: ["style"],
                    yuicompress: true
                },
                files: {
                    "build/<%= pkg.name %>.css": "src/main.less"
                }
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'src/assets/', src: ['**'], dest: 'build/assets'},
                ]
            }
        },

        'ftp-deploy': {
            build: {
                auth: {
                    host: 'ftp.mysite.com',
                    port: 21,
                    authKey: 'key1'
                },
                src: 'build',
                dest: '/htdocs/mysecretwebdirectory',
                exclusions: []
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-ftp-deploy');

    grunt.registerTask('default', ['uglify', 'less', 'copy', 'ftp-deploy']);

};
```

Now lots of this is pretty custom to my project - like maybe you don't want to run a task to copy stuff, or ftp stuff - it's all up to you. There are 3 major pieces here though (working backwards):

1\. **Register task** - this is the task list in the order you want stuff done

2\. **Load NPM Tasks** \- this is where you tell the task runner what tasks your masterpiece is dependent on. How would Grunt know how to run "uglify" if you didn't tell it what project uglify actually is or where it finds the code?

3\. **Init the Tasks** - this is pretty custom to each "Grunt module". My uglify module has specific ways to tell it what to do. When I learn the secret ways - I toss it into that init section. To obtain the recipe, just do a google search for each project you want to use. In this case: "grunt-contrib-uglify" and copy/tweak an example or two.

Now, about step #2 - you didn't really think it was that easy did you? Just because we have a name (eg: grunt-contrib-uglify), how does it point to the Node module?

 

## How are Task Dependencies Loaded?

Easy if you know Node.js! Use a package.json file. See, when you're working with Node.js, there might be some dependencies. Maybe there's this really cool module out on NPM (Node Package Manager) in the "cloud" that ftp's files for you. You don't need to know how FTP works, you just gotta download the NPM module and include it as a dependency for use in your Node.js project.

To install a module - you'd usually type in the command line:

```
npm install myreallycoolftpmodule
```

Can you imagine though, if you had a hundred developers and told them each to install 19 dependencies for your masterpiece of a project? We need a way to automate things - and make each developer run something to install ALL THE REQUIRED pieces or dependencies for our specific project so that nobody screws up.

That's why if you type in the command line:

```
npm install
```

...it will use the package.json file in that directory that you're in. So a package.json file is a manifest of everything your project is dependent on. Running npm install, will sort through your list of dependencies, download them, and copy them into a "node\_modules" folder in the root of your project. That way, when your project runs - it will have everything it needs.

Here's my package.json file:

```
{
    "name": "ffsq",
    "version": "0.1.0",
    "devDependencies": {
        "grunt": "~0.4.1",
        "grunt-contrib-jshint": "~0.6.0",
        "grunt-contrib-uglify": "~0.2.2",
        "grunt-contrib-sass": "",
        "grunt-contrib-less": "",
        "grunt-contrib-copy": "",
        "grunt-preprocess": "",
        "grunt-ftp-deploy": "",
        "grunt-env": ""
    }
}

```

And oops - I got some more dependencies in there than I'm actually using on this project - but you get the point. Also, if I don't provide the version number, I'm throwing caution to the wind and saying: "Just give me the latest, I don't care what you broke when you updated".

## Run it

OK you've done all the prep work. You've created a package.json in your project root to let Grunt know what modules you need. You've created a GruntFile.json file to initialize everything and say HOW to run your tasks.

Before you run it. Do an NPM install. This will actually install everything from package.json so Grunt can work.

Then just type grunt in your command line - and you'll see good stuff happen, OR bad stuff happen. If bad stuff - you can check out the output and see what went wrong. If you want crazy details, run "grunt -verbose". Doing verbose mode will really help if you have something that doesn't work and you need to troubleshoot.

The hardest part of this will be learning the secret ways of the bazillion individual modules you employ in your project!

Good luck!
