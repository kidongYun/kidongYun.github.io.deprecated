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

### 5 The way how to test Controller.

> First of all, You can measure the result of the connection usingt this test code. That's exactly status code. and Second, You can check whether the parameter types are correct or not if you want.

