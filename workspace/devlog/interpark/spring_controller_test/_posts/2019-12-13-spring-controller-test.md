---
layout: post
title:  "Interpark - Spring Controller Test using Junit and Mockito"
date:   2019-12-12 08:47:54 +0900
categories: interpark spring junit mockito
---

> This article will skip the configuration of Spring Framework Environment basically because It's not main focus of this and It's too longer then the thing related to the spring test. If you want to know about those either then I recommend to read [this document](https://kidongyun.github.io/workspace/devlog/interpark/build_spring_mvc/spring/2019/10/16/build-spring-mvc.html).

### 1. Add Dependency in your build.gradle

> You should have all of the below dependencies for testing your spring project.

#### build.gradle

```java 

dependencies {

    testCompile group: 'junit', name: 'junit', version: '4.11'                                  // It may be default setting.
    testCompile group: 'junit', name: 'junit', version: '4.12'                                  // It may be default setting.
    testCompile group: 'org.mockito', name: 'mockito-all', version: '1.9.5'                     // Let's add this code.
    testCompile group: 'org.springframework', name: 'spring-test', version: '5.1.5.RELEASE'     // Let's add this code.

    providedCompile group: 'javax.servlet', name: 'javax.servlet-api', version: '3.1.0'
    compile 'org.springframework:spring-webmvc:4.3.18.RELEASE'
    compile group: 'org.springframework', name: 'spring-jdbc', version: '5.0.3.RELEASE'
    runtime 'javax.servlet:jstl:1.1.2'

}

```

> And you should condsider the version of javax.sevlet dependency carefully. If your thing is lower than 2.5 then maybe It's not working well when you test your project. and I don't know why this happen but You have to add the 'spring-jdbc' dependency for testing.

### 2. Configure the HomeController.java

> For testing, We will make a one controller thing in the project. and the code is like the below.

```java

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {

    @ResponseBody
    @RequestMapping(value = "/")
    public String hello(
            @RequestParam String name,
            @RequestParam int age,
            @RequestParam String major) {

        String res = name + " " + age + " " + major;
        return res;
    }

}

```

> If you want to test whether hello function work well or not in this _HomeController_, then you always turn on the WAS in locally and you also must send some request to your controller. But It's sometimes really tiresome. Surely, You can use the another service like postman for solving this issue. But I think to use the test code in project is really simple way to test the controller. <br><br> The above code is taken three parameters from someone who certainly doesn't know. and return this parameter using the _String_ type. and the url is only _'/'_.

### 3. Make the packages for testing the controller.

```
    > mkdir src/test/java/com/kidongyun/controller
    > touch src/test/java/com/kidongyun/controller/HomeControllerTest.java
```

### 4. Configure the HomeControllerTest.java

#### HomeControllerTest.java

```java

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:src/main/webapp/WEB-INF/dispatcher-servlet.xml", "file:src/main/webapp/WEB-INF/applicationContext.xml"})
public class HomeControllerTest {

    @Autowired
    HomeController homeController;

    private MockMvc mockMvc;

    @Before
    public void setUp() throws Exception {
        mockMvc = MockMvcBuilders.standaloneSetup(homeController).build();
    }

    @After
    public void tearDown() throws Exception {

    }

    @Test
    public void hello() throws Exception {
        mockMvc.perform(get("/")
                .param("name", "kidongyun")
                .param("age", "20")
                .param("major", "computer engineering"))
                .andDo(print())
                .andExpect(status().isOk());
    }
 }


```

> _MockMvc_ Object is like browser. It can send the request to our controller. So We can test our code using this object without any server running now. This _MockMvc_ Object is from the _spring-test_ library. so whenever you want to use this, You should add the dependency of this. Actually You can see this code at the above related to _build.gradle_. <br><br> And You should know the truth whether to test the controller in spring framework is an unit test or intergration test. Many developers over the world said that It's not Unit test because Unit test should be independent. but to test the controller is not. But I think this among all of the test technic is really important than others. Many problems usually were occured from the connection between client and server part.

```java

        mockMvc.perform(get("/")                                // You can insert the url you want to test.

                .param("name", "kidongyun")                     // The part for adding the parameters.
                .param("age", "20")
                .param("major", "computer engineering"))

                .andDo(print())                                 // This code can show the result of the MockMvc.perform() test.

                .andExpect(status().isOk());                    // status().isOk() means that we expect the success of the connection like '200' status code
                                                                // so If this test has any problems then It will return the fail because of this code.

```

<img src="/workspace/devlog/interpark/spring_controller_test/res/1.png"/> 

> If your test is successed then you can take the result like the below picture. Your _MockHttpServletResponse_ status is 200. Otherwise you forget one of the parameters at the above code like the below then you will take the failed result.

```java
        mockMvc.perform(get("/")
                .param("name", "kidongyun")
                .param("major", "computer engineering"))
                .andDo(print())
                .andExpect(status().isOk());
```

<img src="/workspace/devlog/interpark/spring_controller_test/res/2.png"/> 

### 5. Test Controller using Java Configuration.

> Actually according to my experience, When you configure your Spring project using the java configruation without xml code, The Controller Test code is little different. But if you don't understand about these things, It may be going to feel too difficult.

#### build.gradle

```java

    testCompile group: 'junit', name: 'junit', version: '4.11'
    testCompile group: 'junit', name: 'junit', version: '4.12'
    testCompile group: 'org.mockito', name: 'mockito-all', version: '1.9.5'
    testCompile group: 'org.springframework', name: 'spring-test', version: '4.3.18.RELEASE'
    providedCompile group: 'javax.servlet', name: 'javax.servlet-api', version: '3.1.0'
    runtime 'javax.servlet:jstl:1.1.2'
    compile group: 'javax.annotation', name: 'javax.annotation-api', version: '1.3.2'

    compile 'org.springframework:spring-webmvc:4.3.18.RELEASE'
    compile group: 'org.springframework', name: 'spring-jdbc', version: '3.1.0.RELEASE'

    compile group: 'org.mybatis', name: 'mybatis-spring', version: '1.3.2'
    compile group: 'org.mybatis', name: 'mybatis', version: '3.4.6'
    compile group: 'org.apache.commons', name: 'commons-dbcp2', version: '2.0'

```

> And you should consider the version of the _'spring-test'_ dependency. in my case, I used 5.X.X version of this, But It's not proper about the 4.X.X _'Spring'_ Environment. So First of all, Let's see the version of libraries via the above code. these dependencies include the function of the _'mybatis'_. so don't confuse about that.

#### HomeControllerTest.java

```java

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(classes = {WebConfig.class, RootConfig.class, ServletConfig.class})
public class HomeControllerTest {

    @Autowired
    HomeController homeController;

    private MockMvc mockMvc;

    @Before
    public void setUp() throws Exception {
        mockMvc = MockMvcBuilders.standaloneSetup(homeController).build();
    }

    @After
    public void tearDown() throws Exception {

    }

    @Test
    public void hello() throws Exception {
        mockMvc.perform(get("/")
                .param("name", "kidongyun")
                .param("age", "20")
                .param("major", "computer engineering"))
                .andDo(print())
                .andExpect(status().isOk());
    }
 }

```

### 6. Create Application Context directly at the Test Code.

> Actually To use the application context used from production environment is sometimes too hard. If you project is too big, then whenever you do the test, you test code configure your all of things related to application context. so I will introduce the new way to solve these problems.

#### HomeControllerTest.java

```java

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(loader = AnnotationConfigWebContextLoader.class)
public class HomeControllerTest {

    @Configuration
    static class ApplicationContext {

        @Bean
        public HomeController registerHomeController() {
            HomeController homeController = new HomeController();
            return homeController;
        }

        @Bean
        public HomeService registerHomeService() {
            HomeService homeService = new HomeService();
            return homeService;
        }

    }

    @Autowired
    HomeController homeController;

    private MockMvc mockMvc;

    @Before
    public void setUp() throws Exception {
        mockMvc = MockMvcBuilders.standaloneSetup(homeController).build();
    }

    @After
    public void tearDown() throws Exception {

    }

    @Test
    public void hello() throws Exception {
        mockMvc.perform(get("/")
                .param("name", "kidongyun")
                .param("age", "20")
                .param("major", "computer engineering"))
                .andDo(print())
                .andExpect(status().isOk());
    }

}

```

> If the object you want to register to application context has another your custom object, then you should register that object either.

### 7. The way how to test Controller.

> First of all, You can measure the result of the connection using this test code. That's exactly status code. and Second, You can check whether the parameter types are correct or not if you want.

#### HomeControllerTest.java

```java

package com.kidongyun.controller;

import com.kidongyun.config.RootConfig;
import com.kidongyun.config.ServletConfig;
import com.kidongyun.config.WebConfig;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.HashMap;
import java.util.Map;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(classes = {WebConfig.class, RootConfig.class, ServletConfig.class})
public class HomeControllerTest {

    @Autowired
    HomeController homeController;

    private MockMvc mockMvc;

    @Before
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(homeController).build();
    }

    @After
    public void tearDown() {

    }

    @Test
    public void requestResponseHello_validParameters_ShouldBePassed() throws Exception {
        /** Arrange */
        MvcResult result = mockMvc.perform(get("/")
                .param("name", "kidongyun")
                .param("age", "20")
                .param("major", "computer"))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        /** Act */
        String response = result.getResponse().getContentAsString();


        /** Assert */
        Map<String, Object> expected = new HashMap<>();
        expected.put("name", "kidongyun");
        expected.put("age", "20");
        expected.put("major", "computer");

        assertThat(response, equalTo(expected.toString()));
    }
}

```

