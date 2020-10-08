---
layout: post
title:  "Interpark - Create Object on Java Language"
date:   2020-03-16 14:30:54 +0900
categories: java object create
---

### 1. Static Factory Method

> The java language offer to us the constructor for creating new object. It's simplest way to do that but It has a lot of limitation. 
So We would study the new way for creating java object. It's the Static Factory Method.

#### 1-1. Naming.

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

#### 1-2. Instance-Controlled

> The constructor always creates new instances, which need a new space for keeping itself. but static factory method wouldn't
be as your building code.

```java

class Person {
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

#### 1-3. It can be returned sub-class

> The constructor can be returned only itself no sub-classes. 
but you could make the code more scalable if you use the static factory method like below.

```java

class Person {
    public static Person create(String type) {
        if("man".equals(type)) {
            return new Man();
        }

        if("woman".equals(type)) {
            return new Woman();
        }

        return new Person();
    }
}

class Man extends Person {}

class Woman extends Person {}

```

> This person class can be returned all of the classes related to itself as the type parameter.
but this code has a little disadvantage, which always add the new code whenever you create new sub-class.
You could improve this code using reflection technique of java.

```java

class Person {
    public static Person create(Class<?> clazz) throws Exception {
        Class[] classArgs = {};
        Constructor constructor = clazz.getDeclaredConstructor(classArgs);
        Object obj = constructor.newInstance();

        return (Person) clazz.cast(obj);
    }
}

class Man extends Person {}

class Woman extends Person {}

```

### 2. Builder

#### 2-1. When we have a lot of optional parameters.

> At this time, we would consider the situation, which have a lot of optional parameters. if we build it using the constructor,
then the number of the constructors are should be increased exponentially.

```
    The number of fields    :   The number of constructors
    1                       :   1 
    2                       :   3   (= 2 + 1)
    3                       :   6   (= 3 + 2 + 1)
    4                       :   10  (= 4 + 3 + 2 + 1)
                           ...
    10                      :   45  (= 9 + 8 + ... + 2 + 1)

```

> It looks like that we should need to use different way certainly. the first one among them is Java Beans Pattern.
It is also called getter/setter.

#### 2-2. Java Beans Pattern

> We already know this way. It would use the getter/setter methods like the below code.

```java

class Person {
    private String name;
    private String sex;
    private String country;
    private int age;

    public void setName(String name) {
        this.name = name;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setAge(int age) {
        this.age = age;
    }
}

class Main {
    public static void main(String[] args) {
        Person person = new Person();

        person.setName("John");
        person.setAge(25);
        person.setCountry("Japan");
        person.setSex("M");
    }
}

```

> We could use this like the builder pattern if we return the class itself on the setter methods.  

```java

class Person {
    private String name;
    private String sex;
    private String country;
    private int age;

    public Person setName(String name) {
        this.name = name;
    }

    public Person setSex(String sex) {
        this.sex = sex;
    }

    public Person setCountry(String country) {
        this.country = country;
    }

    public Person setAge(int age) {
        this.age = age;
    }
}

class Main {
    public static void main(String[] args) {
        Person person = new Person()
                .setName("John")
                .setAge(25)
                .setCountry("Japan")
                .setSex("M");
    }
}

```

> Main disadvantage of Setter methods is It couldn't keep the consistency of the code. 
It means the person object could be accessed and changed from another code after completing to create an object.

```java 

class Main {
    public static void main(String[] args) {

        /* It's the initialization of Person object */
        Person person = new Person()
                .setName("John")
                .setAge(25)
                .setCountry("Japan")
                .setSex("M");

        /* after this this person object can be changed. */
        person.setAge(30);

    }
}

``` 

#### 2-3. Builder

> It's commonly used ways all programming world when we create objects especially python or scala.

```java

public class Person {
    private String name;
    private String sex;
    private String country;
    private int age;

    static class Builder {
        private final Person person;

        public Builder() {
            this.person = new Person();
        }

        public Builder name(String val) {
            this.person.name = val;
            return this;
        }

        public Builder sex(String val) {
            this.person.sex = val;
            return this;
        }

        public Builder country(String val) {
            this.person.country = val;
            return this;
        }

        public Builder age(int val) {
            this.person.age = val;
            return this;
        }

        public Person build() {
            return this.person;
        }
    }
}

class Main {
    public static void main(String[] args) {
        Person person = new Person.Builder()
                .name("John")
                .age(25)
                .country("Japan")
                .sex("M")
                .build();
    }
}

```

### 3. Util-class should have the private constructor.

### Singleton

####