---
layout: post
title:  "Interpark - Overview of the Test Code"
date:   2020-1-12 00:00:00 +0900
categories: interpark spring junit test-code test mockito
---

# Overview of the Test Code

## 1. The purpose and significance of test code.

### You have to remember the thing that Your system always be processed the management of operational tasks.

> Actually, If you just think that the building IT systems is temporary thing. then Making the test code is definitely inefficient task. because We gotta write more code than it's not. then Why do we write the code for the test? The building of the IT system is really not temporary thing in the real world. The management of the system is really important than the building of it. and The business may be going to change because of any factor like the demand of customer, the modification of the policy of the companies. then We should change our code for this change at this time. but You can't trust your code written before long times ago for this system. because You can't remember about these code clearly. so When you change your code for the new business change, You could make any mistake. Sometimes It's really critical code. for the difficult of changing your code, You should make the test code.  

### You don't need to test a whole of the system because of the tiny change of the code.

> If you don't write the test code then you always have to test your whole of the systems because of the tiny change of the code. The bigger the size of the system, the harder it test. and It need more time. but If you use the test thing, then you can validate your modification using only the Unit Test code without any whole thing. For this, The test code should be independent thing between each other. Eventually You can save the time for testing using the Unit Test code.

### The Refactoring of Production code based the Test code.

> Refactoring the code is always important to most of the IT services. The Test code can propose some the direction for the refactoring of the production code. Basically The Test code should be written for th only one operation of the production thing. If one of the methods of the production code has many operations, then The test code for this method can't validate for each operation. That is we can improve our production code has whether the proper operation range or not via Test code. <br><br> For example, When we have the code call the API via HTTP connection and marshall the XML data from the API, then we can define it as the two operation like the below.

```

    1. The operation calling the API via HTTP connection.

    2. The operation marshalling the XML data to VO object.

```

> You can understand the important thing that your production code should be configured separately between the above things because you can't validate each operation if you made the above tasks in only one method. 

### It's possible to make the document for the explaining only used the test code itself.

> The test code should be written more detail than the same things of production code. ex) name of function, name of variables ... as you can see the above of this article, The test code is meaningful in terms of maintenance. additionally The test code can be the document itself without adding any text. I think it could be more important than maintenance perspective. The developers except main developers of the some project can understand to read the test code as the document. so Increasing readability of the code in the test code is very important. another words, To write a code that can be understood by the code itself without making any comments or any real documents is very important factor at the test code part than production code.


## 2. Which do we test the code?

### Does the code have the importance at the business persective?

> You could take a directly financial loss when the important code from business perspective face the problem. so from this perspective, The business code always have to get some barrier thing using the test code to protect the any various change things. and You have to be enable controlling these errors occurred at the business code right that time.

### Does the code have the complexible logic including a loop or conditional statement?

> Usually, Most of the developers are difficult to understand the code having a loop or conditional statement. and usually, These code has the high possibility of the error. so It's also really good habit to test the complexible logic. and at the many cases, The complexible code often same with the business code.

### Does the code have any conversion of the data?

> from many situations of developing, Most of developers use a lot of the time for transforming the data like from JSON to VO or Primitive Type like the map to XML. and Also most of developers always find the errors occurred from what related to transforming. For saving these time, I strongly recommend to make the test code to check the conversion of the data.

### Does the code call the API from external environment?

> If your system use the API service from outer environment, You can test that these API calling is right or not. for example, Your parameters for requesting the API is right or not, The response is right or not. But You should remember the one thing that This test always has the dependency between the system provided the API. That is if the system providing the API is died, then we can't test out code related to API Calling. But actually it is the critical problem because our test code could be fail although our logic is well. In these case, We gotta use the Mock or Stub Object. Yes. It's the solution of dependency.

### Does the code get some data from the database?

> In modern web services, databases are used as a basis. So Validating the data from database is important either. If your system is asynchronous thing. then Actually It's more considerable than it's not. and this also should use the Mock or Stub thing. because These code is related to the database that is outer environment.

### Does the code take the client request like the Spring Controller?

> It's really hard thing to test the request and response between client and server from the web service. because It always have the dependency between each other. but If we use the Mock library, then we can make the fake client object like the customer used the browser. and Testing these part is very important because If you provide the web service, Most of the errors are occured from here.

## 3. Test Code Creation Tips

### The Rule of Naming for the Test Class

> Usually The name of Test class is made by the production class name and 'Test' text. If your production class name is 'PersonService.java' then I'd recommend to use 'PersonServiceTest.java'. When you use like this, You can find and know the test code related to the production code. and these files should be located at the same package.

