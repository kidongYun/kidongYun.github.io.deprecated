---
layout: post
title:  "Interpark - To build the Spring + Mybatis + Oracle using Java configuration without Xml"
date:   2020-1-26 08:47:54 +0900
categories: interpark spring mybatis oracle java config
---

### 1. The need of Spring Framework -> Third party place for creating the java objects.

> Have you ever thought about the reason why the Spring framework was borned? Actually When I studied this framework, I can't understand the need of this. Everything can be implemented without the _'Spring Framework'_ but I realized the important need of _'Spring'_ at this time, Um...  Have you ever felt the difficult to create the instance of the Java Object? When you have 3 Java objects, We should create these Java object using _'new'_ keyword at the somewhere. But These object are really independent then It's really hard to determine the place where is better than another. Most of developers use the third party place like the _'main function'_ for create these java objects. Actually The important thing of the Spring Framework can offer the third party place for creating Java Objects and We say this place as _'Spring Container'_ and The java objects using the _'Spring Container'_ are named _'Bean'_.

### 2. Create the new project

> Plase follow the below steps. First of all We should make a new project for learning the process of building the Spring + Mybatis + Oracle using Java configuration.

```
    File > New > Project
```

<img src="/workspace/devlog/interpark/spring_mybatis_oracle_java_config/res/1.png">

> then You can see the below picture, Please click the _'Web'_ option at this window. totally You should get two options. If you finished then go to next window, Press the _'Next'_ button.

```

    Selected Options.

        - Java

        - Web

```

<img src="/workspace/devlog/interpark/spring_mybatis_oracle_java_config/res/2.png">

> You should write GroupId, ArtifactId. please just typing like me. It's not important at this topic. press _'Next'_ button.

```
    GroupId : com.kidongyun

    ArtifactId : SpringMybatisOracleJavaConfiguration
```

> If you type correctly at the above step, then your project name is correct either like the below. press _'Next'_ button.

```
    Project name : SpringMybatisOracleJavaConfiguration

    Project location : The place you want
```

<img src="/workspace/devlog/interpark/spring_mybatis_oracle_java_config/res/3.png">

> Press _'Finish'_ button.

### 3. Configure the _'build.gradle'_

> After creating the new project, We gotta get the dependencies related to the Spring, Mybatis, Oracle... <br><br> Please copy and paste the code to your _'build.gradle'_

#### build.gradle

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
    runtime 'javax.servlet:jstl:1.1.2'
    compile group: 'javax.annotation', name: 'javax.annotation-api', version: '1.3.2'

    compile 'org.springframework:spring-webmvc:4.3.18.RELEASE'
    compile group: 'org.springframework', name: 'spring-jdbc', version: '3.1.0.RELEASE'

    compile group: 'org.mybatis', name: 'mybatis-spring', version: '1.3.2'
    compile group: 'org.mybatis', name: 'mybatis', version: '3.4.6'
    compile group: 'org.apache.commons', name: 'commons-dbcp2', version: '2.0'
}

```

> You should type the version of each things. If you don't, You may encounter the error at the console especially mybatis and mybatis-spring. and the detail role of each dependency is written at [here](/workspace/devlog/interpark/spring_mybatis_oracle/spring/2019/11/18/spring-mybatis-oracle.html).

### 4. Import the local _'ojdb6.jar'_ file

> Let's download [ojdbc6.jar](/workspace/devlog/interpark/spring_mybatis_oracle_java_config/res/ojdbc6.jar){: target="_blank"}

> You have to read this thing not the above. the repository for _'OJDBC'_ is not working after yesterday. for solving this problem, We will import the _'OJDBC'_ library locally. that is we will download the _'.jar'_ file related to _'OJDBC'_ and import that thing like the below

> Create new folder named _'lib'_ for the local jar file _'ojdbc6.jar'_.

```
    workspace/src/main/webapp> mkdir WEB-INF

    workspace/src/main/webapp/WEB-INF> mkdir lib
```

> and then Let's copy and paste _'ojdbc6.jar'_ into the _'lib'_ folder.

<img src="/workspace/devlog/interpark/spring_mybatis_oracle_java_config/res/4.png">

> And follow the below.

```
    Ctrl + Shift + Alt + S -> Libraries Tab -> '+' Button -> Java > Select your file > Apply 
```

<img src="/workspace/devlog/interpark/spring_mybatis_oracle_java_config/res/5.png">

### 5. Delete _index.jsp_ files for new one

```
    workspace> rm src/main/webapp/index.jsp
```

<img src="/workspace/devlog/interpark/spring_mybatis_oracle_java_config/res/6.png">

### 6. Make the Directories and Files.

> For setting this proejct, You should a lot of the directories, and files. You should keep the concentration when you make these.

```

    workspace> mkdir src/main/java/com/kidongyun

    workspace/src/main/java/com/kidongyun> mkdir config
    workspace/src/main/java/com/kidongyun/config> touch WebConfig.java
    workspace/src/main/java/com/kidongyun/config> touch ServletConfig.java
    workspace/src/main/java/com/kidongyun/config> touch DatabaseConfig.java

    workspace/src/main/resources> touch mybatis-config.xml
    workspace/src/main/resources> mkdir mappers
    workspace/src/main/resources/mappers> touch personMappers.xml

    workspace/src/main/java/com/kidongyun> mkdir vo
    workspace/src/main/java/com/kidongyun/vo> touch PersonVO.java 

    workspace/src/main/java/com/kidongyun> mkdir dao
    workspace/src/main/java/com/kidongyun/dao> touch PersonDAO.java       // It's Interface.

    workspace/src/main/java/com/kidongyun> mkdir service
    workspace/src/main/java/com/kidongyun/service> touch PersonService.java

    workspace/src/main/java/com/kidongyun> mkdir controller
    workspace/src/main/java/com/kidongyun/controller> touch PersonController.java

    workspace/src/main/webapp/WEB-INF> mkdir view
    workspace/src/main/webapp/WEB-INF/view> index.jsp

