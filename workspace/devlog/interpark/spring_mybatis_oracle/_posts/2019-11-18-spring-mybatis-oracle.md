---
layout: post
title:  "Interpark - Let's set the environment of Spring + Mybatis + Oracle in Intellij"
date:   2019-11-18 08:47:54 +0900
categories: interpark spring
---

### 1. Create Project.

```
    File > New > Project
```

<img src="/workspace/devlog/interpark/spring_mybatis_oracle/res/1.png">

> Please select Gradle Category and then You can see many various libraries for this. then Let's start to add 2 options named _Java_ , _Web_ like below. If you completed then please click _Next_ button.

<img src="/workspace/devlog/interpark/spring_mybatis_oracle/res/2.png">

> You can type any sentences or words for GroupId, ArtifactId If you want. But If you do, maybe you will confuse because of the java package, so I recommand to follow like my styles.

```
    GroupId : com.kidongyun
    ArtifactId : SpringMybatisOracle
```

> If you completed, Let's press _Next_ button.

<img src="/workspace/devlog/interpark/spring_mybatis_oracle/res/3.png">

> Project Name is maybe same with the ArtifactId, It's not considerable to change the name. so If you want, You can change the name. But If you are a novice about the Spring Framework, then Let's follow me for preventing any errors.

```
    Project name : SpringMybatisOracle
```

> Press _Finish_ button.

<img src="/workspace/devlog/interpark/spring_mybatis_oracle/res/4.png">

> then you can see below pictures. that is the final screen enable seen if you success above process perfectly. 

<img src="/workspace/devlog/interpark/spring_mybatis_oracle/res/5.png">

### 2. To config the build.gradle

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
    providedCompile group: 'javax.servlet', name: 'javax.servlet-api', version: '3.1.0'
    runtime 'javax.servlet:jstl:1.1.2'
    compile group: 'javax.annotation', name: 'javax.annotation-api', version: '1.3.2'

    compile 'org.springframework:spring-webmvc:4.3.18.RELEASE'
    compile group: 'org.springframework', name: 'spring-jdbc', version: '3.1.0.RELEASE'

    compile group: 'org.mybatis', name: 'mybatis-spring', version: '1.1.0'
    compile group: 'commons-dbcp', name: 'commons-dbcp', version: '1.4'

    compile group: 'com.oracle', name: 'ojdbc6', version: '12.1.0.1-atlassian-hosted'
}

```

> Please copy & paste the above code to your project.

```java 

repositories {
    mavenCentral()
    maven() { url "http://repo.spring.io/plugins-release/" }
}

```

> Actually _mavenCentral()_ is default repository offered by Maven. But there can't serve _OJDBC_ library directly cause Copyright of Oracle. So We should include the code _maven() { url ...}_ to use _ojdbc_

```java 
    compile group: 'javax.annotation', name: 'javax.annotation-api', version: '1.3.2'
```

> if you want to use _@Resource_ annotation, Let's add the above dependency.

```java 
    compile 'org.springframework:spring-webmvc:4.3.18.RELEASE'
    compile group: 'org.springframework', name: 'spring-jdbc', version: '3.1.0.RELEASE'
```

> Those are the things for applying basic functions of _Spring Framework_

```java 
    compile group: 'com.oracle', name: 'ojdbc6', version: '12.1.0.1-atlassian-hosted'
```

> If you don't add the new repository, then your project maybe will have errors what can't get _ojdbc6_ library at above code.

```java 
    compile group: 'commons-dbcp', name: 'commons-dbcp', version: '1.4'
```

> For Connection Pool. Your DB System is better than not when use this.

<img src="/workspace/devlog/interpark/spring_mybatis_oracle/res/6.png">

### 3. Delete _index.jsp_ files for new one

```
    > rm src/main/webapp/index.jsp
```

<img src="/workspace/devlog/interpark/spring_mybatis_oracle/res/7.png">

### 4. Make the Directories and Files.

```
    > mkdir src/main/webapp/WEB-INF
    > touch src/main/webapp/WEB-INF/web.xml
    > touch src/main/webapp/WEB-INF/dispatcher-servlet.xml
    > touch src/main/webapp/WEB-INF/applicationContext.xml

    > mkdir src/main/webapp/WEB-INF/view
    > touch src/main/webapp/WEB-INF/view/index.jsp

    > touch src/main/resources/mybatis-config.xml
    > mkdir src/main/resources/mappers
    > touch src/main/resources/mappers/personMappers.xml 

    > mkdir src/main/java/com/kidongyun
    > mkdir src/main/java/com/kidongyun/vo/
    > touch src/main/java/com/kidongyun/vo/PersonVO.java
    > mkdir src/main/java/com/kidongyun/dao
    > touch src/main/java/com/kidongyun/dao/PersonDAO.java  /* Interface */
    > mkdir src/main/java/com/kidongyun/service
    > touch src/main/java/com/kidongyun/service/PersonService.java
    > mkdir src/main/java/com/kidongyun/controller
    > touch src/main/java/com/kidongyun/controller/PersonController.java

