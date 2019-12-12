---
layout: post
title:  "Interpark - Spring Controller Test using Junit and Mockito"
date:   2019-12-12 08:47:54 +0900
categories: interpark spring junit mockito
---

> This article will skip the configuration of Spring Framework Environment basically because It's not main focus of this and It's too longer then a something related to the spring test. If you want to know about those either then I recommend to read [this document]().

### 1. Add Dependency in your build.gradle

> You should have all of the below dependencies for testing your spring project.

#### build.gradle

```java 

    testCompile group: 'junit', name: 'junit', version: '4.11'                                  // It may be default setting.
    testCompile group: 'junit', name: 'junit', version: '4.12'                                  // It may be default setting.
    testCompile group: 'org.mockito', name: 'mockito-all', version: '1.9.5'                     // Let's add this code.
    testCompile group: 'org.springframework', name: 'spring-test', version: '5.1.5.RELEASE'     // Let's add this code.

```