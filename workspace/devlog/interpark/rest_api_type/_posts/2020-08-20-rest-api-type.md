---
layout: post
title:  "Interpark - The briefly summary of Rest Api types"
date:   2020-07-15 10:00:00 +0900
categories: interpark spring bean injection
---

### GET

> It's just like the 'SELECT' query. when you need to get some data from server, then we use this type of api. Actually this is not the main topic of this article. so I will skip the detail of it.

> before I write this article, I've always confused about the concept between POST, PUT and PATCH things. They are too same to me so I can't use them at proper places. Let's to summary about them now.

### POST

> It's like the 'INSERT' query. It could add the new items of your service and if your request of it is overlapped, then I gotta create new one over and over. Yes, It always create new ones. and For create new one, this api should get all of the field your system need. 

### PUT

> It's like the 'UPDATE' query. The main difference with 'POST' and 'PUT' is that 'PUT' have to keep the fault-tolerant attributes. It's already introduced at the above. in other word, It should be not changed the data when your request is overlapped. and It also take all of the parameters for updating your one.

### PATCH

> It's do similar thing with 'PUT', but It should take the pare of the fields. It's the only difference with 'PUT' api.

### DELETE

> I think you might know about this api. It's not special. It just delete the data based the parameters requested from client.