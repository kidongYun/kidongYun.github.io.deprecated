---
layout: post
title:  "Interpark - The sort of Creating Object"
date:   2020-09-15 08:47:54 +0900
categories: interpark http rest-api 
---

### Static Factory Method

> We have often used the constructor when You need to create the object. because This function is basically offered
a lot of the programming languages like Java, C++, JS, python and so on. But actually, It is only a basic technique not good thing.
We could get a lot of advantage if use the static factory method techniques not the constructor.

### The advantages

#### 1. Readability ( You could give the names for these functions. )

```java

class Member {
    private String name;
    private String type;
    
    public Member(String name, String type) {
        this.name = name;
        this.type = type;
    }

    public static Member ofGold(String name) {
        return new Member(name, "GOLD");
    }

    public static Member ofPlatinum(String name) {
        return new Member(name, "PLATINUM");
    }
}

class Main {
    public static void main(String[] args) {
        /* We want to create the member object who has the each another level. */

        /* The case using the constructor */
        Member gold = new Member("John", "GOLD");
        Member platinum = new Member("John", "PLATINUM");

        /* The case using the static factory method */
        Member gold = Member.ofGold("John");
        Member platinum = Member.ofPlatinum("John");
    }
}
```

> If a parameters of Member are more than now, the way using constructor would be difficult to read on the source code.
And If the most of parameter types are number then It's also too hard to read those.  


#### 2. Immutability. ( You could create the java object on singleton pattern. )

> The constructor should create the new one whenever you use that although you don't need it.

```java

class God {
    private Member member;

    public static Member valueOf(String name) {
        if(member == null) {
            member = new Member();
        }

        this.member.setName(name);
        return this.member;
    }
}

class Main {
    public static void main(String[] args) {
        Member hera = God.valueOf("Hera");
        Member apollo = God.valueOf("Apollo");
    }
}

```

> A constructor always use with 'new' keyword so It' too hard to create the object as the singleton type when you use a constructor way.
We could achieve the immutability attribute like the above way whenever we want to do that.