```

> _PersonDAO.java_ is java _interface_ file. so Don't make this as just _class_ type file

<img src="/workspace/devlog/interpark/spring_mybatis_oracle/res/8.png">

### 5. Setiing for each files.

#### src/main/webapp/WEB-INF/web.xml

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

<img src="/workspace/devlog/interpark/spring_mybatis_oracle/res/9.png">

#### src/main/webapp/WEB-INF/dispatcher-servlet.xml

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

<img src="/workspace/devlog/interpark/spring_mybatis_oracle/res/10.png">

#### src/main/webapp/WEB-INF/applicationContext.xml

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

<img src="/workspace/devlog/interpark/spring_mybatis_oracle/res/11.png">

#### src/main/webapp/WEB-INF/view/index.jsp

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Hello</title>
</head>
<body>
${data}
</body>
</html>
```
<img src="/workspace/devlog/interpark/spring_mybatis_oracle/res/12.png">

#### src/main/resources/mybatis-config.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0/EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
</configuration>
```

<img src="/workspace/devlog/interpark/spring_mybatis_oracle/res/13.png">

#### src/main/resources/mappers/personMappers.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.kidongyun.dao.PersonDAO">

    <select id="selectPerson" resultType="com.kidongyun.vo.PersonVO">
        SELECT * FROM PERSON
    </select>

</mapper>
```

<img src="/workspace/devlog/interpark/spring_mybatis_oracle/res/14.png">

#### src/main/java/com/kidongyun/vo/PersonVO.java

```java
package com.kidongyun.vo;

public class PersonVO {
    String name;
    int age;
    String birthday;

    // ALT + INSERT -> GENERATE toString()
    @Override
    public String toString() {
        return "PersonVO{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", birthday='" + birthday + '\'' +
                '}';
    }
}
```

<img src="/workspace/devlog/interpark/spring_mybatis_oracle/res/15.png">

#### src/main/java/com/kidongyun/dao/PersonDAO.java

```java
package com.kidongyun.dao;

import com.kidongyun.vo.PersonVO;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonDAO {
    public List<PersonVO> selectPerson();
}
```

<img src="/workspace/devlog/interpark/spring_mybatis_oracle/res/16.png">

#### src/main/java/com/kidongyun/service/PersonService.java

```java
package com.kidongyun.service;

import com.kidongyun.dao.PersonDAO;
import com.kidongyun.vo.PersonVO;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class PersonService {

    @Resource
    private PersonDAO personDAO;

    public List<PersonVO> selectPerson() {
        return personDAO.selectPerson();
    }
}
```

<img src="/workspace/devlog/interpark/spring_mybatis_oracle/res/17.png">

#### src/main/java/com/kidongyun/controller/PersonController.java

```java
package com.kidongyun.controller;

import com.kidongyun.service.PersonService;
import com.kidongyun.vo.PersonVO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.util.List;

@Controller
public class PersonController {

    @Resource
    PersonService personService;

    @RequestMapping(value = "/")
    public String hello(Model model){
        List<PersonVO> data = personService.selectPerson();

        model.addAttribute("data", data.toString());
        return "index";
    }
}
```

<img src="/workspace/devlog/interpark/spring_mybatis_oracle/res/18.png">

### 6. Make the Person Table using Oracle DB

```sql
CREATE TABLE PERSON (
    NAME VARCHAR2(10),
    AGE NUMBER(3),
    BIRTHDAY DATE
)
```

> It's for making the new PERSON Table at Oracle.

```sql
INSERT INTO PERSON VALUES ('martin', 18, SYSDATE);
```

> and this query for putting the dummy datas.

<img src="/workspace/devlog/interpark/spring_mybatis_oracle/res/19.png">

<img src="/workspace/devlog/interpark/spring_mybatis_oracle/res/20.png">
