---
layout: post
title:  "Interpark - To build Spring MVC via Intellij IDEA"
date:   2019-10-17 08:47:54 +0900
categories: interpark spring
---

This article is the Summary of building Spring MVC Project via Intellij IDEA IDE.

### 1. To make the new project

> please click like below process.

```
    File > New > Project
```

<img src="/workspace/devlog/interpark/build_spring_mvc/res/1.png">

> then You can see the new window for building the project like below.

```

    Select below Two Options

    - Java

    - Web

```

> If you finished, please press the next button located bottom of the window

<img src="/workspace/devlog/interpark/build_spring_mvc/res/2.png">

> input the contents 

```

    GroupId - com.kidongyun

    ArtifactId - SpringMVC

    Version - 1.0-SNAPSHOT
    // keep the default value.

```

> If you finished, please press the next button

<img src="/workspace/devlog/interpark/build_spring_mvc/res/3.png">

> input the contents

```

    Project name - SpringMVC

    Project location - random

```

> please press the finish button then you can see the process of building the new project.

<img src="/workspace/devlog/interpark/build_spring_mvc/res/4.png">

> Below is the file structure of your new project.

<img src="/workspace/devlog/interpark/build_spring_mvc/res/5.png">

### 2. To modify _build.gradle_ file

> Let's copy the below code to your _build.gradle_ file in project.

```java

plugins {
    id 'java'
    id 'war'
}

apply plugin: 'war'

group 'com.kidongyun'
version '1.0-SNAPSHOT'

sourceCompatibility = 1.8

repositories {
    mavenCentral()
}

dependencies {
    testCompile group: 'junit', name: 'junit', version: '4.11'
    testCompile group: 'junit', name: 'junit', version: '4.12'
    providedCompile group: 'javax.servlet', name: 'javax.servlet-api', version: '3.1.0'
    compile 'org.springframework:spring-webmvc:4.3.18.RELEASE'
    runtime 'javax.servlet:jstl:1.1.2'
}

```

<img src="/workspace/devlog/interpark/build_spring_mvc/res/6.png">

### 3. To delete _root/src/main/webapp/index.jsp_ file

> You have to delete _root/src/main/webapp/index.jsp_ file like below picture.

<img src="/workspace/devlog/interpark/build_spring_mvc/res/7.png">

### 4. To make the new directories and files

> Let's make new directories and files

```

    mkdir root/src/main/webapp/WEB-INF
    touch root/src/main/webapp/WEB-INF/web.xml
    touch root/src/main/webapp/WEB-INF/dispatcher-servlet.xml
    touch root/src/main/webapp/WEB-INF/applicationContext.xml

    mkdir root/src/main/java/com/kidongyun/controller/
    touch root/src/main/java/com/kidongyun/controller/HomeController.java

    mkdir root/src/main/webapp/WEB-INF/view
    touch root/src/main/webapp/WEB-INF/view/index.jsp

```

### 5. to fullfill the below codes at proper files.

> web.xml

```xml

<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>/WEB-INF/applicationContext.xml</param-value>
    </context-param>
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>

    <servlet>
        <servlet-name>dispatcher</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>/WEB-INF/dispatcher-servlet.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>dispatcher</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>

</web-app>

```

> dispatcher-servlet.xml

```xml

<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc.xsd">
    <mvc:annotation-driven />
    <context:component-scan base-package="com.kidongyun.controller" />
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/view/"></property>
        <property name="suffix" value=".jsp"></property>
    </bean>
</beans>

```

> applicationContext.xml

```xml

<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

</beans>

```

> HomeController.java

```java

package com.kidongyun.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
    @RequestMapping(value = "/")
    public String hello(Model model){
        model.addAttribute("msg", "Hello World!");
        return "index";
    }
}

```

> index.jsp

```jsp

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>Hello</title>
  </head>
  <body>
    ${msg}
  </body>
</html>

```

### 6. To set the Tomcat

```

    Run > Edit Configurations

```

> Let's open 'Edit configurations' window.

<img src="/workspace/devlog/interpark/build_spring_mvc/res/8.png">

> To add new Tomcat Server

<img src="/workspace/devlog/interpark/build_spring_mvc/res/9.png">

> To select the Tomcat server at _Application server_ part and To press the _fix_ button located bottom of window. and then finally, Let's add the artifact for making war file and building.

<img src="/workspace/devlog/interpark/build_spring_mvc/res/10.png">

### 7. Annotation Enable

> Let's get in those tabs.

```

    File > Settings > Build, Execution, Deployment > Compiler > Annotation Processors

```

> then you can see below window.

<img src="/workspace/devlog/interpark/build_spring_mvc/res/11.png">

> Let's check the Enable annotation processing for annotation syntax.

### 8. Tomcat Running

> Let's run your new project, then you can see this browser content

<img src="/workspace/devlog/interpark/build_spring_mvc/res/12.png">
