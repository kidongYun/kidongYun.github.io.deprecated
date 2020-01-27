---
layout: post
title:  "Jekyll - 6. Categorized Posts using Menu"
date:   2019-05-05 11:38:54 +0900
categories: jekyll
---

### 1. Decide categories of which you want.

I will divide my posts to two parts. first is __Jekyll__ and the last thing is __React__ 

```
    Think the way how to divide your posts
```

### 2. modify your ___config.yml__ file

add the new code in anywhere of your __config.yml_ file

```yml
menu:
  - title: Jekyll
    url:   /jekyll/
  - title: React
    url:   /react/
```

below is your __config.yml_ file before modifying

```yml

title: Development Portfolio
email: oriondigestive@example.com
description: >- # this means to ignore newlines until "baseurl:"
  Computer Programming Development Web Application SPA Ajax
  Github Git Jekyll Blog
  React ReactNative NodeJS Express 
  MachineLearning DataMinning ArtificialIntelligence
baseurl: "" 
url: "" 
twitter_username: jekyllrb
github_username:  kidongYun
permalink: /:title/

markdown: kramdown
theme: minima
plugins:
  - jekyll-feed

```

and below is your __config.yml_ file after changing

```yml

title: Development Portfolio
email: oriondigestive@example.com
description: >- # this means to ignore newlines until "baseurl:"
  Computer Programming Development Web Application SPA Ajax
  Github Git Jekyll Blog
  React ReactNative NodeJS Express 
  MachineLearning DataMinning ArtificialIntelligence
baseurl: "" 
url: "" 
twitter_username: jekyllrb
github_username:  kidongYun
permalink: /:title/

####################################### START NEW CODE
menu:
  - title: Jekyll
    url:   /jekyll/
  - title: React
    url:   /react/
####################################### END NEW CODE

markdown: kramdown
theme: minima
plugins:
  - jekyll-feed

```

Even if the codes in __config.yml_ are a little different between your and mine, that's okay.

Just if you add above code related to _menu_ at anywhere of __config.yml_ successfully. then your service is maybe operate well.

if you finished, you can see the result on your jekyll page like below.

<img src="/workspace/devlog/jekyll/categorization/res/4.png">

Actually That's shape is a little different because of __Jekyll theme__

and You should check whether your Jekyll theme can apply __menu__ attribute or not. 

if it isn't, you must make this manually. Don't follow my posts.

### 3. Make directories related to categories

Let's make the directories and you should keep their names are equal with __url__ of menu attribute in __config.yml_

<img src="/workspace/devlog/jekyll/categorization/res/1.png">

look carefully the above picture, highlighted directories is my new folders for categorizing.

### 4. Make a __index.html__ files in each new folders

<img src="/workspace/devlog/jekyll/categorization/res/2.png">

<img src="/workspace/devlog/jekyll/categorization/res/3.png">

### 5. Lastly, filling your new __index.html__ files

follow code below.

<img src="/workspace/devlog/jekyll/categorization/res/5.png">

you should customize (code) to yours __ex) (layout name), (category name)__

and (layout name) is found in the __layouts_ directory in your jekyll projects



#### It's my case

<img src="/workspace/devlog/jekyll/categorization/res/6.png">

if you want to fix category page concretely, 

You should understand about the structure or code of your jekyll service.

and then fix your page manually.

You can see the following as the result

<img src="/workspace/devlog/jekyll/categorization/res/7.png">