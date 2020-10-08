---
layout: post
title:  "Interpark - Java Singleton Pattern"
date:   2020-08-18 08:47:54 +0900
categories: interpark http rest-api 
---

### Use private keyword

> The main topic of the singleton pattern is It has to block the access for create new instance from outside because It's needed only one object.
We often use the 'private' keyword for solving this problem.  

```java

class Singleton {
    /* Use the 'private' keyword */
    private static final Singleton instance = new Singleton();

    /* The constructor also should be announced with the 'private' keyword */
    private Singleton() { }

    /* It should be approached at only here. */
    public static Singleton getInstance() {
        return instance;
    }
}

```

### Initialzation Timing

> If your system has a lot of the singleton pattern objects, then It could be too heavy to your system when It's started.
Because Your system should initialize these objects at an once. We can solve this problem using the Lazy Initialization.



### Thread-Safe