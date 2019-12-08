---
layout: post
title:  "Interpark - The Usage of Selectkey option of Mybatis"
date:   2019-12-06 08:47:54 +0900
categories: interpark spring mybatis
---

## 1. CREATE TABLE

> In my case, I use Oracle 11g Database.

```SQL

CREATE SEQUENCE PLAYER_NO_SEQ
    START WITH 1
    INCREMENT BY 1
    MAXVALUE 10000
    MINVALUE 1
    NOCYCLE;

```

```SQL

CREATE TABLE PLAYER(
    NO NUMBER(5) PRIMARY KEY,
    NAME VARCHAR(5) NOT NULL,
    AGE NUMBER(3) NOT NULL,
    BIRTHDAY DATE NOT NULL
)

```

## 2. Default Setting

> The detail is written at the article so if you can't build the project configuration of Spring + Mybatis + Oracle then I recommand to read that.

<img src="/workspace/devlog/interpark/mybatis_selectkey/res/1.png">

> The above is the directory structure when you finished the configuration of this project.

```c 

    - src
        - main
            - java
                - com.kidongyun
                    - controller
                        PlayerController.java
                    - dao
                        PlayerDAO.java  // It's interface
                    - service
                        PlayerService.java
                    - vo
                        PlayerVO.java
            - resources
                - mappers
                    playerMappers.xml
                mybatis-config.xml
            - webapp
                - WEB-INF
                    - view
                        index.jsp
                    applicationContext.xml
                    dispatcher-servlet.xml
                    web.xml

```

## Config every each files.

### build.gradle

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
    maven() { url "http://repo.spring.io/plugins-release/" }
}

dependencies {
    testCompile group: 'junit', name: 'junit', version: '4.11'
    testCompile group: 'junit', name: 'junit', version: '4.12'
    providedCompile 'javax.servlet:servlet-api:2.5'
    runtime 'javax.servlet:jstl:1.1.2'
    compile group: 'javax.annotation', name: 'javax.annotation-api', version: '1.3.2'

    compile 'org.springframework:spring-webmvc:4.3.18.RELEASE'
    compile group: 'org.springframework', name: 'spring-jdbc', version: '3.1.0.RELEASE'

    compile group: 'org.mybatis', name: 'mybatis-spring', version: '1.1.0'
    compile group: 'commons-dbcp', name: 'commons-dbcp', version: '1.4'

    compile group: 'com.oracle', name: 'ojdbc6', version: '12.1.0.1-atlassian-hosted'
}

```

### web.xml

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

### dispatcher-servlet.xml

```xml

<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc.xsd">
    <mvc:annotation-driven />
    <context:component-scan base-package="com.kidongyun" />
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/view/"></property>
        <property name="suffix" value=".jsp"></property>
    </bean>
</beans>

```

### applicationContext.xml

```xml

<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean class="org.springframework.jdbc.datasource.DriverManagerDataSource" id="dataSource">
        <property value="oracle.jdbc.driver.OracleDriver" name="driverClassName" />
        <property value="jdbc:oracle:thin:@localhost:1521:XE" name="url" />
        <property value="c##scott" name="username" />
        <property value="tiger" name="password" />
    </bean>

    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <property name="configLocation" value="classpath:mybatis-config.xml"></property>
        <property name="dataSource" ref="dataSource"></property>
        <property name="mapperLocations" value="classpath:mappers/**/*.xml"></property>
    </bean>

    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="com.kidongyun" />
    </bean>
</beans>

```

### index.jsp

```jsp

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Hello</title>
</head>
<body>
${no}
</body>
</html>

```

### mybatis-config.xml

```xml

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0/EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
</configuration>

```

### playerMappers.xml

> It's maybe best important file for understanding the function named 'SelectKey'. The tag 'selectKey' is getting the next value of 'PLAYER_NO_SEQ'. Actually This value means the primary key. and we can use this value via the name 'no' but You can also control this name using the _keyProperty_ attribute. I am naming 'no' in this project. so at the part of INSERT Query, I use this 'no' value for NO column in PLAYER table. like this '#{no}'. It apperently mean 'SELECT PLAYER_NO_SEQ.NEXTVAL FROM DUAL'. <br><br> You can change the _keyProperty_ attribute if you want and also you can change the _resultType_ attribute as your key data.

```xml

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.kidongyun.dao.PlayerDAO">

    <insert id="insertPerson" parameterType="com.kidongyun.vo.PlayerVO">
        <selectKey keyProperty="no" resultType="int" order="BEFORE">
            SELECT PLAYER_NO_SEQ.NEXTVAL FROM DUAL
        </selectKey>

        INSERT INTO PLAYER VALUES
        (
            #{no},
            #{name},
            #{age},
            TO_DATE(#{birthday}, 'yyyyMMdd')
        )
    </insert>

</mapper>

```

### PlayerVO.java

```java

package com.kidongyun.vo;

public class PlayerVO {
    int no;
    String name;
    int age;
    String birthday;

    public int getNo() {
        return no;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    @Override
    public String toString() {
        return "PlayerVO{" +
                "no=" + no +
                ", name='" + name + '\'' +
                ", age=" + age +
                ", birthday='" + birthday + '\'' +
                '}';
    }
}

```

### PlayerDAO.java

> You should know the one thing. Let's see the below PlayerDAO code. insertPerson function doesn't have the return type actually, but The purpose of using _selectKey_ tag is for getting the some information associated with the data you insert. but This function doesn't have the return type as you know. It's little weird. Eventually The take information from 'selelctKey' is saven to parameter. That is The result is stored in the parameter. _selectKey_ tag is usually used when you insert some data to the database. Acutally You don't need any primary key like 'no' when you insert your data. so This value is always empty. and 'selectKey' tag return the new primary key to this empty space.

```java

package com.kidongyun.dao;

import com.kidongyun.vo.PlayerVO;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerDAO {
    public void insertPerson(PlayerVO playerVO);
}

```

### PlayerService.java

> like the below code, you can get the result of 'selectKey' via the parameter variable.

```java

package com.kidongyun.service;

import com.kidongyun.dao.PlayerDAO;
import com.kidongyun.vo.PlayerVO;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class PlayerService {

    @Resource
    private PlayerDAO playerDAO;

    public int insertPerson() {
        PlayerVO playerVO = new PlayerVO();
        playerVO.setName("Mark");
        playerVO.setAge(20);
        playerVO.setBirthday("19901212");

        playerDAO.insertPerson(playerVO);

        return playerVO.getNo();
    }
}

```

### PlayerController.java

```java

package com.kidongyun.controller;

import com.kidongyun.service.PlayerService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
@Controller
public class PlayerController {

    @Resource
    PlayerService playerService;

    @RequestMapping(value = "/")
    public String hello(Model model){

        int no = playerService.insertPerson();
        model.addAttribute("no", no);

        return "index";
    }
}

```

<img src="/workspace/devlog/interpark/mybatis_selectkey/res/2.png">

> This number is the PLAYER_NO_SEQ.NEXTVAL.