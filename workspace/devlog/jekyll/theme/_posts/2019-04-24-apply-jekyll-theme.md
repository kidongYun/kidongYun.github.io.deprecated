---
layout: post
title:  "Jekyll - 3. Let's apply Jekyll Theme"
date:   2019-04-24 04:21:00 +0900
categories: jekyll
---

### 1. Download the zip file of the desired __Jekyll Theme__.
Let's get the Jekyll Theme you want on [this page](http://jekyllthemes.org/) first.

and please download the __zip__ files of the desired __Jekyll Theme__.

<img src="/workspace/devlog/jekyll/theme/res/1.png">

I downloaded the __hydejack__ theme in my case.

### 2. Copy and Paste zip files of Jekyll Theme to your Jekyll Proejct directory.
When you're done, please __unzip__ your theme file. then copy and paste these all files to your jekyll project folder.

<img src="/workspace/devlog/jekyll/theme/res/2.png">

and when you received above message, you should surely press the skip button.

__Don't overwrite the file. Never!__ otherwise your Jekyll service is not operating.

### 3. Serve Your Jekyll Page locally 

please you operate your Jekyll Server using below command at your Jekyll directory.

actually, we already seen this command at  [Jekyll-1 Let's build the jekyll page in local](/workspace/devlog/jekyll/build_local_jekyll/2019/04/19/build-jekyll-page-locally.html)

if you can't understand this, I recommend you looking at the above post.

```
    .../my_jekyll > jekyll serve
```

you can see below image as a result.

<img src="/workspace/devlog/jekyll/theme/res/3.png">

I think it is more awesome then default theme.

### 4. update Jekyll Theme to Github.

it is also so simple just you do to upload your updated to github.

#### following these commands at your Jekyll project folder.

```
    .../my_jekyll > git add .
    .../my_jekyll > git commit -m "first"
    .../my_jekyll > git push -u origin master 
```

then you can also see the same with above picture.