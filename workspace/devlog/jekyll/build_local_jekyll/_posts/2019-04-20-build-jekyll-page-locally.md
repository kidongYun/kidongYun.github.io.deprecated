---
layout: post
title:  "Jekyll - 1. Let's build the jekyll page in local"
date:   2019-04-20 02:24:54 +0900
categories: jekyll
---

when I was building this jekyll page, I have been through a lot of trials and errors. so I felt at that time I should write some posts associated with __Jekyll__ to record my working and to share to the others.

this post is to know the way how to build the jekyll page in local system.

Specially, you should install __Ruby__ in your system before following below process.

if you don't have __Ruby__ in your system, you can download it in [this page](https://rubyinstaller.org/downloads/).

### 1. To install Jekyll via gem of Ruby

#### Execute __'cmd'__

<img src="/workspace/devlog/jekyll/build_local_jekyll/res/1.png">

Please press __Windows + R__ buttons simultaneously then you can see the window like above.

then press the confirm button.

#### Typing these in Command
```
    .../> mkdir my_jekyll
    .../> cd my_jekyll
    .../my_jekyll> gem install jekyll
```
<img src="/workspace/devlog/jekyll/build_local_jekyll/res/2.png">

Let's change directory using __'cd'__, __'mkdir'__ to your workspace where you want. you can install __Jekyll__ through gem of Ruby. Let's follow the above command line.

### 2. Let's make a new jekyll project in workspace

#### Typing below's code in Command
```
    .../my_jekyll > jekyll new .
```
<img src="/workspace/devlog/jekyll/build_local_jekyll/res/3.png">

<img src="/workspace/devlog/jekyll/build_local_jekyll/res/4.png">

you can see the new files made by the above command in your workspace.
these files are the things for building your static web page used Jekyll

### 3. Let's execute your jekyll page service locally.

#### Typing below's code in Command
```
    .../my_jekyll > jekyll serve
```

<img src="/workspace/devlog/jekyll/build_local_jekyll/res/5.png">

if you saw the same texts like my in your command, your jekyll service work successfully.

<img src="/workspace/devlog/jekyll/build_local_jekyll/res/6.png">

Let's enter the jekyll page via [localhost:4000](http://localhost:4000)

if you saw the page same with me, it works well.