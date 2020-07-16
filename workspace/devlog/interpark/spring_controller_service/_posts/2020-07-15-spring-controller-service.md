---
layout: post
title:  "Interpark - About the role of Spring Controller and Service."
date:   2020-07-15 10:00:00 +0900
categories: interpark spring
---

> During I work as Java developer with Spring Framework, I was thrown into the confusion of the role. How do I build the MVC pattern?, What is better thing?
I can't always answer about these questions though. This article is the content, which my opinion about the role of each parts of Spring Framework.

## 1. The needs of The Spring Service logic

> As you know, The service logic might be necessary on Spring Framework. Let's suppose that the Spring Framework has only controller logic without service thing.
When you want to share the function, which be made by you, You can not it at this situation. How do you access between each controllers? You might be able to think the below.

```java
   
    /** in AController.java */
    public class AController {

        public void aFunction() {
                
        }
    }

    /** in BController.java */
    public class BController {
        public AController aController = new AController();

        public void BFunction() {
            aController.aFunction();
        }   
    }

```

> If You are already the person of familiar with the Spring. You could get that the above code is really stupid thinking cause a lot of reasons. 
You gotta always keep the independence between all of controllers, But It isn't. And You could not make the parameters of the thing you want from another controllers.
<br><br> What is the best way to access the __aFunction()__ from BController.java? If you get it, You could understand the needs of service either.

```java

    /** in AController.java */
    public class AController {
        CService cService = new CService();
  
        public void aFunction() {
            cService.cFunction();
        }
    }
   
    /** in BController.java */
    public class BController {
        CService cService = new CService();

        public void bFunction() {
            cService.cFunction();
        }
    }
    
    /** in CService.java */
    public class CService {
        public void cFunction() {
        }
    }
    
```

> I think that it would be more normal pattern of Spring. You can keep the independence among the your code when you would like to use some function at many places. 
You can do like the above code whenever you need to create some function. The controllers would be more dependent than the services cause It need to consider the data given from client side.
<br><br>
_The important thing is that you have to make the your own functions to the service files when you would like to keep the independence from others._


## 2. Aspect of building a Spring service.

### 2.1 How to offer the parameters.

> To keep the independence of own functions located at service needs to manipulate the parameter properly. 
First of all, It must get a primitive type data or POJO object. No dependent object like HttpServletRequest.

```java

    /** in Person.java */
    public class Person {
        String name;
        int age;
    }

    /** in AService.java */
    public class AService {

        /** It's dependent case. */
        public void dependentCase(HttpServletRequest request) {
            String name = request.getParameter("name");
            int age = request.getParameter("name");
    
            // do Something
        }

        /** It's independent case */
        public void independentCase(String name, int age) { 
            // do Something
        }

        /** It's independent case */
        public void independentcase(Person person) {
            String name = person.name();
            int age = person.age();
        }
    }
```

> If you choose the bad one at the above, then the controller what want to use your function always have to possess the __Request__ object.


### 2.2 The function in Service has to be pure function.

> Do you know the concept of a pure function? It's really simple. That function has to be clear. in other words, The result is always same if parameter is equal.

```java

    public class AService {
        int c = 10;

        public int pureFunction(int a, int b) {
            return a + b;
        }

        public int impureFunction(int a, int b) {
            return a + b + c;
        }
    }

```

> the __pureFunction__ always return the same result but impureFunction isn't case the variable named __c__. 
We can't make sure the result is same if variable c is changed. <br><br>
Your function located at service should be used by a lot of controllers. but the static variable like __c__ could make some errors unpredicted.
And It might be most important reason to use the pure function technique that Impure function can't be used the test code.

### 3. The exception handling on the service.

> To check your code in your business for the safety would be important as you know. like to check a Null exception, type casting exception or format things..
Where is best place for putting this code on Spring Framework? It's really difficult to me and I can't figure it out until now.
but I just found one fact, which is that the exception handling code be always dependent by some code. Let's see the below codes.