```
    Production Class Name : PersonService.java

    Test Class Name : PersonServiceTest.java
```

### The Rule of Naming for the Test Method.

> I think this topic is really important from this article. In most of cases, The name of test method in test class is more longer than the normal production code. because we should express the role of that test code only via the test method name. So actually test method name had the sentence includes over the 7 terms. the below the sample naming example for the understanding. To make the test code as the document for description of the code, Naming is very fundamental and basis.

```java

    @Test
    CreateTheSomeObject_ValidParameter_ShouldBePassed() { }

    @Test
    AddAlphaAndBeta_NullAlpha_ShouldThrowException() { }

```

### Let's keep the coherence using _'Triple-A'_

> We found out the way how do we type the name for the test code from the above. then Next step is the way How do we write the test code in the test method. usually, We gotta keep the rule called _'AAA'_ for the readability. If you keep this rule then you could get the documetation more easier than it's not. You always effort for the test code to be the documentation. Let's know the meaning of the each _'AAA'_ things.

```
    A : Arrange     // To prepare the test.
    A : Act         // To execute the test.
    A : Assert      // To determine the result of the test.
```

> _'Arrange'_ is the task like the thing what prepare the some object needed at test. Usually this part could be more longer than others. but the long code is not well from the readability perspective. so We should extract these code to another method. for example _'@Before'_, _'@After'_, 'normal method thing' ... but It's not the main content of this article so I will introduce these content at the document related the refactoring of test code. <br><br> _'Act'_ is the part to execute the operation of the test. this operation is like the transaction so It has one or more methods. <br><br> _'Assert'_ is for determining the result of test. finally we will get the actual value and the expected value, then using these values, We should assert the result of the test. 

### Use the Hamcrest matcher library.

> The default assert syntaxs occured from the _JUnit_ are too simple, so We will not read the debug thing easily. but the Hamcrest Matcher can give the more kind, detail information when your test is failed. and Your test code will be more easier to read than it doesn't use. the below text is the log  when you test is failed.

```
Expected: <100>
     but: was <101>
java.lang.AssertionError: 
Expected: <100>
     but: was <101>
```

> you know what? Computer can't express the real number perfectly like '2.32'. You might studied about this in the university. So when you test the real number, you should consider the range of error. It's like the below.

```
    assertTrue(Math.abs((2.32 * 3) - 6.96) < 0.0005);           // AS-IS

    assertThat(2.32 * 3, closeTo(6.96, 0.0005));                // TO-BE
```

> but The above code is really bad from the readability perspective. It's just for the test whether two values are same or not, but We can't get it easily. so we can use the Hamcrest matcher method named 'isCloseTo()'. If you want to use this, you have to import the dependency of the _'hamcrest-all'_.

### The way how to throw the Exception.

> Test code has a various the solution for processing the exception. among them, the way associated with the _'@Test'_ annotation is very simple and powerful so I'd recommend to use this way.

```java

    // Definition of the Exception class.
    class CreateSomeObjectException extends RuntimeException {
        public CreateSomeObjectException(String message) {
            super(message);
        }
    }

    // Production code sample
    class SomeObject {
        public Object create() {
            throw new CreateSomeObjectException("Error Message");
        }
    }
    
    // Test code sample
    @Test(expected=CreateSomeObjectException.class)
    public void CreateSomeObject_InvalidParameter_ShouldThrowException() {
        new SomeObject.create();
    }

```

> importantly, You don't have to consider the basic exceptions like _'NullpointerException'_, _'ClassCastException'_, _'NumberFormatException'_ ... because if we face that situation, your test code will return the fail with the exception information. 

### Building the test code from operation perspective.

> When you make the test code, You can do it based the each production methods. but it's not well. because the methods could always be changed because of many factors. So you should think what is the main concept or operation in this business. and to do the test from this perspetive. then you don't need to change the test code although the production code is changed.

### The rule named _'FIRST'_

#### Fast

> If your project is not too big then The test code may is going to do fast. but The more bigger your system, The more slower doing the test code. If you don't do any refactoring for the test code then Your test code could need a lot of the time at least over 20 minutes. so you always effort to velocity of the test code doing. for that we need to do the test refactoring. we will treat this thing from another article.

#### Isolated

> We already know the meaning of this word. as you can see from the above contents, test code should always keep the independence.

#### Repeatable

> If you keep the independence, then It will do again and again forever. then we can tell our test code is repeatable.

#### Self-validating

> The test code have to get the ability enable to validate the production code without any assistance from outside of the test method.

#### Timely

> ...