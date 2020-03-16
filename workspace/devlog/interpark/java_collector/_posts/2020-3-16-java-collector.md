---
layout: post
title:  "Interpark - Java8 Reduce and Collector"
date:   2020-03-16 14:30:54 +0900
categories: interpark java java8 stream collector reduce
---

### 1. reduce()

> _reduce()_ calculation return the value no like any _list_, _array_, _collection model_. Usually It's called 'Fold' Calculation at the Functional Programming. Because The process getting the value from the stream is so similar to fold the paper.

```java

    /** Example of the reduce utilizing the Rambda */
    int sum = numbers.stream().reduce(0, (a, b) -> a + b)

    /** Example 2 of the reduce utilizing the Method Reference */
    int sum = numbers.stream().reduce(0, Integer::sum)

```
> the first among the _reduce_ parameters means the initial value, the second is the definition mean how to calculate or accumulate about this initial value. Additionally, You can skip the first parameter. but if you do that, the reduce function have to been returned with the _Optional_ class. because The reduce don't know the initial status.

```java

    /** Example of the reduce that doesn't have initial value */
    Optional<Integer> sum = numbers.stream().reduce((a, b) -> a + b);

```

> External Iteration and Internal Iteration may have two major differences. The one is readable. Internal iteration only need the code related to the 'what do you want' no 'how do we build'. but External iteration is not. and the second one is the performance. It's difficult to give the parallel attribute to External Iteration. but the Internal Iteration case, You can give the parallel thing automatically if you want.

### 2. Collectors

> It's the Reduce Computation already made from Java Developers. If you don't use this about the normal problem, then you always should create the logic for that using the reduce function. Collectors class occurs the useful computation for the normal situation like getting the max value, getting the summing of the all values.

#### The difference meaning between Collection, collect, Collectors,

> They have really similar the term. but they are really different. First of all, Collection is the Collection Framework. Actually We already know about that from previous Java 8. It's for expressing the structure of the data like List, Set, Map. The collect is the one of the function used from the Stream API. Usually it takes the Collectors object including the stream parameter and returns any value like the reduce function. and finally Collectors is the one of the class. It implements the _Collector_ interface. and It can give a lot of the useful function when you need the Collector object.

```

    Collection
    - It's just the Collection Framework which may know a lot of Java programmer.

    collect()
    - It's the one of the function used from the Stream API.

    Collectors
    - It's the implementation of the Collector interface. and They are usually used from collect function.

```

#### maxBy()

```java

    Comparator<Dish> dishCaloriesComparator = Comparator.comparingInt(Dish::getCalories);

    Optional<Dish> mostCaloriesDish = menu.stream().collect(maxBy(dishCaloriesComparator));

```

#### minBy()

```java

    Comparator<Dish> dishCaloriesComparator = Comparator.comparingInt(Dish::getCalories);

    Optional<Dish> mostCaloriesDish = menu.stream().collect(minBy(dishCaloriesComparator));

```

#### summingInt()

```java

    int totalCalories = menu.stream().collect(summingInt(Dish::getCalories));

```

#### joining()

```java

    /** You can merge the set of names using joining function without separator */
    String shortMenu = menu.stream().map(Dish::getName).collect(joining());

    /** You can merge the set of names using joining function with separator */
    String shourMenu = menu.stream().map(Dish::getName).collect(joining(", "));

```

#### groupingBy()

> _groupingBy_ function can be overlaid itself like the below. You can make a group using the _filter_ function of the Stream. but if you use the way using _filter_, it doesn't keep the empty status. In other word, if some groups don't have the elements then it will be not exist. 

```java

    Map<Dish.Type, Map<CaloricLevel, List<Dish>>> dishesByTypeCaloricLevel = menu.stream().collect(
        groupingBy(Dish::getType,
            groupingBy(dish -> {
                if(dish.getCalories() <= 400)
                    return CaloricLevel.DIET;
                else if(dish.getCalories() <= 700)
                    return CaloricLevel.NORMAL;
                else
                    return CaloricLevel.FAT;
            })
        )
    )

```

#### partitioningBy()

> It's the special case of the groupingBy function. It can separate using only predicate function returning _boolean_ value. and It can be also overlaid itself.

```java

    Map<Boolean, Map<Dish.Type, List<Dish>>> vegetarianDishesByType = menu.stream().collect(
        partitioningBy(Dish::isVegetarian, groupingBy(Dish::getType)));

```