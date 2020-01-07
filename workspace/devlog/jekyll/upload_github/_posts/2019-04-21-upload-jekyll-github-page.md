---
layout: post
title:  "Jekyll - 2. Let's upload the your jekyll to github page"
date:   2019-04-21 03:56:54 +0900
categories: jekyll
---

First of all, your system should be installed __Git__ program before following this post. if you don't, you can get __Git__ at [this page](http://git-scm.com)

### 1. Make a new repository of github for Jekyll page.

Let's go to [github site](https://github.com) and please login your account.

If you don't have, please sign in.

<img src="/workspace/devlog/jekyll/uploadToGithub/res/1.png">

and then please press __new__ button located on left of this above site

#### you should type your repository name like below at next page.

```
    [username].github.io
```
<img src="/workspace/devlog/jekyll/uploadToGithub/res/2.png">

you should type your own name at the part of __username__. 

in my case, i wrote 'kidongYun' as you see.
### 2. Let's link between github repository and your local jekyll directory using __Git__

execute __git bash__ and change the directory to your jekyll workspace.

<img src="/workspace/devlog/jekyll/uploadToGithub/res/3.png">
I have changed my directory to '.../my_jekyll' as you can see at above picture.

#### following below's code in git bash
```
    .../my_jekyll > git init
    .../my_jekyll > git add .
    .../my_jekyll > git commit -m "first"
    .../my_jekyll > git remote origin add [your git repository]
    .../my_jekyll > git push -u origin master 
```

you can confirm __[your git repository]__ at your github repository.

When you completed all of the aboves, you can see the your jekyll page loaded in github repository via your officially github page url.

maybe your url look like this __https://[username].github.io__

<img src="/workspace/devlog/jekyll/uploadToGithub/res/4.png">

My page is a bit different from the default pages which already saw at previous post because of __Jekyll Theme__

We will take a look at the __Jekyll Theme__ in following posts.
