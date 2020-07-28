---
layout: post
title:  "Interpark - Let assert the map at the Junit"
date:   2020-07-22 18:47:54 +0900
categories: interpark spring junit
---

## How do we test the map structure in the Junit.

> You can test this through the basic function of Java. But I will recommend some library named hamcrest for increasing readability.

```java

    /** Let add the dependency. It's the gradle exmple */
    testCompile group: 'org.hamcrest', name: 'java-hamcrest', version: '2.0.0.0'

```

> But I don't know the advantage of this library actually. Just only the readability.