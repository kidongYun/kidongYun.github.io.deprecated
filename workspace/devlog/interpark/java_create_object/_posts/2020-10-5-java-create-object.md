---
layout: post
title:  "Interpark - Create Object on Java Language"
date:   2020-03-16 14:30:54 +0900
categories: java object create
---

### Static Factory Method

> The java language offer to us the constructor for creating new object. It's simplest way to do that but It has a lot of limitation. 
So We would study the new way for creating java object. It's the Static Factory Method.

#### Naming.

```java

class Person {
    private int age;

    /* It's the constructor */
    public Person(int age) {
        this.age = age;
    }
    
    /* Below two things are static factory method. */
    public static Person young() {
        return new Person(20);    
    }
    
    public static Person elder() {
        return new Person(70);
    }
}

```

> If you use the static factory method pattern then your source code could have the readability than the only constructor.
The example is too simple so you might not be able to understand the needs of it. but Let's imagine your class is bigger than this.
The larger than larger things should need like static factory method pattern.

> The main advantage of static factory method is It could have the name to enable express the purpose of the method.
but the constructor can't do this. The name of some method is always important for the readability.

#### Instance-Controlled

> The constructor always creates new instances, which need a new space for keeping itself. but static factory method wouldn't
be as your building code.

```java

public class Person {
    private static Person person = new Person(0);
    private int age;

    public Person(int age) {
        this.age = age;
    }

    public static Person young() {
        person.age = 20;
        return person;
    }

    public static Person old() {
        person.age = 70;
        return person;
    }
}

```

> It's singleton pattern. As you can see the above, you can control the way to create the java object as the requirement.
We have called 'Instance-Controlled' about these attributes.

#### It can be returned sub-class



### Builder

#### When we have a lot of optional parameters.

#### Java Beans Pattern

#### Util-class should have the private constructor.

### Singleton

####