```java

    /** Structure 1. No try-catch syntax */
    public class AService {
        public String aFunction() { 
            return result;
        }
    }

    public class AController {
        AService aService = new AService();

        public String controller() {
            String result = aService.aFunction();
 
            if("error".equals(result)) {
                // do error processing
                return "ERROR";
            }

            return "SUCCESS";
        }       
    }

```

> I think it might be simplest way to create the exception handling code. It doesn't use the __try-catch__ syntax and 
this structure is processing exception handling at the controller logic. but the longer error code is the more it's too hard to read.
That is you couldn't understand that main business because the exception handling.

```java

    /** Structure 2. Exception Handling on Controller */
    public class AService {
        public String aFunction() { 
            return result;
        }
    }

    public class AController {
        AService aService = new AService();

        public String controller() {

            try {
                String result = aService.aFunction();
              
                if("error".equals(result)) {
                    throw new Exception();
                }   

            } catch(Exception e) {
                // do error processing
                return "ERROR";
            }

            return "SUCCESS";
        }       
    }

    /** Structure 3. Exception Handling on Service */
    public class AService {
        public String aFunction() { 
            String result = getFromSomewhere();

            if("error".equals(result)) {
                throw new Exception();
            }   
            
            return result;
        }
    }

    public class AController {
        AService aService = new AService();

        public String controller() {

            try {
                String result = aService.aFunction();

            } catch(Exception e) {
                // do error processing
                return "ERROR";
            }

            return "SUCCESS";
        }       
    }

```

> 이부분은 솔직히 아직 고민. 정답을 모르겠다. 내 생각은 그렇다. 특정 예외처리 작업은 특정 로직에 사실 언제나 종속적이다. 그래서 하나로 묶어두고 처리를 하고싶은데 이를 위해서는
try-catch를 잘 활용해야한다. 근데 전반적으로 과장님들에게 여쭤보니 다들 가독성이 좀 떨어진다고 생각하는거 같다. 다들 바로바로 이해를 못하시더라. 근데 이렇게 하면 컨트롤러도 훨씬 깔끔해져서 사실 처음에 그 커다란 한 비즈니스를 이해하는데에는 훨씬 좋다. 예외처리에 대한 코드도 중복이 줄어들고. RESTFUL하게 처리를 하게 되면 공통 예외처리로 사실 대부분의 예외도 잡게 될테니까 사실 내가볼때는 서비스에서 처리하는게 더 나은것 같음.


### 4. For Reducing the redundant codes.


```java

    public class AService {
        public String aFunction() { 
            String result = getFromSomewhere();

            if("error".equals(result)) {
                throw new Exception();
            }   
            
            return result;
        }
    }

    public class AController {
        AService aService = new AService();

        public String controller() {

            try {
                String result = aService.aFunction();

            } catch(Exception e) {
                // do error processing
                return "ERROR";
            }

            return "SUCCESS";
        }       
    }

    public class BController {
        AService aService = new AService();

        public String controller() {

            try {
                String result = aService.aFunction();

            } catch(Exception e) {
                // do error processing
                return "ERROR";
            }

            return "SUCCESS";
        }       
    }

    public class CController {
        AService aService = new AService();

        public String controller() {

            try {
                String result = aService.aFunction();

            } catch(Exception e) {
                // do error processing
                return "ERROR";
            }

            return "SUCCESS";
        }       
    }

```

> To handle Exception at the service logic is better from a redundant point of view. If not you gotta handle at each controllers are used this.

```java
    
    public double calculate(List<Person> people) {
        List<Person> professors = people.stream()
                .filter(Person::IsProfessor)
                .collect(toList());

        averageSalary = professors.stream()
                .map(Person::getSalary)
                .average()
                .getAsDouble();
        
        return averageSalary;
    }
```

> 예외처리와 같은 것들. 혹은 서비스의 독립적인 함수들을 묶어서 새로운 함수를 구현하는 것들. 이런것들은 어떨까? 어떻게 생각이 드나