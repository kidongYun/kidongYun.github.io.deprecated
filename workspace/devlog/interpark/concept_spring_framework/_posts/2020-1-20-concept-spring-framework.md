---
layout: post
title:  "Interpark - The subject opinion about the need of spring framework."
date:   2019-12-12 08:47:54 +0900
categories: interpark spring junit mockito
---

### The need of Singleton Design Pattern.

> new 연산자는 자바 언어에서 객체를 생성할 때 기본적으로 사용할 수 있는 키워드이다. 이를 통해 코드를 통해 구현한 클래스를 실제 인스턴스로 구어낼수 있으며 이때부터는 컴퓨터 메모리에 실제로 그 객체가 올라가게 된다. new 연산자는 자바에서 기본으로 제공하는 만큼 많은 자유도를 가지고 있다. 같은 클래스여도 이 new 연산자를 사용하면 계속 동일한 구조를 가진 인스턴스를 만들어낼 수 있다. 하지만 이 인스턴스들은 모두 다른 메모리 주소에 할당됨으로 같은 데이터를 가지는것도 아니고 코드로 어떠한 연결점을 구성하지 않았다면 이들은 독립적인 객체가 된다. 이러한 방법은 때에 따라서는 득이 될수 있지만 어떤때에는 독이 될수 있다. 

1. 같은 인스턴스들 끼리의 혼란의 가중.
서버를 구현할 때 주로 사용하는 멀티스레드와 같은 방식을 생각해보자. 이 스레드들은 이 서버의 목적에 따라서 커스텀화된 어떤 객체로 구현되어져 있고 Thread 객체를 상속하고 있다. 이 객체들은 새로운 클라이언트들이 들어올 때마다 new 연산자를 통해 새로운 인스턴스를 만들어낸다. 이 인스턴스들은 각 객체들이 고유함으로 얻는 장점이 있지만 같은 모습을 가진 분신들이 많아짐으로 개발자 입장에서는 복잡하게 보이게되고 또 이 인스턴스들이 상호간에 통신을 해야하는 기능이 필요하다면 머리아파질 것이다.

2. 
예를 들어 자바로 작성된 어떤 프로젝트가 있다고 하자. 이 프로젝트에는 A, B, C 클래스가 존재하는데 이 세개의 클래스들은 모두 데이터들을 사용해야하는 구조를 가지고 있다. 즉 다시 말하면 A는 B와 C의 데이터를 필요로하며 B는 A와 C의 데이터, C는 A와 B의 데이터를 필요로 한다. 

```

class AClass {
    BClass bClass;
    CClass cClass;
}

class BClass {
    AClass aClass;
    CClass cClass;
}

class CClass {
    AClass aClass;
    BClass bClass;
}

```

우리는 위의 3개의 인스턴스를 가지고 서로서로 접근할 수 있는 구조를 가지고 싶어서 아래와 같이 코딩을 하게되면 큰 위험에 빠진다.

```

class AClass {
    BClass bClass = new BClass();
    CClass cClass = new CClass();
}

class BClass {
    AClass aClass = new AClass();
    CClass cClass = new CClass();
}

class CClass {
    AClass aClass = new AClass();
    BClass bClass = new BClass();
}

```

같은 클래스를 가리키고 있지만 new 연산자로 생성했기 때문에 실제로는 같은 모양은 가진 다른 인스턴스를 접근하고 있는 것과 같다. 그렇다면 우리가 의도한대로 구현하려면 어떻게 해야할까.

```
main() {
    AClass aClass = new AClass();
    BClass bClass = new BClass();
    CClass cClass = new CClass();

    aClass.setBClass(bClass);
    aClass.setCClass(cClass);

    bClass.setAClass(aClass);
    bClass.setCClass(cClass);

    cClass.setAClass(aClass);
    cClass.setBClass(bClass);
}

```

이렇게 각 클래스에대한 인스턴스를 하나만 생성해놓고 프로젝트를 구현해나가고 싶다면 위와같은 방법으로 코딩을 해야 한다. 그렇다면 우리는 항상 이런 main() 역할을 하는 함수를 항상 만들어 할까? Spring Framework는 이러한 불편함에서 부터 시작했다고 생각이 든다. 이런 코딩 방식이 필요한 경우에는 어딘가에 인스턴스를 저장해두고 꺼내쓰는 방식이 더 좋을 것 같다는 느낌이 든다.

