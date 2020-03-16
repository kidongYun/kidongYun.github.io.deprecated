---
layout: post
title:  "Interpark - Java8 Stream"
date:   2020-03-16 11:21:54 +0900
categories: interpark java java8 stream
---

### 1. Why do we use the stream ?

#### You don't need to think about how to build.
> It's like the _Query_. How do we get the max value before the Java8, We always use the 'for' keyword or 'if' keyword for getting that data. And We should consider the logic for getting the result of calculating like the max value. In other word, If you don't use the _Stream_ then you always think about how we build the logic for getting some data. But if you use this, you don't need to think about the focus of the building.

#### You can get the advantage of the parallel.
> Previus the Java8, Parallel coding is too difficult to a lot of the Java developers. You should use the _'Thread'_ technic and always consider about the _'Mutual Exclusion'_ It's too low technic to Application Developers. So If you use the _Stream_ then you can get the parallel advantage without _Thread_, The thinking about the _Locking_.

#### It's more readable than previous.
> You just concentrate about the think you want using the _stream_ like the _query_. so consequently, the source code is more shorter that previous and more intuitive.

### 2. Stream Manipulation Computation

> It's the summary of the use of stream basically.

#### filter()

> _'filter()'_ function is for seperating the elements of the stream utilzing any function returning _boolean_ value.

```java

    List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    /** Get the even numbers from the number list. */
    List<Integer> evenNumbers = numbers.stream().filter(i -> i % 2 == 0).collect(toList());

```

#### takewhile()

> Do you know the _break_ keyword for the Java ? when you want to finish some iteration status, You can use this keyword. In the _filter()_ function, It's always iterate everything elements although you got the value you want. If you want to stop the iteration when you complete your mission then use this keyword.

```java

    List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    /** Get the small numbers from the number list. */
    List<Integer> smallNumbers = numbers.stream().takeWhile(i -> i < 5).collect(toList())

```

#### dropwhile()

> It's other side of the _takewhile()_ function. If you want to get the large number then use this keyword.

```java

    List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    /** Get the large numbers from the number list. */
    List<Integer> smallNumbers = numbers.stream().dropWhile(i -> i < 5).collect(toList());

```


#### distinct()

> If you don't want to get duplicate value like the _Set_ then use this.

```java

    List<Integer> numbers = Arrays.asList(1, 1, 2, 2, 3, 3, 4, 4, 5, 5);

    /** Get the numbers without duplcate value. */
    List<Integer> uniqueNumbers = numbers.stream().distinct().collect(toList());

```

#### limit()

> You can limit the number of the result using this function

```java

    List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    /** Get the limited numbers */
    List<Integer> limitedNumbers = numbers.stream().limit(3).collect(toList());

```

#### skip()

> If you want to skip the elements coming first, then use this function.

```java

    List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    /** Get the skipped numbers */
    List<Integer> skipedNumbers = numbers.stream().skip(3).collect(toList());

```

#### map()

> If you want translate the type of the stream. then use this function.

```java
    List<Dish> menu;

    /** Get the list of names from the menu. */
    List<String> dishNames = menu.stream().map(Dish::getName).collect(toList());
```

> The type of the _menu_ is the List<Dish> and the type of the _dishNames_ is the List<String>. It's different. So You should convert the type using the map() function like the above code.

### 3. Stream Search Computation

#### allMatch()

> It return the _boolean_ value. It checkes what the all of the elements pass the condition off or not.

```java

    List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    boolean allMatechNumbers = numbers.stream().allMatch(i -> i > 0);

```

#### anyMatch()

> If the elements pass the condition at least 1 thing, then It will return _true_.

```java

    List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    boolean anyMatechesNumbers = numbers.stream().anyMatch(i -> i > 9);

```

#### nonMatch()

> Everyting should be fail about the condition. if you want get the _true_.

```java

    List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    boolean nonMatchNumbers = numbers.stream().noneMatch(i -> i > 10);

```

#### findFirst()

> If you want to get the first element of the result, then use this.

```java
    List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    /** Get the first element value but It may be null. */
    Optional<Integer> firstNumber = numbers.stream().findFirst();

    /** Get the first element value. It has to be not null. */
    Integer firstNumber = numbers.stream().findFirst().get();
```

> This function allow to get the null value basically because of empty list source. So It's return the type Optional thing. but If you sure that don't have the _null_ value, You can get the result without _Optional_ using the _get()_ function.

#### findAny()

> If you want to get element randomly from the result, then use this.

```java

    List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    /** Get the any element value but It may be able to be null */
    Optional<Integer> randomNumber = numbers.stream().findAny();

    /** Get the any element value */
    Integer firstNumber = numbers.stream().findFirst().get();

```

### 4. Primitive Specialized Stream

> The _stream_ offer the privitive specialized stream like _IntStream_, _LongStream_, _DoubleStream_. I think you already know the terms of _Boxing_, _Unboxking_. It's the translating between the primitive type and the Object type. Actually You should pay really high cost when it occurred. So Java8 offer us primitive specialized stream to avoid this high cost.

```java

    /** It's the example of 'IntStream' */
    int Calories = menu.stream().mapToInt(Dish::getCalories).sum();

    /** You can translate between primitive type and object type like the below if you want */
    IntStream intStream = menu.stream().mapToInt(Dish::getCalories);
    Stream<Integer> stream = intStream.boxed();

```

### 5. The various way to build the stream

#### Stream.of()

```java

    Stream<String> stream = Stream.of("Mordern", "Java", "In", "Action");

    stream.map(String::toUpperCase).forEach(System.out::println);

```

#### Arrays.stream()

```java

    int[] numbers = {2, 3, 5, 7, 11, 13};

    int snum = Arrays.stream(numbers).sum();

```

#### Stream.iterate()

```java

    Stream.iterate(0, n -> n + 2)
        .limit(10)
        .forEach(System.out::println);

```

#### Stream.generate()

```java

    Stream.generate(Math::random)
        .limit(5)
        .forEach(System.out.println);

```