```

### 7. Configure each files.

#### WebConfig.java

> It has really similar function with _'web.xml'_. The main function of this file is actually to create the _'Root container'_ and _'Servlet'_. as you know, _'Root Container'_ is the fundamental third party place of the _'Bean'_.

```java

package com.kidongyun.config;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

public class WebConfig implements WebApplicationInitializer {

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {

        /** Create the Root Container. */
        AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
        context.setConfigLocation("com.kidongyun.config");

        /** Create the Servlet. */
        ServletRegistration.Dynamic dispatcher = servletContext.addServlet("DispatcherServlet", new DispatcherServlet(context));
        dispatcher.setLoadOnStartup(1);
        dispatcher.addMapping("/");
    }
}

```

#### ServletConfig.java

> Actually if you want, you can create _'Servlet'_ more than one. So _'ServletConfig.java'_ file is the setting for each servlet. The core of _'Servlet'_ is to take the request of a client and to return the response of the request from the client. You will configure about these setting in this file. It equal the _'dispatcher-servlet.xml'_ file.

```java

package com.kidongyun.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@Configuration                      /** It means the Spring Container.*/
@EnableWebMvc
@ComponentScan("com.kidongyun")     /** <context:component-scan base-package="com.kidongyun" /> */
public class ServletConfig extends WebMvcConfigurerAdapter {
    @Bean
    public InternalResourceViewResolver internalResourceViewResolver() {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setPrefix("/WEB-INF/view/");
        resolver.setSuffix(".jsp");
        return resolver;
    }
}


```

#### DatabaseConfig.java

```java

package com.kidongyun.config;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.annotation.Resource;

@Configuration
@MapperScan("com.kidongyun.dao")
public class DatabaseConfig {

    @Resource
    private ApplicationContext applicationContext;

    /** Datasource is the object for connecting between database and java from JDBC. */
    @Bean
    public DriverManagerDataSource dataSource() {
        DriverManagerDataSource source = new DriverManagerDataSource();
        source.setDriverClassName("oracle.jdbc.driver.OracleDriver");
        source.setUrl("jdbc:oracle:thin:@localhost:1521:XE");
        source.setUsername("c##scott");
        source.setPassword("tiger");

        return source;
    }

    /** Setting Datasource, Mybatis configuration file and mapper directories */
    @Bean
    public SqlSessionFactory sqlSessionFactory() throws Exception {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(dataSource());
        sqlSessionFactoryBean.setConfigLocation(applicationContext.getResource("classpath:mybatis-config.xml"));
        sqlSessionFactoryBean.setMapperLocations(applicationContext.getResources("classpath:mappers/**/*.xml"));

        return sqlSessionFactoryBean.getObject();
    }

    @Bean
    public SqlSession sqlSession() throws Exception {
        SqlSessionTemplate sqlSessionTemplate = new SqlSessionTemplate(sqlSessionFactory());
        return sqlSessionTemplate;
    }
}

```

#### mybatis-config.xml

```xml

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0/EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
</configuration>

```

#### personMappers.xml

```xml

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.kidongyun.dao.PersonDAO">

    <select id="selectPerson" resultType="com.kidongyun.vo.PersonVO">
        SELECT * FROM PERSON
    </select>

</mapper>

```

#### PersonVO.java

```java

package com.kidongyun.vo;

public class PersonVO {
    String name;
    int age;
    String birthday;

    /** ALT + INSERT -> GENERATE toString() */
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

#### PersonDAO.java

```java

/** It's interface */

package com.kidongyun.dao;

import com.kidongyun.vo.PersonVO;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface PersonDAO {
    List<PersonVO> selectPerson();
}

```

#### PersonService.java

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

#### PersonController.java

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

#### index.jsp

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

### 8. Make the Person Table using Oracle DB

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

### 9. Configure the tomcat for executing the web server from local.

> Skip.

<img src="/workspace/devlog/interpark/spring_mybatis_oracle_java_config/res/7.png">

### Additional. Change the _'WebConfig.java'_ for adding the _'RootConfig'_

> If you follow the above code style, You can't configure the _'Root Context'_ file separately. But if you follow this code style then you can do that. First of all, You should make the _'RootConfig.java'_ file into the com/kidongyun/config/ directory.

#### RootConfig.java

```java

package com.kidongyun.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = {"com.kidongyun"})
public class RootConfig {
}

```

> When you want to create the some beans, You can do over there. and You have to change your _'WebConfig.java'_ file for recognizing about your new _'RootConfig.java'_ file.

#### WebConfig.java

```java

package com.kidongyun.config;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

public class WebConfig extends AbstractAnnotationConfigDispatcherServletInitializer {

    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class<?>[] { RootConfig.class };
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class<?>[] { ServletConfig.class };
    }

    @Override
    protected String[] getServletMappings() {
        return new String[] { "/" };
    }

}

```

> _'getRootConfigClasses()'_ method is for setting the _'RootConfig.java'_ and _'getServletConfigClasses()'_ method is for the _'ServletConfig.java'_ I think it's more better idea than the above configuration.