## Spring Container

Spring Framework에서는 Spring container라는 개념을 제공한다. 이는 위에서 우리가 바라본 불편함을 개선하기 위함과 일맥상통하다. 이 객체 생성을 위해서 new 연산자를 활용하지 않고 bean의 개념을 사용하게 되면 이 Spring Container에 그 빈 객체가 저장된다. 그리고 이 빈 객체는 설정에 따라 다르지만 싱글톤 타입이라면 오직 하나의 클래스는 하나의 인스턴스를 가지게 되어 보다 더 구조화된 구현이 가능해진다. 이러한 Spring Container를 구현하기 위해 Spring Framework에서는 ContextLoaderListener라는 것을 제공한다. 이를 통해 ApplicationContext를 구현하게 되면 이 안에 빈 객체들을 저장할 수 있게된다. Spring Container이는 개념적인 단어이며 ApplicationContext는 이를 실제 구현한 객체를 말한다. 

그러나 Spring Framework는 한 프로젝트에 여러가지 Spring Container를 만들 수 있다. 그러나 지켜야할 규칙이 하나 있는데 바로 루트 Spring Container는 단 한가지다. 바로 이것이 바로 위에서 설명한 ApplicationContext를 활용해서 구현하게되면 이 Spring Container는 바로 루트 Container가 된다. Spring Container를 추가하고 싶다면 dispatcher-servlet을 사용해야한다. 이를 활용해 servlet을 구성하게되면 이 servlet 또한 하나의 Spring Container의 영역을 가지고 있다. 다만 실제고 이 dispatcher-servlet은 사용하는 목적이 단순히 Spring Container를 생성하기 위함은 아니다 말그대로 이것은 servlet임으로 웹서버를 위한 기능을 담당하고 있다. 즉 이 dispatcher-servlet을 활용해서 클라이언트의 요청을 받고 처리하며 결과를 반환해줄수 있다.

## web.xml, WebInitializer.java

지금까지 두가지의 개념을 소개했다. 하나는 Root Spring Container 생성을 위한 ApplicationContext, 두번째는 Servlet 구현을 위한 dispatcher-servlet이다. 실제로 이 두가지의 기능은 xml로 Spring을 설정할 경우 web.xml에 java코드로 설정할 경우 WebInitializer.java에 설정한다.

#### web.xml
```xml

<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">

    <!-- applicationContext 생성 -->
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>

    <!-- dispatcher-servlet 생성 -->
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

### WebInitializer.java
```java

package com.kidongyun.config;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.*;

public class WebInitializer implements WebApplicationInitializer {

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {

        /** applicationContext 생성 */
        AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
        context.setConfigLocation("com.kidongyun.config");

        /** dispatcher-servlet 생성 */
        ServletRegistration.Dynamic dispatcher = servletContext.addServlet("DispatcherServlet", new DispatcherServlet(context));
        dispatcher.setLoadOnStartup(1);
        dispatcher.addMapping("/");
    }
    
}

```

dispatcher-servlet 설정이다.

```xml

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

```java

package com.kidongyun.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

/** @Configuration : 이 자바파일이 설정파일임을 정의하는 어노테이션. */
@Configuration

/** @EnableWebMvc : xml로 구성할 때에 <annotation-driven/>과 동일한 역할. */
@EnableWebMvc

/** 기본적으로 @ComponentScan 으로 설정된 패키지의 객체들을 자동으로 의존 주입이 된다. */
@ComponentScan("com.kidongyun")
public class ServletConfiguration extends WebMvcConfigurerAdapter {

//    @Override
//    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
//        configurer.enable();
//    }
//
//    /** <resources mapping="/resources/**" location="/resources/" /> 설정과 동일 */
//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
//    }


    @Bean
    public InternalResourceViewResolver internalResourceViewResolver() {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setPrefix("/WEB-INF/view/");
        resolver.setSuffix(".jsp");
        return resolver;
    }
    /** Spring controller를 위해 view파일들의 위치와 그 확장자를 설정하기 위한 부분. */
}

```